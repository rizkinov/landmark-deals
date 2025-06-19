"use client";

import React from 'react';
import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Checkbox, CheckboxGroup } from '@/components/cbre-checkbox';
import { CBREButton } from '@/components/cbre-button';
import { type CheckedState } from "@radix-ui/react-checkbox";


export default function CheckboxExamplePage() {
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [newsletterOptions, setNewsletterOptions] = React.useState({
    updates: false,
    marketing: false,
    partner: false
  });
  
  const [sidebarItems, setSidebarItems] = React.useState({
    recents: true,
    home: true,
    applications: false,
    desktop: false,
    downloads: true,
    documents: false
  });

  const handleCheckedChange = (checked: CheckedState) => {
    setAcceptTerms(checked === true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Checkbox Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The CBRE Checkbox component provides a control that allows users to select multiple options from a set or to mark an option as checked.
        </p>
        
        {/* Basic Checkbox Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Checkbox</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <Checkbox id="basic-checkbox" />
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Checkbox } from '@/components/ui/checkbox';

<Checkbox id="basic-checkbox" />
`}
            </pre>
          </div>
        </div>
        
        {/* Checkbox with Label */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Checkbox with Label</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms-checkbox" 
                    className="mt-1"
                    checked={acceptTerms}
                    onCheckedChange={handleCheckedChange}
                  />
                  <Label 
                    htmlFor="terms-checkbox"
                    className="text-sm font-calibre text-dark-grey cursor-pointer"
                  >
                    Accept terms and conditions
                  </Label>
                </div>
                <p className="mt-2 text-sm text-dark-grey">
                  Current state: <span className="font-bold">{acceptTerms ? 'Checked ✓' : 'Unchecked ✗'}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { type CheckedState } from "@radix-ui/react-checkbox";

const [acceptTerms, setAcceptTerms] = React.useState(false);

const handleCheckedChange = (checked: CheckedState) => {
  setAcceptTerms(checked === true);
};

<div className="flex items-start space-x-2">
  <Checkbox 
    id="terms-checkbox" 
    className="mt-1"
    checked={acceptTerms}
    onCheckedChange={handleCheckedChange}
  />
  <Label 
    htmlFor="terms-checkbox"
    className="text-sm font-calibre text-dark-grey cursor-pointer"
  >
    Accept terms and conditions
  </Label>
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Checkbox with Description */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Checkbox with Description</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms-with-desc" 
                  className="mt-1"
                  checked={acceptTerms}
                  onCheckedChange={handleCheckedChange}
                />
                <div className="grid gap-0.5">
                  <Label 
                    htmlFor="terms-with-desc"
                    className="text-sm font-calibre text-dark-grey cursor-pointer"
                  >
                    Accept terms and conditions
                  </Label>
                  <p className="text-xs font-calibre text-light-grey">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<div className="flex items-start space-x-2">
  <Checkbox 
    id="terms-with-desc" 
    className="mt-1"
    checked={acceptTerms}
    onCheckedChange={handleCheckedChange}
  />
  <div className="grid gap-0.5">
    <Label 
      htmlFor="terms-with-desc"
      className="text-sm font-calibre text-dark-grey cursor-pointer"
    >
      Accept terms and conditions
    </Label>
    <p className="text-xs font-calibre text-light-grey">
      You agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Disabled Checkbox */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Disabled Checkbox</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="disabled-checkbox" 
                  className="mt-1"
                  disabled 
                />
                <Label 
                  htmlFor="disabled-checkbox"
                  className="text-sm font-calibre text-dark-grey opacity-50 cursor-not-allowed"
                >
                  Accept terms and conditions
                </Label>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<div className="flex items-start space-x-2">
  <Checkbox 
    id="disabled-checkbox" 
    className="mt-1"
    disabled 
  />
  <Label 
    htmlFor="disabled-checkbox"
    className="text-sm font-calibre text-dark-grey opacity-50 cursor-not-allowed"
  >
    Accept terms and conditions
  </Label>
</div>
`}
            </pre>
          </div>
        </div>
        
        {/* Checkbox Group: Newsletter */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Checkbox Group: Newsletter</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <CheckboxGroup
                title="Newsletter preferences"
                description="Select the types of newsletters you'd like to receive"
              >
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="updates-checkbox" 
                    className="mt-1"
                    checked={newsletterOptions.updates}
                    onCheckedChange={(checked: CheckedState) => 
                      setNewsletterOptions(prev => ({ ...prev, updates: checked === true }))
                    }
                  />
                  <div className="grid gap-0.5">
                    <Label 
                      htmlFor="updates-checkbox"
                      className="text-sm font-calibre text-dark-grey"
                    >
                      Product updates
                    </Label>
                    <p className="text-xs font-calibre text-light-grey">
                      Receive notifications about new features and improvements
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="marketing-checkbox" 
                    className="mt-1"
                    checked={newsletterOptions.marketing}
                    onCheckedChange={(checked: CheckedState) => 
                      setNewsletterOptions(prev => ({ ...prev, marketing: checked === true }))
                    }
                  />
                  <div className="grid gap-0.5">
                    <Label 
                      htmlFor="marketing-checkbox"
                      className="text-sm font-calibre text-dark-grey"
                    >
                      Marketing communications
                    </Label>
                    <p className="text-xs font-calibre text-light-grey">
                      Receive special offers, promotions, and marketing emails
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="partner-checkbox" 
                    className="mt-1"
                    checked={newsletterOptions.partner}
                    onCheckedChange={(checked: CheckedState) => 
                      setNewsletterOptions(prev => ({ ...prev, partner: checked === true }))
                    }
                  />
                  <div className="grid gap-0.5">
                    <Label 
                      htmlFor="partner-checkbox"
                      className="text-sm font-calibre text-dark-grey"
                    >
                      Partner offers
                    </Label>
                    <p className="text-xs font-calibre text-light-grey">
                      Receive offers from our trusted partners
                    </p>
                  </div>
                </div>
              </CheckboxGroup>
              
              <div className="pt-4 mt-4">
                <CBREButton variant="primary" size="sm">Save Preferences</CBREButton>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Checkbox, CheckboxGroup } from '@/components/cbre-checkbox';
import { Label } from '@/components/ui/label';
import { type CheckedState } from "@radix-ui/react-checkbox";

const [newsletterOptions, setNewsletterOptions] = React.useState({
  updates: false,
  marketing: false,
  partner: false
});

<CheckboxGroup
  title="Newsletter preferences"
  description="Select the types of newsletters you'd like to receive"
>
  <div className="flex items-start space-x-2">
    <Checkbox 
      id="updates-checkbox" 
      className="mt-1"
      checked={newsletterOptions.updates}
      onCheckedChange={(checked: CheckedState) => 
        setNewsletterOptions(prev => ({ ...prev, updates: checked === true }))
      }
    />
    <div className="grid gap-0.5">
      <Label 
        htmlFor="updates-checkbox"
        className="text-sm font-calibre text-dark-grey"
      >
        Product updates
      </Label>
      <p className="text-xs font-calibre text-light-grey">
        Receive notifications about new features and improvements
      </p>
    </div>
  </div>
  
  <div className="flex items-start space-x-2">
    <Checkbox 
      id="marketing-checkbox" 
      className="mt-1"
      checked={newsletterOptions.marketing}
      onCheckedChange={(checked: CheckedState) => 
        setNewsletterOptions(prev => ({ ...prev, marketing: checked === true }))
      }
    />
    <div className="grid gap-0.5">
      <Label 
        htmlFor="marketing-checkbox"
        className="text-sm font-calibre text-dark-grey"
      >
        Marketing communications
      </Label>
      <p className="text-xs font-calibre text-light-grey">
        Receive special offers, promotions, and marketing emails
      </p>
    </div>
  </div>
  
  <div className="flex items-start space-x-2">
    <Checkbox 
      id="partner-checkbox" 
      className="mt-1"
      checked={newsletterOptions.partner}
      onCheckedChange={(checked: CheckedState) => 
        setNewsletterOptions(prev => ({ ...prev, partner: checked === true }))
      }
    />
    <div className="grid gap-0.5">
      <Label 
        htmlFor="partner-checkbox"
        className="text-sm font-calibre text-dark-grey"
      >
        Partner offers
      </Label>
      <p className="text-xs font-calibre text-light-grey">
        Receive offers from our trusted partners
      </p>
    </div>
  </div>
</CheckboxGroup>
`}
            </pre>
          </div>
        </div>
        
        {/* Checkbox Group: Sidebar Items */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Checkbox Group: Sidebar Items</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <CheckboxGroup
                title="Sidebar"
                description="Select the items you want to display in the sidebar"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(sidebarItems).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${key}-checkbox`}
                        checked={value}
                        onCheckedChange={(checked: CheckedState) => 
                          setSidebarItems(prev => ({ 
                            ...prev, 
                            [key]: checked === true 
                          }))
                        }
                      />
                      <Label 
                        htmlFor={`${key}-checkbox`}
                        className="text-sm font-calibre text-dark-grey"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </CheckboxGroup>
              
              <div className="pt-4 mt-4">
                <CBREButton variant="primary" size="sm">Apply Changes</CBREButton>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CheckboxGroup
  title="Sidebar"
  description="Select the items you want to display in the sidebar"
>
  <div className="grid md:grid-cols-2 gap-4">
    {Object.entries(sidebarItems).map(([key, value]) => (
      <div key={key} className="flex items-center space-x-2">
        <Checkbox 
          id={\`\${key}-checkbox\`}
          checked={value}
          onCheckedChange={(checked: CheckedState) => 
            setSidebarItems(prev => ({ 
              ...prev, 
              [key]: checked === true 
            }))
          }
        />
        <Label 
          htmlFor={\`\${key}-checkbox\`}
          className="text-sm font-calibre text-dark-grey"
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Label>
      </div>
    ))}
  </div>
</CheckboxGroup>
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Checkbox Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Checkbox component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Checkbox</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Checkbox Props</h3>
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