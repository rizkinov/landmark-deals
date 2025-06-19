/** @type {import('tailwindcss').Config} */
const config = {
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
      fontFamily: {
        financier: ['var(--font-financier-display)'],
        calibre: ['var(--font-calibre)'],
      },
      // In Tailwind v4, colors should be defined using this format to ensure proper generation of utility classes
      textColor: {
        'cbre-green': '#003F2D',
        'accent-green': '#17E88F',
        'dark-green': '#012A2D',
        'dark-grey': '#435254',
        'light-grey': '#CAD1D3',
        'lighter-grey': '#E6E8E9',
      },
      backgroundColor: {
        'cbre-green': '#003F2D',
        'accent-green': '#17E88F',
        'dark-green': '#012A2D',
        'dark-grey': '#435254',
        'light-grey': '#CAD1D3',
        'lighter-grey': '#E6E8E9',
      },
      borderColor: {
        'cbre-green': '#003F2D',
        'accent-green': '#17E88F',
        'dark-green': '#012A2D',
        'dark-grey': '#435254',
        'light-grey': '#CAD1D3',
        'lighter-grey': '#E6E8E9',
      },
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
        
        // For shadcn components - mapping to CBRE colors
        border: "#CAD1D3", // light-grey
        input: "#CAD1D3", // light-grey
        ring: "#17E88F", // accent-green
        background: "#FFFFFF",
        foreground: "#435254", // dark-grey for body text
        primary: {
          DEFAULT: "#003F2D", // cbre-green
          foreground: "#FFFFFF", // white
        },
        secondary: {
          DEFAULT: "#435254", // dark-grey
          foreground: "#FFFFFF", // white
        },
        destructive: {
          DEFAULT: "#032842", // midnight
          foreground: "#FFFFFF", // white
        },
        muted: {
          DEFAULT: "#CAD1D3", // light-grey
          foreground: "#435254", // dark-grey
        },
        accent: {
          DEFAULT: "#17E88F", // accent-green
          foreground: "#003F2D", // cbre-green
        },
        card: {
          DEFAULT: "#FFFFFF", // white
          foreground: "#435254", // dark-grey for card text
        },
      },
      borderRadius: {
        // Remove all rounded corners
        lg: "0",
        md: "0",
        sm: "0",
        DEFAULT: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
    },
  },
  plugins: [],
};
export default config; 