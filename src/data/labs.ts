export type Verdict = 'good' | 'bad';

export interface Lab {
  /** URL segment: /labs/<slug> */
  slug: string;
  /** File name (no extension) in src/components/labs/ */
  component: string;
  title: string;
  /** One line shown on the card and under the lab title. */
  tagline: string;
  /** The industry name for the pattern being demonstrated. */
  pattern: string;
  verdict: Verdict;
  tags: string[];
  /** Instruction shown above the demo so the user knows what to try. */
  task: string;
  /** Revealed after the user commits to a judgement. */
  whatHappened: string[];
  why: string;
  spot: string[];
  fix: string[];
  /** Real-world regulatory / research context. Optional. */
  context?: string;
}

export const labs: Lab[] = [
  {
    slug: 'phantom-scarcity',
    component: 'PhantomScarcity',
    title: 'The Last Appointment on Earth',
    tagline: 'A countdown, a crowd, and exactly one slot left — forever.',
    pattern: 'False urgency & phantom scarcity',
    verdict: 'bad',
    tags: ['urgency', 'pressure', 'bait & switch'],
    task: 'Try to book this appointment. Then reset the demo and watch what the "last slot" and the timer do.',
    whatHappened: [
      'The countdown reset to a full five minutes every time it expired — no slot was ever actually held for you.',
      'The "viewing now" counter was a random number regenerated on a timer, not a count of real patients.',
      '"Only 1 appointment left this week" never decreased, no matter how many times the demo was reset.',
      'Booking the slot triggered a "that time just went" message offering a costlier one — the cheap slot was bait.',
    ],
    why:
      'Urgency signals work because users read them as information about the world: if the 9:15 really is about to go, hesitating is expensive. When the signal is fabricated, it stops being information and becomes pure pressure. It pushes people past the point where they would have checked another clinic, read the cancellation terms, or noticed the price — which is the entire point. With appointments the damage compounds: people book the wrong time, for the wrong service, then no-show, and the clinic blames the patient for a booking its own interface rushed.',
    spot: [
      'Reload the page. Real scarcity survives a refresh; a timer that restarts at 5:00 was theatre.',
      'Open the same slot in a second tab. Do the "12 people viewing" numbers agree?',
      'Watch whether the scarcity claim ever changes. A counter permanently stuck at 1 is not counting anything.',
      'Check whether the claim is specific ("2 slots with Dr Okafor on Thu") or vague ("appointments are in high demand").',
    ],
    fix: [
      'Only show a count when you are reading it from the real diary, and let it go up as well as down.',
      'If you hold a slot, actually hold it — lock it server-side for a stated number of minutes and honour it.',
      'Replace manufactured urgency with genuine decision support: next available time, typical wait, cancellation deadline.',
      'Make the booking button lead to the slot it advertised. If it is gone, say so plainly and without an upsell in the same breath.',
    ],
    context:
      'Fabricated countdowns and fake "others viewing" counters are treated as misleading commercial practices in the EU (Unfair Commercial Practices Directive) and are explicitly named as dark patterns under Article 25 of the Digital Services Act.',
  },
  {
    slug: 'drip-pricing',
    component: 'DripPricing',
    title: 'Forty-Nine Dollars*',
    tagline: 'The consultation fee you were shown, and the four charges you were not.',
    pattern: 'Drip pricing / hidden fees',
    verdict: 'bad',
    tags: ['pricing', 'transparency'],
    task: 'Book the $49 initial assessment. Follow the flow to the payment step and watch the total.',
    whatHappened: [
      'The headline price was $49 for a 45-minute assessment.',
      'A "booking fee" appeared at step 2, after you had started entering your details.',
      'A new-patient admin fee, a card processing charge and tax appeared only on the final screen.',
      'The real total was roughly 80% above the number that made you click.',
    ],
    why:
      'Drip pricing exploits sunk cost. Every step you complete — time slot, contact details, card — raises the cost of walking away, so the fee that would have lost the booking on the search page is survivable on the payment page. In healthcare and personal services it does something worse than in retail: people book appointments when they are unwell, anxious, or in pain, and that is precisely when the energy to restart a comparison somewhere else is lowest. The fee lands on the person least able to push back on it.',
    spot: [
      'Compare the first number you saw with the number on the payment screen. Any gap is the drip.',
      'Look for asterisks, "+ fees where applicable", or a total that only appears after a form.',
      'Check whether a fee is per booking or per person — admin fees often apply to each attendee.',
      'See if the full breakdown is available before you hand over personal or health data. If not, that is the tell.',
    ],
    fix: [
      'Show the all-in price on the slot itself, at the same size as the headline fee.',
      'Make the breakdown available at every step — a total that never changes is what builds trust.',
      'If a charge is unavoidable, it is part of the price. Only genuinely optional extras belong outside the headline number.',
      'Never introduce a new mandatory charge after the user has entered payment details.',
    ],
    context:
      'The UK Digital Markets, Competition and Consumers Act 2024 requires mandatory fees to be included in the headline price, and the US FTC\'s 2024 Rule on Unfair or Deceptive Fees targets the same practice across booked services.',
  },
  {
    slug: 'preticked-extras',
    component: 'PretickedExtras',
    title: 'Everything You Never Asked For',
    tagline: 'Five add-ons, all pre-selected, and a decline link that insults you.',
    pattern: 'Preselected opt-ins & confirmshaming',
    verdict: 'bad',
    tags: ['consent', 'upsell', 'manipulation'],
    task: 'Book the appointment without buying a single extra. Count how many separate actions that takes.',
    whatHappened: [
      'Every add-on was checked by default, so doing nothing meant buying all five.',
      'The decline options were small grey text while "Add" was a large primary button.',
      'Declining cancellation cover required clicking a link that called you irresponsible — confirmshaming.',
      'One extra re-checked itself when you changed the appointment time, quietly reinstating a charge you had removed.',
    ],
    why:
      'Defaults are the single strongest lever in interface design, because most people never change them. That is fine when the default is what an informed user would choose anyway, and it is extraction when the default is what makes you the most money. Confirmshaming stacks a second mechanism on top: it turns a pricing decision into a small social judgement, so declining costs a little dignity. Both work. Both also teach patients that your booking form cannot be trusted at a glance — which is a bad thing to teach someone you want to show up on time and pay attention to your pre-appointment instructions.',
    spot: [
      'Scroll the whole booking form before entering anything and look for ticked boxes you did not tick.',
      'Compare the visual weight of accept versus decline. Equal choices should look equal.',
      'Read the decline copy out loud. If it sounds like a disappointed parent, it is engineered.',
      'Change something upstream (the time, the practitioner) and re-check your selections — some reset.',
    ],
    fix: [
      'Ship every optional extra unchecked. Consent that was not given is not consent.',
      'Give accept and decline the same visual weight and the same number of clicks.',
      'Write neutral decline copy: "No thanks" is a complete sentence.',
      'Never re-add a removed item as a side effect of an unrelated change.',
    ],
    context:
      'Pre-ticked boxes for paid extras have been unlawful in the EU since the 2011 Consumer Rights Directive, which requires express consent for any payment beyond the main service.',
  },
  {
    slug: 'date-picker-maze',
    component: 'DatePickerMaze',
    title: 'Pick a Time. Any Time.',
    tagline: 'Six dropdowns, an ambiguous format, and a form that erases itself.',
    pattern: 'Hostile input design',
    verdict: 'bad',
    tags: ['forms', 'accessibility', 'errors'],
    task: 'Book an appointment for the 3rd of March at 2:30pm. Try to do it in under a minute.',
    whatHappened: [
      'The date was three dropdowns and the time was three more, so one appointment cost six interactions.',
      'The text field accepted "03/05" without saying whether that was March 5th or May 3rd.',
      'Times the clinic does not offer were rejected only after submitting, never marked in advance.',
      'Every validation error cleared the entire form, including the fields that were correct.',
    ],
    why:
      'This one is usually not malice — it is a data model leaking into the interface. Someone stored day, month, year, hour and minute as separate columns and built the form to match. The result still costs real money: slot selection is the first interaction in every booking funnel, and it is where mobile users and screen-reader users drop out. Clearing a valid form on error is the part users never forgive; it turns a small mistake into a total restart, and it is entirely avoidable.',
    spot: [
      'Count the interactions needed to enter one appointment. More than a couple is a smell.',
      'Look for an ambiguous numeric format with no example and no locale hint.',
      'Try an obviously impossible time (3am on a Sunday) and see when it complains.',
      'Trigger an error deliberately and check whether your other answers survived.',
    ],
    fix: [
      'Show the real diary: a calendar with bookable times as buttons, not a form to guess into.',
      'Mark unavailable times in the interface itself, with the reason, before submission.',
      'Validate inline and on blur, and never discard input the user already gave you.',
      'If you must accept typed input, state the format with a live example and echo back the parsed date.',
    ],
  },
  {
    slug: 'honest-slot-picker',
    component: 'HonestSlotPicker',
    title: 'A Slot Picker That Answers Questions',
    tagline: 'Real availability, prices per slot, rules up front, and full keyboard control.',
    pattern: 'Progressive disclosure done right',
    verdict: 'good',
    tags: ['forms', 'accessibility', 'transparency'],
    task: 'Book a 45-minute assessment. Try a day that is closed, and try the whole thing with arrow keys and Enter.',
    whatHappened: [
      'Each day showed how many slots it actually had, so you could see where the availability was before clicking.',
      'Closed and fully-booked days were visibly marked and explained rather than silently rejected.',
      'Each time slot carried its own duration, practitioner and all-in price — the evening premium was visible before you chose it.',
      'The cancellation rule was stated above the picker, and the summary updated live as you selected.',
    ],
    spot: [
      'The information you need to decide is inside the control you decide with.',
      'Constraints are stated before you can violate them, not after.',
      'Nothing is hidden until a later step — the price moves as you move.',
      'It works with a keyboard, which usually means it works with a screen reader too.',
    ],
    fix: [
      'Keep it: surface real availability, duration and price inside the picker.',
      'State the rules (cancellation window, deposit, who you will see) above the grid.',
      'Maintain a live summary — date, time, practitioner, price — next to the control.',
      'Implement roving-tabindex arrow navigation and announce selection changes politely.',
    ],
    why:
      'A slot picker is a decision tool, not a data-entry chore. Users are not recording an appointment they already chose — they are choosing, and what they most want to know is when there is actually space, what it costs, and what happens if their week changes. Putting availability, price and the cancellation rule into the picker answers all three at the moment of choosing, which removes the guess-submit-error loop entirely. It also makes the honest business case: when quiet mornings are visibly cheaper, people move to them instead of abandoning the booking.',
  },
  {
    slug: 'forced-account',
    component: 'ForcedAccount',
    title: 'Papers, Please',
    tagline: 'Twelve required fields between you and seeing whether anything is free on Thursday.',
    pattern: 'Forced registration & data maximalism',
    verdict: 'bad',
    tags: ['friction', 'privacy', 'forms'],
    task: 'Find out what appointments are available this week. You will need to get past the account wall first.',
    whatHappened: [
      'Available times were hidden behind mandatory account creation — you had to register to see a diary.',
      'Fields with no bearing on the booking (date of birth, full address, "how did you hear about us") were required.',
      'Password rules appeared only after you submitted a password that broke them.',
      'Marketing consent was bundled into the same required checkbox as the terms.',
    ],
    why:
      'Forced registration is friction placed exactly where intent is highest, and it is usually justified internally as "capturing the lead". What it actually captures is a lower booking rate and a database of low-quality accounts created under duress. Bundling marketing consent with terms acceptance is the more serious problem, and more so here than in retail: a list assembled this way is a list of people who contacted a clinic, which is sensitive by implication. Consent obtained as a condition of getting an appointment is not freely given.',
    spot: [
      'Ask what the service gains from each required field. If you cannot answer, it is data collection, not a booking form.',
      'Check whether guest booking exists at all, or whether it is hidden below the fold.',
      'Look for consent bundled with something you cannot decline.',
      'Note when the rules are revealed — good forms tell you the password policy before you type.',
    ],
    fix: [
      'Show availability to everyone. Ask for identity only when you genuinely need it — at the point of holding the slot.',
      'Make every field earn its place; default to optional and collect clinical detail at intake, not at booking.',
      'Offer guest booking with an optional "save this for next time" after the appointment is confirmed.',
      'Separate marketing consent from terms acceptance, and leave it unticked.',
    ],
    context:
      'Under the GDPR, consent must be freely given and specific; bundling marketing opt-in with contract acceptance means it is neither. Where the contact list implies a health condition, the data is a special category and the bar is higher still.',
  },
  {
    slug: 'guest-booking',
    component: 'GuestBooking',
    title: 'Three Fields and a Confirmation',
    tagline: 'The same appointment, asking only for what the appointment needs.',
    pattern: 'Minimal-friction booking',
    verdict: 'good',
    tags: ['forms', 'conversion', 'privacy'],
    task: 'Book the appointment. Notice how much you were asked for, and when the account offer arrived.',
    whatHappened: [
      'Three fields: name, mobile, email. Everything clinical was deferred to the intake form after confirmation.',
      'The price, the cancellation deadline and the no-show policy were on screen while you confirmed.',
      'The account offer came after the booking was confirmed, when it cost you nothing to decline.',
      'Reminder messages were on by default and separate from marketing, which was unticked.',
    ],
    why:
      'Every field is a chance to leave. The discipline is deciding what you need to hold the appointment versus what you would like to have — the second list belongs after the confirmation, or in an intake form the patient fills in when they are sitting down rather than standing on a platform. The account offer converts better in that position too: the user has just had a good experience and a reason to save their details, rather than being taxed before receiving anything.',
    spot: [
      'The form asks for what the booking requires and nothing else.',
      'Terms that affect your money and your time are visible at the moment you commit.',
      'Optional things are visibly optional and cost one click to skip.',
      'Anything the business wants (accounts, newsletters, reviews) is asked for after value is delivered.',
    ],
    fix: [
      'Keep it: guest booking first, account second, clinical detail third.',
      'Put the cancellation deadline next to the confirm button, not in a linked policy page.',
      'Autofill-friendly inputs: correct autocomplete tokens, correct input types, correct labels.',
      'Default service reminders on, marketing off, and keep the two visibly separate.',
    ],
  },
  {
    slug: 'roach-motel',
    component: 'RoachMotel',
    title: 'Easy to Book',
    tagline: 'One click to take the slot. Now try to cancel it.',
    pattern: 'Roach motel',
    verdict: 'bad',
    tags: ['cancellation', 'asymmetry', 'support'],
    task: 'Book the appointment, then cancel it. The demo counts your clicks in each direction.',
    whatHappened: [
      'Booking took one click. Cancelling took a trail through help centre, chatbot, and a form.',
      'The cancel path routed through a chatbot that could not cancel and a phone line with limited hours.',
      'The final form demanded a booking reference that was only in the confirmation email.',
      'A retention offer was interposed between you and the button you were looking for.',
    ],
    why:
      'The asymmetry is the pattern: a business optimises the direction that makes money and neglects — or deliberately obstructs — the direction that costs it. With appointments it is self-defeating in an unusually direct way. A patient who cannot cancel in thirty seconds does not keep the appointment; they simply do not turn up. The clinic then loses the slot entirely, having spent a year of design effort making sure it could not be released to someone else in time.',
    spot: [
      'Compare click counts in both directions. Large asymmetry is the whole diagnosis.',
      'Watch for a channel switch — if online booking requires a phone call to undo, that is intentional.',
      'Look for information demanded on the cancel path that the service already has.',
      'Notice retention offers placed on the path to a button rather than after it.',
    ],
    fix: [
      'Rule of thumb: cancelling must never take more steps than booking did.',
      'Put "Cancel" and "Reschedule" in the confirmation email and the appointment itself, one tap each.',
      'Accept the same identity you accepted at booking — do not demand a reference you emailed.',
      'Make the retention or reschedule offer after the cancellation is confirmed, or not at all.',
    ],
    context:
      'The FTC\'s Negative Option ("click-to-cancel") rulemaking is built on this exact principle: cancellation must be at least as simple as the sign-up that created the obligation.',
  },
  {
    slug: 'consent-trickery',
    component: 'ConsentTrickery',
    title: 'Do Not Not Contact Me',
    tagline: 'Six checkboxes, mixed defaults, and at least one double negative.',
    pattern: 'Trick wording & interface interference',
    verdict: 'bad',
    tags: ['consent', 'privacy', 'copy'],
    task: 'Set your preferences so that you get appointment reminders and nothing else. Then submit and see what you actually agreed to.',
    whatHappened: [
      'Some boxes meant opt-in and others meant opt-out, with no visual distinction.',
      'One was phrased as a double negative, so ticking it did the opposite of what it looked like.',
      '"Select all" quietly included the marketing consents alongside the appointment reminders.',
      'The final summary showed several subscriptions you almost certainly did not intend.',
    ],
    why:
      'Every one of these tricks attacks the same weak point: people pattern-match checkbox lists instead of reading them, and interfaces are supposed to reward that. Mixing polarity within a single list breaks the pattern deliberately, so the fast reading is wrong. It is not a comprehension test users can win by being careful — with six items, some will always misparse one, which is precisely the yield the design is tuned for. Burying the appointment reminder in that list is the cynical part: the one message the patient actually needs is camouflaged among five they do not.',
    spot: [
      'Read each label and ask: does ticking this give me more messages or fewer?',
      'Flag any sentence with two negatives — rewrite it in your head before deciding.',
      'Check "select all" against the list afterwards; it often reaches further than it implies.',
      'Compare the confirmation summary with what you thought you chose.',
    ],
    fix: [
      'One polarity for the whole list: ticking always means "yes, send me this".',
      'Never use negatives in a consent label. "Text me my appointment reminders" beats "Do not exclude me from reminders".',
      'Keep operational messages (reminders, cancellations, results) out of the marketing list entirely.',
      'Show a plain-language summary before submit, and let people change it from there.',
    ],
  },
  {
    slug: 'transparent-total',
    component: 'TransparentTotal',
    title: 'The Number You Will Actually Pay',
    tagline: 'All-in pricing, honest availability, and no timer anywhere.',
    pattern: 'Honest price presentation',
    verdict: 'good',
    tags: ['pricing', 'transparency', 'trust'],
    task: 'Compare the three clinics and pick the cheapest for the same assessment. Expand a breakdown while you do it.',
    whatHappened: [
      'Each clinic showed the all-in price for the same 45-minute assessment, with the advertised "from" price as the secondary number.',
      'The breakdown was one click away from the results, before any personal data.',
      'The cheapest advertised price was not the cheapest appointment — and the interface let you see that.',
      'Availability was stated only where it was real, and there was no countdown at all.',
    ],
    why:
      'Showing the total is not just a compliance exercise; it changes what the interface is for. A results page that ranks on the "from" price ranks on how aggressively each clinic has unbundled its fees. A results page that ranks on the all-in total ranks on price, which is what the user asked for. The absence of urgency furniture matters too: nothing on the page is trying to make the decision faster than it should be, which is what "trustworthy" actually looks like when someone is choosing who to see about their back.',
    spot: [
      'The biggest number on the card is the one you will be charged.',
      'The breakdown is reachable before you identify yourself.',
      'Availability claims are specific, and absent when there is nothing true to say.',
      'No timers, no "12 people viewing", no strikethrough price without a real reference price.',
    ],
    fix: [
      'Keep it: sort and display on the all-in price for the service actually being booked.',
      'Make every component of the price inspectable from the results page.',
      'Say nothing rather than manufacturing an urgency claim.',
      'Show the cancellation deadline as a rule, in the card, where it affects the comparison.',
    ],
  },
];

export const labBySlug = (slug: string): Lab | undefined =>
  labs.find((lab) => lab.slug === slug);

export const labIndex = (slug: string): number =>
  labs.findIndex((lab) => lab.slug === slug);
