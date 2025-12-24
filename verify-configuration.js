#!/usr/bin/env node

// Script to verify Supabase configuration before deployment
import { readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 StyleVerse Supabase Configuration Verification');
console.log('==============================================\n');

// Check if .env file exists
const envPath = join(process.cwd(), '.env');
let envContent;
try {
  envContent = readFileSync(envPath, 'utf8');
} catch (err) {
  console.error('❌ .env file not found!');
  console.log('Please make sure you are running this script from the project root directory.\n');
  process.exit(1);
}

console.log('📄 Current .env configuration:');
console.log('------------------------------');
console.log(envContent);
console.log('');

// Check Supabase configuration
const hasSupabaseUrl = envContent.includes('VITE_SUPABASE_URL');
const hasAnonKey = envContent.includes('VITE_SUPABASE_ANON_KEY');
const hasProjectUrl = envContent.includes('ztbonilgmhckzigxxhat.supabase.co');

if (hasSupabaseUrl && hasAnonKey && hasProjectUrl) {
  console.log('✅ Supabase configuration appears to be correct');
  console.log('   - Project URL is set');
  console.log('   - Anon key is present');
  console.log('   - Configuration is complete\n');
} else {
  console.log('⚠️  Supabase configuration may be incomplete');
  if (!hasSupabaseUrl) console.log('   - Missing VITE_SUPABASE_URL');
  if (!hasAnonKey) console.log('   - Missing VITE_SUPABASE_ANON_KEY');
  if (!hasProjectUrl) console.log('   - Project URL may be incorrect\n');
}

// Check for required files
const requiredFiles = [
  'supabase/schema_incremental.sql',
  'supabase/migrations/001_update_schema.sql',
  'supabase/storage_setup.sql',
  'supabase/functions/add_to_cart.sql',
  'supabase/functions/checkout.sql',
  'supabase/functions/award_coins.sql'
];

console.log('📁 Checking for required deployment files:');
console.log('-----------------------------------------');

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = join(process.cwd(), file);
  try {
    readFileSync(filePath);
    console.log(`✅ ${file}`);
  } catch (err) {
    console.log(`❌ ${file}`);
    allFilesExist = false;
  }
});

console.log('');

if (allFilesExist) {
  console.log('✅ All required deployment files are present\n');
  console.log('🚀 You are ready to proceed with deployment!');
  console.log('   Follow the steps in SUPABASE_DEPLOYMENT_CONSOLIDATED_GUIDE.md\n');
} else {
  console.log('❌ Some required deployment files are missing');
  console.log('   Please ensure all files are in their correct locations\n');
}

console.log('📋 Next steps:');
console.log('--------------');
console.log('1. Review SUPABASE_DEPLOYMENT_CONSOLIDATED_GUIDE.md');
console.log('2. Deploy schema using supabase/schema_incremental.sql');
console.log('3. Run migration script');
console.log('4. Set up storage');
console.log('5. Deploy functions');
console.log('6. Configure authentication');
console.log('7. Test the connection\n');