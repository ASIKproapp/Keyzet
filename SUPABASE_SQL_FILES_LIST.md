# List of All SQL Files in the Web Application

This document provides a complete list of all SQL files in your Supabase project, organized by directory.

## Main Directory

1. `supabase/schema.sql` - Original database schema
2. `supabase/schema_incremental.sql` - Incremental database schema for existing databases
3. `supabase/schema_updated.sql` - Updated database schema with Supabase best practices
4. `supabase/storage_setup.sql` - Storage buckets and policies configuration

## Functions Directory

5. `supabase/functions/add_to_cart.sql` - Function to add items to cart
6. `supabase/functions/award_coins.sql` - Function to award coins for completed orders
7. `supabase/functions/checkout.sql` - Function to handle checkout process

## Migrations Directory

8. `supabase/migrations/001_update_schema.sql` - Migration script to update existing schema

## Summary

Total SQL files: 8

These files contain all the database schema definitions, functions, and migration scripts needed for your Supabase backend. They cover:
- Core database tables (users, products, orders, etc.)
- Database functions for business logic
- Storage configuration
- Schema migrations
- Row Level Security policies