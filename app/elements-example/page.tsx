"use client";

import React from 'react';
import { CBREButton } from '@/components/cbre-button';
import Link from 'next/link';

// Group UI elements by category for better organization
const elementCategories = [
  {
    name: "Buttons & Actions",
    description: "Interactive components that trigger actions or navigate between pages.",
    elements: [
      {
        name: "Button",
        description: "A clickable element that performs an action or submits a form.",
        path: "/elements-example/button",
        status: "completed"
      },
      {
        name: "Dropdown Menu",
        description: "A menu that appears when a button is clicked.",
        path: "/elements-example/dropdown-menu",
        status: "completed"
      },
      {
        name: "Toggle",
        description: "A control for a binary on/off state.",
        path: "/elements-example/toggle",
        status: "completed"
      },
      {
        name: "Toggle Group",
        description: "A group of toggle controls.",
        path: "/elements-example/toggle-group",
        status: "completed"
      },
    ]
  },
  {
    name: "Layout & Structure",
    description: "Components for organizing content and creating page structures.",
    elements: [
      {
        name: "Accordion",
        description: "A vertically stacked set of interactive headings that each reveal a section of content.",
        path: "/elements-example/accordion",
        status: "completed"
      },
      {
        name: "Card",
        description: "A container for displaying content and actions about a single subject.",
        path: "/elements-example/card",
        status: "completed"
      },
      {
        name: "Tabs",
        description: "A set of layered sections of content, each associated with a tab.",
        path: "/elements-example/tabs",
        status: "completed"
      },
      {
        name: "Separator",
        description: "A visual divider between content or elements.",
        path: "/elements-example/separator",
        status: "completed"
      },
      {
        name: "Resizable",
        description: "A component that can be resized by the user.",
        path: "/elements-example/resizable",
        status: "completed"
      },
      {
        name: "Sidebar",
        description: "A side navigation container for websites and applications.",
        path: "/elements-example/sidebar",
        status: "completed"
      },
    ]
  },
  {
    name: "Block Components",
    description: "Pre-built content blocks that combine multiple elements for common use cases.",
    elements: [
      {
        name: "Quote Block",
        description: "A styled testimonial or quote block with optional image.",
        path: "/elements-example/block-components/quote-block",
        status: "completed"
      },
      {
        name: "CTA Block",
        description: "A call-to-action block with heading and button.",
        path: "/elements-example/block-components/cta-block",
        status: "completed"
      }
    ]
  },
  {
    name: "Forms & Inputs",
    description: "Components for user input, form controls, and data collection.",
    elements: [
      {
        name: "Checkbox",
        description: "A control that allows selecting multiple items from a set.",
        path: "/elements-example/checkbox",
        status: "completed"
      },
      {
        name: "Input",
        description: "A form field for collecting text input from users.",
        path: "/elements-example/input",
        status: "completed"
      },
      {
        name: "Select",
        description: "A dropdown control for selecting an option from a list.",
        path: "/elements-example/select",
        status: "completed"
      },
      {
        name: "Textarea",
        description: "A multi-line text input for longer form content.",
        path: "/elements-example/textarea",
        status: "completed"
      },
      {
        name: "Label",
        description: "A text label for form controls.",
        path: "/elements-example/label",
        status: "completed"
      },
      {
        name: "Form",
        description: "A comprehensive form implementation with validation.",
        path: "/elements-example/form",
        status: "completed"
      },
      {
        name: "Slider",
        description: "An input for selecting a value from a range.",
        path: "/elements-example/slider",
        status: "completed"
      },
    ]
  },
  {
    name: "Navigation",
    description: "Components for navigating through applications and websites.",
    elements: [
      {
        name: "Breadcrumb",
        description: "A navigation aid showing the current location within a hierarchy.",
        path: "/elements-example/breadcrumb",
        status: "completed"
      },
      {
        name: "Navigation Menu",
        description: "A responsive navigation component with dropdown menus.",
        path: "/elements-example/navigation-menu",
        status: "completed"
      },
      {
        name: "Menubar",
        description: "A horizontal menu with dropdown menus.",
        path: "/elements-example/menubar",
        status: "completed"
      },
      {
        name: "Pagination",
        description: "Controls for navigating between pages of content.",
        path: "/elements-example/pagination",
        status: "completed"
      },
    ]
  },
  {
    name: "Feedback & Overlays",
    description: "Components for displaying notifications, alerts, and contextual information.",
    elements: [
      {
        name: "Alert",
        description: "A component that displays a short, important message.",
        path: "/elements-example/alert",
        status: "completed"
      },
      {
        name: "Alert Dialog",
        description: "A modal dialog that interrupts the user with important content.",
        path: "/elements-example/alert-dialog",
        status: "completed"
      },
      {
        name: "Dialog",
        description: "A window overlaid on the primary window, rendering content over the page.",
        path: "/elements-example/dialog",
        status: "completed"
      },
      {
        name: "Popover",
        description: "A small overlay that appears on hover or click.",
        path: "/elements-example/popover",
        status: "completed"
      },
      {
        name: "Hover Card",
        description: "A card that appears when hovering over an element.",
        path: "/elements-example/cbre-hover-card",
        status: "completed"
      },
      {
        name: "Toast",
        description: "A brief notification that appears temporarily.",
        path: "/elements-example/toast",
        status: "completed"
      },
      {
        name: "Tooltip",
        description: "A small informative message that appears on hover.",
        path: "/elements-example/tooltip",
        status: "completed"
      },
    ]
  },
  {
    name: "Data Display",
    description: "Components for displaying data, tables, and visualizations.",
    elements: [
      {
        name: "Table",
        description: "A component for displaying tabular data.",
        path: "/elements-example/table",
        status: "completed"
      },
      {
        name: "Data Table",
        description: "An enhanced table with sorting, filtering, and pagination.",
        path: "/elements-example/data-table",
        status: "completed"
      },
      {
        name: "Calendar",
        description: "A calendar component for date display and selection.",
        path: "/elements-example/calendar",
        status: "completed"
      },
      {
        name: "Date Picker",
        description: "A component for selecting dates.",
        path: "/elements-example/date-picker",
        status: "completed"
      },
      {
        name: "Chart",
        description: "Data visualization components for graphs and charts.",
        path: "/elements-example/charts",
        status: "completed"
      },
      {
        name: "Carousel",
        description: "A slideshow component for cycling through elements.",
        path: "/elements-example/carousel",
        status: "completed"
      },
      {
        name: "Scroll Area",
        description: "A scrollable container with custom styled scrollbars.",
        path: "/elements-example/scroll-area",
        status: "completed"
      },
    ]
  }
];

export default function ElementsExamplePage() {
  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-financier text-cbre-green mb-6">CBRE UI Elements</h1>
        
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          This section showcases all the shadcn UI elements that have been customized to match CBRE's design language.
          Each element follows CBRE's color palette, typography, and styling guidelines, creating a cohesive and
          consistent user experience across all applications.
        </p>
        
        <div className="mb-8 flex items-center">
          <Link href="/design-system">
            <CBREButton variant="primary">View Design System</CBREButton>
          </Link>
          <span className="ml-4 text-dark-grey">View color palette, typography, and usage guidelines</span>
        </div>
        
        <div className="space-y-16">
          {elementCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border-t border-light-grey pt-6">
              <h2 className="text-4xl font-financier text-cbre-green mb-3">{category.name}</h2>
              <p className="text-dark-grey font-calibre mb-6">{category.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {category.elements.map((element, elementIndex) => (
                  <div key={elementIndex} className="bg-[var(--lighter-grey)] p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-financier text-cbre-green">{element.name}</h3>
                      {element.status === "completed" ? (
                        <span className="text-xs px-2 py-1 bg-accent-green text-cbre-green font-calibre">
                          Ready
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-light-grey text-dark-grey font-calibre">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-dark-grey font-calibre mb-6 flex-grow">{element.description}</p>
                    {element.status === "completed" ? (
                      <Link href={element.path}>
                        <CBREButton variant="view-more" className="w-full justify-center">
                          View {element.name}
                        </CBREButton>
                      </Link>
                    ) : (
                      <CBREButton variant="view-more" className="w-full justify-center opacity-50 cursor-not-allowed" disabled>
                        Coming Soon
                      </CBREButton>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <Link href="/">
            <CBREButton variant="outline">Back to Home</CBREButton>
          </Link>
        </div>
      </div>
    </div>
  );
} 