# Quick Start Guide

Your React app has been successfully converted to Next.js! 🎉

## What Changed?

✅ **Framework**: Vite → Next.js 15  
✅ **All functionality preserved** - the app works exactly the same  
✅ **Better performance** with Next.js optimizations  
✅ **Production ready** with optimized builds  

## Getting Started (3 steps)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4001/graphql
```

### 3. Run the App

```bash
pnpm dev
```

Open **http://localhost:3000** 🚀

## Build for Production

```bash
pnpm build
pnpm start
```

## What's New?

### File Structure
```
starknet-wrapped-ai/
├── app/                    # Next.js pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static assets (images)
├── src/                   # Your React components (unchanged)
│   ├── app/App.tsx        # Main app (now with 'use client')
│   ├── lib/               # API & utilities
│   ├── styles/            # CSS files
│   └── types/             # TypeScript types
└── next.config.js         # Next.js config
```

### Key Changes
- **Assets**: Moved to `/public` - now accessible as `/image.png`
- **Environment**: Use `NEXT_PUBLIC_*` prefix instead of `VITE_*`
- **Entry Point**: `app/page.tsx` instead of `src/main.tsx`
- **Client Components**: Added `'use client'` to App.tsx

## Everything Else is the Same!

✅ All React components work identically  
✅ All animations and interactions preserved  
✅ All styling (Tailwind + custom CSS) intact  
✅ API integration unchanged  
✅ TypeScript types preserved  
✅ GraphQL queries work the same  

## Troubleshooting

**If you get a build error:**
1. Delete `node_modules` and `.next`
2. Run `pnpm install` again
3. Run `pnpm dev`

**If assets don't load:**
- Check that images are in `/public` directory
- Verify paths start with `/` (e.g., `/logo.png`)

## Documentation

- See `README.md` for full documentation
- See `MIGRATION.md` for technical migration details

---

**That's it!** Your app is now running on Next.js with zero functional changes. 🎊
