"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor
} from "@/components/ui/popover";
import { Settings, Check, CreditCard, X, Calendar, Info, HelpCircle } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function PopoverExamplePage() {
  // State for form example
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (name && email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Popover Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          Popovers display floating content in relation to a target element. They appear when users click or hover over an element, 
          providing additional information or interactive controls without requiring navigation to another page.
        </p>
        
        {/* Basic Popover */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Popover</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-4">
                <p className="text-dark-grey font-calibre mb-2">Simple popover with a trigger button</p>
                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <Info className="mr-2 h-4 w-4" />
                        More Information
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Popover Title</h4>
                          <p className="text-sm text-muted-foreground">
                            This is a basic popover component that appears when you click the trigger button.
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <Info className="mr-2 h-4 w-4" />
      More Information
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Popover Title</h4>
        <p className="text-sm text-muted-foreground">
          This is a basic popover component that appears when you click the trigger button.
        </p>
      </div>
    </div>
  </PopoverContent>
</Popover>`}
            </pre>
          </div>
        </div>
        
        {/* Interactive Popover */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Interactive Popover</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-4">
                <p className="text-dark-grey font-calibre mb-2">Popover with interactive form elements</p>
                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Update Profile
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Profile Details</h4>
                          <p className="text-sm text-muted-foreground">
                            Update your profile information.
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                              Name
                            </Label>
                            <Input 
                              id="name" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)} 
                              className="col-span-2"
                            />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="email" className="text-left">
                              Email
                            </Label>
                            <Input 
                              id="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              className="col-span-2"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleSubmit} disabled={!name || !email}>
                            {submitted ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Saved
                              </>
                            ) : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Check } from "lucide-react";
import { useState } from "react";

// State for form example
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);

const handleSubmit = () => {
  if (name && email) {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }
};

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <Settings className="mr-2 h-4 w-4" />
      Update Profile
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Profile Details</h4>
        <p className="text-sm text-muted-foreground">
          Update your profile information.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="name" className="text-left">
            Name
          </Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="col-span-2"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!name || !email}>
          {submitted ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved
            </>
          ) : "Save Changes"}
        </Button>
      </div>
    </div>
  </PopoverContent>
</Popover>`}
            </pre>
          </div>
        </div>
        
        {/* Help Tooltips */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Help Tooltips</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-4">
                <p className="text-dark-grey font-calibre mb-2">Using popovers as help tooltips in a form</p>
                <div className="flex justify-center">
                  <Card className="w-[450px]">
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                      <CardDescription>Enter your payment details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                    <HelpCircle className="h-4 w-4" />
                                    <span className="sr-only">Card number help</span>
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent side="top" className="w-80">
                                  <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Card Number</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Enter the 16-digit number on the front of your card without spaces or dashes.
                                    </p>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                            <Input id="card-number" placeholder="4242 4242 4242 4242" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                      <HelpCircle className="h-4 w-4" />
                                      <span className="sr-only">Expiry date help</span>
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent side="top" className="w-80">
                                    <div className="space-y-2">
                                      <h4 className="font-medium leading-none">Expiry Date</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Enter the expiration date in MM/YY format.
                                      </p>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="grid gap-2">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="cvc">CVC</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                      <HelpCircle className="h-4 w-4" />
                                      <span className="sr-only">CVC help</span>
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent side="top" className="w-80">
                                    <div className="space-y-2">
                                      <h4 className="font-medium leading-none">CVC</h4>
                                      <p className="text-sm text-muted-foreground">
                                        The 3-digit security code on the back of your card.
                                      </p>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Save Card
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, HelpCircle } from "lucide-react";

<Card className="w-[450px]">
  <CardHeader>
    <CardTitle>Payment Information</CardTitle>
    <CardDescription>Enter your payment details</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="card-number">Card Number</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Card number help</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Card Number</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter the 16-digit number on the front of your card without spaces or dashes.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Input id="card-number" placeholder="4242 4242 4242 4242" />
        </div>
        {/* Additional fields omitted for brevity */}
      </div>
    </form>
  </CardContent>
  <CardFooter className="justify-end">
    <Button>
      <CreditCard className="mr-2 h-4 w-4" />
      Save Card
    </Button>
  </CardFooter>
</Card>`}
            </pre>
          </div>
        </div>
        
        {/* Positioned Popovers */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Positioned Popovers</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto space-y-6">
              <div className="space-y-4">
                <p className="text-dark-grey font-calibre mb-2">Popovers positioned on different sides</p>
                <div className="flex justify-center">
                  <div className="flex flex-wrap gap-4 justify-center items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Top</Button>
                      </PopoverTrigger>
                      <PopoverContent side="top" className="w-60">
                        <p className="text-sm">This popover appears on the top side of the trigger.</p>
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Right</Button>
                      </PopoverTrigger>
                      <PopoverContent side="right" className="w-60">
                        <p className="text-sm">This popover appears on the right side of the trigger.</p>
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Bottom</Button>
                      </PopoverTrigger>
                      <PopoverContent side="bottom" className="w-60">
                        <p className="text-sm">This popover appears on the bottom side of the trigger.</p>
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Left</Button>
                      </PopoverTrigger>
                      <PopoverContent side="left" className="w-60">
                        <p className="text-sm">This popover appears on the left side of the trigger.</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Top popover
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top" className="w-60">
    <p className="text-sm">This popover appears on the top side of the trigger.</p>
  </PopoverContent>
</Popover>

// Right popover
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Right</Button>
  </PopoverTrigger>
  <PopoverContent side="right" className="w-60">
    <p className="text-sm">This popover appears on the right side of the trigger.</p>
  </PopoverContent>
</Popover>

// Bottom popover
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Bottom</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" className="w-60">
    <p className="text-sm">This popover appears on the bottom side of the trigger.</p>
  </PopoverContent>
</Popover>

// Left popover
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Left</Button>
  </PopoverTrigger>
  <PopoverContent side="left" className="w-60">
    <p className="text-sm">This popover appears on the left side of the trigger.</p>
  </PopoverContent>
</Popover>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Popover Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Popover component is composed of several parts that must be used within the correct structure.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Popover</td>
                          <td className="border border-light-grey px-4 py-2">The root container component.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PopoverTrigger</td>
                          <td className="border border-light-grey px-4 py-2">The element that triggers the popover. Use <code>asChild</code> to wrap a custom element.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PopoverContent</td>
                          <td className="border border-light-grey px-4 py-2">The content displayed inside the popover.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PopoverAnchor</td>
                          <td className="border border-light-grey px-4 py-2">(Optional) An element to anchor the popover to, different from the trigger.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">PopoverContent Props</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The PopoverContent component accepts the following key props to customize its behavior.
                  </p>
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
                          <td className="border border-light-grey px-4 py-2 font-mono">align</td>
                          <td className="border border-light-grey px-4 py-2"><code>'start' | 'center' | 'end'</code></td>
                          <td className="border border-light-grey px-4 py-2">Alignment of the popover relative to the trigger. Default is 'center'.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">side</td>
                          <td className="border border-light-grey px-4 py-2"><code>'top' | 'right' | 'bottom' | 'left'</code></td>
                          <td className="border border-light-grey px-4 py-2">The side of the trigger where the popover appears.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">sideOffset</td>
                          <td className="border border-light-grey px-4 py-2"><code>number</code></td>
                          <td className="border border-light-grey px-4 py-2">Distance in pixels from the trigger. Default is 4px.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">className</td>
                          <td className="border border-light-grey px-4 py-2"><code>string</code></td>
                          <td className="border border-light-grey px-4 py-2">Additional CSS class names for styling.</td>
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