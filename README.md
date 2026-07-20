# VoyageAI Client

AI-powered travel planning platform — **Next.js** frontend with intelligent itinerary generation, trip management, and an interactive AI travel assistant.

**Live demo:** [https://voyage-ai-client.vercel.app](https://voyage-ai-client.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Forms | react-hook-form + Zod  |
| Data Fetching | @tanstack/react-query |
| Charts | Recharts |
| Notifications | sonner |
| Icons | react-icons |

## Features

- **AI Trip Planner** — Generate personalized itineraries with Google Gemini; refine plans via natural-language chat; save to your dashboard
- **AI Travel Chat** — Multi-turn conversational assistant for travel questions and tips
- **Trip Dashboard** — Manage all your trips with status tracking (Planning / Upcoming / Completed), budget breakdowns, and expense charts
- **Destination Explorer** — Browse curated destinations with details, images, and links to plan trips
- **Saved Trips** — Heart/favorite trips and view them in a dedicated list
- **Profile Management** — Update avatar, name, email, and bio with cloud image upload (imgbb)
- **Authentication** — Cookie-based JWT sessions with route protection
- **Responsive Design** — Dark-themed glass-morphism UI optimized for all screen sizes

## Prerequisites

- **Node.js** ≥ 18
- **VoyageAI API** running locally or deployed ([backend repo](<repo-url>))
- **imgbb API key** (optional — embedded in the build for demo, but you can provide your own)

## Environment Variables

Create a `.env.local` file in the project root:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | **Yes** | `http://localhost:5001/api` | Backend API base URL |
| `NEXT_PUBLIC_IMGBB_API_KEY` | **Yes** | — | imgbb API key for image uploads |

## Getting Started

```bash
# Clone and install dependencies
git clone https://github.com/raisulconnects/VoyageAI-Client.git
cd trevbuddy_client
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:5001/api" > .env.local
echo "NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key" >> .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
trevbuddy_client/
├── src/
│   ├── app/
│   │   ├── (dashboard)/          # Authenticated routes (requires login)
│   │   │   ├── ai-planner/       # AI itinerary generator
│   │   │   ├── ai-chat/          # AI travel chat
│   │   │   ├── dashboard/        # Trip dashboard with charts
│   │   │   ├── my-trips/         # Trip listing with filters
│   │   │   ├── saved-trips/      # Saved/favorited trips
│   │   │   ├── add-destination/  # Create new trip
│   │   │   ├── profile/          # User profile management
│   │   │   ├── manage-destinations/
│   │   │   └── trips/[id]/       # Trip detail + edit
│   │   ├── (public)/             # Public routes (no auth required)
│   │   │   ├── page.js           # Landing page
│   │   │   ├── explore/          # Destination explorer
│   │   │   ├── login/            # Login form
│   │   │   ├── register/         # Registration form
│   │   │   ├── about/            # About page
│   │   │   ├── contact/          # Contact page
│   │   │   ├── privacy/          # Privacy policy
│   │   │   ├── terms/            # Terms of service
│   │   │   └── destinations/[id] # Destination detail
│   │   ├── layout.js             # Root layout (Navbar, AuthProvider, QueryProvider)
│   │   └── globals.css           # Tailwind base + glass-card utilities
│   ├── components/
│   │   ├── layout/               # Navbar, Sidebar, Footer
│   │   ├── cards/                # TripCard
│   │   ├── charts/               # Dashboard charts (recharts)
│   │   ├── common/               # Input, Modal, ImageUpload
│   │   └── sections/             # Home page sections (Hero, Popular Destinations, CTA)
│   ├── context/
│   │   └── AuthContext.jsx       # Auth state management (cookie-based)
│   ├── lib/
│   │   └── api.js                # fetch wrapper with credentials
│   └── providers/
│       └── QueryProvider.jsx     # React Query provider
├── next.config.mjs               # Image domains + experimental config
└── .env.local                    # Local environment variables
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (TurboPack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

### Deploy to Vercel

1. Push to a GitHub repo
2. Import into [Vercel](https://vercel.com/new)
3. Vercel auto-detects Next.js — no additional config needed

### Environment Variables (Vercel Dashboard)

```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
NEXT_PUBLIC_IMGBB_API_KEY=bf61a91c44e43a3fb6654b08eb6089be
```

The `NEXT_PUBLIC_` prefix embeds these values at build time, so a redeploy is required after changing them.

## Related

- **API Backend:** [VoyageAI API](https://github.com/raisulconnects/VoyageAI-Server)

## License

ISC
