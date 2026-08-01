import type { Locale } from './i18n';

const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

interface LocationHours {
  mon: string | null;
  tue: string | null;
  wed: string | null;
  thu: string | null;
  fri: string | null;
  sat: string | null;
  sun: string | null;
}

export function getStatus(hours: LocationHours): {
  isOpen: boolean;
  label: string;
  nextChange: string | null;
} {
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Europe/Prague' })
  );
  const dayKey = dayKeys[now.getDay()];
  const todayHours = hours[dayKey];

  if (!todayHours) {
    return { isOpen: false, label: 'closed', nextChange: null };
  }

  const [openStr, closeStr] = todayHours.split('–');
  const [openH, openM] = openStr.split(':').map(Number);
  const [closeH, closeM] = closeStr.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return { isOpen: true, label: 'open', nextChange: closeStr };
  }

  if (currentMinutes < openMinutes) {
    return { isOpen: false, label: 'opensAt', nextChange: openStr };
  }

  return { isOpen: false, label: 'closed', nextChange: null };
}
