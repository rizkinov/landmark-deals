"use client";

import React from 'react';
import { DesignSystemColors } from '@/components/ui/design-system';
import { CBREButton } from '@/components/cbre-button';
import Link from 'next/link';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-financier text-cbre-green mb-6">CBRE Design System</h1>
        
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          Documentation of colors, typography, and spacing used in the CBRE UI Elements library.
          Use these guidelines when creating new components.
        </p>
        
        <div className="space-y-16">
          {/* Colors */}
          <div className="border-t border-light-grey pt-6">
            <h2 className="text-4xl font-financier text-cbre-green mb-3">Color Palette</h2>
            <p className="text-dark-grey font-calibre mb-6">
              The CBRE color palette consists of primary and secondary colors that reflect the brand's identity.
              Use these colors consistently across all components.
            </p>
            
            <div className="bg-[var(--lighter-grey)] p-8">
              <DesignSystemColors />
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-financier text-cbre-green mb-3">Usage Guidelines</h3>
              <div className="text-dark-grey font-calibre space-y-4">
                <p>
                  For color usage in Tailwind CSS, we recommend using CSS variables with arbitrary values:
                </p>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Background colors
<div className="bg-[var(--cbre-green)]">...</div>
<div className="bg-[var(--lighter-grey)]">...</div>
<div className="bg-[var(--celadon)]">...</div>
<div className="bg-[var(--midnight-tint)]">...</div>

// Text colors
<div className="text-[var(--cbre-green)]">...</div>
<div className="text-[var(--dark-grey)]">...</div>

// Border colors
<div className="border border-[var(--light-grey)]">...</div>
<div className="border-l-[var(--dark-green)]">...</div>`}
                </pre>
                <p>
                  This approach ensures consistent color usage across components and works reliably
                  with Tailwind CSS v4's compilation process.
                </p>
                <p className="font-medium">
                  All CBRE brand colors are defined as CSS variables in the globals.css file and can be used anywhere
                  in the application using the pattern shown above.
                </p>
              </div>
            </div>
          </div>
          
          {/* Typography */}
          <div className="border-t border-light-grey pt-6">
            <h2 className="text-4xl font-financier text-cbre-green mb-3">Typography</h2>
            <p className="text-dark-grey font-calibre mb-6">
              CBRE uses Financier Display for headings and Calibre for body text.
            </p>
            
            <div className="bg-[var(--lighter-grey)] p-8 space-y-6">
              <div>
                <h3 className="text-lg font-calibre font-medium text-dark-grey mb-2">Headings (Financier Display)</h3>
                <div className="space-y-4">
                  <div className="font-financier text-6xl text-cbre-green">Heading 1 (text-6xl)</div>
                  <div className="font-financier text-4xl text-cbre-green">Heading 2 (text-4xl)</div>
                  <div className="font-financier text-2xl text-cbre-green">Heading 3 (text-2xl)</div>
                  <div className="font-financier text-xl text-cbre-green">Heading 4 (text-xl)</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-calibre font-medium text-dark-grey mb-2">Body Text (Calibre)</h3>
                <div className="space-y-4">
                  <div className="font-calibre text-lg text-dark-grey">Body Large (text-lg)</div>
                  <div className="font-calibre text-base text-dark-grey">Body Medium (text-base)</div>
                  <div className="font-calibre text-sm text-dark-grey">Body Small (text-sm)</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts & Graphs */}
          <div className="border-t border-light-grey pt-6">
            <h2 className="text-4xl font-financier text-cbre-green mb-3">Charts & Graphs</h2>
            <p className="text-dark-grey font-calibre mb-6">
              Special color palettes are provided for charts, graphs, and data visualizations to ensure clarity and consistency.
            </p>
            
            <div className="bg-[var(--lighter-grey)] p-8">
              <div className="mb-6 text-dark-grey font-calibre">
                <p className="mb-4">When creating data visualizations:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use these colors consistently across charts and graphs</li>
                  <li>Maintain adequate contrast between colors for legibility</li>
                  <li>Only use Negative Red when representing negative values</li>
                  <li>Keep color meaning consistent across all data visualizations</li>
                </ul>
              </div>
              <div className="border-t border-[var(--light-grey)] pt-6 mt-6">
                <p className="font-medium text-dark-grey mb-4">Example usage:</p>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// For a bar chart
<div className="bg-[var(--data-blue)]">...</div>
<div className="bg-[var(--data-light-blue)]">...</div>
<div className="bg-[var(--celadon)]">...</div>

// For negative values
<div className="bg-[var(--negative-red)]">...</div>`}
                </pre>
              </div>
            </div>
          </div>
          
          {/* Infographics & Diagrams */}
          <div className="border-t border-light-grey pt-6">
            <h2 className="text-4xl font-financier text-cbre-green mb-3">Infographics & Diagrams</h2>
            <p className="text-dark-grey font-calibre mb-6">
              A subset of colors are used for infographics and diagrams to maintain a clean, professional appearance.
            </p>
            
            <div className="bg-[var(--lighter-grey)] p-8">
              <div className="mb-6 text-dark-grey font-calibre">
                <p className="mb-4">Guidelines for infographics and diagrams:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use this limited color palette to prevent visual overload</li>
                  <li>Maintain visual hierarchy with these colors</li>
                  <li>Pair with appropriate typography for maximum clarity</li>
                </ul>
              </div>
              <div className="border-t border-[var(--light-grey)] pt-6 mt-6">
                <p className="font-medium text-dark-grey mb-4">Example implementation:</p>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// For process diagrams
<div className="bg-[var(--celadon)]">Step 1</div>
<div className="bg-[var(--wheat)]">Step 2</div>
<div className="bg-[var(--data-blue)]">Step 3</div>`}
                </pre>
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