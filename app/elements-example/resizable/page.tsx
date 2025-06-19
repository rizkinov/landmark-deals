"use client";

import React from 'react';
import Link from "next/link";

import { CBREButton } from '@/components/cbre-button';
import { 
  CBREResizablePanelGroup, 
  CBREResizablePanel, 
  CBREResizableHandle 
} from '@/components/cbre-resizable';


export default function ResizableExamplePage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Resizable Component</h1>
        
        {/* Basic Resizable Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Resizable Panels</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="border border-light-grey h-[400px]">
              <CBREResizablePanelGroup direction="horizontal">
                <CBREResizablePanel defaultSize={30} minSize={20} className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Left Panel</h3>
                    <p>This panel takes 30% of the space by default but can be resized by dragging the handle.</p>
                  </div>
                </CBREResizablePanel>
                
                <CBREResizableHandle withHandle />
                
                <CBREResizablePanel className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Right Panel</h3>
                    <p>This panel takes the remaining space and can be resized by dragging the handle.</p>
                  </div>
                </CBREResizablePanel>
              </CBREResizablePanelGroup>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREResizablePanelGroup direction="horizontal">
  <CBREResizablePanel defaultSize={30} minSize={20}>
    Left Panel Content
  </CBREResizablePanel>
  
  <CBREResizableHandle withHandle />
  
  <CBREResizablePanel>
    Right Panel Content
  </CBREResizablePanel>
</CBREResizablePanelGroup>`}
            </pre>
          </div>
        </div>
        
        {/* Vertical Resizable Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Vertical Resizable Panels</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="border border-light-grey h-[500px]">
              <CBREResizablePanelGroup direction="vertical">
                <CBREResizablePanel defaultSize={30} minSize={20} className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Top Panel</h3>
                    <p>This panel is at the top and can be resized vertically.</p>
                  </div>
                </CBREResizablePanel>
                
                <CBREResizableHandle withHandle handleColor="cbre-green" />
                
                <CBREResizablePanel className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Bottom Panel</h3>
                    <p>This panel is at the bottom and can be resized vertically.</p>
                  </div>
                </CBREResizablePanel>
              </CBREResizablePanelGroup>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Vertical Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREResizablePanelGroup direction="vertical">
  <CBREResizablePanel defaultSize={30} minSize={20}>
    Top Panel Content
  </CBREResizablePanel>
  
  <CBREResizableHandle withHandle handleColor="cbre-green" />
  
  <CBREResizablePanel>
    Bottom Panel Content
  </CBREResizablePanel>
</CBREResizablePanelGroup>`}
            </pre>
          </div>
        </div>
        
        {/* Multiple Panels Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Multiple Resizable Panels</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="border border-light-grey h-[400px]">
              <CBREResizablePanelGroup direction="horizontal">
                <CBREResizablePanel defaultSize={25} minSize={15} className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Panel 1</h3>
                    <p>First panel with 25% default size.</p>
                  </div>
                </CBREResizablePanel>
                
                <CBREResizableHandle withHandle handleColor="accent-green" />
                
                <CBREResizablePanel defaultSize={50} className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Panel 2</h3>
                    <p>Middle panel with 50% default size.</p>
                  </div>
                </CBREResizablePanel>
                
                <CBREResizableHandle withHandle handleColor="accent-green" />
                
                <CBREResizablePanel className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Panel 3</h3>
                    <p>Third panel with remaining space.</p>
                  </div>
                </CBREResizablePanel>
              </CBREResizablePanelGroup>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Multiple Panels Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREResizablePanelGroup direction="horizontal">
  <CBREResizablePanel defaultSize={25} minSize={15}>
    Panel 1 Content
  </CBREResizablePanel>
  
  <CBREResizableHandle withHandle handleColor="accent-green" />
  
  <CBREResizablePanel defaultSize={50}>
    Panel 2 Content
  </CBREResizablePanel>
  
  <CBREResizableHandle withHandle handleColor="accent-green" />
  
  <CBREResizablePanel>
    Panel 3 Content
  </CBREResizablePanel>
</CBREResizablePanelGroup>`}
            </pre>
          </div>
        </div>
        
        {/* Nested Resizable Panels */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Nested Resizable Panels</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="border border-light-grey h-[500px]">
              <CBREResizablePanelGroup direction="horizontal">
                <CBREResizablePanel defaultSize={30} minSize={20} className="bg-white">
                  <div className="p-4 h-full">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Navigation</h3>
                    <p className="font-calibre text-dark-grey">This panel could contain navigation items or a sidebar.</p>
                  </div>
                </CBREResizablePanel>
                
                <CBREResizableHandle />
                
                <CBREResizablePanel className="bg-white">
                  <CBREResizablePanelGroup direction="vertical">
                    <CBREResizablePanel defaultSize={60} className="bg-white">
                      <div className="p-4">
                        <h3 className="text-xl font-financier text-cbre-green mb-3">Main Content</h3>
                        <p className="font-calibre text-dark-grey">This panel contains the main content area.</p>
                        <p className="font-calibre text-dark-grey mt-2">Try resizing both horizontally and vertically to see how nested panels work.</p>
                      </div>
                    </CBREResizablePanel>
                    
                    <CBREResizableHandle withHandle handleColor="light-grey" />
                    
                    <CBREResizablePanel className="bg-white">
                      <div className="p-4">
                        <h3 className="text-xl font-financier text-cbre-green mb-3">Details Section</h3>
                        <p className="font-calibre text-dark-grey">This panel could contain details or properties.</p>
                      </div>
                    </CBREResizablePanel>
                  </CBREResizablePanelGroup>
                </CBREResizablePanel>
              </CBREResizablePanelGroup>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Nested Panels Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREResizablePanelGroup direction="horizontal">
  <CBREResizablePanel defaultSize={30} minSize={20}>
    Navigation Content
  </CBREResizablePanel>
  
  <CBREResizableHandle />
  
  <CBREResizablePanel>
    <CBREResizablePanelGroup direction="vertical">
      <CBREResizablePanel defaultSize={60}>
        Main Content
      </CBREResizablePanel>
      
      <CBREResizableHandle withHandle handleColor="light-grey" />
      
      <CBREResizablePanel>
        Details Section
      </CBREResizablePanel>
    </CBREResizablePanelGroup>
  </CBREResizablePanel>
</CBREResizablePanelGroup>`}
            </pre>
          </div>
        </div>
        
        {/* Bordered Variant */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Bordered Variant</h2>
          <div className="bg-[var(--lighter-grey)] p-8">
            <div className="h-[300px]">
              <CBREResizablePanelGroup direction="horizontal" variant="bordered">
                <CBREResizablePanel variant="bordered" className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Left Panel</h3>
                    <p>This panel has a border applied through the variant prop.</p>
                  </div>
                </CBREResizablePanel>
                
                <CBREResizableHandle withHandle />
                
                <CBREResizablePanel variant="bordered" className="bg-white p-4">
                  <div className="font-calibre text-dark-grey">
                    <h3 className="text-xl font-financier text-cbre-green mb-3">Right Panel</h3>
                    <p>This panel also has a border applied through the variant prop.</p>
                  </div>
                </CBREResizablePanel>
              </CBREResizablePanelGroup>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Bordered Variant Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREResizablePanelGroup direction="horizontal" variant="bordered">
  <CBREResizablePanel variant="bordered">
    Left Panel Content
  </CBREResizablePanel>
  
  <CBREResizableHandle withHandle />
  
  <CBREResizablePanel variant="bordered">
    Right Panel Content
  </CBREResizablePanel>
</CBREResizablePanelGroup>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Resizable Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Resizable component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Resizable</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Resizable Props</h3>
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