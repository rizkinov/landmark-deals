"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import { CBREDataTable } from "@/components/cbre-data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CBREBadge } from "@/components/cbre-badge";

// Sample data types
interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  status: "Active" | "Under Contract" | "In Development";
  sqft: number;
  lastUpdated: string;
}

// Sample data
const properties: Property[] = [
  {
    id: "PRO001",
    name: "Downtown Office Tower",
    location: "Los Angeles, CA",
    type: "Office",
    status: "Active",
    sqft: 250000,
    lastUpdated: "2024-04-01",
  },
  {
    id: "PRO002",
    name: "Westfield Shopping Mall",
    location: "San Francisco, CA",
    type: "Retail",
    status: "Under Contract",
    sqft: 500000,
    lastUpdated: "2024-03-28",
  },
  {
    id: "PRO003",
    name: "Harbor Industrial Park",
    location: "Seattle, WA",
    type: "Industrial",
    status: "Active",
    sqft: 750000,
    lastUpdated: "2024-03-25",
  },
  {
    id: "PRO004",
    name: "Central Business Complex",
    location: "New York, NY",
    type: "Mixed Use",
    status: "In Development",
    sqft: 400000,
    lastUpdated: "2024-03-20",
  },
  {
    id: "PRO005",
    name: "Tech Hub Offices",
    location: "Austin, TX",
    type: "Office",
    status: "Active",
    sqft: 180000,
    lastUpdated: "2024-03-15",
  },
  {
    id: "PRO006",
    name: "Riverside Warehouses",
    location: "Portland, OR",
    type: "Industrial",
    status: "Under Contract",
    sqft: 620000,
    lastUpdated: "2024-03-10",
  },
  {
    id: "PRO007",
    name: "Metropolitan Plaza",
    location: "Chicago, IL",
    type: "Mixed Use",
    status: "Active",
    sqft: 350000,
    lastUpdated: "2024-03-05",
  },
];

export default function DataTableExamplePage() {
  // Column definitions
  const columns: ColumnDef<Property>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          key={`select-${row.id}`}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Property Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <CBREBadge
            variant={
              status === "Active"
                ? "success"
                : status === "Under Contract"
                ? "warning"
                : "info"
            }
          >
            {status}
          </CBREBadge>
        );
      },
    },
    {
      accessorKey: "sqft",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-right w-full"
          >
            Square Feet
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const sqft = row.getValue("sqft") as number;
        return <div className="text-right">{sqft.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastUpdated"));
        // Use explicit formatting instead of toLocaleDateString() to avoid hydration issues
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const property = row.original;
        
        return (
          <DropdownMenu key={`actions-${row.id}`}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(property.id);
                  }
                }}
              >
                Copy property ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit property</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Data Table Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          An enhanced table component with sorting, filtering, pagination, and row selection capabilities.
          Built with @tanstack/react-table, it provides a powerful interface for managing complex data sets.
        </p>

        {/* Property Table Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Property Management Table</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-full mx-auto space-y-6">
              <div className="space-y-2">
                <p className="text-dark-grey font-calibre mb-2">Interactive Data Table with Search, Pagination, and Sorting</p>
              <CBREDataTable
                columns={columns}
                data={properties}
                searchKey="name"
              />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Features</h3>
            <ul className="list-disc pl-6 space-y-2 text-dark-grey font-calibre">
              <li>Global search filtering by property name</li>
              <li>Sortable columns (Property Name, Square Feet)</li>
              <li>Row selection with checkbox</li>
              <li>Column visibility toggle</li>
              <li>Pagination controls</li>
              <li>Row actions menu</li>
              <li>Status badges with different variants</li>
              <li>Formatted numbers and dates</li>
            </ul>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Define your columns
const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <CBREBadge
          variant={
            status === "Active" ? "success" 
            : status === "Under Contract" ? "warning" 
            : "info"
          }
        >
          {status}
        </CBREBadge>
      );
    },
  },
  // Add more columns as needed
];

// Sample data
const data = [/* Your data array */];

// In your component
<CBREDataTable
  columns={columns}
  data={data}
  searchKey="name"
/>`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">DataTable Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The DataTable component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">DataTable</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">DataTable Props</h3>
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