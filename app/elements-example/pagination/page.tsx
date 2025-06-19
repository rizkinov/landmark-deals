"use client";

import * as React from "react";
import Link from "next/link";
import { CBREButton } from "@/components/cbre-button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationExamplePage() {
  // Basic pagination state
  const [basicPage, setBasicPage] = React.useState(1);
  const basicTotalPages = 10;

  // Advanced pagination state with items
  const [currentPage, setCurrentPage] = React.useState(5);
  const itemsPerPage = 10;
  const totalItems = 87;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to generate page items for advanced pagination
  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Show at most 5 page numbers at a time
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Add previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          aria-disabled={currentPage === 1}
          tabIndex={currentPage === 1 ? -1 : 0}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );
    
    // Show ellipsis at start if needed
    if (startPage > 1) {
      items.push(
        <PaginationItem key="start">
          <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis at end if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key="end">
          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : 0}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    );
    
    return items;
  };

  // Simulated data for current page
  const currentItems = Array.from({ length: itemsPerPage }, (_, i) => ({
    id: (currentPage - 1) * itemsPerPage + i + 1,
    name: `Item ${(currentPage - 1) * itemsPerPage + i + 1}`,
  })).filter(item => item.id <= totalItems);

  return (
    <div className="min-h-screen bg-white">
      <div className="py-10 px-4 md:px-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>

        <h1 className="text-6xl font-financier text-cbre-green mb-6">Pagination Component</h1>
        <p className="text-dark-grey font-calibre mb-10 max-w-3xl">
          Pagination allows users to navigate between pages of content, helping to break up large sets of data 
          into manageable chunks. The component provides a consistent way to navigate through multi-page content.
        </p>
        
        {/* Basic Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Basic Pagination</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setBasicPage(prev => Math.max(1, prev - 1))}
                        aria-disabled={basicPage === 1}
                        tabIndex={basicPage === 1 ? -1 : 0}
                        className={basicPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationLink isActive={basicPage === 1} onClick={() => setBasicPage(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationLink isActive={basicPage === 2} onClick={() => setBasicPage(2)}>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationLink isActive={basicPage === 3} onClick={() => setBasicPage(3)}>
                        3
                      </PaginationLink>
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setBasicPage(prev => Math.min(basicTotalPages, prev + 1))}
                        aria-disabled={basicPage === basicTotalPages}
                        tabIndex={basicPage === basicTotalPages ? -1 : 0}
                        className={basicPage === basicTotalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                
                <div className="p-4 border border-light-grey rounded-md text-center">
                  <p>Current Page: <strong>{basicPage}</strong> of {basicTotalPages}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={() => setPage(page - 1)} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive={page === 1} onClick={() => setPage(1)}>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={() => setPage(2)}>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink onClick={() => setPage(3)}>3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext onClick={() => setPage(page + 1)} />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
            </pre>
          </div>
        </div>

        {/* Advanced Example */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Dynamic Pagination with Content</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              {/* Item grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {currentItems.slice(0, 6).map(item => (
                  <div key={item.id} className="p-4 bg-[var(--lighter-grey)] border border-light-grey rounded-md">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                  </div>
                ))}
              </div>
              
              {/* Pagination stats */}
              <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                <div>
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
                </div>
                
                <div>
                  Page {currentPage} of {totalPages}
                </div>
              </div>
              
              {/* Pagination controls */}
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {generatePaginationItems()}
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-light-grey mt-6">
            <h3 className="text-lg font-calibre font-medium text-dark-grey mb-3">Implementation</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`// Generate pagination items based on current state
const generatePaginationItems = () => {
  const items = [];
  const maxVisiblePages = 5;
  
  // Calculate page range
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Add previous button
  items.push(
    <PaginationItem key="prev">
      <PaginationPrevious 
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        aria-disabled={currentPage === 1}
      />
    </PaginationItem>
  );
  
  // Add page numbers and ellipses
  // ...

  // Add next button
  items.push(
    <PaginationItem key="next">
      <PaginationNext 
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        aria-disabled={currentPage === totalPages}
      />
    </PaginationItem>
  );
  
  return items;
}`}
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
                  <h3 className="text-xl font-calibre font-medium mb-3">Pagination Component</h3>
                  <p className="mb-3 text-dark-grey font-calibre">The main container for pagination components.</p>
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
                          <td className="border border-light-grey px-4 py-2 font-mono">Pagination</td>
                          <td className="border border-light-grey px-4 py-2">The root container component.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PaginationContent</td>
                          <td className="border border-light-grey px-4 py-2">Contains pagination items.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PaginationItem</td>
                          <td className="border border-light-grey px-4 py-2">Wrapper for individual pagination elements.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PaginationLink</td>
                          <td className="border border-light-grey px-4 py-2">Page link with optional <code>isActive</code> state.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PaginationPrevious</td>
                          <td className="border border-light-grey px-4 py-2">Button for navigating to the previous page.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PaginationNext</td>
                          <td className="border border-light-grey px-4 py-2">Button for navigating to the next page.</td>
                        </tr>
                        <tr>
                          <td className="border border-light-grey px-4 py-2 font-mono">PaginationEllipsis</td>
                          <td className="border border-light-grey px-4 py-2">Indicates skipped pages.</td>
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