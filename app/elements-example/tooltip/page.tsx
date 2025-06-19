"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import { CBRETooltip, CBRETooltipProvider } from "@/components/cbre-tooltip";
import { Button } from "@/components/ui/button";
import { Info, Settings, HelpCircle, Plus, Calendar } from "lucide-react";

export default function TooltipExamplePage() {
  return (
    <CBRETooltipProvider>
      <div className="min-h-screen bg-white">
        <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

          <h1 className="text-6xl font-financier text-cbre-green mb-6">Tooltip Component</h1>
          <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
            A tooltip is a small popup that displays informative text when users hover over or focus on an element.
            Use tooltips to provide additional context without cluttering the interface.
          </p>
          
          {/* Basic Tooltip */}
          <div className="mb-16">
            <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Tooltip</h2>
            <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
              <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                  <p className="text-dark-grey font-calibre mb-2">Simple tooltip with basic content</p>
                  <div className="flex justify-center">
                    <CBRETooltip content="Shows additional information">
                      <Button variant="outline">
                        <Info className="mr-2 h-4 w-4" />
                        Hover me
                      </Button>
                    </CBRETooltip>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-light-grey mt-6">
              <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRETooltip content="Shows additional information">
  <Button variant="outline">
    <Info className="mr-2 h-4 w-4" />
    Hover me
  </Button>
</CBRETooltip>`}
              </pre>
            </div>
          </div>

          {/* Tooltip Variations */}
          <div className="mb-16">
            <h2 className="text-4xl font-financier text-cbre-green mb-5">Tooltip Variations</h2>
            <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
              <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-10">
                {/* Different Positions */}
                <div className="space-y-2">
                  <p className="text-dark-grey font-calibre mb-2">Different Positions</p>
                  <div className="flex justify-center gap-4">
                    <CBRETooltip content="Settings" side="top">
                      <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </CBRETooltip>
                    <CBRETooltip content="Add new item" side="right">
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </CBRETooltip>
                    <CBRETooltip content="Help" side="bottom">
                      <Button variant="outline" size="icon">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </CBRETooltip>
                    <CBRETooltip content="Calendar" side="left">
                      <Button variant="outline" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </CBRETooltip>
                  </div>
                </div>

                {/* With Different Alignments */}
                <div className="space-y-2">
                  <p className="text-dark-grey font-calibre mb-2">Different Alignments</p>
                  <div className="flex justify-center gap-4">
                    <CBRETooltip 
                      content="Aligned to start" 
                      align="start"
                      side="bottom"
                    >
                      <Button variant="outline">Start Aligned</Button>
                    </CBRETooltip>
                    <CBRETooltip 
                      content="Centered alignment (default)" 
                      align="center"
                      side="bottom"
                    >
                      <Button variant="outline">Center Aligned</Button>
                    </CBRETooltip>
                    <CBRETooltip 
                      content="Aligned to end" 
                      align="end"
                      side="bottom"
                    >
                      <Button variant="outline">End Aligned</Button>
                    </CBRETooltip>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-light-grey mt-6">
              <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Variations Implementation</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Different positions
<CBRETooltip content="Settings" side="top">
  <Button variant="outline" size="icon">
    <Settings className="h-4 w-4" />
  </Button>
</CBRETooltip>

// Different alignments
<CBRETooltip 
  content="Aligned to start" 
  align="start"
  side="bottom"
>
  <Button variant="outline">Start Aligned</Button>
</CBRETooltip>`}
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
                    <h3 className="text-xl font-calibre font-medium mb-3">Tooltip Components</h3>
                    <p className="mb-3 text-dark-grey font-calibre">
                      The Tooltip component provides a consistent UI element following CBRE design guidelines.
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
                            <td className="border border-light-grey px-4 py-2 font-mono">Tooltip</td>
                            <td className="border border-light-grey px-4 py-2">The root component.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-calibre font-medium mb-3">Tooltip Props</h3>
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
    </CBRETooltipProvider>
  );
} 