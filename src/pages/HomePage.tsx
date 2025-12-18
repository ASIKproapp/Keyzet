import { ChevronRight, Flame, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { PostCard } from "@/components/community/PostCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data
const categories = [
  { name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop", href: "/shop/category/sarees" },
  { name: "Kurtis", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop", href: "/shop/category/kurtis" },
  { name: "Lehengas", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=200&fit=crop", href: "/shop/category/lehengas" },
  { name: "Western", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop", href: "/shop/category/western" },
  { name: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop", href: "/shop/category/men" },
  { name: "Kids", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop", href: "/shop/category/kids" },
];

const trendingProducts = [
  { id: "1", name: "Banarasi Silk Saree with Golden Zari Work", price: 3499, originalPrice: 5999, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop", rating: 4.8, reviews: 234, badge: "sale" as const, coins: 35 },
  { id: "2", name: "Designer Anarkali Kurti Set", price: 1899, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop", rating: 4.6, reviews: 156, badge: "trending" as const, coins: 19 },
  { id: "3", name: "Embroidered Lehenga Choli", price: 7999, originalPrice: 12999, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop", rating: 4.9, reviews: 89, badge: "new" as const, coins: 80 },
  { id: "4", name: "Floral Print Maxi Dress", price: 1299, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop", rating: 4.5, reviews: 312, coins: 13 },
];

const communityPosts = [
  {
    id: "1",
    author: { id: "user1", name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", isVerified: true },
    content: "Just received my order! The quality is absolutely amazing 😍 Wearing this saree to my cousin's wedding!",
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"],
    likes: 234,
    comments: 45,
    shares: 12,
    timeAgo: "2 hours ago",
    isLiked: true,
    productTag: { id: "1", name: "Banarasi Silk Saree", price: 3499 },
  },
];

export default function HomePage() {
  return (
    <AppLayout>
      {/* Hero Banner */}
      <section className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary">
          <img 
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=400&fit=crop"
            alt="Fashion Banner"
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <Badge variant="gold" className="w-fit mb-3">
            <Zap className="w-3 h-3 mr-1" />
            Flash Sale
          </Badge>
          <h1 className="font-display text-3xl font-bold text-primary-foreground mb-2">
            Wedding Season<br />Collection
          </h1>
          <p className="text-primary-foreground/80 text-sm mb-4">
            Up to 50% off on ethnic wear
          </p>
          <Button variant="glass" size="lg" className="w-fit text-primary-foreground border-primary-foreground/30">
            Shop Now
          </Button>
        </div>

        {/* Floating Coin Indicator */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
          <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center">
            <span className="text-[10px] font-bold text-accent-foreground">₿</span>
          </div>
          <span className="text-xs font-semibold">Earn 2x Coins</span>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">Categories</h2>
          <Link to="/shop" className="text-sm text-primary font-medium flex items-center">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Trending Now</h2>
          </div>
          <Link to="/shop" className="text-sm text-primary font-medium flex items-center">
            See More <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Community Highlights */}
      <section className="py-4">
        <div className="flex items-center justify-between mb-4 px-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">From Community</h2>
          </div>
          <Link to="/community" className="text-sm text-primary font-medium flex items-center">
            Explore <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div>
          {communityPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </section>

      {/* Game Banner */}
      <section className="mx-4 mb-6">
        <Link to="/game" className="block relative overflow-hidden rounded-2xl gradient-gold p-5">
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-2">Play & Win</Badge>
            <h3 className="font-display font-bold text-xl text-accent-foreground mb-1">
              Spin to Win!
            </h3>
            <p className="text-sm text-accent-foreground/80 mb-3">
              Earn coins daily and unlock exclusive rewards
            </p>
            <Button variant="secondary" size="sm">
              Play Now
            </Button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-background/20 flex items-center justify-center animate-spin-slow">
            <div className="w-16 h-16 rounded-full bg-background/30 flex items-center justify-center">
              <span className="text-3xl">🎰</span>
            </div>
          </div>
        </Link>
      </section>
    </AppLayout>
  );
}
