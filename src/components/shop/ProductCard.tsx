import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: "new" | "sale" | "trending";
  coins?: number;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  badge,
  coins,
  className,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link 
      to={`/product/${id}`}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-medium hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {badge && (
            <Badge variant={badge} className="text-[10px]">
              {badge === "sale" ? `-${discount}%` : badge.toUpperCase()}
            </Badge>
          )}
          {coins && (
            <Badge variant="gold" className="text-[10px]">
              +{coins} coins
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button 
          variant="glass" 
          size="icon-sm" 
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            // Handle wishlist
          }}
        >
          <Heart className="w-4 h-4" />
        </Button>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full text-xs"
            onClick={(e) => {
              e.preventDefault();
              // Handle add to cart
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-3">
        <h3 className="text-sm font-medium line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-coin text-coin" />
          <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold text-primary">৳{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">৳{originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
