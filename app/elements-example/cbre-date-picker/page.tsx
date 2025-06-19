"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CBREDatePicker, CBREDateRangePicker } from "@/components/cbre-date-picker";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";

export default function CBREDatePickerExamplePage() {
  // State for basic date picker
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // State for date picker with error
  const [errorDate, setErrorDate] = React.useState<Date | undefined>(undefined);
  const [showError, setShowError] = React.useState(false);
  
  // State for date range picker
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  // State for form with date
  const [formDate, setFormDate] = React.useState<Date | undefined>(undefined);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">CBRE Date Picker Components</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The CBRE Date Picker components extend the shadcn/ui Calendar and Popover components with 
          CBRE-specific styling and additional features like labels, descriptions, and error handling.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Basic CBREDatePicker Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-financier text-cbre-green">Basic Date Picker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CBREDatePicker 
                label="Appointment Date"
                description="Select your preferred appointment date"
                date={date}
                setDate={setDate}
              />
              
              {date && (
                <p className="mt-4 text-sm text-dark-grey">
                  You selected: <span className="font-bold">{formatDate(date)}</span>
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* CBREDatePicker with Error Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-financier text-cbre-green">Date Picker with Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CBREDatePicker 
                label="Important Date"
                date={errorDate}
                setDate={setErrorDate}
                error={showError && !errorDate ? "Please select a date" : undefined}
              />
              
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => setShowError(true)}
                  variant="default"
                >
                  Validate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* CBREDateRangePicker Example */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-financier text-cbre-green">Date Range Picker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-full">
              <CBREDateRangePicker 
                label="Booking Period"
                description="Select the start and end dates for your booking"
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              
              {dateRange?.from && (
                <p className="mt-4 text-sm text-dark-grey">
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
            </CardContent>
          </Card>
          
          {/* Disabled Dates Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-financier text-cbre-green">With Disabled Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CBREDatePicker 
                label="Event Date"
                description="Select a date for your event (weekends and past dates are disabled)"
                date={date}
                setDate={setDate}
                disabledDates={[
                  { before: new Date() },
                  { dayOfWeek: [0, 6] } // Disable weekends (Sunday = 0, Saturday = 6)
                ]}
              />
              
              <p className="text-sm text-dark-grey">
                Weekends and dates before today are disabled in this example.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Form with CBREDatePicker Example */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-financier text-cbre-green">Form with Date Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <CBREDatePicker 
                label="Meeting Date"
                description="Please select your preferred meeting date"
                date={formDate}
                setDate={setFormDate}
                error={formSubmitted && !formDate ? "Please select a date for the meeting" : undefined}
                disabledDates={[
                  { before: new Date() } // Disable past dates
                ]}
              />
              
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
                  Meeting scheduled for: <span className="font-bold">{formatDate(formDate)}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

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