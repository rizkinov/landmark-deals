#!/usr/bin/env node

/**
 * Example Pages Auditor
 * This script checks all example pages to ensure they follow the correct structure:
 * 1. Title as H1
 * 2. "Back to UI Elements" button at both top and bottom
 * 3. Component API table at the end
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define the expected structure
const EXPECTED = {
  backButtonAtTop: /<div className="mb-8">\s*<Link href="\/elements-example">\s*<CBREButton variant="outline">Back to UI Elements<\/CBREButton>\s*<\/Link>\s*<\/div>/,
  h1Title: /<h1 className="text-6xl font-financier text-cbre-green mb-6">/,
  componentAPI: /<h2 className="text-4xl font-financier text-cbre-green mb-5">Component API<\/h2>/,
  backButtonAtBottom: /<div className="mt-16 flex justify-center">\s*<Link href="\/elements-example">\s*<CBREButton variant="outline">Back to UI Elements<\/CBREButton>\s*<\/Link>\s*<\/div>/
};

// Function to check a file
function checkFile(filepath) {
  console.log(`Checking ${filepath}...`);
  const content = fs.readFileSync(filepath, 'utf8');
  
  // Check for each expected element
  const results = {
    backButtonAtTop: EXPECTED.backButtonAtTop.test(content),
    h1Title: EXPECTED.h1Title.test(content),
    componentAPI: EXPECTED.componentAPI.test(content),
    backButtonAtBottom: EXPECTED.backButtonAtBottom.test(content)
  };
  
  // Calculate the overall compliance score (0-100%)
  const score = Object.values(results).filter(Boolean).length / Object.keys(results).length * 100;
  
  return {
    filepath,
    results,
    score,
    isCompliant: score === 100
  };
}

// Main function
function main() {
  // Find all example pages
  const examplePages = glob.sync('app/elements-example/*/page.tsx');
  
  // Check each file
  const results = examplePages.map(checkFile);
  
  // Display summary
  console.log('\n=== AUDIT SUMMARY ===\n');
  
  // Count compliant pages
  const compliantCount = results.filter(r => r.isCompliant).length;
  console.log(`${compliantCount} of ${results.length} pages are compliant (${Math.round(compliantCount / results.length * 100)}%)\n`);
  
  // Show non-compliant pages
  const nonCompliant = results.filter(r => !r.isCompliant);
  if (nonCompliant.length > 0) {
    console.log('The following pages need attention:');
    nonCompliant.forEach(result => {
      console.log(`\n${result.filepath} (${Math.round(result.score)}% compliant)`);
      
      // Show what's missing
      if (!result.results.backButtonAtTop) {
        console.log('  - Missing "Back to UI Elements" button at the top');
      }
      
      if (!result.results.h1Title) {
        console.log('  - Title is not formatted as an H1');
      }
      
      if (!result.results.componentAPI) {
        console.log('  - Missing Component API section');
      }
      
      if (!result.results.backButtonAtBottom) {
        console.log('  - Missing "Back to UI Elements" button at the bottom');
      }
    });
  }
}

// Execute the main function
main(); 