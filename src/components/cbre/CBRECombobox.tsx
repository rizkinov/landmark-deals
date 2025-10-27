"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import { cn } from "../../lib/utils"
import { Label } from "../ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

export interface CBREComboboxProps {
  label?: string
  value: string
  onValueChange: (value: string) => void
  options: readonly string[] | string[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  emptyMessage?: string
}

export function CBRECombobox({
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select or type...",
  required = false,
  disabled = false,
  className,
  emptyMessage = "No option found. Press Enter to use custom value.",
}: CBREComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value)

  // Sync input value when value prop changes
  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  // Validate input (max 100 chars, alphanumeric + special chars)
  const validateInput = (text: string): boolean => {
    if (text.length > 100) return false
    // Allow letters, numbers, spaces, &, -, (, ), /, commas
    const validPattern = /^[a-zA-Z0-9\s&\-(),/]*$/
    return validPattern.test(text)
  }

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? "" : selectedValue
    onValueChange(newValue)
    setInputValue(newValue)
    setOpen(false)
  }

  const handleInputChange = (newInput: string) => {
    if (validateInput(newInput)) {
      setInputValue(newInput)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue && !options.includes(inputValue)) {
      e.preventDefault()
      if (validateInput(inputValue)) {
        onValueChange(inputValue)
        setOpen(false)
      }
    }
  }

  // Filter options based on input (handle null/undefined values)
  const filteredOptions = options.filter((option) =>
    option && option.toLowerCase().includes(inputValue.toLowerCase())
  )

  const displayValue = value || placeholder

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className="text-dark-grey font-calibre">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "border-input bg-transparent text-foreground placeholder:text-muted-foreground",
              "flex w-full items-center justify-between gap-2 border rounded-[0px] px-3 py-2 text-sm",
              "focus-visible:border-accent-green focus-visible:ring-accent-green/30 focus-visible:ring-[3px]",
              "hover:border-foreground",
              "shadow-xs transition-[color,box-shadow] outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "h-10 font-calibre",
              !value && "text-gray-500"
            )}
          >
            <span className="font-calibre text-gray-600">
              {displayValue}
            </span>
            <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-[0px]" align="start">
          <Command shouldFilter={false} className="font-calibre">
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="font-calibre text-gray-600"
            />
            <CommandList>
              {filteredOptions.length === 0 ? (
                <CommandEmpty>
                  <div className="py-2 px-2 text-sm text-gray-500 font-calibre">
                    {emptyMessage}
                  </div>
                  {inputValue && validateInput(inputValue) && (
                    <button
                      type="button"
                      className="w-full mt-2 px-3 py-1.5 text-sm border rounded-[0px] hover:bg-gray-100 font-calibre text-gray-600"
                      onClick={() => {
                        onValueChange(inputValue)
                        setOpen(false)
                      }}
                    >
                      Use &quot;{inputValue}&quot;
                    </button>
                  )}
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={() => handleSelect(option)}
                      className="font-calibre text-gray-600 rounded-[0px]"
                    >
                      {option}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 text-accent-green",
                          value === option ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                  {inputValue &&
                    !options.includes(inputValue) &&
                    validateInput(inputValue) && (
                      <CommandItem
                        value={inputValue}
                        onSelect={() => handleSelect(inputValue)}
                        className="border-t mt-1 pt-2 font-calibre rounded-[0px]"
                      >
                        <span className="text-accent-green font-medium">
                          Use custom: &quot;{inputValue}&quot;
                        </span>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4 text-accent-green",
                            value === inputValue ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {!validateInput(inputValue) && inputValue && (
        <p className="text-xs text-red-500 mt-1 font-calibre">
          Invalid characters or exceeds 100 character limit
        </p>
      )}
    </div>
  )
}
