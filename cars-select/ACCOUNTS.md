# ACCOUNTS.md – Required Accounts & Credentials

This document lists **every external account** you need to create to run Cars Select in production (and optionally in local development). Follow the steps exactly.

For each service you will find:
1. Why it is required
2. Exact steps to create the account
3. Recommended plan for ~150k weekly visitors
4. Which keys/secrets to copy into `.env`
5. Important configuration tips

---

## 1. Domain Registrar

**Why**: You need a professional domain (e.g. `carsselect.com` or `carsselect.co.za`).

**Recommended**: Namecheap or Cloudflare Registrar (cheapest + good DNS).

### Steps (Namecheap)
1. Go to https://www.namecheap.com
2. Search for `carsselect.com` (or your preferred name). Alternatives: `carsselect.co.za`, `getcarsselect.com`, `carsselect.app`
3. Add to cart → checkout (1–2 year registration recommended).
4. Create account / log in.
5. Complete purchase.
6. Go to Domain List → Manage → Advanced DNS.
7. Later you will point nameservers or create A/CNAME records for Vercel.

**Cost**: ~$10–15 / year for .com

**No secrets needed** – just the domain name.

---

## 2. Hosting – Frontend + API (Vercel)

**Why**: Best-in-class Next.js hosting, global edge network, automatic SSL, preview deployments, scales easily to 150k UV/week.

### Steps
1. Go to https://vercel.com and sign up with GitHub (recommended).
2. After login click **Add New… → Project**.
3. Import your Cars Select GitHub repository.
4. Framework Preset: **Next.js**.
5. Root directory: `./` (or the folder containing package.json).
6. Add Environment Variables (see list at the bottom of this file).
7. Click **Deploy**.

**Recommended plan**: **Pro** ($20/month). Hobby works for testing; Pro is required for commercial use and higher limits.

**Keys to copy**:
- None directly – Vercel injects its own.
- You will set `NEXTAUTH_URL` to your production domain (e.g. `https://carsselect.com`).

**Tips**:
- Enable Vercel Analytics and Speed Insights.
- Set production branch to `main`.
- After first deploy, add your custom domain under Project → Settings → Domains.

---

## 3. Managed PostgreSQL Database

**Why**: Production-grade relational database with backups, connection pooling, and high availability.

**Recommended**: Neon (serverless Postgres) or Supabase.

### Option A – Neon (recommended)
1. Go to https://neon.tech and sign up (GitHub preferred).
2. Click **Create Project**.
3. Name: `cars-select-prod` (or similar).
4. Region: choose closest to your primary audience (e.g. Frankfurt or London for SA/EU).
5. Postgres version: 16.
6. After creation, open the project → **Dashboard**.
7. Copy the **Connection string** (pooled recommended for serverless).
8. It looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

**Recommended plan**: **Launch** or **Scale** depending on load. Free tier is fine for development; paid for production.

**Key to copy**:
```
DATABASE_URL="postgresql://..."
```

**Tips**:
- Enable connection pooling.
- Create a separate branch for staging if desired.
- Turn on automatic backups.

### Option B – Supabase
1. https://supabase.com → New Project.
2. Copy the connection string under Project Settings → Database.

---

## 4. Image Storage & CDN (Cloudinary)

**Why**: Automatic image optimisation (WebP/AVIF), transformations, CDN delivery, and secure uploads. Critical for vehicle photo galleries.

### Steps
1. Go to https://cloudinary.com and sign up.
2. Complete the short onboarding (choose “Programmable Media”).
3. From the Dashboard copy:
   - Cloud name
   - API Key
   - API Secret
4. (Optional but recommended) Go to Settings → Upload → Add upload preset.
   - Signing mode: **Signed**
   - Folder: `cars-select`
   - Incoming transformation: `f_auto,q_auto`

**Recommended plan**: **Plus** or **Advanced**. Free tier (25 credits) is enough for development and light production; upgrade when image traffic grows.

**Keys to copy**:
```
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"   # if needed client-side
```

**Tips**:
- Never expose API Secret to the browser.
- Use signed uploads only in production.
- Set a reasonable max file size (e.g. 10 MB) and allowed formats (jpg, png, webp, heic).

---

## 5. Authentication (NextAuth.js – self-hosted)

**Why**: Handles credentials login, Google OAuth, sessions, and CSRF protection. No separate “Auth0/Clerk” account is required unless you prefer a managed service.

You only need:

### Google OAuth (optional but recommended)
1. Go to https://console.cloud.google.com
2. Create a new project (or select existing) → name it “Cars Select”.
3. APIs & Services → OAuth consent screen → External → fill in app name, support email, developer contact.
4. Credentials → Create Credentials → OAuth client ID.
5. Application type: **Web application**.
6. Name: Cars Select Web.
7. Authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://yourdomain.com`
8. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
9. Copy Client ID and Client Secret.

**Keys**:
```
GOOGLE_CLIENT_ID="xxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxx"
```

**Also required**:
```
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="long-random-string"   # generate with: openssl rand -base64 32
```

---

## 6. Email Service (Resend recommended)

**Why**: Transactional email for email verification, password resets, search alerts, and inquiry notifications.

### Steps (Resend)
1. Go to https://resend.com and sign up.
2. Add and verify your domain (or use the onboarding domain for testing).
3. Create an API Key (Permissions: Full access or Sending access).
4. Copy the key.

**Recommended plan**: **Pro** ($20/month) for higher volume and custom domains. Free tier is generous for development.

**Keys**:
```
RESEND_API_KEY="re_xxxxxxxx"
EMAIL_FROM="Cars Select <noreply@yourdomain.com>"
```

**Alternative**: Any SMTP provider (SendGrid, Mailgun, Amazon SES, Postmark). Use:
```
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="..."
```

---

## 7. Error Monitoring (Sentry)

**Why**: Catch and triage production errors, performance issues, and unhandled exceptions.

### Steps
1. Go to https://sentry.io and sign up.
2. Create a new project → platform: **Next.js**.
3. Copy the DSN.

**Recommended plan**: **Team** (or free Developer plan while small).

**Key**:
```
SENTRY_DSN="https://xxxxx@o123.ingest.sentry.io/456"
```

Optional (for source maps):
```
SENTRY_AUTH_TOKEN=...
SENTRY_ORG=...
SENTRY_PROJECT=...
```

---

## 8. Analytics (optional but recommended)

**Options**:
- Vercel Analytics (built-in, enable in project settings)
- Google Analytics 4
- Plausible / PostHog (privacy-friendly)

For GA4:
1. https://analytics.google.com → Create property.
2. Copy Measurement ID (`G-XXXXXXXX`).

```
NEXT_PUBLIC_GA_ID="G-XXXXXXXX"
```

---

## 9. Payment Placeholder (Stripe)

**Why**: Ready for future paid features (featured listings, dealer subscriptions, boosts).

1. https://stripe.com → sign up.
2. Developers → API keys.
3. Copy Publishable key and Secret key (test mode first).

```
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."   # after creating webhook
```

**Plan**: Start with test mode; move to live when ready. Standard Stripe pricing applies.

---

## 10. Source Control (GitHub)

**Why**: Required for Vercel Git integration and team collaboration.

1. https://github.com → create account / organisation.
2. Create a new private repository: `cars-select`.
3. Push the project.
4. Connect the repo to Vercel.

No secrets needed beyond your personal access token if using CLI.

---

## 11. Complete .env Example (Production)

```env
# App
NEXT_PUBLIC_APP_URL="https://carsselect.com"
NEXTAUTH_URL="https://carsselect.com"
NEXTAUTH_SECRET="your-generated-secret-here"

# Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="Cars Select <noreply@carsselect.com>"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Sentry (optional)
SENTRY_DSN="..."

# Stripe (future)
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-..."
```

---

## Quick Checklist

- [ ] Domain registered
- [ ] GitHub repository created
- [ ] Vercel project linked
- [ ] Neon / Supabase database created
- [ ] Cloudinary account + signed preset
- [ ] Resend (or SMTP) configured
- [ ] Google OAuth credentials (if using social login)
- [ ] Sentry project (recommended)
- [ ] All secrets added to Vercel Environment Variables
- [ ] Custom domain attached and SSL active
- [ ] `prisma migrate deploy` run against production DB

Once the above are done you have a production-ready Cars Select platform.
