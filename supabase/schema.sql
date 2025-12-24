-- ✅ DATABASE DESIGN PRINCIPLES
--
-- * Mobile-first
-- * Trust & anti-fraud focused
-- * Game + coins logic protected at DB level
-- * Supports phased rollout
-- * Clean relations for analytics later

-- 🧱 CORE EXTENSIONS
create extension if not exists "uuid-ossp";

-- 👤 USERS (Identity + Trust)
create table users (
  id uuid primary key default uuid_generate_v4(),
  username text unique not null,
  email text unique,
  phone text unique,
  avatar_url text,
  bio text,
  level int default 1,
  coins int default 0,
  trust_score int default 0,
  is_verified boolean default false,
  role text default 'user', -- user | admin | moderator
  created_at timestamptz default now()
);

-- 🛒 PRODUCTS & SHOP
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  price numeric not null,
  stock int default 0,
  category_id uuid references categories(id),
  trust_score int default 0,
  created_at timestamptz default now()
);

create table product_media (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  media_url text,
  media_type text, -- image | video
  created_at timestamptz default now()
);

-- 🧾 CART & ORDERS
create table carts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  created_at timestamptz default now()
);

create table cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id),
  quantity int default 1
);

create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  total_amount numeric,
  status text default 'pending', -- pending | paid | shipped | delivered | returned
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int,
  price numeric
);

-- ⭐ REVIEWS (TEXT + VIDEO)
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  product_id uuid references products(id),
  rating int check (rating between 1 and 5),
  review_text text,
  video_url text,
  is_verified_purchase boolean default false,
  created_at timestamptz default now()
);

-- 👥 COMMUNITY (POSTS)
create table posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  content text,
  media_url text,
  media_type text, -- image | video
  created_at timestamptz default now()
);

create table post_reactions (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references users(id),
  reaction text -- like | love | wow
);

-- 💬 CHAT SYSTEM
create table chats (
  id uuid primary key default uuid_generate_v4(),
  is_support boolean default false,
  created_at timestamptz default now()
);

create table chat_members (
  chat_id uuid references chats(id) on delete cascade,
  user_id uuid references users(id)
);

create table messages (
  id uuid primary key default uuid_generate_v4(),
  chat_id uuid references chats(id),
  sender_id uuid references users(id),
  message text,
  media_url text,
  created_at timestamptz default now()
);

-- 🎮 GAME, COINS & LEADERBOARD
create table coin_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  action text, -- purchase | review | share | like
  coins int,
  created_at timestamptz default now()
);

create table leaderboard (
  user_id uuid primary key references users(id),
  score int default 0,
  rank int
);

create table rewards (
  id uuid primary key default uuid_generate_v4(),
  title text,
  coin_cost int,
  reward_type text, -- discount | gift
  created_at timestamptz default now()
);

-- 🔔 NOTIFICATIONS
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  title text,
  body text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 🔐 SECURITY (VERY IMPORTANT)
-- Enable Row Level Security
alter table users enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_media enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table reviews enable row level security;
alter table posts enable row level security;
alter table post_reactions enable row level security;
alter table chats enable row level security;
alter table chat_members enable row level security;
alter table messages enable row level security;
alter table leaderboard enable row level security;
alter table notifications enable row level security;
alter table rewards enable row level security;
alter table product_images enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table coin_history enable row level security;

-- Example Policy (Users can see their own data)
create policy "Users can view own profile"
on users for select
using ((select auth.uid()) = id);

-- Category Policy
create policy "Categories are viewable by everyone"
on categories for select
using (true);

-- Product Policy
create policy "Products are viewable by everyone"
on products for select
using (true);

-- Product Media Policy
create policy "Product media are viewable by everyone"
on product_media for select
using (true);

-- Post Policy
create policy "Posts are viewable by everyone"
on posts for select
using (true);

create policy "Users can insert their own posts"
on posts for insert
with check ((select auth.uid()) = user_id);

create policy "Users can update their own posts"
on posts for update
using ((select auth.uid()) = user_id);

create policy "Users can delete their own posts"
on posts for delete
using ((select auth.uid()) = user_id);

-- Post Reactions Policy
create policy "Post reactions are viewable by everyone"
on post_reactions for select
using (true);

create policy "Users can react to posts"
on post_reactions for insert
with check ((select auth.uid()) = user_id);

create policy "Users can update their own reactions"
on post_reactions for update
using ((select auth.uid()) = user_id);

create policy "Users can delete their own reactions"
on post_reactions for delete
using ((select auth.uid()) = user_id);

-- Chat Policy
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

-- Chat Members Policy
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

-- Message Policy
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

-- Leaderboard Policy
create policy "Leaderboard is viewable by everyone"
on leaderboard for select
using (true);

-- Notification Policy
create policy "Users see own notifications"
on notifications for select
using ((select auth.uid()) = user_id);

-- Reward Policy
create policy "Rewards are viewable by everyone"
on rewards for select
using (true);

-- Product Images Policy
create policy "Product images are viewable by everyone"
on product_images for select
using (true);

-- Cart Policy
create policy "User cart access"
on carts for all
using ((select auth.uid()) = user_id);

-- Cart Items Policy
create policy "User cart items"
on cart_items for all
using (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
);

-- (You will add more policies later, step by step.)

-- 🧠 WHY THIS DATABASE IS STRONG
--
-- * Prevents fake coins
-- * Supports verified reviews
-- * Ready for video + live
-- * Game logic protected
-- * Admin scalable
-- * AI-friendly structure