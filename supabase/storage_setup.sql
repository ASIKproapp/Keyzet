-- Storage buckets setup for Supabase

-- Create storage buckets
insert into storage.buckets (id, name, public)
values 
  ('product-images', 'product-images', true),
  ('review-videos', 'review-videos', true),
  ('avatars', 'avatars', true);

-- Set up storage policies

-- Product images - public read, authenticated write
create policy "Product images are publicly accessible"
on storage.objects for select
using ( bucket_id = 'product-images' );

create policy "Anyone can upload product images"
on storage.objects for insert
with check ( bucket_id = 'product-images' AND auth.role() = 'authenticated' );

-- Review videos - public read, authenticated write
create policy "Review videos are publicly accessible"
on storage.objects for select
using ( bucket_id = 'review-videos' );

create policy "Users can upload review videos"
on storage.objects for insert
with check ( bucket_id = 'review-videos' AND auth.role() = 'authenticated' );

-- Avatars - public read, authenticated write
create policy "Avatars are publicly accessible"
on storage.objects for select
using ( bucket_id = 'avatars' );

create policy "Users can upload avatars"
on storage.objects for insert
with check ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

-- Allow updates and deletes for authenticated users on their own files
create policy "Users can update their own files"
on storage.objects for update
using ( auth.role() = 'authenticated' AND (owner = auth.uid() OR bucket_id IN ('product-images', 'review-videos', 'avatars')) );

create policy "Users can delete their own files"
on storage.objects for delete
using ( auth.role() = 'authenticated' AND (owner = auth.uid() OR bucket_id IN ('product-images', 'review-videos', 'avatars')) );