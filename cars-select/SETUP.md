# SETUP.md – Local Development Setup

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+
- Docker & Docker Compose (recommended for PostgreSQL)
- Git

## 1. Install Dependencies

```bash
npm install
```

## 2. Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in the values. Minimum required for local development:

```env
DATABASE_URL="postgresql://carsselect:carsselect@localhost:5432/carsselect?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-long-random-string-here"
```

Generate a secret:

```bash
openssl rand -base64 32
```

See **ACCOUNTS.md** for all third-party services and how to obtain keys.

## 3. Database

### Option A – Docker (recommended)

```bash
docker compose up -d db
```

This starts PostgreSQL 16 on port 5432 with:

- User: `carsselect`
- Password: `carsselect`
- Database: `carsselect`

### Option B – Local PostgreSQL

Create a database and user, then set `DATABASE_URL` accordingly.

## 4. Prisma

```bash
npx prisma generate
npx prisma db push          # or: npx prisma migrate dev --name init
npm run db:seed
```

Open Prisma Studio to inspect data:

```bash
npx prisma studio
```

## 5. Run the App

```bash
npm run dev
```

Visit http://localhost:3000

## 6. Useful Commands

| Command                    | Description                          |
|----------------------------|--------------------------------------|
| `npm run dev`              | Start Next.js dev server             |
| `npm run build`            | Production build                     |
| `npm run start`            | Start production server              |
| `npm run lint`             | Run ESLint                           |
| `npm run db:seed`          | Re-seed the database                 |
| `npx prisma studio`        | Visual DB browser                    |
| `npx prisma migrate reset` | Reset DB + re-run migrations + seed  |

## 7. Optional Services for Full Local Experience

- **Cloudinary** – image uploads (free tier works)
- **Resend / SMTP** – email (verification, alerts)
- **Google OAuth** – social login

Without these the core marketplace still functions; image upload and email features will show graceful fallbacks.

## Troubleshooting

**Prisma client not found**
```bash
npx prisma generate
```

**Port 3000 already in use**
```bash
npx next dev -p 3001
```

**Database connection refused**
- Ensure Docker container is running: `docker compose ps`
- Check `DATABASE_URL` matches container credentials

**Seed fails**
- Make sure migrations/push succeeded first
- Delete `node_modules/.prisma` and re-run `npx prisma generate`
