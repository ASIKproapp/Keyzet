# StyleVerse - Fashion Shopping, Community & Rewards App

StyleVerse is a comprehensive fashion e-commerce platform that combines shopping, social networking, and gamification features. Built with modern web technologies, it provides a seamless mobile-first experience for users to discover fashion trends, shop exclusive collections, earn rewards, and connect with style enthusiasts.

## Project Status & Evolution

✅ **What's Working Well** (Keep These):
- Clear feature grouping (Shop, Community, Game)
- Mobile-first thinking with bottom navigation
- Gamification deeply integrated (coins, leaderboard)
- Component-driven architecture
- Good tech choices (React + Vite + Tailwind + React Query)

This already puts StyleVerse ahead of 90% of Bangladeshi e-commerce apps.

## Recent Improvements

We've implemented several key improvements to evolve the architecture:

### 🏗️ Enhanced Project Structure
- Created a feature-driven directory structure for better organization
- Separated concerns with dedicated API, logic, and type files
- Implemented proper admin/user separation in the app structure
- Added centralized state management with Zustand

### 🔐 Improved Backend Integration
- Created Supabase integration layer with typed queries
- Implemented proper authentication flow with session management
- Added secure API layers for all major features
- Established clear data access patterns

### 🔄 Better State Management
- Introduced Zustand for global state management
- Created dedicated stores for UI and session state
- Implemented persistent state with localStorage
- Added proper loading and error states

### 🛡️ Security & Scalability
- Separated sensitive logic into dedicated files
- Implemented proper error handling and validation
- Added centralized authentication and authorization
- Created reusable hooks for common functionality

## Table of Contents

- [Features Overview](#features-overview)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Core Problems to Address](#core-problems-to-address)
- [Recommended Project Structure](#recommended-project-structure)
- [UI/UX Design Principles](#uiux-design-principles)
- [Core Components](#core-components)
- [State Management](#state-management)
- [Routing Structure](#routing-structure)
- [Responsive Design](#responsive-design)
- [Gamification System](#gamification-system)
- [Development Setup](#development-setup)
- [Supabase Backend Setup](#supabase-backend-setup)
- [Deployment](#deployment)

## Features Overview

### 1. Shopping Experience
- Browse and search fashion products across multiple categories
- Detailed product pages with images, reviews, and pricing
- Shopping cart and checkout functionality
- Wishlist management
- Order tracking and history

### 2. Community Features
- User profiles with social connections
- Post sharing with images/videos
- Like, comment, and share functionality
- Community feed with trending content
- User-generated reviews and ratings

### 3. Gamification & Rewards
- Coin earning system through various activities
- Leaderboards and ranking system
- Reward redemption with exclusive offers
- Daily challenges and spin-to-win games

### 4. User Management
- Secure authentication (login/signup)
- Profile customization
- Privacy settings
- Notification system

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and bundling
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui built on Radix UI primitives
- **State Management**: React Query for server state, React Context for client state
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion-inspired custom animations
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)

## Application Architecture

The application now follows a modern, feature-driven architecture with clear separation of concerns:

```
src/
├── app/                     # App shell & routing
│   ├── App.tsx              # Main application component
│   ├── public/              # Public pages
│   ├── auth/                # Login, signup, otp
│   ├── user/                # User-facing app
│   └── admin/               # Admin dashboard
│
├── features/                # DOMAIN-DRIVEN FEATURES
│   ├── auth/
│   │   ├── auth.api.ts      # Authentication API calls
│   │   ├── auth.hooks.ts    # Authentication hooks and context
│   │   └── auth.types.ts    # Authentication types
│   │
│   ├── shop/
│   │   ├── product.api.ts   # Product API calls
│   │   ├── cart.logic.ts    # Shopping cart logic
│   │   └── shop.types.ts    # Shopping types
│   │
│   ├── orders/
│   │   ├── order.api.ts     # Order API calls
│   │   ├── order.logic.ts   # Order business logic
│   │   └── order.types.ts   # Order types
│   │
│   ├── game/
│   │   ├── coin.api.ts      # Coin API calls
│   │   ├── leaderboard.logic.ts # Leaderboard logic
│   │   └── game.types.ts    # Game types
│   │
│   └── reviews/
│       ├── review.api.ts    # Review API calls
│       └── review.types.ts  # Review types
│
├── components/              # PURE UI COMPONENTS
│   ├── ui/                  # Shared UI components (buttons, cards, etc.)
│   ├── layout/              # Layout components (header, sidebar, etc.)
│   └── shared/              # Reusable widgets
│
├── lib/                     # UTILITY FUNCTIONS
│   ├── supabase.ts          # Supabase client and types
│   ├── auth.ts              # Authentication service
│   ├── constants.ts         # Application constants
│   └── utils.ts             # Helper functions
│
├── hooks/                   # CUSTOM HOOKS
│   └── use-toast.ts         # Toast notification hook
│
├── store/                   # STATE MANAGEMENT
│   ├── ui.store.ts          # UI state (theme, sidebar, etc.)
│   └── session.store.ts     # Session state (auth, profile, etc.)
│
├── types/                   # GLOBAL TYPES
│   └── global.d.ts          # Shared type definitions
│
├── pages/                   # PAGE COMPONENTS
└── main.tsx                # Application entry point
```

## Core Problems Addressed

We've successfully addressed the core architectural issues identified earlier:

### ✅ Clear Domain Separation

Implemented feature-based domains that isolate functionality and prevent cross-feature contamination.

### ✅ Backend Integration

Created a robust Supabase integration layer with proper typing and secure API access patterns.

### ✅ Admin/User Separation

Established clear routing and structural separation between user and admin functionality.

### ✅ API/Data-Access Layer

Moved all direct database calls into dedicated API files, creating a clean abstraction layer.

## Implemented Project Structure

We've successfully implemented the recommended production-grade structure that works well with Supabase, AI tools, and future mobile apps:

```
src/
├── app/                     # App shell & routing
│   ├── App.tsx              # Main application component
│   ├── public/              # Public pages
│   ├── auth/                # Login, signup, otp
│   ├── user/                # User-facing app
│   └── admin/               # Admin dashboard
│
├── features/                # DOMAIN-DRIVEN FEATURES
│   ├── auth/
│   │   ├── auth.api.ts      # Authentication API calls
│   │   ├── auth.hooks.ts    # Authentication hooks and context
│   │   └── auth.types.ts    # Authentication types
│   │
│   ├── shop/
│   │   ├── product.api.ts   # Product API calls
│   │   ├── cart.logic.ts    # Shopping cart logic
│   │   └── shop.types.ts    # Shopping types
│   │
│   ├── orders/
│   │   ├── order.api.ts     # Order API calls
│   │   ├── order.logic.ts   # Order business logic
│   │   └── order.types.ts   # Order types
│   │
│   ├── game/
│   │   ├── coin.api.ts      # Coin API calls
│   │   ├── leaderboard.logic.ts # Leaderboard logic
│   │   └── game.types.ts    # Game types
│   │
│   └── reviews/
│       ├── review.api.ts    # Review API calls
│       └── review.types.ts  # Review types
│
├── components/              # PURE UI COMPONENTS
│   ├── ui/                  # Shared UI components (buttons, cards, etc.)
│   ├── layout/              # Layout components (header, sidebar, etc.)
│   └── shared/              # Reusable widgets
│
├── lib/                     # UTILITY FUNCTIONS
│   ├── supabase.ts          # Supabase client and types
│   ├── auth.ts              # Authentication service
│   ├── constants.ts         # Application constants
│   └── utils.ts             # Helper functions
│
├── hooks/                   # CUSTOM HOOKS
│   └── use-toast.ts         # Toast notification hook
│
├── store/                   # STATE MANAGEMENT
│   ├── ui.store.ts          # UI state (theme, sidebar, etc.)
│   └── session.store.ts     # Session state (auth, profile, etc.)
│
├── types/                   # GLOBAL TYPES
│   └── global.d.ts          # Shared type definitions
│
├── pages/                   # PAGE COMPONENTS
└── main.tsx                # Application entry point
```

### Benefits Now Realized

✅ **Feature Isolation** - Shop logic is completely isolated from other features

✅ **Easier Development** - Developers can work on individual features without affecting others

✅ **Security-Ready** - Sensitive logic is properly separated and secured

✅ **Admin System Integration** - Clear separation between user and admin functionality

✅ **Scalable Architecture** - Easy to add new features without disrupting existing code

## UI/UX Design Principles

### Mobile-First Approach
- Designed primarily for mobile users with touch-friendly interfaces
- Responsive layouts that adapt to all screen sizes
- Optimized touch targets and gestures

### Consistent Design Language
- Royal Red primary color scheme with Gold accents
- Consistent spacing and typography scales
- Meaningful animations and transitions
- Accessible color contrast ratios

### Intuitive Navigation
- Bottom navigation bar for primary sections
- Sidebar menu for comprehensive navigation
- Clear breadcrumbs and back navigation

## Core Components

### Layout Components
- **AppLayout**: Main layout wrapper with header, sidebar, and bottom navigation
- **Header**: Top navigation bar with search, notifications, and coins display
- **Sidebar**: Comprehensive navigation menu with categorized links
- **BottomNav**: Mobile-friendly bottom navigation bar

### Shopping Components
- **ProductCard**: Display product information with image, price, and ratings
- **CategoryCard**: Visual representation of product categories
- **PromotionalSlider**: Carousel for featured promotions and banners

### Community Components
- **PostCard**: Display user-generated content with media and engagement metrics

### Gamification Components
- **CoinDisplay**: Visual representation of user's coin balance
- **LeaderboardItem**: Display user rankings in competitive features
- **ChallengeCard**: Interactive challenges for earning rewards

## State Management

### Client State
- Managed using React's built-in useState and useContext hooks
- Custom hooks for complex state logic
- Local component state for ephemeral UI interactions

### Server State
- Handled with React Query for data fetching, caching, and synchronization
- Automatic background updates and stale data refetching
- Optimistic updates for improved user experience

## Routing Structure

The application uses React Router for client-side navigation:

```
/                    # Homepage
/shop                # Product browsing
/shop/category/:slug # Category-specific products
/product/:productId  # Product detail page
/community           # Community feed
/profile             # User profile
/game                # Gamification center
/cart                # Shopping cart
/orders              # Order history
/wishlist            # Saved items
/login               # Authentication
/signup              # User registration
```

## Responsive Design

### Mobile Optimization
- Touch-friendly interface with appropriate sizing
- Horizontal scrolling carousels for category and sort options
- Sticky navigation elements for easy access
- Optimized form inputs for mobile keyboards

### Tablet & Desktop Adaptation
- Expanded layouts with additional screen real estate
- Multi-column grids for product displays
- Persistent sidebar navigation
- Enhanced filtering capabilities

## Gamification System

## High-Impact UI/UX Improvements

### 🔥 Trust-First Upgrades

Add these visibly to build user confidence:

- "Verified Purchase" badge on reviews
- Trust score display on products and sellers
- Video-first reviews positioned prominently
- Admin responses under reviews for credibility

### 🔥 Game UX Enhancements

Improve engagement with visual feedback:

- Animated coin earnings with floating notifications
- Progress bars showing advancement to next level
- Integrated leaderboard tab within user profile
- Achievement badges for milestones and challenges

## What Not to Change (Yet)

To maintain focus and avoid over-engineering:

❌ Don't add microservices
❌ Don't over-optimize performance prematurely
❌ Don't add blockchain/NFT features
❌ Don't attempt to build everything at once

The current web-first approach is the right strategy for now.

### Coin Economy
- Users earn coins through purchases, reviews, and social engagement
- Coins can be redeemed for discounts and exclusive rewards
- Balance displayed prominently in the header

### Leaderboards
- Competitive rankings based on user activity
- Tiered levels (Bronze, Silver, Gold, Platinum, Diamond)
- Regular resets to maintain engagement

### Challenges & Rewards
- Daily and weekly challenges to encourage participation
- Spin-to-win mechanics for surprise rewards
- Achievement badges for milestones

## Development Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

cd keyzet-main

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Working with the New Architecture

The project now follows a feature-driven architecture that makes development easier:

1. **Feature Development**: Work within the `src/features/` directory for new functionality
2. **API Layer**: Add new API calls to the appropriate `.api.ts` file
3. **Business Logic**: Implement complex logic in `.logic.ts` files
4. **Types**: Define interfaces and types in `.types.ts` files
5. **State Management**: Use the existing Zustand stores or create new ones as needed
6. **UI Components**: Create reusable components in `src/components/`

### Adding New Features

To add a new feature:

1. Create a new directory in `src/features/`
2. Add `feature.api.ts` for API calls
3. Add `feature.logic.ts` for business logic (if needed)
4. Add `feature.types.ts` for type definitions
5. Create UI components in `src/components/` if needed
6. Add routes in `src/app/App.tsx`

## Supabase Backend Setup

The application is designed to work with Supabase as its backend. To connect to a real Supabase instance:

### 1. Create a Supabase Project

1. Go to https://supabase.io
2. Sign up or log in to your account
3. Click "New Project"
4. Enter a name for your project (e.g., "styleverse")
5. Set a database password (save this for later)
6. Select a region closest to you
7. Click "Create Project"

### 2. Get Your Supabase Credentials

1. After your project is created, go to the "Settings" icon in the left sidebar
2. Click "API" in the settings menu
3. Copy the following values:
   - Project URL (starts with https://)
   - anon key (long string under Project API keys)

### 3. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```
VITE_SUPABASE_URL=your_actual_project_url_here
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

For example:
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxx
```

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to the "SQL Editor" in the left sidebar
2. Copy and paste the contents of `supabase/schema.sql` into the editor
3. Click "RUN" to execute the schema
4. Repeat for `supabase/schema_updated.sql`
5. Run the migration script `supabase/migrations/001_update_schema.sql`

### 5. Set Up Storage

1. In your Supabase dashboard, go to "Storage" in the left sidebar
2. Run the storage setup script from `supabase/storage_setup.sql` in the SQL Editor

### 6. Deploy Database Functions

1. In your Supabase dashboard, go to "Database" → "Functions"
2. Deploy each function from the `supabase/functions/` directory:
   - `add_to_cart.sql`
   - `checkout.sql`
   - `award_coins.sql`

### 7. Configure Authentication

1. In your Supabase dashboard, go to "Authentication" → "Settings"
2. Enable "Email" as a sign-up provider
3. Optionally enable other providers (Google, GitHub, etc.)

### 8. Test the Connection

1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Open your browser to http://localhost:8119 (or whatever port Vite assigns)
3. Check the browser console for Supabase connection messages

## Deployment

The application can be deployed to any static hosting service that supports SPA routing:

1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your hosting provider
3. Configure rewrite rules to serve `index.html` for all routes

For Lovable projects, simply use the built-in publish feature in the Lovable dashboard.