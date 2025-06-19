import * as React from "react";
import { DateRange, Matcher } from "react-day-picker";
export interface CBREDatePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    label?: string;
    description?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
    disabledDates?: Matcher | Matcher[];
}
export interface CBREDateRangePickerProps {
    dateRange: DateRange | undefined;
    setDateRange: (dateRange: DateRange | undefined) => void;
    label?: string;
    description?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
    numberOfMonths?: number;
    disabledDates?: Matcher | Matcher[];
}
/**
 * CBREDatePicker component that wraps the shadcn/ui Calendar and Popover components.
 * Provides a date picker with CBRE styling and supports label, description, and error handling.
 */
export declare function CBREDatePicker({ date, setDate, label, description, placeholder, error, disabled, className, disabledDates, }: CBREDatePickerProps): React.JSX.Element;
/**
 * CBREDateRangePicker component that wraps the shadcn/ui Calendar and Popover components.
 * Provides a date range picker with CBRE styling and supports label, description, and error handling.
 */
export declare function CBREDateRangePicker({ dateRange, setDateRange, label, description, placeholder, error, disabled, className, numberOfMonths, disabledDates, }: CBREDateRangePickerProps): React.JSX.Element;
