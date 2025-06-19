/**
 * CBRE Theme Variables
 * This file centralizes all CBRE design tokens for consistent application across the project.
 */

module.exports = {
  // Main brand colors
  colors: {
    // Primary Colors
    "cbre-green": "#003F2D",
    "accent-green": "#17E88F",
    "dark-green": "#012A2D",
    "dark-grey": "#435254",
    "light-grey": "#CAD1D3",
    "lighter-grey": "#E6E8E9",
    
    // Secondary Colors
    "midnight": "#032842",
    "midnight-tint": "#778F9C",
    "sage": "#538184",
    "sage-tint": "#96B3B6",
    "celadon": "#80BBAD",
    "celadon-tint": "#C0D4CB",
    "wheat": "#DBD99A",
    "wheat-tint": "#EFECD2",
    "cement": "#7F8480",
    "cement-tint": "#CBCDCB",
  },
  
  // Typography settings
  typography: {
    fonts: {
      financier: 'var(--font-financier-display)',
      calibre: 'var(--font-calibre)'
    },
  },
  
  // Mapping to shadcn/ui theme variables
  shadcnMapping: {
    border: "light-grey",
    input: "light-grey",
    ring: "accent-green",
    background: "#FFFFFF",
    foreground: "dark-grey",
    primary: {
      DEFAULT: "cbre-green",
      foreground: "#FFFFFF",
    },
    secondary: {
      DEFAULT: "dark-grey",
      foreground: "#FFFFFF",
    },
    destructive: {
      DEFAULT: "midnight",
      foreground: "#FFFFFF",
    },
    muted: {
      DEFAULT: "light-grey",
      foreground: "dark-grey",
    },
    accent: {
      DEFAULT: "accent-green",
      foreground: "cbre-green",
    },
    card: {
      DEFAULT: "#FFFFFF",
      foreground: "dark-grey",
    },
  },
  
  // Border radius settings (CBRE uses no rounded corners)
  borderRadius: {
    lg: "0",
    md: "0",
    sm: "0",
    DEFAULT: "0",
    xl: "0",
    "2xl": "0",
    "3xl": "0",
    full: "0",
  }
}; 