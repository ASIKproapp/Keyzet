# Deploy to Supabase - Step by Step Guide

## 🚀 Deployment Process

Follow these steps to deploy your StyleVerse application to your Supabase project.

## Step 1: Access Your Supabase Dashboard

1. Go to https://app.supabase.io/
2. Log in to your account
3. Select your project "ztbonilgmhckzigxxhat"

## Step 2: Deploy Database Schema

### Run SQL Scripts in Order

In your Supabase dashboard, go to "SQL Editor" and run these scripts:

#### Script 1: Base Schema
1. Open `supabase/schema.sql`
2. Copy the entire content
3. Paste it into the SQL Editor
4. Click "Run"

#### Script 2: Enhanced Schema
1. Open `supabase/schema_updated.sql`
2. Copy the entire content
3. Paste it into the SQL Editor
4. Click "Run"

#### Script 3: Migration
1. Open `supabase/migrations/001_update_schema.sql`
2. Copy the entire content
3. Paste it into the SQL Editor
4. Click "Run"

#### Script 4: Storage Setup
1. Open `supabase/storage_setup.sql`
2. Copy the entire content
3. Paste it into the SQL Editor
4. Click "Run"

## Step 3: Deploy Database Functions

In your Supabase dashboard, go to "Database" → "Functions":

### Function 1: add_to_cart
1. Click "Create Function"
2. Name: `add_to_cart`
3. Open `supabase/functions/add_to_cart.sql`
4. Copy the entire content
5. Paste it into the function editor
6. Click "Save"

### Function 2: checkout
1. Click "Create Function"
2. Name: `checkout`
3. Open `supabase/functions/checkout.sql`
4. Copy the entire content
5. Paste it into the function editor
6. Click "Save"

### Function 3: award_coins
1. Click "Create Function"
2. Name: `award_coins`
3. Open `supabase/functions/award_coins.sql`
4. Copy the entire content
5. Paste it into the function editor
6. Click "Save"

## Step 4: Configure Authentication

In your Supabase dashboard, go to "Authentication" → "Settings":

1. Enable the "Email" provider
2. Optionally enable other providers (Google, GitHub, etc.)
3. Configure email templates as needed

## Step 5: Verify Deployment

### Restart Your Development Server
```bash
npm run dev
```

### Test the Connection
1. Visit http://localhost:8119/supabase-test
2. Run all connection tests on the page
3. Check browser console for successful connection messages

## 📋 Deployment Checklist

- [ ] Base schema deployed (`supabase/schema.sql`)
- [ ] Enhanced schema deployed (`supabase/schema_updated.sql`)
- [ ] Migration script deployed (`supabase/migrations/001_update_schema.sql`)
- [ ] Storage setup deployed (`supabase/storage_setup.sql`)
- [ ] `add_to_cart` function deployed
- [ ] `checkout` function deployed
- [ ] `award_coins` function deployed
- [ ] Email authentication provider enabled
- [ ] Connection tested successfully

## 🆘 Troubleshooting

### Common Issues

1. **Schema Deployment Errors**
   - Make sure you're running scripts in the correct order
   - Check for any syntax errors in the SQL
   - Ensure your database user has proper permissions

2. **Function Deployment Errors**
   - Verify function names match exactly
   - Check for syntax errors in SQL functions
   - Ensure all referenced tables exist before deploying functions

3. **Connection Issues**
   - Double-check your `.env` file configuration
   - Verify your Supabase project URL is correct
   - Confirm your anon key is valid

### Getting Help

If you encounter issues:
1. Check the browser console for detailed error messages
2. Review the Supabase dashboard logs
3. Verify all steps were completed in order

## 🎉 Success!

Once all steps are completed and verified, your StyleVerse application will be fully connected to Supabase with:

- Real user authentication
- Persistent data storage
- Real-time features
- Complete e-commerce functionality
- Community and gamification systems
- Admin panel capabilities
- Enterprise-grade security

Your application will be ready for production use!