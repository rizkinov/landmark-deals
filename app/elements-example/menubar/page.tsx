"use client";

import * as React from "react";
import Link from "next/link";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Calculator,
  Calendar,
  ChevronsUpDown,
  CornerDownRight,
  Check,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  FileIcon,
  FolderIcon,
  Save,
  XCircle,
} from "lucide-react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CBREButton } from "@/components/cbre-button";

export default function MenubarExamplePage() {
  const [checkedItems, setCheckedItems] = React.useState({
    showStatusBar: true,
    showActivityBar: false,
    showPanel: true,
  });

  const [activeAlignment, setActiveAlignment] = React.useState("left");
  const [activeTextStyle, setActiveTextStyle] = React.useState<string[]>([]);

  // Toggle a text style (bold, italic, etc.)
  const toggleTextStyle = (style: string) => {
    setActiveTextStyle((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Menubar Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          The Menubar component creates a horizontal menu with dropdown menus, similar to application menus found in desktop software. It provides keyboard navigation and supports various menu item types including standard items, checkboxes, radio groups, and nested submenus.
        </p>
        
        {/* Basic Menubar */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Menubar</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      New Window <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      Cut <MenubarShortcut>⌘X</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Copy <MenubarShortcut>⌘C</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      Paste <MenubarShortcut>⌘V</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem
                      checked={checkedItems.showStatusBar}
                      onCheckedChange={(checked) => 
                        setCheckedItems({ ...checkedItems, showStatusBar: checked === true })
                      }
                    >
                      Status Bar
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem
                      checked={checkedItems.showActivityBar}
                      onCheckedChange={(checked) => 
                        setCheckedItems({ ...checkedItems, showActivityBar: checked === true })
                      }
                    >
                      Activity Bar
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem
                      checked={checkedItems.showPanel}
                      onCheckedChange={(checked) => 
                        setCheckedItems({ ...checkedItems, showPanel: checked === true })
                      }
                    >
                      Panel
                    </MenubarCheckboxItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Help</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Documentation</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      View License <MenubarShortcut>⌘L</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>About</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        New Window <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Edit</MenubarTrigger>
    <MenubarContent>
      {/* Edit menu items */}
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
            </pre>
          </div>
        </div>
        
        {/* Checkbox and Radio Items */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Checkbox and Radio Items</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-dark-grey font-calibre">Selected view options:</p>
                  <ul className="list-disc pl-5 text-dark-grey font-calibre">
                    {checkedItems.showStatusBar && <li>Status Bar</li>}
                    {checkedItems.showActivityBar && <li>Activity Bar</li>}
                    {checkedItems.showPanel && <li>Panel</li>}
                  </ul>
                </div>
                
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarCheckboxItem
                        checked={checkedItems.showStatusBar}
                        onCheckedChange={(checked) => 
                          setCheckedItems({ ...checkedItems, showStatusBar: checked === true })
                        }
                      >
                        Status Bar
                      </MenubarCheckboxItem>
                      <MenubarCheckboxItem
                        checked={checkedItems.showActivityBar}
                        onCheckedChange={(checked) => 
                          setCheckedItems({ ...checkedItems, showActivityBar: checked === true })
                        }
                      >
                        Activity Bar
                      </MenubarCheckboxItem>
                      <MenubarCheckboxItem
                        checked={checkedItems.showPanel}
                        onCheckedChange={(checked) => 
                          setCheckedItems({ ...checkedItems, showPanel: checked === true })
                        }
                      >
                        Panel
                      </MenubarCheckboxItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Format</MenubarTrigger>
                    <MenubarContent>
                      <MenubarRadioGroup value={activeAlignment} onValueChange={setActiveAlignment}>
                        <MenubarRadioItem value="left">
                          <AlignLeft className="mr-2 size-4" />
                          Left
                        </MenubarRadioItem>
                        <MenubarRadioItem value="center">
                          <AlignCenter className="mr-2 size-4" />
                          Center
                        </MenubarRadioItem>
                        <MenubarRadioItem value="right">
                          <AlignRight className="mr-2 size-4" />
                          Right
                        </MenubarRadioItem>
                        <MenubarRadioItem value="justify">
                          <AlignJustify className="mr-2 size-4" />
                          Justify
                        </MenubarRadioItem>
                      </MenubarRadioGroup>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                
                <div className="space-y-2">
                  <p className="text-dark-grey font-calibre">Active alignment: <span className="font-medium">{activeAlignment}</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// State for checkbox items
const [checkedItems, setCheckedItems] = React.useState({
  showStatusBar: true,
  showActivityBar: false,
  showPanel: true,
});

// State for radio group
const [activeAlignment, setActiveAlignment] = React.useState("left");

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>View</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem
        checked={checkedItems.showStatusBar}
        onCheckedChange={(checked) => 
          setCheckedItems({ ...checkedItems, showStatusBar: checked === true })
        }
      >
        Status Bar
      </MenubarCheckboxItem>
      {/* Other checkbox items */}
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Format</MenubarTrigger>
    <MenubarContent>
      <MenubarRadioGroup value={activeAlignment} onValueChange={setActiveAlignment}>
        <MenubarRadioItem value="left">
          <AlignLeft className="mr-2 size-4" />
          Left
        </MenubarRadioItem>
        {/* Other radio items */}
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
            </pre>
          </div>
        </div>
        
        {/* Submenu Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Submenu Example</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Format</MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>Text Style</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarCheckboxItem 
                          checked={activeTextStyle.includes('bold')}
                          onCheckedChange={() => toggleTextStyle('bold')}
                        >
                          <Bold className="mr-2 size-4" />
                          Bold
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem 
                          checked={activeTextStyle.includes('italic')}
                          onCheckedChange={() => toggleTextStyle('italic')}
                        >
                          <Italic className="mr-2 size-4" />
                          Italic
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem 
                          checked={activeTextStyle.includes('underline')}
                          onCheckedChange={() => toggleTextStyle('underline')}
                        >
                          <Underline className="mr-2 size-4" />
                          Underline
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem 
                          checked={activeTextStyle.includes('strikethrough')}
                          onCheckedChange={() => toggleTextStyle('strikethrough')}
                        >
                          <Strikethrough className="mr-2 size-4" />
                          Strikethrough
                        </MenubarCheckboxItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>Font...</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger>Advanced Options</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Word Wrap</MenubarItem>
                        <MenubarItem>Line Numbers</MenubarItem>
                        <MenubarSub>
                          <MenubarSubTrigger>Ruler</MenubarSubTrigger>
                          <MenubarSubContent>
                            <MenubarItem>Show Ruler</MenubarItem>
                            <MenubarItem>Configure Units...</MenubarItem>
                          </MenubarSubContent>
                        </MenubarSub>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              
              <div className="mt-6 space-y-2">
                <p className="text-dark-grey font-calibre">Active text styles:</p>
                <div className="flex flex-wrap gap-2">
                  {activeTextStyle.length === 0 ? (
                    <span className="text-dark-grey font-calibre italic">None selected</span>
                  ) : (
                    activeTextStyle.map((style) => (
                      <span 
                        key={style} 
                        className="px-2 py-1 bg-accent-green/20 text-cbre-green rounded text-sm font-calibre"
                      >
                        {style}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// State for text styles
const [activeTextStyle, setActiveTextStyle] = React.useState<string[]>([]);

// Toggle a text style (bold, italic, etc.)
const toggleTextStyle = (style: string) => {
  setActiveTextStyle((prev) =>
    prev.includes(style)
      ? prev.filter((s) => s !== style)
      : [...prev, style]
  );
};

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Format</MenubarTrigger>
    <MenubarContent>
      <MenubarSub>
        <MenubarSubTrigger>Text Style</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarCheckboxItem 
            checked={activeTextStyle.includes('bold')}
            onCheckedChange={() => toggleTextStyle('bold')}
          >
            <Bold className="mr-2 size-4" />
            Bold
          </MenubarCheckboxItem>
          {/* Other checkbox items */}
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>Font...</MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Advanced Options</MenubarSubTrigger>
        <MenubarSubContent>
          {/* More menu items */}
          <MenubarSub>
            <MenubarSubTrigger>Ruler</MenubarSubTrigger>
            <MenubarSubContent>
              {/* Nested submenu items */}
            </MenubarSubContent>
          </MenubarSub>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
            </pre>
          </div>
        </div>
        
        {/* Application Menu Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Application Menu Example</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <Menubar className="px-2 border-b border-light-grey rounded-none shadow-none">
                <MenubarMenu>
                  <MenubarTrigger className="font-bold">
                    <FileIcon className="size-4 mr-2" />
                    File
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <FileIcon className="mr-2 size-4" />
                      New File
                      <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <FolderIcon className="mr-2 size-4" />
                      New Folder
                      <MenubarShortcut>⇧⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Save className="mr-2 size-4" />
                      Save
                      <MenubarShortcut>⌘S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <XCircle className="mr-2 size-4" />
                      Exit
                      <MenubarShortcut>⌘Q</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="relative">
                    <User className="size-4 mr-2" />
                    Account
                  </MenubarTrigger>
                  <MenubarContent forceMount>
                    <MenubarLabel>Profile</MenubarLabel>
                    <MenubarSeparator />
                    <MenubarItem>
                      <User className="mr-2 size-4" />
                      My Account
                    </MenubarItem>
                    <MenubarItem>
                      <Settings className="mr-2 size-4" />
                      Settings
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <LogOut className="mr-2 size-4" />
                      Logout
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>
                    <LifeBuoy className="size-4 mr-2" />
                    Help
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Documentation</MenubarItem>
                    <MenubarItem>Report Issue</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>About</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              
              <div className="mt-4 p-4 bg-[var(--lighter-grey)] text-dark-grey font-calibre">
                <p>Application content area</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Menubar className="px-2 border-b border-light-grey rounded-none shadow-none">
  <MenubarMenu>
    <MenubarTrigger className="font-bold">
      <FileIcon className="size-4 mr-2" />
      File
    </MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        <FileIcon className="mr-2 size-4" />
        New File
        <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      {/* More menu items */}
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger className="relative">
      <User className="size-4 mr-2" />
      Account
    </MenubarTrigger>
    <MenubarContent forceMount>
      <MenubarLabel>Profile</MenubarLabel>
      <MenubarSeparator />
      {/* Profile menu items */}
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Menubar Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The Menubar component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Menubar</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">Menubar Props</h3>
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