import React from 'react';
export type CBREDropdownMenuItemType = {
    type: "item";
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "default" | "destructive";
} | {
    type: "checkbox";
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
} | {
    type: "radio";
    label: string;
    value: string;
    disabled?: boolean;
} | {
    type: "submenu";
    label: string;
    items: CBREDropdownMenuItemType[];
    disabled?: boolean;
} | {
    type: "label";
    label: string;
} | {
    type: "separator";
};
interface CBREDropdownMenuProps {
    trigger: React.ReactNode;
    items: CBREDropdownMenuItemType[];
    className?: string;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    radioValue?: string;
    onRadioValueChange?: (value: string) => void;
}
/**
 * CBREDropdownMenu - A styled dropdown menu component following CBRE design
 *
 * Features:
 * - CBRE styling with sharp corners and proper colors
 * - Support for various item types (regular, checkbox, radio, submenu)
 * - Customizable trigger element
 */
export declare function CBREDropdownMenu({ trigger, items, className, align, side, radioValue, onRadioValueChange }: CBREDropdownMenuProps): React.JSX.Element;
export {};
