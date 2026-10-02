# Cohen Brothers Judo Club

Mobile-first website and membership management system for Cohen Brothers Judo Club in Vernon Hills, IL.

## Overview

This repository contains:

1. **Static Homepage & Pricing** - Complete redesign showcasing Olympic-level coaching and programs
2. **Membership System Prototype (TEST MODE)** - Online payments and admin dashboard

## Static Site

### How to view

**Option 1:** Open `index.html` in your browser

**Option 2:** GitHub Pages (Settings > Pages > Deploy from `main` branch root)

### Preview

![Mobile Hero](screenshots/mobile-hero.png)
![Desktop Hero](screenshots/desktop-hero.png)

## Membership System (TEST MODE ONLY)

**⚠️ No live keys - Repository is public and safe**

Working prototype with:
- Stripe Checkout (ACH + Cards, one-time payments for quarterly/yearly terms)
- Supabase (Auth + Postgres)
- Vercel Functions (API endpoints)
- Demo Mode (no credentials needed)

### Quick Start - Demo Mode

```bash
npm install
DEMO_MODE=true vercel dev
```

Visit `/login.html` and choose:
- **Parent** role → family dashboard
- **Admin** role → admin dashboard with KPIs, expiring tabs, roster, offline payments

### What Works

✅ **Admin Dashboard**: KPIs, expiring buckets (30d/7d/today), roster, record offline payment, CSV export  
✅ **Member Dashboard**: View family, current terms, payment history  
✅ **Real Stripe Code**: Checkout sessions, webhook handlers (needs DB integration)  
✅ **Database Schema**: Production-ready Postgres with RLS, member_status view  
✅ **Seed Data**: 19 fake members across all status buckets

### Setup with Real Services

1. **Supabase**: Run `supabase/migrations/001_initial_schema.sql` and `supabase/seed.sql`
2. **Stripe**: Set test keys in `.env`, forward webhooks with `stripe listen`
3. **Vercel**: Deploy with `vercel --prod`

See `.env.example` for required variables.

### Architecture

```
/index.html, /pricing.html       Static site
/login.html, /account.html       Member pages
/admin/index.html                Admin dashboard

/api/checkout.js                 Stripe Checkout creation
/api/stripe-webhook.js           Webhook handler
/api/admin/members.js            Get members by bucket
/api/admin/offline-payment.js    Record cash/Zelle/check/Venmo
/api/admin/export.js             CSV roster export

/lib/demo-data.js                In-memory demo store
/supabase/                       Schema + seed data
```

### Key Decisions Needed

Before going live:

1. **Accept cards + ACH?** (Club currently takes none. Fees: cards ~3%, ACH ~0.8%)
2. **Vercel Pro** upgrade required (~$20/mo, Hobby is non-commercial only)
3. **Stripe account owner** (needs business EIN + bank)
4. **Mid-quarter join policy** (full price, prorate, or next quarter?)
5. **Refund policy** wording for checkout
6. **Grace period** for late payments
7. **Auto-pay (phase 2)?** Stripe subscriptions for automatic renewal

### What's Stubbed

- Supabase Auth JWT verification (marked with `// TODO:`)
- Database queries (marked in API endpoints)  
- Email sending via Resend
- Join/renew checkout UI
- Daily reminder cron job

## Design System

All pages use:
- **Colors**: `#0d0e10` (dark bg), `#2357ff` (judo blue accent)
- **Fonts**: Anton (display), Inter (body), JetBrains Mono (mono)
- **Mobile-first** responsive at 390px–1440px+

## Technical Stack

- **Frontend**: Vanilla HTML/CSS/JS, no build step
- **Backend**: Vercel Functions (Node.js)
- **Database**: Supabase Postgres + RLS
- **Payments**: Stripe Checkout (one-time mode)
- **Auth**: Supabase Auth (stubbed in prototype)

---

**Status**: Prototype complete and demoable. Real integration requires Stripe/Supabase accounts and decisions listed above.
