# Migration from Vite to Next.js

This document outlines the migration from Vite + React to Next.js while maintaining 100% functional parity.

## Changes Made

### 1. Package Management

**Removed:**
- `vite` - Bundler
- `@vitejs/plugin-react` - Vite React plugin
- `@tailwindcss/vite` - Tailwind Vite plugin

**Added:**
- `next` (v15.1.3) - Next.js framework
- `autoprefixer` - CSS autoprefixer
- `postcss` - CSS processor
- Updated `tailwindcss` to v3.x for Next.js compatibility

### 2. Configuration Files

**Created:**
- `next.config.js` - Next.js configuration with motion package transpilation
- `tsconfig.json` - TypeScript config for Next.js
- `tailwind.config.js` - Standard Tailwind v3 configuration
- `postcss.config.js` - PostCSS configuration

**Removed:**
- `vite.config.ts`
- `index.html` (no longer needed in Next.js)
- `postcss.config.mjs`
- `src/main.tsx` (entry point)

### 3. App Structure

**Created:**
- `app/` directory (Next.js App Router)
  - `layout.tsx` - Root layout with metadata
  - `page.tsx` - Home page component
- `public/` directory - Static assets

**Modified:**
- `src/app/App.tsx` - Added `'use client'` directive, updated asset imports

### 4. Asset Handling

**Changes:**
- Moved all assets from `src/assets/` to `public/`
- Updated all image imports to use direct paths (e.g., `/image.png` instead of imports)
- No need for image imports as Next.js serves from public directory

### 5. Environment Variables

**Changed:**
- `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*`
- Updated in `src/lib/api.ts`

### 6. Styling

**Modified:**
- Updated `src/styles/tailwind.css` to use standard Tailwind directives:
  - `@tailwind base`
  - `@tailwind components`
  - `@tailwind utilities`
- Maintained all custom CSS variables and theme configuration

### 7. Scripts

**Updated package.json scripts:**
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Verification Checklist

- ✅ All components render identically
- ✅ All animations work (motion/react)
- ✅ All styles applied correctly (Tailwind + custom CSS)
- ✅ All assets load properly
- ✅ GraphQL API calls work
- ✅ Environment variables configured
- ✅ TypeScript compilation successful
- ✅ No Vite dependencies remaining
- ✅ No import.meta.env references
- ✅ All paths updated for Next.js

## Running the Application

1. Install dependencies: `pnpm install`
2. Set environment variables in `.env`:
   ```
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4001/graphql
   ```
3. Run development server: `pnpm dev`
4. Open http://localhost:3000

## Key Differences

| Feature | Vite | Next.js |
|---------|------|---------|
| Entry Point | `src/main.tsx` | `app/page.tsx` |
| HTML Template | `index.html` | `app/layout.tsx` |
| Asset Directory | `src/assets/` | `public/` |
| Env Variables | `import.meta.env.VITE_*` | `process.env.NEXT_PUBLIC_*` |
| Client Components | Default | Needs `'use client'` |
| Dev Server | `vite` | `next dev` |
| Build Output | `dist/` | `.next/` |

## No Functional Changes

The migration maintains 100% feature parity:
- Same UI/UX
- Same component behavior
- Same API integration
- Same routing flow
- Same animations and interactions
- Same asset handling
- Same environment configuration

All user-facing functionality remains identical.
