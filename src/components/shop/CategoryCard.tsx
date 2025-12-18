import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  image: string;
  productCount?: number;
  href: string;
  className?: string;
}

export function CategoryCard({ name, image, productCount, href, className }: CategoryCardProps) {
  return (
    <a 
      href={href}
      className={cn(
        "group relative flex flex-col items-center gap-2 min-w-[72px]",
        className
      )}
    >
      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-secondary border-2 border-border/50 transition-all duration-300 group-hover:border-primary group-hover:shadow-medium">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-xs font-medium text-center leading-tight line-clamp-2 group-hover:text-primary transition-colors">
        {name}
      </span>
    </a>
  );
}
