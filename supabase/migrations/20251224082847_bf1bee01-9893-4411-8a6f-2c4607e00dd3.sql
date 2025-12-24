-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access for categories and products (shop is public)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, image_url) VALUES
  ('Electronics', 'electronics', 'Latest gadgets and tech accessories', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
  ('Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'),
  ('Gaming', 'gaming', 'Gaming gear and accessories', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400'),
  ('Home & Living', 'home-living', 'Home decor and essentials', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400');

-- Insert sample products
INSERT INTO public.products (name, slug, description, price, original_price, image_url, category_id, stock, is_featured) VALUES
  ('Wireless Earbuds Pro', 'wireless-earbuds-pro', 'Premium wireless earbuds with noise cancellation', 79.99, 99.99, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', (SELECT id FROM public.categories WHERE slug = 'electronics'), 50, true),
  ('Smart Watch Series X', 'smart-watch-series-x', 'Advanced fitness tracking and notifications', 199.99, 249.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', (SELECT id FROM public.categories WHERE slug = 'electronics'), 30, true),
  ('Urban Streetwear Hoodie', 'urban-streetwear-hoodie', 'Comfortable oversized hoodie', 59.99, NULL, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', (SELECT id FROM public.categories WHERE slug = 'fashion'), 100, false),
  ('RGB Gaming Keyboard', 'rgb-gaming-keyboard', 'Mechanical keyboard with customizable RGB', 129.99, 159.99, 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400', (SELECT id FROM public.categories WHERE slug = 'gaming'), 45, true),
  ('Minimalist Desk Lamp', 'minimalist-desk-lamp', 'Modern LED desk lamp with touch control', 39.99, NULL, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', (SELECT id FROM public.categories WHERE slug = 'home-living'), 75, false),
  ('Gaming Mouse Pro', 'gaming-mouse-pro', 'High precision gaming mouse 16000 DPI', 69.99, 89.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', (SELECT id FROM public.categories WHERE slug = 'gaming'), 60, true);