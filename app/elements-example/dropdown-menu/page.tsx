"use client";

import React, { useState } from 'react';
import { CBREDropdownMenu, CBREDropdownMenuItemType } from '@/components/cbre-dropdown-menu';
import { CBREButton } from '@/components/cbre-button';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export default function DropdownMenuPage() {
  // State for the examples
  const [checkedItems, setCheckedItems] = useState({
    item1: true,
    item2: false,
    item3: false,
  });
  
  const [selectedSize, setSelectedSize] = useState("medium");
  
  // Basic menu items
  const basicItems: CBREDropdownMenuItemType[] = [
    { type: "item", label: "Edit", onClick: () => console.log("Edit clicked") },
    { type: "item", label: "Duplicate", onClick: () => console.log("Duplicate clicked") },
    { type: "item", label: "Delete", variant: "destructive", onClick: () => console.log("Delete clicked") },
    { type: "separator" },
    { type: "item", label: "Archive", onClick: () => console.log("Archive clicked") },
  ];
  
  // Checkbox menu items
  const checkboxItems: CBREDropdownMenuItemType[] = [
    { type: "label", label: "Selection Options" },
    { 
      type: "checkbox", 
      label: "Option 1", 
      checked: checkedItems.item1, 
      onCheckedChange: (checked) => setCheckedItems({...checkedItems, item1: checked}) 
    },
    { 
      type: "checkbox", 
      label: "Option 2", 
      checked: checkedItems.item2, 
      onCheckedChange: (checked) => setCheckedItems({...checkedItems, item2: checked}) 
    },
    { 
      type: "checkbox", 
      label: "Option 3", 
      checked: checkedItems.item3, 
      onCheckedChange: (checked) => setCheckedItems({...checkedItems, item3: checked}) 
    },
  ];
  
  // Radio menu items
  const radioItems: CBREDropdownMenuItemType[] = [
    { type: "label", label: "Size Selection" },
    { type: "radio", label: "Small", value: "small" },
    { type: "radio", label: "Medium", value: "medium" },
    { type: "radio", label: "Large", value: "large" },
    { type: "radio", label: "Extra Large", value: "xlarge" },
  ];
  
  // Submenu items
  const submenuItems: CBREDropdownMenuItemType[] = [
    { type: "item", label: "Main Action", onClick: () => console.log("Main Action clicked") },
    { type: "separator" },
    { 
      type: "submenu", 
      label: "More Options", 
      items: [
        { type: "item", label: "Sub Option 1", onClick: () => console.log("Sub Option 1 clicked") },
        { type: "item", label: "Sub Option 2", onClick: () => console.log("Sub Option 2 clicked") },
        { 
          type: "submenu", 
          label: "Nested Options", 
          items: [
            { type: "item", label: "Nested 1", onClick: () => console.log("Nested 1 clicked") },
            { type: "item", label: "Nested 2", onClick: () => console.log("Nested 2 clicked") },
          ]
        },
      ]
    },
    { 
      type: "submenu", 
      label: "Advanced", 
      items: [
        { type: "item", label: "Advanced 1", onClick: () => console.log("Advanced 1 clicked") },
        { type: "item", label: "Advanced 2", onClick: () => console.log("Advanced 2 clicked") },
      ]
    },
  ];
  
  // Combined items for a comprehensive example
  const combinedItems: CBREDropdownMenuItemType[] = [
    { type: "label", label: "Account Actions" },
    { type: "item", label: "Profile", onClick: () => console.log("Profile clicked") },
    { type: "item", label: "Settings", onClick: () => console.log("Settings clicked") },
    { type: "separator" },
    { type: "label", label: "Theme" },
    { type: "radio", label: "Light", value: "light" },
    { type: "radio", label: "Dark", value: "dark" },
    { type: "radio", label: "System", value: "system" },
    { type: "separator" },
    { 
      type: "checkbox", 
      label: "Notifications", 
      checked: true, 
      onCheckedChange: (checked) => console.log("Notifications:", checked) 
    },
    { type: "separator" },
    { type: "item", label: "Logout", variant: "destructive", onClick: () => console.log("Logout clicked") },
  ];
  
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Dropdown Menu Component</h1>
        
        <div className="space-y-16">
          {/* Basic Dropdown */}
          <div>
            <h2 className="text-xl font-financier text-cbre-green mb-5">Basic Dropdown Menu</h2>
            <div className="bg-[var(--lighter-grey)] p-8">
              <div className="flex items-center gap-6">
                <div className="w-48">
                  <CBREDropdownMenu 
                    trigger="File Actions" 
                    items={basicItems}
                  />
                </div>
                <div className="text-sm text-dark-grey">
                  Simple dropdown menu with basic actions and a separator
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-light-grey mt-6">
              <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const basicItems = [
  { type: "item", label: "Edit", onClick: () => console.log("Edit clicked") },
  { type: "item", label: "Duplicate", onClick: () => console.log("Duplicate clicked") },
  { type: "item", label: "Delete", variant: "destructive", onClick: () => console.log("Delete clicked") },
  { type: "separator" },
  { type: "item", label: "Archive", onClick: () => console.log("Archive clicked") },
];

<CBREDropdownMenu 
  trigger="File Actions" 
  items={basicItems}
/>`}
              </pre>
            </div>
          </div>
          
          {/* Checkbox Dropdown */}
          <div>
            <h2 className="text-xl font-financier text-cbre-green mb-5">Checkbox Dropdown Menu</h2>
            <div className="bg-[var(--lighter-grey)] p-8">
              <div className="flex items-center gap-6">
                <div className="w-48">
                  <CBREDropdownMenu 
                    trigger="Selection Options" 
                    items={checkboxItems}
                  />
                </div>
                <div className="text-sm text-dark-grey">
                  Selected options: {Object.entries(checkedItems)
                    .filter(([_, checked]) => checked)
                    .map(([key]) => key.replace('item', 'Option '))
                    .join(', ') || 'None'}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-light-grey mt-6">
              <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [checkedItems, setCheckedItems] = useState({
  item1: true,
  item2: false,
  item3: false,
});

const checkboxItems = [
  { type: "label", label: "Selection Options" },
  { 
    type: "checkbox", 
    label: "Option 1", 
    checked: checkedItems.item1, 
    onCheckedChange: (checked) => setCheckedItems({...checkedItems, item1: checked}) 
  },
  { 
    type: "checkbox", 
    label: "Option 2", 
    checked: checkedItems.item2, 
    onCheckedChange: (checked) => setCheckedItems({...checkedItems, item2: checked}) 
  },
  { 
    type: "checkbox", 
    label: "Option 3", 
    checked: checkedItems.item3, 
    onCheckedChange: (checked) => setCheckedItems({...checkedItems, item3: checked}) 
  },
];

<CBREDropdownMenu 
  trigger="Selection Options" 
  items={checkboxItems}
/>`}
              </pre>
            </div>
          </div>
          
          {/* Radio Dropdown */}
          <div>
            <h2 className="text-xl font-financier text-cbre-green mb-5">Radio Dropdown Menu</h2>
            <div className="bg-[var(--lighter-grey)] p-8">
              <div className="flex items-center gap-6">
                <div className="w-48">
                  <CBREDropdownMenu 
                    trigger="Size Selection" 
                    items={radioItems}
                    radioValue={selectedSize}
                    onRadioValueChange={setSelectedSize}
                  />
                </div>
                <div className="text-sm text-dark-grey">
                  Selected size: {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-light-grey mt-6">
              <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [selectedSize, setSelectedSize] = useState("medium");

const radioItems = [
  { type: "label", label: "Size Selection" },
  { type: "radio", label: "Small", value: "small" },
  { type: "radio", label: "Medium", value: "medium" },
  { type: "radio", label: "Large", value: "large" },
  { type: "radio", label: "Extra Large", value: "xlarge" },
];

<CBREDropdownMenu 
  trigger="Size Selection" 
  items={radioItems}
  radioValue={selectedSize}
  onRadioValueChange={setSelectedSize}
/>`}
              </pre>
            </div>
          </div>
          
          {/* Submenu Dropdown */}
          <div>
            <h2 className="text-xl font-financier text-cbre-green mb-5">Submenu Dropdown</h2>
            <div className="bg-[var(--lighter-grey)] p-8">
              <div className="flex items-center gap-6">
                <div className="w-48">
                  <CBREDropdownMenu 
                    trigger="Menu with Submenus" 
                    items={submenuItems}
                  />
                </div>
                <div className="text-sm text-dark-grey">
                  Dropdown with nested submenus for hierarchical options
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Trigger */}
          <div>
            <h2 className="text-xl font-financier text-cbre-green mb-5">Custom Trigger</h2>
            <div className="bg-[var(--lighter-grey)] p-8">
              <div className="flex items-center gap-6">
                <div>
                  <CBREDropdownMenu 
                    trigger={
                      <CBREButton variant="primary" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </CBREButton>
                    } 
                    items={combinedItems}
                    align="end"
                  />
                </div>
                <div className="text-sm text-dark-grey">
                  Dropdown with a custom button trigger and comprehensive menu items
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-light-grey mt-6">
              <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREDropdownMenu 
  trigger={
    <CBREButton variant="primary" className="flex items-center gap-2">
      <Settings className="h-4 w-4" />
      Settings
    </CBREButton>
  } 
  items={combinedItems}
  align="end"
/>`}
              </pre>
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
                  <h3 className="text-xl font-calibre font-medium mb-3">DropdownMenu Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The DropdownMenu component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">DropdownMenu</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">DropdownMenu Props</h3>
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