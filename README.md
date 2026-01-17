# Ticketify

A modern ticket management application built with Next.js 16, TypeScript, and SQLite. This application demonstrates server-side rendering, API routes, client-side state management with React Query, and full-stack validation using Zod and React Hook Form.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Next.js App Router Architecture](#nextjs-app-router-architecture)
- [Database Layer](#database-layer)
- [API Routes](#api-routes)
- [Client-Side Data Fetching](#client-side-data-fetching)
- [Custom Hooks](#custom-hooks)
- [Components](#components)
- [Helper Functions](#helper-functions)
- [Validation: Zod + React Hook Form](#validation-zod--react-hook-form)
- [Data Flow](#data-flow)
- [Getting Started](#getting-started)

## Overview

Ticketify is a full-stack application that allows users to create, view, update, and delete support tickets. The application follows Next.js 16 App Router conventions, implements server-side rendering for optimal performance, and uses React Query for efficient client-side data management.

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript 5
- **Database**: SQLite (better-sqlite3)
- **State Management**: TanStack React Query (v5)
- **Validation**: Zod + React Hook Form
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (Dialog)
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React, React Icons

## Project Structure

```
ticketify/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── tickets/
│   │   │       ├── route.ts   # GET (all) & POST
│   │   │       └── [id]/
│   │   │           └── route.ts  # GET, PATCH, DELETE
│   │   ├── tickets/           # Tickets page route
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx   # Suspense fallback
│   │   │   ├── error.tsx     # Error boundary
│   │   │   └── [id]/
│   │   │       └── page.tsx  # Ticket detail page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── layouts/          # Layout components
│   │   └── ui/               # Reusable UI components
│   ├── custom hooks/         # React Query hooks
│   ├── database/             # Database layer
│   ├── helpers/              # Utility functions
│   ├── lib/
│   │   └── api/             # API client functions
│   ├── schema/               # Zod schemas
│   └── types/                # TypeScript types
└── tickets.db                # SQLite database
```

## Next.js App Router Architecture

The application uses Next.js 16 App Router, which provides a file-system based routing system with support for layouts, loading states, error boundaries, and server components.

### Route Structure

#### `/` - Homepage (`app/page.tsx`)

**Type**: Server Component  
**Purpose**: Landing page with navigation to tickets

- Static server component with SEO metadata
- Provides a welcoming interface and link to tickets page
- No data fetching, pure static content

#### `/tickets` - Tickets List (`app/tickets/page.tsx`)

**Type**: Server Component with Suspense  
**Purpose**: Displays all tickets in a grid layout

**Key Features**:
- Uses `Suspense` boundary for loading state
- Imports `TicketsLoading` as fallback component
- Renders `TicketList` client component inside Suspense
- Includes `TicketsHeader` for statistics and actions

**Special Files**:
- `loading.tsx`: Automatic loading UI (Suspense fallback)
  - Exported as default component
  - Used automatically by Next.js when route is loading
  - Displays skeleton UI matching ticket card structure
  
- `error.tsx`: Error boundary component
  - Catches errors in the route segment
  - Receives `error` and `reset` props
  - Provides user-friendly error message and retry button

#### `/tickets/[id]` - Ticket Detail (`app/tickets/[id]/page.tsx`)

**Type**: Server Component (Dynamic Route)  
**Purpose**: Displays detailed view of a single ticket

**Key Features**:
- Dynamic route using `[id]` parameter
- Async server component that fetches ticket data
- Uses `notFound()` for invalid/missing tickets
- Server-side data fetching with `getTicket()` helper

**Route Parameter**:
- `params`: Promise containing `{ id: string }`
- Extracted and validated before data fetching
- Type-safe with TypeScript

#### Root Layout (`app/layout.tsx`)

**Type**: Server Component  
**Purpose**: Wraps all pages with shared layout

**Responsibilities**:
- Defines HTML structure and metadata
- Provides `QueryProvider` for React Query context
- Includes `MainHeader` and `Footer` on all pages
- Configures fonts (Geist Sans, Geist Mono)
- Sets global CSS classes and theme

### API Routes Structure

API routes are located in `app/api/` directory. They handle server-side logic and database operations.

#### `/api/tickets` (`app/api/tickets/route.ts`)

**Methods**: GET, POST

**GET Handler**:
- Fetches all tickets from database
- Returns JSON array of tickets
- Handles errors with 500 status

**POST Handler**:
- Validates request body with Zod schema
- Creates new ticket with 'incomplete' status
- Returns created ticket with 201 status
- Returns validation errors with 400 status

#### `/api/tickets/[id]` (`app/api/tickets/[id]/route.ts`)

**Methods**: GET, PATCH, DELETE

**GET Handler**:
- Fetches single ticket by ID
- Validates ID parameter
- Returns 404 if ticket not found
- Returns ticket JSON on success

**PATCH Handler**:
- Updates ticket status
- Validates status value ('completed' | 'incomplete')
- Returns updated ticket
- Handles validation and server errors

**DELETE Handler**:
- Deletes ticket by ID
- Returns 204 No Content on success
- Handles invalid ID and server errors

## Database Layer

The database layer uses SQLite with `better-sqlite3` for synchronous, high-performance database operations.

### Database Files

#### `database/db.ts`

**Purpose**: Database connection and configuration

**Key Features**:
- Creates single database connection instance
- Configures SQLite database path (`tickets.db` in project root)
- Enables WAL (Write-Ahead Logging) mode for better concurrency
- Exports singleton database instance

**Why It's Important**:
- Single connection prevents multiple database instances
- WAL mode allows concurrent reads and writes
- Centralized configuration for database settings

#### `database/db.init.ts`

**Purpose**: Database schema initialization

**Key Features**:
- Creates `tickets` table if it doesn't exist
- Defines table structure:
  - `id`: INTEGER PRIMARY KEY AUTOINCREMENT
  - `fullname`: TEXT NOT NULL
  - `telephone`: TEXT NOT NULL UNIQUE
  - `brand`: TEXT NOT NULL
  - `status`: TEXT NOT NULL
  - `comment`: TEXT NOT NULL
- Idempotent: safe to run multiple times

**Usage**:
```bash
npm run db:init
```

**Why It's Important**:
- Separates schema definition from application code
- Allows database initialization without running the app
- Ensures database structure is consistent

#### `database/tickets.model.ts`

**Purpose**: Data access layer (DAL) - database operations

**Functions**:

1. **`getAllTickets()`**: Returns Ticket[]
   - Fetches all tickets from database
   - Used by GET `/api/tickets`

2. **`getTicketById(id: number)`**: Returns Ticket | undefined
   - Fetches single ticket by ID
   - Used by GET `/api/tickets/[id]`
   - Returns undefined if not found

3. **`createTicket(data)`**: Returns Ticket
   - Inserts new ticket into database
   - Auto-generates ID
   - Returns created ticket with generated ID
   - Used by POST `/api/tickets`

4. **`updateTicketStatus(id, status)`**: Returns Ticket
   - Updates ticket status in database
   - Validates ticket exists after update
   - Returns updated ticket
   - Used by PATCH `/api/tickets/[id]`

5. **`deleteTicket(id)`**: Returns void
   - Deletes ticket from database
   - Used by DELETE `/api/tickets/[id]`

**Why It's Important**:
- Separates database logic from API routes
- Provides type-safe database operations
- Centralized data access makes testing easier
- Single source of truth for database queries

#### `database/seed.ts`

**Purpose**: Populates database with initial data

**Key Features**:
- Checks if database is empty
- Inserts sample tickets only if table is empty
- Provides test data for development
- Idempotent: safe to run multiple times

**Why It's Important**:
- Provides consistent test data
- Helps with development and testing
- Demonstrates expected data structure

### Database Schema

```sql
CREATE TABLE tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    telephone TEXT NOT NULL UNIQUE,
    brand TEXT NOT NULL,
    status TEXT NOT NULL,
    comment TEXT NOT NULL
)
```

## API Routes

API routes handle HTTP requests and serve as the bridge between client and database.

### Request Flow

1. Client makes HTTP request to API route
2. API route validates request (if needed)
3. API route calls database model function
4. Database model executes SQL query
5. Results returned to API route
6. API route formats response and sends to client

### Response Format

**Success Responses**:
- GET: Returns data as JSON (200/201)
- DELETE: Returns 204 No Content

**Error Responses**:
- 400: Bad Request (validation errors)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error (server/database errors)

### Error Handling

All API routes use try-catch blocks to:
- Catch database errors
- Log errors to console
- Return user-friendly error messages
- Maintain proper HTTP status codes

## Client-Side Data Fetching

The application uses **TanStack React Query** for efficient client-side data management, caching, and synchronization.

### React Query Setup

#### `components/layouts/QueryProvider.tsx`

**Purpose**: Provides React Query context to the application

**Key Features**:
- Creates `QueryClient` instance using `useState` (singleton pattern)
- Wraps application with `QueryClientProvider`
- Provides query cache and mutation management
- Wraps entire app in root layout

**Why It's Important**:
- Required for React Query to work
- Ensures single QueryClient instance across app
- Provides query cache and default options

### API Client Functions (`lib/api/handleTickets.ts`)

These functions abstract HTTP requests and provide type-safe API calls.

**Functions**:

1. **`getTickets()`**: Promise<Ticket[]>
   - Fetches all tickets
   - GET request to `/api/tickets`
   - Throws error if request fails

2. **`getTicket(id)`**: Promise<Ticket>
   - Fetches single ticket
   - GET request to `/api/tickets/${id}`
   - Used by server components

3. **`createTicket(data)`**: Promise<Ticket>
   - Creates new ticket
   - POST request with JSON body
   - Returns created ticket

4. **`updateTicketStatus(id, status)`**: Promise<Ticket>
   - Updates ticket status
   - PATCH request with status in body
   - Returns updated ticket

5. **`deleteTicket(id)`**: Promise<void>
   - Deletes ticket
   - DELETE request
   - No return value

**Why They're Important**:
- Centralized API endpoint management
- Type-safe request/response handling
- Consistent error handling
- Reusable across components and hooks

## Custom Hooks

Custom hooks encapsulate React Query logic and provide clean interfaces for components.

### `useFetchTickets`

**Location**: `custom hooks/useFetchTickets.tsx`  
**Type**: Query Hook  
**Purpose**: Fetches all tickets with caching

**Implementation**:
```typescript
useQuery({
  queryKey: ['tickets'],
  queryFn: getTickets,
})
```

**Returns**:
- `data`: Ticket[] | undefined
- `isLoading`: boolean
- `error`: Error | null
- `refetch`: function

**Usage**:
- Used by `TicketList` and `TicketsHeader`
- Automatically caches data
- Refetches on window focus (default)
- Provides loading and error states

### `useCreateTicket`

**Location**: `custom hooks/useCreateTicket.tsx`  
**Type**: Mutation Hook  
**Purpose**: Creates new ticket

**Implementation**:
```typescript
useMutation({
  mutationFn: createTicket,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tickets'] })
  },
})
```

**Returns**:
- `mutate`: function (fire and forget)
- `mutateAsync`: Promise function
- `isPending`: boolean
- `error`: Error | null

**Key Feature**: Invalidates 'tickets' query cache on success, triggering automatic refetch

**Usage**: Used by `useCreateTicketForm` hook

### `useDeleteTicket`

**Location**: `custom hooks/useDeleteTicket.tsx`  
**Type**: Mutation Hook  
**Purpose**: Deletes ticket

**Implementation**:
```typescript
useMutation({
  mutationFn: deleteTicket,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tickets'] })
  },
})
```

**Returns**: Same as `useCreateTicket`

**Usage**: Used by `TicketCard` component

### `useUpdateTicketStatus`

**Location**: `custom hooks/useUpdateTicketStatus.tsx`  
**Type**: Mutation Hook  
**Purpose**: Updates ticket status

**Implementation**:
```typescript
useMutation({
  mutationFn: ({ id, status }) => updateTicketStatus(id, status),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tickets'] })
  },
})
```

**Parameters**: `{ id: number, status: 'completed' | 'incomplete' }`

**Usage**: Used by `TicketCard` component

### `useCreateTicketForm`

**Location**: `custom hooks/useHookForm.tsx`  
**Type**: Custom Form Hook  
**Purpose**: Manages form submission logic

**Implementation**:
- Uses `useCreateTicket` mutation
- Manages `isSubmitting` state
- Handles form data extraction
- Provides `handleSubmit` function

**Returns**:
- `handleSubmit`: async function
- `isSubmitting`: boolean

**Usage**: Used by `ModalCardForm` component

**Note**: Currently uses native FormData. Could be enhanced with React Hook Form for better validation.

## Components

### Layout Components (`components/layouts/`)

#### `MainHeader`

**Type**: Server Component  
**Purpose**: Global navigation header

**Features**:
- Logo and brand name
- Navigation component
- Accessible markup
- Server-rendered for performance

#### `Navigation`

**Type**: Client Component  
**Purpose**: Active route-aware navigation

**Features**:
- Uses `usePathname()` for active state
- Applies 'active' class to current route
- Uses `navLinkVariants` for styling
- Accessible with `aria-current="page"`

**Links**: Home (`/`), Tickets (`/tickets`)

#### `TicketsHeader`

**Type**: Client Component  
**Purpose**: Tickets page header with statistics

**Features**:
- Displays ticket statistics (total, completed, incomplete)
- Create ticket button
- Uses `useFetchTickets` for data
- Calculates stats with helper functions

#### `TicketList`

**Type**: Client Component  
**Purpose**: Renders list of ticket cards

**Features**:
- Uses `useFetchTickets` hook
- Handles loading and error states
- Maps tickets to `TicketCard` components
- Grid layout for responsive design

#### `QueryProvider`

**Type**: Client Component  
**Purpose**: React Query context provider

**Features**:
- Creates QueryClient instance
- Wraps app with QueryClientProvider
- Singleton pattern for QueryClient

#### `Footer`

**Type**: Server Component  
**Purpose**: Global footer with links

**Features**:
- Footer navigation links
- Accessible markup
- Server-rendered

#### `ManageTicketLayout`

**Type**: Client Component  
**Purpose**: Wrapper for ticket action buttons

**Features**:
- Wraps Button with consistent styling
- Provides icon + text layout
- Reusable for action buttons

### UI Components (`components/ui/`)

#### `Button`

**Type**: Client Component  
**Purpose**: Reusable button with variants

**Features**:
- Uses `buttonVariants` for styling
- Supports multiple variants (action, submit, danger, outline)
- Supports multiple sizes (sm, md, lg)
- Type-safe with TypeScript
- Accessible by default

**Variants**:
- `action`: Primary actions (violet background)
- `submit`: Form submissions
- `danger`: Destructive actions (red background)
- `outline`: Secondary actions (transparent with border)

#### `TicketCard`

**Type**: Client Component  
**Purpose**: Displays individual ticket information

**Features**:
- Uses `motion` for animations
- Displays ticket details
- Delete button (always visible)
- Mark as completed button (conditional)
- Uses `useDeleteTicket` and `useUpdateTicketStatus` hooks
- Accessible with ARIA labels

**Conditional Rendering**: "Mark as completed" button only shows for incomplete tickets

#### `CreateTicketsModal`

**Type**: Client Component  
**Purpose**: Modal dialog for creating tickets

**Features**:
- Uses Radix UI Dialog
- Controlled open/close state
- Contains `ModalCardForm` component
- Accessible dialog structure

#### `ModalCardForm`

**Type**: Client Component  
**Purpose**: Form for creating new tickets

**Features**:
- Uses `useCreateTicketForm` hook
- Native HTML form inputs
- Required field validation
- Loading state on submit
- Closes modal on success

**Fields**: fullname, telephone, brand, comment

#### `skeleton`

**Type**: Client Component  
**Purpose**: Loading skeleton component

**Features**:
- Animated pulse effect
- Uses `cn` helper for className merging
- Reusable for any loading state
- Matches ticket card structure

#### `dialog`

**Type**: Client Component  
**Purpose**: Radix UI Dialog primitives

**Features**:
- Dialog, DialogContent, DialogHeader, etc.
- Accessible dialog implementation
- Customizable styling
- Used by `CreateTicketsModal`

## Helper Functions

### `helpers/cn.ts`

**Purpose**: Utility for merging Tailwind CSS classes

**Implementation**:
- Uses `clsx` for conditional classes
- Uses `twMerge` to resolve Tailwind conflicts
- Ensures proper class precedence

**Usage**: Used throughout components for className management

### `helpers/buttonVariants.ts`

**Purpose**: Defines button style variants using CVA

**Implementation**:
- Uses `class-variance-authority` (CVA)
- Defines base styles and variants
- Type-safe variant system

**Variants**:
- `variant`: action, submit, danger, outline
- `size`: sm, md, lg

**Why It's Important**:
- Centralized button styling
- Type-safe variant system
- Consistent design system
- Easy to extend

### `helpers/navLinkVariants.ts`

**Purpose**: Defines navigation link style variants

**Implementation**:
- Uses CVA like button variants
- `active` variant (true/false)
- Focus-visible styles for accessibility

**Why It's Important**:
- Consistent navigation styling
- Active state management
- Accessible focus styles

### `lib/manageTicketsFunctions.ts`

**Purpose**: Utility functions for ticket calculations

**Functions**:
1. **`getTotalTickets(tickets)`**: Returns count of all tickets
2. **`getCompletedTickets(tickets)`**: Returns count of completed tickets
3. **`getIncompleteTickets(tickets)`**: Returns count of incomplete tickets

**Usage**: Used by `TicketsHeader` for statistics display

## Validation: Zod + React Hook Form

The application uses **Zod** for schema validation and type inference, with server-side validation in API routes.

### Zod Schema (`schema/ticketSchema.ts`)

**Purpose**: Defines ticket creation validation rules

**Schema**:
```typescript
z.object({
  fullname: z.string().min(1),
  telephone: z.string().min(5),
  brand: z.string().min(1),
  comment: z.string().min(1),
})
```

**Validation Rules**:
- `fullname`: Non-empty string
- `telephone`: Minimum 5 characters
- `brand`: Non-empty string
- `comment`: Non-empty string

### Server-Side Validation

**Location**: `app/api/tickets/route.ts` (POST handler)

**Process**:
1. Receive request body
2. Parse JSON
3. Validate with `createTicketSchema.safeParse()`
4. If invalid, return 400 with error details
5. If valid, proceed with ticket creation

**Implementation**:
```typescript
const parsed = createTicketSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { error: parsed.error.flatten() },
    { status: 400 }
  );
}
```

**Why It's Important**:
- Prevents invalid data from reaching database
- Provides detailed validation errors
- Type-safe validation
- Single source of truth for validation rules

### Type Inference

**Location**: `types/formTypes.ts`

**Purpose**: Derives TypeScript types from Zod schema

**Implementation**:
```typescript
export type CreateTicketInput = z.infer<typeof createTicketSchema>
```

**Benefits**:
- Types automatically match validation schema
- Single source of truth for types and validation
- TypeScript type safety

### Client-Side Validation

**Current Implementation**: Native HTML5 validation (`required` attributes)

**Future Enhancement**: Could integrate React Hook Form with Zod resolver:
- Use `@hookform/resolvers/zod`
- Integrate with `useCreateTicketForm` hook
- Provide real-time validation feedback
- Better error message display

**Note**: The application currently uses native HTML validation for simplicity. The `@hookform/resolvers` package is installed and ready for future enhancement.

## Data Flow

### Creating a Ticket

1. **User Action**: User fills form in `ModalCardForm` and submits
2. **Form Handler**: `useCreateTicketForm` hook extracts FormData
3. **Mutation**: `useCreateTicket` hook calls `createTicket()` API function
4. **HTTP Request**: POST request to `/api/tickets` with JSON body
5. **API Route**: `app/api/tickets/route.ts` POST handler:
   - Validates request body with Zod schema
   - Calls `createTicket()` from database model
   - Returns created ticket (201 status)
6. **Database**: `tickets.model.createTicket()` inserts into SQLite
7. **Cache Invalidation**: React Query invalidates 'tickets' query
8. **Auto Refetch**: `useFetchTickets` automatically refetches data
9. **UI Update**: Ticket list updates with new ticket
10. **Modal Close**: Form success callback closes modal

### Fetching Tickets

1. **Component Render**: `TicketList` component renders
2. **Hook Call**: `useFetchTickets()` hook executes
3. **Cache Check**: React Query checks cache for 'tickets' data
4. **Cache Miss**: If no cache, calls `getTickets()` API function
5. **HTTP Request**: GET request to `/api/tickets`
6. **API Route**: `app/api/tickets/route.ts` GET handler:
   - Calls `getAllTickets()` from database model
   - Returns tickets array (200 status)
7. **Database**: `tickets.model.getAllTickets()` executes SQL query
8. **Cache Storage**: React Query stores result in cache
9. **Component Update**: `TicketList` receives data and renders tickets
10. **Subsequent Renders**: Data served from cache (no HTTP request)

### Updating Ticket Status

1. **User Action**: User clicks "Mark as completed" in `TicketCard`
2. **Handler**: `handleComplete()` calls `updateStatus.mutate()`
3. **Mutation**: `useUpdateTicketStatus` hook calls `updateTicketStatus()` API function
4. **HTTP Request**: PATCH request to `/api/tickets/[id]` with status in body
5. **API Route**: `app/api/tickets/[id]/route.ts` PATCH handler:
   - Validates status value
   - Calls `updateTicketStatus()` from database model
   - Returns updated ticket
6. **Database**: `tickets.model.updateTicketStatus()` executes UPDATE SQL
7. **Cache Invalidation**: React Query invalidates 'tickets' query
8. **Auto Refetch**: Ticket list refetches with updated data
9. **UI Update**: Button disappears (conditional rendering)

### Deleting a Ticket

1. **User Action**: User clicks delete button in `TicketCard`
2. **Handler**: `handleDelete()` calls `deleteTicket.mutate()`
3. **Mutation**: `useDeleteTicket` hook calls `deleteTicket()` API function
4. **HTTP Request**: DELETE request to `/api/tickets/[id]`
5. **API Route**: `app/api/tickets/[id]/route.ts` DELETE handler:
   - Calls `deleteTicket()` from database model
   - Returns 204 No Content
6. **Database**: `tickets.model.deleteTicket()` executes DELETE SQL
7. **Cache Invalidation**: React Query invalidates 'tickets' query
8. **Auto Refetch**: Ticket list refetches
9. **UI Update**: Ticket card disappears from list

### Server-Side Rendering (Ticket Detail Page)

1. **Navigation**: User navigates to `/tickets/[id]`
2. **Server Component**: `app/tickets/[id]/page.tsx` executes on server
3. **Data Fetching**: Calls `getTicket(id)` API function (server-side)
4. **HTTP Request**: GET request to `/api/tickets/[id]` (internal)
5. **API Route**: Returns ticket data
6. **Database**: Fetches from SQLite
7. **HTML Generation**: Server renders HTML with ticket data
8. **Response**: Pre-rendered HTML sent to client
9. **Hydration**: React hydrates the page on client

**Benefits**:
- SEO-friendly (content 