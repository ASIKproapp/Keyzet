# Supabase Backend Setup

This directory contains all the necessary files to set up the Supabase backend for the StyleVerse fashion app.

## Database Schema

The database schema is defined in `schema.sql` and includes:

1. **Users & Profiles** - Extended user management with trust scores and roles
2. **Products & Categories** - Complete product catalog with media support
3. **Cart System** - Shopping cart functionality
4. **Orders** - Complete order management system
5. **Reviews** - Product review system with fraud prevention
6. **Coins & Rewards** - Gamification system with anti-fraud measures
7. **Community** - Social features including posts and reactions
8. **Chat** - Real-time messaging system
9. **Notifications** - User notification system

## Security

Row Level Security (RLS) policies are implemented to ensure data privacy and security:

- Users can only access their own data
- Admins have appropriate access to manage the system
- Public read access where appropriate
- Anti-fraud measures for coins and reviews

## Storage

Three storage buckets are configured:

1. `product-images` - Public read, authenticated write
2. `review-videos` - Public read, authenticated write
3. `avatars` - Public read, authenticated write

## Functions

Database functions for core business logic:

1. `add_to_cart` - Adds items to user's shopping cart
2. `checkout` - Processes checkout with stock validation
3. `award_coins` - Awards coins for completed orders with fraud prevention

## Setup Instructions

1. Create a new Supabase project
2. Run `schema.sql` to create tables and relationships
3. Run `storage_setup.sql` to configure storage buckets
4. Deploy functions in the `functions` directory
5. Configure authentication providers as needed
6. Set up RLS policies

## Environment Variables

Update your `.env` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Admin Access

Admin users are identified by the `is_admin` flag in the `profiles` table. Set this flag to `true` for users who should have admin access.