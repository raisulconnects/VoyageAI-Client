# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Travelers planning trips, served equally in two situations:

- **Occasional leisure planners** (a few trips a year). They arrive wanting inspiration and a trustworthy plan: where to go, what to do each day, and whether the budget holds. They visit in bursts around a trip.
- **Frequent travelers** juggling several trips at once. They return often and want a fast overview of what is coming up, what is still being planned, and where the money goes.

Design for the occasional planner first, but keep repeat use efficient: no forced wizards, short paths to existing trips.

Secondary audience: recruiters and clients evaluating the project. It is a portfolio piece, so it must read as a shipped commercial product.

## Product Purpose

VoyageAI turns a few trip facts (destination, length, budget, travel style, special requests) into a day-by-day itinerary using Google Gemini, lets the traveler refine it in plain language, and saves it as a trip they can manage alongside the rest of their travel. Success: a visitor goes from "I want to go to Kyoto for a week on $2,000" to a saved, editable plan in one sitting.

## Positioning

The plan is a conversation, not a form result: generate, then say "make day 2 slower, add a food market", and the itinerary updates. Generated plans land in the same trip workspace as hand-made trips, with status, budget breakdown, and expenses.

## Operating Context

- Public: landing page, destination explorer (curated destinations with category, rating, best time to visit, daily budget, highlights), destination detail, about, contact, privacy, terms, sign in, register.
- Authenticated workspace: dashboard (stats, upcoming trips, budget distribution, recent expenses), My Trips (status filter), Saved Trips (search), new trip form, manage trips table (view/edit/delete), trip detail and edit, AI Planner (generate, refine by chat, save), AI Chat (multi-turn travel assistant), profile (avatar upload via imgbb, name, email, bio).
- Trip statuses: Planning, Upcoming, Completed (server derives Upcoming/Completed from dates).
- AI responses can take several seconds and can fail when Gemini is overloaded; the server falls back across models and returns a friendly 503 when all fail.

## Capabilities and Constraints

- Stack is fixed: Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, react-hook-form + Zod, TanStack Query, Recharts, sonner, react-icons. No new dependencies without strong reason.
- Backend contract (Express API at `NEXT_PUBLIC_API_URL`) is fixed; cookie-based JWT auth; all API calls go through `src/lib/api.js`.
- Terminology in code is inconsistent: "Add Destination" and "Manage Destinations" actually create and manage **trips**. Destinations are the curated public catalog.
- Currency is USD throughout.
- Not implemented (must not be presented as working): password reset, "remember me", newsletter signup, social accounts, live chat, offline access, destination wishlist, extra filters beyond category/search/status.

## Brand Commitments

- Name: VoyageAI. No logo asset exists.
- Content decision (confirmed): remove dead controls (non-functional buttons, forms and links); marketing placeholders such as testimonials may stay as clearly placeholder marketing content.

## Evidence on Hand

- 8 seeded destinations with real Unsplash photography, ratings, review counts, highlights (`VoyageAI-Server/src/scripts/seed.js`).
- Live global stats endpoint: total destinations, users, trips, average rating.
- Real product screens: AI planner output, trip dashboards, charts.
- No real customers, testimonials, press, or usage numbers beyond the live stats. Do not invent new ones.

## Product Principles

1. Show the plan, not the promise: the strongest proof is a real itinerary on screen.
2. Every control works. If a feature is not built, it is not shown as if it were.
3. Fast return: a repeat visitor reaches their next trip in one click.
4. Money is first-class: budgets and spend are always visible where decisions are made.
5. AI is a collaborator with visible limits: waiting, failures and "verify important info" are designed states, not afterthoughts.
