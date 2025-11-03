# Login 500 Error - Debug Context

**Date:** 2025-11-04
**Issue:** Login returns 500 Internal Server Error on Vercel deployment
**Status:** INVESTIGATING

## Current Situation

### Deployment Info
- **Latest Deployment:** https://vss-a4p524oh4-cl-air.vercel.app
- **Status:** Ready (deployed 2 minutes ago)
- **Build Time:** 56 seconds
- **Git Commit:** 2e83d6f - "Fix PrismaClient instantiation for serverless environment"

### Test Credentials
- Username: `keith`
- Password: `lithodat2024`

### Error Details
```
POST https://vss-a4p524oh4-cl-air.vercel.app/api/auth/login 500 (Internal Server Error)
```

Browser shows: "An error occurred during login"
This is the generic error message from the catch block in the login API.

## What Has Been Fixed So Far

### 1. TypeScript Build Errors ✅
Fixed all TypeScript compilation errors that were preventing deployment.

### 2. Environment Variables ✅
Added to Vercel dashboard:
- `DATABASE_URL`: postgresql://neondb_owner:npg_PRIgyd90mMwE@ep-odd-credit-a7v2otju-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=15
- `JWT_SECRET`: vss-secret-key-change-in-production-2025

### 3. Database Seeding ✅
Successfully seeded production database with:
- 20 users (keith, fabian, wayne, moritz, vinko + 15 others)
- 7 action items
- All passwords are: `lithodat2024`

### 4. PrismaClient Singleton Pattern ✅
Changed all 14 files from using `new PrismaClient()` to singleton pattern from `@/lib/prisma`:
- API routes: login, session, actions, consensus, responses, team-responses
- Page components: debug-user, test-action, management pages
- Server utilities: server-auth

### 5. Removed basePath ✅
Temporarily removed `basePath: "/vss/lithodat"` from next.config.ts because it was causing blank pages.

## ROOT CAUSE IDENTIFIED ✅

**Missing Prisma postinstall script!**

The package.json was missing the `postinstall` script that runs `prisma generate`. Without this, the Prisma Client is not properly generated during the Vercel build process, causing all database queries to fail with runtime errors.

### Fix Applied
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### Also Added
Enhanced error logging in login route to show error details, name, and stack trace for debugging.

## Current Investigation

### Login API Route Location
`src/app/api/auth/login/route.ts`

### Login API Code Structure
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create JWT session (sets cookie automatically)
    await createSession(user.id, user.role);

    // Return success with user data
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
```

### Potential Issues to Check

1. **Database Connection**
   - Is DATABASE_URL correctly set in Vercel?
   - Can the deployment connect to Neon Postgres?
   - Connection string uses Sydney region: `ap-southeast-2.aws.neon.tech`

2. **JWT Secret**
   - Is JWT_SECRET correctly set in Vercel?
   - Does it match what `@/lib/auth` expects?

3. **Password Hashing**
   - Check if `verifyPassword` function works in serverless environment
   - Bcrypt might have issues in edge runtime

4. **Session Creation**
   - Check if `createSession` can set cookies properly
   - JWT signing might be failing

5. **Prisma Client**
   - Even with singleton, might need prisma generate
   - Check if @prisma/client is in dependencies

## Auth Library Location
`src/lib/auth.ts`

### Key Functions Used
- `verifyPassword(password: string, hash: string)` - Uses bcryptjs to verify password
- `createSession(userId: string, role: string)` - Creates JWT token and sets cookie

## Next Steps to Debug

### 1. Check Vercel Logs
```bash
vercel logs https://vss-a4p524oh4-cl-air.vercel.app
```
This will show the actual error from console.error

### 2. Test Database Connection
Create a test API route to verify database connectivity:
```typescript
// src/app/api/test-db/route.ts
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.user.count();
    return Response.json({ success: true, userCount: count });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
```

### 3. Add More Detailed Error Logging
Modify login route to log more details:
```typescript
catch (error) {
  console.error('Login error:', error);
  console.error('Error name:', error.name);
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  return NextResponse.json(
    { error: 'An error occurred during login', details: error.message },
    { status: 500 }
  );
}
```

### 4. Verify Environment Variables
```bash
vercel env ls
```

### 5. Check if Prisma is Generated
Verify package.json has postinstall script:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

## Environment Details

### Local Development
- Working Directory: `/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/prototypes/web-app/code/vss-mvp`
- Git Repo: No (not initialized)
- Node Environment: development

### Production (Vercel)
- Project: vss-mvp
- Owner: cl-air
- Region: Automatic
- Framework: Next.js 14

### Database (Neon Postgres)
- Region: Sydney (ap-southeast-2)
- Connection: Pooled
- SSL Mode: Required

## Files Involved

### Authentication
- `/src/app/api/auth/login/route.ts` - Login API endpoint
- `/src/lib/auth.ts` - Auth helper functions (JWT, bcrypt)
- `/src/lib/server-auth.ts` - Server-side auth utilities
- `/src/lib/prisma.ts` - Prisma singleton

### Database
- `/prisma/schema.prisma` - Database schema
- `/prisma/seed.ts` - Seed script (already run)

### Configuration
- `/next.config.ts` - Next.js config (basePath commented out)
- `/.env` - Local environment variables
- Vercel Dashboard - Production environment variables

## DNS Status (Separate Issue)
- Domain: clair.au
- DNS Provider: GoDaddy
- Target: Vercel (216.198.79.1)
- Status: Still propagating (been ~90 minutes)
- This is separate from the login issue - once DNS propagates, clair.au will point to the same deployment

## Test Commands

```bash
# Check deployment status
vercel ls | head -10

# View logs
vercel logs https://vss-a4p524oh4-cl-air.vercel.app

# Test login locally (should work)
npm run dev
# Then visit http://localhost:3000/login

# Check database connection locally
npx prisma studio

# Verify environment variables
vercel env ls
```

## Expected Behavior
When login succeeds, it should:
1. Find user in database by username
2. Verify password hash with bcryptjs
3. Create JWT token with user ID and role
4. Set HTTP-only cookie with session token
5. Return JSON: `{ success: true, user: { ... } }`
6. Redirect to /home

## Actual Behavior
- Returns 500 Internal Server Error
- Console shows: "An error occurred during login"
- No specific error details visible to client
