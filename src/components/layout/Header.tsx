import { Bell, Search, MessageCircle, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showCoins?: boolean;
  coins?: number;
}

export function Header({ title = "StyleVerse", showSearch = true, showCoins = true, coins = 2450 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50 safe-top">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {/* Logo/Title */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-display font-bold text-sm">S</span>
          </div>
          <span className="font-display font-bold text-lg">{title}</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {showCoins && (
            <Link to="/game/coins">
              <Badge variant="coin" className="h-7 px-2.5 gap-1.5 hover:shadow-gold transition-shadow cursor-pointer">
                <Coins className="w-3.5 h-3.5" />
                <span className="font-bold">{coins.toLocaleString()}</span>
              </Badge>
            </Link>
          )}
          
          {showSearch && (
            <Button variant="ghost" size="icon-sm" asChild>
              <Link to="/search">
                <Search className="w-5 h-5" />
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon-sm" className="relative" asChild>
            <Link to="/inbox">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon-sm" className="relative" asChild>
            <Link to="/notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
