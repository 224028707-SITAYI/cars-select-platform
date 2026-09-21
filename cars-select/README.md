# Cars Select

**High-performance multi-sided car marketplace platform**

Cars Select is a production-ready marketplace connecting authorized dealerships, verified private sellers, parts companies, service centres, and importers/exporters with buyers across South Africa (and expandable globally).

- **Expected scale**: up to 150,000 unique visitors per week
- **Stack**: Next.js (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · NextAuth.js
- **Focus**: Extreme speed, security, clean UX, and clear seller differentiation

---

## Quick Start

```bash
# 1. Clone / extract the project
cd cars-select

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env
# Edit .env with your values (see SETUP.md and ACCOUNTS.md)

# 4. Start PostgreSQL (Docker recommended)
docker compose up -d db

# 5. Generate Prisma client & run migrations
npx prisma generate
npx prisma db push

# 6. Seed realistic data
npm run db:seed

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo accounts** (password for all: `Password123!`):

| Role            | Email                        |
|-----------------|------------------------------|
| Admin           | admin@carsselect.com         |
| Private Seller  | john.private@example.com     |
| Dealership      | sales@prestigemotors.co.za   |
| Importer        | import@globalauto.za         |
| Parts Seller    | parts@autozone.co.za         |
| Service Centre  | bookings@precisionauto.co.za |
| Buyer           | buyer@example.com            |

---

## Project Structure

```
cars-select/
├── prisma/
│   ├── schema.prisma      # Full data model
│   └── seed.ts            # Realistic seed data
├── src/
│   ├── app/               # App Router pages & API routes
│   ├── components/        # UI components
│   ├── lib/               # Utilities, Prisma, auth
│   ├── types/             # Shared TypeScript types
│   └── hooks/             # Custom React hooks
├── public/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── SETUP.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── ACCOUNTS.md
└── README.md
```

---

## Core Features

### Public / Buyer
- Fast homepage with hero, search, featured vehicles, valuation & finance tools
- Multi-category: Cars · Bikes · Leisure · Commercial
- Advanced filter system (Make → Model → Variant with live counts)
- Rich search results & vehicle detail pages
- Favourites, search alerts, dealer reviews
- Cookie consent, optional Google sign-in

### Seller / Dealer
- Full dashboard for listings (cars, parts, services)
- Virtual storefront pages
- Inquiry / messaging system
- Basic analytics & verification badges

### Admin
- Seller & listing moderation
- Featured / sponsored placement management
- Platform analytics

---

## Documentation

| Document          | Description                                      |
|-------------------|--------------------------------------------------|
| SETUP.md          | Complete local development setup                 |
| ARCHITECTURE.md   | System design, data models, performance & security |
| DEPLOYMENT.md     | Hosting, CI/CD, SSL, cost estimates              |
| ACCOUNTS.md       | **All required third-party accounts & keys**     |

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run db:seed      # Seed database
npx prisma studio    # Visual database browser
```

---

## License

Proprietary – Cars Select Platform. All rights reserved.
