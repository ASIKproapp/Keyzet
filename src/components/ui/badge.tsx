import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success text-success-foreground",
        gold: "border-transparent gradient-gold text-accent-foreground shadow-gold",
        coin: "border-transparent bg-coin text-accent-foreground gap-1",
        level: "border-transparent bg-secondary text-secondary-foreground font-bold",
        bronze: "border-transparent bg-level-bronze text-primary-foreground",
        silver: "border-transparent bg-level-silver text-foreground",
        platinum: "border-transparent bg-level-platinum text-foreground",
        diamond: "border-transparent bg-level-diamond text-foreground",
        new: "border-transparent gradient-primary text-primary-foreground animate-pulse",
        sale: "border-transparent bg-destructive text-destructive-foreground",
        trending: "border-transparent bg-primary/10 text-primary",
        glass: "bg-background/10 backdrop-blur-sm border-border/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
