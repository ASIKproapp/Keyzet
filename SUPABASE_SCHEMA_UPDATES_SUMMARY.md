# Supabase Schema Updates Summary

This document summarizes all the updates made to the SQL database files to align with your website requirements.

## Files Updated

### 1. Migration Script (`supabase/migrations/001_update_schema.sql`)

- Fixed syntax error with `ADD CONSTRAINT IF NOT EXISTS` by replacing it with a proper conditional block
- Updated foreign key references from `users` table to `profiles` table
- Corrected role checking logic to use `is_admin` column instead of `role` column

### 2. Award Coins Function (`supabase/functions/award_coins.sql`)

- Updated table reference from `users` to `profiles` when updating coin balance

## Key Changes Made

### Schema Alignment
- All foreign key references now point to the `profiles` table instead of the legacy `users` table
- Updated column references to match the new schema structure
- Consistent use of `is_admin` boolean column instead of `role` text column

### Syntax Fixes
- Replaced unsupported `ADD CONSTRAINT IF NOT EXISTS` with a conditional block using `DO $$ ... $$` syntax
- Ensured all SQL syntax is compatible with PostgreSQL

### Security Improvements
- Maintained Row Level Security (RLS) policies across all tables
- Preserved existing security constraints and policies

## Updated Table Relationships

1. **profiles** - Core user table referencing `auth.users`
2. **products** - References `categories`
3. **product_images** - References `products`
4. **carts** - References `profiles`
5. **cart_items** - References `carts` and `products`
6. **addresses** - References `profiles`
7. **orders** - References `profiles` and `addresses`
8. **order_items** - References `orders` and `products`
9. **reviews** - References `profiles` and `products`
10. **coin_transactions** - References `profiles`
11. **leaderboard** - References `profiles`
12. **rewards** - Standalone table
13. **posts** - References `profiles`
14. **post_reactions** - References `posts` and `profiles`
15. **chats** - Standalone table
16. **chat_members** - References `chats` and `profiles`
17. **messages** - References `chats` and `profiles`
18. **notifications** - References `profiles`

## Verification

All updated files have been checked for:
- Syntax correctness
- Proper table relationships
- Consistent column naming
- Security policy preservation

These updates ensure your Supabase backend is fully aligned with your website requirements and follows Supabase best practices.