-- Seed data for Cohen Brothers Judo Club - TEST MODE ONLY
-- This creates realistic fake members across all status buckets for demo/testing

-- ===== Programs =====
insert into programs (id, name, coaches_fee_exempt, active) values
  ('little_judokas', 'Little Judokas', true, true),
  ('cobras', 'Judo Cobras', false, true),
  ('warriors', 'Judo Warriors', false, true),
  ('gladiators', 'Judo Gladiators', false, true),
  ('collegiate', 'Collegiate High Performance', false, true),
  ('adult_rec', 'Adult Rec Team', false, true);

-- ===== Prices (2026-2027) =====
insert into prices (program_id, term_type, season_year, amount_cents) values
  -- 2026
  ('little_judokas', 'quarter', 2026, 38000),
  ('little_judokas', 'year', 2026, 137500),
  ('cobras', 'quarter', 2026, 51500),
  ('cobras', 'year', 2026, 185500),
  ('warriors', 'quarter', 2026, 65000),
  ('warriors', 'year', 2026, 235000),
  ('gladiators', 'quarter', 2026, 65000),
  ('gladiators', 'year', 2026, 235000),
  ('collegiate', 'quarter', 2026, 51500),
  ('collegiate', 'year', 2026, 185500),
  ('adult_rec', 'quarter', 2026, 40000),
  ('adult_rec', 'year', 2026, 145000),
  -- 2027
  ('little_judokas', 'quarter', 2027, 38000),
  ('little_judokas', 'year', 2027, 137500),
  ('cobras', 'quarter', 2027, 51500),
  ('cobras', 'year', 2027, 185500),
  ('warriors', 'quarter', 2027, 65000),
  ('warriors', 'year', 2027, 235000),
  ('gladiators', 'quarter', 2027, 65000),
  ('gladiators', 'year', 2027, 235000),
  ('collegiate', 'quarter', 2027, 51500),
  ('collegiate', 'year', 2027, 185500),
  ('adult_rec', 'quarter', 2027, 40000),
  ('adult_rec', 'year', 2027, 145000);

-- ===== Terms =====
insert into terms (id, term_type, start_date, end_date, season_year) values
  -- 2026
  ('2026-Q3', 'quarter', '2026-07-01', '2026-09-30', 2026),
  ('2026-Q4', 'quarter', '2026-10-01', '2026-12-31', 2026),
  ('2026-Y', 'year', '2026-01-01', '2026-12-31', 2026),
  -- 2027
  ('2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 2027),
  ('2027-Q2', 'quarter', '2027-04-01', '2027-06-30', 2027),
  ('2027-Q3', 'quarter', '2027-07-01', '2027-09-30', 2027),
  ('2027-Q4', 'quarter', '2027-10-01', '2027-12-31', 2027),
  ('2027-Y', 'year', '2027-01-01', '2027-12-31', 2027);

-- ===== Test Households & Members =====
-- Note: Assuming current date is around Oct 2, 2026 for demo purposes
-- Status buckets: active, expiring_today (Oct 2), expiring_7 (Oct 9), expiring_30 (Nov 1), expired, deactivated, pending ACH

-- 1. ACTIVE members (paid through well into the future)
insert into households (id, name, email, phone) values
  ('11111111-1111-1111-1111-111111111111', 'Anderson Family', 'sarah.anderson@example.com', '847-555-0101');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Emma', 'Anderson', '2015-03-15', 'active'),
  ('a1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'Liam', 'Anderson', '2013-07-22', 'active');

insert into households (id, name, email, phone) values
  ('22222222-2222-2222-2222-222222222222', 'Martinez Family', 'carlos.martinez@example.com', '847-555-0102');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Sofia', 'Martinez', '2016-11-08', 'active');

insert into households (id, name, email, phone) values
  ('33333333-3333-3333-3333-333333333333', 'Chen Family', 'lisa.chen@example.com', '847-555-0103');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Noah', 'Chen', '2012-05-19', 'active'),
  ('a3333333-3333-3333-3333-333333333334', '33333333-3333-3333-3333-333333333333', 'Mia', 'Chen', '2014-09-30', 'active');

-- 2. EXPIRING TODAY (Oct 2, 2026 - end of Q3)
-- Actually Q3 ends Sep 30, so let's use members whose paid term ends TODAY for demo
insert into households (id, name, email, phone) values
  ('44444444-4444-4444-4444-444444444444', 'Johnson Family', 'mike.johnson@example.com', '847-555-0104');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'Olivia', 'Johnson', '2015-02-14', 'active');

insert into households (id, name, email, phone) values
  ('55555555-5555-5555-5555-555555555555', 'Williams Family', 'jennifer.williams@example.com', '847-555-0105');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'Ethan', 'Williams', '2013-08-07', 'active');

-- 3. EXPIRING IN 7 DAYS (Oct 9, 2026)
insert into households (id, name, email, phone) values
  ('66666666-6666-6666-6666-666666666666', 'Garcia Family', 'ana.garcia@example.com', '847-555-0106');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a6666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'Isabella', 'Garcia', '2016-04-12', 'active'),
  ('a6666666-6666-6666-6666-666666666667', '66666666-6666-6666-6666-666666666666', 'Lucas', 'Garcia', '2014-01-25', 'active');

insert into households (id, name, email, phone) values
  ('77777777-7777-7777-7777-777777777777', 'Patel Family', 'raj.patel@example.com', '847-555-0107');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a7777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'Ava', 'Patel', '2015-10-03', 'active');

-- 4. EXPIRING IN 30 DAYS (Nov 1, 2026 - end of Q4)
insert into households (id, name, email, phone) values
  ('88888888-8888-8888-8888-888888888888', 'Smith Family', 'david.smith@example.com', '847-555-0108');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'Mason', 'Smith', '2013-06-18', 'active');

insert into households (id, name, email, phone) values
  ('99999999-9999-9999-9999-999999999999', 'Brown Family', 'emily.brown@example.com', '847-555-0109');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('a9999999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', 'Charlotte', 'Brown', '2016-12-05', 'active'),
  ('a9999999-9999-9999-9999-999999999990', '99999999-9999-9999-9999-999999999999', 'James', 'Brown', '2012-03-28', 'active');

-- 5. EXPIRED / LAPSED (term ended before today)
insert into households (id, name, email, phone) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Taylor Family', 'michelle.taylor@example.com', '847-555-0110');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Benjamin', 'Taylor', '2014-07-09', 'active');

insert into households (id, name, email, phone) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Davis Family', 'robert.davis@example.com', '847-555-0111');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Amelia', 'Davis', '2015-09-16', 'active');

-- 6. DEACTIVATED / INACTIVE
insert into households (id, name, email, phone) values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Wilson Family', 'susan.wilson@example.com', '847-555-0112');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Alexander', 'Wilson', '2013-11-21', 'inactive');

-- 7. PENDING ACH
insert into households (id, name, email, phone) values
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Moore Family', 'james.moore@example.com', '847-555-0113');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Harper', 'Moore', '2016-05-24', 'active');

-- 8. ADULT REC member
insert into households (id, name, email, phone) values
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Thomas (Adult)', 'michael.thomas@example.com', '847-555-0114');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Michael', 'Thomas', '1985-04-12', 'active');

-- 9. COLLEGIATE member
insert into households (id, name, email, phone) values
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Rodriguez (Collegiate)', 'alex.rodriguez@example.com', '847-555-0115');
insert into members (id, household_id, first_name, last_name, birth_date, status) values
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'Alex', 'Rodriguez', '2002-09-08', 'active');

-- ===== Orders & Memberships =====
-- Current date assumption: Oct 2, 2026

-- Active members - paid through 2027-Q1 or beyond
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('o1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'stripe', 'paid', 152500, '2026-10-01 10:30:00'),
  ('o2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'zelle', 'paid', 73500, '2026-09-28 14:15:00'),
  ('o3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'stripe', 'paid', 152500, '2026-09-25 09:45:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('o1111111-1111-1111-1111-111111111111', 'membership', 'a1111111-1111-1111-1111-111111111111', 'cobras', '2027-Q1', 51500),
  ('o1111111-1111-1111-1111-111111111111', 'membership', 'a1111111-1111-1111-1111-111111111112', 'warriors', '2027-Q1', 65000),
  ('o1111111-1111-1111-1111-111111111111', 'coaches_fee', null, null, null, 35000),
  ('o2222222-2222-2222-2222-222222222222', 'membership', 'a2222222-2222-2222-2222-222222222222', 'little_judokas', '2027-Q1', 38000),
  ('o2222222-2222-2222-2222-222222222222', 'coaches_fee', null, null, null, 22500),
  ('o3333333-3333-3333-3333-333333333333', 'membership', 'a3333333-3333-3333-3333-333333333333', 'warriors', '2027-Q1', 65000),
  ('o3333333-3333-3333-3333-333333333333', 'membership', 'a3333333-3333-3333-3333-333333333334', 'cobras', '2027-Q1', 51500),
  ('o3333333-3333-3333-3333-333333333333', 'coaches_fee', null, null, null, 35000);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('a1111111-1111-1111-1111-111111111111', 'cobras', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'paid'),
  ('a1111111-1111-1111-1111-111111111112', 'warriors', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'paid'),
  ('a2222222-2222-2222-2222-222222222222', 'little_judokas', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'paid'),
  ('a3333333-3333-3333-3333-333333333333', 'warriors', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'paid'),
  ('a3333333-3333-3333-3333-333333333334', 'cobras', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'paid');

insert into season_fees (household_id, season_year, amount_cents, children_covered) values
  ('11111111-1111-1111-1111-111111111111', 2027, 35000, 2),
  ('22222222-2222-2222-2222-222222222222', 2027, 22500, 1),
  ('33333333-3333-3333-3333-333333333333', 2027, 35000, 2);

-- Expiring today (Oct 2) - paid through Sep 30 (end of Q3)
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('o4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'cash', 'paid', 73500, '2026-07-01 00:00:00'),
  ('o5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'check', 'paid', 87500, '2026-07-01 00:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('o4444444-4444-4444-4444-444444444444', 'membership', 'a4444444-4444-4444-4444-444444444444', 'cobras', '2026-Q3', 51500),
  ('o4444444-4444-4444-4444-444444444444', 'coaches_fee', null, null, null, 22500),
  ('o5555555-5555-5555-5555-555555555555', 'membership', 'a5555555-5555-5555-5555-555555555555', 'warriors', '2026-Q3', 65000),
  ('o5555555-5555-5555-5555-555555555555', 'coaches_fee', null, null, null, 22500);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('a4444444-4444-4444-4444-444444444444', 'cobras', '2026-Q3', 'quarter', '2026-07-01', '2026-09-30', 'paid'),
  ('a5555555-5555-5555-5555-555555555555', 'warriors', '2026-Q3', 'quarter', '2026-07-01', '2026-09-30', 'paid');

-- Expiring in 7 days (Oct 9) - paid through Oct 9
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('o6666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'venmo', 'paid', 139000, '2026-07-10 16:20:00'),
  ('o7777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'stripe', 'paid', 73500, '2026-07-10 11:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('o6666666-6666-6666-6666-666666666666', 'membership', 'a6666666-6666-6666-6666-666666666666', 'little_judokas', '2026-Q3', 38000),
  ('o6666666-6666-6666-6666-666666666666', 'membership', 'a6666666-6666-6666-6666-666666666667', 'cobras', '2026-Q3', 51500),
  ('o6666666-6666-6666-6666-666666666666', 'coaches_fee', null, null, null, 35000),
  ('o7777777-7777-7777-7777-777777777777', 'membership', 'a7777777-7777-7777-7777-777777777777', 'cobras', '2026-Q3', 51500),
  ('o7777777-7777-7777-7777-777777777777', 'coaches_fee', null, null, null, 22500);

-- Create custom term for Oct 9 end date
insert into terms (id, term_type, start_date, end_date, season_year) values
  ('2026-Q3-EXT', 'quarter', '2026-07-10', '2026-10-09', 2026);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('a6666666-6666-6666-6666-666666666666', 'little_judokas', '2026-Q3-EXT', 'quarter', '2026-07-10', '2026-10-09', 'paid'),
  ('a6666666-6666-6666-6666-666666666667', 'cobras', '2026-Q3-EXT', 'quarter', '2026-07-10', '2026-10-09', 'paid'),
  ('a7777777-7777-7777-7777-777777777777', 'cobras', '2026-Q3-EXT', 'quarter', '2026-07-10', '2026-10-09', 'paid');

-- Expiring in 30 days (Nov 1) - paid through Oct 31
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('o8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'stripe', 'paid', 87500, '2026-08-01 13:45:00'),
  ('o9999999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', 'zelle', 'paid', 139000, '2026-08-02 10:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('o8888888-8888-8888-8888-888888888888', 'membership', 'a8888888-8888-8888-8888-888888888888', 'warriors', '2026-Q4', 65000),
  ('o8888888-8888-8888-8888-888888888888', 'coaches_fee', null, null, null, 22500),
  ('o9999999-9999-9999-9999-999999999999', 'membership', 'a9999999-9999-9999-9999-999999999999', 'little_judokas', '2026-Q4', 38000),
  ('o9999999-9999-9999-9999-999999999999', 'membership', 'a9999999-9999-9999-9999-999999999990', 'warriors', '2026-Q4', 65000),
  ('o9999999-9999-9999-9999-999999999999', 'coaches_fee', null, null, null, 35000);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('a8888888-8888-8888-8888-888888888888', 'warriors', '2026-Q4', 'quarter', '2026-10-01', '2026-12-31', 'paid'),
  ('a9999999-9999-9999-9999-999999999999', 'little_judokas', '2026-Q4', 'quarter', '2026-10-01', '2026-12-31', 'paid'),
  ('a9999999-9999-9999-9999-999999999990', 'warriors', '2026-Q4', 'quarter', '2026-10-01', '2026-12-31', 'paid');

-- Expired/Lapsed (ended before today)
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('oaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'stripe', 'paid', 87500, '2026-04-01 09:30:00'),
  ('obbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cash', 'paid', 73500, '2026-01-05 00:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('oaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'membership', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'warriors', '2026-Q3', 65000),
  ('oaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'coaches_fee', null, null, null, 22500),
  ('obbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'membership', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cobras', '2026-Q3', 51500),
  ('obbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'coaches_fee', null, null, null, 22500);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'warriors', '2026-Q3', 'quarter', '2026-07-01', '2026-09-30', 'paid'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cobras', '2026-Q3', 'quarter', '2026-07-01', '2026-09-30', 'paid');

-- Deactivated (old membership, now inactive)
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('occcccccc-cccc-cccc-cccc-cccccccccccc', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'stripe', 'paid', 237500, '2026-01-02 10:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('occcccccc-cccc-cccc-cccc-cccccccccccc', 'membership', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'warriors', '2026-Y', 235000);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'warriors', '2026-Y', 'year', '2026-01-01', '2026-12-31', 'paid');

-- Pending ACH
insert into orders (id, household_id, source, status, amount_cents, payment_method_type, created_at) values
  ('odddddddd-dddd-dddd-dddd-dddddddddddd', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'stripe', 'processing', 73500, 'us_bank_account', '2026-10-01 14:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('odddddddd-dddd-dddd-dddd-dddddddddddd', 'membership', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'little_judokas', '2027-Q1', 38000),
  ('odddddddd-dddd-dddd-dddd-dddddddddddd', 'coaches_fee', null, null, null, 22500);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'little_judokas', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'pending');

-- Adult Rec member
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('oeeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'stripe', 'paid', 65000, '2026-10-01 08:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('oeeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'membership', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'adult_rec', '2027-Q1', 40000),
  ('oeeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'coaches_fee', null, null, null, 22500);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'adult_rec', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'paid');

-- Collegiate member
insert into orders (id, household_id, source, status, amount_cents, paid_at) values
  ('offffffff-ffff-ffff-ffff-ffffffffffff', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'venmo', 'paid', 74000, '2026-09-30 12:00:00');

insert into order_items (order_id, kind, member_id, program_id, term_id, amount_cents) values
  ('offffffff-ffff-ffff-ffff-ffffffffffff', 'membership', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'collegiate', '2027-Q1', 51500),
  ('offffffff-ffff-ffff-ffff-ffffffffffff', 'coaches_fee', null, null, null, 22500);

insert into memberships (member_id, program_id, term_id, plan, start_date, end_date, status) values
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'collegiate', '2027-Q1', 'quarter', '2027-01-01', '2027-03-31', 'paid');

-- Admin user (create after setting up auth)
-- Run this after creating the admin user in Supabase Auth:
-- insert into profiles (user_id, household_id, role, full_name) values
--   ('<admin-user-id>', null, 'admin', 'Admin User');
