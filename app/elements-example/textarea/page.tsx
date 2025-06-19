"use client";

import * as React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CBREButton } from "@/components/cbre-button";

export default function TextareaExamplePage() {
  // Basic textarea example
  const [value, setValue] = React.useState("");
  
  // Form with multiple inputs state
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Handle basic textarea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form textarea changes
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
      message: ""
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

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Textarea Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Textarea component provides a way for users to input multi-line text. It follows the shadcn/ui composition pattern for clean integration.
        </p>
        
        {/* Basic Textarea Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Textarea</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <Textarea
                placeholder="Type your message here."
                value={value}
                onChange={handleChange}
              />
              <p className="mt-4 text-sm text-dark-grey">
                Character count: <span className="font-bold">{value.length}</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Textarea } from "@/components/ui/textarea";

const [value, setValue] = React.useState("");

const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setValue(e.target.value);
};

<Textarea
  placeholder="Type your message here."
  value={value}
  onChange={handleChange}
/>
`}
            </pre>
          </div>
        </div>
        
        {/* Textarea with Label */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Textarea with Label</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Your message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here."
                  rows={5}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea
    id="message"
    placeholder="Type your message here."
    rows={5}
  />
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Disabled Textarea */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Disabled Textarea</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="grid w-full gap-1.5">
                <Label 
                  htmlFor="disabled-textarea" 
                  className="text-dark-grey opacity-50"
                >
                  Disabled Textarea
                </Label>
                <Textarea
                  id="disabled-textarea"
                  placeholder="This textarea cannot be edited"
                  disabled
                  value="This content cannot be edited because the textarea is disabled."
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Textarea
  id="disabled-textarea"
  placeholder="This textarea cannot be edited"
  disabled
  value="This content cannot be edited because the textarea is disabled."
/>
`}
            </pre>
          </div>
        </div>
        
        {/* Form with Textarea */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Form with Textarea</h2>
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
                
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here."
                    rows={6}
                    value={formState.message}
                    onChange={handleTextareaChange}
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
                      !formState.name || 
                      !formState.email || 
                      !formState.message
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
  name: "",
  email: "",
  message: ""
});

const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormState(prev => ({
    ...prev,
    [name]: value
  }));
};

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    name="message"
    placeholder="Type your message here."
    rows={6}
    value={formState.message}
    onChange={handleTextareaChange}
  />
</div>
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Textarea Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Textarea component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Textarea</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Textarea Props</h3>
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