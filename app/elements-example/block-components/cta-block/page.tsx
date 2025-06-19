"use client";

import React from 'react';
import { CBRECTABlock } from '@/components/cbre-cta-block';
import { CBREButton } from '@/components/cbre-button';
import Link from 'next/link';

export default function CTABlockPage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">CTA Block Component</h1>
        
        <div className="mb-16">
          <h2 className="text-xl font-financier text-cbre-green mb-5">Call-to-Action Block</h2>
          <div className="mb-4">
            <CBRECTABlock 
              title="Connect with our team to get started"
              buttonText="Get in Touch"
            />
          </div>
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRECTABlock 
  title="Connect with our team to get started"
  buttonText="Get in Touch" // Optional, defaults to "Get in Touch"
  onButtonClick={() => console.log('Button clicked')} // Optional
/>`}
            </pre>
            <div className="mt-4 text-sm text-dark-grey">
              <p>Design specifications:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Background color: #E6E8E9</li>
                <li>Text color: #003F2D (CBRE Green)</li>
                <li>Uses the "view-more" button variant</li>
                <li>Responsive layout (stacks on mobile)</li>
              </ul>
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
                  <h3 className="text-xl font-calibre font-medium mb-3">CTABlock Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The CTABlock component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">CTABlock</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">CTABlock Props</h3>
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
                          <td className="border border-light-grey px-4 py-2 font-mono">title</td>
                          <td className="border border-light-grey px-4 py-2">string</td>
                          <td className="border border-light-grey px-4 py-2">The main text to display in the CTA block.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">buttonText</td>
                          <td className="border border-light-grey px-4 py-2">string</td>
                          <td className="border border-light-grey px-4 py-2">The text to display on the button.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">onButtonClick</td>
                          <td className="border border-light-grey px-4 py-2">function</td>
                          <td className="border border-light-grey px-4 py-2">Optional callback function when the button is clicked.</td>
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