import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: ({
    variant?: "default" | "outline" | "secondary" | "error" | "success" | "warning" | "info" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface CBREBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function CBREBadge({ className, variant, size, ...props }: CBREBadgeProps): React.JSX.Element;
export { CBREBadge, badgeVariants };
