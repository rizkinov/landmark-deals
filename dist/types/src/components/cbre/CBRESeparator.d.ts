import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
interface CBRESeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
    variant?: "default" | "thin" | "thick" | "accent";
    className?: string;
    color?: "cbre-green" | "accent-green" | "dark-green" | "midnight" | "sage" | "celadon" | "wheat" | "negative-red";
    style?: React.CSSProperties;
}
/**
 * CBRESeparator - A styled separator component following CBRE design
 *
 * Features:
 * - CBRE styling with customizable colors and thickness
 * - Supports both horizontal and vertical orientations
 * - Multiple variants: default, thin, thick, and accent
 */
declare function CBRESeparator({ className, orientation, decorative, variant, color, style, ...props }: CBRESeparatorProps): React.JSX.Element;
export { CBRESeparator };
export { CBRESeparator as Separator };
