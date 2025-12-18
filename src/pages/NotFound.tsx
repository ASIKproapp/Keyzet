import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-[120px] font-display font-bold text-primary/20 leading-none mb-4">404</div>
        <h1 className="font-display text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="primary" size="lg" asChild>
            <Link to="/"><Home className="w-5 h-5 mr-2" />Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
