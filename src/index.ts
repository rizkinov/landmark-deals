/**
 * CBRE Web Elements
 * A modern UI component library styled according to CBRE's design system
 */

// Export namespaces to avoid naming conflicts
import * as UI from './components/ui';
import * as CBRE from './components/cbre';
import * as Blocks from './components/blocks';

// Re-export namespaces
export { UI, CBRE, Blocks };

// Utility exports
export * from './lib/utils';
export * from './hooks/use-mobile';

// Re-export the theme directly from the config directory
// Note: In a proper package setup, we would move this file to src/lib
// and import it from there, but for now we're keeping the original structure
// export { default as cbreTheme } from '../config/cbre-theme'; 