"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

// Define type for menu items with support for various item types
export type CBREDropdownMenuItemType = 
  | { type: "item"; label: string; onClick?: () => void; disabled?: boolean; variant?: "default" | "destructive" }
  | { type: "checkbox"; label: string; checked: boolean; onCheckedChange: (checked: boolean) => void; disabled?: boolean }
  | { type: "radio"; label: string; value: string; disabled?: boolean }
  | { type: "submenu"; label: string; items: CBREDropdownMenuItemType[]; disabled?: boolean }
  | { type: "label"; label: string }
  | { type: "separator" };

interface CBREDropdownMenuProps {
  trigger: React.ReactNode;
  items: CBREDropdownMenuItemType[];
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  radioValue?: string;
  onRadioValueChange?: (value: string) => void;
}

/**
 * CBREDropdownMenu - A styled dropdown menu component following CBRE design
 * 
 * Features:
 * - CBRE styling with sharp corners and proper colors
 * - Support for various item types (regular, checkbox, radio, submenu)
 * - Customizable trigger element
 */
export function CBREDropdownMenu({
  trigger,
  items,
  className,
  align = "start",
  side = "bottom",
  radioValue,
  onRadioValueChange
}: CBREDropdownMenuProps) {
  const hasRadioItems = items.some(item => item.type === "radio");
  
  // Render the menu content based on item types
  const renderMenuItems = (menuItems: CBREDropdownMenuItemType[], inSubmenu = false) => {
    let radioItems: CBREDropdownMenuItemType[] = [];
    let nonRadioItems: CBREDropdownMenuItemType[] = [];
    
    // Separate radio items to wrap them in RadioGroup
    if (!inSubmenu) {
      menuItems.forEach(item => {
        if (item.type === "radio") {
          radioItems.push(item);
        } else {
          nonRadioItems.push(item);
        }
      });
    } else {
      nonRadioItems = menuItems;
    }
    
    return (
      <>
        {/* Render non-radio items */}
        {nonRadioItems.map((item, index) => {
          switch (item.type) {
            case "item":
              return (
                <DropdownMenuItem 
                  key={index} 
                  onClick={item.onClick}
                  disabled={item.disabled}
                  variant={item.variant}
                  className="text-dark-grey hover:text-cbre-green"
                >
                  {item.label}
                </DropdownMenuItem>
              );
            case "checkbox":
              return (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={item.checked}
                  onCheckedChange={item.onCheckedChange}
                  disabled={item.disabled}
                  className="text-dark-grey hover:text-cbre-green"
                >
                  {item.label}
                </DropdownMenuCheckboxItem>
              );
            case "submenu":
              return (
                <DropdownMenuSub key={index}>
                  <DropdownMenuSubTrigger 
                    disabled={item.disabled}
                    className="text-dark-grey hover:text-cbre-green"
                  >
                    {item.label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {renderMenuItems(item.items, true)}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              );
            case "label":
              return (
                <DropdownMenuLabel key={index} className="text-cbre-green font-medium">
                  {item.label}
                </DropdownMenuLabel>
              );
            case "separator":
              return <DropdownMenuSeparator key={index} />;
            default:
              return null;
          }
        })}
        
        {/* Render radio items in a RadioGroup */}
        {radioItems.length > 0 && (
          <DropdownMenuRadioGroup value={radioValue} onValueChange={onRadioValueChange}>
            {radioItems.map((item, index) => {
              if (item.type === "radio") {
                return (
                  <DropdownMenuRadioItem 
                    key={index} 
                    value={item.value}
                    disabled={item.disabled}
                    className="text-dark-grey hover:text-cbre-green"
                  >
                    {item.label}
                  </DropdownMenuRadioItem>
                );
              }
              return null;
            })}
          </DropdownMenuRadioGroup>
        )}
      </>
    );
  };

  // Create a custom trigger if a string is provided
  const triggerElement = typeof trigger === 'string' ? (
    <Button variant="outline" className="border-light-grey flex gap-1 items-center">
      {trigger}
      <ChevronDown className="h-4 w-4 text-dark-grey" />
    </Button>
  ) : trigger;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {triggerElement}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        side={side} 
        className={cn("border-light-grey", className)}
      >
        {items.length > 0 ? (
          renderMenuItems(items)
        ) : (
          <DropdownMenuItem disabled>No items</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 