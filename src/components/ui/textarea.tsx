import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input bg-transparent placeholder:text-muted-foreground",
        "w-full px-3 py-2 text-base shadow-xs outline-none",
        "border rounded-[0px] min-h-[80px]",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "hover:border-foreground",
        "transition-[color,box-shadow]",
        "font-calibre resize-vertical",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
