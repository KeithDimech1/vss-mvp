# Comprehensive Deployment Architecture Guide

**Application**: VSS MVP (Viable Strategy System)
**Last Updated**: 2025-11-04
**Purpose**: Complete deployment architecture documentation for replication

---

## 🎯 **KEY ARCHITECTURE SUMMARY**

**The most important thing to understand:** This is a **monolithic Next.js application** - there is **NO separate backend**. Everything (frontend + API) deploys to **Vercel only**.

---

## 📦 **WHAT YOU ACTUALLY HAVE**

### **Single Deployment Target: Vercel**
- **Frontend**: Next.js 16 App Router (React 19)
- **Backend**: Next.js API Routes (serverless functions)
- **All in one** codebase, one deployment

### **"Clair" Clarification**
**Clair is NOT a technical service** - it's your **company brand name** (`clair.au`). There's no "Clair deployment" - just your company logo in `/public/clair-logo.png`.

---

## 🏗️ **DEPLOYMENT ARCHITECTURE OVERVIEW**

### **Application Type**: Next.js 16.0.1 Full-Stack Application (App Router)
**Location**: `/Users/keithdimech/Pathway/Dev/Lithodat/Viable Systems Model/VSM-Platform-Project/prototypes/web-app/code/vss-mvp`

---

## 1️⃣ **FRONTEND DEPLOYMENT (Vercel)**

### **Platform**: Vercel
**Project Name**: `vss-mvp`
**Project ID**: `prj_Dhc04Wdtuaz0lj1AI1pD3SW6o6hB`
**Organization**: `team_JrLxkn6f2AQAXxYu86UvPK7r` (cl-air)
**Plan**: Hobby

### **Configuration Files**:
- **`/vercel.json`**: Basic routing configuration (redirects `/` to `/index.html`)
- **`/.vercel/project.json`**: Project metadata
- **`/next.config.ts`**: Next.js configuration (minimal, basePath commented out)

### **What's Deployed**:
- **Next.js 16** App Router application
- **React 19.2.0** with Server Components
- **TailwindCSS 4** for styling
- **Server-side rendering (SSR)** + API Routes
- **Static assets** from `/public` directory

### **Build Process**:
```bash
# package.json scripts
"build": "prisma generate && next build"
"start": "next start"
"dev": "next dev"
```

### **Key Features Deployed**:
- Authentication system (JWT-based)
- VSM Assessment forms
- Action management workflows
- Admin dashboard
- Team response collection

---

## 2️⃣ **BACKEND ARCHITECTURE**

### **⚠️ IMPORTANT: No Separate Backend Service**

This is a **monolithic Next.js application** - there is **NO separate backend service** (no Railway, Render, or standalone API server).

### **Backend Components (All on Vercel)**:

#### **API Routes** (Next.js API Routes - Serverless)
Location: `/src/app/api/`

**Authentication APIs**:
- `/api/auth/login` - JWT login endpoint
- `/api/auth/logout` - Session cleanup
- `/api/auth/session` - Session validation

**Assessment APIs**:
- `/api/assessment` - VSM assessment CRUD

**Action Management APIs**:
- `/api/actions` - Action items listing
- `/api/actions/[actionId]/responses` - User responses
- `/api/actions/[actionId]/team-responses` - Team aggregation
- `/api/actions/[actionId]/consensus` - Consensus building

**Admin APIs**:
- `/api/admin/stats` - Dashboard statistics
- `/api/admin/submissions/[userId]` - User submission details

**Debug/Test APIs**:
- `/api/test-db` - Database connection test
- `/api/test-bcrypt` - Password hashing test
- `/api/debug/action-responses` - Response debugging

#### **Server Components** (Next.js RSC)
Location: `/src/app/(dashboard)/`, `/src/app/(auth)/`

All page components use React Server Components with direct database access via Prisma.

#### **Runtime Configuration**:
```typescript
// All API routes use:
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
```

---

## 3️⃣ **AUTHENTICATION SYSTEM**

### **Authentication Provider**: **Custom JWT Implementation** (NO third-party auth service)

**❌ NOT USING**:
- Clerk
- Auth0
- NextAuth.js
- Supabase Auth

### **Implementation Details**:

**Auth Library**: `jose` (JWT library)
**Password Hashing**: `bcryptjs` + `@node-rs/bcrypt`

**Key Files**:
- `/src/lib/auth.ts` - Core auth functions (client-friendly)
- `/src/lib/server-auth.ts` - Server-side auth utilities
- `/src/middleware.ts` - Route protection middleware

**Session Management**:
- **JWT tokens** stored in HTTP-only cookies
- **Cookie name**: `session`
- **Token lifetime**: 7 days
- **Secret**: `JWT_SECRET` environment variable

**Functions**:
```typescript
// auth.ts
hashPassword(password: string): Promise<string>
verifyPassword(password: string, hashedPassword: string): Promise<boolean>
createSession(userId: string, role: string): Promise<string>
getSession(): Promise<{ userId: string; role: string } | null>
deleteSession(): Promise<void>

// server-auth.ts
getServerSession(): Promise<{ userId: string } | null>
getCurrentUser(): Promise<SessionUser | null>
requireAuth(): Promise<SessionUser>
requireManager(): Promise<SessionUser>
```

**Route Protection**:
- Middleware at `/src/middleware.ts` protects all routes except public ones
- Public routes: `/login`, `/api/auth/*`
- Authenticated users redirected from `/login` to `/dashboard`

---

## 4️⃣ **DATABASE**

### **Database Provider**: **Neon PostgreSQL** (Serverless Postgres)

**Region**: Sydney (ap-southeast-2)
**Connection Type**: Connection pooling enabled
**ORM**: Prisma 6.18.0

### **Database Configuration**:

**Connection String Format**:
```
DATABASE_URL="postgresql://neondb_owner:npg_PRIgyd90mMwE@ep-odd-credit-a7v2otju-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"
```

### **Prisma Setup**:

**Schema Location**: `/prisma/schema.prisma`

**Key Models**:
```prisma
- User (authentication, roles, manager flags)
- Assessment (VSM assessment responses)
- ActionItem (7 strategic actions)
- ActionResponse (user responses to actions)
- ActionConsensus (team consensus data)
```

**Prisma Client**: `/src/lib/prisma.ts` (singleton pattern for development)

**Build Process**:
```bash
prisma generate  # Runs before every build
```

---

## 5️⃣ **CLAIR INTEGRATION**

### **What is Clair?**

**Clair** is the **company/brand name** (`clair.au`), not a technical service or integration.

**Context**: From the product strategy document (`03-VSS-PRODUCT-STRATEGY-CLAIR.md`), Clair is:
- Keith Dimech's consulting company
- Brand positioning for VSS (Viable Strategy System)
- Target domain: `clair.au` or `viablestrategy.com`

**Logo Reference**: `/public/clair-logo.png` exists

**❌ Clair is NOT**:
- A backend service
- An API integration
- A third-party tool
- A deployment platform

**✅ Clair IS**:
- The company brand
- The go-to-market identity for VSS product
- Future commercial entity for the platform

---

## 6️⃣ **ENVIRONMENT VARIABLES**

### **Required Environment Variables**:

#### **Production (.env)**:
```bash
# Database Connection
DATABASE_URL="postgresql://neondb_owner:npg_PRIgyd90mMwE@ep-odd-credit-a7v2otju-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=15"

# JWT Authentication Secret
JWT_SECRET="vss-secret-key-change-in-production-2025"

# Node Environment (auto-set by Vercel)
# NODE_ENV=production
```

#### **Development (.env.local)**:
```bash
# Vercel OIDC Token (CLI authentication)
VERCEL_OIDC_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIs..."

# Same DATABASE_URL as production
DATABASE_URL="postgresql://..."
```

### **Vercel Environment Variables Setup**:
Configure at: `https://vercel.com/cl-air/vss-mvp/settings/environment-variables`

**Required Variables**:
1. `DATABASE_URL` - Neon Postgres connection string
2. `JWT_SECRET` - Secret key for JWT signing (use: `openssl rand -base64 32`)

**Optional Variables**:
- `NODE_ENV` - Auto-set by Vercel (production/development/preview)

---

## 7️⃣ **TECHNOLOGY STACK**

### **Frontend**:
- **Framework**: Next.js 16.0.1 (App Router)
- **React**: 19.2.0 (with Server Components)
- **Styling**: TailwindCSS 4 + PostCSS
- **TypeScript**: 5.x
- **UI Components**: Custom React components (no UI library)

### **Backend**:
- **Runtime**: Node.js (Vercel Serverless Functions)
- **API**: Next.js API Routes
- **ORM**: Prisma 6.18.0
- **Database**: PostgreSQL (Neon)
- **Auth**: JWT (jose library)
- **Password**: bcryptjs + @node-rs/bcrypt

### **DevOps**:
- **Hosting**: Vercel (frontend + API)
- **Database**: Neon (managed Postgres)
- **Version Control**: Git
- **CI/CD**: Vercel (auto-deploy on push)

### **Development Tools**:
- **ESLint**: 9.x (Next.js config)
- **TypeScript**: Strict mode enabled
- **Package Manager**: npm

---

## 8️⃣ **DEPLOYMENT WORKFLOW**

### **Current Deployment Process**:

1. **Local Development**:
   ```bash
   npm run dev  # Start dev server on localhost:3000
   ```

2. **Build & Test**:
   ```bash
   npm run build  # Runs: prisma generate && next build
   npm run start  # Test production build locally
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod  # Deploy to production
   vercel --prod --force  # Force rebuild (clear cache)
   ```

4. **Automatic Deployment**:
   - Push to `main` branch → Auto-deploy to production
   - Push to other branches → Preview deployments

### **Database Migrations**:
```bash
# Generate Prisma client (runs automatically on build)
npx prisma generate

# Create migration
npx prisma migrate dev --name <migration_name>

# Apply migrations to production
npx prisma migrate deploy
```

### **Seed Data**:
```bash
# Run database seed
npm run seed  # Runs: tsx prisma/seed.ts
```

---

## 9️⃣ **FILE STRUCTURE**

```
vss-mvp/
├── .env                      # Production environment variables
├── .env.local                # Local/development environment variables
├── .vercel/                  # Vercel configuration
│   └── project.json          # Project metadata
├── vercel.json               # Vercel deployment config
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeding script
├── public/                   # Static assets
│   ├── clair-logo.png        # Brand logo
│   └── index.html            # Static HTML
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Auth pages (login)
│   │   ├── (dashboard)/      # Protected dashboard pages
│   │   ├── api/              # API routes (backend)
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   └── actions/          # Action-related components
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # Auth functions
│   │   ├── server-auth.ts    # Server-side auth
│   │   ├── prisma.ts         # Prisma client
│   │   └── questions.ts      # Question definitions
│   └── middleware.ts         # Route protection
├── docs/                     # Documentation
│   ├── ACTION-QUESTIONS-GUIDE.md
│   ├── TROUBLESHOOTING.md
│   └── DEPLOYMENT-ARCHITECTURE.md  # This file
└── scripts/                  # Utility scripts
```

---

## 🔟 **KEY FINDINGS SUMMARY**

### **✅ CONFIRMED**:
1. **Monolithic Next.js app** - Frontend + Backend in one deployment
2. **Vercel hosting** - Single platform for everything
3. **Custom JWT auth** - No third-party auth service
4. **Neon Postgres** - Serverless database
5. **No separate backend** - API routes handle all backend logic
6. **Clair is a brand** - Not a technical service

### **❌ NOT PRESENT**:
1. **No Railway/Render backend** - All API routes are Vercel serverless
2. **No Auth0/Clerk** - Custom JWT implementation
3. **No Redis/caching layer** - Direct database queries
4. **No external APIs** - Self-contained application
5. **No Docker/containers** - Vercel serverless deployment
6. **No CI/CD pipelines** - Vercel auto-deploy

---

## 🚀 **HOW TO REPLICATE FOR YOUR OTHER APP**

### **Step 1: Set Up Neon Database**

1. **Create Neon project:**
   ```bash
   # Go to: https://console.neon.tech
   # Create new project → Choose Sydney region
   # Copy connection string
   ```

2. **Get pooler connection string:**
   - Use the **pooler** endpoint (ends with `-pooler.ap-southeast-2...`)
   - Add `?sslmode=require&connect_timeout=15`

### **Step 2: Set Up Vercel Project**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Link project:**
   ```bash
   cd /path/to/your/other/app
   vercel link
   # Follow prompts to create new project
   ```

3. **Configure environment variables:**
   ```bash
   vercel env add DATABASE_URL production
   # Paste your Neon connection string

   vercel env add JWT_SECRET production
   # Generate with: openssl rand -base64 32
   ```

### **Step 3: Set Up Prisma**

1. **Initialize Prisma (if new app):**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Configure `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }
   ```

3. **Create your models** (copy from current app or create new)

4. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### **Step 4: Copy Authentication System**

**Files to copy to your new app:**

```bash
# Core auth files
/src/lib/auth.ts           # Main auth functions
/src/lib/server-auth.ts    # Server-side helpers
/src/lib/prisma.ts         # Prisma client singleton
/src/middleware.ts         # Route protection

# Auth API routes
/src/app/api/auth/login/route.ts
/src/app/api/auth/logout/route.ts
/src/app/api/auth/session/route.ts

# Auth pages
/src/app/(auth)/login/page.tsx
```

**Install auth dependencies:**
```bash
npm install jose bcryptjs @node-rs/bcrypt
npm install -D @types/bcryptjs
```

### **Step 5: Configure Local Environment**

Create `.env.local`:
```bash
DATABASE_URL="your-neon-connection-string"
JWT_SECRET="your-generated-secret"
```

Add to `.gitignore`:
```
.env
.env.local
.env*.local
```

### **Step 6: Update Build Scripts**

In `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "seed": "tsx prisma/seed.ts"
  }
}
```

### **Step 7: Deploy**

1. **Test locally:**
   ```bash
   npm run build
   npm run start
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Run migrations on production:**
   ```bash
   # After first deploy
   vercel env pull .env.production
   npx prisma migrate deploy
   ```

---

## 📋 **ENVIRONMENT VARIABLES CHECKLIST**

### **Required for Both Environments:**

| Variable | Where to Get | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon console | `postgresql://user:pass@...` |
| `JWT_SECRET` | Generate new | `openssl rand -base64 32` |

### **Optional but Recommended:**

| Variable | Purpose | Default |
|----------|---------|---------|
| `NODE_ENV` | Environment | Auto-set by Vercel |
| `NEXT_PUBLIC_APP_URL` | App base URL | Auto-detected |

---

## ⚠️ **CRITICAL SECURITY STEPS**

### **Before Going Live:**

1. **Generate strong JWT secret:**
   ```bash
   openssl rand -base64 32
   # Use this in production, different from dev
   ```

2. **Verify `.env*` files are gitignored:**
   ```bash
   git check-ignore .env .env.local
   # Should show: .env and .env.local
   ```

3. **Review exposed credentials:**
   - Check git history: `git log --all --full-history -- .env`
   - If exposed, **rotate database password** immediately

4. **Set secure cookie options** (already in auth.ts):
   ```typescript
   httpOnly: true,  // ✅ Already set
   secure: process.env.NODE_ENV === 'production',  // ✅ Already set
   sameSite: 'lax',  // ✅ Already set
   ```

---

## 🔒 **SECURITY NOTES**

### **⚠️ URGENT SECURITY ITEMS**:

1. **JWT Secret**: Current secret is placeholder
   ```bash
   # Generate new secret:
   openssl rand -base64 32
   ```

2. **Database Credentials**: Exposed in `.env` files
   - Ensure `.env*` in `.gitignore` (currently: ✅ yes)
   - Rotate credentials if exposed in version control

3. **Password Hashing**: Using bcrypt (✅ secure)
   - Salt rounds: 10 (adequate)

4. **HTTPS**: Vercel provides automatic HTTPS (✅ yes)

5. **Cookie Security**:
   ```typescript
   httpOnly: true,  // ✅ Prevents XSS
   secure: process.env.NODE_ENV === 'production',  // ✅ HTTPS only
   sameSite: 'lax',  // ✅ CSRF protection
   ```

---

## 🎬 **QUICK START FOR NEW APP**

```bash
# 1. Create Neon database
# → https://console.neon.tech

# 2. Clone or create Next.js app
npx create-next-app@latest my-new-app --typescript --tailwind --app

# 3. Install dependencies
cd my-new-app
npm install prisma @prisma/client jose bcryptjs @node-rs/bcrypt

# 4. Copy auth system from vss-mvp
# Copy files listed in Step 4 above

# 5. Set up Prisma
npx prisma init
# Edit schema.prisma with your models
npx prisma migrate dev --name init

# 6. Configure environment
echo "DATABASE_URL='your-neon-url'" > .env.local
echo "JWT_SECRET='$(openssl rand -base64 32)'" >> .env.local

# 7. Test locally
npm run dev

# 8. Deploy to Vercel
vercel login
vercel link
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel --prod
```

---

## 📝 **FILES TO TRANSFER TO OTHER APP**

### **Essential Files:**

```
Authentication System:
├── src/lib/auth.ts
├── src/lib/server-auth.ts
├── src/lib/prisma.ts
├── src/middleware.ts
├── src/app/api/auth/login/route.ts
├── src/app/api/auth/logout/route.ts
├── src/app/api/auth/session/route.ts
└── src/app/(auth)/login/page.tsx

Database:
├── prisma/schema.prisma (adapt models)
└── prisma/seed.ts (if needed)

Config:
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json (dependencies)
```

---

## 🔍 **KEY DIFFERENCES FROM YOUR CURRENT SETUP**

**What you DON'T need to replicate if starting fresh:**

1. ❌ **The Clair branding** - Just a logo, not a service
2. ❌ **VSM-specific components** - Assessment forms, action workflows
3. ❌ **The seed data** - User accounts specific to current app
4. ❌ **Vercel OIDC token** - Auto-generated per project

**What you MUST replicate:**

1. ✅ **Neon database** - New project for new app
2. ✅ **JWT auth system** - Copy entire auth folder
3. ✅ **Prisma setup** - ORM for database access
4. ✅ **Environment variables** - New secrets for new app
5. ✅ **Build process** - `prisma generate` before build

---

## 💡 **PRO TIPS**

1. **Use different database per app:**
   - Don't share Neon project between apps
   - Create separate Neon project for isolation

2. **Generate unique JWT secrets:**
   - Never reuse secrets between apps
   - Generate fresh: `openssl rand -base64 32`

3. **Set up preview environments:**
   - Vercel auto-creates previews for branches
   - Use separate database for previews (optional)

4. **Monitor Vercel logs:**
   - Dashboard: `https://vercel.com/[org]/[project]/logs`
   - CLI: `vercel logs`

5. **Database migrations:**
   - Development: `prisma migrate dev`
   - Production: `prisma migrate deploy`
   - Always test migrations locally first

---

## 📊 **ARCHITECTURE DIAGRAM**

```
┌─────────────────────────────────────────┐
│         USER BROWSER                     │
└────────────────┬────────────────────────┘
                 │ HTTPS
                 ↓
┌─────────────────────────────────────────┐
│         VERCEL (Single Platform)         │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │   Next.js Frontend (React 19)      │ │
│  │   - Pages & Components             │ │
│  │   - Server Components              │ │
│  └────────────────────────────────────┘ │
│                 ↕                        │
│  ┌────────────────────────────────────┐ │
│  │   API Routes (Serverless)          │ │
│  │   - /api/auth/*                    │ │
│  │   - /api/assessment/*              │ │
│  │   - /api/actions/*                 │ │
│  └────────────────────────────────────┘ │
│                 ↕                        │
│  ┌────────────────────────────────────┐ │
│  │   Prisma ORM                       │ │
│  └────────────────────────────────────┘ │
└─────────────────┬───────────────────────┘
                  │ PostgreSQL Protocol
                  ↓
┌─────────────────────────────────────────┐
│   Neon PostgreSQL (Sydney Region)       │
│   - User authentication                 │
│   - Application data                    │
└─────────────────────────────────────────┘

Authentication Flow:
─────────────────
1. User submits credentials → /api/auth/login
2. API verifies with bcrypt → Queries Neon DB
3. Creates JWT token → Returns HTTP-only cookie
4. Middleware validates token → Allows/blocks routes
5. Session persists 7 days → Auto-refresh on activity
```

---

## 📊 **MONITORING & DEBUGGING**

### **Debug Endpoints**:
- `GET /api/test-db` - Test database connection
- `GET /api/test-bcrypt` - Test password hashing
- `GET /api/debug/action-responses` - Debug action responses

### **Logging**:
- Console logs in API routes (production visible in Vercel logs)
- Vercel Runtime Logs: `https://vercel.com/cl-air/vss-mvp/logs`

### **Error Tracking**:
- Currently: Console logs only
- Recommended: Add Sentry or LogRocket for production

---

## 📞 **SUPPORT & DOCUMENTATION**

**Primary Documentation**:
- `/docs/TROUBLESHOOTING.md` - Known issues and solutions
- `/docs/ACTION-QUESTIONS-GUIDE.md` - Action system documentation
- `/VSM-Platform-Project/docs/03-VSS-PRODUCT-STRATEGY-CLAIR.md` - Product strategy

**Vercel Project**: `https://vercel.com/cl-air/vss-mvp`

---

## 📋 **DEPLOYMENT CHECKLIST**

### **For Production Deployment**:

- [x] Vercel project created (`vss-mvp`)
- [x] Database provisioned (Neon Postgres Sydney)
- [x] Environment variables configured
  - [x] `DATABASE_URL`
  - [x] `JWT_SECRET`
- [x] Prisma schema deployed
- [x] Database seeded with initial data
- [x] Build process verified (`prisma generate` + `next build`)
- [x] API routes tested
- [x] Authentication flow validated
- [ ] **SECURITY**: Change `JWT_SECRET` to secure random string
- [ ] **SECURITY**: Review `.env` files not committed to git
- [ ] **MONITORING**: Set up error tracking (Sentry/LogRocket)
- [ ] **BACKUP**: Configure Neon database backups

---

## ✅ **SUMMARY: THREE COMPONENTS ONLY**

1. **Vercel** - Hosts everything (frontend + API)
2. **Neon** - PostgreSQL database
3. **Custom Auth** - JWT-based (no external service)

**That's it!** No Railway, no separate backend, no auth service. Just these three pieces.

---

**Ready to replicate?** This guide contains everything needed to deploy the same architecture for a different application. 🚀
