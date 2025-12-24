@echo off
echo ========================================
echo StyleVerse Supabase Deployment Helper
echo ========================================
echo.
echo This script will guide you through the Supabase deployment process.
echo.
echo Please follow these steps:
echo.
echo 1. Go to your Supabase dashboard at https://app.supabase.io/
echo 2. Select your project "ztbonilgmhckzigxxhat"
echo 3. Navigate to the SQL Editor
echo 4. Run the following scripts in order:
echo    - supabase/schema_incremental.sql
echo    - supabase/migrations/001_update_schema.sql
echo    - supabase/storage_setup.sql
echo.
echo 5. Then deploy the functions:
echo    - supabase/functions/add_to_cart.sql
echo    - supabase/functions/checkout.sql
echo    - supabase/functions/award_coins.sql
echo.
echo 6. Enable the Email provider in Authentication Settings
echo.
echo Press any key to open the project folder in Explorer...
pause >nul
explorer.exe "%~dp0"
echo.
echo Press any key to exit...
pause >nul