import { useState } from "react";
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronDown, Play, Coins, MessageCircle, Plus, Minus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const product = {
  id: "1",
  name: "Banarasi Silk Saree with Golden Zari Work",
  price: 3499,
  originalPrice: 5999,
  coins: 35,
  rating: 4.8,
  reviews: 234,
  sold: 1250,
  images: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1200&fit=crop",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1200&fit=crop",
  ],
  colors: ["Red", "Blue", "Green", "Gold"],
  description: "Elegant Banarasi silk saree featuring intricate golden zari work. Perfect for weddings and festive occasions. Made with premium quality silk that offers both comfort and luxury.",
  seller: {
    name: "Royal Silks",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 4.9,
    products: 156,
  },
  features: [
    { icon: Truck, text: "Free Delivery" },
    { icon: Shield, text: "Quality Guaranteed" },
    { icon: RotateCcw, text: "7 Days Return" },
  ],
};

const reviews = [
  {
    id: "1",
    user: { name: "Priya S.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    rating: 5,
    date: "2 days ago",
    content: "Absolutely stunning saree! The quality exceeded my expectations. The zari work is so intricate and beautiful.",
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300"],
    helpful: 23,
  },
  {
    id: "2",
    user: { name: "Sneha R.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    rating: 4,
    date: "1 week ago",
    content: "Beautiful saree, great for the price. Delivery was fast too!",
    helpful: 12,
  },
];

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Red");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <AppLayout showHeader={false} showNav={false}>
      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-[3/4] bg-secondary overflow-hidden">
          <img 
            src={product.images[activeImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back & Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between safe-top">
          <Button variant="glass" size="icon" asChild>
            <Link to="/shop">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="glass" size="icon" onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-destructive text-destructive")} />
            </Button>
            <Button variant="glass" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Image Thumbnails */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={cn(
                "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all",
                activeImage === i ? "border-primary" : "border-transparent opacity-70"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          <Badge variant="sale">-{discount}% OFF</Badge>
          <Badge variant="gold" className="gap-1">
            <Coins className="w-3 h-3" />
            +{product.coins}
          </Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-background rounded-t-3xl -mt-6 relative z-10">
        <div className="p-4 space-y-4">
          {/* Title & Price */}
          <div>
            <h1 className="font-display font-bold text-xl leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-primary">৳{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-coin text-coin" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{product.sold.toLocaleString()} sold</span>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedColor === color 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon-sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon-sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="flex justify-around py-4 bg-secondary/50 rounded-xl">
            {product.features.map((feature) => (
              <div key={feature.text} className="flex flex-col items-center gap-1">
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Seller */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-border/50">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={product.seller.avatar} />
                <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{product.seller.name}</p>
                <p className="text-xs text-muted-foreground">
                  ⭐ {product.seller.rating} • {product.seller.products} products
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </Button>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Reviews ({product.reviews})</h3>
              <Link to={`/reviews/product/${productId}`} className="text-sm text-primary">View All</Link>
            </div>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={review.user.avatar} />
                      <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{review.user.name}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "w-3 h-3",
                              i < review.rating ? "fill-coin text-coin" : "text-muted"
                            )} 
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{review.content}</p>
                  {review.images && (
                    <div className="flex gap-2 mt-2">
                      {review.images.map((img, i) => (
                        <img key={i} src={img} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">{review.helpful} found this helpful</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 p-4 safe-bottom">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Button variant="outline" size="lg" className="flex-1">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat
          </Button>
          <Button variant="primary" size="lg" className="flex-[2]">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart • ৳{(product.price * quantity).toLocaleString()}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
