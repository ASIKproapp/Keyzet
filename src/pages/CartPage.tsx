import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, Ticket, ChevronRight, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  quantity: number;
  coins: number;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Banarasi Silk Saree with Golden Zari Work",
    price: 3499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
    color: "Red",
    quantity: 1,
    coins: 35,
  },
  {
    id: "2",
    name: "Designer Anarkali Kurti Set",
    price: 1899,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300",
    color: "Blue",
    quantity: 2,
    coins: 19,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCoins = cartItems.reduce((sum, item) => sum + item.coins * item.quantity, 0);
  const delivery = 99;
  const discount = 500;
  const total = subtotal + delivery - discount;

  return (
    <AppLayout showHeader={false} showNav={false}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border/50 safe-top">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link to="/shop">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="font-display font-bold text-lg flex-1">Shopping Cart</h1>
          <Badge variant="secondary">{cartItems.length} items</Badge>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button variant="primary" asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-card border border-border/50">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">Color: {item.color}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary">৳{item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">৳{item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <Badge variant="gold" className="mt-1 text-[10px]">
                    <Coins className="w-3 h-3" />
                    +{item.coins * item.quantity}
                  </Badge>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-background rounded"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-background rounded"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary border-none text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-card border-t border-border/50">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>৳{delivery}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-৳{discount}</span>
              </div>
              <div className="flex justify-between text-coin">
                <span>Coins Earned</span>
                <span>+{totalCoins} coins</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="p-4 safe-bottom">
            <Button variant="primary" size="xl" className="w-full" asChild>
              <Link to="/checkout">
                Proceed to Checkout
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </AppLayout>
  );
}
