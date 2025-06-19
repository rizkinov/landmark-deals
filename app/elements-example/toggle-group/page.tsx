"use client";

import React, { useState } from 'react';
import { CBREToggleGroup, CBREToggleGroupItem } from '@/components/cbre-toggle-group';
import { CBREButton } from '@/components/cbre-button';
import Link from "next/link";



export default function ToggleGroupExamplePage() {
  const [singleValue, setSingleValue] = useState("center");
  const [multipleValue, setMultipleValue] = useState<string[]>(["bold", "italic"]);
  const [outlineValue, setOutlineValue] = useState("monthly");
  const [sizeValue, setSizeValue] = useState({
    small: "sm",
    medium: "md",
    large: "lg"
  });

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Toggle Group Component</h1>
        
        {/* Default Single Selection */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Single Selection</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="flex flex-col gap-6">
              <CBREToggleGroup 
                type="single" 
                value={singleValue}
                onValueChange={(value) => value && setSingleValue(value)}
                aria-label="Text alignment"
              >
                <CBREToggleGroupItem value="left">Left</CBREToggleGroupItem>
                <CBREToggleGroupItem value="center">Center</CBREToggleGroupItem>
                <CBREToggleGroupItem value="right">Right</CBREToggleGroupItem>
              </CBREToggleGroup>
              
              <div className="text-sm text-dark-grey">
                Selected: {singleValue}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [value, setValue] = useState("center");

<CBREToggleGroup 
  type="single" 
  value={value}
  onValueChange={(value) => value && setValue(value)}
  aria-label="Text alignment"
>
  <CBREToggleGroupItem value="left">Left</CBREToggleGroupItem>
  <CBREToggleGroupItem value="center">Center</CBREToggleGroupItem>
  <CBREToggleGroupItem value="right">Right</CBREToggleGroupItem>
</CBREToggleGroup>`}
            </pre>
          </div>
        </div>
        
        {/* Multiple Selection */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Multiple Selection</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="flex flex-col gap-6">
              <CBREToggleGroup 
                type="multiple" 
                value={multipleValue}
                onValueChange={setMultipleValue}
                aria-label="Text formatting"
              >
                <CBREToggleGroupItem value="bold">Bold</CBREToggleGroupItem>
                <CBREToggleGroupItem value="italic">Italic</CBREToggleGroupItem>
                <CBREToggleGroupItem value="underline">Underline</CBREToggleGroupItem>
              </CBREToggleGroup>
              
              <div className="text-sm text-dark-grey">
                Selected: {multipleValue.join(', ') || 'None'}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Multiple Selection</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [value, setValue] = useState<string[]>(["bold", "italic"]);

<CBREToggleGroup 
  type="multiple" 
  value={value}
  onValueChange={setValue}
  aria-label="Text formatting"
>
  <CBREToggleGroupItem value="bold">Bold</CBREToggleGroupItem>
  <CBREToggleGroupItem value="italic">Italic</CBREToggleGroupItem>
  <CBREToggleGroupItem value="underline">Underline</CBREToggleGroupItem>
</CBREToggleGroup>`}
            </pre>
          </div>
        </div>
        
        {/* Outline Variant */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Outline Variant</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="flex flex-col gap-6">
              <CBREToggleGroup 
                type="single" 
                value={outlineValue}
                onValueChange={(value) => value && setOutlineValue(value)}
                aria-label="Billing frequency"
              >
                <CBREToggleGroupItem value="monthly" variant="outline">Monthly</CBREToggleGroupItem>
                <CBREToggleGroupItem value="quarterly" variant="outline">Quarterly</CBREToggleGroupItem>
                <CBREToggleGroupItem value="yearly" variant="outline">Yearly</CBREToggleGroupItem>
              </CBREToggleGroup>
              
              <div className="text-sm text-dark-grey">
                Selected: {outlineValue}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Outline Variant</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREToggleGroup type="single" value={value} onValueChange={setValue}>
  <CBREToggleGroupItem value="monthly" variant="outline">Monthly</CBREToggleGroupItem>
  <CBREToggleGroupItem value="quarterly" variant="outline">Quarterly</CBREToggleGroupItem>
  <CBREToggleGroupItem value="yearly" variant="outline">Yearly</CBREToggleGroupItem>
</CBREToggleGroup>`}
            </pre>
          </div>
        </div>
        
        {/* Size Variants */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Size Variants</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="space-y-8">
              <div>
                <div className="text-sm text-dark-grey mb-2">Small</div>
                <CBREToggleGroup 
                  type="single" 
                  value={sizeValue.small}
                  onValueChange={(value) => value && setSizeValue({...sizeValue, small: value})}
                >
                  <CBREToggleGroupItem value="sm" size="sm">Small</CBREToggleGroupItem>
                  <CBREToggleGroupItem value="md" size="sm">Medium</CBREToggleGroupItem>
                  <CBREToggleGroupItem value="lg" size="sm">Large</CBREToggleGroupItem>
                </CBREToggleGroup>
              </div>
              
              <div>
                <div className="text-sm text-dark-grey mb-2">Medium (Default)</div>
                <CBREToggleGroup 
                  type="single" 
                  value={sizeValue.medium}
                  onValueChange={(value) => value && setSizeValue({...sizeValue, medium: value})}
                >
                  <CBREToggleGroupItem value="sm">Small</CBREToggleGroupItem>
                  <CBREToggleGroupItem value="md">Medium</CBREToggleGroupItem>
                  <CBREToggleGroupItem value="lg">Large</CBREToggleGroupItem>
                </CBREToggleGroup>
              </div>
              
              <div>
                <div className="text-sm text-dark-grey mb-2">Large</div>
                <CBREToggleGroup 
                  type="single" 
                  value={sizeValue.large}
                  onValueChange={(value) => value && setSizeValue({...sizeValue, large: value})}
                >
                  <CBREToggleGroupItem value="sm" size="lg">Small</CBREToggleGroupItem>
                  <CBREToggleGroupItem value="md" size="lg">Medium</CBREToggleGroupItem>
                  <CBREToggleGroupItem value="lg" size="lg">Large</CBREToggleGroupItem>
                </CBREToggleGroup>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Size Variants</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Small
<CBREToggleGroupItem value="sm" size="sm">Small</CBREToggleGroupItem>

// Medium (Default)
<CBREToggleGroupItem value="md">Medium</CBREToggleGroupItem>

// Large
<CBREToggleGroupItem value="lg" size="lg">Large</CBREToggleGroupItem>`}
            </pre>
          </div>
        </div>
        
        {/* Disabled */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Disabled</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <CBREToggleGroup type="single" defaultValue="center" disabled>
              <CBREToggleGroupItem value="left">Left</CBREToggleGroupItem>
              <CBREToggleGroupItem value="center">Center</CBREToggleGroupItem>
              <CBREToggleGroupItem value="right">Right</CBREToggleGroupItem>
            </CBREToggleGroup>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Disabled State</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Disable the entire group
<CBREToggleGroup type="single" defaultValue="center" disabled>
  <CBREToggleGroupItem value="left">Left</CBREToggleGroupItem>
  <CBREToggleGroupItem value="center">Center</CBREToggleGroupItem>
  <CBREToggleGroupItem value="right">Right</CBREToggleGroupItem>
</CBREToggleGroup>

// Or disable individual items
<CBREToggleGroup type="single" defaultValue="center">
  <CBREToggleGroupItem value="left">Left</CBREToggleGroupItem>
  <CBREToggleGroupItem value="center">Center</CBREToggleGroupItem>
  <CBREToggleGroupItem value="right" disabled>Right</CBREToggleGroupItem>
</CBREToggleGroup>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">ToggleGroup Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The ToggleGroup component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">ToggleGroup</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">ToggleGroup Props</h3>
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