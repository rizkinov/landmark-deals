"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Github, LifeBuoy, LogOut, Mail, MessageSquare, PlusCircle, Settings, User } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CBREButton } from "@/components/cbre-button";

export default function NavigationMenuExamplePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Navigation Menu Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Navigation Menu component is a responsive navigation pattern that provides users with structured access to pages and sections of your application, supporting dropdown menus for organizing related links.
        </p>
        
        {/* Basic Navigation Menu */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Navigation Menu</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <BasicExample />
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/"
              >
                <div className="mb-2 mt-4 text-lg font-medium">
                  CBRE Web Elements
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  A beautifully designed component library for CBRE 
                  digital products and websites.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/docs" title="Introduction">
            Learn about the core concepts of CBRE Web Elements.
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install and set up CBRE Web Elements.
          </ListItem>
          <ListItem href="/docs/components" title="Components">
            Explore the component library.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <ListItem href="/docs/components/button" title="Button">
            Create consistently styled buttons with variants.
          </ListItem>
          <ListItem href="/docs/components/card" title="Card">
            Containers for related content and actions.
          </ListItem>
          <ListItem href="/docs/components/dialog" title="Dialog">
            Modal overlays for focused interactions.
          </ListItem>
          <ListItem href="/docs/components/input" title="Input">
            Form controls for data entry and collection.
          </ListItem>
          <ListItem href="/docs/components/select" title="Select">
            Dropdown menus for selecting options.
          </ListItem>
          <ListItem href="/docs/components/tabs" title="Tabs">
            Organize content into separate views.
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href="/docs" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Documentation
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
            </pre>
          </div>
        </div>
        
        {/* Horizontal Navigation */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Horizontal Navigation</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <HorizontalExample />
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <Link href="/about" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          About
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href="/services" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Services
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href="/properties" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Properties
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link href="/contact" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Contact
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
            </pre>
          </div>
        </div>
        
        {/* With User Menu Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">With User Menu</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <UserMenuExample />
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <User className="size-4 mr-2" /> John Doe
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[220px] gap-3 p-4">
          <ListItem href="/profile" title="Profile" icon={<User className="size-4" />} />
          <ListItem href="/settings" title="Settings" icon={<Settings className="size-4" />} />
          <ListItem href="/messages" title="Messages" icon={<MessageSquare className="size-4" />} />
          <li className="border-t my-2 pt-2">
            <NavigationMenuLink asChild>
              <a href="/logout" className="flex w-full items-center p-2 hover:bg-accent hover:text-accent-foreground rounded-md">
                <LogOut className="size-4 mr-2" /> 
                <span>Logout</span>
              </a>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
            </pre>
          </div>
        </div>
        
        {/* Responsive Navigation Menu */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Responsive Navigation Menu</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <p className="text-dark-grey mb-4">
                The NavigationMenu component is responsive by design. On smaller screens, consider using a mobile menu pattern with a hamburger icon or implementing the NavigationMenu with adaptive layouts.
              </p>
              <p className="text-dark-grey">
                For complete responsive navigation, you might combine the NavigationMenu with other UI patterns like a slide-out drawer for mobile views, while keeping the full navigation menu visible on desktop.
              </p>
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
                  <h3 className="text-xl font-calibre font-medium mb-3">NavigationMenu Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The NavigationMenu component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">NavigationMenu</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">NavigationMenu Props</h3>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { 
    title: string; 
    icon?: React.ReactNode;
  }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          {children && <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function BasicExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      CBRE Web Elements
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A beautifully designed component library for CBRE 
                      digital products and websites.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Learn about the core concepts of CBRE Web Elements.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install and set up CBRE Web Elements.
              </ListItem>
              <ListItem href="/docs/components" title="Components">
                Explore the component library.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/docs/components/button" title="Button">
                Create consistently styled buttons with variants.
              </ListItem>
              <ListItem href="/docs/components/card" title="Card">
                Containers for related content and actions.
              </ListItem>
              <ListItem href="/docs/components/dialog" title="Dialog">
                Modal overlays for focused interactions.
              </ListItem>
              <ListItem href="/docs/components/input" title="Input">
                Form controls for data entry and collection.
              </ListItem>
              <ListItem href="/docs/components/select" title="Select">
                Dropdown menus for selecting options.
              </ListItem>
              <ListItem href="/docs/components/tabs" title="Tabs">
                Organize content into separate views.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function HorizontalExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/services" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Services
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/properties" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Properties
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function UserMenuExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <User className="size-4 mr-2" /> John Doe
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-3 p-4">
              <ListItem href="/profile" title="Profile" icon={<User className="size-4" />} />
              <ListItem href="/settings" title="Settings" icon={<Settings className="size-4" />} />
              <ListItem href="/messages" title="Messages" icon={<MessageSquare className="size-4" />} />
              <li className="border-t my-2 pt-2">
                <NavigationMenuLink asChild>
                  <a href="/logout" className="flex w-full items-center p-2 hover:bg-accent hover:text-accent-foreground rounded-md">
                    <LogOut className="size-4 mr-2" /> 
                    <span>Logout</span>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function cn(...inputs: (string | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
} 