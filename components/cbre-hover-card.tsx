"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Define the props for CBREHoverCard component
export interface CBREHoverCardProps extends React.ComponentPropsWithoutRef<typeof HoverCard> {
  contentClassName?: string;
  children: React.ReactNode;
}

/**
 * CBREHoverCard - A styled hover card component following CBRE design
 * 
 * Features:
 * - CBRE styling with consistent shadows and borders
 * - Customizable content and trigger elements
 * - Maintains CBRE typography and colors
 */
export function CBREHoverCard({
  contentClassName,
  children,
  ...props
}: CBREHoverCardProps) {
  return (
    <HoverCard {...props}>
      {children}
    </HoverCard>
  );
}

/**
 * CBREHoverCardTrigger - The trigger element for the hover card
 */
export function CBREHoverCardTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof HoverCardTrigger>) {
  return (
    <HoverCardTrigger
      className={cn(
        "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </HoverCardTrigger>
  );
}

/**
 * CBREHoverCardContent - The content shown when hovering
 */
export function CBREHoverCardContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof HoverCardContent>) {
  return (
    <HoverCardContent
      className={cn(
        "z-50 w-64 rounded-none border border-light-grey bg-white p-4",
        "text-dark-grey font-calibre shadow-md",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0",
        "data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95",
        "data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
    </HoverCardContent>
  );
} 