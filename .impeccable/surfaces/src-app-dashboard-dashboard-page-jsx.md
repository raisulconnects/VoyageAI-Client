---
version: 1
slug: "src-app-dashboard-dashboard-page-jsx"
primary_target: "src/app/(dashboard)/dashboard/page.jsx"
related_targets: ["src/app/(dashboard)/ai-planner/page.jsx","src/app/(dashboard)/my-trips/page.jsx"]
---

# Signed-in workspace (dashboard, trips, planner, chat, profile)

Mode: Operate. Code-led build.

Audience: travelers returning to plan or check trips, both occasional and frequent. Tasks: see what is next and whether the money holds; generate, refine and save a plan; find, edit or delete a trip; ask a travel question.
States worth designing: AI drafting (10–30 s), AI failure or overload with retry, empty trip list, trip without a cover or breakdown, saved filter with no matches, deleting a trip.
Constraints: every existing route and API call is kept. Navigation is consolidated as Overview / Trips (All, Saved, Manage) / New trip / Plan with AI / Ask AI, plus Profile. On mobile it becomes a bottom tab bar.

## Direction contract

THESIS: The workspace is a ledger of trips in Du Bois' visual language: standard controls and a calm board ground, with money and time drawn as purposeful charts. It refuses the generic dark SaaS dashboard of equal glass tiles.

OWN-WORLD: The same tokens as the landing page. An ink-black navigation rail with a colour-stripe brand tile. The active item is a crimson block. The page is aged board, and panels are framed with ink rules instead of shadows. Status is shown as a mark plus a word: Planning (open ring), Upcoming (gold square), Completed (emerald tick). Numbers are set in tabular figures.

STORY: A returning traveler sees their next trip and countdown first, then the money portrait, then everything else one click away. A planner user drafts, refines and saves without losing work.

FIRST VIEWPORT: On the Overview, an ink rail on the left. The main area starts with a header band: "NEXT: LISBON · IN 48 DAYS" in display caps, with dates and budget. Below it, a single-line figures row (trips, countries planned, total budgeted). Below that, the itemised budget as wrapped bars, the expenses chart, and upcoming trips. The planner is two panes: the brief on the left, the drawn itinerary with its refine thread on the right.

FORM: Du Bois data portraits applied under Operate rules: the world lends type, palette, density and one signature move. The signature move is the budget portrait (spiral and wrapped bars) on the Overview and the trip page. seed:1c3b16a80589f79f.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
