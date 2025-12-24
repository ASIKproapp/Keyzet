-- ✅ DATABASE DESIGN PRINCIPLES
--
-- * Mobile-first
-- * Trust & anti-fraud focused
-- * Game + coins logic protected at DB level
-- * Supports phased rollout
-- * Clean relations for analytics later
-- * Aligns with Supabase best practices

-- 🧱 CORE EXTENSIONS
create extension if not exists "uuid-ossp";

-- 👤 USERS & PROFILES (Extended from existing users table)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  coins int default 0,
  is_admin boolean default false,
  level int default 1,
  trust_score int default 0,
  is_verified boolean default false,
  created_at timestamp default now()
);

-- 🛒 PRODUCTS & SHOP (Enhanced from existing structure)
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamp default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric not null,
  discount_price numeric,
  stock int not null,
  category_id uuid references categories(id),
  is_active boolean default true,
  trust_score int default 0,
  created_at timestamp default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null,
  created_at timestamp default now()
);

-- 🧾 CART SYSTEM (Enhanced from existing structure)
create table carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  updated_at timestamp default now()
);

create table cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null,
  created_at timestamp default now()
);

-- 📍 ADDRESS & CHECKOUT
create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  name text,
  phone text,
  address text,
  city text,
  created_at timestamp default now()
);

-- 📦 ORDERS (CORE MONEY TABLE - Enhanced from existing structure)
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  address_id uuid references addresses(id),
  status text default 'pending', -- pending | paid | shipped | delivered | returned
  total_amount numeric,
  payment_method text default 'cod',
  created_at timestamp default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  price numeric,
  quantity int,
  created_at timestamp default now()
);

-- ⭐ REVIEWS & TRUST (Enhanced from existing structure)
create table reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  rating int check (rating between 1 and 5),
  comment text,
  video_url text,
  is_verified_purchase boolean default false,
  created_at timestamp default now(),
  unique(user_id, product_id)
);

-- 🎮 GAME, COINS & LEADERBOARD (Enhanced from existing structure)
create table coin_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  source text,
  coins int,
  created_at timestamp default now()
);

create table leaderboard (
  user_id uuid primary key references profiles(id),
  score int default 0,
  rank int,
  updated_at timestamp default now()
);

create table rewards (
  id uuid primary key default gen_random_uuid(),
  title text,
  coin_cost int,
  reward_type text, -- discount | gift
  is_active boolean default true,
  created_at timestamp default now()
);

-- 👥 COMMUNITY (Posts - from existing structure)
create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  content text,
  media_url text,
  media_type text, -- image | video
  created_at timestamp default now()
);

create table post_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id),
  reaction text, -- like | love | wow
  created_at timestamp default now()
);

-- 💬 CHAT SYSTEM (from existing structure)
create table chats (
  id uuid primary key default gen_random_uuid(),
  is_support boolean default false,
  created_at timestamp default now()
);

create table chat_members (
  chat_id uuid references chats(id) on delete cascade,
  user_id uuid references profiles(id),
  joined_at timestamp default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references chats(id),
  sender_id uuid references profiles(id),
  message text,
  media_url text,
  created_at timestamp default now()
);

-- 🔔 NOTIFICATIONS (from existing structure)
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  title text,
  body text,
  is_read boolean default false,
  created_at timestamp default now()
);

-- 🔐 ROW LEVEL SECURITY POLICIES

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reviews enable row level security;
alter table posts enable row level security;
alter table post_reactions enable row level security;
alter table chats enable row level security;
alter table chat_members enable row level security;
alter table messages enable row level security;
alter table coin_transactions enable row level security;
alter table leaderboard enable row level security;
alter table rewards enable row level security;
alter table notifications enable row level security;

-- Profile Policies
create policy "Users read own profile"
on profiles for select
using ((select auth.uid()) = id);

create policy "Users update own profile"
on profiles for update
using ((select auth.uid()) = id);

create policy "Profiles are viewable by everyone"
on profiles for select
using (true);

-- Cart Policies
create policy "User cart access"
on carts for all
using ((select auth.uid()) = user_id);

create policy "User cart items"
on cart_items for all
using (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
);

-- Order Policies
create policy "Users see own orders"
on orders for select
using ((select auth.uid()) = user_id);

create policy "Admin manage orders"
on orders for all
using (
  exists (
    select 1 from profiles
    where id = (select auth.uid()) and is_admin = true
  )
);

-- Review Policies
create policy "Reviews are publicly viewable"
on reviews for select
using (true);

create policy "Users can insert their own reviews"
on reviews for insert
with check ((select auth.uid()) = user_id);

-- Coin Transaction Policies
create policy "Users see own coin transactions"
on coin_transactions for select
using ((select auth.uid()) = user_id);

-- Address Policies
create policy "Users see own addresses"
on addresses for select
using ((select auth.uid()) = user_id);

create policy "Users manage own addresses"
on addresses for all
using ((select auth.uid()) = user_id);

-- Category Policies
create policy "Categories are viewable by everyone"
on categories for select
using (true);

-- Product Policies
create policy "Products are viewable by everyone"
on products for select
using (true);

-- Product Images Policies
create policy "Product images are viewable by everyone"
on product_images for select
using (true);

-- Post Policies
create policy "Posts are viewable by everyone"
on posts for select
using (true);

create policy "Users can insert their own posts"
on posts for insert
with check (auth.uid() = user_id);

create policy "Users can update their own posts"
on posts for update
using (auth.uid() = user_id);

create policy "Users can delete their own posts"
on posts for delete
using (auth.uid() = user_id);

-- Post Reactions Policies
create policy "Post reactions are viewable by everyone"
on post_reactions for select
using (true);

create policy "Users can react to posts"
on post_reactions for insert
with check (auth.uid() = user_id);

create policy "Users can update their own reactions"
on post_reactions for update
using (auth.uid() = user_id);

create policy "Users can delete their own reactions"
on post_reactions for delete
using (auth.uid() = user_id);

-- Chat Policies
create policy "Users can access chats they belong to"
on chats for select
using (
  exists (
    select 1 from chat_members
    where chat_id = id and user_id = (select auth.uid())
  )
);

create policy "Users can create chats"
on chats for insert
with check (true);

-- Chat Members Policies
create policy "Users can see chat members for chats they belong to"
on chat_members for select
using (
  exists (
    select 1 from chats
    where id = chat_id and exists (
      select 1 from chat_members cm
      where cm.chat_id = chats.id and cm.user_id = (select auth.uid())
    )
  )
);

create policy "Users can join chats"
on chat_members for insert
with check (user_id = (select auth.uid()));

-- Message Policies
create policy "Users can see messages in chats they belong to"
on messages for select
using (
  exists (
    select 1 from chat_members
    where chat_id = chat_id and user_id = (select auth.uid())
  )
);

create policy "Users can send messages in chats they belong to"
on messages for insert
with check (
  exists (
    select 1 from chat_members
    where chat_id = chat_id and user_id = (select auth.uid())
  )
);

-- Leaderboard Policies
create policy "Leaderboard is viewable by everyone"
on leaderboard for select
using (true);

create policy "Users can update their own leaderboard entry"
on leaderboard for update
using ((select auth.uid()) = user_id);

-- Reward Policies
create policy "Rewards are viewable by everyone"
on rewards for select
using (true);

-- Notification Policies
create policy "Users see own notifications"
on notifications for select
using ((select auth.uid()) = user_id);

create policy "Users can update own notifications"
on notifications for update
using ((select auth.uid()) = user_id);

-- Anti-fraud measures
create unique index one_coin_reward_per_order
on coin_transactions(user_id, source)
where source like 'order_%';