import { Heart, MessageCircle, Share2, MoreHorizontal, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PostCardProps {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  images?: string[];
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  isLiked?: boolean;
  productTag?: {
    id: string;
    name: string;
    price: number;
  };
  className?: string;
}

export function PostCard({
  id,
  author,
  content,
  images,
  video,
  likes,
  comments,
  shares,
  timeAgo,
  isLiked = false,
  productTag,
  className,
}: PostCardProps) {
  return (
    <article className={cn("bg-card border-b border-border/50", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/user/${author.id}`} className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{author.name}</span>
              {author.isVerified && (
                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
        </Link>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>

      {/* Media */}
      {(images?.length || video) && (
        <div className="relative">
          {video ? (
            <div className="relative aspect-[4/5] bg-secondary">
              <video 
                src={video}
                className="w-full h-full object-cover"
                poster={images?.[0]}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary fill-primary" />
                </div>
              </div>
            </div>
          ) : images && images.length === 1 ? (
            <img src={images[0]} alt="" className="w-full aspect-square object-cover" />
          ) : images && (
            <div className="grid grid-cols-2 gap-0.5">
              {images.slice(0, 4).map((img, i) => (
                <div key={i} className="relative aspect-square">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {i === 3 && images.length > 4 && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <span className="text-2xl font-bold">+{images.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Product Tag */}
          {productTag && (
            <Link 
              to={`/product/${productTag.id}`}
              className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-border/50 shadow-medium"
            >
              <div>
                <p className="text-sm font-medium line-clamp-1">{productTag.name}</p>
                <p className="text-primary font-bold">৳{productTag.price.toLocaleString()}</p>
              </div>
              <Badge variant="default" className="text-xs">View</Badge>
            </Link>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 group">
            <Heart className={cn(
              "w-6 h-6 transition-all duration-200 group-active:scale-125",
              isLiked ? "fill-destructive text-destructive" : "group-hover:text-destructive"
            )} />
            <span className="text-sm font-medium">{likes}</span>
          </button>
          <Link to={`/community/post/${id}`} className="flex items-center gap-1.5 group">
            <MessageCircle className="w-6 h-6 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">{comments}</span>
          </Link>
          <button className="flex items-center gap-1.5 group">
            <Share2 className="w-6 h-6 group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium">{shares}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
