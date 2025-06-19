#!/usr/bin/env node

/**
 * Fix Duplicate Imports
 * This script removes duplicate 'import Link from "next/link"' statements
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to fix a file with duplicate imports
function fixDuplicateImports(filepath) {
  console.log(`Checking ${filepath}...`);
  
  let content = fs.readFileSync(filepath, 'utf8');
  let originalContent = content;
  
  // Fix duplicate Link imports
  // Check for both patterns: single quote followed by double quote, or vice versa
  if ((content.includes("import Link from 'next/link';") && content.includes('import Link from "next/link";')) ||
      (content.match(/import Link from ['"]next\/link['"];/g) || []).length > 1) {
    
    // Keep the first occurrence and remove others
    const firstImport = content.match(/import Link from ['"]next\/link['"];/)[0];
    // Replace all occurrences with empty string
    content = content.replace(/import Link from ['"]next\/link['"];/g, '');
    // Add back the first import
    content = content.replace(/^(import .+?;(\r?\n)*)/, `$1${firstImport}\n`);
    
    // Save changes
    if (content !== originalContent) {
      fs.writeFileSync(filepath, content);
      console.log(`  ✅ Fixed duplicate Link imports in ${filepath}`);
      return true;
    }
  }
  
  console.log(`  No duplicate imports found in ${filepath}`);
  return false;
}

// Main function
function main() {
  // Get all example pages
  const examplePages = glob.sync('app/elements-example/*/page.tsx');
  
  // Count of fixes
  let fixCount = 0;
  
  // Fix each file
  examplePages.forEach(filepath => {
    if (fixDuplicateImports(filepath)) {
      fixCount++;
    }
  });
  
  console.log(`\n=== FIX SUMMARY ===\n`);
  console.log(`Fixed duplicate imports in ${fixCount} of ${examplePages.length} pages`);
}

// Execute the main function
main(); 