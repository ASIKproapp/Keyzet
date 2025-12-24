import { useState } from "react";
import { Grid, List, SlidersHorizontal, Loader2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useProducts, useCategories } from "@/hooks/useProducts";

const sortOptions = ["Popular", "Newest", "Price: Low", "Price: High"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts(activeCategory);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (activeSort) {
      case "Newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "Price: Low":
        return a.price - b.price;
      case "Price: High":
        return b.price - a.price;
      default:
        return b.is_featured ? 1 : -1;
    }
  });

  // Filter by category
  const filteredProducts = activeCategory === "all" 
    ? sortedProducts 
    : sortedProducts.filter(p => p.categories?.slug === activeCategory);

  return (
    <AppLayout title="Shop">
      <div className="flex flex-col">
        {/* Categories Scroll */}
        <div className="sticky top-14 z-30 bg-background border-b border-border/50 py-3">
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
            {/* All Category */}
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "flex flex-col items-center gap-1.5 min-w-[60px] transition-all",
                activeCategory === "all" ? "opacity-100" : "opacity-60 hover:opacity-80"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-xl overflow-hidden border-2 transition-all bg-secondary flex items-center justify-center",
                activeCategory === "all" ? "border-primary shadow-glow" : "border-transparent"
              )}>
                <span className="text-lg font-bold">All</span>
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                activeCategory === "all" && "text-primary font-semibold"
              )}>All</span>
            </button>

            {categoriesLoading ? (
              <div className="flex items-center justify-center w-14 h-14">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 min-w-[60px] transition-all",
                    activeCategory === cat.slug ? "opacity-100" : "opacity-60 hover:opacity-80"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl overflow-hidden border-2 transition-all",
                    activeCategory === cat.slug ? "border-primary shadow-glow" : "border-transparent"
                  )}>
                    <img 
                      src={cat.image_url || "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200"} 
                      alt={cat.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium",
                    activeCategory === cat.slug && "text-primary font-semibold"
                  )}>{cat.name}</span>
                </button>
              ))
            )}
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
          Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
        </div>

        {/* Product Grid */}
        {productsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
          <div className={cn(
            "px-4 pb-6",
            viewMode === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"
          )}>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.original_price || undefined}
                image={product.image_url || "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400"}
                rating={4.5}
                reviews={Math.floor(Math.random() * 200) + 50}
                badge={product.is_featured ? "trending" : product.original_price ? "sale" : undefined}
                coins={Math.floor(product.price / 10)}
                className={viewMode === "list" ? "flex-row" : ""}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
