/*
 * The ordering flow's behaviour. Front end only — nothing is sent anywhere.
 *
 * Three things this file is careful about:
 *
 * 1. Slots come from the real opening hours, so a closed day offers nothing
 *    and says why rather than showing an empty grid.
 * 2. State survives a refresh, because losing a half-filled order to a stray
 *    reload is the fastest way to lose the person filling it in.
 * 3. Focus moves to each step's heading on entry, and every error is specific
 *    about what to do — "napište telefon" beats "neplatné pole".
 */
import { slotsForDay, upcomingDays } from '../data/slots';
import type { LocationHours, DayKey } from '../data/hours';

interface Strings {
  closedBadge: string;
  closedThatDay: string;
  noSlots: string;
  total: string;
  pickupAt: string;
  currency: string;
  whole: string;
  errNoLocation: string;
  errNoDay: string;
  errNoSlot: string;
  errNoItems: string;
  errNameRequired: string;
  errNameShort: string;
  errPhoneRequired: string;
  errPhoneFormat: string;
  name: string;
  phone: string;
  days: Record<DayKey, string>;
}

interface Branch {
  id: string;
  label: string;
  address: string;
  hours: LocationHours;
}

interface State {
  step: number;
  location: string | null;
  day: string | null;
  slot: string | null;
  items: Record<string, number>;
  name: string;
  phone: string;
}

const STORAGE_KEY = 'breadguy.order.v1';
const LAST_STEP = 6;
const DONE_STEP = 7;

const blank = (): State => ({
  step: 1,
  location: null,
  day: null,
  slot: null,
  items: {},
  name: '',
  phone: '',
});

export function initOrderFlow(branches: Branch[], s: Strings) {
  const root = document.querySelector<HTMLElement>('[data-flow]');
  const form = document.querySelector<HTMLFormElement>('[data-order-form]');
  if (!root || !form) return;

  const steps = [...form.querySelectorAll<HTMLElement>('.flow-step')];
  const chips = [...root.querySelectorAll<HTMLElement>('[data-step-chip]')];
  const daysBox = form.querySelector<HTMLElement>('[data-days]')!;
  const slotsBox = form.querySelector<HTMLElement>('[data-slots]')!;
  const summaryBox = form.querySelector<HTMLElement>('[data-summary]')!;
  const receiptBox = form.querySelector<HTMLElement>('[data-receipt]')!;
  const backBtn = form.querySelector<HTMLButtonElement>('[data-back]')!;
  const nextBtn = form.querySelector<HTMLButtonElement>('[data-next]')!;
  const sendBtn = form.querySelector<HTMLButtonElement>('[data-send]')!;
  const restartBtn = form.querySelector<HTMLButtonElement>('[data-restart]')!;

  let state = load();

  function load(): State {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return blank();
      const parsed = { ...blank(), ...JSON.parse(raw) } as State;
      // A stored step is a hint, not a promise: re-validate everything before
      // it so a stale or hand-edited value cannot land on a broken screen.
      parsed.step = Math.min(Math.max(1, parsed.step), DONE_STEP);
      return parsed;
    } catch {
      return blank();
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* private mode, quota — the flow still works, it just forgets */
    }
  }

  const branchOf = (id: string | null) => branches.find((b) => b.id === id) ?? null;

  const priceOf = (id: string) =>
    Number(form.querySelector<HTMLElement>(`[data-item="${id}"]`)?.dataset.price ?? 0);
  const nameOf = (id: string) =>
    form.querySelector<HTMLElement>(`[data-item="${id}"]`)?.dataset.name ?? id;

  const itemEntries = () => Object.entries(state.items).filter(([, q]) => q > 0);
  const total = () => itemEntries().reduce((sum, [id, q]) => sum + priceOf(id) * q, 0);

  function setError(step: number, message: string) {
    const box = steps.find((el) => el.dataset.step === String(step))?.querySelector('[data-error]');
    if (box) box.textContent = message;
  }
  const clearErrors = () =>
    form.querySelectorAll('[data-error]').forEach((el) => (el.textContent = ''));

  /* ---- days & slots ------------------------------------------------- */

  function renderDays() {
    const branch = branchOf(state.location);
    daysBox.innerHTML = '';
    if (!branch) return;

    for (const day of upcomingDays(branch.hours, 7)) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill';
      btn.dataset.day = day.iso;
      btn.disabled = day.closed;
      btn.setAttribute('aria-pressed', String(state.day === day.iso));
      btn.innerHTML = `${s.days[day.dayKey]} ${day.dayOfMonth}.<small>${
        day.closed ? s.closedBadge : ''
      }</small>`;
      if (day.closed) btn.title = s.closedThatDay;
      btn.addEventListener('click', () => {
        state.day = day.iso;
        state.slot = null;
        save();
        renderDays();
        renderSlots();
      });
      daysBox.appendChild(btn);
    }
  }

  function renderSlots() {
    const branch = branchOf(state.location);
    slotsBox.innerHTML = '';
    if (!branch || !state.day) return;

    const dayKey = upcomingDays(branch.hours, 7).find((d) => d.iso === state.day)?.dayKey;
    const times = dayKey ? slotsForDay(branch.hours, dayKey) : [];

    if (times.length === 0) {
      // Closed is a real answer, not an empty grid.
      const p = document.createElement('p');
      p.className = 'flow-error';
      p.textContent = s.noSlots;
      slotsBox.appendChild(p);
      return;
    }

    for (const time of times) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill';
      btn.textContent = time;
      btn.setAttribute('aria-pressed', String(state.slot === time));
      btn.addEventListener('click', () => {
        state.slot = time;
        save();
        renderSlots();
      });
      slotsBox.appendChild(btn);
    }
  }

  /* ---- quantities ---------------------------------------------------- */

  form.querySelectorAll<HTMLElement>('[data-item]').forEach((row) => {
    const id = row.dataset.item!;
    const out = row.querySelector<HTMLElement>('[data-qty]')!;
    const paint = () => (out.textContent = String(state.items[id] ?? 0));

    row.querySelector('[data-inc]')!.addEventListener('click', () => {
      state.items[id] = Math.min((state.items[id] ?? 0) + 1, 99);
      save();
      paint();
    });
    row.querySelector('[data-dec]')!.addEventListener('click', () => {
      state.items[id] = Math.max((state.items[id] ?? 0) - 1, 0);
      if (state.items[id] === 0) delete state.items[id];
      save();
      paint();
    });
    paint();
  });

  /* ---- validation ---------------------------------------------------- */

  const nameField = form.querySelector<HTMLInputElement>('input[name="name"]')!;
  const phoneField = form.querySelector<HTMLInputElement>('input[name="phone"]')!;

  nameField.value = state.name;
  phoneField.value = state.phone;
  nameField.addEventListener('input', () => {
    state.name = nameField.value;
    save();
  });
  phoneField.addEventListener('input', () => {
    state.phone = phoneField.value;
    save();
  });

  /* Czech mobile or landline, with or without the +420 prefix and with any
     spacing. Deliberately permissive about spaces and strict about length —
     rejecting a correct number is worse than accepting an odd one. */
  const PHONE = /^(\+?420)?\s*\d{3}\s*\d{3}\s*\d{3}$/;

  function validate(step: number): boolean {
    clearErrors();
    nameField.removeAttribute('aria-invalid');
    phoneField.removeAttribute('aria-invalid');

    if (step === 1 && !state.location) return fail(1, s.errNoLocation);
    if (step === 2 && !state.day) return fail(2, s.errNoDay);
    if (step === 3 && !state.slot) return fail(3, s.errNoSlot);
    if (step === 4 && itemEntries().length === 0) return fail(4, s.errNoItems);

    if (step === 5) {
      const name = state.name.trim();
      if (!name) return fail(5, s.errNameRequired, nameField);
      if (name.length < 2) return fail(5, s.errNameShort, nameField);
      const phone = state.phone.trim();
      if (!phone) return fail(5, s.errPhoneRequired, phoneField);
      if (!PHONE.test(phone)) return fail(5, s.errPhoneFormat, phoneField);
    }
    return true;
  }

  function fail(step: number, message: string, field?: HTMLInputElement) {
    setError(step, message);
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.focus();
    }
    return false;
  }

  /* ---- summary ------------------------------------------------------- */

  function renderSummary(target: HTMLElement) {
    const branch = branchOf(state.location);
    const rows: string[] = [];

    rows.push(
      `<p class="font-utility font-bold uppercase text-t1">${s.pickupAt}</p>
       <p class="text-t3">${branch?.label ?? ''}<br>${branch?.address ?? ''}</p>
       <p class="font-utility font-bold text-t4">${formatDay(state.day)} · ${state.slot ?? ''}</p>`
    );

    rows.push(
      `<ul class="list-none p-0 m-0 flex flex-col gap-s2">` +
        itemEntries()
          .map(
            ([id, q]) =>
              `<li class="flex justify-between gap-s3 text-t2">
                 <span>${q}× ${escape(nameOf(id))}</span>
                 <span class="font-utility font-bold">${priceOf(id) * q} ${s.currency}</span>
               </li>`
          )
          .join('') +
        `</ul>`
    );

    rows.push(
      `<p class="flex justify-between gap-s3 font-utility font-bold text-t4 border-t-4 border-brand-ink pt-s2">
         <span>${s.total}</span><span>${total()} ${s.currency}</span>
       </p>`
    );

    rows.push(
      `<p class="text-t2">${escape(state.name)} · ${escape(state.phone)}</p>`
    );

    target.innerHTML = rows.join('');
  }

  const escape = (v: string) =>
    v.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

  function formatDay(iso: string | null): string {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    const key = (['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as DayKey[])[
      (date.getUTCDay() + 6) % 7
    ];
    return `${s.days[key]} ${d}. ${m}.`;
  }

  /* ---- step machine --------------------------------------------------- */

  function show(step: number, moveFocus = true) {
    state.step = step;
    save();

    steps.forEach((el) => (el.hidden = el.dataset.step !== String(step)));

    chips.forEach((chip) => {
      const n = Number(chip.dataset.stepChip);
      // On the confirmation screen every step is behind us, so none is current
      // and all of them read as done.
      chip.toggleAttribute('data-done', step === DONE_STEP || n < step);
      if (n === step) chip.setAttribute('aria-current', 'step');
      else chip.removeAttribute('aria-current');
    });

    if (step === 2) renderDays();
    if (step === 3) renderSlots();
    if (step === 6) renderSummary(summaryBox);
    if (step === DONE_STEP) renderSummary(receiptBox);

    backBtn.hidden = step === 1 || step === DONE_STEP;
    nextBtn.hidden = step >= LAST_STEP;
    sendBtn.hidden = step !== LAST_STEP;
    restartBtn.hidden = step !== DONE_STEP;

    if (moveFocus) {
      const heading = steps
        .find((el) => el.dataset.step === String(step))
        ?.querySelector<HTMLElement>('[data-step-heading]');
      heading?.focus();
    }
  }

  form.querySelectorAll<HTMLInputElement>('input[name="location"]').forEach((input) => {
    input.checked = input.value === state.location;
    input.addEventListener('change', () => {
      if (state.location !== input.value) {
        // A different branch has different hours, so a day or slot chosen for
        // the old one may not exist here. Drop them rather than carry a
        // selection that is no longer true.
        state.location = input.value;
        state.day = null;
        state.slot = null;
      }
      save();
    });
  });

  nextBtn.addEventListener('click', () => {
    if (!validate(state.step)) return;
    show(Math.min(state.step + 1, LAST_STEP));
  });

  backBtn.addEventListener('click', () => {
    clearErrors();
    show(Math.max(state.step - 1, 1));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Re-check every step, not just the last: someone can refresh into step 6.
    for (let step = 1; step <= LAST_STEP - 1; step += 1) {
      if (!validate(step)) {
        show(step);
        return;
      }
    }
    show(DONE_STEP);
  });

  restartBtn.addEventListener('click', () => {
    state = blank();
    save();
    form.querySelectorAll<HTMLInputElement>('input[name="location"]').forEach((i) => (i.checked = false));
    form.querySelectorAll<HTMLElement>('[data-qty]').forEach((el) => (el.textContent = '0'));
    nameField.value = '';
    phoneField.value = '';
    show(1);
  });

  /* Restoring from storage must not land on a step the data cannot support —
     a refresh at step 5 with a cleared basket goes back to step 4. */
  let restored = state.step;
  if (restored === DONE_STEP) restored = DONE_STEP;
  else {
    for (let step = 1; step < restored; step += 1) {
      if (!validate(step)) {
        restored = step;
        break;
      }
    }
  }
  clearErrors();
  show(restored, false);
}
