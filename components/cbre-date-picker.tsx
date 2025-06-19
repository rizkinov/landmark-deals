"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange, DayPicker, Matcher } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

// Helper function to format dates since we can't use format from date-fns directly
const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Define props for the CBREDatePicker component
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

// Define props for the CBREDateRangePicker component
export interface CBREDateRangePickerProps {
  dateRange?: DateRange;
  setDateRange?: (date: DateRange | undefined) => void;
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  disabledDates?: Matcher | Matcher[];
  numberOfMonths?: number;
}

/**
 * CBREDatePicker component that wraps the shadcn/ui Calendar and Popover components.
 * Provides a date picker with CBRE styling and supports label, description, and error handling.
 */
export function CBREDatePicker({
  date,
  setDate,
  label,
  description,
  placeholder = "Select a date",
  error,
  disabled = false,
  className,
  disabledDates,
}: CBREDatePickerProps) {
  // Generate a unique ID for accessibility
  const id = React.useId();
  const datepickerId = `cbre-datepicker-${id}`;
  const descriptionId = `${datepickerId}-description`;
  const errorId = `${datepickerId}-error`;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label
          htmlFor={datepickerId}
          className="text-dark-grey font-calibre"
        >
          {label}
        </Label>
      )}
      {description && !error && (
        <p id={descriptionId} className="text-sm text-muted-foreground font-calibre">
          {description}
        </p>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={datepickerId}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-light-grey",
              "hover:border-cbre-green focus-visible:border-cbre-green focus-visible:ring-accent-light/30",
              !date && "text-muted-foreground",
              error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
            aria-describedby={
              description || error
                ? `${description ? descriptionId : ""} ${error ? errorId : ""}`
                : undefined
            }
            aria-invalid={error ? "true" : undefined}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDate(date) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-light-grey" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disabledDates}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p id={errorId} className="text-sm text-destructive font-calibre">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * CBREDateRangePicker component that wraps the shadcn/ui Calendar and Popover components.
 * Provides a date range picker with CBRE styling and supports label, description, and error handling.
 */
export function CBREDateRangePicker({
  dateRange,
  setDateRange,
  label,
  description,
  placeholder = "Select date range",
  error,
  disabled = false,
  className,
  disabledDates,
  numberOfMonths = 2,
}: CBREDateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(dateRange);

  const handleDateSelect = React.useCallback(
    (selectedDateRange: DateRange | undefined) => {
      setDate(selectedDateRange);
      setDateRange?.(selectedDateRange);
    },
    [setDateRange]
  );

  React.useEffect(() => {
    setDate(dateRange);
  }, [dateRange]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={numberOfMonths}
            disabled={disabled || disabledDates}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-destructive text-sm font-medium">{error}</p>
      )}
    </div>
  );
} 