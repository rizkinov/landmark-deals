"use client";

import React, { useEffect, useState } from 'react';
import { CBRESeparator } from '@/components/cbre-separator';
import { CBREButton } from '@/components/cbre-button';
import Link from "next/link";



export default function SeparatorExamplePage() {
  // State to force re-render after initial mount
  const [mounted, setMounted] = useState(false);
  const [key, setKey] = useState(0);

  // Force a re-render after the component mounts
  useEffect(() => {
    setMounted(true);
    // Use a short timeout to ensure the styles are applied after navigation
    const timer = setTimeout(() => {
      setKey(1); // Change key to force recreation of components
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white p-10">
      <style jsx global>{`
        [data-slot="separator-root"] {
          background-color: #003F2D !important;
          opacity: 1 !important;
          display: block !important;
          border-radius: 0 !important;
          margin: 16px 0 !important;
          animation: none !important;
          transition: none !important;
          contain: none !important;
        }
        
        /* Reset any transition effects */
        *, *::before, *::after {
          transition: none !important;
          animation: none !important;
        }
        
        /* Force layout recalculation */
        html body {
          contain: none !important;
        }
        
        [data-slot="separator-root"][data-orientation="horizontal"] {
          height: 4px !important;
          min-height: 4px !important;
        }
        
        [data-slot="separator-root"][data-orientation="vertical"] {
          width: 4px !important;
          min-width: 4px !important;
          margin-left: 32px !important;
          margin-right: 32px !important;
          height: 100% !important;
        }
        
        [data-slot="separator-root"].thin {
          height: 2px !important;
          min-height: 2px !important;
        }
        
        [data-slot="separator-root"].thick {
          height: 6px !important;
          min-height: 6px !important;
        }
        
        [data-slot="separator-root"].accent {
          background-color: #17E88F !important;
        }
        
        /* Color overrides - need to be more specific than variant */
        [data-slot="separator-root"][data-color="negative-red"] {
          background-color: #AD2A2A !important;
        }
        
        /* Custom styling overrides */
        [data-slot="separator-root"].w-1\/2 {
          width: 50% !important;
          max-width: 50% !important;
          margin-left: 0 !important;
        }
        
        /* Custom margin styling */
        [data-slot="separator-root"].!my-16 {
          margin-top: 4rem !important;
          margin-bottom: 4rem !important;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Separator Component</h1>
        
        {/* Basic Separator Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Separator</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="space-y-8">
              <div>
                <p className="font-calibre mb-4">This is a paragraph of text above the separator.</p>
                <CBRESeparator />
                <p className="font-calibre mt-4">This is a paragraph of text below the separator.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<p>This is a paragraph of text above the separator.</p>
<CBRESeparator />
<p>This is a paragraph of text below the separator.</p>`}
            </pre>
          </div>
        </div>
        
        {/* Separator Variants */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Separator Variants</h2>
          
          <div className="space-y-12">
            {/* Default Variant */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Default Variant</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <p className="font-calibre mb-4">Default separator with 4px height.</p>
                <CBRESeparator />
                <p className="font-calibre mt-4">Text after the separator.</p>
              </div>
            </div>
            
            {/* Thin Variant */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Thin Variant</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <p className="font-calibre mb-4">Thin separator with 2px height.</p>
                <CBRESeparator variant="thin" />
                <p className="font-calibre mt-4">Text after the separator.</p>
              </div>
            </div>
            
            {/* Thick Variant */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Thick Variant</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <p className="font-calibre mb-4">Thick separator with 6px height.</p>
                <CBRESeparator variant="thick" />
                <p className="font-calibre mt-4">Text after the separator.</p>
              </div>
            </div>
            
            {/* Accent Variant */}
            <div>
              <h3 className="text-xl font-financier text-cbre-green mb-3">Accent Variant</h3>
              <div className="bg-[var(--lighter-grey)] p-8">
                <p className="font-calibre mb-4">Accent separator with CBRE accent green color.</p>
                <CBRESeparator variant="accent" />
                <p className="font-calibre mt-4">Text after the separator.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Variant Usage</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Default separator
<CBRESeparator variant="default" />

// Thin separator
<CBRESeparator variant="thin" />

// Thick separator
<CBRESeparator variant="thick" />

// Accent separator with CBRE accent green color
<CBRESeparator variant="accent" />`}
            </pre>
          </div>
        </div>
        
        {/* Vertical Separator */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Vertical Separator</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="flex h-20 items-center">
              <div className="w-20 text-dark-grey">Content Left</div>
              <CBRESeparator orientation="vertical" className="h-10" />
              <div className="text-dark-grey">Content Right</div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Vertical Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<div className="flex h-20 items-center">
  <div>Content Left</div>
  <CBRESeparator orientation="vertical" className="h-10" />
  <div>Content Right</div>
</div>`}
            </pre>
          </div>
        </div>
        
        {/* Decorative and Non-decorative Separators */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Decorative vs Non-decorative</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-calibre mb-2">Decorative Separator (default)</h4>
                <p className="font-calibre mb-4">Used for visual separation only, not for semantic separation.</p>
                <CBRESeparator decorative={true} />
              </div>
              
              <div>
                <h4 className="text-lg font-calibre mb-2">Non-decorative Separator</h4>
                <p className="font-calibre mb-4">Used for semantic separation, with proper ARIA attributes.</p>
                <CBRESeparator decorative={false} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Decorative Usage</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Decorative separator (default)
<CBRESeparator decorative={true} />

// Non-decorative separator (for semantic separation)
<CBRESeparator decorative={false} />`}
            </pre>
          </div>
        </div>
        
        {/* Custom Styling */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Custom Styling</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="space-y-8">
              <div>
                <p className="font-calibre mb-4">Custom width separator (50% width):</p>
                {mounted ? (
                  <CBRESeparator 
                    key={`width-${key}`}
                    className="w-1/2"
                    style={{ 
                      width: '50% !important', 
                      maxWidth: '50% !important',
                      marginLeft: '0 !important'
                    }} 
                  />
                ) : (
                  <div className="h-4">Loading...</div>
                )}
              </div>
              
              <div>
                <p className="font-calibre mb-4">Custom color separator (negative-red):</p>
                {mounted ? (
                  <CBRESeparator 
                    key={`color-${key}`}
                    color="negative-red"
                    style={{ backgroundColor: '#AD2A2A !important' }} 
                  />
                ) : (
                  <div className="h-4">Loading...</div>
                )}
              </div>
              
              <div>
                <p className="font-calibre mb-4">Custom margin separator (extra large margins):</p>
                {mounted ? (
                  <CBRESeparator key={`margin-${key}`} className="!my-16" />
                ) : (
                  <div className="h-4">Loading...</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Custom Styling</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Custom width (50%)
<CBRESeparator 
  className="w-1/2"
  style={{ 
    width: '50% !important', 
    maxWidth: '50% !important',
    marginLeft: '0 !important'
  }} 
/>

// Custom color (negative-red)
<CBRESeparator color="negative-red" />

// Custom margin (extra large)
<CBRESeparator className="!my-16" />`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Separator Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Separator component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Separator</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Separator Props</h3>
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