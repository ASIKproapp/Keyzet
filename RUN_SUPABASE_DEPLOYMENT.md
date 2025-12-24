# Run Supabase Deployment

## 🚀 How to Deploy Your Schema Safely

Since we encountered the "relation already exists" error, we'll use the incremental approach to deploy your schema safely.

## Step 1: Deploy the Incremental Schema

1. Go to your Supabase dashboard: https://app.supabase.io/
2. Select your project "ztbonilgmhckzigxxhat"
3. In the left sidebar, click on "SQL Editor"
4. Create a new query
5. Open the file `supabase/schema_incremental.sql`
6. Copy the entire content
7. Paste it into the SQL Editor
8. Click "Run"

This will safely create only the tables that don't already exist.

## Step 2: Run the Migration Script

1. In the SQL Editor, create a new query
2. Open the file `supabase/migrations/001_update_schema.sql`
3. Copy the entire content
4. Paste it into the SQL Editor
5. Click "Run"

## Step 3: Set Up Storage

1. In the SQL Editor, create a new query
2. Open the file `supabase/storage_setup.sql`
3. Copy the entire content
4. Paste it into the SQL Editor
5. Click "Run"

## Step 4: Deploy Database Functions

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

## Step 5: Configure Authentication

In your Supabase dashboard, go to "Authentication" → "Settings":

1. Enable the "Email" provider
2. Optionally enable other providers (Google, GitHub, etc.)
3. Configure email templates as needed

## Step 6: Verify Deployment

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:8119/supabase-test

3. Run all connection tests on the page

4. Check browser console for successful connection messages

## 📋 Deployment Checklist

- [ ] Incremental schema deployed (`supabase/schema_incremental.sql`)
- [ ] Migration script deployed (`supabase/migrations/001_update_schema.sql`)
- [ ] Storage setup deployed (`supabase/storage_setup.sql`)
- [ ] `add_to_cart` function deployed
- [ ] `checkout` function deployed
- [ ] `award_coins` function deployed
- [ ] Email authentication provider enabled
- [ ] Connection tested successfully

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