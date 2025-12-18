import { useState } from "react";
import { Plus, Image, Video, TrendingUp, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PostCard } from "@/components/community/PostCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "for-you", label: "For You", icon: TrendingUp },
  { id: "following", label: "Following", icon: Users },
  { id: "latest", label: "Latest", icon: Clock },
];

const posts = [
  {
    id: "1",
    author: { id: "user1", name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", isVerified: true },
    content: "Just received my order! The quality is absolutely amazing 😍 Wearing this saree to my cousin's wedding!",
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"],
    likes: 234,
    comments: 45,
    shares: 12,
    timeAgo: "2 hours ago",
    isLiked: true,
    productTag: { id: "1", name: "Banarasi Silk Saree", price: 3499 },
  },
  {
    id: "2",
    author: { id: "user2", name: "Riya Fashion", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", isVerified: true },
    content: "New arrivals alert! 🚨 Check out our latest collection of designer kurtis. Perfect for office wear and casual outings!",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
    ],
    likes: 567,
    comments: 89,
    shares: 34,
    timeAgo: "4 hours ago",
  },
  {
    id: "3",
    author: { id: "user3", name: "Sneha Roy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    content: "Wedding shopping done ✅ Got this beautiful lehenga at such an amazing price. Thank you StyleVerse for the amazing discount! 💃",
    images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop"],
    likes: 189,
    comments: 23,
    shares: 8,
    timeAgo: "6 hours ago",
    productTag: { id: "3", name: "Designer Lehenga", price: 7999 },
  },
  {
    id: "4",
    author: { id: "user4", name: "Style Tips", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", isVerified: true },
    content: "How to style a single kurta in 5 different ways! Save this for later 📌\n\n1. With palazzo pants\n2. With jeans\n3. As a dress\n4. With dhoti pants\n5. With a skirt",
    video: "https://example.com/video.mp4",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop"],
    likes: 1234,
    comments: 156,
    shares: 89,
    timeAgo: "8 hours ago",
  },
];

const suggestedUsers = [
  { id: "1", name: "Fashion Weekly", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", followers: "12.5K" },
  { id: "2", name: "Style Guide", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", followers: "8.2K" },
  { id: "3", name: "Trend Alert", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", followers: "5.1K" },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <AppLayout title="Community">
      {/* Stories/Highlights */}
      <div className="border-b border-border/50 py-3">
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
          {/* Create Story */}
          <button className="flex flex-col items-center gap-1.5 min-w-[72px]">
            <div className="w-16 h-16 rounded-full bg-secondary border-2 border-dashed border-primary flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <span className="text-[10px] font-medium">Your Story</span>
          </button>

          {/* Stories */}
          {suggestedUsers.map((user) => (
            <button key={user.id} className="flex flex-col items-center gap-1.5 min-w-[72px]">
              <div className="w-16 h-16 rounded-full p-0.5 gradient-primary">
                <Avatar className="w-full h-full border-2 border-background">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-[10px] font-medium truncate max-w-[72px]">{user.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 z-30 bg-background border-b border-border/50">
        <div className="flex">
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
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Link 
            to="/community/post/create"
            className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary/80 transition-colors"
          >
            Share your style...
          </Link>
          <Button variant="ghost" size="icon">
            <Image className="w-5 h-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5 text-primary" />
          </Button>
        </div>
      </div>

      {/* Suggested Users (For You Tab) */}
      {activeTab === "for-you" && (
        <div className="p-4 border-b border-border/50 bg-secondary/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Suggested for you</h3>
            <Link to="/discover" className="text-xs text-primary">See All</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="min-w-[140px] bg-card rounded-xl p-3 border border-border/50">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-12 h-12 mb-2">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm truncate w-full">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.followers} followers</span>
                  <Button variant="primary" size="sm" className="w-full mt-2 text-xs">
                    Follow
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {/* Floating Action Button */}
      <Link 
        to="/community/post/create"
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full gradient-primary shadow-glow flex items-center justify-center z-40 hover:scale-105 transition-transform"
      >
        <Plus className="w-6 h-6 text-primary-foreground" />
      </Link>
    </AppLayout>
  );
}
