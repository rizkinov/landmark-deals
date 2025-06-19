"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";

interface CBREToggleProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * CBREToggle - A styled toggle switch component following CBRE design
 * 
 * Features:
 * - CBRE green color for checked state
 * - Optional label and description
 * - Three size variants (sm, md, lg)
 */
export function CBREToggle({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  description,
  className,
  size = 'md'
}: CBREToggleProps) {
  // Size class mappings
  const sizeVariants = {
    sm: {
      root: "h-5 w-9",
      thumb: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5",
    },
    md: {
      root: "h-6 w-11",
      thumb: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
    },
    lg: {
      root: "h-7 w-14",
      thumb: "h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0.5",
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {(label || description) && (
        <div className="mr-4 flex flex-col justify-center">
          {label && <div className="text-base font-calibre font-medium text-dark-grey">{label}</div>}
          {description && <div className="text-sm font-calibre text-dark-grey/70">{description}</div>}
        </div>
      )}
      
      <SwitchPrimitives.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
          "border-none outline-none focus-visible:ring-2 focus-visible:ring-accent-green",
          "focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-[var(--cbre-green)] data-[state=unchecked]:bg-[var(--light-grey)]",
          sizeVariants[size].root
        )}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white",
            "shadow-md transition-transform",
            sizeVariants[size].thumb
          )}
        />
      </SwitchPrimitives.Root>
    </div>
  );
} 