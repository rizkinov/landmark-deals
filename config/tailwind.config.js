/** @type {import('tailwindcss').Config} */
const cbreTheme = require('./cbre-theme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: cbreTheme.typography.fonts,
      
      // In Tailwind v4, colors should be defined using this format to ensure proper generation of utility classes
      textColor: {
        ...Object.fromEntries(
          Object.entries(cbreTheme.colors).map(([key, value]) => [key, value])
        ),
      },
      backgroundColor: {
        ...Object.fromEntries(
          Object.entries(cbreTheme.colors).map(([key, value]) => [key, value])
        ),
      },
      borderColor: {
        ...Object.fromEntries(
          Object.entries(cbreTheme.colors).map(([key, value]) => [key, value])
        ),
      },
      colors: {
        // Primary Colors
        ...cbreTheme.colors,
        
        // For shadcn components - mapping to CBRE colors
        ...Object.fromEntries(
          Object.entries(cbreTheme.shadcnMapping).map(([key, value]) => {
            // If the value is a string that exists in cbreTheme.colors, use that color
            if (typeof value === 'string' && value in cbreTheme.colors) {
              return [key, cbreTheme.colors[value]];
            }
            // Otherwise, use the value as is
            return [key, value];
          })
        ),
      },
      borderRadius: cbreTheme.borderRadius,
    },
  },
  plugins: [],
} 