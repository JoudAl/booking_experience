# Körklar — provbokning med allt som kan gå fel

A single, seamless, deliberately hostile **appointment booking** flow in Swedish, built for a
booth exhibit. Pupils sit down, book a driving test that does not exist, and write what annoyed
them on sticky notes. There is no task instruction, no tutorial framing, no reveal, no
explanation, and nothing on the page that hints the experience is the point. It reads as an
ordinary — if irritating — booking site.

Two constraints shape everything:

- **Nothing can be typed into.** There is not a single text field in the DOM. Every interaction
  is a click, a tap or a drag, so the booth needs a mouse or a touchscreen and no keyboard.
- **Almost nothing to read.** Labels, numbers and controls carry the meaning. The friction is in
  what the widgets *do*, not in paragraphs describing it.

Everything is fictional: **Körklar** the booking service, **Hagalund** the test centre, and
every name, price and queue position. Nothing is submitted anywhere, no booking is made, no
payment is taken, and no request leaves the browser.

## The controls, and how each one betrays you

The flow is a tour of ordinary UI widgets, every one of them sabotaged in a way that is normal
somewhere on the real web.

| Control | Where | What it does |
|---|---|---|
| Checkbox list | Kakor | Switching one off switches it back on a moment later |
| Segmented control | Start | Fine — it is the honest one, so the rest read as deliberate |
| Dropdown | Välj tid | Every other test centre is "fullbokat"; the selection snaps back |
| Range slider | Välj tid | Widening the search reshuffles availability and silently discards your chosen slot |
| Calendar grid | Välj tid | Most days greyed out; the first free day you touch has "just gone" |
| Time chips | Välj tid | The cheap morning slots evaporate on click; evening carries +150 kr |
| Star rating | Identifiera dig | Under four stars is refused |
| Toggle switch | Identifiera dig | Data-sharing will not stay off |
| Toggle switches | Tillägg | Four add-ons pre-enabled; Körklar Plus re-enables itself; one is confirmshamed |
| +/− stepper | Tillägg | Pre-booked retakes start at 1 and will not go to 0 |
| Radio cards | Kallelse | The free option needs a subscription and bounces you to the 89 kr one |
| Accordion | Betala | The fee breakdown is collapsed by default and fills in while you look away |
| Drag to confirm | Betala | The first completed drag "avbröts" and slides back |
| Modal | throughout | Confirmshaming, and a reservation that expires and re-prices |

Plus the ambient furniture: a ten-minute reservation countdown that silently restarts at 00:00,
an invented "1 247 bokar just nu" counter, booking toasts from invented people in invented
towns, and a progress indicator that disagrees with itself ("Steg 1 av 3" → "Steg 4 av 6" →
"Steg 7 av 9") and with its own fill bar.

## The flow

One page, nine steps, no route changes.

`Kakor → Start → Kö → Välj tid → Identifiera dig → Tillägg → Kallelse → Betala → Bekräftelse →
Hjälp`

A run takes about three minutes. **Every step is beatable** — the frustration has to be
survivable, or pupils give up before they have anything to write down. The headline price is
325 kr; the drag-to-pay button typically says something over 2 000 kr.

The last step is a dead end by design: the chatbot cannot cancel, the phone line is open
10:00–10:30, and the cancellation form needs an order key that only arrives after the deadline
for using it.

## Running the booth

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # static output in ./dist
pnpm preview  # serve the built site
pnpm check    # type-check .astro and .ts
```

Put the browser in full screen. Nothing is persisted, so **reloading is a full reset.**

Two ways to get a clean start for the next pupil:

- **Tap the Körklar logo five times** quickly.
- **Wait.** Three minutes with no click, tap or keypress reloads the page by itself.

## Structure

- [`src/pages/index.astro`](src/pages/index.astro) — the whole site; imports the chrome and the
  nine step components.
- [`src/scripts/flow.ts`](src/scripts/flow.ts) — shared state, price maths, and `goTo()`, which
  is the entire router. Nothing touches `localStorage`.
- [`src/data/booking.ts`](src/data/booking.ts) — test types, add-ons, kallelse options.
- [`src/styles/global.css`](src/styles/global.css) — design tokens plus the shared control
  widgets (`.seg`, `.chip`, `.switch`, `.stepper`, `.range`, `.stars`, `.acc`, `.radio`).
- [`src/components/Chrome.astro`](src/components/Chrome.astro) — header, countdown, progress
  bar, toasts, and the booth reset.
- [`src/components/steps/`](src/components/steps/) — one component per screen, each owning its
  own markup, scoped styles and script.

Three things to know before editing: sections are shown and hidden with the `hidden` attribute,
so a component that sets its own `display` needs the global `[hidden]` rule in
[`global.css`](src/styles/global.css) to win; elements created in JavaScript do not get Astro's
scope attribute, so their styles need `:global()`; and any `<button>` inside a `<form>` needs an
explicit `type="button"` or it submits.

## Deployment

Pushing to `main` builds and publishes to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). One-time setup: **Settings →
Pages → Build and deployment → Source: GitHub Actions**.
