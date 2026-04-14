# 🚀 NEXTJS PRODUCTION OPTIMIZATION SKILL FILE
**OODA-Driven: Observe → Orient → Decide → Act**

> Every decision below follows the OODA loop: **Observe** the requirement, **Orient** using best-practice patterns, **Decide** the right strategy, **Act** with production-ready implementation.

---

## 📐 ARCHITECTURE DECISION MAP

Before writing a single line of code, answer these 4 questions:

| Question | Options | Impact |
|---|---|---|
| Is data dynamic or static? | SSG / ISR / SSR / CSR | Performance, SEO, cost |
| Who are the users? | Authenticated / Public | Auth strategy, caching layer |
| Where is data? | API / DB / CMS / Edge | Fetching strategy, latency |
| What's the scale? | Startup / Growth / Enterprise | Infra, caching, CDN |

---

## 1. 🏗️ PROJECT STRUCTURE (Production Standard)

```
frontend/                 # Next.js application
   ├── public/               # Static assets
   ├── src/
   │   ├── app/              # App Router (Next.js 13+)
   │   │   ├── (routes)/     # Route groups
   │   │   ├── api/          # [Optional] Next.js API routes (proxy or BFF)
   │   │   └── layout.tsx
   │   ├── components/       # Reusable UI components
   │   ├── lib/              # Utilities, API client, helpers
   │   ├── hooks/            # Custom React hooks
   │   ├── types/            # Shared TypeScript types
   │   └── styles/           # Global styles / Tailwind
   ├── .env.local            # Environment variables
   ├── next.config.js
   ├── package.json
   └── tsconfig.json
   
```

---

## 2. ⚡ RENDERING STRATEGIES (OODA: Decide First)

### Server Components (DEFAULT — use 98% of the time)
```tsx
// app/products/page.tsx
// ✅ No 'use client' — runs on server, zero JS shipped to client
import { db } from '@/lib/db'
import { cache } from 'react'

// React cache deduplicates DB calls across a single render pass
const getProducts = cache(async () => {
  return db.product.findMany({ orderBy: { createdAt: 'desc' } })
})

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductGrid products={products} />
}

// Static metadata — generated at build time
export const metadata = {
  title: 'Products | MyStore',
  description: 'Browse our full catalog'
}
```

### Static Generation (SSG) — Best for public, rarely-changing content
```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

// This page is pre-rendered at build time
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  return <Article post={post} />
}
```

### ISR (Incremental Static Regeneration) — Best for semi-dynamic content
```tsx
// Revalidate every 60 seconds — stale-while-revalidate
export const revalidate = 60

// Or on-demand revalidation from a webhook/API
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(req: Request) {
  const { secret, path, tag } = await req.json()
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (tag) revalidateTag(tag)
  if (path) revalidatePath(path)
  return Response.json({ revalidated: true, now: Date.now() })
}
```

### Server-Side Rendering (SSR) — Only when truly needed
```tsx
// Use when: user-specific data, real-time prices, personalization
// app/dashboard/page.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic' // Opt out of static caching

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect('/login')
  const data = await getUserDashboard(session.user.id)
  return <DashboardShell data={data} />
}
```

### Client Components — Use ONLY for interactivity
```tsx
// components/features/search/search-bar.tsx
'use client'
import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [isPending, startTransition] = useTransition()

  const handleSearch = (value: string) => {
    setQuery(value)
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (value) params.set('q', value)
      else params.delete('q')
      router.replace(`/search?${params.toString()}`)
    })
  }

  return (
    <input
      value={query}
      onChange={e => handleSearch(e.target.value)}
      placeholder="Search..."
      aria-busy={isPending}
    />
  )
}
```

---

## 3. 🧩 DATA FETCHING PATTERNS

### Parallel Fetching (Eliminate waterfalls)
```tsx
// ❌ WRONG — sequential waterfall
const user = await getUser(id)
const posts = await getPosts(user.id)   // waits for user
const comments = await getComments(posts[0].id) // waits for posts

// ✅ CORRECT — parallel
const [user, posts, comments] = await Promise.all([
  getUser(id),
  getPosts(id),
  getComments(id)
])
```

### fetch() with Next.js cache tags
```tsx
// lib/data/products.ts
export async function getProducts(category?: string) {
  const url = category
    ? `/api/products?category=${category}`
    : '/api/products'

  const res = await fetch(`${process.env.API_URL}${url}`, {
    next: {
      revalidate: 3600,         // cache for 1 hour
      tags: ['products', `products:${category}`] // for targeted revalidation
    }
  })

  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}
```

### Streaming with Suspense (Progressive UI)
```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Fast data loads immediately */}
      <Suspense fallback={<Skeleton className="h-32" />}>
        <StatsCard />
      </Suspense>

      {/* Slow data streams in without blocking */}
      <Suspense fallback={<Skeleton className="h-64" />}>
        <RecentActivity />   {/* Can be slow — won't block page */}
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96" />}>
        <RevenueChart />
      </Suspense>
    </div>
  )
}
```

### Server Actions (Mutations without API routes)
```tsx
// app/actions/product.ts
'use server'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'
import { auth } from '@/lib/auth'

const CreateProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  description: z.string().optional(),
})

export async function createProduct(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const parsed = CreateProductSchema.safeParse({
    name: formData.get('name'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  const product = await db.product.create({ data: parsed.data })
  revalidateTag('products')
  return { success: true, product }
}

// Usage in component
// <form action={createProduct}><button type="submit">Create</button></form>
```

---

## 4. 🖼️ IMAGE OPTIMIZATION

```tsx
import Image from 'next/image'

// ✅ Responsive image with art direction
export function ProductHero({ product }: { product: Product }) {
  return (
    <div className="relative aspect-video">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill                        // fills container
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={true}             // LCP image — preload it
        quality={85}                // sweet spot: quality vs size
        className="object-cover"
        placeholder="blur"
        blurDataURL={product.blurDataUrl}  // tiny base64 placeholder
      />
    </div>
  )
}

// ✅ Generate blur placeholders at build time
import { getPlaiceholder } from 'plaiceholder'

export async function getProductWithBlur(id: string) {
  const product = await db.product.findUnique({ where: { id } })
  const { base64 } = await getPlaiceholder(product.imageUrl)
  return { ...product, blurDataUrl: base64 }
}
```

### next.config.ts — Image domains & optimization
```ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],   // modern formats first
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,  // 7 days
  },
}

export default config
```

---

## 5. 📦 BUNDLE OPTIMIZATION

### next.config.ts — Full production config
```ts
import type { NextConfig } from 'next'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const config: NextConfig = {
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  // Experimental features
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
      'lodash-es',
    ],
    ppr: true,              // Partial Pre-Rendering (Next.js 15)
    reactCompiler: true,    // Auto-memoization (React 19)
  },

  // Bundle analysis (run: ANALYZE=true npm run build)
  webpack(config, { isServer }) {
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
          openAnalyzer: false,
        })
      )
    }
    return config
  },

  // Headers for security + caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
            ].join('; '),
          },
        ],
      },
      {
        // Immutable cache for static assets
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
    ]
  },
}

export default config
```

### Dynamic imports for heavy components
```tsx
import dynamic from 'next/dynamic'

// Heavy chart library — load only when needed
const RevenueChart = dynamic(
  () => import('@/components/features/charts/revenue-chart'),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,  // Charts often need browser APIs
  }
)

// Rich text editor
const RichEditor = dynamic(
  () => import('@/components/features/editor').then(m => m.RichEditor),
  { ssr: false }
)

// Map component
const MapView = dynamic(() => import('@/components/features/map-view'), {
  ssr: false,
  loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" />,
})
```

---

## 6. 🔒 AUTHENTICATION (next-auth v5 / Auth.js)

```ts
// auth.ts (root)
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { compare } from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }
        const user = await db.user.findUnique({ where: { email } })
        if (!user || !user.password) return null
        const valid = await compare(password, user.password)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: { strategy: 'jwt' },
})

// middleware.ts
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const isProtected = req.nextUrl.pathname.startsWith('/dashboard')

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

---

## 7. 🗃️ DATABASE LAYER (Prisma + Connection Pooling)

```ts
// lib/db/index.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  })

// Prevent multiple instances in dev (hot reload)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

### Query patterns
```ts
// lib/data/users.ts
import { cache } from 'react'
import { db } from '@/lib/db'

// Deduplicate across a single render
export const getUserById = cache(async (id: string) => {
  return db.user.findUnique({
    where: { id },
    select: {           // ✅ Always select only what you need
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      // NEVER: select: { password: true }
    },
  })
})

// Paginated query with cursor-based pagination (better than offset for large data)
export async function getPaginatedPosts(cursor?: string, limit = 20) {
  const posts = await db.post.findMany({
    take: limit + 1,     // fetch one extra to check if there's a next page
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, createdAt: true },
  })

  const hasNextPage = posts.length > limit
  return {
    posts: posts.slice(0, limit),
    nextCursor: hasNextPage ? posts[limit - 1].id : null,
  }
}
```

---

## 8. 🏎️ CACHING ARCHITECTURE

```
┌─────────────────────────────────────────────────┐
│                   CACHE LAYERS                  │
├────────────┬────────────────────────────────────┤
│  Layer     │  Tool / Strategy                   │
├────────────┼────────────────────────────────────┤
│  L1 - CDN  │  Vercel Edge / Cloudflare          │
│  L2 - App  │  Next.js fetch() cache + tags      │
│  L3 - Data │  React.cache() per-request         │
│  L4 - DB   │  Prisma (connection pool)          │
│  L5 - KV   │  Redis / Upstash (rate limits,     │
│            │  sessions, computed data)           │
└────────────┴────────────────────────────────────┘
```

### Redis / Upstash caching
```ts
// lib/cache/redis.ts
import { Redis } from '@upstash/redis'

export const redis = Redis.fromEnv()

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = 3600  // default 1 hour
): Promise<T> {
  const cached = await redis.get<T>(key)
  if (cached !== null) return cached

  const data = await fetcher()
  await redis.setex(key, ttl, data)
  return data
}

// Usage
const analytics = await withCache(
  `analytics:${userId}:${today}`,
  () => computeAnalytics(userId),
  60 * 5   // 5 minutes
)
```

---

## 9. 🌐 EDGE MIDDLEWARE (Performance + Security)

```ts
// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '15 m'),  // 100 req/15min
})

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1'
  const { success, limit, remaining } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'Retry-After': '900',
      },
    })
  }

  // Geo-based routing
  const country = req.geo?.country
  if (country === 'CN') {
    return NextResponse.redirect(new URL('/blocked', req.url))
  }

  const res = NextResponse.next()
  // Security headers
  res.headers.set('X-Frame-Options', 'DENY')
  return res
}

export const config = {
  matcher: ['/api/:path*'],
}
```

---

## 10. 🎨 FONTS (Zero Layout Shift)

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

// ✅ Preloaded, self-hosted, zero CLS
const sans = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
})

const mono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

---

## 11. 🧠 STATE MANAGEMENT

### Server State: nuqs (URL state) + React Query
```tsx
// Shareable, bookmarkable URL state
import { useQueryState, parseAsInteger } from 'nuqs'

export function ProductFilters() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [category, setCategory] = useQueryState('category')
  return (
    <div>
      <select onChange={e => { setCategory(e.target.value); setPage(1) }}>
        ...
      </select>
    </div>
  )
}
```

### Client State: Zustand (minimal, no boilerplate)
```ts
// stores/cart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem { id: string; quantity: number; price: number }

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
  total: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set(state => {
        const existing = state.items.find(i => i.id === item.id)
        if (existing) {
          return { items: state.items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )}
        }
        return { items: [...state.items, item] }
      }),
      removeItem: (id) => set(state => ({
        items: state.items.filter(i => i.id !== id)
      })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)
```

---

## 12. 🔧 ERROR HANDLING

```tsx
// app/error.tsx — Route segment error boundary
'use client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to Sentry/Datadog
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground mt-2">Page not found</p>
      <a href="/" className="mt-4 underline">Go home</a>
    </div>
  )
}
```

### API Route Error Handling
```ts
// lib/api/response.ts
export function ok<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status })
}

export function err(message: string, status = 400) {
  return Response.json({ success: false, error: message }, { status })
}

// app/api/products/route.ts
import { ok, err } from '@/lib/api/response'
import { z } from 'zod'

const QuerySchema = z.object({
  category: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = QuerySchema.safeParse(Object.fromEntries(searchParams))
    if (!query.success) return err('Invalid query parameters', 400)

    const products = await getProducts(query.data)
    return ok(products)
  } catch (e) {
    console.error(e)
    return err('Internal server error', 500)
  }
}
```

---

## 13. 🧪 TESTING STRATEGY

```
Unit Tests      → Vitest (fast, ESM-native)
Component Tests → Testing Library + Vitest
E2E Tests       → Playwright
API Tests       → Supertest or msw
```

### Component test example
```tsx
// __tests__/search-bar.test.tsx
import { render, screen, userEvent } from '@testing-library/react'
import { SearchBar } from '@/components/features/search/search-bar'
import { describe, it, expect } from 'vitest'

describe('SearchBar', () => {
  it('updates URL params on input', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'Next.js')
    expect(input).toHaveValue('Next.js')
  })
})
```

### Playwright E2E
```ts
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name=email]', 'test@example.com')
  await page.fill('[name=password]', 'password123')
  await page.click('[type=submit]')
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Dashboard')
})
```

---

## 14. 📊 PERFORMANCE MONITORING

### Core Web Vitals tracking
```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### OpenTelemetry (instrumentation.ts)
```ts
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node')
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http')

    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter({
        url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      }),
    })
    sdk.start()
  }
}
```

---

## 15. 🚢 DEPLOYMENT (CI/CD)

### GitHub Actions workflow
```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    needs: lint-typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit
      - run: pnpm test:e2e
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 16. ♿ ACCESSIBILITY (a11y)

```tsx
// ✅ Always: semantic HTML, ARIA, keyboard nav, focus management
export function Modal({ isOpen, onClose, title, children }) {
  return (
    <dialog
      open={isOpen}
      aria-labelledby="modal-title"
      aria-modal="true"
      onKeyDown={e => e.key === 'Escape' && onClose()}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">✕</button>
    </dialog>
  )
}

// Skip navigation link (first element in body)
export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-white px-4 py-2 rounded"
    >
      Skip to main content
    </a>
  )
}
```

---

## 17. 🔑 ENVIRONMENT MANAGEMENT

```bash
# .env.local (local dev — never commit)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."

# .env.example (commit this — template for teammates)
DATABASE_URL=""
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
```

```ts
// lib/env.ts — Validate env at startup (using zod)
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  REDIS_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
})

export const env = envSchema.parse(process.env)
// ✅ If any env var is missing, the app crashes at startup — not in production at runtime
```

---

## 18. 📋 PRODUCTION CHECKLIST

### Before Every Deploy
```
Performance
  [ ] Lighthouse score ≥ 90 for all categories
  [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1
  [ ] No unused dependencies (npx depcheck)
  [ ] Bundle < 200KB initial JS (check with @next/bundle-analyzer)
  [ ] Images: next/image with sizes prop, priority on LCP images
  [ ] Fonts: next/font, no @import in CSS

Security
  [ ] All env vars validated with zod
  [ ] No secrets in client-side code (NEXT_PUBLIC_ prefix only)
  [ ] CSP headers configured
  [ ] Rate limiting on all public API routes
  [ ] Input validated server-side with zod
  [ ] SQL injection safe (parameterized queries via Prisma)

Reliability
  [ ] Error boundaries on all major sections
  [ ] Loading states for all async operations
  [ ] Empty states designed and implemented
  [ ] Retry logic for critical API calls
  [ ] Database connection pooled

Accessibility
  [ ] All images have alt text
  [ ] Focus visible for keyboard navigation
  [ ] Color contrast ratio ≥ 4.5:1
  [ ] Screen reader tested (VoiceOver / NVDA)
  [ ] No missing form labels

SEO
  [ ] metadata export on all public pages
  [ ] OpenGraph images configured
  [ ] robots.txt and sitemap.xml generated
  [ ] Canonical URLs set
  [ ] Structured data (JSON-LD) on key pages

Testing
  [ ] Unit tests passing (vitest)
  [ ] E2E tests passing (playwright)
  [ ] TypeScript: 0 errors (strict mode)
  [ ] ESLint: 0 errors
```

---

## 19. ⚡ QUICK REFERENCE: PATTERNS AT A GLANCE

```
Data fetching:
  Static content          → generateStaticParams + no revalidate
  Semi-dynamic (CMS)      → revalidate = 3600 (1hr) + revalidateTag()
  User-specific           → dynamic = 'force-dynamic' + auth()
  Real-time               → SWR / React Query on client

Rendering:
  Public page             → Server Component (default)
  Needs onClick/state     → 'use client' — push DOWN the tree
  Heavy library           → dynamic() import with ssr: false
  Long load times         → Suspense + streaming

Performance rules:
  1. Server Components by default — zero client JS
  2. Parallel fetches with Promise.all()
  3. next/image for every image
  4. next/font for every font
  5. Dynamic import for anything > 50KB
  6. React.cache() for deduplication
  7. Cache tags for targeted invalidation

Common mistakes to avoid:
  ❌ Fetching in useEffect when Server Component works
  ❌ 'use client' on layout or page files
  ❌ Passing non-serializable props to Client Components
  ❌ import * from 'lodash' (use lodash/pick instead)
  ❌ No Suspense boundary around async components
  ❌ Skipping sizes prop on fill images
  ❌ Storing secrets in NEXT_PUBLIC_ variables
```

---

## 20. 📚 CANONICAL STACK (2025)

| Category | Tool | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC, streaming, PPR |
| Language | TypeScript 5 (strict) | Type safety |
| Styling | Tailwind CSS v4 | Utility-first, fast |
| Components | shadcn/ui | Accessible, composable |
| DB ORM | Prisma or Drizzle | Type-safe queries |
| Auth | Auth.js v5 | Flexible, secure |
| Validation | Zod | Runtime + types |
| State | Zustand + nuqs | Minimal, URL-synced |
| Cache | Redis (Upstash) | Edge-compatible |
| Testing | Vitest + Playwright | Fast, modern |
| Monitoring | Sentry + Vercel Analytics | Errors + vitals |
| Deploy | Vercel | Zero-config, edge |

---

*Generated by OODA Optimization Skill — Observe, Orient, Decide, Act*
*Built for production. No shortcuts. No compromise.*
