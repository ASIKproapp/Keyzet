-- Migration script to update existing schema to align with Supabase best practices

-- Add new columns to users table to match profiles table
alter table users 
add column if not exists full_name text,
add column if not exists is_admin boolean default false,
add column if not exists discount_price numeric,
add column if not exists is_active boolean default true,
add column if not exists payment_method text default 'cod';

-- Create profiles table that references auth.users
create table if not exists profiles (
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

-- Create product_images table
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  image_url text not null,
  created_at timestamp default now()
);

-- Add discount_price column to products table
alter table products 
add column if not exists discount_price numeric,
add column if not exists is_active boolean default true;

-- Create addresses table
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text,
  phone text,
  address text,
  city text,
  created_at timestamp default now()
);

-- Add address_id and payment_method to orders table
alter table orders 
add column if not exists address_id uuid references addresses(id),
add column if not exists payment_method text default 'cod';

-- Add unique constraint to reviews
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_product_review'
  ) THEN
    ALTER TABLE reviews ADD CONSTRAINT unique_user_product_review UNIQUE(user_id, product_id);
  END IF;
END $$;

-- Create coin_transactions table (replacing coin_history)
create table if not exists coin_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  source text,
  coins int,
  created_at timestamp default now()
);

-- Add is_active column to rewards
alter table rewards 
add column if not exists is_active boolean default true;

-- Update RLS policies
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
alter table leaderboard enable row level security;
alter table notifications enable row level security;
alter table rewards enable row level security;
alter table product_media enable row level security;
alter table addresses enable row level security;
alter table coin_transactions enable row level security;

-- Profile Policies
drop policy if exists "Users can view own profile" on users;
create policy "Users read own profile"
on users for select
using ((select auth.uid()) = id);

create policy "Users update own profile"
on users for update
using ((select auth.uid()) = id);

create policy "Profiles are viewable by everyone"
on profiles for select
using (true);

-- Cart Policies
drop policy if exists "User cart access" on carts;
create policy "User cart access"
on carts for all
using ((select auth.uid()) = user_id);

drop policy if exists "User cart items" on cart_items;
create policy "User cart items"
on cart_items for all
using (
  cart_id in (
    select id from carts where user_id = (select auth.uid())
  )
);

-- Order Policies
drop policy if exists "Users see own orders" on orders;
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
create policy if not exists "Categories are viewable by everyone"
on categories for select
using (true);

-- Product Policies
create policy if not exists "Products are viewable by everyone"
on products for select
using (true);

-- Product Images Policies
create policy if not exists "Product images are viewable by everyone"
on product_images for select
using (true);

-- Product Media Policies
create policy if not exists "Product media are viewable by everyone"
on product_media for select
using (true);

-- Post Policies
create policy if not exists "Posts are viewable by everyone"
on posts for select
using (true);

create policy if not exists "Users can insert their own posts"
on posts for insert
with check ((select auth.uid()) = user_id);

create policy if not exists "Users can update their own posts"
on posts for update
using ((select auth.uid()) = user_id);

create policy if not exists "Users can delete their own posts"
on posts for delete
using ((select auth.uid()) = user_id);

-- Post Reactions Policies
create policy if not exists "Post reactions are viewable by everyone"
on post_reactions for select
using (true);

create policy if not exists "Users can react to posts"
on post_reactions for insert
with check ((select auth.uid()) = user_id);

create policy if not exists "Users can update their own reactions"
on post_reactions for update
using ((select auth.uid()) = user_id);

create policy if not exists "Users can delete their own reactions"
on post_reactions for delete
using ((select auth.uid()) = user_id);

-- Chat Policies
create policy if not exists "Users can access chats they belong to"
on chats for select
using (
  exists (
    select 1 from chat_members
    where chat_id = id and user_id = (select auth.uid())
  )
);

create policy if not exists "Users can create chats"
on chats for insert
with check (true);

-- Chat Members Policies
create policy if not exists "Users can see chat members for chats they belong to"
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

create policy if not exists "Users can join chats"
on chat_members for insert
with check (user_id = (select auth.uid()));

-- Message Policies
create policy if not exists "Users can see messages in chats they belong to"
on messages for select
using (
  exists (
    select 1 from chat_members
    where chat_id = chat_id and user_id = (select auth.uid())
  )
);

create policy if not exists "Users can send messages in chats they belong to"
on messages for insert
with check (
  exists (
    select 1 from chat_members
    where chat_id = chat_id and user_id = (select auth.uid())
  )
);

-- Order Items Policies
create policy if not exists "Users see own order items"
on order_items for select
using (
  exists (
    select 1 from orders
    where id = order_id and user_id = (select auth.uid())
  )
);

create policy if not exists "Admin manage order items"
on order_items for all
using (
  exists (
    select 1 from profiles
    where id = (select auth.uid()) and is_admin = true
  )
);

-- Leaderboard Policies
create policy if not exists "Leaderboard is viewable by everyone"
on leaderboard for select
using (true);

create policy if not exists "Users can update their own leaderboard entry"
on leaderboard for update
using ((select auth.uid()) = user_id);

-- Reward Policies
create policy if not exists "Rewards are viewable by everyone"
on rewards for select
using (true);

-- Notification Policies
create policy if not exists "Users see own notifications"
on notifications for select
using ((select auth.uid()) = user_id);

create policy if not exists "Users can update own notifications"
on notifications for update
using ((select auth.uid()) = user_id);

-- Anti-fraud measures
create unique index if not exists one_coin_reward_per_order
on coin_transactions(user_id, source)
where source like 'order_%';