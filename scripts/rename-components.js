/**
 * Component Renaming Script
 * This script renames component files from kebab-case to PascalCase
 * and updates imports in all files.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to convert kebab-case to PascalCase
function kebabToPascal(kebabString) {
  return kebabString
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Function to rename a file
function renameFile(oldPath, newPath) {
  console.log(`Renaming ${oldPath} to ${newPath}`);
  fs.renameSync(oldPath, newPath);
}

// Directory to process
const directories = [
  'src/components/cbre',
  'src/components/blocks'
];

// Process each directory
directories.forEach(directory => {
  const files = fs.readdirSync(directory);
  
  // First, get all the renames we need to do
  const renames = [];
  files.forEach(file => {
    if (file.startsWith('cbre-') && file.endsWith('.tsx')) {
      const oldPath = path.join(directory, file);
      const pascalName = 'CBRE' + kebabToPascal(file.replace('cbre-', '').replace('.tsx', '')) + '.tsx';
      const newPath = path.join(directory, pascalName);
      
      renames.push({ oldPath, newPath, oldName: file, newName: pascalName });
    }
  });
  
  // Then do the renames
  renames.forEach(({ oldPath, newPath }) => {
    renameFile(oldPath, newPath);
  });
  
  // Update index.ts exports
  const indexPath = path.join(directory, 'index.ts');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    renames.forEach(({ oldName, newName }) => {
      const oldImportName = oldName.replace('.tsx', '');
      const newImportName = newName.replace('.tsx', '');
      indexContent = indexContent.replace(`'./${oldImportName}'`, `'./${newImportName}'`);
    });
    
    fs.writeFileSync(indexPath, indexContent);
    console.log(`Updated ${indexPath}`);
  }
});

console.log('Component renaming complete');
console.log('Note: You will need to update imports in component files manually!'); 