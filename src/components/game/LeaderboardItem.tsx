import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LeaderboardItemProps {
  rank: number;
  previousRank?: number;
  user: {
    id: string;
    name: string;
    avatar: string;
    level: string;
  };
  coins: number;
  isCurrentUser?: boolean;
  className?: string;
}

function getRankStyle(rank: number) {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700";
    case 3:
      return "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100";
    default:
      return "bg-secondary text-secondary-foreground";
  }
}

export function LeaderboardItem({
  rank,
  previousRank,
  user,
  coins,
  isCurrentUser = false,
  className,
}: LeaderboardItemProps) {
  const rankChange = previousRank ? previousRank - rank : 0;

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
      isCurrentUser ? "bg-primary/10 border border-primary/20" : "hover:bg-secondary/50",
      className
    )}>
      {/* Rank */}
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
        getRankStyle(rank)
      )}>
        {rank <= 3 ? (
          <Trophy className="w-4 h-4" />
        ) : rank}
      </div>

      {/* User */}
      <Avatar className="w-10 h-10 border-2 border-border">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-semibold text-sm truncate",
            isCurrentUser && "text-primary"
          )}>
            {user.name}
          </span>
          {isCurrentUser && (
            <Badge variant="outline" className="text-[10px]">You</Badge>
          )}
        </div>
        <Badge variant="level" className="text-[10px] mt-0.5">
          {user.level}
        </Badge>
      </div>

      {/* Coins & Change */}
      <div className="flex flex-col items-end gap-0.5">
        <span className="font-bold text-sm text-coin">{coins.toLocaleString()}</span>
        {rankChange !== 0 && (
          <div className={cn(
            "flex items-center gap-0.5 text-[10px] font-medium",
            rankChange > 0 ? "text-success" : "text-destructive"
          )}>
            {rankChange > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{Math.abs(rankChange)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
