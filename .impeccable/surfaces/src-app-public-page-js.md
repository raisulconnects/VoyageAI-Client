---
version: 1
slug: "src-app-public-page-js"
primary_target: "src/app/(public)/page.js"
related_targets: ["src/app/(public)/explore/page.jsx","src/app/(public)/destinations/[id]/page.jsx"]
---

# Landing page (/)

Mode: Persuade. Code-led build (no image generation).

Audience: occasional leisure planners and frequent travelers arriving cold; recruiters evaluating the project. Job: understand in seconds that VoyageAI drafts a priced, day-by-day plan you can rewrite in plain words, then start one.
Action: the working plan form (where, days, budget) in the first viewport. Signed in: goes to /ai-planner prefilled. Signed out: goes to /register, then on to the planner.
Proof: a sample Kyoto plan drawn as a data portrait (labelled "Sample plan"), the 8 real destinations from the API, live global stats with no inflation. Sample quotes stay as clearly labelled sample content.
Constraints: no invented claims (no offline, flights, bookings, live chat). Every control works.

## Direction contract

THESIS: A trip is an argument made in numbers. The page draws the plan and its money as a Du Bois data portrait, refusing the category default of a photo hero with a search bar and a row of cards.

OWN-WORLD: Aged-board ground (#EFE6D2), ink black (#161412) structure bands, crimson (#B8232F) for the primary action and the spiral, gold (#D99A1E) for highlights, emerald (#1F6A4A) for completed and positive data. Flat ink fills with no gradients, glass or glow. Condensed capitals (Big Shoulders Display) for display text. Sofia Sans Condensed in tracked capitals for captions, Sofia Sans for reading text. Hairline-to-thick ink rules frame each region. Colour-stripe tiles mark the brand. Charts are hand-built SVG: spiral, wrapped bars, stepped squares.

STORY: The visitor sees a real-looking priced plan, understands they can ask for one with three facts, believes it because the plan is concrete and the destinations are real, and fills the form.

FIRST VIEWPORT: A black nav band. On the left, a crimson-underlined display headline "SEVEN DAYS IN KYOTO FOR $2,000.", a two-line lede and the plan form (where / days / budget, crimson submit). On the right, the sample plan's budget as a large crimson spiral that unrolls into category bars, with the day list beside it. The primary action sits under the lede at the left.

FORM: Du Bois data portraits (catalog challenger dubois-data-portraits), chosen by the user over the assigned guidebook direction. seed:1c3b16a80589f79f. Signature interaction: the budget spiral unrolls into bars (the same quantity, re-encoded) on load and on hover or focus. Motion grammar: ink-draw stroke reveals with exponential ease-out, content visible by default, frozen under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
