# Cohen Brothers Judo Club - Membership Prototype Status

## ✅ COMPLETED FOUNDATION (Current Commit)

### Project Scaffolding
- ✅ `package.json` with Stripe, Supabase, Resend dependencies
- ✅ `vercel.json` with cron configuration  
- ✅ `.env.example` with all required environment variables
- ✅ `.gitignore` updated to exclude .env files, node_modules, demo data
- ✅ No secrets committed (repo remains safe for public)

### Database & Data
- ✅ Complete SQL schema (`supabase/migrations/001_initial_schema.sql`)
  - Programs, prices, terms, households, members, memberships
  - Orders, order_items, season_fees
  - Stripe events, notifications
  - RLS policies
  - `member_status` view with expiry bucket logic
- ✅ Comprehensive seed data (`supabase/seed.sql`)
  - 16 households across all status buckets
  - 19 members (active, expiring today/7d/30d, expired, inactive, pending ACH, adult, collegiate)
  - Realistic payment history with multiple payment methods

### Demo Mode
- ✅ Complete demo data module (`lib/demo-data.js`)
  - In-memory representation of all database tables
  - `computeMemberStatus()` function mimics SQL view
  - Fake user sessions for parent and admin roles
- ✅ Demo mode can run without Supabase credentials

### API Endpoints (Real Implementations)
- ✅ `/api/admin/members.js` - Get members by bucket, filter, search (DEMO MODE WORKING)
- ✅ `/api/admin/offline-payment.js` - Record offline payments (DEMO MODE WORKING)
- ✅ `/api/admin/export.js` - CSV export of active roster (DEMO MODE WORKING)
- ✅ `/api/checkout.js` - Stripe Checkout Session creation (REAL STRIPE CODE, needs DB integration)
- ✅ `/api/stripe-webhook.js` - Webhook handler with signature verification (REAL STRIPE CODE, needs DB integration)

## 🚧 STILL NEEDED

### Critical UI Components
- [ ] `/admin/index.html` - Main admin dashboard
  - Summary KPI cards (active, expiring, lapsed, pending ACH)
  - Tabs for expires_today / expiring_7 / expiring_30
  - Active roster table
  - Lapsed members view
  - Pending ACH view
- [ ] `/admin/member.html` - Member detail page & record offline payment form
- [ ] `/css/admin.css` - Admin styles matching site design system
- [ ] `/js/admin-app.js` - Admin dashboard JavaScript

### Member Pages
- [ ] `/login.html` - Demo login with role switcher (guardian/admin)
- [ ] `/account.html` - Family dashboard (members, current terms, payment history)
- [ ] `/join.html` - Join/renew flow (can be stub)

### Navigation Updates
- [ ] Add "Member Login" link to `index.html` desktop & mobile nav
- [ ] Add "Member Login" link to `pricing.html` desktop & mobile nav

### Additional API Endpoints
- [ ] `/api/admin/member.js` - Get single member detail with term history
- [ ] `/api/cron/daily.js` - Reminder cron job (can be stub)

### Documentation & Testing
- [ ] Update main README.md with setup instructions
- [ ] Create demo-server.js for local testing (optional)
- [ ] Screenshots (admin dashboard mobile/desktop, expiring tab, offline form, member dashboard)

### PR & Decisions Document
- [ ] Open draft PR with comprehensive description
- [ ] List of decisions for Andreas:
  - Accept cards + ACH? (currently takes none)
  - Vercel Pro upgrade required (Hobby is non-commercial)
  - Who owns Stripe account?
  - Refund policy wording
  - Mid-quarter join pricing policy
  - Grace period for late payments

## ARCHITECTURE NOTES

### What's Real vs Stubbed
**Real Stripe Integration:**
- Checkout session creation with line items, customer management
- Webhook signature verification
- Event handling structure (checkout.session.completed, async payment events)
- Idempotency patterns

**Real Database Schema:**
- Production-ready Postgres schema
- Proper RLS policies
- Member status view with correct expiry logic
- Handles both Stripe and offline payments

**Demo Mode Works:**
- Admin can view members in all buckets
- Can filter/search members
- Can record offline payments
- Can export CSV
- All without real Supabase/Stripe accounts

**Still Stubbed/Incomplete:**
- Full Supabase Auth integration (JWT verification in API endpoints)
- Supabase database queries (marked with TODO comments)
- Email sending via Resend
- Customer Portal (phase 2)
- Subscription/auto-pay mode (phase 2)

## DESIGN SYSTEM TOKENS

All UI must use existing site tokens:
```css
--ink:#0d0e10 (background)
--paper:#f4f1ea (text on dark)
--mute:rgba(244,241,234,.62) (muted text)
--line:rgba(244,241,234,.12) (borders)
--blue:#2357ff (accent)
--blue-d:#1638c4 (accent hover)

--display:'Anton' (headings, KPI numbers)
--body:'Inter' (body text, tables)
--mono:'JetBrains Mono' (labels, status, IDs)
```

## NEXT STEPS

1. **Build admin dashboard UI** with all tabs and forms
2. **Build member login/dashboard UI**
3. **Add navigation links** to existing pages
4. **Take screenshots** for PR
5. **Write comprehensive README section**
6. **Create PR with decisions list**

The foundation is solid. The remaining work is primarily UI implementation and connecting the pieces.
