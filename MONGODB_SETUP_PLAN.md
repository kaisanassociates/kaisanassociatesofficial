# MongoDB Atlas Setup Plan - Complete Backend Configuration

## 🎯 Current Status Analysis

### Issues Identified:
1. ✅ **MongoDB Atlas connection string exists** in `.env`
2. ❌ **Directory structure confusion**: Handlers in both `api/` and `app/api/`
3. ❌ **Vercel config mismatch**: Points to `app/api/*.js` but TypeScript handlers are in `api/*.ts`
4. ❌ **Import path errors**: `api/` handlers import from `../src/lib/mongoose` (wrong path - should be `../../src/lib/mongoose`)
5. ❌ **Dual server files**: Both `server.cjs` and `api-server.js` exist with different imports

### Current Architecture:
```
├── api/                          # Vercel serverless functions (TypeScript)
│   ├── attendees/[attendeeId].ts ✅ Imports: '../src/lib/mongoose' ❌ WRONG PATH
│   └── ticket/[ticketId].ts      ✅ Imports: '../src/lib/mongoose' ❌ WRONG PATH
├── app/api/                      # Local dev handlers (CommonJS)
│   ├── register.cjs              ✅ Correct imports
│   ├── register.ts               ⚠️ Duplicate (not used)
│   ├── registrations.cjs
│   ├── registrations.ts          ⚠️ Duplicate (not used)
│   ├── lib/mongoose.cjs          ✅ Local dev DB connection
│   ├── attendees/[attendeeId].cjs ✅ Correct
│   └── ticket/[ticketId].cjs     ✅ Correct
└── src/lib/
    └── mongoose.ts               ✅ Vercel DB connection
```

---

## 🚀 COMPLETE FIX PLAN

### Phase 1: Clean Up Directory Structure (Recommended Approach)

**Option A: Use `api/` for Vercel, `app/api/` for local dev (RECOMMENDED)**
- `api/` = Vercel serverless functions (.ts files)
- `app/api/` = Local Express dev server (.cjs files)
- Vercel automatically detects `api/` directory
- Clear separation of concerns

**Option B: Consolidate everything to `app/api/` (Alternative)**
- Single directory for all handlers
- Need to manually configure Vercel routes
- Less clear separation

**We'll proceed with Option A** ✅

---

## 📋 Step-by-Step Implementation

### STEP 1: Create Missing API Handlers in `api/` Directory

We need to move/create handlers in the correct location:

**Create these files:**
1. `api/register.ts` (doesn't exist yet)
2. `api/registrations.ts` (doesn't exist yet)
3. Fix import paths in existing `api/attendees/[attendeeId].ts`
4. Fix import paths in existing `api/ticket/[ticketId].ts`

### STEP 2: Fix MongoDB Connection Imports

**Current (WRONG):**
```typescript
import connectDB from '../src/lib/mongoose';  // ❌ In api/*.ts files
```

**Correct:**
```typescript
import connectDB from '../../src/lib/mongoose';  // ✅ For api/*.ts
import connectDB from '../../../src/lib/mongoose';  // ✅ For api/attendees/*.ts
```

### STEP 3: Update Vercel Configuration

**Current `vercel.json` (WRONG):**
```json
{
  "functions": {
    "app/api/register.js": { ... }  // ❌ Wrong path
  }
}
```

**New `vercel.json` (CORRECT):**
```json
{
  "functions": {
    "api/register.ts": { "runtime": "nodejs18.x" },
    "api/registrations.ts": { "runtime": "nodejs18.x" },
    "api/attendees/[attendeeId].ts": { "runtime": "nodejs18.x" },
    "api/ticket/[ticketId].ts": { "runtime": "nodejs18.x" }
  },
  "rewrites": [
    { "source": "/api/register", "destination": "/api/register" },
    { "source": "/api/registrations", "destination": "/api/registrations" },
    { "source": "/api/attendees/:id", "destination": "/api/attendees/[attendeeId]" },
    { "source": "/api/ticket/:id", "destination": "/api/ticket/[ticketId]" }
  ]
}
```

### STEP 4: Keep Local Dev Server Using `app/api/` Handlers

**Update `server.cjs`:**
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Import .cjs handlers for local dev
const registerHandler = require('./app/api/register.cjs');
const registrationsHandler = require('./app/api/registrations.cjs');
const attendeesHandler = require('./app/api/attendees/[attendeeId].cjs');
const ticketHandler = require('./app/api/ticket/[ticketId].cjs');

// Routes
app.post('/api/register', registerHandler);
app.get('/api/registrations', registrationsHandler);
app.put('/api/attendees/:attendeeId', attendeesHandler);
app.get('/api/ticket/:ticketId', ticketHandler);

app.listen(PORT, () => {
  console.log(`✅ Local API Server running on http://localhost:${PORT}`);
});
```

### STEP 5: MongoDB Atlas Configuration

#### A. MongoDB Atlas Setup (If not done already)

1. **Login to MongoDB Atlas**: https://cloud.mongodb.com
2. **Create/Access Cluster**: `cluster0.yklsvdn.mongodb.net`
3. **Database Access**:
   - Username: `mailnihalpm_db_user`
   - Password: `noXLP4g5HEeGlrxl`
   - Role: `readWrite` on `influencia` database
4. **Network Access**:
   - Add IP: `0.0.0.0/0` (allow all - for development)
   - Production: Add specific IPs or use Vercel IP ranges
5. **Connection String**:
   ```
   mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority
   ```

#### B. Local Environment (.env file)

**Already configured** ✅
```env
MONGODB_URI=mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority
NODE_ENV=development
PORT=3000
```

#### C. Vercel Environment Variables

**Configure in Vercel Dashboard:**
1. Go to: `Project Settings` → `Environment Variables`
2. Add:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority`
   - **Environments**: Production, Preview, Development

**OR use Vercel CLI:**
```powershell
vercel env add MONGODB_URI production
# Paste the connection string when prompted
```

### STEP 6: Improve MongoDB Connection Utility

**Create `src/lib/db.ts` (unified connection):**
```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define MONGODB_URI environment variable in .env file'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Return cached connection if available
  if (cached!.conn) {
    console.log('✅ Using cached MongoDB connection');
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('🔄 Connecting to MongoDB Atlas...');
    cached!.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
```

---

## 🧪 Testing Plan

### Local Development Testing:

1. **Start local server:**
   ```powershell
   npm run dev
   ```
   - Vite should run on `http://localhost:8080`
   - Express API should run on `http://localhost:3000`

2. **Test API endpoints:**
   ```powershell
   # Test registration
   curl -X POST http://localhost:3000/api/register `
     -H "Content-Type: application/json" `
     -d '{"fullName":"Test User","email":"test@example.com","contactNumber":"1234567890","business":"Test Co","designation":"CEO","experience":"5 years","futurePlan":"Test plan for 5 years with detailed goals and objectives","dateOfBirth":"1990-01-01"}'
   ```

3. **Check MongoDB Atlas:**
   - Login to Atlas dashboard
   - Navigate to `Collections`
   - Verify `influencia` database has `registrations` collection
   - Check if document was created

### Vercel Deployment Testing:

1. **Deploy to Vercel:**
   ```powershell
   vercel deploy
   ```

2. **Set environment variables:**
   ```powershell
   vercel env add MONGODB_URI
   ```

3. **Test production API:**
   ```powershell
   curl -X POST https://your-project.vercel.app/api/register `
     -H "Content-Type: application/json" `
     -d '{"fullName":"Test User","email":"test@example.com",...}'
   ```

4. **Check Vercel logs:**
   ```powershell
   vercel logs
   ```

---

## 🔒 Security Improvements (IMPORTANT)

### 1. Remove Credentials from Git

**Create `.env.local` (NOT tracked in git):**
```env
MONGODB_URI=mongodb+srv://mailnihalpm_db_user:noXLP4g5HEeGlrxl@cluster0.yklsvdn.mongodb.net/influencia?retryWrites=true&w=majority
```

**Update `.gitignore`:**
```
.env
.env.local
.env.production
```

**Remove from `.env`:**
```env
# .env should only contain:
# MONGODB_URI=<add your connection string here>
NODE_ENV=development
PORT=3000
```

### 2. Rotate MongoDB Credentials

Since credentials are exposed in git history:
1. Go to MongoDB Atlas → Database Access
2. Delete user `mailnihalpm_db_user`
3. Create new user with different password
4. Update `.env.local` and Vercel environment variables

### 3. Replace Hardcoded Admin Key

Current: `admin123` in code
Recommended: Use environment variable

**In `.env.local`:**
```env
ADMIN_SECRET_KEY=your-secure-random-key-here
```

**In handlers:**
```typescript
const adminKey = process.env.ADMIN_SECRET_KEY || 'admin123';
if (authHeader !== `Bearer ${adminKey}`) { ... }
```

---

## 📝 File Changes Summary

### Files to CREATE:
1. ✅ `api/register.ts` - Copy from `app/api/register.ts`, fix imports
2. ✅ `api/registrations.ts` - Copy from `app/api/registrations.ts`, fix imports

### Files to MODIFY:
1. ✅ `api/attendees/[attendeeId].ts` - Fix import path
2. ✅ `api/ticket/[ticketId].ts` - Fix import path
3. ✅ `vercel.json` - Update function paths
4. ✅ `server.cjs` - Use correct .cjs handlers
5. ✅ `.env` - Remove sensitive data
6. ✅ `.gitignore` - Add .env files

### Files to DELETE (optional):
1. ⚠️ `api-server.js` - Duplicate of server.cjs
2. ⚠️ `app/api/register.ts` - Keep .cjs version only
3. ⚠️ `app/api/registrations.ts` - Keep .cjs version only

---

## 🎯 Quick Start Commands

### For First Time Setup:

```powershell
# 1. Install dependencies
npm install

# 2. Create .env.local file
cp .env .env.local
# Edit .env.local with your MongoDB URI

# 3. Start development servers
npm run dev

# 4. In another terminal, test connection
curl http://localhost:3000/api/health
```

### For Vercel Deployment:

```powershell
# 1. Install Vercel CLI (if not installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Set environment variables
vercel env add MONGODB_URI production
# Paste your MongoDB URI when prompted

# 5. Deploy to production
vercel --prod
```

---

## ✅ Success Indicators

You'll know MongoDB Atlas is working when:

### Localhost:
- [ ] Server starts without MongoDB connection errors
- [ ] Console shows: `✅ MongoDB connected successfully`
- [ ] POST to `/api/register` returns success
- [ ] Document appears in MongoDB Atlas dashboard

### Vercel:
- [ ] Deployment succeeds without errors
- [ ] Function logs show MongoDB connection success
- [ ] API endpoints respond with data
- [ ] Same database as localhost (shared data)

---

## 🆘 Troubleshooting

### Common Issues:

**1. "MONGODB_URI is not defined"**
```
Solution: Check .env or .env.local file exists and is loaded
```

**2. "MongoServerError: Authentication failed"**
```
Solution: Check username/password in connection string
Verify user exists in MongoDB Atlas → Database Access
```

**3. "MongooseError: Can't resolve 'net'"**
```
Solution: Add to tsconfig.json:
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

**4. "ECONNREFUSED" on localhost**
```
Solution: Make sure local server is running on port 3000
Check if another process is using the port
```

**5. Vercel deployment succeeds but API fails**
```
Solution: Check Vercel dashboard → Environment Variables
Make sure MONGODB_URI is set for production
Check function logs for specific errors
```

---

## 📞 Next Steps

1. Review this plan
2. Confirm approach (Option A recommended)
3. I'll implement all changes
4. Test locally
5. Deploy to Vercel
6. Verify end-to-end functionality

**Ready to proceed?** Let me know and I'll start implementing the fixes!
