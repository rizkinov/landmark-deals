"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

interface CBREAccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
}

/**
 * CBREAccordion - A styled accordion component following CBRE design
 * 
 * Features:
 * - CBRE green text for headers
 * - Top and bottom borders for each item
 * - Custom arrow icon with CBRE styling
 */
export function CBREAccordion({
  items,
  className,
  type = "single",
  defaultValue,
  collapsible = true,
}: CBREAccordionProps) {
  // Generate default values if none provided
  const defaultVal = defaultValue || (type === "single" ? "item-0" : undefined);
  
  return (
    <div className={cn("w-full", className)}>
      {type === "single" ? (
        <Accordion
          type="single"
          defaultValue={defaultVal as string}
          collapsible={collapsible}
          className="w-full"
        >
          {items.map((item, index) => (
            <AccordionItem
              key={`item-${index}`}
              value={`item-${index}`}
              className="border-t border-b border-[#CAD1D3] py-0"
            >
              <AccordionTrigger className="text-[#003F2D] font-financier text-xl md:text-2xl py-5 hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="font-calibre text-[#435254]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Accordion
          type="multiple"
          defaultValue={defaultVal as string[]}
          className="w-full"
        >
          {items.map((item, index) => (
            <AccordionItem
              key={`item-${index}`}
              value={`item-${index}`}
              className="border-t border-b border-[#CAD1D3] py-0"
            >
              <AccordionTrigger className="text-[#003F2D] font-financier text-xl md:text-2xl py-5 hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="font-calibre text-[#435254]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
} 