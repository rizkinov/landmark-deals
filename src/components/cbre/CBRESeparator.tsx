"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

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
function CBRESeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "default",
  color,
  style,
  ...props
}: CBRESeparatorProps) {
  // Define variant classes
  const variantClasses = {
    default: "!bg-cbre-green",
    thin: "!bg-cbre-green data-[orientation=horizontal]:!h-[1px] data-[orientation=vertical]:!w-[1px]",
    thick: "!bg-cbre-green data-[orientation=horizontal]:!h-[3px] data-[orientation=vertical]:!w-[3px]",
    accent: "!bg-accent-green data-[orientation=horizontal]:!h-[2px] data-[orientation=vertical]:!w-[2px]",
  };

  // Color mapping to actual color values
  const colorValues = {
    "cbre-green": "#003F2D",
    "accent-green": "#17E88F",
    "dark-green": "#00241A",
    "midnight": "#242424",
    "sage": "#CDD6C6",
    "celadon": "#8FCDB3",
    "wheat": "#FDE9B3",
    "negative-red": "#AD2A2A"
  };

  // Color classes
  const colorClass = color ? `!bg-${color}` : "";

  // Combine variant and color - color should override variant bg
  const bgClass = color ? colorClass : variantClasses[variant];

  // Calculate final styles - ensure they override any other styles
  const finalStyles = {
    ...(style || {}),
    // Apply direct color value if available
    ...(color && colorValues[color] ? { backgroundColor: `${colorValues[color]} !important` } : {}),
    // Add specific styles for vertical orientation if not already defined
    ...(orientation === 'vertical' && !style?.marginLeft && !style?.marginRight ? {
      marginLeft: '16px !important',
      marginRight: '16px !important'
    } : {})
  };

  // React hook to handle component mount
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      data-variant={variant}
      data-color={color}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 data-[orientation=horizontal]:!h-[2px] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:!w-[2px]",
        "block min-h-[2px] min-w-[2px]",
        orientation === 'horizontal' ? "my-4" : "mx-4",
        orientation === 'vertical' ? "!mx-8" : "",
        bgClass,
        variant,
        className
      )}
      style={finalStyles}
      {...props}
    />
  )
}

export { CBRESeparator }

// Re-export with alias for convenience
export { CBRESeparator as Separator } 