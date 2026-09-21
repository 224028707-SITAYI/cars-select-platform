# DEPLOYMENT.md – Production Hosting Guide

## Recommended Architecture (150k weekly visitors)

| Component       | Service              | Plan / Notes                          |
|-----------------|----------------------|---------------------------------------|
| Frontend + API  | Vercel               | Pro                                    |
| Database        | Neon or Supabase     | Pro / Launch                           |
| Images + CDN    | Cloudinary           | Plus or Advanced                       |
| Auth            | NextAuth (self)      | –                                      |
| Email           | Resend               | Pro                                    |
| Error tracking  | Sentry               | Team                                   |
| Domain + DNS    | Namecheap / Cloudflare | –                                    |
| Optional Redis  | Upstash              | Pay-as-you-go                          |

Estimated monthly cost at target scale: **$80 – $220** depending on traffic spikes and image volume.

## 1. Domain

1. Register a domain (see ACCOUNTS.md for registrar recommendations).
2. Point DNS to Vercel (or use Cloudflare as proxy for extra security/CDN).

## 2. Database

### Neon (recommended)

1. Create project → copy connection string.
2. Enable connection pooling.
3. Set `DATABASE_URL` in Vercel environment variables.
4. Run migrations from CI or locally against production:

```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

### Alternative: Supabase / Railway / Render Postgres

Same pattern – obtain connection string, enable pooling if available.

## 3. Vercel Deployment

1. Push code to GitHub.
2. Import repository in Vercel.
3. Framework preset: Next.js.
4. Add all environment variables from `.env.example` (production values).
5. Deploy.

### Build settings
- Build command: `prisma generate && next build`
- Install command: `npm install`
- Output: default

### Environment variables (minimum)

```
DATABASE_URL=
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_SERVER=...
EMAIL_FROM=...
GOOGLE_CLIENT_ID=   # optional
GOOGLE_CLIENT_SECRET=
SENTRY_DSN=         # optional
```

## 4. Image Storage (Cloudinary)

1. Create account → new product environment.
2. Copy Cloud name, API Key, API Secret.
3. Enable automatic format (f_auto) and quality (q_auto) in upload presets.
4. Restrict upload to authenticated / signed uploads in production.

## 5. Email

**Resend** (recommended):
1. Create account + domain (or use onboarding domain for testing).
2. Verify domain.
3. Create API key → set `RESEND_API_KEY` and `EMAIL_FROM`.

## 6. CI/CD

Vercel provides automatic previews for every PR.

Recommended GitHub Actions (optional extra):

- Lint + type-check on PR
- Prisma migrate deploy on main (with care)
- Lighthouse CI for performance budgets

## 7. SSL & Security Headers

- Vercel provides automatic SSL (Let’s Encrypt).
- Add security headers in `next.config.ts` (already prepared in the project).
- Force HTTPS.

## 8. Post-Deploy Checklist

- [ ] Run `prisma migrate deploy`
- [ ] Seed production only if needed (or use a staging DB)
- [ ] Verify admin login
- [ ] Test image upload
- [ ] Test email delivery (password reset / verification)
- [ ] Confirm Lighthouse scores
- [ ] Set up Sentry alerts
- [ ] Configure custom domain + redirect www → apex (or vice versa)
- [ ] Enable Vercel Analytics / Speed Insights

## 9. Scaling Notes

- Enable Vercel Fluid Compute / Edge if needed later.
- Add read replica on Neon when read traffic grows.
- Move search to Typesense/Meilisearch if filter queries become heavy.
- Introduce a job queue (Inngest) for search alerts and bulk emails.

## 10. Cost Estimate (Monthly, approximate)

| Service          | Low traffic | Target (150k UV/wk) |
|------------------|-------------|---------------------|
| Vercel Pro       | $20         | $20–50              |
| Neon / Supabase  | $0–25       | $25–70              |
| Cloudinary       | $0–45       | $45–99              |
| Resend           | $0–20       | $20                 |
| Sentry           | $0–26       | $26                 |
| Domain           | ~$1         | ~$1                 |
| **Total**        | **~$25–100**| **~$80–220**        |

All figures are estimates and will vary with actual usage.
