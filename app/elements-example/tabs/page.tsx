"use client";

import React from 'react';
import { 
  CBRETabs, 
  CBRETabsList, 
  CBRETabsTrigger, 
  CBRETabsContent 
} from '@/components/cbre-tabs';
import { CBREButton } from '@/components/cbre-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";



export default function TabsExamplePage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Tabs Component</h1>
        
        {/* Basic Tabs Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Tabs</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <CBRETabs defaultValue="account">
              <CBRETabsList>
                <CBRETabsTrigger value="account">Account</CBRETabsTrigger>
                <CBRETabsTrigger value="password">Password</CBRETabsTrigger>
                <CBRETabsTrigger value="settings">Settings</CBRETabsTrigger>
              </CBRETabsList>
              <CBRETabsContent value="account">
                <div className="bg-white p-6 border border-light-grey">
                  <h3 className="text-xl font-financier text-cbre-green mb-3">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        type="text" 
                        id="name"
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        type="email" 
                        id="email"
                        placeholder="john.doe@example.com" 
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <CBREButton variant="outline">Cancel</CBREButton>
                      <CBREButton variant="primary">Save Changes</CBREButton>
                    </div>
                  </div>
                </div>
              </CBRETabsContent>
              <CBRETabsContent value="password">
                <div className="bg-white p-6 border border-light-grey">
                  <h3 className="text-xl font-financier text-cbre-green mb-3">Password Settings</h3>
                  <div className="space-y-6">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        type="password" 
                        id="current-password"
                        placeholder="••••••••" 
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        type="password" 
                        id="new-password"
                        placeholder="••••••••" 
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input 
                        type="password" 
                        id="confirm-password"
                        placeholder="••••••••" 
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <CBREButton variant="outline">Cancel</CBREButton>
                      <CBREButton variant="primary">Update Password</CBREButton>
                    </div>
                  </div>
                </div>
              </CBRETabsContent>
              <CBRETabsContent value="settings">
                <div className="bg-white p-6 border border-light-grey">
                  <h3 className="text-xl font-financier text-cbre-green mb-3">General Settings</h3>
                  <div className="space-y-6">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <div className="flex justify-end gap-4">
                      <CBREButton variant="outline">Cancel</CBREButton>
                      <CBREButton variant="primary">Save Settings</CBREButton>
                    </div>
                  </div>
                </div>
              </CBRETabsContent>
            </CBRETabs>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRETabs defaultValue="account">
  <CBRETabsList>
    <CBRETabsTrigger value="account">Account</CBRETabsTrigger>
    <CBRETabsTrigger value="password">Password</CBRETabsTrigger>
    <CBRETabsTrigger value="settings">Settings</CBRETabsTrigger>
  </CBRETabsList>
  <CBRETabsContent value="account">
    Account settings content
  </CBRETabsContent>
  <CBRETabsContent value="password">
    Password settings content
  </CBRETabsContent>
  <CBRETabsContent value="settings">
    General settings content
  </CBRETabsContent>
</CBRETabs>`}
            </pre>
          </div>
        </div>
        
        {/* Tab Variants */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Tab Variants</h2>
          
          <div className="space-y-12">
            {/* Underline Variant */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Underline Variant (Default)</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <CBRETabs defaultValue="overview" variant="underline">
                  <CBRETabsList variant="underline">
                    <CBRETabsTrigger value="overview" variant="underline">Overview</CBRETabsTrigger>
                    <CBRETabsTrigger value="features" variant="underline">Features</CBRETabsTrigger>
                    <CBRETabsTrigger value="specifications" variant="underline">Specifications</CBRETabsTrigger>
                  </CBRETabsList>
                  <CBRETabsContent value="overview">
                    <div className="p-4 font-calibre">
                      <p>This is the overview content. The underline variant uses a bottom border to indicate the active tab.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="features">
                    <div className="p-4 font-calibre">
                      <p>Features content goes here.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="specifications">
                    <div className="p-4 font-calibre">
                      <p>Specifications content goes here.</p>
                    </div>
                  </CBRETabsContent>
                </CBRETabs>
              </div>
            </div>
            
            {/* Boxed Variant */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Boxed Variant</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <CBRETabs defaultValue="overview" variant="boxed">
                  <CBRETabsList variant="boxed">
                    <CBRETabsTrigger value="overview" variant="boxed">Overview</CBRETabsTrigger>
                    <CBRETabsTrigger value="features" variant="boxed">Features</CBRETabsTrigger>
                    <CBRETabsTrigger value="specifications" variant="boxed">Specifications</CBRETabsTrigger>
                  </CBRETabsList>
                  <CBRETabsContent value="overview">
                    <div className="p-4 font-calibre">
                      <p>This is the overview content. The boxed variant uses a background color and border to indicate the active tab.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="features">
                    <div className="p-4 font-calibre">
                      <p>Features content goes here.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="specifications">
                    <div className="p-4 font-calibre">
                      <p>Specifications content goes here.</p>
                    </div>
                  </CBRETabsContent>
                </CBRETabs>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Variant Usage</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Underline variant (default)
<CBRETabs defaultValue="tab1" variant="underline">
  <CBRETabsList variant="underline">
    <CBRETabsTrigger value="tab1" variant="underline">Tab 1</CBRETabsTrigger>
    <!-- Other tabs -->
  </CBRETabsList>
  <!-- Tab content -->
</CBRETabs>

// Boxed variant
<CBRETabs defaultValue="tab1" variant="boxed">
  <CBRETabsList variant="boxed">
    <CBRETabsTrigger value="tab1" variant="boxed">Tab 1</CBRETabsTrigger>
    <!-- Other tabs -->
  </CBRETabsList>
  <!-- Tab content -->
</CBRETabs>`}
            </pre>
          </div>
        </div>
        
        {/* Size Variants */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Size Variants</h2>
          
          <div className="space-y-12">
            {/* Small Size */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Small Size</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <CBRETabs defaultValue="tab1" size="sm">
                  <CBRETabsList size="sm">
                    <CBRETabsTrigger value="tab1" size="sm">Tab 1</CBRETabsTrigger>
                    <CBRETabsTrigger value="tab2" size="sm">Tab 2</CBRETabsTrigger>
                    <CBRETabsTrigger value="tab3" size="sm">Tab 3</CBRETabsTrigger>
                  </CBRETabsList>
                  <CBRETabsContent value="tab1">
                    <div className="p-4 font-calibre">
                      <p>Content for small size tabs.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="tab2">
                    <div className="p-4 font-calibre">
                      <p>Tab 2 content.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="tab3">
                    <div className="p-4 font-calibre">
                      <p>Tab 3 content.</p>
                    </div>
                  </CBRETabsContent>
                </CBRETabs>
              </div>
            </div>
            
            {/* Medium Size (Default) */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Medium Size (Default)</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <CBRETabs defaultValue="tab1" size="md">
                  <CBRETabsList size="md">
                    <CBRETabsTrigger value="tab1" size="md">Tab 1</CBRETabsTrigger>
                    <CBRETabsTrigger value="tab2" size="md">Tab 2</CBRETabsTrigger>
                    <CBRETabsTrigger value="tab3" size="md">Tab 3</CBRETabsTrigger>
                  </CBRETabsList>
                  <CBRETabsContent value="tab1">
                    <div className="p-4 font-calibre">
                      <p>Content for medium size tabs.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="tab2">
                    <div className="p-4 font-calibre">
                      <p>Tab 2 content.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="tab3">
                    <div className="p-4 font-calibre">
                      <p>Tab 3 content.</p>
                    </div>
                  </CBRETabsContent>
                </CBRETabs>
              </div>
            </div>
            
            {/* Large Size */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Large Size</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <CBRETabs defaultValue="tab1" size="lg">
                  <CBRETabsList size="lg">
                    <CBRETabsTrigger value="tab1" size="lg">Tab 1</CBRETabsTrigger>
                    <CBRETabsTrigger value="tab2" size="lg">Tab 2</CBRETabsTrigger>
                    <CBRETabsTrigger value="tab3" size="lg">Tab 3</CBRETabsTrigger>
                  </CBRETabsList>
                  <CBRETabsContent value="tab1">
                    <div className="p-4 font-calibre">
                      <p>Content for large size tabs.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="tab2">
                    <div className="p-4 font-calibre">
                      <p>Tab 2 content.</p>
                    </div>
                  </CBRETabsContent>
                  <CBRETabsContent value="tab3">
                    <div className="p-4 font-calibre">
                      <p>Tab 3 content.</p>
                    </div>
                  </CBRETabsContent>
                </CBRETabs>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Size Variations</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Small size
<CBRETabs defaultValue="tab1" size="sm">
  <CBRETabsList size="sm">
    <CBRETabsTrigger value="tab1" size="sm">Tab 1</CBRETabsTrigger>
    <!-- Other tabs -->
  </CBRETabsList>
  <!-- Tab content -->
</CBRETabs>

// Medium size (default)
<CBRETabs defaultValue="tab1" size="md">
  <CBRETabsList size="md">
    <CBRETabsTrigger value="tab1" size="md">Tab 1</CBRETabsTrigger>
    <!-- Other tabs -->
  </CBRETabsList>
  <!-- Tab content -->
</CBRETabs>

// Large size
<CBRETabs defaultValue="tab1" size="lg">
  <CBRETabsList size="lg">
    <CBRETabsTrigger value="tab1" size="lg">Tab 1</CBRETabsTrigger>
    <!-- Other tabs -->
  </CBRETabsList>
  <!-- Tab content -->
</CBRETabs>`}
            </pre>
          </div>
        </div>
        
        {/* Disabled Tabs */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Disabled Tabs</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <CBRETabs defaultValue="tab1">
              <CBRETabsList>
                <CBRETabsTrigger value="tab1">Active Tab</CBRETabsTrigger>
                <CBRETabsTrigger value="tab2" disabled>Disabled Tab</CBRETabsTrigger>
                <CBRETabsTrigger value="tab3">Another Tab</CBRETabsTrigger>
              </CBRETabsList>
              <CBRETabsContent value="tab1">
                <div className="p-4 font-calibre">
                  <p>This example shows how to create a disabled tab that cannot be clicked.</p>
                </div>
              </CBRETabsContent>
              <CBRETabsContent value="tab2">
                <div className="p-4 font-calibre">
                  <p>This content won't be accessible due to the disabled tab.</p>
                </div>
              </CBRETabsContent>
              <CBRETabsContent value="tab3">
                <div className="p-4 font-calibre">
                  <p>Third tab content.</p>
                </div>
              </CBRETabsContent>
            </CBRETabs>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Disabled Tab Example</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRETabs defaultValue="tab1">
  <CBRETabsList>
    <CBRETabsTrigger value="tab1">Active Tab</CBRETabsTrigger>
    <CBRETabsTrigger value="tab2" disabled>Disabled Tab</CBRETabsTrigger>
    <CBRETabsTrigger value="tab3">Another Tab</CBRETabsTrigger>
  </CBRETabsList>
  <!-- Tab content -->
</CBRETabs>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Tabs Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Tabs component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Tabs</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Tabs Props</h3>
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