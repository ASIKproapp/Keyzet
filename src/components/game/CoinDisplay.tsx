import { Coins, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoinDisplayProps {
  coins: number;
  size?: "sm" | "md" | "lg";
  showAnimation?: boolean;
  className?: string;
}

export function CoinDisplay({ coins, size = "md", showAnimation = false, className }: CoinDisplayProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-20 h-20 text-4xl",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "relative rounded-full gradient-gold flex items-center justify-center shadow-gold",
        showAnimation && "coin-shine float",
        sizeClasses[size]
      )}>
        <Coins className={cn(
          "text-accent-foreground",
          size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-10 h-10"
        )} />
        {showAnimation && (
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-coin animate-pulse" />
        )}
      </div>
      <div className="flex flex-col">
        <span className={cn("font-display font-bold text-gradient-gold", textSizes[size])}>
          {coins.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground">Total Coins</span>
      </div>
    </div>
  );
}
