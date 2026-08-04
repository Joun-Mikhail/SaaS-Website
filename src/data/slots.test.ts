import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slotsForDay, upcomingDays, SLOT_STEP, CLOSING_BUFFER } from './slots.ts';
import type { LocationHours } from './hours.ts';

const KRALOVO_POLE: LocationHours = {
  mon: '08:00–18:00',
  tue: '08:00–18:00',
  wed: '08:00–18:00',
  thu: '08:00–18:00',
  fri: '08:00–18:00',
  sat: '08:00–12:00',
  sun: null,
};

test('Sunday at Královo Pole offers no slots at all', () => {
  assert.deepEqual(slotsForDay(KRALOVO_POLE, 'sun'), []);
});

test('a weekday runs from opening to a buffer before closing', () => {
  const slots = slotsForDay(KRALOVO_POLE, 'mon');
  assert.equal(slots[0], '08:00');
  assert.equal(slots[1], '08:30');
  assert.equal(slots.at(-1), '17:30');
  // 08:00-17:30 inclusive, every 30 minutes
  assert.equal(slots.length, (17 * 60 + 30 - 8 * 60) / SLOT_STEP + 1);
});

test('Saturday closes early and the slots stop early with it', () => {
  const slots = slotsForDay(KRALOVO_POLE, 'sat');
  assert.equal(slots.at(-1), '11:30');
  assert.ok(!slots.includes('12:00'), 'no slot at the closing minute');
});

test('the last slot is never later than closing minus the buffer', () => {
  for (const day of ['mon', 'sat'] as const) {
    const slots = slotsForDay(KRALOVO_POLE, day);
    const close = day === 'sat' ? 12 * 60 : 18 * 60;
    const [h, m] = slots.at(-1)!.split(':').map(Number);
    assert.ok(h * 60 + m <= close - CLOSING_BUFFER);
  }
});

test('a malformed range yields no slots rather than a guess', () => {
  assert.deepEqual(slotsForDay({ ...KRALOVO_POLE, mon: 'kdykoliv' }, 'mon'), []);
  assert.deepEqual(slotsForDay({ ...KRALOVO_POLE, mon: '18:00–08:00' }, 'mon'), []);
});

test('an open window shorter than the buffer yields nothing', () => {
  assert.deepEqual(slotsForDay({ ...KRALOVO_POLE, mon: '08:00–08:20' }, 'mon'), []);
});

test('upcomingDays starts today and marks the closed ones', () => {
  // Thursday 6 August 2026, 09:00 Prague.
  const days = upcomingDays(KRALOVO_POLE, 7, new Date('2026-08-06T07:00:00Z'));
  assert.equal(days.length, 7);
  assert.equal(days[0].iso, '2026-08-06');
  assert.equal(days[0].dayKey, 'thu');
  assert.equal(days[0].closed, false);

  const sunday = days.find((d) => d.dayKey === 'sun');
  assert.ok(sunday, 'a Sunday falls inside the next seven days');
  assert.equal(sunday.closed, true, 'Sunday is marked closed');
  assert.equal(sunday.iso, '2026-08-09');
});

test('upcomingDays uses the Prague date, not the visitor timezone', () => {
  // 23:30 UTC on 5 August is already 01:30 on 6 August in Prague.
  const days = upcomingDays(KRALOVO_POLE, 1, new Date('2026-08-05T23:30:00Z'));
  assert.equal(days[0].iso, '2026-08-06');
});
