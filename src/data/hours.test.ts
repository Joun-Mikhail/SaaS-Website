import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getStatus, getWallClock, parseRange, type LocationHours } from './hours.ts';

const WEEKDAY_HOURS: LocationHours = {
  mon: '08:00–18:00',
  tue: '08:00–18:00',
  wed: '08:00–18:00',
  thu: '08:00–18:00',
  fri: '08:00–18:00',
  sat: '08:00–12:00',
  sun: null,
};

/** Prague is UTC+2 in summer (CEST) and UTC+1 in winter (CET). */
const summerMonday = (hhmmUtc: string) => new Date(`2026-08-03T${hhmmUtc}:00Z`);
const winterMonday = (hhmmUtc: string) => new Date(`2026-01-05T${hhmmUtc}:00Z`);

test('open during trading hours', () => {
  // 12:00 UTC = 14:00 Prague, mid-afternoon on a Monday.
  const status = getStatus(WEEKDAY_HOURS, summerMonday('12:00'));
  assert.equal(status.isOpen, true);
  assert.equal(status.label, 'open');
  assert.equal(status.nextChange, '18:00');
});

test('closed before opening, and reports the opening time', () => {
  // 04:00 UTC = 06:00 Prague.
  const status = getStatus(WEEKDAY_HOURS, summerMonday('04:00'));
  assert.equal(status.isOpen, false);
  assert.equal(status.label, 'opensAt');
  assert.equal(status.nextChange, '08:00');
});

test('closed after closing, with nothing left today', () => {
  // 19:00 UTC = 21:00 Prague.
  const status = getStatus(WEEKDAY_HOURS, summerMonday('19:00'));
  assert.equal(status.isOpen, false);
  assert.equal(status.label, 'closed');
  assert.equal(status.nextChange, null);
});

test('opening minute counts as open, closing minute counts as closed', () => {
  // 06:00 UTC = 08:00 Prague exactly.
  assert.equal(getStatus(WEEKDAY_HOURS, summerMonday('06:00')).isOpen, true);
  // 16:00 UTC = 18:00 Prague exactly.
  assert.equal(getStatus(WEEKDAY_HOURS, summerMonday('16:00')).isOpen, false);
});

test('a null day is closed all day', () => {
  // Sunday 2026-08-02, 12:00 Prague.
  const status = getStatus(WEEKDAY_HOURS, new Date('2026-08-02T10:00:00Z'));
  assert.equal(status.isOpen, false);
  assert.equal(status.label, 'closed');
  assert.equal(status.nextChange, null);
});

test('Saturday uses its own shorter hours', () => {
  // Saturday 2026-08-01. 09:00 UTC = 11:00 Prague — open until 12:00.
  const open = getStatus(WEEKDAY_HOURS, new Date('2026-08-01T09:00:00Z'));
  assert.equal(open.isOpen, true);
  assert.equal(open.nextChange, '12:00');

  // 11:00 UTC = 13:00 Prague — shut, unlike a weekday.
  assert.equal(getStatus(WEEKDAY_HOURS, new Date('2026-08-01T11:00:00Z')).isOpen, false);
});

test('winter time is handled without a manual offset', () => {
  // 07:30 UTC = 08:30 Prague in CET: open. The same instant in summer would
  // be 09:30, so a hardcoded offset would still pass — 06:30 catches it.
  assert.equal(getStatus(WEEKDAY_HOURS, winterMonday('07:30')).isOpen, true);
  // 06:30 UTC = 07:30 Prague in CET: not open yet.
  assert.equal(getStatus(WEEKDAY_HOURS, winterMonday('06:30')).isOpen, false);
});

test('wall clock reads the Prague day, not the UTC day', () => {
  // 23:30 UTC Sunday is already 01:30 Monday in Prague.
  const wall = getWallClock(new Date('2026-08-02T23:30:00Z'));
  assert.equal(wall.dayKey, 'mon');
  assert.equal(wall.minutes, 90);
});

test('midnight is minute zero, not minute 1440', () => {
  // 22:00 UTC = 00:00 Prague (CEST).
  assert.equal(getWallClock(new Date('2026-08-02T22:00:00Z')).minutes, 0);
});

test('a plain hyphen parses as well as an en dash', () => {
  assert.deepEqual(parseRange('08:00-18:00'), parseRange('08:00–18:00'));
});

test('malformed hours read as closed rather than throwing', () => {
  for (const bad of ['', 'zavřeno', '08:00', '25:00–26:00', '08:00–08:00', '18:00–08:00']) {
    const status = getStatus({ ...WEEKDAY_HOURS, mon: bad }, summerMonday('12:00'));
    assert.equal(status.isOpen, false, `expected "${bad}" to read as closed`);
  }
});
