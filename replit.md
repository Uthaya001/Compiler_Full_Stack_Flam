# Dynamic Interface Compiler

## Overview

This is a Dynamic Interface Compiler - a web application that allows users to build UI components through JSON schema definitions. The application provides a real-time visual editor where users can create forms, text blocks, and image components by editing JSON schemas and seeing the rendered output immediately. The system supports template loading, custom logic execution for form validation, and schema export functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based development
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: Zustand for client-side state management with persistence middleware
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack React Query for server state management and caching
- **Forms**: React Hook Form for efficient form handling and validation

### Backend Architecture
- **Runtime**: Node.js with Express.js as the web server framework
- **Build System**: Vite for development server and build tooling with hot module replacement
- **Development Tools**: TSX for TypeScript execution in development mode
- **Static Serving**: Express serves the built React application in production

### Component System
- **Block Architecture**: Modular component blocks (FormBlock, TextBlock, ImageBlock) that render based on JSON schema definitions
- **Schema Validation**: Zod schemas for runtime type checking and validation
- **Custom Logic Execution**: Safe function execution using Function constructor for form validation logic
- **Template System**: Predefined templates for common use cases (contact forms, text content, images)

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless PostgreSQL for cloud database hosting
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple

### Development Features
- **Hot Reloading**: Vite middleware integration for instant development feedback
- **Error Handling**: Runtime error overlay for development debugging
- **Code Mapping**: Source map support for debugging built code
- **Development Banner**: Replit development environment integration

### Security Considerations
- **Safe Code Execution**: Custom logic execution uses Function constructor instead of eval for improved security
- **Input Validation**: Form inputs are validated both client-side and through schema validation
- **Error Boundaries**: Graceful error handling for invalid schemas or execution failures

## External Dependencies

### Database Services
- **Neon**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible React components including dialogs, dropdowns, forms, and navigation
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component

### Development Tools
- **Vite**: Build tool and development server with plugin ecosystem
- **Replit Integration**: Development environment plugins for enhanced coding experience
- **ESBuild**: Fast JavaScript bundler for production builds

### Utility Libraries
- **Class Variance Authority**: Utility for creating type-safe component variants
- **clsx & Tailwind Merge**: Conditional CSS class management
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation for components

### Form Management
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Integration layer for validation libraries

The application follows a clean separation of concerns with a React frontend handling the UI and schema editing, an Express backend serving the application, and PostgreSQL providing persistent data storage. The architecture supports real-time schema editing with immediate visual feedback and extensible component blocks for different UI element types.