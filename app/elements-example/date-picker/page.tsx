"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";

export default function DatePickerExamplePage() {
  // State for basic date picker
  const [date, setDate] = React.useState<Date>();
  
  // State for date range picker
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  // State for form with date
  const [formDate, setFormDate] = React.useState<Date>();
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  
  // Helper function to format dates
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    console.log("Form submitted with date:", formDate);
  };

  // Responsive state for mobile
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Date Picker Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Date Picker component combines the Calendar, Popover, and Button components to create an 
          accessible date selection interface. It provides a clean interface to select a date or date range
          and is fully customizable.
        </p>
        
        {/* Basic Date Picker */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Date Picker</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Click the button below to open a calendar and select a date</p>
                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? formatDate(date) : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {date && (
                  <p className="mt-4 text-sm text-dark-grey text-center">
                    You selected: <span className="font-bold">{formatDate(date)}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// State for selected date
const [date, setDate] = React.useState<Date>();

// Helper function to format dates
const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-[240px] justify-start text-left font-normal",
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? formatDate(date) : "Select a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      initialFocus
    />
  </PopoverContent>
</Popover>`}
            </pre>
          </div>
        </div>
        
        {/* Date Range Picker */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Date Range Picker</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-3xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Select a range of dates from the calendar</p>
                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !dateRange?.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                            </>
                          ) : (
                            formatDate(dateRange.from)
                          )
                        ) : (
                          "Select a date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto md:w-[500px] lg:w-[500px] p-0" align="start">
                      <div className="p-2">
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={isMobile ? 1 : 2}
                          initialFocus
                          className="mx-auto"
                          classNames={{
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-1",
                            month: "space-y-4 w-full",
                            caption: "flex justify-center pt-1 relative items-center",
                            caption_label: "text-sm font-medium",
                            table: "w-full border-collapse space-y-1",
                            cell: "relative p-0 text-center",
                            day: "h-8 w-8 p-0 font-normal"
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
                {dateRange?.from && (
                  <p className="mt-4 text-sm text-dark-grey text-center">
                    {dateRange.to ? (
                      <>
                        Selected range: <span className="font-bold">{formatDate(dateRange.from)}</span> to{" "}
                        <span className="font-bold">{formatDate(dateRange.to)}</span>
                      </>
                    ) : (
                      <>
                        Selected start date: <span className="font-bold">{formatDate(dateRange.from)}</span>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// State for date range
const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
  from: undefined,
  to: undefined,
});

// Responsive handling for mobile devices
const [isMobile, setIsMobile] = React.useState(false);
React.useEffect(() => {
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  return () => window.removeEventListener('resize', checkScreenSize);
}, []);

<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className={cn(
        "w-[300px] justify-start text-left font-normal",
        !dateRange?.from && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {dateRange?.from ? (
        dateRange.to ? (
          <>
            {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
          </>
        ) : (
          formatDate(dateRange.from)
        )
      ) : (
        "Select a date range"
      )}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto md:w-[500px] lg:w-[500px] p-0" align="start">
    <div className="p-2">
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={isMobile ? 1 : 2}
        initialFocus
        className="mx-auto"
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-1",
          month: "space-y-4 w-full",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          table: "w-full border-collapse space-y-1",
          cell: "relative p-0 text-center",
          day: "h-8 w-8 p-0 font-normal"
        }}
      />
    </div>
  </PopoverContent>
</Popover>`}
            </pre>
          </div>
        </div>
        
        {/* Form Integration */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Form Integration</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Date Picker in a form with validation</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-dark-grey">Appointment Date</label>
                    <p className="text-sm text-muted-foreground pb-2">
                      Please select your preferred appointment date.
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full md:w-[240px] justify-start text-left font-normal",
                            !formDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formDate ? formatDate(formDate) : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formDate}
                          onSelect={setFormDate}
                          disabled={[
                            { before: new Date() }, // Disable past dates
                          ]}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {!formDate && formSubmitted && (
                      <p className="text-sm text-destructive">Please select a date</p>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setFormDate(undefined);
                        setFormSubmitted(false);
                      }}
                    >
                      Reset
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
                
                {formDate && formSubmitted && (
                  <div className="mt-6 p-4 bg-gray-50 rounded">
                    <h4 className="text-sm font-medium mb-2">Form Submitted Successfully</h4>
                    <p className="text-sm">
                      Appointment scheduled for: <span className="font-bold">{formatDate(formDate)}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

// State for form date and submission status
const [formDate, setFormDate] = React.useState<Date>();
const [formSubmitted, setFormSubmitted] = React.useState(false);

// Handle form submit
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setFormSubmitted(true);
  
  if (formDate) {
    // Process form submission
    console.log("Form submitted with date:", formDate);
  }
};

<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <label className="text-sm font-medium text-dark-grey">Appointment Date</label>
    <p className="text-sm text-muted-foreground pb-2">
      Please select your preferred appointment date.
    </p>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full md:w-[240px] justify-start text-left font-normal",
            !formDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formDate ? formatDate(formDate) : "Select a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={formDate}
          onSelect={setFormDate}
          disabled={[
            { before: new Date() }, // Disable past dates
          ]}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    {!formDate && formSubmitted && (
      <p className="text-sm text-destructive">Please select a date</p>
    )}
  </div>
  
  <div className="flex justify-end space-x-4">
    <Button type="button" variant="outline" onClick={() => {
      setFormDate(undefined);
      setFormSubmitted(false);
    }}>
      Reset
    </Button>
    <Button type="submit">Submit</Button>
  </div>
</form>`}
            </pre>
          </div>
        </div>
        
        {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component Structure</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Date Picker Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Date Picker is composed of several components from shadcn/ui that must be used within the correct structure.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          <th className="border border-light-grey px-4 py-2 text-left">Component</th>
                          <th className="border border-light-grey px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">Popover</td>
                          <td className="border border-light-grey px-4 py-2">The root container for the date picker.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PopoverTrigger</td>
                          <td className="border border-light-grey px-4 py-2">The button that opens the date picker. Use <code>asChild</code> to wrap a custom button.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">Button</td>
                          <td className="border border-light-grey px-4 py-2">Used inside the PopoverTrigger to create the date picker button.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PopoverContent</td>
                          <td className="border border-light-grey px-4 py-2">Contains the calendar that appears when the trigger is clicked.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">Calendar</td>
                          <td className="border border-light-grey px-4 py-2">The date selection component placed inside the PopoverContent.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
                {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component API</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">DatePicker Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The DatePicker component provides a consistent UI element following CBRE design guidelines.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          <th className="border border-light-grey px-4 py-2 text-left">Component</th>
                          <th className="border border-light-grey px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DatePicker</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">DatePicker Props</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          <th className="border border-light-grey px-4 py-2 text-left">Prop</th>
                          <th className="border border-light-grey px-4 py-2 text-left">Type</th>
                          <th className="border border-light-grey px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">className</td>
                          <td className="border border-light-grey px-4 py-2">string</td>
                          <td className="border border-light-grey px-4 py-2">Additional CSS classes to apply to the component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

<div className="mt-16 flex justify-center">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>
      </div>
    </div>
  );
} 