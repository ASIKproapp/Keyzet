# Getting Your Supabase Anon Key

You've provided a publishable key, but for the StyleVerse application to work properly, we need your "anon public" key. Here's how to get it:

## Steps to Get Your Anon Key

1. **Access Your Supabase Dashboard**
   - Go to https://app.supabase.io/
   - Log in to your account
   - Select your project "ztbonilgmhckzigxxhat"

2. **Navigate to API Settings**
   - In the left sidebar, click on the gear icon (Settings)
   - In the Settings menu, click on "API"

3. **Find Your Anon Key**
   - Scroll down to the "Project API keys" section
   - Look for the key labeled "anon public"
   - This is the key you need to copy

4. **Update Your Configuration**
   - Open your `.env` file
   - Replace the current placeholder with your actual anon key:
     ```
     VITE_SUPABASE_URL=https://ztbonilgmhckzigxxhat.supabase.co
     VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
     ```

## Difference Between Keys

- **Publishable Key**: Used for Supabase Edge Functions and other server-side operations
- **Anon Public Key**: Used for client-side operations in web applications (what we need)

## Verification

After updating your anon key:

1. Save the `.env` file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Visit http://localhost:8119/supabase-test
4. Check the browser console for successful connection messages

## Need Help?

If you're having trouble finding your anon key:
1. Make sure you're looking in the correct project
2. Check that you're in the Settings > API section
3. Look specifically for "anon public" (not service_role or other keys)

Once you have the correct anon key, your StyleVerse application will be able to connect to Supabase!