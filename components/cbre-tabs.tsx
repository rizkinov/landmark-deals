"use client";

import React, { createContext, useContext } from 'react';
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Create context for CBRE Tabs
interface CBRETabsContextProps {
  variant: "underline" | "boxed";
  size: "sm" | "md" | "lg";
}

const CBRETabsContext = createContext<CBRETabsContextProps>({
  variant: "underline",
  size: "md"
});

interface CBRETabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
  variant?: "underline" | "boxed";
  size?: "sm" | "md" | "lg";
}

/**
 * CBRETabs - A styled tabs component following CBRE design
 * 
 * Features:
 * - CBRE styling with cbre-green underline or boxed tabs
 * - Two variants: underline (default) and boxed
 * - Three size options
 */
export function CBRETabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  variant = "underline",
  size = "md",
  ...props
}: CBRETabsProps) {
  return (
    <CBRETabsContext.Provider value={{ variant, size }}>
      <Tabs 
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className={cn(
          "w-full",
          className
        )}
        {...props}
      >
        {children}
      </Tabs>
    </CBRETabsContext.Provider>
  );
}

interface CBRETabsListProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "underline" | "boxed";
  size?: "sm" | "md" | "lg";
}

export function CBRETabsList({
  className,
  children,
  variant: propVariant,
  size: propSize,
  ...props
}: CBRETabsListProps) {
  // Get context values, with prop values taking precedence
  const context = useContext(CBRETabsContext);
  const variant = propVariant || context.variant;
  const size = propSize || context.size;

  // Size classes
  const sizeClasses = {
    sm: "h-9 gap-2",
    md: "h-10 gap-3",
    lg: "h-12 gap-4",
  };

  // Variant classes
  const variantClasses = {
    underline: "border-b border-light-grey",
    boxed: "rounded-none",
  };

  return (
    <TabsList 
      data-variant={variant}
      className={cn(
        "w-full flex justify-start p-0 rounded-none relative",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </TabsList>
  );
}

interface CBRETabsTriggerProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "underline" | "boxed";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function CBRETabsTrigger({
  value,
  className,
  children,
  variant: propVariant,
  size: propSize,
  disabled,
  ...props
}: CBRETabsTriggerProps) {
  // Get context values, with prop values taking precedence
  const context = useContext(CBRETabsContext);
  const variant = propVariant || context.variant;
  const size = propSize || context.size;

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-2 text-lg",
  };

  // Variant styles for tabs - simplified to avoid conflicts with our global CSS
  const variantClasses = {
    underline: cn(
      "font-calibre font-medium",
      "data-[state=inactive]:text-dark-grey",
      "rounded-none hover:text-cbre-green"
    ),
    boxed: cn(
      "font-calibre font-medium",
      "data-[state=inactive]:text-dark-grey",
      "rounded-none hover:text-cbre-green"
    ),
  };

  return (
    <TabsTrigger
      value={value}
      disabled={disabled}
      data-variant={variant}
      className={cn(
        // Base styles
        "transition-all focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent-green focus-visible:ring-offset-2",
        "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        
        // Apply size and variant specific styles
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </TabsTrigger>
  );
}

interface CBRETabsContentProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export function CBRETabsContent({
  value,
  className,
  children,
  ...props
}: CBRETabsContentProps) {
  return (
    <TabsContent
      value={value}
      className={cn(
        "mt-6 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent-green focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </TabsContent>
  );
}

// Re-export with aliases for convenience
export {
  CBRETabs as Tabs,
  CBRETabsList as TabsList,
  CBRETabsTrigger as TabsTrigger,
  CBRETabsContent as TabsContent,
}; 