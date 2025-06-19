import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
export declare function CBRECard({ children, className, variant, ...props }: CBRECardProps & React.ComponentPropsWithoutRef<typeof Card>): React.JSX.Element;
interface CBRECardHeaderProps {
    children?: React.ReactNode;
    className?: string;
}
export declare function CBRECardHeader({ children, className, ...props }: CBRECardHeaderProps & React.ComponentPropsWithoutRef<typeof CardHeader>): React.JSX.Element;
interface CBRECardTitleProps {
    children?: React.ReactNode;
    className?: string;
}
export declare function CBRECardTitle({ children, className, ...props }: CBRECardTitleProps & React.ComponentPropsWithoutRef<typeof CardTitle>): React.JSX.Element;
interface CBRECardDescriptionProps {
    children?: React.ReactNode;
    className?: string;
}
export declare function CBRECardDescription({ children, className, ...props }: CBRECardDescriptionProps & React.ComponentPropsWithoutRef<typeof CardDescription>): React.JSX.Element;
interface CBRECardContentProps {
    children?: React.ReactNode;
    className?: string;
}
export declare function CBRECardContent({ children, className, ...props }: CBRECardContentProps & React.ComponentPropsWithoutRef<typeof CardContent>): React.JSX.Element;
interface CBRECardFooterProps {
    children?: React.ReactNode;
    className?: string;
}
export declare function CBRECardFooter({ children, className, ...props }: CBRECardFooterProps & React.ComponentPropsWithoutRef<typeof CardFooter>): React.JSX.Element;
export { CBRECard as Card, CBRECardHeader as CardHeader, CBRECardTitle as CardTitle, CBRECardDescription as CardDescription, CBRECardContent as CardContent, CBRECardFooter as CardFooter, };
