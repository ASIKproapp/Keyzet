# StyleVerse Supabase Deployment Helper
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "StyleVerse Supabase Deployment Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will guide you through the Supabase deployment process." -ForegroundColor Yellow
Write-Host ""

Write-Host "Please follow these steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to your Supabase dashboard at https://app.supabase.io/" -ForegroundColor White
Write-Host "2. Select your project 'ztbonilgmhckzigxxhat'" -ForegroundColor White
Write-Host "3. Navigate to the SQL Editor" -ForegroundColor White
Write-Host "4. Run the following scripts in order:" -ForegroundColor White
Write-Host "   - supabase/schema_incremental.sql" -ForegroundColor Green
Write-Host "   - supabase/migrations/001_update_schema.sql" -ForegroundColor Green
Write-Host "   - supabase/storage_setup.sql" -ForegroundColor Green
Write-Host ""
Write-Host "5. Then deploy the functions:" -ForegroundColor White
Write-Host "   - supabase/functions/add_to_cart.sql" -ForegroundColor Green
Write-Host "   - supabase/functions/checkout.sql" -ForegroundColor Green
Write-Host "   - supabase/functions/award_coins.sql" -ForegroundColor Green
Write-Host ""
Write-Host "6. Enable the Email provider in Authentication Settings" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Press 'Y' to open the project folder in Explorer, or any other key to exit"
if ($choice -eq 'Y' -or $choice -eq 'y') {
    explorer.exe "$PSScriptRoot"
    Write-Host ""
    Write-Host "Project folder opened in Explorer." -ForegroundColor Green
}

Write-Host ""
Write-Host "Press any key to exit..."
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")