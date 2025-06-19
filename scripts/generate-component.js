#!/usr/bin/env node

/**
 * CBRE Component Generator
 * This tool generates new CBRE components with the correct structure and naming conventions.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Component type options
const componentTypes = ['ui', 'cbre', 'block'];

// Ask for component name
rl.question('Component name (e.g. Button): ', (componentName) => {
  // Validate component name
  if (!componentName || componentName.trim() === '') {
    console.error('Error: Component name is required');
    rl.close();
    return;
  }
  
  componentName = componentName.trim();
  
  // Ensure first letter is uppercase
  const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
  
  // Ask for component type
  rl.question(`Component type (${componentTypes.join('/')}): `, (componentType) => {
    componentType = componentType.toLowerCase().trim();
    
    // Validate component type
    if (!componentTypes.includes(componentType)) {
      console.error(`Error: Component type must be one of: ${componentTypes.join(', ')}`);
      rl.close();
      return;
    }
    
    let directory;
    let finalName;
    
    // Determine directory and final component name
    if (componentType === 'cbre') {
      directory = path.join(__dirname, '../src/components/cbre');
      finalName = `CBRE${pascalCaseName}`;
    } else if (componentType === 'block') {
      directory = path.join(__dirname, '../src/components/blocks');
      finalName = `CBRE${pascalCaseName}Block`;
    } else {
      directory = path.join(__dirname, '../src/components/ui');
      finalName = pascalCaseName;
    }
    
    const filePath = path.join(directory, `${finalName}.tsx`);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.error(`Error: Component ${finalName} already exists at ${filePath}`);
      rl.close();
      return;
    }
    
    // Generate content based on component type
    let content = '';
    
    if (componentType === 'ui') {
      content = generateUIComponent(pascalCaseName, finalName);
    } else if (componentType === 'cbre') {
      content = generateCBREComponent(pascalCaseName, finalName);
    } else {
      content = generateBlockComponent(pascalCaseName, finalName);
    }
    
    // Write the file
    fs.writeFileSync(filePath, content);
    console.log(`Created component: ${filePath}`);
    
    // Update the index.ts file
    updateIndex(directory, finalName);
    
    rl.close();
  });
});

// Function to generate a UI component
function generateUIComponent(name, finalName) {
  return `import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ${finalName}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add specific props here
}

const ${finalName} = React.forwardRef<HTMLDivElement, ${finalName}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          // Base styles
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
${finalName}.displayName = '${finalName}';

export { ${finalName} };
`;
}

// Function to generate a CBRE component
function generateCBREComponent(name, finalName) {
  const uiComponentName = name;
  
  return `import * as React from 'react';
import { cn } from '@/lib/utils';
import { ${uiComponentName} } from '@/components/ui';

export interface ${finalName}Props extends React.ComponentProps<typeof ${uiComponentName}> {
  // Add CBRE-specific props here
}

export const ${finalName} = React.forwardRef<
  React.ElementRef<typeof ${uiComponentName}>,
  ${finalName}Props
>(({ className, ...props }, ref) => {
  return (
    <${uiComponentName}
      className={cn(
        'cbre-styled',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
${finalName}.displayName = '${finalName}';
`;
}

// Function to generate a block component
function generateBlockComponent(name, finalName) {
  return `import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ${finalName}Props {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export function ${finalName}({
  className,
  title,
  children,
  ...props
}: ${finalName}Props) {
  return (
    <div
      className={cn(
        'cbre-block',
        className
      )}
      {...props}
    >
      {title && <h2 className="text-xl font-financier text-cbre-green">{title}</h2>}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
`;
}

// Function to update index.ts
function updateIndex(directory, componentName) {
  const indexPath = path.join(directory, 'index.ts');
  
  // If index.ts doesn't exist, create it
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, '');
  }
  
  // Read the current content
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Add the export statement
  if (!content.includes(`export * from './${componentName}'`)) {
    content += `export * from './${componentName}';\n`;
    fs.writeFileSync(indexPath, content);
  }
  
  console.log(`Updated ${indexPath}`);
} 