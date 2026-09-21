# ARCHITECTURE.md – System Design & Technical Decisions

## 1. High-Level Overview

Cars Select is a multi-sided marketplace built as a modern full-stack Next.js application.

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Browser   │────▶│  Next.js (App    │────▶│  PostgreSQL     │
│  (React)    │◀────│   Router + API)  │◀────│  (Prisma ORM)   │
└─────────────┘     └──────────────────┘     └─────────────────┘
                           │
                           ├──── Cloudinary (images + CDN)
                           ├──── NextAuth.js (auth + sessions)
                           ├──── Resend / SMTP (email)
                           └──── Sentry (errors)
```

**Key design goals**
- Extremely fast perceived performance (skeleton loaders, optimistic UI, edge caching)
- Strong security & role isolation
- Clean separation of buyer / seller / admin experiences
- Easy horizontal scaling for 150k weekly visitors

## 2. Tech Stack Rationale

| Layer          | Choice                  | Why |
|----------------|-------------------------|-----|
| Frontend       | Next.js App Router + TS | Server Components, streaming, excellent DX, built-in API routes |
| Styling        | Tailwind CSS            | Rapid, consistent, production-ready utility system |
| Database       | PostgreSQL + Prisma     | Relational integrity, excellent indexing, type-safe queries |
| Auth           | NextAuth.js (Auth.js)   | Battle-tested, supports credentials + OAuth, session strategy |
| Images         | Cloudinary              | Automatic optimisation (WebP/AVIF), CDN, transformations |
| Hosting        | Vercel (frontend) + managed Postgres | Edge network, zero-config scaling, great Next.js integration |

Alternative backends (NestJS) were considered but rejected for a single deployable unit and lower operational complexity at this scale.

## 3. Data Model Highlights

### Roles & Permissions
- `GUEST` → browse only
- `USER` → favourites, alerts, inquiries
- `PRIVATE_SELLER` / `DEALERSHIP` / `IMPORTER_EXPORTER` / `PARTS_SELLER` / `SERVICE_CENTRE` → listing management with differentiated badges & limits
- `ADMIN` → moderation, featured placements, analytics

All seller roles require `verificationStatus = APPROVED` before listings go live.

### Core Entities
- **User** – single table with role + business fields (avoids complex inheritance)
- **Listing** – vehicles with rich filterable attributes + JSON-friendly features array
- **ListingImage** – ordered, primary flag, Cloudinary public_id
- **PartListing / ServiceListing** – lighter models for non-vehicle inventory
- **Inquiry + Message** – simple threaded messaging
- **SearchAlert** – stored filter JSON + frequency
- **AuditLog** – critical admin & seller actions
- **Make / Model** – hierarchical reference data for filters

### Indexing Strategy
Composite and single-column indexes on:
- `status`, `category`, `make+model`, `price`, `year`, `city`
- `sellerId`, `isFeatured`, `isSponsored`, `createdAt`
- Full filter path: `(make, model, year, price)`

## 4. Performance Strategy

### Frontend
- React Server Components by default
- Client components only where interactivity is required (filters, galleries, forms)
- Skeleton loaders + Suspense boundaries
- Optimistic UI for favourites and form submissions
- Image optimisation via `next/image` + Cloudinary transformations
- Code splitting via dynamic imports for heavy modals (filter sheet, calculators)

### Backend / Data
- Prisma query selectivity (only needed fields)
- Connection pooling (Prisma + PgBouncer on managed DB)
- Caching layers:
  - Vercel Data Cache / `unstable_cache` for make/model lists
  - CDN for all static assets and optimised images
  - Optional Redis for hot search results at higher scale

### Targets
- Lighthouse Performance ≥ 90 (mobile + desktop)
- TTFB < 200 ms on cached pages
- Filter interaction feels instant (< 100 ms perceived)

## 5. Security

- **Auth**: NextAuth with JWT or database sessions + httpOnly cookies
- **RBAC**: Middleware + server-side role checks on every protected route/API
- **Input**: Zod validation on all API inputs and forms
- **Uploads**: Cloudinary signed uploads + file-type/size limits
- **Headers**: Strict CSP, HSTS, X-Frame-Options, etc. via Next.js config
- **Rate limiting**: On auth, search, and inquiry endpoints
- **Data isolation**: Sellers can only mutate their own listings
- **Audit logging**: Critical actions (approve seller, delete listing, change role)

## 6. Scalability for 150k Weekly Visitors

Rough math: ~150k UV/week ≈ 20–25k UV/day ≈ 1–3k concurrent peak depending on distribution.

- Vercel Pro / Enterprise handles the frontend with ease
- Managed Postgres (Neon, Supabase, or RDS) with connection pooling
- Cloudinary free/paid tier easily covers image volume
- Horizontal scaling is mostly automatic; add read replicas + Redis if search becomes hot
- Background jobs (alerts, email) can move to a queue (Inngest / BullMQ) later

## 7. Key Architectural Decisions

1. **Single Next.js app** instead of separate frontend/backend for simpler deployment and shared types.
2. **Prisma over raw SQL / Drizzle** for rapid development + excellent TypeScript integration.
3. **Cloudinary over S3** for zero-config image optimisation and CDN.
4. **Role as enum on User** rather than separate tables – simpler queries, sufficient for current permissions.
5. **Filter state in URL** for shareable searches and back-button support.
6. **Soft verification workflow** – sellers can draft listings while pending approval.

## 8. Future Extensions

- Full payment integration (Stripe Connect for dealer subscriptions / featured boosts)
- Real-time messaging (Pusher / Ably)
- Advanced search (Typesense / Meilisearch / Elasticsearch)
- Mobile apps (React Native sharing the same API)
- Multi-currency & multi-country expansion
