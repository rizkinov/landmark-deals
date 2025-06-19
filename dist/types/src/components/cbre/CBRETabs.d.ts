import React from 'react';
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
export declare function CBRETabs({ defaultValue, value, onValueChange, className, children, variant, size, ...props }: CBRETabsProps): React.JSX.Element;
interface CBRETabsListProps {
    className?: string;
    children?: React.ReactNode;
    variant?: "underline" | "boxed";
    size?: "sm" | "md" | "lg";
}
export declare function CBRETabsList({ className, children, variant: propVariant, size: propSize, ...props }: CBRETabsListProps): React.JSX.Element;
interface CBRETabsTriggerProps {
    value: string;
    className?: string;
    children?: React.ReactNode;
    variant?: "underline" | "boxed";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}
export declare function CBRETabsTrigger({ value, className, children, variant: propVariant, size: propSize, disabled, ...props }: CBRETabsTriggerProps): React.JSX.Element;
interface CBRETabsContentProps {
    value: string;
    className?: string;
    children?: React.ReactNode;
}
export declare function CBRETabsContent({ value, className, children, ...props }: CBRETabsContentProps): React.JSX.Element;
export { CBRETabs as Tabs, CBRETabsList as TabsList, CBRETabsTrigger as TabsTrigger, CBRETabsContent as TabsContent, };
