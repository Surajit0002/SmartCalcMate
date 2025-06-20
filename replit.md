# CalcMate Pro - Comprehensive Tool & Converter Ecosystem

## Overview

CalcMate Pro has evolved into a comprehensive digital tool ecosystem featuring 100+ advanced calculators, converters, and AI-powered processing tools. The platform offers specialized tools across 13 categories including file conversion, media processing, AI-enhanced analysis, financial planning, health metrics, and mathematical computations. The application is built as a full-stack TypeScript application with a React frontend, Express backend, and PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds
- **Theme System**: Custom theme provider with dark/light mode support
- **Internationalization**: Custom i18n system with multi-language and multi-currency support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (with Neon serverless support)
- **Session Management**: express-session with PostgreSQL storage
- **Build System**: esbuild for production builds
- **Development**: tsx for TypeScript execution in development

## Tool Categories & Features

### 🧮 Mathematical & Financial Tools (8 tools)
- **Core Calculators**: EMI, SIP, Compound Interest, Mortgage, Investment, Loan Comparison
- **Advanced Features**: Interactive charts, detailed breakdowns, comparison tools
- **Financial Planning**: Investment projections, retirement planning, loan optimization

### 📐 Unit Conversion Hub (10 tools)
- **Advanced Unit Converter**: Length, Weight, Temperature, Time, Speed, Area, Volume, Data Size, Power, Pressure
- **Features**: Real-time conversion, historical data, precision controls, batch processing
- **Interface**: Tabbed interface with category-specific optimizations

### 📁 File Conversion Suite (15 tools)
- **PDF Tools**: PDF ↔ Word, Excel, Image conversion, merge, split, compress, password removal
- **Data Formats**: CSV ↔ Excel ↔ JSON ↔ XML conversion with structure preservation
- **Features**: Drag-and-drop interface, batch processing, quality controls, progress tracking

### 🎬 Media Processing Hub (9 tools)
- **Video Tools**: Format conversion (MP4, AVI, MKV), compression, audio extraction
- **Audio Tools**: Format conversion (MP3, WAV, AAC), compression, merging
- **Image Tools**: Format conversion (JPG, PNG, WebP), optimization, batch processing
- **Advanced Features**: Quality presets, resolution scaling, bitrate control, real-time preview

### 🤖 AI-Powered Tools (7 tools)
- **Vision & OCR**: Image-to-text extraction, document analysis, handwriting recognition
- **Speech Processing**: Speech-to-text, text-to-speech with multiple voices and languages
- **Language Tools**: AI translation, language detection, content enhancement
- **Code Analysis**: Code explanation, generation, optimization suggestions
- **Features**: Multi-language support, confidence scoring, batch processing

### 🔤 Text & Code Converters (15 tools)
- **Text Tools**: Case conversion, text reversal, duplicate removal, slug generation
- **Encoding**: Binary ↔ Text, Base64, ROT13, Unicode ↔ ASCII
- **Code Tools**: JSON ↔ XML ↔ CSV, HTML ↔ Markdown, code beautification, SQL formatting
- **Utilities**: QR code generation/scanning, UUID generation, regex testing

### 💱 Currency & Crypto (4 tools)
- **Live Rates**: Real-time currency conversion with historical data
- **Cryptocurrency**: BTC/ETH conversion with market data
- **Precious Metals**: Gold and silver rate tracking
- **Features**: Rate alerts, trend analysis, portfolio tracking

### 🌐 Language & Script Tools (5 tools)
- **Translation**: Multi-language text translation with context awareness
- **Script Conversion**: Between different writing systems (e.g., Hindi ↔ Roman)
- **Font Styling**: Unicode formatting and font style conversion
- **Detection**: Automatic language identification with confidence scores

### 🛠️ Specialized Tools (8 tools)
- **Image Formats**: ICO ↔ PNG conversion, favicon generation
- **Contact Data**: VCF ↔ CSV conversion for contact management
- **Web Tools**: URL shortening, YouTube timestamp links, metadata extraction
- **Utilities**: Text diff checker, link analysis, data validation

## Key Components

### Database Layer
- **Schema**: Defined in `shared/schema.ts` using Drizzle ORM with enhanced calculator metadata
- **Users Table**: User authentication with preferences for calculator settings
- **Calculator Data**: Comprehensive tool definitions with categories, features, and metadata
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

### Frontend Architecture
- **Modular Components**: Category-specific converter hubs with specialized interfaces
- **Advanced UI**: Tab-based navigation, drag-and-drop file handling, real-time progress tracking
- **Theme System**: Enhanced dark/light mode with gradient color schemes per category
- **Responsive Design**: Mobile-optimized interfaces with touch-friendly controls
- **Dynamic Routing**: Intelligent component mapping based on tool categories

### Backend Services
- **Route Management**: Modular route registration system
- **Storage Abstraction**: Interface-based storage system for easy testing and switching between implementations
- **Development Tools**: Vite integration for hot module replacement in development

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM provides type-safe database queries
4. **Response Handling**: Structured JSON responses with proper error handling
5. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **Database**: PostgreSQL with Neon serverless driver
- **UI Components**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with PostCSS processing
- **Charts**: Chart.js for data visualization
- **Date Handling**: date-fns for date calculations
- **Validation**: Zod for runtime type validation

### Development Dependencies
- **TypeScript**: Full type safety across the stack
- **Vite**: Development server and build tool
- **ESBuild**: Production backend bundling
- **Drizzle Kit**: Database migration management

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite HMR for frontend, tsx for backend
- **Database**: Local PostgreSQL or Neon development database
- **Port Configuration**: Frontend on Vite dev server, backend on port 5000

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: PostgreSQL with connection pooling
- **Static Serving**: Express serves built frontend assets

### Replit Deployment
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port Mapping**: Internal port 5000 mapped to external port 80
- **Autoscale**: Configured for automatic scaling

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 20, 2025. Initial setup