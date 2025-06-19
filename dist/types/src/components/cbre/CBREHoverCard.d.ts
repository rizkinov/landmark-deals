import * as React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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
export declare function CBREHoverCard({ contentClassName, children, ...props }: CBREHoverCardProps): React.JSX.Element;
/**
 * CBREHoverCardTrigger - The trigger element for the hover card
 */
export declare function CBREHoverCardTrigger({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof HoverCardTrigger>): React.JSX.Element;
/**
 * CBREHoverCardContent - The content shown when hovering
 */
export declare function CBREHoverCardContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof HoverCardContent>): React.JSX.Element;
