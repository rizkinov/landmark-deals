import * as React from "react";
import { SidebarProvider as BaseSidebarProvider, Sidebar as BaseSidebar, SidebarTrigger as BaseSidebarTrigger, SidebarRail as BaseSidebarRail, SidebarContent as BaseSidebarContent, SidebarHeader as BaseSidebarHeader, SidebarFooter as BaseSidebarFooter, SidebarGroup as BaseSidebarGroup, SidebarGroupLabel as BaseSidebarGroupLabel, SidebarGroupContent as BaseSidebarGroupContent, SidebarGroupAction as BaseSidebarGroupAction, SidebarMenu as BaseSidebarMenu, SidebarMenuItem as BaseSidebarMenuItem, SidebarMenuButton as BaseSidebarMenuButton, SidebarMenuAction as BaseSidebarMenuAction, SidebarMenuBadge as BaseSidebarMenuBadge, SidebarMenuSkeleton as BaseSidebarMenuSkeleton, SidebarMenuSub as BaseSidebarMenuSub, SidebarMenuSubItem as BaseSidebarMenuSubItem, SidebarMenuSubButton as BaseSidebarMenuSubButton, SidebarSeparator as BaseSidebarSeparator, useSidebar } from "@/components/ui/sidebar";
/**
 * CBRESidebarProvider - A CBRE-styled sidebar provider component
 *
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar provider with CBRE-specific defaults
 */
declare function CBRESidebarProvider({ className, ...props }: React.ComponentProps<typeof BaseSidebarProvider>): React.JSX.Element;
/**
 * CBRESidebar - A CBRE-styled sidebar component
 *
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar with CBRE-specific styling
 */
declare function CBRESidebar({ className, variant, ...props }: React.ComponentProps<typeof BaseSidebar>): React.JSX.Element;
/**
 * CBRESidebarTrigger - A CBRE-styled sidebar trigger button
 *
 * Features:
 * - CBRE styling with customizable props
 * - Uses the shadcn/ui sidebar trigger with CBRE-specific styling
 */
declare function CBRESidebarTrigger({ className, ...props }: React.ComponentProps<typeof BaseSidebarTrigger>): React.JSX.Element;
/**
 * CBRESidebarRail - A CBRE-styled sidebar rail for resizing
 */
declare function CBRESidebarRail(props: React.ComponentProps<typeof BaseSidebarRail>): React.JSX.Element;
/**
 * CBRESidebarHeader - A CBRE-styled sidebar header
 */
declare function CBRESidebarHeader({ className, ...props }: React.ComponentProps<typeof BaseSidebarHeader>): React.JSX.Element;
/**
 * CBRESidebarContent - A CBRE-styled sidebar content area
 */
declare function CBRESidebarContent({ className, ...props }: React.ComponentProps<typeof BaseSidebarContent>): React.JSX.Element;
/**
 * CBRESidebarFooter - A CBRE-styled sidebar footer
 */
declare function CBRESidebarFooter({ className, ...props }: React.ComponentProps<typeof BaseSidebarFooter>): React.JSX.Element;
/**
 * CBRESidebarSeparator - A CBRE-styled sidebar separator
 */
declare function CBRESidebarSeparator({ className, ...props }: React.ComponentProps<typeof BaseSidebarSeparator>): React.JSX.Element;
/**
 * CBRESidebarGroup - A CBRE-styled sidebar group
 */
declare function CBRESidebarGroup({ className, ...props }: React.ComponentProps<typeof BaseSidebarGroup>): React.JSX.Element;
/**
 * CBRESidebarGroupLabel - A CBRE-styled sidebar group label
 */
declare function CBRESidebarGroupLabel({ className, ...props }: React.ComponentProps<typeof BaseSidebarGroupLabel>): React.JSX.Element;
/**
 * CBRESidebarGroupContent - A CBRE-styled sidebar group content area
 */
declare function CBRESidebarGroupContent({ className, ...props }: React.ComponentProps<typeof BaseSidebarGroupContent>): React.JSX.Element;
/**
 * CBRESidebarGroupAction - A CBRE-styled sidebar group action button
 */
declare function CBRESidebarGroupAction({ className, ...props }: React.ComponentProps<typeof BaseSidebarGroupAction>): React.JSX.Element;
/**
 * CBRESidebarMenu - A CBRE-styled sidebar menu
 */
declare function CBRESidebarMenu({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenu>): React.JSX.Element;
/**
 * CBRESidebarMenuItem - A CBRE-styled sidebar menu item
 */
declare function CBRESidebarMenuItem({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuItem>): React.JSX.Element;
/**
 * CBRESidebarMenuButton - A CBRE-styled sidebar menu button
 */
declare function CBRESidebarMenuButton({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuButton>): React.JSX.Element;
/**
 * CBRESidebarMenuAction - A CBRE-styled sidebar menu action button
 */
declare function CBRESidebarMenuAction({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuAction>): React.JSX.Element;
/**
 * CBRESidebarMenuBadge - A CBRE-styled sidebar menu badge
 */
declare function CBRESidebarMenuBadge({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuBadge>): React.JSX.Element;
/**
 * CBRESidebarMenuSkeleton - A CBRE-styled sidebar menu skeleton for loading states
 */
declare function CBRESidebarMenuSkeleton({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuSkeleton>): React.JSX.Element;
/**
 * CBRESidebarMenuSub - A CBRE-styled sidebar submenu
 */
declare function CBRESidebarMenuSub({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuSub>): React.JSX.Element;
/**
 * CBRESidebarMenuSubItem - A CBRE-styled sidebar submenu item
 */
declare function CBRESidebarMenuSubItem({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuSubItem>): React.JSX.Element;
/**
 * CBRESidebarMenuSubButton - A CBRE-styled sidebar submenu button
 */
declare function CBRESidebarMenuSubButton({ className, ...props }: React.ComponentProps<typeof BaseSidebarMenuSubButton>): React.JSX.Element;
export { CBRESidebarProvider, CBRESidebar, CBRESidebarTrigger, CBRESidebarRail, CBRESidebarContent, CBRESidebarHeader, CBRESidebarFooter, CBRESidebarSeparator, CBRESidebarGroup, CBRESidebarGroupLabel, CBRESidebarGroupContent, CBRESidebarGroupAction, CBRESidebarMenu, CBRESidebarMenuItem, CBRESidebarMenuButton, CBRESidebarMenuAction, CBRESidebarMenuBadge, CBRESidebarMenuSkeleton, CBRESidebarMenuSub, CBRESidebarMenuSubItem, CBRESidebarMenuSubButton, useSidebar };
export { CBRESidebarProvider as SidebarProvider, CBRESidebar as Sidebar, CBRESidebarTrigger as SidebarTrigger, CBRESidebarRail as SidebarRail, CBRESidebarContent as SidebarContent, CBRESidebarHeader as SidebarHeader, CBRESidebarFooter as SidebarFooter, CBRESidebarSeparator as SidebarSeparator, CBRESidebarGroup as SidebarGroup, CBRESidebarGroupLabel as SidebarGroupLabel, CBRESidebarGroupContent as SidebarGroupContent, CBRESidebarGroupAction as SidebarGroupAction, CBRESidebarMenu as SidebarMenu, CBRESidebarMenuItem as SidebarMenuItem, CBRESidebarMenuButton as SidebarMenuButton, CBRESidebarMenuAction as SidebarMenuAction, CBRESidebarMenuBadge as SidebarMenuBadge, CBRESidebarMenuSkeleton as SidebarMenuSkeleton, CBRESidebarMenuSub as SidebarMenuSub, CBRESidebarMenuSubItem as SidebarMenuSubItem, CBRESidebarMenuSubButton as SidebarMenuSubButton };
