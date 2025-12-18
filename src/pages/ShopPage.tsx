import { useState } from "react";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategoryCard } from "@/components/shop/CategoryCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop", href: "/shop" },
  { name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop", href: "/shop/category/sarees" },
  { name: "Kurtis", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop", href: "/shop/category/kurtis" },
  { name: "Lehengas", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&h=200&fit=crop", href: "/shop/category/lehengas" },
  { name: "Western", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop", href: "/shop/category/western" },
  { name: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop", href: "/shop/category/men" },
];

const products = [
  { id: "1", name: "Banarasi Silk Saree with Golden Zari Work", price: 3499, originalPrice: 5999, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop", rating: 4.8, reviews: 234, badge: "sale" as const, coins: 35 },
  { id: "2", name: "Designer Anarkali Kurti Set", price: 1899, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop", rating: 4.6, reviews: 156, badge: "trending" as const, coins: 19 },
  { id: "3", name: "Embroidered Lehenga Choli", price: 7999, originalPrice: 12999, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop", rating: 4.9, reviews: 89, badge: "new" as const, coins: 80 },
  { id: "4", name: "Floral Print Maxi Dress", price: 1299, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop", rating: 4.5, reviews: 312, coins: 13 },
  { id: "5", name: "Cotton Palazzo Set", price: 999, originalPrice: 1499, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop", rating: 4.4, reviews: 178, badge: "sale" as const, coins: 10 },
  { id: "6", name: "Chiffon Printed Saree", price: 1599, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop", rating: 4.7, reviews: 267, coins: 16 },
  { id: "7", name: "Silk Blend Kurta Pajama", price: 2499, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=600&fit=crop", rating: 4.6, reviews: 123, coins: 25 },
  { id: "8", name: "Designer Party Gown", price: 4999, originalPrice: 7999, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop", rating: 4.8, reviews: 89, badge: "trending" as const, coins: 50 },
];

const sortOptions = ["Popular", "Newest", "Price: Low", "Price: High", "Rating"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <AppLayout title="Shop">
      <div className="flex flex-col">
        {/* Categories Scroll */}
        <div className="sticky top-14 z-30 bg-background border-b border-border/50 py-3">
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={cn(
                  "flex flex-col items-center gap-1.5 min-w-[60px] transition-all",
                  activeCategory === cat.name ? "opacity-100" : "opacity-60 hover:opacity-80"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl overflow-hidden border-2 transition-all",
                  activeCategory === cat.name ? "border-primary shadow-glow" : "border-transparent"
                )}>
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className={cn(
                  "text-[10px] font-medium",
                  activeCategory === cat.name && "text-primary font-semibold"
                )}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" className="gap-1.5">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            <div className="h-5 w-px bg-border" />
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {sortOptions.map((sort) => (
                <Badge
                  key={sort}
                  variant={activeSort === sort ? "default" : "secondary"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setActiveSort(sort)}
                >
                  {sort}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              size="icon-sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "ghost"} 
              size="icon-sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="px-4 py-2 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{products.length}</span> products
        </div>

        {/* Product Grid */}
        <div className={cn(
          "px-4 pb-6",
          viewMode === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"
        )}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product}
              className={viewMode === "list" ? "flex-row" : ""}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
