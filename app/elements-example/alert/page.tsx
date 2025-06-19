"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { 
  Terminal, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  ShieldAlert,
  AlertTriangle
} from "lucide-react";

export default function AlertExamplePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Alert Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Alert component displays important messages to users, such as errors, warnings, or informational notifications.
          Alerts can be used to provide feedback about an action or to notify users about important changes.
        </p>
        
        {/* Basic Alerts */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Alerts</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              {/* Default Alert */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Default Alert</p>
                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app using the CLI.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Destructive Alert */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Destructive Alert</p>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    An error occurred while submitting the form. Please try again.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Default Alert
<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>

// Destructive Alert
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    An error occurred while submitting the form. Please try again.
  </AlertDescription>
</Alert>`}
            </pre>
          </div>
        </div>

        {/* Alert Variants */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Alert Message Types</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              {/* Information Alert */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Information Alert</p>
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertTitle className="text-blue-700">Information</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    A new software update is available. See what's new in version 2.0.4.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Success Alert */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Success Alert</p>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-700">Success</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your changes have been successfully saved.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Warning Alert */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Warning Alert</p>
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <AlertTitle className="text-yellow-700">Warning</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Your account subscription expires in 7 days. Please renew now.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Error Alert */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Error Alert</p>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was a problem with your network connection.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Information Alert
<Alert className="border-blue-200 bg-blue-50">
  <Info className="h-4 w-4 text-blue-500" />
  <AlertTitle className="text-blue-700">Information</AlertTitle>
  <AlertDescription className="text-blue-700">
    A new software update is available. See what's new in version 2.0.4.
  </AlertDescription>
</Alert>

// Success Alert
<Alert className="border-green-200 bg-green-50">
  <CheckCircle2 className="h-4 w-4 text-green-500" />
  <AlertTitle className="text-green-700">Success</AlertTitle>
  <AlertDescription className="text-green-700">
    Your changes have been successfully saved.
  </AlertDescription>
</Alert>

// Warning Alert
<Alert className="border-yellow-200 bg-yellow-50">
  <AlertTriangle className="h-4 w-4 text-yellow-500" />
  <AlertTitle className="text-yellow-700">Warning</AlertTitle>
  <AlertDescription className="text-yellow-700">
    Your account subscription expires in 7 days. Please renew now.
  </AlertDescription>
</Alert>

// Error Alert (using destructive variant)
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    There was a problem with your network connection.
  </AlertDescription>
</Alert>`}
            </pre>
          </div>
        </div>

        {/* Alert with Minimal Content */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Minimal Alerts</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              {/* Alert with Title Only */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Alert with Title Only</p>
                <Alert>
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Security Warning</AlertTitle>
                </Alert>
              </div>

              {/* Alert with Description Only */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Alert with Description Only</p>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Your password was updated successfully.
                  </AlertDescription>
                </Alert>
              </div>

              {/* Alert with Icon Only */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Alert with Icon and Brief Message</p>
                <Alert className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <span>Changes saved successfully</span>
                </Alert>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Alert with Title Only
<Alert>
  <ShieldAlert className="h-4 w-4" />
  <AlertTitle>Security Warning</AlertTitle>
</Alert>

// Alert with Description Only
<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>
    Your password was updated successfully.
  </AlertDescription>
</Alert>

// Alert with Icon and Brief Message
<Alert className="flex items-center">
  <CheckCircle2 className="h-4 w-4 mr-2" />
  <span>Changes saved successfully</span>
</Alert>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Alert Component</h3>
                  <p className="mb-3 text-dark-grey font-calibre">The main container for alert messages.</p>
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Alert</td>
                          <td className="border border-light-grey px-4 py-2">The root alert component. Accepts a <code>variant</code> prop with values: <code>default</code> or <code>destructive</code>.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertTitle</td>
                          <td className="border border-light-grey px-4 py-2">Used for the alert title.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDescription</td>
                          <td className="border border-light-grey px-4 py-2">Used for the alert description text.</td>
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