/*
 * Pickup slots, derived from the real opening hours.
 *
 * Nothing here invents availability. A slot exists only if the branch is open
 * at that time, which is why Sunday at Královo Pole produces an empty list
 * rather than a disabled-looking grid: the shop is shut, and the flow has to
 * say so rather than offer a time it cannot serve.
 */
import { parseRange, DAY_ORDER, type DayKey, type LocationHours } from './hours.ts';

/** Minutes between slots. */
export const SLOT_STEP = 30;

/**
 * How long before closing the last slot sits. Handing over bread takes a
 * moment, and a slot at the exact closing minute is a promise the counter
 * cannot keep.
 */
export const CLOSING_BUFFER = 30;

const pad = (n: number) => String(n).padStart(2, '0');
const toClock = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;

/**
 * Slots for one branch on one weekday. Empty when the branch is closed, when
 * the hours are malformed, or when the open window is too short to fit one.
 */
export function slotsForDay(hours: LocationHours, day: DayKey): string[] {
  const value = hours[day];
  if (!value) return [];

  const range = parseRange(value);
  if (!range) return [];

  const last = range.closeMinutes - CLOSING_BUFFER;
  const slots: string[] = [];
  for (let m = range.openMinutes; m <= last; m += SLOT_STEP) slots.push(toClock(m));
  return slots;
}

export interface UpcomingDay {
  /** YYYY-MM-DD in Prague, used as the stored value. */
  iso: string;
  dayKey: DayKey;
  /** Day of the month, for the visible label. */
  dayOfMonth: number;
  /** True when the branch has no slots that day. */
  closed: boolean;
}

/**
 * The next `count` days starting today, in Prague. Dates are built from the
 * Prague wall clock rather than the visitor's, so someone browsing from
 * another timezone is offered the bakery's days, not their own.
 */
export function upcomingDays(
  hours: LocationHours,
  count = 7,
  now: Date = new Date()
): UpcomingDay[] {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Prague',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  const [y, m, d] = parts.split('-').map(Number);
  const days: UpcomingDay[] = [];

  for (let i = 0; i < count; i += 1) {
    // UTC arithmetic on a date-only value: no DST edge, no local-time drift.
    const date = new Date(Date.UTC(y, m - 1, d + i));
    const iso = date.toISOString().slice(0, 10);
    // getUTCDay: 0 = Sunday. DAY_ORDER starts at Monday.
    const dayKey = DAY_ORDER[(date.getUTCDay() + 6) % 7];
    days.push({
      iso,
      dayKey,
      dayOfMonth: date.getUTCDate(),
      closed: slotsForDay(hours, dayKey).length === 0,
    });
  }

  return days;
}
