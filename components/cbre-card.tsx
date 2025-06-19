"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CBRECardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

/**
 * CBRECard - A styled card component following CBRE design
 * 
 * Features:
 * - CBRE styled card with consistent spacing
 * - Sharp corners (no border radius)
 * - Three variants: default, outline, and secondary
 */
export function CBRECard({
  children,
  className,
  variant = "default",
  ...props
}: CBRECardProps & React.ComponentPropsWithoutRef<typeof Card>) {
  // Variant styles
  const variantClasses = {
    default: "bg-white border border-light-grey shadow-sm",
    outline: "bg-white border border-light-grey shadow-none", 
    secondary: "bg-[var(--lighter-grey)] border-none shadow-none",
  };

  return (
    <Card 
      className={cn(
        // Remove rounded corners
        "rounded-none",
        // Apply variant-specific styles
        variantClasses[variant],
        // Custom spacing
        "py-6",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

interface CBRECardHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function CBRECardHeader({
  children,
  className,
  ...props
}: CBRECardHeaderProps & React.ComponentPropsWithoutRef<typeof CardHeader>) {
  return (
    <CardHeader 
      className={cn(
        "px-6",
        className
      )}
      {...props}
    >
      {children}
    </CardHeader>
  );
}

interface CBRECardTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export function CBRECardTitle({
  children,
  className,
  ...props
}: CBRECardTitleProps & React.ComponentPropsWithoutRef<typeof CardTitle>) {
  return (
    <CardTitle 
      className={cn(
        "text-xl font-financier text-cbre-green",
        className
      )}
      {...props}
    >
      {children}
    </CardTitle>
  );
}

interface CBRECardDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export function CBRECardDescription({
  children,
  className,
  ...props
}: CBRECardDescriptionProps & React.ComponentPropsWithoutRef<typeof CardDescription>) {
  return (
    <CardDescription 
      className={cn(
        "text-dark-grey font-calibre mt-1",
        className
      )}
      {...props}
    >
      {children}
    </CardDescription>
  );
}

interface CBRECardContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function CBRECardContent({
  children,
  className,
  ...props
}: CBRECardContentProps & React.ComponentPropsWithoutRef<typeof CardContent>) {
  return (
    <CardContent 
      className={cn(
        "px-6 text-dark-grey font-calibre",
        className
      )}
      {...props}
    >
      {children}
    </CardContent>
  );
}

interface CBRECardFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export function CBRECardFooter({
  children,
  className,
  ...props
}: CBRECardFooterProps & React.ComponentPropsWithoutRef<typeof CardFooter>) {
  return (
    <CardFooter
      className={cn(
        "px-6 flex items-center justify-end gap-4",
        className
      )}
      {...props}
    >
      {children}
    </CardFooter>
  );
}

export {
  CBRECard as Card,
  CBRECardHeader as CardHeader,
  CBRECardTitle as CardTitle,
  CBRECardDescription as CardDescription,
  CBRECardContent as CardContent,
  CBRECardFooter as CardFooter,
}; 