import { useState } from "react";
import { ArrowLeft, Search as SearchIcon, X, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trendingSearches = [
  "Banarasi Saree",
  "Designer Kurti",
  "Wedding Lehenga",
  "Party Wear",
  "Cotton Palazzo",
  "Silk Dress",
];

const recentSearches = [
  "Red saree",
  "Anarkali suit",
  "Bridal lehenga",
];

const searchResults = [
  { id: "1", name: "Banarasi Silk Saree with Golden Zari Work", price: 3499, originalPrice: 5999, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=600&fit=crop", rating: 4.8, reviews: 234, badge: "sale" as const, coins: 35 },
  { id: "2", name: "Designer Anarkali Kurti Set", price: 1899, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop", rating: 4.6, reviews: 156, badge: "trending" as const, coins: 19 },
  { id: "3", name: "Embroidered Lehenga Choli", price: 7999, originalPrice: 12999, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=600&fit=crop", rating: 4.9, reviews: 89, badge: "new" as const, coins: 80 },
  { id: "4", name: "Floral Print Maxi Dress", price: 1299, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop", rating: 4.5, reviews: 312, coins: 13 },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsSearching(true);
  };

  return (
    <AppLayout showHeader={false} showNav={false}>
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border/50 safe-top">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              placeholder="Search products, brands..."
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-secondary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {query && (
              <button 
                onClick={() => {
                  setQuery("");
                  setIsSearching(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {!isSearching ? (
        <div className="p-4 space-y-6">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h3>
                <button className="text-xs text-primary">Clear All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-secondary/80 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              Trending Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* Search Results */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing results for "<span className="text-foreground font-medium">{query}</span>"
            </p>
            <Badge variant="secondary">{searchResults.length} items</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {searchResults.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
