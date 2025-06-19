"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

type ButtonVariant = "primary" | "outline" | "accent" | "text" | "action" | "view-more";

interface CBREButtonProps extends Omit<React.ComponentProps<typeof Button>, 'variant'> {
  variant?: ButtonVariant;
}

/**
 * CBREButton - A button component styled according to CBRE brand guidelines
 * 
 * This component demonstrates proper theming and styling for CBRE branded buttons
 * using shadcn/ui Button component as a foundation.
 */
export function CBREButton({
  className,
  variant = "primary",
  children,
  onClick,
  ...props
}: CBREButtonProps) {
  // Special case for text variant - render as a span to avoid button styling
  if (variant === "text") {
    return (
      <span 
        onClick={onClick}
        className={cn(
          "cursor-pointer inline-block text-[#003F2D] underline decoration-[#003F2D] underline-offset-4 hover:decoration-[#17E88F] transition-colors duration-300",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
  
  // Map CBRE-specific variants to shadcn/ui variants with appropriate styling
  const getButtonStyles = () => {
    switch (variant) {
      case "primary":
        return cn("bg-[#003F2D] text-white hover:bg-[#17E88F] hover:text-[#003F2D] transition-colors duration-300 font-medium", className);
      case "outline":
        return cn(
          "border border-cbre-green text-cbre-green", 
          "hover:bg-[rgba(230,232,233,0.2)] hover:border-cbre-green", 
          "transition-colors duration-300",
          className
        );
      case "accent":
        return cn("bg-[#17E88F] text-[#003F2D] hover:bg-[#003F2D] hover:text-white transition-colors duration-300 font-medium", className);
      case "action":
        return cn("bg-[#538184] text-white hover:bg-[#96B3B6] hover:text-[#012A2D] transition-colors duration-300 px-6 py-2 font-medium text-sm", className);
      case "view-more":
        // Fixed styling to match the design exactly - using actual hex values for reliability
        return cn("bg-[#012A2D] text-white hover:bg-[#17E88F] hover:text-[#003F2D] transition-colors duration-300 font-calibre font-medium px-6 py-2.5", className);
      default:
        return className;
    }
  };

  // Map to shadcn/ui variants
  const getShadcnVariant = () => {
    switch (variant) {
      case "primary":
        return "default";
      case "outline":
        return "outline";
      case "accent":
      case "action":
      case "view-more":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Button
      className={getButtonStyles()}
      variant={getShadcnVariant() as VariantProps<typeof buttonVariants>["variant"]}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
} 