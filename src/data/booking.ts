/**
 * The invented service everything on the site is about.
 * The agency, the test centre and the instructors are all fictional.
 */

export const site = {
  name: 'Körklar',
  partners: 1284,
};

export const service = {
  centre: 'Trafikövningsplats Hagalund',
  city: 'Sollentuna',
  fromPrice: 325,
};

export interface ProvTyp {
  id: string;
  name: string;
  price: number;
  minutes: number;
}

export const provtyper: ProvTyp[] = [
  { id: 'kunskap', name: 'Kunskapsprov', price: 325, minutes: 50 },
  { id: 'korprov', name: 'Körprov', price: 800, minutes: 45 },
  { id: 'bada', name: 'Båda', price: 1125, minutes: 95 },
];

export const provById = (id: string) => provtyper.find((p) => p.id === id);

/** Toggle add-ons, all on by default. */
export const extraCopy: Record<string, { name: string; note: string; price: string }> = {
  ombokning: { name: 'Ombokningsskydd', note: 'Boka om en gång utan avgift', price: '149 kr' },
  sms: { name: 'Påminnelse via SMS', note: '24 timmar innan', price: '29 kr' },
  hamta: { name: 'Hämtning till provplatsen', note: 'Från din adress', price: '249 kr' },
  plus: { name: 'Körklar Plus', note: '14 dagar gratis, sedan 79 kr/mån', price: '0 kr' },
};

export const kallelseOptions = [
  { id: 'app', name: 'I appen', fee: 0, blocked: true },
  { id: 'sms', name: 'SMS', fee: 39 },
  { id: 'post', name: 'Post', fee: 89 },
  { id: 'epost', name: 'E-post', fee: 25 },
];

/** Weekday labels for the calendar, Monday first. */
export const weekdays = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];

export const months = [
  'januari', 'februari', 'mars', 'april', 'maj', 'juni',
  'juli', 'augusti', 'september', 'oktober', 'november', 'december',
];
