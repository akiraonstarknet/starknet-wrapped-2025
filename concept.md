# Crypto Resolutions 2025 → 2026: Concept Document

## Concept

**Crypto Resolutions 2025 → 2026** is an interactive, personalized web application that generates custom crypto resolution cards for users. Inspired by New Year Bingo cards trend in social medias like Instagram/Tiktok, but modified for crypto style. 

The application combines:
- **Personalization** through personality-based resolution selection
- **Interactivity** with stamp-based progress tracking
- **Visual Design** using neubrutalist aesthetics with bold colors and typography
- **Social Sharing** capabilities for users to showcase their crypto goals

## Purpose

### Primary Goals

1. **Engagement & Reflection**: Encourage users to reflect on their crypto journey and set meaningful goals for 2025-2026
2. **Community Building**: Create shareable content that sparks conversations within the crypto community
3. **Education**: Present crypto-related activities and goals in an accessible, gamified format
4. **Brand Awareness**: Promote Endur staking (BTC/STRK) through strategic placement in the resolution grid

### Target Audience

- **Crypto Enthusiasts**: Active participants in DeFi, NFTs, and blockchain ecosystems
- **Developers**: Builders working on Web3 projects
- **Content Creators**: Writers, marketers, and influencers in the crypto space
- **Newcomers**: Users exploring crypto for the first time
- **Stakers**: Users interested in staking BTC or STRK on Endur

### Value Proposition

- **Personalized Experience**: Each user gets a unique set of resolutions based on their selected personality types
- **Visual Appeal**: Neubrutalist design makes the cards stand out on social media
- **Progress Tracking**: Users can mark resolutions as completed or planned, creating a sense of achievement
- **Shareability**: Download and share cards on X (Twitter) and other platforms

## Execution

### User Flow

#### 1. **Personality Selection Screen**
- Users land on a screen with a bold, neubrutalist design
- They can select one or more personality types:
  - Developer
  - DeFi User
  - Content Writer
  - Marketer
  - Founder
  - Farmer
  - Other User
- Each personality type has a distinct color and visual treatment
- Users can toggle "Turquoise Mode" for a special neon brutal turquoise theme
- Optional: Connect X (Twitter) account for personalized profile integration

#### 2. **Grid Generation & Customization**
- Upon selection, the app generates a 6×4 grid (24 tiles) of crypto resolutions
- **Resolution Selection Algorithm**:
  - Pulls 23 random resolutions from the selected personality types
  - Always includes 1 Endur staking item (BTC or STRK) with 70% probability in the first 2 rows
  - Each resolution has an intensity level: crazy, wild, moderate, or actionable
  - Mixes humorous/aspirational goals with practical, achievable ones

#### 3. **Interactive Grid View**
- **Grid Layout**:
  - Desktop: 6 columns × 4 rows
  - Mobile: 2 columns × 12 rows (responsive design)
- **Tile States**:
  - **None**: Default colorful tile with resolution text
  - **Completed-2025**: Green translucent stamp overlay (checkmark)
  - **Planned-2026**: Yellow translucent stamp overlay ("TODO")
- **Interactions**:
  - Click a tile to cycle through states: none → completed → planned → none
  - Hover over tiles to reveal refresh button (switches to a different resolution)
  - Refresh entire grid to generate new resolutions
- **Color System**:
  - Default: Vibrant palette (purple, blue, pink, orange, red, coral) - no green/yellow
  - Turquoise Mode: Neon brutal turquoise variants
  - Background colors remain consistent regardless of stamp state

#### 4. **Stamp System**
- **Completed Stamp**: 
  - Circular design with grunge texture
  - Translucent green background (#6BCF7F)
  - White checkmark icon
  - Random position on tile (deterministic based on tile ID)
- **Todo Stamp**:
  - Circular design with grunge texture
  - Translucent yellow background (#FFD93D)
  - "TODO" text in white
  - Random position on tile
- Stamps use SVG filters for realistic texture effects

#### 5. **Download & Share**
- Users can download their personalized card as a PNG image
- Download includes:
  - User profile (if X connected): Name and profile picture
  - Complete resolution grid with current stamp states
  - Card background in selected theme (green or turquoise)
- Share functionality opens X (Twitter) with pre-filled text
- Image generation uses `html2canvas` for high-quality exports

### Technical Architecture

#### Frontend Stack
- **Framework**: Next.js 15 with React 18
- **Styling**: Tailwind CSS with custom neubrutalist design system
- **Animations**: Motion (Framer Motion) for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks (useState, useCallback, useEffect)
- **Image Generation**: html2canvas for client-side image export

#### Authentication
- **X (Twitter) OAuth 2.0** integration via NextAuth.js
- Optional authentication for personalized experience
- Profile picture and name displayed when connected

#### Data Structure
- **Resolution Items**: 200+ predefined crypto resolutions
- **Personality Types**: 7 distinct categories
- **Intensity Levels**: 4 levels (crazy, wild, moderate, actionable)
- **Special Items**: Endur staking items (BTC/STRK) with special handling

#### Design System

**Neubrutalist Aesthetics**:
- Bold, black borders (4px)
- High contrast colors
- Strong drop shadows (6-8px)
- Rounded corners (10-20px)
- Thick, black typography (font-black)
- No gradients (flat colors only)

**Color Palettes**:
- **Default**: Purple (#C77DFF), Blue (#4D96FF), Pink (#FF6B9D), Orange (#FFA07A), Coral (#FF8C94), Red (#E74C3C)
- **Turquoise Mode**: Neon turquoise variants (#00FFEF, #00E6D6, #00CCBF, etc.)
- **Backgrounds**: Green (#6bcf7f) or Turquoise (#00FFEF) based on mode
- **Stamps**: Green (#6BCF7F) for completed, Yellow (#FFD93D) for todo

**Typography**:
- Bold, uppercase text for resolution tiles
- Font sizes: 9-11px (mobile), 11-13px (desktop)
- Letter spacing: Tight tracking for compact display
- Text shadows for depth

### Key Features

1. **Personality-Based Personalization**
   - Each personality type has 20-30 unique resolutions
   - Mix of humorous, aspirational, and actionable goals
   - Users can select multiple personalities for diverse grids

2. **Dynamic Grid Generation**
   - Random selection ensures unique experiences
   - Endur staking items strategically placed
   - Refresh functionality for new combinations

3. **Interactive State Management**
   - Three-state system (none/completed/planned)
   - Individual tile refresh capability
   - Grid-wide refresh option

4. **Visual Customization**
   - Turquoise mode toggle for alternative theme
   - Consistent color system across all tiles
   - Stamp overlays don't change base tile colors

5. **Social Integration**
   - X (Twitter) authentication
   - Profile integration when connected
   - Share functionality with pre-filled text
   - Downloadable image for social media

6. **Responsive Design**
   - Mobile-first approach
   - Adaptive grid layouts (2 cols mobile, 6 cols desktop)
   - Touch-friendly interactions

### User Experience Highlights

- **Immediate Gratification**: Instant grid generation upon personality selection
- **Visual Feedback**: Smooth animations and hover effects
- **Progress Visualization**: Stamps provide clear visual indicators
- **Shareability**: One-click download and share functionality
- **Personalization**: Unique grids based on user selections
- **Accessibility**: Works without authentication (optional enhancement)

### Design Philosophy

The app embraces **neubrutalist design principles**:
- **Bold & Unapologetic**: Thick borders, high contrast, strong shadows
- **Playful & Fun**: Humorous resolutions mixed with serious goals
- **Authentic**: No gradients, no subtlety - just bold, flat design
- **Accessible**: Clear typography, high contrast, intuitive interactions

### Future Enhancements (Potential)

- Wallet integration for on-chain verification
- NFT minting of resolution cards
- Community leaderboards
- Resolution tracking over time
- Integration with DeFi protocols for automatic completion detection
- Multi-language support
- Custom resolution creation

## Conclusion

**Crypto Resolutions 2025 → 2026** is a unique blend of gamification, personalization, and social sharing in the crypto space. By combining neubrutalist design with interactive stamp-based progress tracking, it creates an engaging experience that encourages users to reflect on their crypto journey while building community through shareable content.

The application successfully balances humor and practicality, making crypto goals accessible to both newcomers and veterans. The strategic integration of Endur staking items and X (Twitter) authentication creates natural touchpoints for community engagement and brand awareness.
