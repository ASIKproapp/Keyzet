#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join } from 'path';

console.log('StyleVerse Supabase Setup Helper');
console.log('==================================\n');

// Check if .env file exists
const envPath = join(process.cwd(), '.env');
let envContent;
try {
  envContent = readFileSync(envPath, 'utf8');
} catch (err) {
  console.error('❌ .env file not found!');
  console.log('Please make sure you are running this script from the project root directory.');
  process.exit(1);
}

console.log('Current .env configuration:');
console.log('---------------------------');
console.log(envContent);
console.log('');

// Check if Supabase is already configured
if (envContent.includes('your_supabase_project_url_here') || 
    envContent.includes('your-anon-key-here') ||
    envContent.includes('your_actual_project_url_here')) {
  console.log('⚠️  Supabase is not yet configured.');
  console.log('\nTo configure Supabase:');
  console.log('1. Create a project at https://supabase.io');
  console.log('2. Get your Project URL and Anon Key from Settings > API');
  console.log('3. Update the values in your .env file');
  console.log('4. Restart your development server\n');
} else {
  console.log('✅ Supabase appears to be configured.');
  console.log('You can verify the connection by visiting http://localhost:8119/supabase-test\n');
}

console.log('Next steps:');
console.log('===========');
console.log('1. Run the database setup scripts in this order:');
console.log('   - supabase/schema.sql');
console.log('   - supabase/schema_updated.sql');
console.log('   - supabase/migrations/001_update_schema.sql');
console.log('');
console.log('2. Run the storage setup script:');
console.log('   - supabase/storage_setup.sql');
console.log('');
console.log('3. Deploy the database functions:');
console.log('   - supabase/functions/add_to_cart.sql');
console.log('   - supabase/functions/checkout.sql');
console.log('   - supabase/functions/award_coins.sql');
console.log('');
console.log('For detailed instructions, see SUPABASE_SETUP.md');