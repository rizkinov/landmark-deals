import * as React from "react";
import { Select } from "@/components/ui/select";
export interface CBRESelectProps extends React.ComponentPropsWithoutRef<typeof Select> {
    label?: string;
    labelClassName?: string;
    description?: string;
    error?: string;
    triggerClassName?: string;
    contentClassName?: string;
    id?: string;
    className?: string;
    children: React.ReactNode;
}
export interface SelectGroupOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface SelectGroupItem {
    label: string;
    options: SelectGroupOption[];
}
export interface CBREGroupedSelectProps extends Omit<CBRESelectProps, "children"> {
    groups: SelectGroupItem[];
    placeholder?: string;
}
/**
 * CBRESelect component that wraps the shadcn/ui Select component with CBRE styling.
 * Provides a label, description, and error handling.
 */
export declare function CBRESelect({ label, labelClassName, description, error, triggerClassName, contentClassName, id: propId, className, children, ...props }: CBRESelectProps): React.JSX.Element;
/**
 * CBREGroupedSelect component that renders a select with grouped options.
 * A convenience wrapper around CBRESelect with pre-built option groups.
 */
export declare function CBREGroupedSelect({ groups, placeholder, ...props }: CBREGroupedSelectProps): React.JSX.Element;
