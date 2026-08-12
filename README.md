# Booking Experience Lab

A client-side tutorial site about **appointment booking** UX. Each lab is a working booking
interface you can actually use — take the slot, decline the extras, try to cancel. Then you judge
it, **good or bad**, and the reveal tells you which pattern you walked into, why it works on people,
and how it should have been built.

Seven labs demonstrate a dark pattern; three show the same job done honestly, mixed in without
warning so the judgement is a real one. The setting throughout is a physiotherapy clinic, but the
patterns are the ones every appointment system runs into: clinics, salons, garages, government
services, consultations.

- **Static and client-side only.** No backend, no analytics, no network calls. Progress lives in
  `localStorage`.
- **Built with [Astro](https://astro.build)** — zero framework runtime, one small hoisted script per
  page.
- **Theme-aware**, responsive, keyboard-operable.

## Labs

| # | Lab | Pattern | Verdict |
|---|-----|---------|---------|
| 01 | The Last Appointment on Earth | False urgency & phantom scarcity | Bad |
| 02 | Forty-Nine Dollars* | Drip pricing / hidden fees | Bad |
| 03 | Everything You Never Asked For | Preselected opt-ins & confirmshaming | Bad |
| 04 | Pick a Time. Any Time. | Hostile input design | Bad |
| 05 | A Slot Picker That Answers Questions | Progressive disclosure done right | Good |
| 06 | Papers, Please | Forced registration & data maximalism | Bad |
| 07 | Three Fields and a Confirmation | Minimal-friction booking | Good |
| 08 | Easy to Book | Roach motel | Bad |
| 09 | Do Not Not Contact Me | Trick wording & interface interference | Bad |
| 10 | The Number You Will Actually Pay | Honest price presentation | Good |

## Local development

Uses **pnpm** (npm 12's dependency resolver chokes on this graph).

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # static output in ./dist
pnpm preview  # serve the built site
pnpm check    # type-check .astro and .ts
```

## Deployment

Pushing to `main` (or `master`) builds and publishes to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**One-time setup:** in the repository, go to **Settings → Pages → Build and deployment** and set
**Source** to **GitHub Actions**. That's it — no `gh-pages` branch and no secrets required.

The workflow reads the site URL and base path from `actions/configure-pages`, so it works unchanged
whether the repo publishes to `https://<user>.github.io/<repo>/` or to a user/organisation site at
the domain root. Locally the base path defaults to `/`.

## Adding a lab

1. Create the demo component in `src/components/labs/YourLab.astro`. It renders inside the fake
   browser chrome and owns its own markup, scoped styles, and script.
2. Add an entry to the `labs` array in [`src/data/labs.ts`](src/data/labs.ts), setting `component`
   to the file name without the extension.

The route, the home-page card, the navigation, the progress tracking, and the cheat-sheet entry are
all generated from that array.

## Notes on the demos

Every screen is a simulation. Nothing is submitted anywhere, no appointment is made, no payment is
taken, and the clinics are invented. The manipulative behaviours — the resetting countdown, the
fabricated viewer counts, the re-checking add-on — are implemented faithfully because the point is
to experience them, but they are confined to the page you are on.
