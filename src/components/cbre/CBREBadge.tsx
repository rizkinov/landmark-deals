import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--cbre-green)] text-white hover:bg-[var(--cbre-green)]/80",
        success: "border-transparent bg-[var(--accent-green)] text-[var(--dark-green)] hover:bg-[var(--accent-green)]/80",
        warning: "border-transparent bg-[var(--wheat)] text-[var(--dark-grey)] hover:bg-[var(--wheat)]/80",
        error: "border-transparent bg-[var(--negative-red)] text-white hover:bg-[var(--negative-red)]/80",
        info: "border-transparent bg-[var(--celadon)] text-[var(--dark-grey)] hover:bg-[var(--celadon)]/80",
        outline: "border-[var(--cbre-green)] text-[var(--cbre-green)] hover:bg-[var(--cbre-green)]/10",
        secondary: "border-transparent bg-[var(--lighter-grey)] text-[var(--dark-grey)] hover:bg-[var(--lighter-grey)]/80",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-1",
        lg: "text-base px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface CBREBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function CBREBadge({ className, variant, size, ...props }: CBREBadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { CBREBadge, badgeVariants }; 