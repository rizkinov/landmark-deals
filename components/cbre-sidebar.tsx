"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Re-export all components from the ui/sidebar
import {
  SidebarProvider as BaseSidebarProvider,
  Sidebar as BaseSidebar,
  SidebarTrigger as BaseSidebarTrigger,
  SidebarRail as BaseSidebarRail,
  SidebarContent as BaseSidebarContent,
  SidebarHeader as BaseSidebarHeader,
  SidebarFooter as BaseSidebarFooter,
  SidebarGroup as BaseSidebarGroup,
  SidebarGroupLabel as BaseSidebarGroupLabel,
  SidebarGroupContent as BaseSidebarGroupContent,
  SidebarGroupAction as BaseSidebarGroupAction,
  SidebarMenu as BaseSidebarMenu,
  SidebarMenuItem as BaseSidebarMenuItem,
  SidebarMenuButton as BaseSidebarMenuButton,
  SidebarMenuAction as BaseSidebarMenuAction,
  SidebarMenuBadge as BaseSidebarMenuBadge,
  SidebarMenuSkeleton as BaseSidebarMenuSkeleton,
  SidebarMenuSub as BaseSidebarMenuSub,
  SidebarMenuSubItem as BaseSidebarMenuSubItem,
  SidebarMenuSubButton as BaseSidebarMenuSubButton,
  SidebarSeparator as BaseSidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar"

/**
 * CBRESidebarProvider - A CBRE-styled sidebar provider component
 * 
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar provider with CBRE-specific defaults
 */
function CBRESidebarProvider({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarProvider>) {
  return (
    <BaseSidebarProvider
      className={cn("text-dark-grey", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebar - A CBRE-styled sidebar component
 * 
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar with CBRE-specific styling
 */
function CBRESidebar({
  className,
  variant = "sidebar",
  ...props
}: React.ComponentProps<typeof BaseSidebar>) {
  return (
    <BaseSidebar
      className={cn(
        "border-light-grey",
        className
      )}
      variant={variant}
      {...props}
    />
  )
}

/**
 * CBRESidebarTrigger - A CBRE-styled sidebar trigger button
 * 
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar trigger with CBRE-specific styling
 */
function CBRESidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarTrigger>) {
  return (
    <BaseSidebarTrigger
      className={cn("text-cbre-green hover:bg-lighter-grey", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarRail - A CBRE-styled sidebar rail for resizing
 */
function CBRESidebarRail(props: React.ComponentProps<typeof BaseSidebarRail>) {
  return <BaseSidebarRail {...props} />
}

/**
 * CBRESidebarHeader - A CBRE-styled sidebar header
 */
function CBRESidebarHeader({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarHeader>) {
  return (
    <BaseSidebarHeader
      className={cn("border-b border-light-grey", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarContent - A CBRE-styled sidebar content area
 */
function CBRESidebarContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarContent>) {
  return (
    <BaseSidebarContent
      className={cn("px-0", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarFooter - A CBRE-styled sidebar footer
 */
function CBRESidebarFooter({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarFooter>) {
  return (
    <BaseSidebarFooter
      className={cn("border-t border-light-grey", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarSeparator - A CBRE-styled sidebar separator
 */
function CBRESidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarSeparator>) {
  return (
    <BaseSidebarSeparator
      className={cn("bg-light-grey", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarGroup - A CBRE-styled sidebar group
 */
function CBRESidebarGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarGroup>) {
  return (
    <BaseSidebarGroup
      className={cn("py-1", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarGroupLabel - A CBRE-styled sidebar group label
 */
function CBRESidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarGroupLabel>) {
  return (
    <BaseSidebarGroupLabel
      className={cn("text-dark-grey font-financier tracking-normal", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarGroupContent - A CBRE-styled sidebar group content area
 */
function CBRESidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarGroupContent>) {
  return (
    <BaseSidebarGroupContent
      className={cn("px-1", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarGroupAction - A CBRE-styled sidebar group action button
 */
function CBRESidebarGroupAction({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarGroupAction>) {
  return (
    <BaseSidebarGroupAction
      className={cn("text-cbre-green hover:bg-lighter-grey", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenu - A CBRE-styled sidebar menu
 */
function CBRESidebarMenu({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenu>) {
  return (
    <BaseSidebarMenu
      className={cn("space-y-1", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuItem - A CBRE-styled sidebar menu item
 */
function CBRESidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuItem>) {
  return (
    <BaseSidebarMenuItem
      className={cn("", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuButton - A CBRE-styled sidebar menu button
 */
function CBRESidebarMenuButton({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuButton>) {
  return (
    <BaseSidebarMenuButton
      className={cn(
        "text-dark-grey hover:!bg-lighter-grey", 
        "data-[active=true]:!bg-dark-green data-[active=true]:!text-white", 
        className
      )}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuAction - A CBRE-styled sidebar menu action button
 */
function CBRESidebarMenuAction({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuAction>) {
  return (
    <BaseSidebarMenuAction
      className={cn("text-cbre-green hover:bg-lighter-grey", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuBadge - A CBRE-styled sidebar menu badge
 */
function CBRESidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuBadge>) {
  return (
    <BaseSidebarMenuBadge
      className={cn("bg-cbre-green text-white", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuSkeleton - A CBRE-styled sidebar menu skeleton for loading states
 */
function CBRESidebarMenuSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuSkeleton>) {
  return (
    <BaseSidebarMenuSkeleton
      className={cn("", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuSub - A CBRE-styled sidebar submenu
 */
function CBRESidebarMenuSub({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuSub>) {
  return (
    <BaseSidebarMenuSub
      className={cn("pl-6", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuSubItem - A CBRE-styled sidebar submenu item
 */
function CBRESidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuSubItem>) {
  return (
    <BaseSidebarMenuSubItem
      className={cn("", className)}
      {...props}
    />
  )
}

/**
 * CBRESidebarMenuSubButton - A CBRE-styled sidebar submenu button
 */
function CBRESidebarMenuSubButton({
  className,
  ...props
}: React.ComponentProps<typeof BaseSidebarMenuSubButton>) {
  return (
    <BaseSidebarMenuSubButton
      className={cn(
        "text-dark-grey hover:bg-lighter-grey",
        "data-[active=true]:text-cbre-green font-medium",
        className
      )}
      {...props}
    />
  )
}

export {
  CBRESidebarProvider,
  CBRESidebar,
  CBRESidebarTrigger,
  CBRESidebarRail,
  CBRESidebarContent,
  CBRESidebarHeader,
  CBRESidebarFooter,
  CBRESidebarSeparator,
  CBRESidebarGroup,
  CBRESidebarGroupLabel,
  CBRESidebarGroupContent,
  CBRESidebarGroupAction,
  CBRESidebarMenu,
  CBRESidebarMenuItem,
  CBRESidebarMenuButton,
  CBRESidebarMenuAction,
  CBRESidebarMenuBadge,
  CBRESidebarMenuSkeleton,
  CBRESidebarMenuSub,
  CBRESidebarMenuSubItem,
  CBRESidebarMenuSubButton,
  useSidebar
}

// Aliases for convenience
export {
  CBRESidebarProvider as SidebarProvider,
  CBRESidebar as Sidebar,
  CBRESidebarTrigger as SidebarTrigger,
  CBRESidebarRail as SidebarRail,
  CBRESidebarContent as SidebarContent,
  CBRESidebarHeader as SidebarHeader,
  CBRESidebarFooter as SidebarFooter,
  CBRESidebarSeparator as SidebarSeparator,
  CBRESidebarGroup as SidebarGroup,
  CBRESidebarGroupLabel as SidebarGroupLabel,
  CBRESidebarGroupContent as SidebarGroupContent,
  CBRESidebarGroupAction as SidebarGroupAction,
  CBRESidebarMenu as SidebarMenu,
  CBRESidebarMenuItem as SidebarMenuItem,
  CBRESidebarMenuButton as SidebarMenuButton,
  CBRESidebarMenuAction as SidebarMenuAction,
  CBRESidebarMenuBadge as SidebarMenuBadge,
  CBRESidebarMenuSkeleton as SidebarMenuSkeleton,
  CBRESidebarMenuSub as SidebarMenuSub,
  CBRESidebarMenuSubItem as SidebarMenuSubItem,
  CBRESidebarMenuSubButton as SidebarMenuSubButton
} 