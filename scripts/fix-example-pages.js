#!/usr/bin/env node

/**
 * Example Pages Fixer
 * This script automatically adds missing elements to example pages:
 * 1. Title as H1 (if needed)
 * 2. "Back to UI Elements" button at top
 * 3. Component API table at the end
 * 4. "Back to UI Elements" button at bottom (if missing)
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns for expected components
const PATTERNS = {
  backButtonAtTop: /<div className="mb-8">\s*<Link href="\/elements-example">\s*<CBREButton variant="outline">Back to UI Elements<\/CBREButton>\s*<\/Link>\s*<\/div>/,
  h1Title: /<h1 className="text-\d+xl font-financier text-cbre-green mb-\d+">/,
  componentAPI: /<h2 className="text-4xl font-financier text-cbre-green mb-5">Component API<\/h2>/,
  backButtonAtBottom: /<div className="mt-16 flex justify-center">\s*<Link href="\/elements-example">\s*<CBREButton variant="outline">Back to UI Elements<\/CBREButton>\s*<\/Link>\s*<\/div>/,
  
  // Patterns for finding insertion points
  contentStart: /<div .*?className=".*?max-w-.*?xl mx-auto.*?">/,
  anyH1: /<h1[^>]*>(.+?)<\/h1>/,
  contentEnd: /<\/div>\s*<\/div>\s*<\/div>\s*\);?\s*}\s*$/
};

// Templates for the missing components
const TEMPLATES = {
  backButtonAtTop: `<div className="mb-8">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>`,
  
  h1Title: (componentName) => `<h1 className="text-6xl font-financier text-cbre-green mb-6">${componentName} Component</h1>`,
  
  componentAPI: (componentName) => `        {/* Component API */}
        <div className="mb-16">
          <h2 className="text-4xl font-financier text-cbre-green mb-5">Component API</h2>
          <div className="bg-[var(--lighter-grey)] p-4 md:p-8">
            <div className="border border-light-grey bg-white p-8 max-w-2xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">${componentName} Components</h3>
                  <p className="mb-3 text-dark-grey font-calibre">
                    The ${componentName} component provides a consistent UI element following CBRE design guidelines.
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
                          <td className="border border-light-grey px-4 py-2 font-mono">${componentName}</td>
                          <td className="border border-light-grey px-4 py-2">The root component.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-calibre font-medium mb-3">${componentName} Props</h3>
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
        </div>`,
  
  backButtonAtBottom: `        <div className="mt-16 flex justify-center">
          <Link href="/elements-example">
            <CBREButton variant="outline">Back to UI Elements</CBREButton>
          </Link>
        </div>`
};

// Function to extract component name from file path
function extractComponentName(filepath) {
  const dirName = path.basename(path.dirname(filepath));
  // Convert kebab-case to PascalCase
  return dirName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// Function to fix a file
function fixFile(filepath) {
  console.log(`Fixing ${filepath}...`);
  
  let content = fs.readFileSync(filepath, 'utf8');
  const componentName = extractComponentName(filepath);
  let changes = [];
  
  // Check if Link and CBREButton are imported - checking for both quote styles
  if (!content.includes('import Link from "next/link"') && 
      !content.includes("import Link from 'next/link'")) {
    const importInsertPoint = content.indexOf('\n\n', content.indexOf('import'));
    content = content.slice(0, importInsertPoint) + 
      '\nimport Link from "next/link";' + 
      content.slice(importInsertPoint);
    changes.push('Added Link import');
  }
  
  if (!content.includes('import { CBREButton }')) {
    const importInsertPoint = content.indexOf('\n\n', content.indexOf('import'));
    content = content.slice(0, importInsertPoint) + 
      '\nimport { CBREButton } from "@/components/cbre-button";' + 
      content.slice(importInsertPoint);
    changes.push('Added CBREButton import');
  }
  
  // Add back button at top if missing
  const mainDivMatch = content.match(/<div .*?className=".*?max-w-.*?xl mx-auto.*?">/);
  if (!PATTERNS.backButtonAtTop.test(content) && mainDivMatch) {
    const contentStartMatch = mainDivMatch;
    const insertPoint = contentStartMatch.index + contentStartMatch[0].length;
    content = content.slice(0, insertPoint) + 
      '\n        ' + TEMPLATES.backButtonAtTop + 
      '\n' + 
      content.slice(insertPoint);
    changes.push('Added Back button at top');
  }
  
  // Fix h1 title if needed
  if (!PATTERNS.h1Title.test(content)) {
    // Check if there's any h1
    const h1Match = content.match(/<h1[^>]*>(.+?)<\/h1>/);
    if (h1Match) {
      // Replace existing h1 with standard format
      content = content.replace(h1Match[0], `<h1 className="text-6xl font-financier text-cbre-green mb-6">${h1Match[1]}</h1>`);
      changes.push('Fixed H1 title formatting');
    } else {
      // No h1 found, add one after the back button
      const backButtonMatch = content.match(PATTERNS.backButtonAtTop);
      if (backButtonMatch) {
        const insertPoint = backButtonMatch.index + backButtonMatch[0].length;
        content = content.slice(0, insertPoint) + 
          '\n\n        ' + TEMPLATES.h1Title(componentName) + 
          content.slice(insertPoint);
        changes.push('Added H1 title');
      }
    }
  }
  
  // Add Component API if missing
  if (!PATTERNS.componentAPI.test(content)) {
    // Try to find the bottom button to insert before it
    const bottomButtonMatch = content.match(PATTERNS.backButtonAtBottom);
    if (bottomButtonMatch) {
      const insertPoint = bottomButtonMatch.index;
      content = content.slice(0, insertPoint) + 
        TEMPLATES.componentAPI(componentName) + 
        '\n\n' + 
        content.slice(insertPoint);
      changes.push('Added Component API section');
    } else {
      // No bottom button, try to find the end of content
      const contentEndMatch = content.match(PATTERNS.contentEnd);
      if (contentEndMatch) {
        let insertPoint = content.lastIndexOf('</div>', contentEndMatch.index - 1);
        insertPoint = content.lastIndexOf('</div>', insertPoint - 1);
        
        content = content.slice(0, insertPoint) + 
          '\n\n' + TEMPLATES.componentAPI(componentName) + 
          content.slice(insertPoint);
        changes.push('Added Component API section');
      }
    }
  }
  
  // Add back button at bottom if missing
  if (!PATTERNS.backButtonAtBottom.test(content)) {
    const contentEndMatch = content.match(PATTERNS.contentEnd);
    if (contentEndMatch) {
      let insertPoint = content.lastIndexOf('</div>', contentEndMatch.index - 1);
      insertPoint = content.lastIndexOf('</div>', insertPoint - 1);
      
      // If we have a Component API section, add the button after it
      if (PATTERNS.componentAPI.test(content)) {
        const apiSection = content.match(PATTERNS.componentAPI);
        if (apiSection) {
          // Find the end of the API section (several divs after)
          let apiSectionEnd = content.indexOf('</div>', apiSection.index);
          for (let i = 0; i < 6; i++) {
            apiSectionEnd = content.indexOf('</div>', apiSectionEnd + 1);
          }
          
          if (apiSectionEnd !== -1 && apiSectionEnd < insertPoint) {
            insertPoint = apiSectionEnd + 6; // Add after the </div>
          }
        }
      }
      
      content = content.slice(0, insertPoint) + 
        '\n\n' + TEMPLATES.backButtonAtBottom + 
        '\n      ' + 
        content.slice(insertPoint);
      changes.push('Added Back button at bottom');
    }
  }
  
  // Save the changes if any were made
  if (changes.length > 0) {
    fs.writeFileSync(filepath, content);
    console.log(`  ✅ Fixed: ${changes.join(', ')}`);
    return true;
  } else {
    console.log('  No changes needed');
    return false;
  }
}

// Main function
function main() {
  // Get the list of example pages
  const examplePages = glob.sync('app/elements-example/*/page.tsx');
  
  // Count of fixes
  let fixCount = 0;
  
  // Fix each file
  examplePages.forEach(filepath => {
    if (fixFile(filepath)) {
      fixCount++;
    }
  });
  
  console.log(`\n=== FIX SUMMARY ===\n`);
  console.log(`Fixed ${fixCount} of ${examplePages.length} pages`);
  console.log(`\nRun the audit script again to verify the fixes:\n  node scripts/audit-example-pages.js`);
}

// Execute the main function
main(); 