import React from 'react';
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
export declare function CBREToggle({ checked, onCheckedChange, disabled, label, description, className, size }: CBREToggleProps): React.JSX.Element;
export {};
