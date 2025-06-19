"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash, AlertTriangle, FileQuestion, Save, X } from "lucide-react";

export default function AlertDialogExamplePage() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Alert Dialog Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Alert Dialog component is used to interrupt the user with a mandatory confirmation or action.
          Unlike regular dialogs, it requires user interaction and is ideal for destructive actions or important decisions.
        </p>
        
        {/* Basic Alert Dialog */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Alert Dialog</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Confirmation Dialog</p>
                <div className="flex justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">
      <Trash className="mr-2 h-4 w-4" />
      Delete Account
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
            </pre>
          </div>
        </div>

        {/* Variations */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Dialog Variations</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-10">
              {/* Warning Dialog */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Warning Dialog</p>
                <div className="flex justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="border-yellow-500 hover:bg-yellow-50 text-yellow-700">
                        <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                        Discard Changes
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                          Discard unsaved changes?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You have unsaved changes that will be lost if you continue.
                          Would you like to save your changes first?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button variant="outline" className="border-green-500 hover:bg-green-50 text-green-700">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                        <AlertDialogAction className="bg-yellow-500 hover:bg-yellow-600">
                          <X className="mr-2 h-4 w-4" />
                          Discard
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Custom Dialog with Interactive Content */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Custom Dialog with State</p>
                <div className="flex justify-center">
                  <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <FileQuestion className="mr-2 h-4 w-4" />
                        Show Custom Dialog
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Would you like to provide feedback?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Your feedback helps us improve our service. This dialog will close in 5 seconds if no action is taken.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              alert("Thank you for your positive feedback!");
                              setIsOpen(false);
                            }}
                          >
                            👍 Yes
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              alert("We'll try to improve!");
                              setIsOpen(false);
                            }}
                          >
                            👎 No
                          </Button>
                        </div>
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Controlled Alert Dialog with state
const [isOpen, setIsOpen] = React.useState(false);

<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
  <AlertDialogTrigger asChild>
    <Button variant="outline">
      <FileQuestion className="mr-2 h-4 w-4" />
      Show Custom Dialog
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Would you like to provide feedback?</AlertDialogTitle>
      <AlertDialogDescription>
        Your feedback helps us improve our service.
      </AlertDialogDescription>
    </AlertDialogHeader>
    {/* Custom content can be placed here */}
    <div className="px-6 py-4">
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            alert("Thank you for your positive feedback!");
            setIsOpen(false);
          }}
        >
          👍 Yes
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            alert("We'll try to improve!");
            setIsOpen(false);
          }}
        >
          👎 No
        </Button>
      </div>
    </div>
    <AlertDialogFooter>
      <AlertDialogCancel>Close</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
            </pre>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Usage Guidelines</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">When to use Alert Dialog</h3>
                  <ul className="list-disc pl-6 space-y-2 text-dark-grey font-calibre">
                    <li>For destructive actions like deleting data or canceling a process</li>
                    <li>When user confirmation is required before proceeding</li>
                    <li>For irreversible actions that could have significant consequences</li>
                    <li>When the user must make an explicit choice to continue</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Accessibility Considerations</h3>
                  <ul className="list-disc pl-6 space-y-2 text-dark-grey font-calibre">
                    <li>Focus is automatically trapped within the dialog when open</li>
                    <li>Automatically focuses the first focusable element</li>
                    <li>Closes when the Escape key is pressed</li>
                    <li>Uses aria-labelledby and aria-describedby for screen readers</li>
                    <li>Provides keyboard navigation for all interactive elements</li>
                  </ul>
                </div>
              </div>
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Alert Dialog Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Alert Dialog is composed of several components that must be used within the correct structure.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialog</td>
                          <td className="border border-light-grey px-4 py-2">The root container component.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogTrigger</td>
                          <td className="border border-light-grey px-4 py-2">The button that opens the dialog. Use <code>asChild</code> to wrap a custom button.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogContent</td>
                          <td className="border border-light-grey px-4 py-2">Contains the content of the dialog.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogHeader</td>
                          <td className="border border-light-grey px-4 py-2">Contains the title and description.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogTitle</td>
                          <td className="border border-light-grey px-4 py-2">The title of the dialog.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogDescription</td>
                          <td className="border border-light-grey px-4 py-2">A description explaining the dialog's purpose.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogFooter</td>
                          <td className="border border-light-grey px-4 py-2">Contains the dialog's action buttons.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogAction</td>
                          <td className="border border-light-grey px-4 py-2">The button that confirms the action (typically styled as primary).</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">AlertDialogCancel</td>
                          <td className="border border-light-grey px-4 py-2">The button that cancels the action (typically styled as secondary).</td>
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