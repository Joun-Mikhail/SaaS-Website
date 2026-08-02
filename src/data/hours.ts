export const TIME_ZONE = 'Europe/Prague';

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type LocationHours = Record<DayKey, string | null>;

export type StatusLabel = 'open' | 'opensAt' | 'closed';

export interface Status {
  isOpen: boolean;
  label: StatusLabel;
  /** Time the current state ends ("18:00"), or null when nothing is coming today. */
  nextChange: string | null;
}

const WEEKDAY_TO_KEY: Record<string, DayKey> = {
  Mon: 'mon',
  Tue: 'tue',
  Wed: 'wed',
  Thu: 'thu',
  Fri: 'fri',
  Sat: 'sat',
  Sun: 'sun',
};

/**
 * Prague wall-clock day and minute-of-day for an instant.
 *
 * Uses formatToParts rather than re-parsing a formatted date string, so it
 * doesn't depend on the host locale or on a non-standard parse, and it follows
 * Czech daylight-saving changes on its own.
 */
export function getWallClock(now: Date = new Date()): { dayKey: DayKey; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);

  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';

  return {
    dayKey: WEEKDAY_TO_KEY[part('weekday')],
    minutes: Number(part('hour')) * 60 + Number(part('minute')),
  };
}

/**
 * Parse "08:00–18:00" into minutes. Accepts an en dash or a plain hyphen,
 * since opening hours are hand-edited by shop staff.
 */
export function parseRange(
  range: string
): { openStr: string; closeStr: string; openMinutes: number; closeMinutes: number } | null {
  const [openStr, closeStr] = range.split(/[–—-]/).map((part) => part.trim());
  if (!openStr || !closeStr) return null;

  const toMinutes = (value: string): number | null => {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value);
    if (!match) return null;
    const h = Number(match[1]);
    const m = Number(match[2]);
    if (h > 23 || m > 59) return null;
    return h * 60 + m;
  };

  const openMinutes = toMinutes(openStr);
  const closeMinutes = toMinutes(closeStr);
  if (openMinutes === null || closeMinutes === null) return null;
  if (closeMinutes <= openMinutes) return null;

  return { openStr, closeStr, openMinutes, closeMinutes };
}

const CLOSED: Status = { isOpen: false, label: 'closed', nextChange: null };

/**
 * Whether a branch is open at `now`. A malformed or missing range counts as
 * closed — better to under-promise than to send someone to a locked door.
 */
export function getStatus(hours: LocationHours, now: Date = new Date()): Status {
  const { dayKey, minutes } = getWallClock(now);
  const todayHours = hours[dayKey];
  if (!todayHours) return CLOSED;

  const range = parseRange(todayHours);
  if (!range) return CLOSED;

  if (minutes >= range.openMinutes && minutes < range.closeMinutes) {
    return { isOpen: true, label: 'open', nextChange: range.closeStr };
  }

  if (minutes < range.openMinutes) {
    return { isOpen: false, label: 'opensAt', nextChange: range.openStr };
  }

  return CLOSED;
}

export const DAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export interface HourGroup {
  /** "Po–Pá" for a run, "So" for a single day. */
  days: DayKey[];
  /** "08:00–18:00", or null when closed. */
  value: string | null;
}

/**
 * Collapse a week into runs of identical hours, so a card reads
 * "Po–Pá 08:00–18:00 / So 08:00–12:00 / Ne zavřeno" instead of seven rows.
 *
 * Runs are consecutive only. A week that is open Mon, closed Tue and open Wed
 * stays three groups rather than merging Mon with Wed, because "Po, St" printed
 * as a range would be a lie.
 */
export function groupHours(hours: LocationHours): HourGroup[] {
  const groups: HourGroup[] = [];

  for (const day of DAY_ORDER) {
    const value = hours[day] ?? null;
    const last = groups[groups.length - 1];
    if (last && last.value === value) {
      last.days.push(day);
    } else {
      groups.push({ days: [day], value });
    }
  }

  return groups;
}
