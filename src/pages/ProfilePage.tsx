import { useState } from "react";
import { Settings, Edit, Share2, ShoppingBag, Heart, MessageCircle, Grid, Bookmark, Award, ChevronRight, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "posts", label: "Posts", icon: Grid },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "saved", label: "Saved", icon: Bookmark },
];

const stats = [
  { label: "Posts", value: 24 },
  { label: "Followers", value: "1.2K" },
  { label: "Following", value: 156 },
];

const badges = [
  { name: "Early Bird", icon: "🐦", description: "Joined in 2023" },
  { name: "Top Reviewer", icon: "⭐", description: "50+ reviews" },
  { name: "Shopaholic", icon: "🛍️", description: "20+ orders" },
  { name: "Influencer", icon: "📸", description: "1K+ followers" },
];

const recentOrders = [
  { id: "1", name: "Banarasi Silk Saree", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200", status: "Delivered", date: "Dec 15" },
  { id: "2", name: "Designer Kurti Set", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200", status: "In Transit", date: "Dec 18" },
];

const menuItems = [
  { icon: ShoppingBag, label: "My Orders", href: "/orders", badge: "2" },
  { icon: Heart, label: "Wishlist", href: "/wishlist", badge: "12" },
  { icon: Award, label: "My Rewards", href: "/game/rewards" },
  { icon: MessageCircle, label: "Support", href: "/support/chat" },
  { icon: Settings, label: "Settings", href: "/profile/settings" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");

  const user = {
    name: "Anika Rahman",
    username: "@anika_style",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    bio: "Fashion enthusiast 💃 | Saree lover | Sharing my style journey ✨",
    level: "Gold",
    coins: 2450,
    levelProgress: 65,
    isVerified: true,
  };

  return (
    <AppLayout showCoins={false}>
      {/* Profile Header */}
      <div className="relative">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-br from-primary/20 to-primary/5" />

        {/* Profile Info */}
        <div className="px-4 pb-4">
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <Avatar className="w-24 h-24 border-4 border-background shadow-large">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex justify-end gap-2 pb-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile/edit">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Link>
              </Button>
              <Button variant="ghost" size="icon-sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl">{user.name}</h1>
              {user.isVerified && (
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{user.username}</p>
            <p className="text-sm mt-2">{user.bio}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-around py-3 rounded-xl bg-secondary/50 mb-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className={cn(
                "flex flex-col items-center",
                i !== stats.length - 1 && "border-r border-border pr-6"
              )}>
                <span className="font-display font-bold text-lg">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Level & Coins Card */}
          <Link to="/game" className="block p-4 rounded-xl gradient-gold mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-background/90">{user.level} Member</Badge>
              </div>
              <div className="flex items-center gap-1 bg-background/90 rounded-full px-2.5 py-1">
                <span className="text-sm font-bold">{user.coins.toLocaleString()}</span>
                <span className="text-xs">coins</span>
              </div>
            </div>
            <Progress value={user.levelProgress} className="h-2 bg-background/30 [&>div]:bg-background" />
            <p className="text-xs mt-1.5 text-accent-foreground/80">
              {user.levelProgress}% to Platinum
            </p>
          </Link>

          {/* Badges */}
          <div className="mb-4">
            <h3 className="font-semibold text-sm mb-2">Badges</h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
              {badges.map((badge) => (
                <div key={badge.name} className="min-w-[80px] flex flex-col items-center gap-1 p-2 rounded-xl bg-secondary/50 text-center">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-[10px] font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="px-4 pb-4">
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          {menuItems.map((item, i) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors",
                i !== menuItems.length - 1 && "border-b border-border/50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Recent Orders</h3>
          <Link to="/orders" className="text-sm text-primary">View All</Link>
        </div>
        <div className="space-y-2">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              to={`/order/${order.id}/tracking`}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-soft transition-shadow"
            >
              <img src={order.image} alt={order.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{order.name}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <Badge variant={order.status === "Delivered" ? "success" : "secondary"} className="text-xs">
                {order.status}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Tabs for Posts/Orders/Wishlist */}
      <div className="border-t border-border/50">
        <div className="flex border-b border-border/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-all border-b-2",
                activeTab === tab.id 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "posts" && (
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-secondary rounded-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-161003046998${i}-98e550d6193c?w=200&h=200&fit=crop`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          {activeTab === "orders" && (
            <p className="text-center text-muted-foreground py-8">View all your orders</p>
          )}
          {activeTab === "wishlist" && (
            <p className="text-center text-muted-foreground py-8">Your wishlist is empty</p>
          )}
          {activeTab === "saved" && (
            <p className="text-center text-muted-foreground py-8">No saved posts yet</p>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>
    </AppLayout>
  );
}
