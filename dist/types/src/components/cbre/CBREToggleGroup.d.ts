import React from 'react';
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
export declare function CBREToggleGroup(props: CBREToggleGroupProps): React.JSX.Element;
interface CBREToggleGroupItemProps {
    value: string;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    variant?: "default" | "outline";
    size?: "sm" | "md" | "lg";
}
export declare function CBREToggleGroupItem({ value, disabled, className, children, variant, size, ...props }: CBREToggleGroupItemProps): React.JSX.Element;
export {};
