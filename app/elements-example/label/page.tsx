"use client";

import * as React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CBREButton } from "@/components/cbre-button";

export default function LabelExamplePage() {
  // State for form controls
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Label Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Label component provides accessible text labels for form controls. It's designed to work with various form elements through proper htmlFor attribute association.
        </p>
        
        {/* Basic Label Usage */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Label Usage</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="basic-input">Email Address</Label>
                  <Input
                    id="basic-input"
                    type="email"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div className="grid w-full gap-1.5">
  <Label htmlFor="basic-input">Email Address</Label>
  <Input
    id="basic-input"
    type="email"
    placeholder="name@example.com"
  />
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Label with Various Form Controls */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Labels with Different Form Controls</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                {/* Label with Input */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="name-input">Name</Label>
                  <Input
                    id="name-input"
                    type="text"
                    placeholder="John Doe"
                  />
                </div>
                
                {/* Label with Textarea */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="bio-textarea">Bio</Label>
                  <Textarea
                    id="bio-textarea"
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
                
                {/* Label with Select */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="country-select">Country</Label>
                  <Select>
                    <SelectTrigger id="country-select">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Label with Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms-checkbox" 
                    checked={checkboxChecked}
                    onCheckedChange={(checked) => 
                      setCheckboxChecked(checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor="terms-checkbox"
                    className="text-base cursor-pointer"
                  >
                    I agree to the terms and conditions
                  </Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Label with Input
<div className="grid w-full gap-1.5">
  <Label htmlFor="name-input">Name</Label>
  <Input
    id="name-input"
    type="text"
    placeholder="John Doe"
  />
</div>

// Label with Textarea
<div className="grid w-full gap-1.5">
  <Label htmlFor="bio-textarea">Bio</Label>
  <Textarea
    id="bio-textarea"
    placeholder="Tell us about yourself"
    rows={3}
  />
</div>

// Label with Select
<div className="grid w-full gap-1.5">
  <Label htmlFor="country-select">Country</Label>
  <Select>
    <SelectTrigger id="country-select">
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
    </SelectContent>
  </Select>
</div>

// Label with Checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms-checkbox" />
  <Label 
    htmlFor="terms-checkbox"
    className="text-base cursor-pointer"
  >
    I agree to the terms and conditions
  </Label>
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Label States */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Label States</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                {/* Regular Label */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="regular-input">Regular Label</Label>
                  <Input
                    id="regular-input"
                    type="text"
                    placeholder="Regular input"
                  />
                </div>
                
                {/* Required Label */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="required-input" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Required Field
                  </Label>
                  <Input
                    id="required-input"
                    type="text"
                    placeholder="This field is required"
                    required
                  />
                </div>
                
                {/* Disabled Label */}
                <div className="grid w-full gap-1.5 opacity-50">
                  <Label htmlFor="disabled-input">Disabled Field</Label>
                  <Input
                    id="disabled-input"
                    type="text"
                    placeholder="This field is disabled"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Regular Label
<Label htmlFor="regular-input">Regular Label</Label>
<Input id="regular-input" type="text" />

// Required Label (with asterisk)
<Label 
  htmlFor="required-input" 
  className="after:content-['*'] after:ml-0.5 after:text-red-500"
>
  Required Field
</Label>
<Input id="required-input" type="text" required />

// Disabled Label
<div className="opacity-50">
  <Label htmlFor="disabled-input">Disabled Field</Label>
  <Input id="disabled-input" type="text" disabled />
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Accessibility Notes */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Accessibility Best Practices</h2>
          <div className="bg-white p-6 border border-light-grey">
            <div className="space-y-4">
              <p className="text-dark-grey font-calibre">
                When using the Label component, follow these accessibility best practices:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-dark-grey font-calibre">
                <li>Always use the <code className="bg-lighter-grey px-1 py-0.5 rounded">htmlFor</code> attribute on labels, which should match the <code className="bg-lighter-grey px-1 py-0.5 rounded">id</code> of the associated form control.</li>
                <li>Place labels before the form control in the markup (except for checkboxes and radio buttons, where they typically come after).</li>
                <li>Use clear and concise text that describes the purpose of the form control.</li>
                <li>Indicate required fields consistently (using an asterisk is a common approach).</li>
                <li>Maintain sufficient color contrast between the label text and background.</li>
              </ul>
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Label Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Label component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Label</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Label Props</h3>
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