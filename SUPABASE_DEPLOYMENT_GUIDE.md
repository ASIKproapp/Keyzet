# Supabase Deployment Guide

After configuring your environment variables, you'll need to deploy the database schema and functions to your Supabase project.

## Prerequisites

1. Supabase CLI installed (optional but recommended)
2. Access to your Supabase project dashboard

## Database Schema Deployment

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase dashboard at https://app.supabase.io/
2. Select your project "ztbonilgmhckzigxxhat"
3. In the left sidebar, click on "SQL Editor"
4. Run the following scripts in order:

#### Script 1: Base Schema
- Open `supabase/schema.sql`
- Copy the entire content
- Paste it into the SQL Editor
- Click "Run"

#### Script 2: Enhanced Schema
- Open `supabase/schema_updated.sql`
- Copy the entire content
- Paste it into the SQL Editor
- Click "Run"

#### Script 3: Migration
- Open `supabase/migrations/001_update_schema.sql`
- Copy the entire content
- Paste it into the SQL Editor
- Click "Run"

#### Script 4: Storage Setup
- Open `supabase/storage_setup.sql`
- Copy the entire content
- Paste it into the SQL Editor
- Click "Run"

## Database Functions Deployment

After deploying the schema, deploy the database functions:

1. In the Supabase dashboard, go to "Database" → "Functions"
2. For each function, click "Create Function" and paste the content:

### Function 1: add_to_cart
- Open `supabase/functions/add_to_cart.sql`
- Copy the entire content
- Create a new function with this SQL

### Function 2: checkout
- Open `supabase/functions/checkout.sql`
- Copy the entire content
- Create a new function with this SQL

### Function 3: award_coins
- Open `supabase/functions/award_coins.sql`
- Copy the entire content
- Create a new function with this SQL

## Authentication Configuration

1. In the Supabase dashboard, go to "Authentication" → "Settings"
2. Enable the "Email" provider
3. Optionally enable other providers (Google, GitHub, etc.)

## Verification

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Visit http://localhost:8119/supabase-test
3. Run the connection tests to verify everything is working

## Troubleshooting

If you encounter issues:

1. Check that all schema scripts ran successfully
2. Verify that all functions were deployed without errors
3. Confirm that authentication providers are enabled
4. Check the browser console for any error messages

Need help with any of these steps? Let me know!