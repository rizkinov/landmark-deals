"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const longText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
`.repeat(2);

export default function ScrollAreaExamplePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Scroll Area Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          A styled scrollable container with custom scrollbars that match CBRE's design system.
          The component provides a consistent scrolling experience across different browsers and platforms.
        </p>

        {/* Vertical Scroll Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Vertical Scroll</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Fixed Height Container</p>
                <Card>
                  <CardContent className="p-4">
                    <ScrollArea className="h-72 rounded-md">
                      <div className="p-4">
                        <h4 className="mb-4 text-lg font-medium leading-none">Release Notes</h4>
                        {tags.map((tag) => (
                          <div key={tag} className="text-sm py-2 border-b">
                            {tag}
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<ScrollArea className="h-72 rounded-md">
  <div className="p-4">
    {/* Your content here */}
  </div>
  <ScrollBar orientation="vertical" />
</ScrollArea>`}
            </pre>
          </div>
        </div>

        {/* Horizontal Scroll Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Horizontal Scroll</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Fixed Width Container</p>
                <Card>
                  <CardContent className="p-4">
                    <ScrollArea className="w-full whitespace-nowrap rounded-md">
                      <div className="flex w-max space-x-4 p-4">
                        {Array.from({ length: 15 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-40 h-40 flex items-center justify-center rounded-md border"
                          >
                            Item {i + 1}
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<ScrollArea className="w-full whitespace-nowrap rounded-md">
  <div className="flex w-max space-x-4 p-4">
    {/* Your horizontally scrolling content */}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
            </pre>
          </div>
        </div>

        {/* Both Scrollbars Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Both Scrollbars</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Fixed Height and Width Container</p>
                <Card>
                  <CardContent className="p-4">
                    <ScrollArea className="h-72 w-full rounded-md">
                      <div className="p-4">
                        <h4 className="mb-4 text-lg font-medium leading-none">Long Content</h4>
                        <div className="text-sm" style={{ width: "150%" }}>
                          {longText}
                        </div>
                      </div>
                      <ScrollBar orientation="vertical" />
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<ScrollArea className="h-72 w-full rounded-md">
  <div className="p-4">
    {/* Your content here */}
  </div>
  <ScrollBar orientation="vertical" />
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">ScrollArea Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The ScrollArea is composed of multiple components that work together to create a custom scrolling experience.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">ScrollArea</td>
                          <td className="border border-light-grey px-4 py-2">The root container component that wraps the content to be scrolled.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">ScrollBar</td>
                          <td className="border border-light-grey px-4 py-2">The scrollbar component that can be oriented vertically or horizontally.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">ScrollViewport</td>
                          <td className="border border-light-grey px-4 py-2">The viewport component that contains the scrollable content (optional, used internally).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">ScrollArea Props</h3>
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
                          <td className="border border-light-grey px-4 py-2 font-mono">type</td>
                          <td className="border border-light-grey px-4 py-2">string</td>
                          <td className="border border-light-grey px-4 py-2">Type of scrollbar: "auto", "always", "scroll", or "hover" (default: "hover").</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">scrollHideDelay</td>
                          <td className="border border-light-grey px-4 py-2">number</td>
                          <td className="border border-light-grey px-4 py-2">Delay in ms before the scrollbar is hidden when type is "hover" (default: 600).</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">ScrollBar Props</h3>
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
                          <td className="border border-light-grey px-4 py-2 font-mono">orientation</td>
                          <td className="border border-light-grey px-4 py-2">string</td>
                          <td className="border border-light-grey px-4 py-2">Orientation of the scrollbar: "vertical" or "horizontal" (required).</td>
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