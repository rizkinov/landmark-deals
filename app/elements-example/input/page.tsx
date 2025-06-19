"use client";

import * as React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CBREButton } from "@/components/cbre-button";
import { CBREDatePicker } from "@/components/cbre-date-picker";

export default function InputExamplePage() {
  // State for regular input
  const [inputValue, setInputValue] = React.useState("");
  
  // State for date picker
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  
  // State for form inputs
  const [formState, setFormState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // Handle form change
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form clear
  const handleClearForm = () => {
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
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

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Input Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Input component provides a way to get user input in a form field. It follows the shadcn/ui composition pattern for clean integration.
        </p>
        
        {/* Basic Input Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Input</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <Input 
                type="text" 
                placeholder="Enter some text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <p className="mt-4 text-sm text-dark-grey">
                Current value: <span className="font-bold">{inputValue || "(empty)"}</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Input } from "@/components/ui/input";

const [inputValue, setInputValue] = React.useState("");

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
};

<Input 
  type="text" 
  placeholder="Enter some text"
  value={inputValue}
  onChange={handleInputChange}
/>
`}
            </pre>
          </div>
        </div>
        
        {/* Input with Label */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Input with Label</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="name@example.com" 
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

<div className="grid w-full gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input 
    type="email" 
    id="email" 
    placeholder="name@example.com" 
  />
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Disabled Input */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Disabled Input</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="grid w-full gap-1.5">
                <Label 
                  htmlFor="disabled-input" 
                  className="text-dark-grey opacity-50"
                >
                  Disabled Input
                </Label>
                <Input 
                  type="text" 
                  id="disabled-input" 
                  value="This input cannot be edited"
                  disabled 
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<div className="grid w-full gap-1.5">
  <Label 
    htmlFor="disabled-input" 
    className="text-dark-grey opacity-50"
  >
    Disabled Input
  </Label>
  <Input 
    type="text" 
    id="disabled-input" 
    value="This input cannot be edited"
    disabled 
  />
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Different Input Types */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Input Types</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="text-input">Text Input</Label>
                  <Input 
                    type="text" 
                    id="text-input" 
                    placeholder="Regular text" 
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="password-input">Password Input</Label>
                  <Input 
                    type="password" 
                    id="password-input" 
                    placeholder="Password" 
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="number-input">Number Input</Label>
                  <Input 
                    type="number" 
                    id="number-input" 
                    placeholder="123" 
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="date-input">Date Input</Label>
                  <CBREDatePicker
                    date={date}
                    setDate={setDate}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CBREDatePicker } from "@/components/cbre-date-picker";
import { useState } from "react";

// For date picker
const [date, setDate] = useState<Date | undefined>(undefined);

<div className="grid w-full gap-1.5">
  <Label htmlFor="text-input">Text Input</Label>
  <Input 
    type="text" 
    id="text-input" 
    placeholder="Regular text" 
  />
</div>

<div className="grid w-full gap-1.5">
  <Label htmlFor="password-input">Password Input</Label>
  <Input 
    type="password" 
    id="password-input" 
    placeholder="Password" 
  />
</div>

<div className="grid w-full gap-1.5">
  <Label htmlFor="number-input">Number Input</Label>
  <Input 
    type="number" 
    id="number-input" 
    placeholder="123" 
  />
</div>

<div className="grid w-full gap-1.5">
  <Label htmlFor="date-input">Date Input</Label>
  <CBREDatePicker
    date={date}
    setDate={setDate}
  />
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Form with Inputs */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Form with Inputs</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      placeholder="John" 
                      value={formState.firstName}
                      onChange={handleFormChange}
                    />
                  </div>
                  
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      placeholder="Doe" 
                      value={formState.lastName}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="formEmail">Email</Label>
                  <Input 
                    type="email" 
                    id="formEmail" 
                    name="email"
                    placeholder="john.doe@example.com" 
                    value={formState.email}
                    onChange={handleFormChange}
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="formPassword">Password</Label>
                  <Input 
                    type="password" 
                    id="formPassword" 
                    name="password"
                    placeholder="Enter your password" 
                    value={formState.password}
                    onChange={handleFormChange}
                  />
                </div>
                
                <div className="flex gap-4 justify-end">
                  <CBREButton
                    variant="outline"
                    type="button"
                    onClick={handleClearForm}
                  >
                    Clear Form
                  </CBREButton>
                  
                  <CBREButton
                    variant="primary"
                    type="button"
                    disabled={
                      !formState.firstName || 
                      !formState.lastName || 
                      !formState.email || 
                      !formState.password
                    }
                  >
                    Submit
                  </CBREButton>
                </div>
              </form>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [formState, setFormState] = React.useState({
  firstName: "",
  lastName: "",
  email: "",
  password: ""
});

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormState(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleClearForm = () => {
  setFormState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
};

<form className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="grid w-full gap-1.5">
      <Label htmlFor="firstName">First Name</Label>
      <Input 
        type="text" 
        id="firstName" 
        name="firstName"
        placeholder="John" 
        value={formState.firstName}
        onChange={handleFormChange}
      />
    </div>
    
    {/* Additional form fields */}
  </div>
  
  <div className="flex gap-4 justify-end">
    <CBREButton
      variant="outline"
      type="button"
      onClick={handleClearForm}
    >
      Clear Form
    </CBREButton>
    
    <CBREButton
      variant="primary"
      type="button"
      disabled={!formState.firstName || /* other validations */}
    >
      Submit
    </CBREButton>
  </div>
</form>
`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Input Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Input component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Input</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Input Props</h3>
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