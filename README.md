# Year on Starknet 2024 Wrapped

This is a Next.js application for Year on Starknet 2024 Wrapped. The original project is available at https://www.figma.com/design/yqH4TgiOLlPMTD8MetJ04k/Year-on-Starknet-2024-Wrapped.

## Tech Stack

- **Next.js 15** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion** - Animations
- **GraphQL** - API queries

## Getting Started

### Prerequisites

- Node.js 18+ or pnpm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the root directory:

```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4001/graphql
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── src/
│   ├── app/             # React components
│   │   └── App.tsx      # Main app component
│   ├── imports/         # SVG and component imports
│   ├── lib/             # Utility libraries
│   │   ├── api.ts       # GraphQL API calls
│   │   └── dataMapper.ts # Data mapping utilities
│   ├── styles/          # CSS styles
│   └── types/           # TypeScript types
├── public/              # Static assets
└── next.config.js       # Next.js configuration
```

## Features

- **Landing Screen** - Connect wallet and Twitter
- **Dashboard** - View your wrapped stats organized in Acts
- **Act Viewer** - Interactive cards showing your DeFi journey
- **NFT Cards** - Shareable summary cards for social media
- **Mentor Mode** - Special turquoise theme toggle

## Environment Variables

- `NEXT_PUBLIC_GRAPHQL_ENDPOINT` - GraphQL API endpoint (default: http://localhost:4001/graphql)

## Conversion from Vite to Next.js

This app was converted from Vite + React to Next.js while maintaining all original functionality:

- ✅ All components work identically
- ✅ Same styling and animations
- ✅ Same user experience
- ✅ API calls updated for Next.js environment variables
- ✅ Asset handling optimized for Next.js public directory
