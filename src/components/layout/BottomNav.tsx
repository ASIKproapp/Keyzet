import { Home, ShoppingBag, Gamepad2, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ShoppingBag, label: "Shop", path: "/shop" },
  { icon: Gamepad2, label: "Game", path: "/game" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 safe-bottom">
      <div className="flex items-center justify-around h-nav max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/" && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-xl transition-all duration-200",
                "hover:bg-secondary/50 active:scale-95",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all duration-300",
                isActive && "bg-primary/10"
              )}>
                <item.icon className={cn(
                  "w-5 h-5 transition-all duration-200",
                  isActive && "scale-110"
                )} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all duration-200",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
