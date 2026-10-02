-- Cohen Brothers Judo Club - Database Schema
-- Run this in your Supabase SQL Editor

-- ===== Catalog =====
create table programs (
  id            text primary key,
  name          text not null,
  coaches_fee_exempt boolean not null default false,
  active        boolean not null default true
);

create table prices (
  id              uuid primary key default gen_random_uuid(),
  program_id      text not null references programs(id),
  term_type       text not null check (term_type in ('quarter','year')),
  season_year     int  not null,
  amount_cents    int  not null,
  stripe_price_id text,
  unique (program_id, term_type, season_year)
);

create table terms (
  id          text primary key,
  term_type   text not null check (term_type in ('quarter','year')),
  start_date  date not null,
  end_date    date not null,
  season_year int  not null
);

-- ===== People =====
create table households (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  email              text not null unique,
  phone              text,
  stripe_customer_id text unique,
  created_at         timestamptz not null default now()
);

create table profiles (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  household_id uuid references households(id),
  role         text not null default 'guardian' check (role in ('guardian','admin')),
  full_name    text
);

create table members (
  id           uuid primary key default gen_random_uuid(),
  household_id uuid not null references households(id) on delete cascade,
  first_name   text not null,
  last_name    text not null,
  birth_date   date,
  status       text not null default 'active' check (status in ('active','inactive','archived')),
  notes        text,
  created_at   timestamptz not null default now()
);

-- ===== Money =====
create table orders (
  id                 uuid primary key default gen_random_uuid(),
  household_id       uuid not null references households(id),
  source             text not null check (source in ('stripe','cash','zelle','check','venmo','other')),
  status             text not null check (status in ('pending','processing','paid','failed','expired','refunded','disputed')),
  amount_cents       int  not null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id   text unique,
  stripe_subscription_id     text,
  stripe_invoice_id          text unique,
  payment_method_type text,
  reference          text,
  recorded_by        uuid references auth.users(id),
  paid_at            timestamptz,
  created_at         timestamptz not null default now()
);

create table order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references orders(id) on delete cascade,
  kind         text not null check (kind in ('membership','coaches_fee','adjustment')),
  member_id    uuid references members(id),
  program_id   text references programs(id),
  term_id      text references terms(id),
  season_year  int,
  amount_cents int not null
);

create table memberships (
  id            uuid primary key default gen_random_uuid(),
  member_id     uuid not null references members(id) on delete cascade,
  program_id    text not null references programs(id),
  term_id       text not null references terms(id),
  plan          text not null check (plan in ('quarter','year')),
  start_date    date not null,
  end_date      date not null,
  status        text not null default 'paid' check (status in ('pending','paid','void')),
  order_item_id uuid references order_items(id),
  created_at    timestamptz not null default now(),
  unique (member_id, program_id, term_id)
);
create index on memberships (end_date) where status = 'paid';

create table season_fees (
  household_id uuid not null references households(id),
  season_year  int  not null,
  amount_cents int  not null,
  children_covered int not null,
  order_item_id uuid references order_items(id),
  primary key (household_id, season_year)
);

-- ===== Plumbing =====
create table stripe_events (
  id          text primary key,
  type        text not null,
  received_at timestamptz not null default now()
);

create table notifications (
  id          uuid primary key default gen_random_uuid(),
  member_id   uuid not null references members(id),
  term_id     text not null references terms(id),
  kind        text not null check (kind in ('expiring_30','expiring_7','expiring_0','lapsed')),
  sent_at     timestamptz not null default now(),
  unique (member_id, term_id, kind)
);

-- ===== RLS =====
alter table households enable row level security;
alter table members     enable row level security;
alter table memberships enable row level security;
alter table orders      enable row level security;

create policy "guardian reads own household" on households for select
  using (id = (select household_id from profiles where user_id = auth.uid()));
create policy "guardian reads own members" on members for select
  using (household_id = (select household_id from profiles where user_id = auth.uid()));
create policy "guardian reads own memberships" on memberships for select
  using (member_id in (select id from members where household_id =
         (select household_id from profiles where user_id = auth.uid())));
create policy "guardian reads own orders" on orders for select
  using (household_id = (select household_id from profiles where user_id = auth.uid()));

-- ===== Helper Functions =====
create or replace function club_today() returns date
language sql stable as $$ select (now() at time zone 'America/Chicago')::date $$;

-- ===== Member Status View =====
create or replace view member_status as
with cov as (
  select m.id as member_id,
         max(ms.end_date) filter (where ms.status = 'paid')                         as last_paid_end,
         max(ms.end_date) filter (where ms.status = 'paid'
                                   and ms.start_date <= club_today())               as current_term_end,
         bool_or(ms.status = 'paid' and ms.start_date > club_today())               as has_future_term,
         bool_or(ms.status = 'pending')                                             as has_pending
  from members m
  left join memberships ms on ms.member_id = m.id
  group by m.id
)
select m.*, h.name as household_name, h.email, h.phone,
       c.last_paid_end, c.current_term_end, c.has_future_term, c.has_pending,
       (c.last_paid_end - club_today()) as days_left,
       case
         when m.status = 'archived'                                  then 'archived'
         when c.last_paid_end is null                                then 'never_paid'
         when c.last_paid_end <  club_today()                        then 'expired'
         when c.last_paid_end =  club_today()                        then 'expires_today'
         when c.last_paid_end <= club_today() + 7                    then 'expiring_7'
         when c.last_paid_end <= club_today() + 30                   then 'expiring_30'
         else 'active'
       end as bucket
from members m
join households h on h.id = m.household_id
join cov c on c.member_id = m.id;
