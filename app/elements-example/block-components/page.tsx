"use client";

import React from 'react';
import { CBREButton } from '@/components/cbre-button';
import Link from "next/link";



// List of block components
const blockComponents = [
  {
    name: "Quote Block",
    description: "A styled testimonial or quote block with optional image.",
    path: "/elements-example/block-components/quote-block",
    status: "completed"
  },
  {
    name: "CTA Block",
    description: "A call-to-action block with heading and button.",
    path: "/elements-example/block-components/cta-block",
    status: "completed"
  },
];

export default function BlockComponentsPage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Block Components</h1>
        
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          Pre-built content blocks that combine multiple elements for common use cases.
        </p>
        
        <div className="bg-[var(--lighter-grey)] p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blockComponents.map((component, index) => (
              <div key={index} className="bg-white border-none p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-financier text-cbre-green">{component.name}</h3>
                  <span className="text-xs px-2 py-1 bg-accent-green text-cbre-green font-calibre">
                    Ready
                  </span>
                </div>
                <p className="text-dark-grey font-calibre mb-6 flex-grow">{component.description}</p>
                <Link href={component.path}>
                  <CBREButton variant="view-more" className="w-full justify-center">
                    View {component.name}
                  </CBREButton>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
                {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component API</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">BlockComponents Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The BlockComponents component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">BlockComponents</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">BlockComponents Props</h3>
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