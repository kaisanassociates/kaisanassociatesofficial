# Influencia Event Registration System - AI Coding Instructions

## Project Overview
Event registration platform for "Influencia Edition 2" built with React + Vite frontend and dual-backend architecture (Express dev server + Vercel serverless functions). Uses MongoDB for data persistence, shadcn/ui for components, and QR code-based ticket management.

## Critical Architecture Patterns

### Dual Backend Environment
**Development**: Express server (`server.cjs`) on port 3000 with `.cjs` API handlers  
**Production**: Vercel serverless functions (`.ts` handlers in `api/`)  

- **API handlers exist in BOTH formats**: 
  - `api/register.ts`, `api/registrations.ts`, etc. (Vercel)
  - `app/api/register.cjs`, `app/api/registrations.cjs`, etc. (Local dev)
- `.cjs` handlers run via Express for local dev; `.ts` handlers deploy as Vercel functions
- When modifying API logic, **update both file versions** to maintain dev/prod parity
- Vite dev server (port 8080) proxies `/api/*` requests to Express server (port 3000)
- **Route pattern**: `/api/register`, `/api/registrations`, `/api/attendees/:id`, `/api/ticket/:id`

### Database Connection Pattern
**Two separate connection utilities**:
- `src/lib/mongoose.ts` - TypeScript/Vercel version with global caching
- `app/api/lib/mongoose.cjs` - CommonJS version for Express server
- `src/lib/db.ts` - Enhanced utility with improved error handling (newer)

Both implement connection pooling via `global.mongoose` cache with readyState validation.
**CRITICAL**: `bufferCommands: false` requires awaiting full connection before queries.

### Schema Design
Single Registration schema in each API handler (no centralized model file). Core fields:
- Legacy: `name`, `email`, `phone`, `organization` (backwards compatibility)
- Extended: `fullName`, `contactNumber`, `business`, `sectors[]`, `designation`, etc.
- Ticket: `qrCode`, `attended`, `checkInTime`, `paymentStatus`

API handlers map legacy → extended fields: `body.fullName || name`, `body.contactNumber || phone`

## Component & Styling Conventions

### shadcn/ui Integration
- All UI components in `src/components/ui/` auto-generated via `npx shadcn@latest add <component>`
- Never manually edit these files; re-run shadcn CLI to update
- Custom components use shadcn components + Tailwind classes (no inline styles)
- Path aliases: `@/components`, `@/lib`, `@/hooks` configured in `tsconfig.json` and `components.json`

### Styling Patterns
- Utility-first Tailwind CSS with custom gradient utilities (`gradient-text`, `glass-panel`)
- Dark mode support via `next-themes` (not yet fully implemented)
- Animation classes: `animate-fade-in`, `animate-scale-in`, `animate-fade-in-up`
- Form validation with `react-hook-form` + `zod` schemas

## Development Workflow

### Running the Application
```powershell
npm run dev  # Runs concurrently: Vite (8080) + Express (3000)
# OR separately:
npm run dev:vite      # Frontend only (no API)
npm run dev:server    # Backend only
```

### Environment Setup
MongoDB URI in `.env` (committed with development credentials - **change for production**):
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority
```

### Multi-Step Form Pattern
`RegistrationForm.tsx` uses 3-step wizard:
1. Personal info validation via `trigger()` before advancing
2. Sector selection (checkboxes) with "Others" conditional input
3. Future plans (min 50 chars) + achievements

Validation runs **per-step** before allowing navigation; final submit only on step 3.

## API Response Format
All endpoints return standardized format:
```typescript
{ success: boolean, data?: any, message?: string, error?: string }
```

### Route Handlers
- POST `/api/register` - Create registration, auto-generate QR code (`INFLUENCIA2025-{id}`)
- GET `/api/registrations` - Admin only (Bearer token check)
- PUT `/api/attendees/:id` - Toggle attendance or soft delete (sets `deleted: true`)
- GET `/api/ticket/:id` - Retrieve registration by ID for ticket display

### Admin Authentication
Hardcoded key `admin123` in both dev/prod handlers. Check via:
```javascript
if (authHeader !== 'Bearer admin123') { return 401; }
```

## Common Pitfalls

1. **Forgetting to update both .cjs and .ts handlers** when changing API logic
2. **Using inline MongoDB model definitions** - each handler redeclares schema (intentional for serverless)
3. **CORS headers required** - All API handlers manually set `Access-Control-Allow-*` headers
4. **TypeScript config allows `any`** - `noImplicitAny: false` to maintain compatibility with generated code
5. **Routes order matters** - Keep catch-all `<Route path="*">` last in `App.tsx`

## Key Files Reference

- `server.cjs` - Express server bootstrap, route registration
- `vercel.json` - Serverless function mapping, environment variables
- `src/lib/api.ts` - Frontend API client with environment-aware base URL
- `src/components/RegistrationForm.tsx` - Main form logic, multi-step validation
- `src/pages/Admin.tsx` - Dashboard with attendee management (delete, check-in)
- `src/pages/Ticket.tsx` - QR code display page (loads from localStorage)

## Testing & Debugging

No automated tests configured. Manual testing workflow:
1. Test registration flow → Check MongoDB Atlas for document creation
2. Verify QR code generation format matches `INFLUENCIA2025-{ObjectId}`
3. Admin panel → Confirm attendance toggle updates `attended` + `checkInTime`
4. Production → Check Vercel function logs for errors (no local error reporting)

## Future Improvements (Not Yet Implemented)

- Replace hardcoded admin key with JWT authentication
- Implement actual QR code library (currently string-based)
- Add payment gateway integration (paymentStatus currently unused)
- Dark mode theming completion (components installed but not activated)
