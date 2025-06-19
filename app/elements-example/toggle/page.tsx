"use client";

import React, { useState } from 'react';
import { CBREToggle } from '@/components/cbre-toggle';
import { CBREButton } from '@/components/cbre-button';
import Link from "next/link";



export default function ToggleExamplePage() {
  const [basicToggle, setBasicToggle] = useState(false);
  const [sizeToggleSmall, setSizeToggleSmall] = useState(false);
  const [sizeToggleMedium, setSizeToggleMedium] = useState(true);
  const [sizeToggleLarge, setSizeToggleLarge] = useState(false);
  const [labelToggle, setLabelToggle] = useState(true);
  const [disabledToggle, setDisabledToggle] = useState(true);

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Toggle Component</h1>
        
        {/* Basic Toggle */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Basic Toggle</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="flex items-center gap-6">
              <CBREToggle 
                checked={basicToggle}
                onCheckedChange={setBasicToggle}
              />
              <div className="text-sm text-dark-grey">
                Toggle is {basicToggle ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const [isChecked, setIsChecked] = useState(false);

<CBREToggle 
  checked={isChecked}
  onCheckedChange={setIsChecked}
/>`}
            </pre>
          </div>
        </div>
        
        {/* Sizes */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Toggle Sizes</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <CBREToggle 
                  checked={sizeToggleSmall}
                  onCheckedChange={setSizeToggleSmall}
                  size="sm"
                />
                <div className="text-sm text-dark-grey">
                  Small Toggle
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <CBREToggle 
                  checked={sizeToggleMedium}
                  onCheckedChange={setSizeToggleMedium}
                  size="md"
                />
                <div className="text-sm text-dark-grey">
                  Medium Toggle (default)
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <CBREToggle 
                  checked={sizeToggleLarge}
                  onCheckedChange={setSizeToggleLarge}
                  size="lg"
                />
                <div className="text-sm text-dark-grey">
                  Large Toggle
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Size Variants</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREToggle size="sm" /> // Small
<CBREToggle size="md" /> // Medium (default)
<CBREToggle size="lg" /> // Large`}
            </pre>
          </div>
        </div>
        
        {/* With Label */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Toggle with Label</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="flex items-center gap-6">
              <CBREToggle 
                checked={labelToggle}
                onCheckedChange={setLabelToggle}
                label="Notifications"
                description="Receive email notifications"
              />
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">With Label & Description</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREToggle 
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="Notifications"
  description="Receive email notifications"
/>`}
            </pre>
          </div>
        </div>
        
        {/* Disabled State */}
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Disabled Toggle</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="flex items-center gap-6">
              <CBREToggle 
                checked={disabledToggle}
                disabled={true}
                label="Disabled Toggle"
                description="This toggle cannot be interacted with"
              />
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Disabled State</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREToggle 
  checked={true}
  disabled={true}
  label="Disabled Toggle"
/>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Toggle Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Toggle component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Toggle</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Toggle Props</h3>
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