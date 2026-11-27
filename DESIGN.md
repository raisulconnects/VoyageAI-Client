---
name: VoyageAI
description: Trip plans drawn to the dollar, a Du Bois data portrait of where, how long and how much.
colors:
  board: "#efe6d2"
  board-deep: "#e7dcc4"
  field: "#f7f2e7"
  ink: "#161412"
  ink-soft: "#3d362d"
  muted: "#5f5649"
  placeholder: "#6e6557"
  rule: "#c9bb9e"
  smoke: "#a69f92"
  crimson: "#b8232f"
  crimson-deep: "#961b25"
  crimson-wash: "#f2d7d2"
  gold: "#d99a1e"
  gold-wash: "#f4e2b8"
  emerald: "#1f6a4a"
  emerald-wash: "#d4e3d6"
  data-umber: "#7a4a2a"
  data-ochre: "#e0b54a"
typography:
  display:
    fontFamily: "Big Shoulders, Sofia Sans Condensed, ui-sans-serif, sans-serif"
    fontSize: "6rem"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Big Shoulders, Sofia Sans Condensed, ui-sans-serif, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Big Shoulders, Sofia Sans Condensed, ui-sans-serif, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.09em"
  numeral:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    fontFeature: "tnum"
rounded:
  none: "0px"
  xs: "2px"
  sm: "3px"
spacing:
  gutter-mobile: "16px"
  gutter-public: "20px"
  gutter-desktop: "32px"
  section: "64px"
  container-app: "1200px"
  container-public: "1280px"
  rail: "248px"
components:
  button-primary:
    backgroundColor: "{colors.crimson}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.crimson-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-ink-hover:
    backgroundColor: "{colors.ink-soft}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    rounded: "{rounded.sm}"
    height: "44px"
  button-danger-hover:
    backgroundColor: "{colors.crimson}"
  button-sm:
    padding: "0 14px"
    height: "36px"
  button-lg:
    padding: "0 28px"
    height: "52px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "44px"
  field-label:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
  trip-card:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px 16px"
  nav-rail:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    width: "{spacing.rail}"
  nav-item-active:
    backgroundColor: "{colors.crimson}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    height: "44px"
  status-upcoming:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  modal:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  error-state:
    backgroundColor: "{colors.crimson-wash}"
    textColor: "{colors.crimson}"
    padding: "20px"
---

# Design System: VoyageAI

## Overview

**Creative North Star: "The Data Portrait"**

VoyageAI is drawn in W. E. B. Du Bois' 1900 visual language: an aged board, ink structure, and three flat inks (crimson, gold, emerald) that carry meaning. A trip is an argument made in numbers, so money and time are drawn as purposeful hand-built charts (a budget spiral that unrolls into wrapped bars, columns with values printed on top, stepped squares) rather than summarised in tiles. Everything else stays standard and calm so the charts can speak.

Display type is condensed capitals set tight and large; captions are tracked condensed capitals; reading text is a plain humanist sans. Regions are framed by ink rules, from a 1px hairline to a 3px bar, instead of floating cards. Black ink bands carry navigation on every surface: the public nav and footer, the app's side rail, and its mobile tab bar.

The redesign rejects the dark glassmorphism look it replaced: no gradients, no glass, no glow, no blurred panels. Colour is never the only signal. Every status, category and series is paired with a word, and sample content is labelled as sample.

**Key Characteristics:**
- Aged board ground, ink bands, flat crimson / gold / emerald fills
- Condensed display capitals, tracked caption capitals, tabular figures for every number
- Ink rules (1px, 1.5px, 3px) frame regions; corners are square or nearly so (2–3px)
- Hand-built SVG charts as the signature: spiral + bars, columns, glyphs
- Motion draws ink: strokes reveal, bars grow, exponential ease-out, frozen under reduced motion

## Colors

A three-ink palette on aged paper: crimson acts, gold highlights, emerald confirms, and ink structures everything.

### Primary
- **Du Bois Crimson** (`crimson`): the one action colour. Primary buttons, the active nav block, the hero underline bar, the budget spiral's lead segment, the peak column, focus outlines, caret colour, link underlines, and error text. **Deep Crimson** (`crimson-deep`) is its hover/pressed state. **Crimson Wash** (`crimson-wash`) backs error panels and the error-field focus ring.

### Secondary
- **Ochre Gold** (`gold`): highlight and selection. Text selection, the Upcoming status square, the skip link, avatar fallbacks, footer group headings on ink. **Gold Wash** (`gold-wash`) is the focus ring around a focused input: a soft ochre halo, not a glow.

### Tertiary
- **Ledger Emerald** (`emerald`): positive and completed. The Completed tick, positive data, the third data series. **Emerald Wash** (`emerald-wash`) backs positive callouts.

### Neutral
- **Aged Board** (`board`): the page ground everywhere, and text colour on ink bands.
- **Deep Board** (`board-deep`): image wells and empty plates behind photographs.
- **Field Paper** (`field`): raised paper for inputs, cards and toasts, slightly lighter than the ground.
- **Ink** (`ink`): text, rules, navigation bands, the rail, the fourth data series.
- **Soft Ink** (`ink-soft`): secondary text, ledes, field labels.
- **Muted Umber Grey** (`muted`): captions, units, hints, axis labels.
- **Placeholder** (`placeholder`): input placeholders only (meets contrast on field paper).
- **Rule Tan** (`rule`): light dividers where a full ink rule is too heavy.
- **Smoke** (`smoke`): scrollbars and the fifth data series.

### Data series
Chart series take inks in fixed order by size: crimson, gold, emerald, ink, smoke, then **Umber** (`data-umber`). Destination categories reuse the inks (Cultural crimson, Historical gold, Nature emerald, Adventure ink, Urban umber, Romantic deep crimson, Tropical **Light Ochre** `data-ochre`), always printed with the category name; gold and ochre tags take ink text, the rest white.

### Named Rules
**The Crimson Acts Rule.** Crimson marks the primary action and the active place. On any screen it is the one filled button colour; secondary actions are ink, outline or ghost.

**The Word Beside the Ink Rule.** No colour stands alone. Status marks carry their name, category tags print the category, every bar prints its value and percentage.

**The Flat Ink Rule.** Fills are solid inks. No gradients, no transparency washes layered for depth, no glow.

## Typography

**Display Font:** Big Shoulders (fallback Sofia Sans Condensed, sans-serif), with the optical-size axis
**Body Font:** Sofia Sans (fallback ui-sans-serif, system-ui)
**Label Font:** Sofia Sans Condensed (fallback Sofia Sans)

**Character:** Poster-condensed capitals with a reading sans beneath them, like the lettering and captions of a hand-drawn exhibition plate. The display face shouts the figure; the condensed caption names it; the body explains it.

### Hierarchy
- **Display** (800, 3.4rem → 4.8rem → 6rem, line-height 0.88, uppercase): the landing hero only, e.g. "SEVEN DAYS IN KYOTO FOR $2,000.", underlined by a crimson bar.
- **Headline** (800, 2.6rem → 3.25rem page headers; 2.8rem → 3.6rem landing sections; line-height 0.92, uppercase): page titles via PageHeader and section titles.
- **Title** (800, 1.5–1.9rem, line-height 0.95, uppercase): card and plate names, modal titles, empty-state titles, large totals.
- **Body** (400, 1rem, about 0.975rem in controls, line-height ~1.6): ledes and reading text, kept to 44–60ch; text-wrap pretty.
- **Label** (600, 0.68–0.95rem, letter-spacing 0.09em, uppercase): captions, field labels, nav items, button text, region titles, status words.
- **Numeral** (600, tabular figures): every money value, date, count and percentage. Large totals use display caps with tabular figures.

### Named Rules
**The Tabular Figure Rule.** Numbers are set in tabular figures so columns of money align; numbers are typed, never spun (no input steppers).

**The Caption Below Rule.** Tracked caps caption a figure, a field or a region; they never sit above a headline as a kicker or eyebrow.

## Layout

Public pages sit in a 1280px container with 20px / 32px gutters (mobile / ≥640px) and sections around 64px of vertical space. The landing first viewport is a two-column argument: headline, lede and the working plan form on the left; the sample budget spiral, its bars and the day list on the right. It stacks to one column on mobile.

The signed-in workspace is a 248px ink rail plus a 1200px main column with 16 / 24 / 40px gutters. Below the `lg` breakpoint (1024px) the rail becomes a 56px ink top bar and a fixed five-item ink tab bar (64px items, 3px crimson top edge, safe-area padded); main content reserves bottom space for it. Pages open with a PageHeader closed by a 3px ink rule, then Regions, each titled by a caption over an ink hairline. The density is ledger-like: rows separated by faint ink hairlines rather than stacked cards.

Breakpoints are Tailwind defaults: sm 640px, md 768px (public nav collapses to a menu below it), lg 1024px (app rail), xl 1280px.

## Elevation & Depth

The system is flat. Depth comes from ink rules and from ink bands that sit "above" the board by value, not by shadow. Resting panels, cards and regions carry no shadow; they are framed with 1.5px or 3px ink.

Shadows appear only on things that are actually lifted off the board: overlays and a hover response.

### Shadow Vocabulary
- **Ink lip** (`box-shadow: 0 1px 0 rgba(22,20,18,0.35)`): the primary button's pressed-paper edge.
- **Card lift** (`box-shadow: 0 10px 24px -16px rgba(22,20,18,0.55)`): TripCard on hover only, with a 2px rise.
- **Toast** (`box-shadow: 0 8px 24px -12px rgba(22,20,18,0.45)`): notifications.
- **Dialog** (`box-shadow: 0 24px 60px -20px rgba(22,20,18,0.6)`): the modal panel over a 55% ink scrim.
- **Focus wash** (`box-shadow: 0 0 0 3px var(--color-gold-wash)`; error: crimson-wash): input focus halo.

### Named Rules
**The Rule, Not the Shadow Rule.** A region is separated by an ink rule. A shadow is reserved for overlays and hover lift; never use one to frame a resting panel.

## Shapes

Corners are square. Controls (buttons, inputs, selects) take a barely-softened 3px radius (`rounded.sm`), with 2px (`rounded.xs`) available for small marks; cards, plates, panels, modals, tags and nav blocks are square. Avatars are the only circles.

Borders are the form language: 1.5px ink for controls, cards and dialogs; 3px ink for page-header closes, plate frames and chart totals; 1px ink hairlines (often at 15–80% opacity) for rows and region titles; 1.5px dashed ink at 35% for empty states. The brand tile is three vertical ink stripes (crimson, gold, emerald), and the InkStripe band (crimson / gold / emerald / ink at 3:2:2:1) edges ink bands.

## Components

### Buttons
Confident printed blocks, set in tracked caps.
- **Shape:** gently squared (3px radius).
- **Primary:** crimson fill, white caps, ink lip shadow; hover deep crimson. The one filled colour per screen.
- **Ink:** ink fill, board text; hover soft ink. For strong secondary actions.
- **Outline:** 1.5px ink border, ink text; hover inverts to ink fill. **Outline-light** is the same on ink bands (board border at 70%, inverts to board).
- **Ghost:** soft ink text; hover ink text on a 6% ink tint.
- **Danger:** ink fill that turns crimson on hover; confirm dialogs use the primary crimson button for the destructive step and a ghost "Keep it" that takes initial focus.
- **Sizes:** sm 36px, md 44px, lg 52px; icon 44×44 and icon-sm 36×36.
- **States:** press nudges down 1px; focus-visible 2px outline offset 2px in the variant's colour; disabled at 45% opacity; loading shows an inline spinner and sets aria-busy.

### Inputs / Fields
- **Style:** field paper ground, 1.5px ink border at 25% (45% on hover), 3px radius, 44px tall; caps label above in soft ink with an "Optional" note on the right; crimson caret.
- **Focus:** border goes full ink plus a 3px gold-wash halo.
- **Error:** crimson border, crimson-wash halo, crimson message with role="alert". Hints sit below in muted text.
- **Select:** native select with a drawn ink chevron. **Textarea:** same frame, vertical resize.

### Status marks
A drawn mark plus its word, in caps: **Planning** an open ink ring, **Upcoming** a gold square outlined in ink, **Completed** an emerald tick. A light tone sets the word in board for ink bands.

### Page header and regions
PageHeader: a headline in display caps, an optional soft-ink lede (max 60ch), actions aligned to the baseline on the right, closed by a 3px ink rule. Region: a caption title over a 1px ink hairline with an optional action at the right.

### Feedback
- **Loader:** three crimson bars of rising height pulsing in turn, with a caps label; role="status".
- **Skeleton:** an 8% ink block with a pulse.
- **EmptyState:** dashed ink frame, a small Du Bois chart glyph (squares, spiral, bars, steps, ring), a display title, one plain sentence, one action.
- **ErrorState:** 1.5px crimson frame on crimson wash, a caps crimson title, a sentence, an outline "Try again".

### Modal / ConfirmDialog
A square board panel with a 1.5px ink frame and the dialog shadow over an ink scrim; title in display caps over a 3px ink rule; footer actions right-aligned over a faint rule. It docks to the bottom edge on mobile. Focus is trapped, Esc closes, and focus returns to the opener.

### Trip card
A square field-paper card in a 1.5px ink frame: a 16:9 cover (or a steps glyph on deep board when no cover), status mark and day count, the trip name in title caps, the destination, then a ruled footer of Dates and Budget captions with tabular values. A square save toggle sits top-right in a 1.5px ink frame and inverts on hover; saved shows a crimson heart. Hover lifts 2px with the card-lift shadow and the cover scales 3%.

### Destination plate
A photograph framed in 3px ink like a mounted plate, with the category as a flat ink tag at the top-left corner, the name in display caps beneath, and the rating as a figure over a short crimson bar. Missing photos show the category glyph with "No photo yet".

### Budget portrait (signature)
An Archimedean spiral and a list of wrapped bars encoding the same budget. Segments are sorted by size and coloured in data-series order. The spiral reveals with ink-draw; each bar grows in after it. Hovering or focusing a bar re-draws that segment along the spiral and refills its bar, while other segments fade. Each bar prints its category, value and percentage, and sample data carries a "sample" caption. The total sits above the bars in display caps over a 3px ink rule.

### Column chart
Flat ink columns on a 2px ink baseline, with values printed on top in tabular figures and caps labels beneath; the peak column alone is crimson. Columns grow up in a stagger.

### Navigation
- **Public navbar:** a sticky 64px ink band, the brand tile and wordmark at left, caps links with a 3px underline for the current page, "Sign in" and a small crimson primary at right. Below md it becomes a menu of display-caps links with full-width buttons.
- **App rail:** a 248px ink column with caps items 44px tall; the active item is a solid crimson block, others are board at 80% with a faint hover tint; a "Browse" group and the profile block with sign-out sit below.
- **Mobile tab bar:** five icon+caps items on ink with a 3px crimson top edge; active is a crimson block.
- **Footer:** an ink band with gold caps group headings and board links.

### Motion
Motion draws ink and resolves quickly with exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`); fades use a quart ease-out. **ink-draw** reveals strokes over 1.4s; **grow-x** and **grow-y** grow bars and columns over 0.8–0.9s in a stagger; **seg-draw** re-draws one spiral segment over 0.75s; **fade-up** lifts content 6px over 0.5s. Content is visible by default. Under reduced motion every animation collapses to its end state.

## Do's and Don'ts

### Do:
- **Do** use crimson for the single primary action and the active nav item; use ink, outline or ghost for everything else.
- **Do** pair every colour with a word: status marks with their name, category tags with the category, bars with value and percentage.
- **Do** set every number in tabular figures and every large total in display caps.
- **Do** frame regions with ink rules (1px hairline, 1.5px frame, 3px close) instead of cards with shadows.
- **Do** draw money and time as charts (budget portrait, columns, glyphs) and print the values on the chart.
- **Do** label sample or illustrative content as sample, on the chart and in its accessible name.
- **Do** collapse every animation to its end state under prefers-reduced-motion.

### Don't:
- **Don't** use gradients, glassmorphism, backdrop blur or glow; the dark glass look this replaced is retired.
- **Don't** put a caps kicker or eyebrow above a headline; captions sit beside or beneath what they name.
- **Don't** use a shadow to frame a resting panel; shadows belong to overlays and hover lift only.
- **Don't** round cards, plates or panels; only controls take the 3px corner, and only avatars are circles.
- **Don't** rely on colour alone for status, category or series.
- **Don't** introduce new accent hues; extend series with the existing inks in their fixed order.
