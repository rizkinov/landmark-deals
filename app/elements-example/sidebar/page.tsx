"use client";

import React from 'react';
import Link from "next/link";

import { HomeIcon, MailIcon, CalendarIcon, SearchIcon, Settings2Icon, FolderIcon, UsersIcon, BriefcaseIcon, BarChartIcon, ShieldIcon } from 'lucide-react';


import { CBREButton } from '@/components/cbre-button';
import {
  CBRESidebarProvider,
  CBRESidebar,
  CBRESidebarTrigger,
  CBRESidebarHeader,
  CBRESidebarContent,
  CBRESidebarFooter,
  CBRESidebarGroup,
  CBRESidebarGroupLabel,
  CBRESidebarGroupContent,
  CBRESidebarMenu,
  CBRESidebarMenuItem,
  CBRESidebarMenuButton,
  CBRESidebarMenuSub,
  CBRESidebarMenuSubItem,
  CBRESidebarMenuSubButton,
  CBRESidebarMenuBadge,
  CBRESidebarSeparator,
  useSidebar
} from '@/components/cbre-sidebar';

// Menu items for the example
const mainMenuItems = [
  { title: "Home", icon: HomeIcon, url: "#", active: true },
  { title: "Inbox", icon: MailIcon, url: "#", badge: "3" },
  { title: "Calendar", icon: CalendarIcon, url: "#" },
  { title: "Search", icon: SearchIcon, url: "#" },
  { title: "Settings", icon: Settings2Icon, url: "#" },
];

const projectMenuItems = [
  { title: "Client Projects", icon: BriefcaseIcon, url: "#" },
  { title: "Marketing", icon: BarChartIcon, url: "#" },
  { title: "Research", icon: SearchIcon, url: "#" },
];

const teamMenuItems = [
  { title: "Marketing Team", url: "#" },
  { title: "Sales Team", url: "#" },
  { title: "Development Team", url: "#" },
  { title: "Design Team", url: "#" },
];

// Logo component for the sidebar header
function CBRELogo({textOnly = false}: {textOnly?: boolean} = {}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  if (isCollapsed) {
    return (
      <div className="flex items-center p-2 justify-center h-[60px]">
        <div className="logo-square">C</div>
      </div>
    );
  }
  
  if (textOnly) {
    return (
      <div className="h-[60px] flex items-center pl-2">
        <div className="h-6 w-14">
          <span className="logo-cbre-green"></span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center p-2 h-[60px]">
      <div className="logo-square mr-2">C</div>
      <div className="h-6 w-14">
        <span className="logo-cbre-green"></span>
      </div>
    </div>
  );
}

export default function SidebarExamplePage() {
  // State to track active item in each example
  const [basicActiveItem, setBasicActiveItem] = React.useState("Home");
  const [basicActiveProject, setBasicActiveProject] = React.useState("");
  const [basicActiveTeam, setBasicActiveTeam] = React.useState("");
  const [iconActiveItem, setIconActiveItem] = React.useState("Home");
  const [floatingActiveItem, setFloatingActiveItem] = React.useState("Home");

  // Create interactive menu items for each section
  const basicMenuItems = mainMenuItems.map(item => ({
    ...item,
    active: item.title === basicActiveItem,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setBasicActiveItem(item.title);
      setBasicActiveProject(""); // Clear active project when main item is clicked
      setBasicActiveTeam(""); // Clear active team when main item is clicked
    }
  }));

  const basicProjectItems = projectMenuItems.map(item => ({
    ...item,
    active: item.title === basicActiveProject,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setBasicActiveProject(item.title);
      setBasicActiveItem(""); // Clear active main item when project is clicked
      // Keep active team if we're on Client Projects
      if (item.title !== "Client Projects") {
        setBasicActiveTeam("");
      }
    }
  }));

  const basicTeamItems = teamMenuItems.map(item => ({
    ...item,
    active: item.title === basicActiveTeam,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setBasicActiveTeam(item.title);
      setBasicActiveProject("Client Projects"); // Set active project to Client Projects
      setBasicActiveItem(""); // Clear active main item when team is clicked
    }
  }));

  const iconMenuItems = mainMenuItems.map(item => ({
    ...item,
    badge: undefined,
    active: item.title === iconActiveItem,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIconActiveItem(item.title);
    }
  }));

  const floatingMenuItems = mainMenuItems.slice(0, 3).map(item => ({
    ...item,
    active: item.title === floatingActiveItem,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setFloatingActiveItem(item.title);
    }
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Sidebar Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The CBRE Sidebar component provides navigation for applications. It can be configured to
          collapse to icons, be fully hidden, or display different types of content sections.
        </p>
        
        {/* Basic Sidebar Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Sidebar</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey relative">
              <div className="h-[500px] flex overflow-hidden">
                <CBRESidebarProvider defaultOpen={true}>
                  <div className="flex h-full w-full relative overflow-hidden">
                    <CBRESidebar className="!static !w-64 !h-full max-w-[16rem]">
                      <CBRESidebarHeader className="h-[60px] box-border py-2">
                        <CBRELogo textOnly={true} />
                      </CBRESidebarHeader>
                      <CBRESidebarContent>
                        <CBRESidebarGroup>
                          <CBRESidebarGroupLabel>Main Navigation</CBRESidebarGroupLabel>
                          <CBRESidebarGroupContent>
                            <CBRESidebarMenu>
                              {basicMenuItems.map((item) => (
                                <CBRESidebarMenuItem key={item.title}>
                                  <CBRESidebarMenuButton asChild isActive={item.active}>
                                    <a 
                                      href={item.url} 
                                      className="flex w-full items-center py-2"
                                      onClick={item.onClick}
                                    >
                                      <item.icon className="size-5 mr-3" />
                                      <span>{item.title}</span>
                                      {item.badge && (
                                        <CBRESidebarMenuBadge className="ml-auto">
                                          {item.badge}
                                        </CBRESidebarMenuBadge>
                                      )}
                                    </a>
                                  </CBRESidebarMenuButton>
                                </CBRESidebarMenuItem>
                              ))}
                            </CBRESidebarMenu>
                          </CBRESidebarGroupContent>
                        </CBRESidebarGroup>
                        
                        <CBRESidebarSeparator />
                        
                        <CBRESidebarGroup>
                          <CBRESidebarGroupLabel>Projects</CBRESidebarGroupLabel>
                          <CBRESidebarGroupContent>
                            <CBRESidebarMenu>
                              {basicProjectItems.map((item) => (
                                <CBRESidebarMenuItem key={item.title}>
                                  <CBRESidebarMenuButton asChild isActive={item.active}>
                                    <a 
                                      href={item.url} 
                                      className="flex w-full items-center py-2"
                                      onClick={item.onClick}
                                    >
                                      <item.icon className="size-5 mr-3" />
                                      <span>{item.title}</span>
                                    </a>
                                  </CBRESidebarMenuButton>
                                  
                                  {item.title === "Client Projects" && (
                                    <CBRESidebarMenuSub>
                                      {basicTeamItems.map((subItem) => (
                                        <CBRESidebarMenuSubItem key={subItem.title}>
                                          <CBRESidebarMenuSubButton asChild isActive={subItem.active}>
                                            <a
                                              href={subItem.url} 
                                              className="flex w-full"
                                              onClick={subItem.onClick}
                                            >
                                              <span>{subItem.title}</span>
                                            </a>
                                          </CBRESidebarMenuSubButton>
                                        </CBRESidebarMenuSubItem>
                                      ))}
                                    </CBRESidebarMenuSub>
                                  )}
                                </CBRESidebarMenuItem>
                              ))}
                            </CBRESidebarMenu>
                          </CBRESidebarGroupContent>
                        </CBRESidebarGroup>
                      </CBRESidebarContent>
                      <CBRESidebarFooter>
                        <div className="flex items-center p-2">
                          <div className="!size-8 !rounded-full !overflow-hidden !flex !items-center !justify-center !border !border-light-grey">
                            <img 
                              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='%23004b23' stroke='none'><rect width='24' height='24' fill='%23004b23' rx='12' ry='12'/><path d='M12 13a4 4 0 100-8 4 4 0 000 8z' fill='white'/><path d='M18 21v-2a4 4 0 00-4-4H10a4 4 0 00-4 4v2' fill='white'/></svg>"
                              alt="Jane Smith" 
                              className="!w-full !h-full !object-cover"
                            />
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium">Jane Smith</div>
                            <div className="text-xs text-dark-grey">Administrator</div>
                          </div>
                        </div>
                      </CBRESidebarFooter>
                    </CBRESidebar>
                    
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <div className="flex items-center h-[60px] py-0 box-border">
                        <CBRESidebarTrigger className="mr-4 ml-4" />
                        <h2 className="text-xl font-financier text-cbre-green">Dashboard</h2>
                      </div>
                      
                      <div className="border-t border-light-grey p-6 flex-1 overflow-auto">
                        <div className="max-w-2xl mx-auto">
                          <p className="text-dark-grey font-calibre mb-4">
                            This is an example of the sidebar in use with a main content area. 
                            You can toggle the sidebar open and closed using the button in the header.
                          </p>
                          <p className="text-dark-grey font-calibre mb-4">
                            The sidebar provides navigation, while the main content area displays the actual content.
                            This layout is common in dashboard applications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CBRESidebarProvider>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRESidebarProvider defaultOpen={true}>
  <CBRESidebar>
    <CBRESidebarHeader className="h-[60px] box-border py-2">
      <CBRELogo />
    </CBRESidebarHeader>
    <CBRESidebarContent>
      <CBRESidebarGroup>
        <CBRESidebarGroupLabel>Main Navigation</CBRESidebarGroupLabel>
        <CBRESidebarGroupContent>
          <CBRESidebarMenu>
            {basicMenuItems.map((item) => (
              <CBRESidebarMenuItem key={item.title}>
                <CBRESidebarMenuButton asChild isActive={item.active}>
                  <a 
                    href={item.url} 
                    className="flex w-full items-center py-2"
                    onClick={item.onClick}
                  >
                    <item.icon className="size-5 mr-3" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <CBRESidebarMenuBadge className="ml-auto">
                        {item.badge}
                      </CBRESidebarMenuBadge>
                    )}
                  </a>
                </CBRESidebarMenuButton>
              </CBRESidebarMenuItem>
            ))}
          </CBRESidebarMenu>
        </CBRESidebarGroupContent>
      </CBRESidebarGroup>
      
      <CBRESidebarSeparator />
      
      <CBRESidebarGroup>
        <CBRESidebarGroupLabel>Projects</CBRESidebarGroupLabel>
        <CBRESidebarGroupContent>
          <CBRESidebarMenu>
            {basicProjectItems.map((item) => (
              <CBRESidebarMenuItem key={item.title}>
                <CBRESidebarMenuButton asChild isActive={item.active}>
                  <a 
                    href={item.url} 
                    className="flex w-full items-center py-2"
                    onClick={item.onClick}
                  >
                    <item.icon className="size-5 mr-3" />
                    <span>{item.title}</span>
                  </a>
                </CBRESidebarMenuButton>
                
                {item.title === "Client Projects" && (
                  <CBRESidebarMenuSub>
                    {basicTeamItems.map((subItem) => (
                      <CBRESidebarMenuSubItem key={subItem.title}>
                        <CBRESidebarMenuSubButton asChild isActive={subItem.active}>
                          <a
                            href={subItem.url} 
                            className="flex w-full"
                            onClick={subItem.onClick}
                          >
                            <span>{subItem.title}</span>
                          </a>
                        </CBRESidebarMenuSubButton>
                      </CBRESidebarMenuSubItem>
                    ))}
                  </CBRESidebarMenuSub>
                )}
              </CBRESidebarMenuItem>
            ))}
          </CBRESidebarMenu>
        </CBRESidebarGroupContent>
      </CBRESidebarGroup>
    </CBRESidebarContent>
    <CBRESidebarFooter>
      <div className="flex items-center p-2">
        <div className="!size-8 !rounded-full !overflow-hidden !flex !items-center !justify-center !border !border-light-grey">
          <img 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='%23004b23' stroke='none'><rect width='24' height='24' fill='%23004b23' rx='12' ry='12'/><path d='M12 13a4 4 0 100-8 4 4 0 000 8z' fill='white'/><path d='M18 21v-2a4 4 0 00-4-4H10a4 4 0 00-4 4v2' fill='white'/></svg>"
            alt="Jane Smith" 
            className="!w-full !h-full !object-cover"
          />
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium">Jane Smith</div>
          <div className="text-xs text-dark-grey">Administrator</div>
        </div>
      </div>
    </CBRESidebarFooter>
  </CBRESidebar>
  
  <main>
    <header>
      <CBRESidebarTrigger />
      {/* Page title */}
    </header>
    {/* Page content */}
  </main>
</CBRESidebarProvider>`}
            </pre>
          </div>
        </div>
        
        {/* Icon Collapsible Sidebar */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Icon Collapsible Sidebar</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey relative">
              <div className="h-[500px] flex overflow-hidden">
                <CBRESidebarProvider defaultOpen={false}>
                  <div className="flex h-full w-full relative overflow-hidden">
                    <CBRESidebar collapsible="icon" className="!static !h-full">
                      <CBRESidebarHeader className="flex justify-center h-[60px] box-border py-2">
                        <CBRELogo />
                      </CBRESidebarHeader>
                      <CBRESidebarContent className="!border-none !shadow-none">
                        <CBRESidebarGroup className="!border-none">
                          <CBRESidebarGroupLabel>Main</CBRESidebarGroupLabel>
                          <CBRESidebarGroupContent>
                            <CBRESidebarMenu className="!border-none !shadow-none">
                              {iconMenuItems.map((item) => (
                                <CBRESidebarMenuItem key={item.title} className="!border-none !shadow-none debug-item">
                                  <CBRESidebarMenuButton 
                                    asChild 
                                    isActive={item.active}
                                    tooltip={item.title}
                                    className="!border-none !outline-none !shadow-none hover:!bg-lighter-grey data-[active=true]:!bg-dark-green data-[active=true]:!text-white debug-button"
                                  >
                                    <a 
                                      href={item.url} 
                                      className="flex flex-col items-center justify-center py-2 relative !border-none !outline-none debug-link"
                                      onClick={item.onClick}
                                      data-title={item.title}
                                    >
                                      <item.icon className="size-5 debug-icon" />
                                      <span className="sr-only">{item.title}</span>
                                      {item.badge && (
                                        <CBRESidebarMenuBadge className="absolute top-0 right-0 h-1.5 w-1.5 !bg-accent-green !flex !items-center !justify-center !p-0 !rounded-full !debug-badge">
                                          <span className="sr-only">{item.badge}</span>
                                        </CBRESidebarMenuBadge>
                                      )}
                                    </a>
                                  </CBRESidebarMenuButton>
                                </CBRESidebarMenuItem>
                              ))}
                            </CBRESidebarMenu>
                          </CBRESidebarGroupContent>
                        </CBRESidebarGroup>
                      </CBRESidebarContent>
                      <CBRESidebarFooter className="flex justify-center">
                        <div className="flex items-center justify-center p-2">
                          <div className="!size-8 !rounded-full !overflow-hidden !flex !items-center !justify-center !border !border-light-grey">
                            <img 
                              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='%23004b23' stroke='none'><rect width='24' height='24' fill='%23004b23' rx='12' ry='12'/><path d='M12 13a4 4 0 100-8 4 4 0 000 8z' fill='white'/><path d='M18 21v-2a4 4 0 00-4-4H10a4 4 0 00-4 4v2' fill='white'/></svg>"
                              alt="Jane Smith" 
                              className="!w-full !h-full !object-cover"
                            />
                          </div>
                        </div>
                      </CBRESidebarFooter>
                    </CBRESidebar>
                    
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <div className="flex items-center h-[60px] py-0 box-border">
                        <CBRESidebarTrigger className="mr-4 ml-4" />
                        <h2 className="text-xl font-financier text-cbre-green">Icon Sidebar Example</h2>
                      </div>

                      <div className="border-t border-light-grey p-6 flex-1 overflow-auto">
                        <div className="max-w-2xl mx-auto">
                          <p className="text-dark-grey font-calibre mb-4">
                            This example shows a sidebar that collapses to icons when toggled.
                            Click the toggle button to expand or collapse the sidebar.
                          </p>
                          <p className="text-dark-grey font-calibre mb-4">
                            In the collapsed state, you can still see the icons, which allows for quick navigation
                            while maximizing the space available for content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CBRESidebarProvider>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRESidebarProvider defaultOpen={false}>
  <CBRESidebar collapsible="icon">
    <CBRESidebarHeader className="flex justify-center h-[60px] box-border py-2">
      <CBRELogo />
    </CBRESidebarHeader>
    <CBRESidebarContent>
      <CBRESidebarGroup>
        <CBRESidebarGroupLabel>Main</CBRESidebarGroupLabel>
        <CBRESidebarGroupContent>
          <CBRESidebarMenu>
            {iconMenuItems.map((item) => (
              <CBRESidebarMenuItem key={item.title} className="!border-none !shadow-none debug-item">
                <CBRESidebarMenuButton 
                  asChild 
                  isActive={item.active}
                  tooltip={item.title}
                  className="!border-none !outline-none !shadow-none hover:!bg-lighter-grey data-[active=true]:!bg-dark-green data-[active=true]:!text-white debug-button"
                >
                  <a 
                    href={item.url} 
                    className="flex flex-col items-center justify-center py-2 relative !border-none !outline-none debug-link"
                    onClick={item.onClick}
                    data-title={item.title}
                  >
                    <item.icon className="size-5 debug-icon" />
                    <span className="sr-only">{item.title}</span>
                    {item.badge && (
                      <CBRESidebarMenuBadge className="absolute top-0 right-0 h-1.5 w-1.5 !bg-accent-green !flex !items-center !justify-center !p-0 !rounded-full !debug-badge">
                        <span className="sr-only">{item.badge}</span>
                      </CBRESidebarMenuBadge>
                    )}
                  </a>
                </CBRESidebarMenuButton>
              </CBRESidebarMenuItem>
            ))}
          </CBRESidebarMenu>
        </CBRESidebarGroupContent>
      </CBRESidebarGroup>
    </CBRESidebarContent>
    <CBRESidebarFooter className="flex justify-center">
      <div className="flex items-center justify-center p-2">
        <div className="!size-8 !rounded-full !overflow-hidden !flex !items-center !justify-center !border !border-light-grey">
          <img 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='%23004b23' stroke='none'><rect width='24' height='24' fill='%23004b23' rx='12' ry='12'/><path d='M12 13a4 4 0 100-8 4 4 0 000 8z' fill='white'/><path d='M18 21v-2a4 4 0 00-4-4H10a4 4 0 00-4 4v2' fill='white'/></svg>"
            alt="Jane Smith" 
            className="!w-full !h-full !object-cover"
          />
        </div>
      </div>
    </CBRESidebarFooter>
  </CBRESidebar>
  
  <main>
    <CBRESidebarTrigger />
    {/* Content */}
  </main>
</CBRESidebarProvider>`}
            </pre>
          </div>
        </div>
        
        {/* Floating Sidebar Variant */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Floating Sidebar Variant</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey relative">
              <div className="h-[500px] flex overflow-hidden">
                <CBRESidebarProvider defaultOpen={true}>
                  <div className="flex h-full w-full relative overflow-hidden">
                    <CBRESidebar variant="floating" className="!static !h-full !min-h-full max-w-[18rem] !w-72">
                      <CBRESidebarHeader className="h-[60px] box-border py-2">
                        <CBRELogo textOnly={true} />
                      </CBRESidebarHeader>
                      <CBRESidebarContent>
                        <CBRESidebarGroup>
                          <CBRESidebarGroupLabel>Navigation</CBRESidebarGroupLabel>
                          <CBRESidebarGroupContent>
                            <CBRESidebarMenu>
                              {floatingMenuItems.map((item) => (
                                <CBRESidebarMenuItem key={item.title}>
                                  <CBRESidebarMenuButton asChild isActive={item.active}>
                                    <a 
                                      href={item.url} 
                                      className="flex w-full items-center py-2"
                                      onClick={item.onClick}
                                    >
                                      <item.icon className="size-5 mr-3" />
                                      <span>{item.title}</span>
                                    </a>
                                  </CBRESidebarMenuButton>
                                </CBRESidebarMenuItem>
                              ))}
                            </CBRESidebarMenu>
                          </CBRESidebarGroupContent>
                        </CBRESidebarGroup>
                      </CBRESidebarContent>
                    </CBRESidebar>
                    
                    <div className="flex-1 flex flex-col overflow-hidden bg-lighter-grey">
                      <div className="flex items-center h-[68px] bg-white py-0 box-border">
                        <CBRESidebarTrigger className="mr-4 ml-4" />
                        <h2 className="text-xl font-financier text-cbre-green">Floating Sidebar</h2>
                      </div>

                      <div className="border-t border-light-grey p-6 flex-1 overflow-auto">
                        <div className="max-w-2xl mx-auto bg-white p-6 rounded-none shadow-sm">
                          <p className="text-dark-grey font-calibre mb-4">
                            This example shows the floating variant of the sidebar. The sidebar appears to float
                            above the content rather than pushing it aside.
                          </p>
                          <p className="text-dark-grey font-calibre mb-4">
                            This variant is useful when you want to maintain the visual hierarchy of the page
                            while still providing easy access to navigation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CBRESidebarProvider>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Floating Variant Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<CBRESidebarProvider>
  <CBRESidebar variant="floating">
    <CBRESidebarHeader className="h-[60px] box-border py-2">
      <CBRELogo />
    </CBRESidebarHeader>
    <CBRESidebarContent>
      <CBRESidebarGroup>
        <CBRESidebarGroupLabel>Navigation</CBRESidebarGroupLabel>
        <CBRESidebarGroupContent>
          <CBRESidebarMenu>
            {floatingMenuItems.map((item) => (
              <CBRESidebarMenuItem key={item.title}>
                <CBRESidebarMenuButton asChild isActive={item.active}>
                  <a 
                    href={item.url} 
                    className="flex w-full items-center py-2"
                    onClick={item.onClick}
                  >
                    <item.icon className="size-5 mr-3" />
                    <span>{item.title}</span>
                  </a>
                </CBRESidebarMenuButton>
              </CBRESidebarMenuItem>
            ))}
          </CBRESidebarMenu>
        </CBRESidebarGroupContent>
      </CBRESidebarGroup>
    </CBRESidebarContent>
  </CBRESidebar>
  
  <main>
    <CBRESidebarTrigger />
    {/* Content */}
  </main>
</CBRESidebarProvider>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Sidebar Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Sidebar component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Sidebar</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Sidebar Props</h3>
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