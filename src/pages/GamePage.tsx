import { Coins, Trophy, Target, Gift, ChevronRight, Sparkles, Crown, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { CoinDisplay } from "@/components/game/CoinDisplay";
import { LeaderboardItem } from "@/components/game/LeaderboardItem";
import { ChallengeCard } from "@/components/game/ChallengeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const leaderboard = [
  { rank: 1, user: { id: "1", name: "Fashion Queen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", level: "Diamond" }, coins: 15420, previousRank: 1 },
  { rank: 2, user: { id: "2", name: "Style Master", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", level: "Platinum" }, coins: 12890, previousRank: 3 },
  { rank: 3, user: { id: "3", name: "Trendsetter", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", level: "Platinum" }, coins: 11250, previousRank: 2 },
  { rank: 4, user: { id: "current", name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", level: "Gold" }, coins: 2450, previousRank: 6, isCurrentUser: true },
];

const challenges = [
  { id: "1", title: "First Purchase", description: "Make your first purchase this week", type: "weekly" as const, reward: 100, progress: 0, total: 1, expiresIn: "5 days", icon: "gift" as const },
  { id: "2", title: "Social Butterfly", description: "Like 5 community posts", type: "daily" as const, reward: 25, progress: 3, total: 5, expiresIn: "8 hours", icon: "target" as const },
  { id: "3", title: "Review Star", description: "Write a product review", type: "daily" as const, reward: 50, progress: 1, total: 1, icon: "coins" as const },
  { id: "4", title: "Flash Challenge", description: "Shop during flash sale", type: "special" as const, reward: 200, progress: 0, total: 1, expiresIn: "2 hours", icon: "gift" as const },
];

export default function GamePage() {
  const userCoins = 2450;
  const userLevel = "Gold";
  const nextLevel = "Platinum";
  const levelProgress = 65;
  const coinsToNextLevel = 2550;

  return (
    <AppLayout title="Game Center">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative px-4 py-6">
          {/* Level Progress Card */}
          <div className="bg-card rounded-3xl p-5 border border-border/50 shadow-large mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-5 h-5 text-coin" />
                  <Badge variant="gold">{userLevel} Member</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {coinsToNextLevel.toLocaleString()} coins to {nextLevel}
                </p>
              </div>
              <CoinDisplay coins={userCoins} size="sm" showAnimation />
            </div>

            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{userLevel}</span>
                <span className="text-muted-foreground">{nextLevel}</span>
              </div>
              <Progress value={levelProgress} className="h-3" />
              <p className="text-xs text-muted-foreground text-center">
                {levelProgress}% to next level
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Link to="/game/coins" className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <Coins className="w-5 h-5 text-coin" />
                <span className="text-xs font-medium">Coins</span>
              </Link>
              <Link to="/game/leaderboard" className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium">Rank #4</span>
              </Link>
              <Link to="/game/rewards" className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <Gift className="w-5 h-5 text-success" />
                <span className="text-xs font-medium">Rewards</span>
              </Link>
            </div>
          </div>

          {/* Daily Spin Banner */}
          <Link to="/game/spin" className="block relative overflow-hidden rounded-2xl gradient-primary p-5 mb-6 shadow-glow">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
                <Badge variant="glass" className="text-primary-foreground border-primary-foreground/30">FREE</Badge>
              </div>
              <h3 className="font-display font-bold text-xl text-primary-foreground mb-1">
                Daily Spin
              </h3>
              <p className="text-sm text-primary-foreground/80 mb-3">
                Win up to 500 coins every day!
              </p>
              <Button variant="glass" size="sm" className="text-primary-foreground border-primary-foreground/30">
                Spin Now
              </Button>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-4 border-primary-foreground/20 flex items-center justify-center animate-spin-slow">
              <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center backdrop-blur-sm">
                <span className="text-4xl">🎰</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Challenges</h2>
          </div>
          <Link to="/game/challenges" className="text-sm text-primary font-medium flex items-center">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg">Top Players</h2>
          </div>
          <Link to="/game/leaderboard" className="text-sm text-primary font-medium flex items-center">
            Full Board <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          {leaderboard.map((item, index) => (
            <LeaderboardItem 
              key={item.user.id} 
              {...item}
              isCurrentUser={item.user.id === "current"}
              className={index !== leaderboard.length - 1 ? "border-b border-border/50" : ""}
            />
          ))}
        </div>
      </section>

      {/* How to Earn */}
      <section className="px-4 pb-6">
        <Link to="/game/rules" className="block bg-secondary/50 rounded-2xl p-4">
          <h3 className="font-semibold mb-3">How to Earn Coins</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coin/10 flex items-center justify-center">
                <span className="text-base">🛍️</span>
              </div>
              <span>Shop & Earn</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coin/10 flex items-center justify-center">
                <span className="text-base">📝</span>
              </div>
              <span>Write Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coin/10 flex items-center justify-center">
                <span className="text-base">❤️</span>
              </div>
              <span>Like & Share</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coin/10 flex items-center justify-center">
                <span className="text-base">👥</span>
              </div>
              <span>Refer Friends</span>
            </div>
          </div>
        </Link>
      </section>
    </AppLayout>
  );
}
