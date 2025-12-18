import { Coins, Gift, Target, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "special";
  reward: number;
  progress: number;
  total: number;
  expiresIn?: string;
  icon?: "coins" | "gift" | "target";
  className?: string;
}

const iconMap = {
  coins: Coins,
  gift: Gift,
  target: Target,
};

export function ChallengeCard({
  id,
  title,
  description,
  type,
  reward,
  progress,
  total,
  expiresIn,
  icon = "target",
  className,
}: ChallengeCardProps) {
  const Icon = iconMap[icon];
  const isComplete = progress >= total;
  const progressPercent = Math.min((progress / total) * 100, 100);

  return (
    <Link
      to={`/game/challenges/${id}`}
      className={cn(
        "block p-4 rounded-2xl border border-border/50 bg-card transition-all duration-200 hover:shadow-medium hover:-translate-y-0.5",
        isComplete && "bg-success/5 border-success/20",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          isComplete ? "bg-success/10" : "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            isComplete ? "text-success" : "text-primary"
          )} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{title}</h3>
                <Badge 
                  variant={type === "special" ? "gold" : type === "weekly" ? "secondary" : "outline"}
                  className="text-[10px]"
                >
                  {type}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {description}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </div>

          {/* Progress */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {progress}/{total} {isComplete ? "Complete!" : ""}
              </span>
              <span className="font-semibold text-coin">+{reward} coins</span>
            </div>
            <Progress 
              value={progressPercent} 
              className={cn(
                "h-2",
                isComplete && "[&>div]:bg-success"
              )}
            />
            {expiresIn && !isComplete && (
              <p className="text-[10px] text-muted-foreground">
                Expires in {expiresIn}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
