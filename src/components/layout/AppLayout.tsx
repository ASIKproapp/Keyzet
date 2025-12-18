import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showNav?: boolean;
  showSearch?: boolean;
  showCoins?: boolean;
  coins?: number;
}

export function AppLayout({ 
  children, 
  title,
  showHeader = true, 
  showNav = true,
  showSearch = true,
  showCoins = true,
  coins = 2450
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <Header 
          title={title} 
          showSearch={showSearch} 
          showCoins={showCoins}
          coins={coins}
        />
      )}
      <main className={showNav ? "pb-nav" : ""}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
