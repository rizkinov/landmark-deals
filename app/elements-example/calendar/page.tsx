"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";

export default function CalendarExamplePage() {
  // State for basic calendar
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // State for multiple selection calendar
  const [multiDates, setMultiDates] = React.useState<Date[] | undefined>([]);
  
  // State for range selection calendar
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  // Responsive month display
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

  // Helper function to format dates
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Calendar Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Calendar component allows users to select dates in various formats: single date, multiple dates, or date ranges.
          It is built using react-day-picker and styled to match the CBRE design system.
        </p>
        
        {/* Basic Calendar */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Calendar</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Single Date Selection</p>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                
                {date && (
                  <p className="mt-4 text-sm text-dark-grey text-center">
                    Selected date: <span className="font-bold">{formatDate(date)}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Calendar } from "@/components/ui/calendar";

// State for selected date
const [date, setDate] = React.useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>`}
            </pre>
          </div>
        </div>
        
        {/* Multiple Date Selection */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Multiple Date Selection</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Select multiple dates</p>
                <div className="flex justify-center">
                  <Calendar
                    mode="multiple"
                    selected={multiDates}
                    onSelect={setMultiDates}
                    className="rounded-md border"
                  />
                </div>
                
                {multiDates && multiDates.length > 0 && (
                  <div className="mt-4 text-sm text-dark-grey">
                    <p className="font-medium mb-1 text-center">Selected dates:</p>
                    <ul className="list-disc list-inside space-y-1 max-w-xs mx-auto">
                      {multiDates.map((date, i) => (
                        <li key={i}>{formatDate(date)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Calendar } from "@/components/ui/calendar";

// State for multiple dates
const [multiDates, setMultiDates] = React.useState<Date[] | undefined>([]);

<Calendar
  mode="multiple"
  selected={multiDates}
  onSelect={setMultiDates}
  className="rounded-md border"
/>`}
            </pre>
          </div>
        </div>
        
        {/* Date Range Selection */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Date Range Selection</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-3xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Select a range of dates</p>
                <div className="flex justify-center">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={isMobile ? 1 : 2}
                    className="rounded-md border mx-auto"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4",
                      month: "space-y-4 w-full",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      table: "w-full border-collapse space-y-1"
                    }}
                  />
                </div>
                
                {dateRange?.from && (
                  <p className="mt-4 text-sm text-dark-grey text-center">
                    {dateRange.to ? (
                      <>
                        Range: <span className="font-bold">{formatDate(dateRange.from)}</span> to{" "}
                        <span className="font-bold">{formatDate(dateRange.to)}</span>
                      </>
                    ) : (
                      <>
                        Selected: <span className="font-bold">{formatDate(dateRange.from)}</span>
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

<Calendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={isMobile ? 1 : 2}
  className="rounded-md border"
  classNames={{
    months: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4",
    month: "space-y-4 w-full",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    table: "w-full border-collapse space-y-1"
  }}
/>`}
            </pre>
          </div>
        </div>
        
        {/* Disabled Dates */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Disabled Dates</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Calendar with certain dates disabled</p>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={[
                      { from: new Date(2024, 3, 10), to: new Date(2024, 3, 15) },
                      { before: new Date() },
                    ]}
                    className="rounded-md border"
                  />
                </div>
                <p className="mt-4 text-sm text-dark-grey text-center">
                  Dates before today and dates between April 10-15, 2024 are disabled.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Calendar } from "@/components/ui/calendar";

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={[
    { from: new Date(2024, 3, 10), to: new Date(2024, 3, 15) }, // Disable date range
    { before: new Date() }, // Disable past dates
  ]}
  className="rounded-md border"
/>`}
            </pre>
          </div>
        </div>
        
        {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component API</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Calendar Props</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Calendar component accepts the following key props to customize its behavior.
                  </p>
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
                          <td className="border border-light-grey px-4 py-2 font-mono">mode</td>
                          <td className="border border-light-grey px-4 py-2"><code>"single" | "multiple" | "range"</code></td>
                          <td className="border border-light-grey px-4 py-2">The selection mode for the calendar.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">selected</td>
                          <td className="border border-light-grey px-4 py-2"><code>Date | Date[] | DateRange</code></td>
                          <td className="border border-light-grey px-4 py-2">The selected date(s) or date range.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">onSelect</td>
                          <td className="border border-light-grey px-4 py-2"><code>function</code></td>
                          <td className="border border-light-grey px-4 py-2">Function called when a date is selected.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">numberOfMonths</td>
                          <td className="border border-light-grey px-4 py-2"><code>number</code></td>
                          <td className="border border-light-grey px-4 py-2">Number of months to display at once.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">disabled</td>
                          <td className="border border-light-grey px-4 py-2"><code>Matcher | Matcher[]</code></td>
                          <td className="border border-light-grey px-4 py-2">Rules for disabling specific dates.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">initialFocus</td>
                          <td className="border border-light-grey px-4 py-2"><code>boolean</code></td>
                          <td className="border border-light-grey px-4 py-2">Whether to focus the calendar on mount.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">className</td>
                          <td className="border border-light-grey px-4 py-2"><code>string</code></td>
                          <td className="border border-light-grey px-4 py-2">Additional CSS classes to apply.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">classNames</td>
                          <td className="border border-light-grey px-4 py-2"><code>object</code></td>
                          <td className="border border-light-grey px-4 py-2">Custom class names for internal elements.</td>
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