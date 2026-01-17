# Ticketify

A modern, full-stack ticket management application built with Next.js 16 App Router, TypeScript, SQLite, and React Query. This application demonstrates server-side rendering, API routes, client-side state management, and comprehensive validation using Zod and React Hook Form.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Next.js App Router Architecture](#nextjs-app-router-architecture)
  - [Route Structure](#route-structure)
  - [Special Files in Routes](#special-files-in-routes)
  - [API Routes Structure](#api-routes-structure)
- [Database Layer](#database-layer)
  - [Database Connection (`db.ts`)](#database-connection-dbts)
  - [Database Initialization (`db.init.ts`)](#database-initialization-dbinitts)
  - [Database Models (`tickets.model.ts`)](#database-models-ticketsmodelts)
  - [Database Seeding (`seed.ts`)](#database-seeding-seedts)
  - [Database Schema](#database-schema)
- [API Client Layer](#api-client-layer)
- [Custom Hooks](#custom-hooks)
  - [Query Hooks](#query-hooks)
  - [Mutation Hooks](#mutation-hooks)
  - [Form Hook](#form-hook)
- [Components](#components)
  - [Layout Components](#layout-components)
  - [UI Components](#ui-components)
- [Helper Functions](#helper-functions)
- [Validation: Zod + React Hook Form](#validation-zod--react-hook-form)
  - [Zod Schema Definition](#zod-schema-definition)
  - [Server-Side Validation](#server-side-validation)
  - [Type Inference](#type-inference)
  - [Client-Side Validation (Current Implementation)](#client-side-validation-current-implementation)
- [Data Flow: Storage and Fetching](#data-flow-storage-and-fetching)
  - [Server-Side Data Flow](#server-side-data-flow)
  - [Client-Side Data Flow with React Query](#client-side-data-flow-with-react-query)
  - [Complete Data Flow Examples](#complete-data-flow-examples)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

## Overview

Ticketify is a full-stack application that allows users to create, view, update, and delete support tickets. The application follows Next.js 16 App Router conventions, implements server-side rendering for optimal performance and SEO, and uses React Query (TanStack Query) for efficient client-side data management with automatic caching and synchronization.

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript 5
- **Database**: SQLite with `better-sqlite3` (synchronous, high-performance)
- **State Management**: TanStack React Query v5 (server state)
- **Validation**: Zod (schema validation) + React Hook Form (form management)
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (Dialog primitives)
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React, React Icons
- **Utilities**: class-variance-authority (CVA), clsx, tailwind-merge

## Project Structure

```
ticketify/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                     # API Routes (Server-side)
│   │   │   └── tickets/
│   │   │       ├── route.ts         # GET (all) & POST endpoints
│   │   │       └── [id]/
│   │   │           └── route.ts    # GET, PATCH, DELETE endpoints
│   │   ├── tickets/                 # Tickets page route
│   │   │   ├── page.tsx            # Tickets list page (Server Component)
│   │   │   ├── loading.tsx         # Suspense fallback (automatic)
│   │   │   ├── error.tsx           # Error boundary (automatic)
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Ticket detail page (Server Component)
│   │   ├── layout.tsx              # Root layout (Server Component)
│   │   ├── page.tsx                # Homepage (Server Component)
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── layouts/                # Layout components
│   │   │   ├── MainHeader.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── TicketsHeader.tsx
│   │   │   ├── TicketList.tsx
│   │   │   ├── QueryProvider.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ManageTicketLayout.tsx
│   │   └── ui/                     # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── TicketCard.tsx
│   │       ├── CreateTicketsModal.tsx
│   │       ├── ModalCardForm.tsx
│   │       ├── skeleton.tsx
│   │       └── dialog.tsx
│   ├── custom hooks/                # React Query hooks
│   │   ├── useFetchTickets.tsx
│   │   ├── useCreateTicket.tsx
│   │   ├── useDeleteTicket.tsx
│   │   ├── useUpdateTicketStatus.tsx
│   │   └── useHookForm.tsx
│   ├── database/                    # Database layer
│   │   ├── db.ts                   # Database connection
│   │   ├── db.init.ts              # Schema initialization
│   │   ├── tickets.model.ts        # Data access layer
│   │   └── seed.ts                 # Seed data
│   ├── lib/
│   │   ├── api/
│   │   │   └── handleTickets.ts   # API client functions
│   │   └── manageTicketsFunctions.ts
│   ├── helpers/                     # Utility functions
│   │   ├── cn.ts                   # className merger
│   │   ├── buttonVariants.ts       # Button style variants
│   │   └── navLinkVariants.ts      # Nav link style variants
│   ├── schema/                      # Zod schemas
│   │   └── ticketSchema.ts
│   └── types/                       # TypeScript types
│       ├── ticket.ts
│       ├── formTypes.ts
│       ├── customTypes.ts
│       └── modalTypes.ts
└── tickets.db                       # SQLite database file
```

## Next.js App Router Architecture

The application uses Next.js 16 App Router, which provides a file-system based routing system with support for layouts, loading states, error boundaries, and server components by default.

### Route Structure

#### `/` - Homepage (`app/page.tsx`)

**Type**: Server Component  
**Purpose**: Landing page with navigation to tickets list

**Key Features**:
- Static server component with SEO metadata
- Provides welcoming interface and link to tickets page
- No data fetching, pure static content
- Server-rendered for optimal performance

**Metadata**: Defined with Next.js `metadata` export for SEO

#### `/tickets` - Tickets List (`app/tickets/page.tsx`)

**Type**: Server Component with Suspense Boundary  
**Purpose**: Displays all tickets in a responsive grid layout

**Implementation**:
```typescript
export default function TicketsPage() {
  return (
    <>
      <TicketsHeader />
      <section className="grid md:grid-cols-2 gap-y-8 gap-x-7 mb-7">
        <Suspense fallback={<TicketsLoading />}>
          <TicketList />
        </Suspense>
      </section>
    </>
  )
}
```

**Key Features**:
- Uses React `Suspense` boundary for loading state
- Imports `TicketsLoading` component as fallback
- Renders `TicketList` client component inside Suspense
- Includes `TicketsHeader` for statistics and actions
- Server component wrapper ensures SEO-friendly HTML structure

**Why Suspense?**: 
- Allows server to stream HTML while client component loads
- Provides better UX with loading states
- Enables progressive rendering

#### `/tickets/[id]` - Ticket Detail (`app/tickets/[id]/page.tsx`)

**Type**: Server Component (Dynamic Route)  
**Purpose**: Displays detailed view of a single ticket

**Key Features**:
- Dynamic route using `[id]` parameter
- Async server component that fetches ticket data on the server
- Uses Next.js `notFound()` function for invalid/missing tickets
- Server-side data fetching with `getTicket()` API client function
- Pre-rendered HTML for SEO and performance

**Route Parameter Handling**:
```typescript
interface TicketDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = await params  // Next.js 15+ requires awaiting params
  const ticketId = Number(id)
  // ... validation and data fetching
}
```

**Error Handling**:
- Validates ID parameter (checks if NaN)
- Calls `notFound()` if ticket doesn't exist
- Server-side error handling prevents invalid routes from rendering

**Benefits of Server Component**:
- Data fetched on server before HTML is sent
- SEO-friendly (content in HTML)
- Faster initial page load
- Reduced client-side JavaScript

#### Root Layout (`app/layout.tsx`)

**Type**: Server Component  
**Purpose**: Wraps all pages with shared layout structure

**Responsibilities**:
- Defines HTML structure (`<html>`, `<body>`)
- Provides global metadata (title, description)
- Configures fonts (Geist Sans, Geist Mono) via Next.js font optimization
- Wraps application with `QueryProvider` for React Query context
- Includes `MainHeader` and `Footer` on all pages
- Sets global CSS classes and theme
- Provides `children` slot for page content

**Key Features**:
- Single layout for entire application
- Server-rendered for performance
- Client components can be nested inside (QueryProvider, Header, Footer)

### Special Files in Routes

Next.js App Router recognizes special files that provide automatic functionality:

#### `loading.tsx` - Automatic Loading UI

**Location**: `app/tickets/loading.tsx`  
**Type**: React Component  
**Purpose**: Automatic loading fallback for Suspense boundaries

**How It Works**:
- Next.js automatically renders this component when the route segment is loading
- Used by `<Suspense>` boundaries in the route
- Provides skeleton UI matching the ticket card structure
- Exported as default component

**Implementation**:
- Uses `Skeleton` component from `@/components/ui/skeleton`
- Matches the structure of `TicketCard` for seamless UX
- Displays animated skeleton placeholders

**Why It's Important**:
- Better UX than blank screens
- Consistent loading states
- Automatic integration with Suspense
- Server-side streaming support

#### `error.tsx` - Error Boundary

**Location**: `app/tickets/error.tsx`  
**Type**: Client Component (required for error boundaries)  
**Purpose**: Catches and handles errors in the route segment

**How It Works**:
- Next.js automatically renders this component when an error occurs
- Catches errors from server components, client components, and data fetching
- Receives `error` and `reset` props automatically
- Must be a client component (`'use client'`)

**Props**:
```typescript
interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
```

**Implementation**:
- Displays user-friendly error message
- Provides "Try again" button that calls `reset()`
- Uses Button component with `danger` variant
- Accessible error handling

**Why It's Important**:
- Prevents entire app from crashing
- User-friendly error messages
- Recovery mechanism with reset function
- Automatic error catching

### API Routes Structure

API routes are located in `app/api/` directory and handle server-side logic and database operations. They run only on the server and never ship to the client.

#### `/api/tickets` (`app/api/tickets/route.ts`)

**Type**: Route Handler  
**Methods**: GET, POST

**GET Handler** (`export async function GET()`):
- **Purpose**: Fetches all tickets from database
- **Process**:
  1. Calls `getAllTickets()` from database model
  2. Returns JSON array of tickets
  3. Handles errors with try-catch
  4. Returns 500 status on error
  5. Returns 200 status with data on success

**POST Handler** (`export async function POST(req: Request)`):
- **Purpose**: Creates a new ticket
- **Process**:
  1. Parses request body as JSON
  2. Validates request body with Zod schema (`createTicketSchema.safeParse()`)
  3. If validation fails: returns 400 with error details
  4. If validation succeeds: calls `createTicket()` from database model
  5. Sets default status to `'incomplete'`
  6. Returns created ticket with 201 status
  7. Handles errors with 500 status

**Why Separate from Database**:
- API routes handle HTTP concerns (request/response, status codes)
- Database models handle data access only
- Separation of concerns
- Testable independently

#### `/api/tickets/[id]` (`app/api/tickets/[id]/route.ts`)

**Type**: Dynamic Route Handler  
**Methods**: GET, PATCH, DELETE

**GET Handler** (`export async function GET(_req: Request, context: { params: Promise<{ id: string }> })`):
- **Purpose**: Fetches a single ticket by ID
- **Process**:
  1. Extracts `id` from route params (must await in Next.js 15+)
  2. Converts string ID to number
  3. Validates ID (checks if NaN)
  4. Calls `getTicketById()` from database model
  5. Returns 404 if ticket not found
  6. Returns ticket JSON with 200 status on success

**PATCH Handler** (`export async function PATCH(req: Request, context: { params: Promise<{ id: string }> })`):
- **Purpose**: Updates ticket status
- **Process**:
  1. Extracts and validates ID parameter
  2. Parses request body (expects `{ status: 'completed' | 'incomplete' }`)
  3. Validates status value (must be 'completed' or 'incomplete')
  4. Returns 400 if status is invalid
  5. Calls `updateTicketStatus()` from database model
  6. Returns updated ticket with 200 status
  7. Handles errors with 500 status

**DELETE Handler** (`export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> })`):
- **Purpose**: Deletes a ticket
- **Process**:
  1. Extracts and validates ID parameter
  2. Calls `deleteTicket()` from database model
  3. Returns 204 No Content on success
  4. Returns 400 if ID is invalid
  5. Handles errors with 500 status

**Why Dynamic Routes**:
- RESTful API design
- Resource-based routing
- Clean URL structure (`/api/tickets/1` instead of `/api/tickets?id=1`)
- Type-safe route parameters

## Database Layer

The database layer uses SQLite with `better-sqlite3`, which provides synchronous, high-performance database operations. The database layer is carefully structured with clear separation of concerns.

### Database Connection (`db.ts`)

**Location**: `src/database/db.ts`  
**Purpose**: Creates and configures the database connection

**Implementation**:
```typescript
import sqlite3 from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'tickets.db');
const db = sqlite3(dbPath);
db.pragma('journal_mode = WAL');

export default db;
```

**Key Features**:
- **Singleton Pattern**: Single database instance exported
- **Path Resolution**: Uses `process.cwd()` to get project root
- **WAL Mode**: Write-Ahead Logging enabled for better concurrency
- **Synchronous API**: `better-sqlite3` provides synchronous operations (faster, simpler)

**Why It's Important**:
- **Single Connection**: Prevents multiple database instances
- **WAL Mode Benefits**: 
  - Allows concurrent reads and writes
  - Better performance for web applications
  - Prevents database locking issues
- **Centralized Configuration**: All database settings in one place
- **Type Safety**: TypeScript ensures proper usage

**How It Works**:
- When imported, creates database connection immediately
- Node.js module system ensures singleton (imported once, cached)
- Database file created automatically if it doesn't exist
- WAL mode enables multiple readers and one writer simultaneously

### Database Initialization (`db.init.ts`)

**Location**: `src/database/db.init.ts`  
**Purpose**: Creates database schema (tables structure)

**Implementation**:
```typescript
import db from './db'

db.prepare(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        telephone TEXT NOT NULL UNIQUE,
        brand  TEXT NOT NULL,
        status TEXT NOT NULL,
        comment TEXT NOT NULL
    )
`).run();

console.log('✅ Database initialized')
```

**Key Features**:
- **Idempotent**: Safe to run multiple times (`CREATE TABLE IF NOT EXISTS`)
- **Schema Definition**: Defines table structure explicitly
- **Constraints**: 
  - `NOT NULL` ensures required fields
  - `UNIQUE` on telephone prevents duplicates
  - `PRIMARY KEY AUTOINCREMENT` for auto-incrementing IDs

**Usage**:
```bash
npm run db:init
```

**Why It's Important**:
- **Separation of Concerns**: Schema separate from application code
- **Version Control**: Schema changes tracked in git
- **Initialization Script**: Can initialize database without running app
- **Consistency**: Ensures database structure is always correct
- **Migration Strategy**: Foundation for future database migrations

**How It Works**:
- Uses `db.prepare()` to create prepared statement (pre-compiled SQL)
- `.run()` executes the statement
- `IF NOT EXISTS` prevents errors if table already exists
- Runs synchronously (blocking operation, acceptable for initialization)

### Database Models (`tickets.model.ts`)

**Location**: `src/database/tickets.model.ts`  
**Purpose**: Data Access Layer (DAL) - all database operations

**Why Separate from API Routes**:
- **Separation of Concerns**: Database logic separate from HTTP logic
- **Reusability**: Can be used by API routes, server components, or scripts
- **Testability**: Easier to test database operations independently
- **Single Source of Truth**: All SQL queries in one place
- **Type Safety**: TypeScript ensures correct data types

**Functions**:

1. **`getAllTickets()`**: `Ticket[]`
   - **SQL**: `SELECT * FROM tickets`
   - **Returns**: Array of all tickets
   - **Used By**: GET `/api/tickets`
   - **Process**:
     - Prepares SQL statement
     - Executes query
     - Type casts result to `Ticket[]`
     - Returns array (empty if no tickets)

2. **`getTicketById(id: number)`**: `Ticket | undefined`
   - **SQL**: `SELECT * FROM tickets WHERE id = ?`
   - **Returns**: Single ticket or undefined
   - **Used By**: GET `/api/tickets/[id]`
   - **Process**:
     - Uses parameterized query (prevents SQL injection)
     - Executes query with ID parameter
     - Returns undefined if not found (handled by API route)
     - Type casts to Ticket

3. **`createTicket(data: Omit<Ticket, 'id'>)`**: `Ticket`
   - **SQL**: `INSERT INTO tickets (fullname, telephone, brand, status, comment) VALUES (@fullname, @telephone, @brand, @status, @comment)`
   - **Returns**: Created ticket with generated ID
   - **Used By**: POST `/api/tickets`
   - **Process**:
     - Uses named parameters (`@fullname`, etc.)
     - Executes INSERT statement
     - Gets `lastInsertRowid` from result
     - Constructs and returns ticket object with ID
     - Type-safe with TypeScript

4. **`updateTicketStatus(id: number, status: 'completed' | 'incomplete')`**: `Ticket`
   - **SQL**: `UPDATE tickets SET status = ? WHERE id = ?`
   - **Returns**: Updated ticket
   - **Used By**: PATCH `/api/tickets/[id]`
   - **Process**:
     - Uses parameterized query with positional parameters
     - Executes UPDATE statement
     - Fetches updated ticket to verify it exists
     - Throws error if ticket not found (data integrity check)
     - Returns updated ticket

5. **`deleteTicket(id: number)`**: `void`
   - **SQL**: `DELETE FROM tickets WHERE id = ?`
   - **Returns**: Nothing
   - **Used By**: DELETE `/api/tickets/[id]`
   - **Process**:
     - Uses parameterized query
     - Executes DELETE statement
     - No return value (204 No Content in HTTP)

**Why Parameterized Queries**:
- **SQL Injection Prevention**: User input never directly in SQL
- **Performance**: Prepared statements are pre-compiled
- **Safety**: Database handles escaping automatically

**Type Safety**:
- All functions use TypeScript types
- Input types validated at compile time
- Return types ensure consistency
- `Omit<Ticket, 'id'>` ensures ID is not in create data

### Database Seeding (`seed.ts`)

**Location**: `src/database/seed.ts`  
**Purpose**: Populates database with initial sample data

**Implementation**:
```typescript
const count = (db.prepare(`SELECT COUNT(*) as c FROM tickets`).get() as { c: number }).c

if (count === 0) {
  const stmt = db.prepare(`
    INSERT INTO tickets (fullname, telephone, brand, status, comment)
    VALUES (@fullname, @telephone, @brand, @status, @comment)
  `)
  
  for (const ticket of ticketsList) {
    stmt.run(ticket)
  }
  
  console.log('✅ Seed iniziale completato')
}
```

**Key Features**:
- **Idempotent**: Only runs if database is empty
- **Sample Data**: Provides realistic test data
- **Development Tool**: Helps with development and testing
- **Demonstrates Structure**: Shows expected data format

**Why It's Important**:
- **Development**: Provides data without manual entry
- **Testing**: Consistent test data
- **Documentation**: Shows expected data structure
- **Demonstration**: Shows app functionality immediately

**How It Works**:
- Checks ticket count in database
- If empty, inserts sample tickets
- Uses prepared statement for efficiency
- Loops through sample data array

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

**Field Descriptions**:
- **id**: Auto-incrementing primary key (unique identifier)
- **fullname**: Customer's full name (required)
- **telephone**: Customer's phone number (required, unique)
- **brand**: Vehicle/brand name (required)
- **status**: Ticket status - 'completed' or 'incomplete' (required)
- **comment**: Problem description (required)

**Constraints**:
- All fields are `NOT NULL` (required)
- `telephone` is `UNIQUE` (prevents duplicate entries)
- `id` is `PRIMARY KEY` (unique, indexed, auto-increment)

## API Client Layer

**Location**: `src/lib/api/handleTickets.ts`  
**Purpose**: Client-side functions for making API requests

**Why Separate Layer**:
- **Abstraction**: Hides HTTP implementation details
- **Reusability**: Used by hooks, components, server components
- **Type Safety**: TypeScript ensures correct request/response types
- **Centralized**: All API endpoints in one place
- **Error Handling**: Consistent error handling

**Configuration**:
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api'
```
- Uses environment variable for base URL (flexibility)
- Defaults to `/api` (relative URL works in Next.js)

**Functions**:

1. **`getTickets()`**: `Promise<Ticket[]>`
   - **Method**: GET
   - **Endpoint**: `/api/tickets`
   - **Returns**: Array of tickets
   - **Error**: Throws if request fails

2. **`getTicket(id: number)`**: `Promise<Ticket>`
   - **Method**: GET
   - **Endpoint**: `/api/tickets/${id}`
   - **Returns**: Single ticket
   - **Used By**: Server components (server-side fetching)

3. **`createTicket(data)`**: `Promise<Ticket>`
   - **Method**: POST
   - **Endpoint**: `/api/tickets`
   - **Body**: JSON with ticket data
   - **Headers**: `Content-Type: application/json`
   - **Returns**: Created ticket with ID

4. **`updateTicketStatus(id, status)`**: `Promise<Ticket>`
   - **Method**: PATCH
   - **Endpoint**: `/api/tickets/${id}`
   - **Body**: `{ status: 'completed' | 'incomplete' }`
   - **Returns**: Updated ticket

5. **`deleteTicket(id)`**: `Promise<void>`
   - **Method**: DELETE
   - **Endpoint**: `/api/tickets/${id}`
   - **Returns**: Nothing (204 No Content)

**Why These Functions**:
- **Type Safety**: TypeScript ensures correct data types
- **Consistency**: All requests follow same pattern
- **Error Handling**: Throws errors consistently
- **Future-Proof**: Easy to add authentication, retries, etc.

## Custom Hooks

Custom hooks encapsulate React Query logic and provide clean, reusable interfaces for components. They follow React Query patterns for queries (data fetching) and mutations (data modification).

### Query Hooks

#### `useFetchTickets`

**Location**: `src/custom hooks/useFetchTickets.tsx`  
**Type**: Query Hook  
**Purpose**: Fetches all tickets with automatic caching

**Implementation**:
```typescript
export function useFetchTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  })
}
```

**Returns**:
- `data`: `Ticket[] | undefined` - Array of tickets (undefined while loading)
- `isLoading`: `boolean` - True while initial fetch is in progress
- `error`: `Error | null` - Error object if fetch failed
- `refetch`: `function` - Manual refetch function
- `isFetching`: `boolean` - True during any fetch (including refetch)

**React Query Features**:
- **Automatic Caching**: Data cached by query key `['tickets']`
- **Automatic Refetching**: Refetches on window focus (default behavior)
- **Background Updates**: Can update cache in background
- **Deduplication**: Multiple components using this hook share same request

**Usage**:
- Used by `TicketList` component to display tickets
- Used by `TicketsHeader` to calculate statistics
- Cache shared between components (single source of truth)

**Why It's Important**:
- Eliminates manual cache management
- Provides loading and error states automatically
- Reduces unnecessary network requests
- Simplifies component code

### Mutation Hooks

Mutation hooks handle data modifications (create, update, delete) and automatically invalidate related queries to trigger refetches.

#### `useCreateTicket`

**Location**: `src/custom hooks/useCreateTicket.tsx`  
**Type**: Mutation Hook  
**Purpose**: Creates a new ticket

**Implementation**:
```typescript
export function useCreateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    },
  })
}
```

**Returns**:
- `mutate`: `function` - Fire-and-forget mutation
- `mutateAsync`: `Promise` function - Returns promise
- `isPending`: `boolean` - True while mutation is in progress
- `error`: `Error | null` - Error if mutation failed
- `data`: `Ticket | undefined` - Created ticket on success

**Key Feature**: `invalidateQueries` on success
- Invalidates `['tickets']` query cache
- Triggers automatic refetch of `useFetchTickets`
- UI updates automatically with new ticket

**Usage**: Used by `useCreateTicketForm` hook

#### `useDeleteTicket`

**Location**: `src/custom hooks/useDeleteTicket.tsx`  
**Type**: Mutation Hook  
**Purpose**: Deletes a ticket

**Implementation**: Same pattern as `useCreateTicket`
- Uses `deleteTicket` API function
- Invalidates `['tickets']` query on success
- Automatically refetches ticket list

**Usage**: Used by `TicketCard` component

#### `useUpdateTicketStatus`

**Location**: `src/custom hooks/useUpdateTicketStatus.tsx`  
**Type**: Mutation Hook  
**Purpose**: Updates ticket status

**Implementation**:
```typescript
export function useUpdateTicketStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'completed' | 'incomplete' }) =>
      updateTicketStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
    },
  })
}
```

**Parameters**: Object with `id` and `status`
- Allows multiple parameters in mutation function
- Type-safe with TypeScript

**Usage**: Used by `TicketCard` component to mark tickets as completed

**Why Object Parameter**:
- Cleaner than multiple parameters
- Easy to extend with more fields
- Type-safe with TypeScript interfaces

### Form Hook

#### `useCreateTicketForm`

**Location**: `src/custom hooks/useHookForm.tsx`  
**Type**: Custom Form Hook  
**Purpose**: Manages form submission logic for ticket creation

**Implementation**:
```typescript
export function useCreateTicketForm(options?: UseCreateTicketFormOptions) {
  const createTicket = useCreateTicket()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      fullname: formData.get('fullname') as string,
      telephone: formData.get('telephone') as string,
      brand: formData.get('brand') as string,
      comment: formData.get('comment') as string,
    }

    try {
      await createTicket.mutateAsync(data)
      e.currentTarget.reset()
      options?.onSuccess?.()
    } catch (error) {
      console.error('Error creating ticket:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
  }
}
```

**Features**:
- Uses `useCreateTicket` mutation hook
- Manages `isSubmitting` state manually
- Extracts form data from FormData
- Handles form reset on success
- Calls optional `onSuccess` callback
- Error handling with try-catch

**Returns**:
- `handleSubmit`: Async form submission handler
- `isSubmitting`: Boolean loading state

**Usage**: Used by `ModalCardForm` component

**Future Enhancement**: Could integrate React Hook Form for:
- Better validation
- Form state management
- Error handling
- Type-safe form values

## Components

### Layout Components (`components/layouts/`)

#### `MainHeader`

**Type**: Server Component  
**Purpose**: Global navigation header

**Features**:
- Logo and brand name (Link to homepage)
- Navigation component (client component)
- Accessible markup with ARIA labels
- Server-rendered for performance

**Why Server Component**:
- Static content (no interactivity)
- Better performance (no JavaScript needed)
- SEO-friendly (content in HTML)

#### `Navigation`

**Type**: Client Component (`'use client'`)  
**Purpose**: Active route-aware navigation

**Why Client Component**:
- Uses `usePathname()` hook (client-side only)
- Needs to detect current route for active state

**Implementation**:
- Uses `usePathname()` from `next/navigation`
- Compares pathname to link hrefs
- Applies `active` class when route matches
- Uses `navLinkVariants` for styling
- Sets `aria-current="page"` for accessibility

**Links**: Home (`/`), Tickets (`/tickets`)

#### `TicketsHeader`

**Type**: Client Component  
**Purpose**: Tickets page header with statistics and actions

**Features**:
- Displays ticket statistics (total, completed, incomplete)
- Create ticket button (opens modal)
- Uses `useFetchTickets` hook for data
- Calculates stats with helper functions from `lib/manageTicketsFunctions.ts`
- Shows loading state (`...`) while data loads

**Statistics**:
- Total tickets count
- Completed tickets count
- Incomplete tickets count

#### `TicketList`

**Type**: Client Component  
**Purpose**: Renders list of ticket cards in grid layout

**Implementation**:
```typescript
function TicketList() {
  const { data, isLoading, error } = useFetchTickets();

  if (isLoading) return <TicketsLoading />
  if (error) return <ErrorDisplay />
  if (!data || data.length === 0) return <EmptyState />
  
  return (
    <>
      {data.map((ticket: Ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </>
  )
}
```

**Features**:
- Uses `useFetchTickets` hook
- Handles loading state (shows skeleton)
- Handles error state (shows error message)
- Handles empty state (shows message)
- Maps tickets to `TicketCard` components
- Each card has unique key (ticket.id)

**Why Client Component**:
- Uses React Query hooks (client-side only)
- Needs interactivity (hover effects, buttons)

#### `QueryProvider`

**Type**: Client Component  
**Purpose**: React Query context provider

**Implementation**:
```typescript
export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

**Key Features**:
- **Singleton Pattern**: Uses `useState` with function initializer
- Ensures single QueryClient instance
- Prevents recreation on re-renders
- Wraps entire app in root layout

**Why It's Important**:
- Required for React Query to work
- Provides query cache and default options
- Single source of truth for query state

#### `Footer`

**Type**: Server Component  
**Purpose**: Global footer with links

**Features**:
- Footer navigation links (Privacy, Terms, Contacts)
- Accessible markup
- Server-rendered
- Responsive design

#### `ManageTicketLayout`

**Type**: Client Component  
**Purpose**: Wrapper component for ticket action buttons

**Note**: Currently used in some places but could be replaced with direct Button usage for consistency. Kept for backward compatibility.

### UI Components (`components/ui/`)

#### `Button`

**Type**: Client Component  
**Purpose**: Reusable button component with variant system

**Implementation**:
```typescript
function Button({ children, onClick, className, variant, size, ...props }: ButtonProps) {
  return (
    <button 
      className={cn(buttonVariants({ variant, size, className }))} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  )
}
```

**Features**:
- Uses `buttonVariants` for styling (CVA)
- Supports multiple variants (action, submit, danger, outline)
- Supports multiple sizes (sm, md, lg)
- Type-safe with TypeScript
- Accessible by default (semantic HTML)
- Merges className prop with variants

**Variants**:
- `action`: Primary actions (violet background)
- `submit`: Form submissions (darker violet)
- `danger`: Destructive actions (red background)
- `outline`: Secondary actions (transparent with border)

**Why Variant System**:
- Consistent design system
- Type-safe (TypeScript ensures valid variants)
- Easy to extend
- Centralized styling

#### `TicketCard`

**Type**: Client Component  
**Purpose**: Displays individual ticket information with actions

**Features**:
- Uses `motion` (Framer Motion) for animations
- Displays ticket details (id, fullname, telephone, brand, comment)
- Delete button (always visible)
- Mark as completed button (conditional - only for incomplete tickets)
- Uses `useDeleteTicket` and `useUpdateTicketStatus` hooks
- Accessible with ARIA labels
- Responsive design

**Conditional Rendering**:
```typescript
{!isCompleted && (
  <Button variant="outline" onClick={handleComplete}>
    <Check size={20} />
    <span>Mark as completed</span>
  </Button>
)}
```

**Why Client Component**:
- Uses hooks (useDeleteTicket, useUpdateTicketStatus)
- Needs interactivity (buttons, animations)
- Handles user interactions

#### `CreateTicketsModal`

**Type**: Client Component  
**Purpose**: Modal dialog wrapper for creating tickets

**Features**:
- Uses Radix UI Dialog primitives
- Controlled open/close state
- Contains `ModalCardForm` component
- Accessible dialog structure
- Backdrop and animations

**Props**:
- `open`: boolean (controlled state)
- `onOpenChange`: function (state setter)

#### `ModalCardForm`

**Type**: Client Component  
**Purpose**: Form for creating new tickets

**Features**:
- Uses `useCreateTicketForm` hook
- Native HTML form inputs (fullname, telephone, brand, comment)
- Required field validation (HTML5)
- Loading state on submit (disables button, shows "Creating...")
- Closes modal on success (via onSuccess callback)
- Accessible form structure with labels
- Focus management

**Fields**:
- `fullname`: Text input
- `telephone`: Tel input
- `brand`: Text input
- `comment`: Textarea

**Future Enhancement**: Could use React Hook Form for:
- Better validation
- Form state management
- Error messages
- Type-safe form handling

#### `skeleton`

**Type**: Component  
**Purpose**: Loading skeleton component

**Implementation**:
```typescript
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}
```

**Features**:
- Animated pulse effect (Tailwind CSS)
- Uses `cn` helper for className merging
- Reusable for any loading state
- Customizable with className prop

**Usage**: Used by `TicketsLoading` component

#### `dialog`

**Type**: Client Component  
**Purpose**: Radix UI Dialog primitives wrapper

**Features**:
- Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, etc.
- Accessible dialog implementation
- Customizable styling
- Used by `CreateTicketsModal`

**Why Radix UI**:
- Accessible by default (ARIA attributes)
- Unstyled (full styling control)
- Well-tested primitives

## Helper Functions

### `helpers/cn.ts`

**Purpose**: Utility for merging Tailwind CSS classes

**Implementation**:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**How It Works**:
1. `clsx`: Combines classes (handles conditionals, arrays, objects)
2. `twMerge`: Resolves Tailwind class conflicts (keeps last one)

**Why It's Important**:
- Prevents Tailwind class conflicts
- Handles conditional classes cleanly
- Used throughout application
- Industry standard pattern (shadcn/ui style)

**Example**:
```typescript
cn('text-red-500', isActive && 'text-blue-500') 
// If isActive: 'text-blue-500' (twMerge resolves conflict)
```

### `helpers/buttonVariants.ts`

**Purpose**: Defines button style variants using CVA (Class Variance Authority)

**Implementation**:
```typescript
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base styles
  'rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        action: 'bg-violet-500 hover:bg-violet-600 text-white flex justify-center items-center text-center gap-2',
        submit: 'bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:opacity-50 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white flex justify-center items-center text-center gap-2',
        outline: 'bg-transparent border-2 border-violet-400 text-zinc-200 hover:bg-violet-400/10 hover:text-violet-400 flex justify-center items-center gap-2'
      },
      size: {
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'action',
      size: 'md',
    },
  }
)
```

**Features**:
- Base styles applied to all buttons
- Variant system (action, submit, danger, outline)
- Size system (sm, md, lg)
- Type-safe with TypeScript
- Default variants

**Usage**:
```typescript
buttonVariants({ variant: 'danger', size: 'md' })
```

**Why CVA**:
- Type-safe variant system
- Centralized styling
- Easy to extend
- Industry standard (shadcn/ui pattern)

### `helpers/navLinkVariants.ts`

**Purpose**: Defines navigation link style variants

**Implementation**:
```typescript
export const navLinkVariants = cva(
  // Base styles
  'flex items-center justify-center px-4 py-2 rounded-md text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900',
  {
    variants: {
      active: {
        true: 'active text-violet-400 bg-violet-400/20 font-semibold',
        false: 'hover:text-violet-400 hover:bg-violet-400/10',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)
```

**Features**:
- Base styles for all navigation links
- Active state variant (true/false)
- Focus-visible styles for accessibility
- Hover styles for inactive state

**Usage**: Used by `Navigation` component

### `lib/manageTicketsFunctions.ts`

**Purpose**: Utility functions for ticket calculations

**Functions**:

1. **`getTotalTickets(tickets: Ticket[])`**: `number`
   - Returns total count of tickets
   - Simple array length

2. **`getCompletedTickets(tickets: Ticket[])`**: `number`
   - Filters tickets by status === 'completed'
   - Returns count

3. **`getIncompleteTickets(tickets: Ticket[])`**: `number`
   - Filters tickets by status === 'incomplete'
   - Returns count

**Usage**: Used by `TicketsHeader` for statistics display

**Why Pure Functions**:
- No side effects
- Easy to test
- Reusable
- Predictable

## Validation: Zod + React Hook Form

The application uses **Zod** for schema validation on the server-side and provides the foundation for client-side validation. While React Hook Form is installed, the current implementation uses native HTML5 validation for simplicity.

### Zod Schema Definition

**Location**: `src/schema/ticketSchema.ts`

**Implementation**:
```typescript
import { z } from 'zod';

export const createTicketSchema = z.object({
  fullname: z.string().min(1),
  telephone: z.string().min(5),
  brand: z.string().min(1),
  comment: z.string().min(1),
})
```

**Validation Rules**:
- `fullname`: Non-empty string (minimum 1 character)
- `telephone`: String with minimum 5 characters
- `brand`: Non-empty string (minimum 1 character)
- `comment`: Non-empty string (minimum 1 character)

**Why Zod**:
- Type-safe validation
- Runtime validation (catches errors at runtime)
- Type inference (generates TypeScript types)
- Great error messages
- Composable schemas

### Server-Side Validation

**Location**: `app/api/tickets/route.ts` (POST handler)

**Process**:
1. Receive request body (JSON)
2. Parse JSON
3. Validate with Zod schema using `safeParse()`
4. If invalid: return 400 with error details
5. If valid: proceed with ticket creation

**Implementation**:
```typescript
const parsed = createTicketSchema.safeParse(body);

if (!parsed.success) {
  return NextResponse.json(
    { error: parsed.error.flatten() },
    { status: 400 }
  );
}

// parsed.data is type-safe and validated
const newTicket = createTicket({
  ...parsed.data,
  status: 'incomplete',
});
```

**Why Server-Side Validation**:
- **Security**: Prevents invalid data from reaching database
- **Data Integrity**: Ensures database constraints are met
- **User Feedback**: Provides detailed validation errors
- **Single Source of Truth**: Zod schema defines validation rules
- **Type Safety**: `parsed.data` is type-safe (TypeScript knows it's valid)

**Error Format**:
- `safeParse()` returns `{ success: false, error: ZodError }`
- `error.flatten()` provides user-friendly error structure
- Errors returned as JSON with 400 status code

### Type Inference

**Location**: `src/types/formTypes.ts`

**Purpose**: Derives TypeScript types from Zod schema

**Implementation**:
```typescript
import { z } from 'zod'
import { createTicketSchema } from '@/schema/ticketSchema'

export type CreateTicketInput = z.infer<typeof createTicketSchema>
```

**Resulting Type**:
```typescript
type CreateTicketInput = {
  fullname: string
  telephone: string
  brand: string
  comment: string
}
```

**Benefits**:
- **Single Source of Truth**: Types automatically match validation schema
- **Automatic Updates**: Changing schema updates types automatically
- **Type Safety**: TypeScript ensures correct usage
- **No Duplication**: Don't need to define types separately

**Usage**: Used for type-safe form handling and API functions

### Client-Side Validation (Current Implementation)

**Current Approach**: Native HTML5 validation

**Location**: `components/ui/ModalCardForm.tsx`

**Implementation**:
- `required` attributes on inputs
- Browser handles validation
- Simple and works out of the box

**Limitations**:
- Basic validation only
- No custom error messages
- No real-time validation feedback
- Browser-dependent styling

**Future Enhancement**: React Hook Form + Zod Resolver

The application has `@hookform/resolvers` installed and ready for integration. Future enhancement could include:

```typescript
// Future implementation example
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTicketSchema } from '@/schema/ticketSchema'

const form = useForm({
  resolver: zodResolver(createTicketSchema),
})

// Benefits:
// - Real-time validation
// - Custom error messages
// - Type-safe form values
// - Better UX
```

**Why Not Yet Implemented**:
- Native validation is simpler
- Sufficient for current needs
- Can be enhanced later without breaking changes
- Package already installed for future use

## Data Flow: Storage and Fetching

Understanding how data flows through the application is crucial for debugging and extending the application. This section explains both server-side and client-side data flows in detail.

### Server-Side Data Flow

Server-side data flow occurs when Server Components fetch data directly from the database or API routes.

**Architecture**:
```
Server Component → API Client Function → API Route → Database Model → SQLite
```

**Example: Ticket Detail Page**

1. **User Navigation**: User navigates to `/tickets/1`
2. **Server Component Execution**: `app/tickets/[id]/page.tsx` runs on server
3. **API Client Call**: Calls `getTicket(id)` from `lib/api/handleTickets.ts`
4. **HTTP Request**: Makes GET request to `/api/tickets/1` (internal, server-to-server)
5. **API Route Handler**: `app/api/tickets/[id]/route.ts` GET handler executes
6. **Database Model Call**: Calls `getTicketById(id)` from `database/tickets.model.ts`
7. **SQL Execution**: Executes `SELECT * FROM tickets WHERE id = ?`
8. **Database Response**: Returns ticket data (or undefined)
9. **API Route Response**: Returns JSON with ticket (or 404)
10. **HTML Generation**: Server renders HTML with ticket data
11. **Response Sent**: Pre-rendered HTML sent to client
12. **Client Hydration**: React hydrates the page on client

**Benefits**:
- **SEO-Friendly**: Content in HTML (search engines can index)
- **Fast Initial Load**: HTML sent immediately (no JavaScript needed)
- **Reduced Client Bundle**: Less JavaScript shipped to client
- **Secure**: Database credentials never exposed to client

### Client-Side Data Flow with React Query

Client-side data flow uses React Query for caching, synchronization, and automatic refetching.

**Architecture**:
```
Client Component → Custom Hook → API Client Function → API Route → Database Model → SQLite
                                      ↓
                              React Query Cache
```

#### Query Flow (Data Fetching)

**Example: Fetching Tickets List**

1. **Component Render**: `TicketList` component renders
2. **Hook Call**: `useFetchTickets()` hook executes
3. **Cache Check**: React Query checks cache for `['tickets']` key
4. **Cache Hit**: If cached and fresh, returns cached data immediately
5. **Cache Miss/Stale**: If no cache or stale, calls `getTickets()` API function
6. **HTTP Request**: GET request to `/api/tickets`
7. **API Route**: Returns tickets JSON
8. **Cache Storage**: React Query stores result in cache with key `['tickets']`
9. **Component Update**: Component receives data and re-renders
10. **Subsequent Renders**: Data served from cache (no HTTP request)
11. **Background Refetch**: React Query refetches in background (default: on window focus)

**React Query Features Used**:
- **Automatic Caching**: Data cached by query key
- **Deduplication**: Multiple components share same request
- **Background Refetching**: Updates cache automatically
- **Stale-While-Revalidate**: Shows cached data while fetching fresh data

#### Mutation Flow (Data Modification)

**Example: Creating a Ticket**

1. **User Action**: User submits form in `ModalCardForm`
2. **Form Handler**: `useCreateTicketForm` hook extracts FormData
3. **Mutation Call**: Calls `createTicket.mutateAsync(data)`
4. **API Request**: POST request to `/api/tickets` with JSON body
5. **Server Validation**: API route validates with Zod schema
6. **Database Insert**: `createTicket()` inserts into SQLite
7. **Response**: Returns created ticket (201 status)
8. **Mutation Success**: `onSuccess` callback executes
9. **Cache Invalidation**: `queryClient.invalidateQueries({ queryKey: ['tickets'] })`
10. **Automatic Refetch**: `useFetchTickets` automatically refetches
11. **UI Update**: Ticket list updates with new ticket
12. **Modal Close**: Form success callback closes modal

**Why Cache Invalidation**:
- Ensures UI shows latest data
- Automatic synchronization
- No manual refetch needed
- Consistent state across components

**Mutation Optimistic Updates** (Future Enhancement):
- Could update cache immediately (optimistic)
- Rollback if mutation fails
- Better UX (instant feedback)

### Complete Data Flow Examples

#### Creating a Ticket (End-to-End)

```
1. User fills form → ModalCardForm component
2. Form submission → useCreateTicketForm.handleSubmit()
3. Extract data → FormData.get() for each field
4. Mutation hook → useCreateTicket.mutateAsync(data)
5. API client → createTicket(data) in handleTickets.ts
6. HTTP POST → /api/tickets with JSON body
7. API route → app/api/tickets/route.ts POST handler
8. Validation → createTicketSchema.safeParse(body)
9. If invalid → Return 400 with errors
10. If valid → database/tickets.model.ts createTicket()
11. SQL INSERT → INSERT INTO tickets VALUES (...)
12. Database → SQLite stores ticket, returns ID
13. Model returns → Ticket object with ID
14. API route → Returns 201 with ticket JSON
15. Mutation success → onSuccess callback
16. Cache invalidation → invalidateQueries(['tickets'])
17. Auto refetch → useFetchTickets refetches
18. HTTP GET → /api/tickets
19. Database → Returns all tickets (including new one)
20. Cache update → React Query updates cache
21. Component update → TicketList re-renders with new ticket
22. Modal close → onSuccess callback closes modal
```

#### Fetching Tickets (Initial Load)

```
1. Page navigation → /tickets route
2. Server component → app/tickets/page.tsx renders
3. Suspense boundary → Wraps TicketList client component
4. Client component → TicketList renders
5. Hook execution → useFetchTickets() executes
6. Cache check → React Query checks ['tickets'] cache
7. Cache miss → No cached data (first load)
8. API call → getTickets() in handleTickets.ts
9. HTTP GET → /api/tickets
10. API route → app/api/tickets/route.ts GET handler
11. Database model → getAllTickets() in tickets.model.ts
12. SQL query → SELECT * FROM tickets
13. Database → SQLite returns all tickets
14. Model returns → Ticket[] array
15. API route → Returns JSON array (200 status)
16. React Query → Stores in cache with key ['tickets']
17. Hook returns → { data: Ticket[], isLoading: false }
18. Component render → Maps tickets to TicketCard components
19. UI display → Grid of ticket cards displayed
```

#### Updating Ticket Status

```
1. User clicks button → "Mark as completed" in TicketCard
2. Handler → handleComplete() function
3. Mutation → updateStatus.mutate({ id, status: 'completed' })
4. API client → updateTicketStatus(id, status) in handleTickets.ts
5. HTTP PATCH → /api/tickets/[id] with { status: 'completed' }
6. API route → app/api/tickets/[id]/route.ts PATCH handler
7. Status validation → Checks if status is 'completed' or 'incomplete'
8. Database model → updateTicketStatus(id, status) in tickets.model.ts
9. SQL UPDATE → UPDATE tickets SET status = ? WHERE id = ?
10. Database → SQLite updates record
11. Model fetches → getTicketById(id) to verify update
12. Model returns → Updated Ticket object
13. API route → Returns updated ticket JSON (200 status)
14. Mutation success → onSuccess callback
15. Cache invalidation → invalidateQueries(['tickets'])
16. Auto refetch → Ticket list refetches
17. Component update → Button disappears (conditional rendering)
18. UI update → Ticket card shows updated state
```

#### Deleting a Ticket

```
1. User clicks delete → Delete button in TicketCard
2. Handler → handleDelete() function
3. Mutation → deleteTicket.mutate(id)
4. API client → deleteTicket(id) in handleTickets.ts
5. HTTP DELETE → /api/tickets/[id]
6. API route → app/api/tickets/[id]/route.ts DELETE handler
7. Database model → deleteTicket(id) in tickets.model.ts
8. SQL DELETE → DELETE FROM tickets WHERE id = ?
9. Database → SQLite deletes record
10. API route → Returns 204 No Content
11. Mutation success → onSuccess callback
12. Cache invalidation → invalidateQueries(['tickets'])
13. Auto refetch → Ticket list refetches
14. Database → Returns tickets (excluding deleted one)
15. Component update → TicketCard disappears from list
16. UI update → Grid layout adjusts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ticketify
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run db:init
```

4. (Optional) Seed the database with sample data:
```bash
# Run seed.ts manually or integrate into db:init if needed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:init` - Initialize database schema

## Conclusion

This application demonstrates a modern full-stack architecture with:

- **Next.js 16 App Router** for file-system routing and server components
- **SQLite + better-sqlite3** for efficient, synchronous database operations
- **React Query** for client-side state management and caching
- **Zod** for type-safe schema validation
- **TypeScript** for type safety throughout the stack
- **Clear separation of concerns** across database, API, and client layers

The architecture is designed to be:
- **Scalable**: Easy to add new features and routes
- **Maintainable**: Clear structure and separation of concerns
- **Type-Safe**: TypeScript ensures correctness at compile time
- **Performant**: Server-side rendering and efficient caching
- **Developer-Friendly**: Clear patterns and conventions
