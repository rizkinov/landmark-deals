"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import { CBREHoverCard, CBREHoverCardContent, CBREHoverCardTrigger } from "@/components/cbre-hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Info, User, ChevronRight } from "lucide-react";

export default function HoverCardExamplePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Hover Card Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          A hover card is a popup component that appears when hovering over a trigger element. It's commonly used to provide
          additional context, preview content, or display supplementary information without requiring a click action.
        </p>
        
        {/* Basic Hover Card */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Hover Card</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Simple hover card with basic content</p>
                <div className="flex justify-center">
                  <CBREHoverCard>
                    <CBREHoverCardTrigger asChild>
                      <Button variant="outline">
                        <Info className="mr-2 h-4 w-4" />
                        Hover for Info
                      </Button>
                    </CBREHoverCardTrigger>
                    <CBREHoverCardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">What is a Hover Card?</h4>
                        <p className="text-sm">
                          A hover card displays floating content when hovering over a trigger element.
                          It's perfect for showing additional context without interrupting the user's flow.
                        </p>
                      </div>
                    </CBREHoverCardContent>
                  </CBREHoverCard>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREHoverCard>
  <CBREHoverCardTrigger asChild>
    <Button variant="outline">
      <Info className="mr-2 h-4 w-4" />
      Hover for Info
    </Button>
  </CBREHoverCardTrigger>
  <CBREHoverCardContent>
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">What is a Hover Card?</h4>
      <p className="text-sm">
        A hover card displays floating content when hovering over a trigger element.
        It's perfect for showing additional context without interrupting the user's flow.
      </p>
    </div>
  </CBREHoverCardContent>
</CBREHoverCard>`}
            </pre>
          </div>
        </div>

        {/* Hover Card Variations */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Hover Card Variations</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-10">
              {/* User Profile Hover Card */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">User Profile Hover Card</p>
                <div className="flex justify-center">
                  <CBREHoverCard>
                    <CBREHoverCardTrigger asChild>
                      <Button variant="ghost" className="p-0">
                        <Avatar>
                          <AvatarImage src="https://placehold.co/100/1a5b2d/ffffff?text=SW" alt="Sarah Wilson" />
                          <AvatarFallback className="bg-cbre-green text-white">SW</AvatarFallback>
                        </Avatar>
                      </Button>
                    </CBREHoverCardTrigger>
                    <CBREHoverCardContent className="w-80">
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarImage src="https://placehold.co/100/1a5b2d/ffffff?text=SW" alt="Sarah Wilson" />
                          <AvatarFallback className="bg-cbre-green text-white">SW</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1 flex-1">
                          <h4 className="text-sm font-semibold">Sarah Wilson</h4>
                          <p className="text-sm">
                            Senior Property Manager
                          </p>
                          <div className="flex items-center pt-2">
                            <User className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                              Los Angeles Office
                            </span>
                          </div>
                          <div className="flex items-center">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                              With CBRE since 2019
                            </span>
                          </div>
                        </div>
                      </div>
                    </CBREHoverCardContent>
                  </CBREHoverCard>
                </div>
              </div>

              {/* Feature Preview Hover Card */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Feature Preview Hover Card</p>
                <div className="flex justify-center">
                  <CBREHoverCard>
                    <CBREHoverCardTrigger asChild>
                      <Button variant="outline" className="w-[300px] justify-between">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Analytics Dashboard
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CBREHoverCardTrigger>
                    <CBREHoverCardContent className="w-[450px]">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">Analytics Dashboard</h4>
                        <div className="rounded-md overflow-hidden border border-light-grey">
                          <img 
                            src="https://placehold.co/600x200/e2e8f0/64748b" 
                            alt="Analytics Dashboard Preview"
                            className="w-full"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Get insights into your business performance with our new analytics dashboard.
                          Track metrics, visualize data, and make informed decisions.
                        </p>
                      </div>
                    </CBREHoverCardContent>
                  </CBREHoverCard>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Feature Preview Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBREHoverCard>
  <CBREHoverCardTrigger asChild>
    <Button variant="outline" className="w-[300px] justify-between">
      <div className="flex items-center">
        <User className="mr-2 h-4 w-4" />
        Analytics Dashboard
      </div>
      <ChevronRight className="h-4 w-4" />
    </Button>
  </CBREHoverCardTrigger>
  <CBREHoverCardContent className="w-[450px]">
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Analytics Dashboard</h4>
      <div className="rounded-md overflow-hidden border border-light-grey">
        <img 
          src="https://placehold.co/600x200/e2e8f0/64748b" 
          alt="Analytics Dashboard Preview"
          className="w-full"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Get insights into your business performance with our new analytics dashboard.
        Track metrics, visualize data, and make informed decisions.
      </p>
    </div>
  </CBREHoverCardContent>
</CBREHoverCard>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">CbreHoverCard Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The CbreHoverCard component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">CbreHoverCard</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">CbreHoverCard Props</h3>
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