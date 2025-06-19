"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CBREToggleGroupSingleProps {
  type: "single";
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

interface CBREToggleGroupMultipleProps {
  type: "multiple";
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

type CBREToggleGroupProps = CBREToggleGroupSingleProps | CBREToggleGroupMultipleProps;

/**
 * CBREToggleGroup - A styled toggle group component following CBRE design
 * 
 * Features:
 * - CBRE green color for active state
 * - Can be used in single or multiple selection mode
 * - Optional outline variant
 * - Three size variants (sm, md, lg)
 */
export function CBREToggleGroup(props: CBREToggleGroupProps) {
  return (
    <ToggleGroup
      type={props.type}
      value={props.value}
      onValueChange={props.onValueChange as any}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      className={cn(
        "inline-flex items-center justify-center gap-1",
        props.className
      )}
    >
      {props.children}
    </ToggleGroup>
  );
}

interface CBREToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

export function CBREToggleGroupItem({
  value,
  disabled,
  className,
  children,
  variant = "default",
  size = "md",
  ...props
}: CBREToggleGroupItemProps) {
  // Size variants
  const sizeClasses = {
    sm: "h-8 px-2.5 text-xs",
    md: "h-9 px-3",
    lg: "h-10 px-4"
  };

  // Variant styles
  const variantClasses = {
    default: cn(
      "bg-transparent data-[state=on]:bg-[var(--cbre-green)] data-[state=on]:text-white",
      "border border-light-grey data-[state=on]:border-[var(--cbre-green)]",
      "hover:bg-light-grey/20 data-[state=on]:hover:bg-[var(--cbre-green)]"
    ),
    outline: cn(
      "bg-transparent data-[state=on]:bg-transparent",
      "border border-light-grey data-[state=on]:border-[var(--cbre-green)]",
      "text-dark-grey data-[state=on]:text-[var(--cbre-green)]",
      "hover:bg-light-grey/20 data-[state=on]:hover:bg-transparent"
    )
  };

  return (
    <ToggleGroupItem
      value={value}
      disabled={disabled}
      className={cn(
        "rounded-none font-calibre font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent-green focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupItem>
  );
} 