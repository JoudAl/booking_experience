/**
 * Shared client-side state for the booking flow.
 *
 * Everything lives in memory. Nothing is persisted: the booth needs each
 * visitor to start from a clean slate, and a reload is the fastest way there.
 */

export type StepId =
  | 'start'
  | 'queue'
  | 'booking'
  | 'account'
  | 'extras'
  | 'kallelse'
  | 'payment'
  | 'done'
  | 'help';

export interface Extra {
  id: string;
  price: number;
  on: boolean;
}

export interface FlowState {
  step: StepId;
  provtyp: string;
  provPrice: number;
  /** Evening / weekend surcharge attached to the chosen slot. */
  slotPremium: number;
  date: string;
  time: string;
  /** Stepper: pre-booked retakes, defaulted to one you did not ask for. */
  omprov: number;
  extras: Extra[];
  kallelse: string;
  kallelseFee: number;
  /** Set once the reservation timer has "expired" and re-priced the booking. */
  surcharged: boolean;
  bookingRef: string;
}

const randomRef = () =>
  'KK-' +
  Math.floor(100000 + Math.random() * 899999) +
  '-' +
  String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

export const state: FlowState = {
  step: 'start',
  provtyp: 'korprov',
  provPrice: 800,
  slotPremium: 0,
  date: '',
  time: '',
  omprov: 1,
  extras: [
    { id: 'ombokning', price: 149, on: true },
    { id: 'sms', price: 29, on: true },
    { id: 'hamta', price: 249, on: true },
    { id: 'plus', price: 0, on: true },
  ],
  kallelse: 'post',
  kallelseFee: 89,
  surcharged: false,
  bookingRef: randomRef(),
};

/* --- money ------------------------------------------------------- */

/** 1790 -> "1 790 kr", set the way Swedish prices are. */
export const kr = (n: number): string =>
  `${Math.round(n).toLocaleString('sv-SE').replace(/ /g, ' ')} kr`;

export const OMPROV_PRICE = 299;

export const provTotal = () =>
  state.provPrice + state.slotPremium + (state.surcharged ? 150 : 0);

export const extrasTotal = () =>
  state.extras.reduce((sum, e) => sum + (e.on ? e.price : 0), 0) +
  state.omprov * OMPROV_PRICE;

/** The charges that only ever surface on the payment screen. */
export const serviceFee = () => 59;
export const bookingFee = () => 79;
export const cardFee = () =>
  Math.round((provTotal() + extrasTotal() + serviceFee() + bookingFee() + state.kallelseFee) * 0.024);

export const grandTotal = () =>
  provTotal() + extrasTotal() + serviceFee() + bookingFee() + state.kallelseFee + cardFee();

/* --- navigation --------------------------------------------------- */

/** Deliberately inconsistent: one journey, counted three different ways. */
const PROGRESS: Partial<Record<StepId, string>> = {
  booking: 'Steg 1 av 3',
  account: 'Steg 2 av 3',
  extras: 'Steg 4 av 6',
  kallelse: 'Steg 5 av 6',
  payment: 'Steg 7 av 9',
};

export function goTo(step: StepId): void {
  state.step = step;

  for (const el of document.querySelectorAll<HTMLElement>('[data-step]')) {
    el.hidden = el.dataset.step !== step;
  }

  const bar = document.querySelector<HTMLElement>('[data-progress]');
  const label = PROGRESS[step];
  if (bar) {
    bar.hidden = !label;
    const text = bar.querySelector('[data-progress-label]');
    if (text && label) text.textContent = label;
  }

  window.scrollTo({ top: 0 });
  document.dispatchEvent(new CustomEvent('flow:step', { detail: step }));
}

export function onStep(step: StepId, fn: () => void): void {
  document.addEventListener('flow:step', (event) => {
    if ((event as CustomEvent<StepId>).detail === step) fn();
  });
}

/** Re-render hook for anything that shows a running total. */
export function refresh(): void {
  document.dispatchEvent(new CustomEvent('flow:change'));
}

export function onChange(fn: () => void): void {
  document.addEventListener('flow:change', fn);
  document.addEventListener('flow:step', fn);
}

/* --- modal helper ------------------------------------------------- */

export function openModal(id: string): void {
  const el = document.getElementById(id);
  if (el) el.hidden = false;
}

export function closeModal(id: string): void {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
}
