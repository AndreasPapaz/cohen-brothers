# Implementation TODO

## ✅ Completed
- [x] Project scaffolding (package.json, vercel.json, .env.example)
- [x] Updated .gitignore (env files, node_modules, demo data)
- [x] Database schema SQL (supabase/migrations/001_initial_schema.sql)
- [x] Comprehensive seed data SQL (supabase/seed.sql)
- [x] Demo data module (lib/demo-data.js)
- [x] Admin members API endpoint (api/admin/members.js)

## 🚧 In Progress

### API Endpoints (Demo Mode)
- [ ] `/api/admin/offline-payment.js` - Record offline payment
- [ ] `/api/admin/export.js` - CSV export
- [ ] `/api/admin/member.js` - Get single member detail
- [ ] `/api/checkout.js` - Create Stripe Checkout Session
- [ ] `/api/stripe-webhook.js` - Handle Stripe webhooks
- [ ] `/api/cron/daily.js` - Daily reminder cron (stub)

### Admin Dashboard (`/admin/`)
- [ ] `index.html` - Main dashboard with counts & tabs
- [ ] `member.html` - Member detail & record payment form
- [ ] Shared CSS (`css/admin.css`)
- [ ] Shared JS (`js/admin-app.js`)

### Member Pages
- [ ] `/login.html` - Login page (demo mode: role switcher)
- [ ] `/account.html` - Family dashboard
- [ ] `/join.html` - Join/renew flow (stub)

### Navigation Updates
- [ ] Add "Member Login" link to `index.html` nav
- [ ] Add "Member Login" link to `pricing.html` nav

### Documentation
- [ ] Update README.md with setup instructions
- [ ] Create PR description with decisions list

### Screenshots
- [ ] Admin dashboard - mobile
- [ ] Admin dashboard - desktop
- [ ] Expiring tab view
- [ ] Offline payment form
- [ ] Member dashboard

## Notes
- All Stripe integration code should be real (using Stripe SDK) but gated on env vars
- Email templates can be stubs
- Focus on demo mode working end-to-end for screenshots
