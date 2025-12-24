# Supabase Setup Guide

This guide will help you connect the StyleVerse fashion app to a real Supabase backend.

## Prerequisites

1. Node.js 16+ installed
2. A Supabase account (free tier available at https://supabase.io)

## Step 1: Create a Supabase Project

1. Go to https://supabase.io
2. Sign up or log in to your account
3. Click "New Project"
4. Enter a name for your project (e.g., "styleverse")
5. Set a database password (save this for later)
6. Select a region closest to you
7. Click "Create Project"

## Step 2: Get Your Supabase Credentials

1. After your project is created, go to the "Settings" icon in the left sidebar
2. Click "API" in the settings menu
3. Copy the following values:
   - Project URL (starts with https://)
   - anon key (long string under Project API keys)

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```
VITE_SUPABASE_URL=your_actual_project_url_here
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

For example:
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxx
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to the "SQL Editor" in the left sidebar
2. Copy and paste the contents of `supabase/schema.sql` into the editor
3. Click "RUN" to execute the schema
4. Repeat for `supabase/schema_updated.sql`
5. Run the migration script `supabase/migrations/001_update_schema.sql`

## Step 5: Set Up Storage

1. In your Supabase dashboard, go to "Storage" in the left sidebar
2. Run the storage setup script from `supabase/storage_setup.sql` in the SQL Editor

## Step 6: Deploy Database Functions

1. In your Supabase dashboard, go to "Database" → "Functions"
2. Deploy each function from the `supabase/functions/` directory:
   - `add_to_cart.sql`
   - `checkout.sql`
   - `award_coins.sql`

## Step 7: Configure Authentication

1. In your Supabase dashboard, go to "Authentication" → "Settings"
2. Enable "Email" as a sign-up provider
3. Optionally enable other providers (Google, GitHub, etc.)

## Step 8: Test the Connection

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open your browser to http://localhost:8119 (or whatever port Vite assigns)
3. Check the browser console for Supabase connection messages

## Troubleshooting

### If you see "Supabase not configured" messages:

1. Double-check that your `.env` file has the correct values
2. Ensure there are no extra spaces or quotes around the values
3. Restart the development server after making changes

### If you get authentication errors:

1. Make sure you've enabled the appropriate authentication providers in Supabase
2. Check that your anon key is correct

### If database queries fail:

1. Verify that you've run all the schema setup scripts
2. Check that the RLS policies are properly configured

## Admin Access

To grant admin access to a user:

1. In your Supabase SQL Editor, run:
   ```sql
   UPDATE profiles SET is_admin = true WHERE email = 'your-admin-email@example.com';
   ```

Or create a new profile with admin access:
```sql
INSERT INTO profiles (id, username, email, is_admin) 
VALUES ('user-uuid-here', 'admin-user', 'admin@example.com', true);
```

## Next Steps

Once connected, your application will:

- Use real database queries instead of mock data
- Support user authentication with Supabase Auth
- Enable real product listings and purchases
- Activate the community features (posts, reactions)
- Enable the gamification system (coins, rewards)
- Allow admin users to manage products and orders

The application will automatically detect when Supabase is properly configured and switch from mock mode to real backend mode.