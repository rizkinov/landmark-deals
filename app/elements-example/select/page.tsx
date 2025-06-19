"use client";

import * as React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CBREButton } from "@/components/cbre-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectExamplePage() {
  // Basic select example state
  const [language, setLanguage] = React.useState("");
  
  // Form with multiple inputs state
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    country: "",
    role: ""
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select value changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear form
  const handleClearForm = () => {
    setFormState({
      name: "",
      email: "",
      country: "",
      role: ""
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

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Select Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Select component provides a way for users to select an option from a dropdown menu. It follows the shadcn/ui composition pattern for a clean implementation.
        </p>
        
        {/* Basic Select Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Select</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="language">Language</Label>
                <Select
                  defaultValue={language}
                  onValueChange={(value) => setLanguage(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-4 text-sm text-dark-grey">
                  Selected language: <span className="font-bold">{language || "(none)"}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const [language, setLanguage] = React.useState("");

<div className="grid w-full gap-1.5">
  <Label htmlFor="language">Language</Label>
  <Select
    defaultValue={language}
    onValueChange={(value) => setLanguage(value)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a language" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="fr">French</SelectItem>
      <SelectItem value="de">German</SelectItem>
      <SelectItem value="es">Spanish</SelectItem>
      <SelectItem value="it">Italian</SelectItem>
    </SelectContent>
  </Select>
</div>`}
            </pre>
          </div>
        </div>
        
        {/* Select with Groups */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Select with Groups</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="region">Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>North America</SelectLabel>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="can">Canada</SelectItem>
                      <SelectItem value="mex">Mexico</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Europe</SelectLabel>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="it">Italy</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Asia Pacific</SelectLabel>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                      <SelectItem value="cn">China</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a region" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="usa">United States</SelectItem>
      <SelectItem value="can">Canada</SelectItem>
      <SelectItem value="mex">Mexico</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="fr">France</SelectItem>
      <SelectItem value="de">Germany</SelectItem>
      <SelectItem value="it">Italy</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Asia Pacific</SelectLabel>
      <SelectItem value="au">Australia</SelectItem>
      <SelectItem value="jp">Japan</SelectItem>
      <SelectItem value="sg">Singapore</SelectItem>
      <SelectItem value="cn">China</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
            </pre>
          </div>
        </div>
        
        {/* Disabled Select */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Disabled Select</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="disabled-select" className="text-dark-grey opacity-50">Disabled Select</Label>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Cannot be changed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Cannot be changed" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`}
            </pre>
          </div>
        </div>
        
        {/* Form with Select */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Form with Select</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name"
                      placeholder="John Doe" 
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      placeholder="john.doe@example.com" 
                      value={formState.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formState.country}
                      onValueChange={(value) => handleSelectChange('country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formState.role}
                      onValueChange={(value) => handleSelectChange('role', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                      !formState.name || 
                      !formState.email || 
                      !formState.country || 
                      !formState.role
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
{`// Form state
const [formState, setFormState] = React.useState({
  name: "",
  email: "",
  country: "",
  role: ""
});

// Handle select value changes
const handleSelectChange = (name: string, value: string) => {
  setFormState(prev => ({
    ...prev,
    [name]: value
  }));
};

<div className="grid w-full gap-1.5">
  <Label htmlFor="country">Country</Label>
  <Select
    value={formState.country}
    onValueChange={(value) => handleSelectChange('country', value)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
      <SelectItem value="fr">France</SelectItem>
      <SelectItem value="de">Germany</SelectItem>
    </SelectContent>
  </Select>
</div>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Select Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Select component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Select</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Select Props</h3>
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