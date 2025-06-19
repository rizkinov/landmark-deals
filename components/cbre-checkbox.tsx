"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { type CheckedState } from "@radix-ui/react-checkbox"

/**
 * CBRECheckboxGroup - A group of checkboxes with a shared title
 */
interface CheckboxGroupProps {
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}

function CBRECheckboxGroup({
  title,
  description,
  className,
  children
}: CheckboxGroupProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-xl font-financier text-cbre-green mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-dark-grey font-calibre text-sm">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

/**
 * CheckboxWithText - A helper function to create a checkbox with label and description
 * 
 * Not exported as a component - use composition pattern instead:
 * 
 * <div className="flex items-start space-x-2">
 *   <Checkbox id="my-checkbox" checked={checked} onCheckedChange={setChecked} />
 *   <div className="grid gap-1.5">
 *     <Label htmlFor="my-checkbox">Label text</Label>
 *     <p className="text-xs text-light-grey">Description text</p>
 *   </div>
 * </div>
 */

// Export only the CheckboxGroup to encourage composition pattern with the base Checkbox
export { CBRECheckboxGroup }

// Export aliases for backward compatibility
export { 
  Checkbox,
  CBRECheckboxGroup as CheckboxGroup
} 