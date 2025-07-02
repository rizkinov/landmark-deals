# 🏢 CBRE Capital Market Landmark Deals

A modern web application for discovering and showcasing significant real estate transactions across Asia Pacific. Built with Next.js 15 and React 19, using CBRE Web Elements design system.

**Live Application**: Real estate professionals and investors discover landmark property deals and market insights.

## 🎯 Purpose

**CBRE Capital Market Landmark Deals** is a sophisticated web platform that:

- **Showcases significant real estate transactions** across Asia Pacific markets
- **Provides market insights** and deal analysis for real estate professionals  
- **Connects investors** with landmark property opportunities
- **Delivers market intelligence** through curated deal data

## ✨ Features

### 🔍 Deal Discovery
- **Advanced filtering** by location, asset class, transaction size, and date
- **Interactive deal cards** with property details and transaction information
- **Search functionality** to find specific deals or properties
- **Geographic filtering** across Asia Pacific markets

### 📊 Market Intelligence  
- **Deal analytics** and market trends
- **Property valuation insights** and pricing data
- **Market performance metrics** by region and asset class
- **Historical transaction data** and comparables

### 👥 Professional Tools
- **Curated deal lists** for different investor profiles
- **Property image galleries** with high-quality visuals
- **Deal comparison tools** for investment analysis
- **Export capabilities** for further analysis

### 🎨 Modern Interface
- **CBRE design system** with consistent branding
- **Responsive design** optimized for desktop and mobile
- **Intuitive navigation** with advanced filtering capabilities
- **High-performance** with server-side rendering

## 🚀 Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with server components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### **UI Components**
- **CBRE Web Elements** - Official CBRE design system components
- **shadcn/ui** - Modern React component primitives
- **Radix UI** - Accessible component foundation

### **Backend & Database**
- **Supabase** - PostgreSQL database with real-time features
- **Server Components** - Optimized data fetching
- **Image Storage** - Supabase Storage for property images

### **Development**
- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting
- **Git** - Version control with feature branches

## 📦 Installation

### **Prerequisites**
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account (for database)

### **Clone & Install**
```bash
# Clone the repository
git clone <repository-url>
cd landmark-deals

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### **Environment Setup**
Create `.env.local` with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### **Database Setup**
1. Create a new Supabase project
2. Run the database setup (see `setup-guide.md` for detailed instructions)
3. Import sample deal data
4. Configure storage policies for property images

## 🛠️ Development

### **Start Development Server**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### **Build for Production**
```bash
npm run build
npm start
```

### **Code Quality**
```bash
# Lint code
npm run lint

# Format code (if prettier is configured)
# npm run format
```

## 📁 Project Structure

```
landmark-deals/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard for deal management
│   ├── deals/                    # Main deals listing and detail pages  
│   ├── elements-example/         # Component showcase (optional)
│   └── layout.tsx               # Root layout with CBRE theming
├── src/
│   ├── components/              # React components
│   │   ├── admin/               # Admin-specific components
│   │   ├── deals/               # Deal-related components
│   │   ├── ui/                  # Base UI components (shadcn/ui)
│   │   └── cbre/                # CBRE-styled components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities and configurations
│   └── styles/                  # Global styles and theme
├── public/                      # Static assets
├── fonts/                       # CBRE brand fonts (Calibre, Financier)
└── logos/                       # CBRE branding assets
```

## 🎨 Design System

### **CBRE Brand Colors**
| Color | Hex | Usage |
|-------|-----|-------|
| CBRE Green | `#003F2D` | Primary brand color, headers |
| Accent Green | `#17E88F` | CTAs, highlights, success states |
| Dark Green | `#012A2D` | Dark accents, navigation |
| Dark Grey | `#435254` | Body text, secondary elements |
| Light Grey | `#CAD1D3` | Borders, dividers |
| Lighter Grey | `#E6E8E9` | Backgrounds, cards |

### **Typography**
- **Financier Display** - Headings and display text
- **Calibre** - Body text and UI elements
- **No rounded corners** - Sharp, professional aesthetic

### **Components**
All UI components follow CBRE design guidelines using the CBRE Web Elements library for consistent branding and user experience.

## 🔧 Configuration

### **Tailwind CSS**
The application uses Tailwind with CBRE design tokens:
- Custom color palette with CBRE brand colors
- Typography scale with Financier and Calibre fonts  
- Zero border radius for sharp, professional look
- Responsive breakpoints optimized for real estate content

### **Next.js**
- **App Router** for modern routing and layouts
- **Server Components** for optimized performance  
- **Image Optimization** for property photos
- **TypeScript** strict mode enabled

## 📊 Database Schema

### **Core Tables**
- **`deals`** - Property transaction records
- **`properties`** - Property information and details
- **`locations`** - Geographic data and market information
- **`asset_classes`** - Property types and classifications

### **Features**
- **Full-text search** across deal descriptions
- **Geographic indexing** for location-based queries
- **Image storage** integration with Supabase Storage
- **Real-time updates** for new deal additions

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Deploy to Vercel
npm install -g vercel
vercel

# Set environment variables in Vercel dashboard
# Deploy with: vercel --prod
```

### **Other Platforms**
The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway  
- AWS Amplify
- Docker containers

### **Environment Variables**
Ensure all Supabase environment variables are configured in your deployment platform.

## 🤝 Contributing

### **Development Workflow**
1. Create feature branch from `main`
2. Make changes following code style guidelines
3. Test thoroughly on local development server
4. Submit pull request with detailed description
5. Code review and approval process
6. Merge to main and deploy

### **Code Standards**
- TypeScript for type safety
- ESLint configuration for code quality
- Consistent component structure and naming
- CBRE design system adherence

## 📜 License

© 2024 CBRE. All rights reserved.

This application is proprietary software developed for CBRE's internal use and client services. Unauthorized copying, modification, or distribution is prohibited.

---

**Built with ❤️ by the CBRE Technology Team**
