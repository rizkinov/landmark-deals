"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CBREButton } from "@/components/cbre-button";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form schema for the price range example
const priceRangeSchema = z.object({
  priceRange: z.array(z.number()).refine(
    (value) => value.length === 2 && value[0] <= value[1],
    {
      message: "Min price must be less than or equal to max price",
    }
  ),
});

export default function SliderExamplePage() {
  // Basic slider state
  const [basicValue, setBasicValue] = React.useState(50);
  
  // Range slider state
  const [rangeValue, setRangeValue] = React.useState([25, 75]);
  
  // Progress slider state with calculated percentage
  const [progressValue, setProgressValue] = React.useState(30);
  const progressPercentage = Math.round(progressValue);
  
  // Step slider state
  const [stepValue, setStepValue] = React.useState(50);
  
  // Form with range slider
  const form = useForm<z.infer<typeof priceRangeSchema>>({
    resolver: zodResolver(priceRangeSchema),
    defaultValues: {
      priceRange: [200000, 600000],
    },
  });
  
  // Format price as currency
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof priceRangeSchema>) => {
    alert(`Price Range Selected: ${formatPrice(data.priceRange[0])} - ${formatPrice(data.priceRange[1])}`);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Slider Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Slider component provides a way to select a value or range of values along a specified number range.
          It follows shadcn/ui patterns for clean integration with forms and state management.
        </p>
        
        {/* Basic Slider Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Slider</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-calibre mb-3">Value: {basicValue}</h3>
                  <Slider 
                    defaultValue={[basicValue]} 
                    max={100} 
                    step={1} 
                    onValueChange={(value) => setBasicValue(value[0])}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Slider } from "@/components/ui/slider";

const [value, setValue] = React.useState(50);

<Slider 
  defaultValue={[value]} 
  max={100} 
  step={1} 
  onValueChange={(value) => setValue(value[0])}
/>`}
            </pre>
          </div>
        </div>
        
        {/* Range Slider */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Range Slider</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-calibre mb-3">Range: {rangeValue[0]} - {rangeValue[1]}</h3>
                  <Slider 
                    defaultValue={rangeValue} 
                    max={100} 
                    step={1} 
                    onValueChange={setRangeValue}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-dark-grey">0</span>
                    <span className="text-sm text-dark-grey">100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Slider } from "@/components/ui/slider";

const [rangeValue, setRangeValue] = React.useState([25, 75]);

<Slider 
  defaultValue={rangeValue} 
  max={100} 
  step={1} 
  onValueChange={setRangeValue}
/>

<div className="flex justify-between">
  <span className="text-sm">0</span>
  <span className="text-sm">100</span>
</div>`}
            </pre>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Progress Indicator</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-calibre">Completion</h3>
                    <span className="bg-cbre-green text-white px-2 py-1 text-sm">{progressPercentage}%</span>
                  </div>
                  <Slider 
                    defaultValue={[progressValue]} 
                    max={100} 
                    step={1} 
                    onValueChange={(value) => setProgressValue(value[0])}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [progressValue, setProgressValue] = React.useState(30);
const progressPercentage = Math.round(progressValue);

<div className="flex justify-between items-center mb-3">
  <h3 className="text-lg">Completion</h3>
  <span className="bg-cbre-green text-white px-2 py-1 text-sm">
    {progressPercentage}%
  </span>
</div>

<Slider 
  defaultValue={[progressValue]} 
  max={100} 
  step={1} 
  onValueChange={(value) => setProgressValue(value[0])}
/>`}
            </pre>
          </div>
        </div>
        
        {/* Step Slider */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Step Slider</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-calibre mb-3">Step Value: {stepValue}</h3>
                  <Slider 
                    defaultValue={[stepValue]} 
                    max={100} 
                    step={10} 
                    onValueChange={(value) => setStepValue(value[0])}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-dark-grey">0</span>
                    <span className="text-sm text-dark-grey">10</span>
                    <span className="text-sm text-dark-grey">20</span>
                    <span className="text-sm text-dark-grey">30</span>
                    <span className="text-sm text-dark-grey">40</span>
                    <span className="text-sm text-dark-grey">50</span>
                    <span className="text-sm text-dark-grey">60</span>
                    <span className="text-sm text-dark-grey">70</span>
                    <span className="text-sm text-dark-grey">80</span>
                    <span className="text-sm text-dark-grey">90</span>
                    <span className="text-sm text-dark-grey">100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [stepValue, setStepValue] = React.useState(50);

<Slider 
  defaultValue={[stepValue]} 
  max={100} 
  step={10} 
  onValueChange={(value) => setStepValue(value[0])}
/>

// Display step markers
<div className="flex justify-between">
  <span className="text-sm">0</span>
  <span className="text-sm">10</span>
  {/* ... other step markers ... */}
  <span className="text-sm">100</span>
</div>`}
            </pre>
          </div>
        </div>
        
        {/* Form Integration */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Form Integration</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="priceRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Range</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Slider
                                defaultValue={field.value}
                                min={100000}
                                max={1000000}
                                step={10000}
                                onValueChange={field.onChange}
                              />
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="text-sm text-dark-grey">Min:</span>
                                  <span className="ml-1 font-medium">{formatPrice(field.value[0])}</span>
                                </div>
                                <div>
                                  <span className="text-sm text-dark-grey">Max:</span>
                                  <span className="ml-1 font-medium">{formatPrice(field.value[1])}</span>
                                </div>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Select your minimum and maximum price range.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <CBREButton type="submit" variant="primary">
                        Save Price Range
                      </CBREButton>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Form schema
const priceRangeSchema = z.object({
  priceRange: z.array(z.number()).refine(
    (value) => value.length === 2 && value[0] <= value[1],
    {
      message: "Min price must be less than or equal to max price",
    }
  ),
});

// Format price as currency
const formatPrice = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

// Initialize form
const form = useForm<z.infer<typeof priceRangeSchema>>({
  resolver: zodResolver(priceRangeSchema),
  defaultValues: {
    priceRange: [200000, 600000],
  },
});

// Form with react-hook-form
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="priceRange"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price Range</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <Slider
                defaultValue={field.value}
                min={100000}
                max={1000000}
                step={10000}
                onValueChange={field.onChange}
              />
              <div className="flex justify-between">
                <div>Min: {formatPrice(field.value[0])}</div>
                <div>Max: {formatPrice(field.value[1])}</div>
              </div>
            </div>
          </FormControl>
          <FormDescription>
            Select your price range.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <Button type="submit">Save</Button>
  </form>
</Form>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Slider Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Slider component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Slider</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Slider Props</h3>
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