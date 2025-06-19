"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, User, CreditCard, X, Mail, BellRing, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function DialogExamplePage() {
  // State for controlled dialog example
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  // Handle subscription submission
  const handleSubscribe = () => {
    if (!email) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Dialog Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          A dialog is a modal window that appears in front of app content to provide critical information or
          ask for a decision. Dialogs are purposefully interruptive, so they should be used sparingly and only when necessary.
        </p>
        
        {/* Basic Dialog */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Dialog</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Simple Dialog with Header and Footer</p>
                <div className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Open Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Account Settings</DialogTitle>
                        <DialogDescription>
                          Adjust your account preferences here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2 py-4">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="name" className="text-left">
                            Name
                          </Label>
                          <Input id="name" defaultValue="Jane Smith" />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      <Settings className="mr-2 h-4 w-4" />
      Open Settings
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Account Settings</DialogTitle>
      <DialogDescription>
        Adjust your account preferences here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2 py-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input id="name" defaultValue="Jane Smith" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
            </pre>
          </div>
        </div>

        {/* Dialog Variations */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Dialog Variations</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-10">
              {/* Account Dialog */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Account Dialog</p>
                <div className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-left">
                            Name
                          </Label>
                          <Input id="name" defaultValue="Jane Smith" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input id="username" defaultValue="@janesmith" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Notification Dialog */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Notification Dialog</p>
                <div className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <BellRing className="mr-2 h-4 w-4" />
                        Notifications
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                        <DialogDescription>
                          Configure how you receive notifications.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="notifications-email" 
                            className="mt-1"
                            defaultChecked
                          />
                          <Label 
                            htmlFor="notifications-email" 
                            className="text-sm font-calibre text-dark-grey cursor-pointer"
                          >
                            Email notifications
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="notifications-push" 
                            className="mt-1"
                            defaultChecked
                          />
                          <Label 
                            htmlFor="notifications-push" 
                            className="text-sm font-calibre text-dark-grey cursor-pointer"
                          >
                            Push notifications
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="notifications-sms" 
                            className="mt-1"
                          />
                          <Label 
                            htmlFor="notifications-sms" 
                            className="text-sm font-calibre text-dark-grey cursor-pointer"
                          >
                            SMS notifications
                          </Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save preferences</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Implementation for Notification Dialog */}
              <div className="bg-white p-6 border border-light-grey mt-6 mb-10">
                <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Notification Dialog Implementation</h3>
                <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { Checkbox } from "@/components/ui/checkbox";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">
      <BellRing className="mr-2 h-4 w-4" />
      Notifications
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Notifications</DialogTitle>
      <DialogDescription>
        Configure how you receive notifications.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="notifications-email" 
          className="mt-1"
          defaultChecked
        />
        <Label 
          htmlFor="notifications-email" 
          className="text-sm font-calibre text-dark-grey cursor-pointer"
        >
          Email notifications
        </Label>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="notifications-push" 
          className="mt-1"
          defaultChecked
        />
        <Label 
          htmlFor="notifications-push" 
          className="text-sm font-calibre text-dark-grey cursor-pointer"
        >
          Push notifications
        </Label>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="notifications-sms" 
          className="mt-1"
        />
        <Label 
          htmlFor="notifications-sms" 
          className="text-sm font-calibre text-dark-grey cursor-pointer"
        >
          SMS notifications
        </Label>
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save preferences</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
                </pre>
              </div>

              {/* Payment Dialog */}
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Payment Dialog</p>
                <div className="flex justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add payment method</DialogTitle>
                        <DialogDescription>
                          Add a new payment method to your account
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="card-number" className="text-right">
                            Card Number
                          </Label>
                          <Input id="card-number" placeholder="4242 4242 4242 4242" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="expiration" className="text-right">
                            Expiration
                          </Label>
                          <Input id="expiration" placeholder="MM/YY" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="cvc" className="text-right">
                            CVC
                          </Label>
                          <Input id="cvc" placeholder="123" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Card</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Dialog>
  <DialogTrigger asChild>
    <Button>
      <CreditCard className="mr-2 h-4 w-4" />
      Add Payment Method
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Add payment method</DialogTitle>
      <DialogDescription>
        Add a new payment method to your account
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2 py-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="card-number" className="text-left">
          Card Number
        </Label>
        <Input id="card-number" placeholder="4242 4242 4242 4242" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button type="submit">Save Card</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
            </pre>
          </div>
        </div>

        {/* Controlled Dialog */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Controlled Dialog</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Dialog with State Management</p>
                <div className="flex justify-center">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Subscribe to Newsletter
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Subscribe to Newsletter</DialogTitle>
                        <DialogDescription>
                          Enter your email to receive our newsletter with the latest updates.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-left">
                            Email
                          </Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="your@email.com" 
                            className="col-span-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" onClick={() => setEmail("")}>
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button 
                          type="submit"
                          onClick={handleSubscribe}
                          disabled={loading || !email}
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Subscribing...
                            </>
                          ) : "Subscribe"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// State for controlled dialog
const [open, setOpen] = React.useState(false);
const [loading, setLoading] = React.useState(false);
const [email, setEmail] = React.useState("");

// Handle subscription submission
const handleSubscribe = () => {
  if (!email) return;
  
  setLoading(true);
  // Simulate API call
  setTimeout(() => {
    setLoading(false);
    setOpen(false);
    alert(\`Subscribed with: \${email}\`);
    setEmail("");
  }, 1500);
};

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="outline">
      <Mail className="mr-2 h-4 w-4" />
      Subscribe to Newsletter
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Subscribe to Newsletter</DialogTitle>
      <DialogDescription>
        Enter your email to receive our newsletter with the latest updates.
      </DialogDescription>
    </DialogHeader>
    <div className="flex items-center space-x-2 py-4">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="email" className="text-left">
          Email
        </Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="your@email.com" 
          className="col-span-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline" onClick={() => setEmail("")}>
          Cancel
        </Button>
      </DialogClose>
      <Button 
        type="submit"
        onClick={handleSubscribe}
        disabled={loading || !email}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : "Subscribe"}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Dialog Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Dialog is composed of several components that must be used within the correct structure.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Dialog</td>
                          <td className="border border-light-grey px-4 py-2">The root container component.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DialogTrigger</td>
                          <td className="border border-light-grey px-4 py-2">The button that opens the dialog. Use <code>asChild</code> to wrap a custom button.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DialogContent</td>
                          <td className="border border-light-grey px-4 py-2">Contains the content of the dialog.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DialogHeader</td>
                          <td className="border border-light-grey px-4 py-2">Contains the title and description.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DialogTitle</td>
                          <td className="border border-light-grey px-4 py-2">The title of the dialog.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DialogDescription</td>
                          <td className="border border-light-grey px-4 py-2">A description explaining the dialog's purpose.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DialogFooter</td>
                          <td className="border border-light-grey px-4 py-2">Contains the dialog's action buttons.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">DialogClose</td>
                          <td className="border border-light-grey px-4 py-2">The button that closes the dialog. Use <code>asChild</code> to wrap a custom button.</td>
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