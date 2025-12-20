'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import {
  RefreshCw,
  Download,
  Share2,
  X,
  Check,
  Sparkles,
  RotateCw,
  Rocket,
  Bomb,
  Coins,
  Bot,
  TrendingUp,
  TrendingDown,
  Unlock,
  Vote,
  Zap,
  Globe,
  DollarSign,
  Fuel,
  Crown,
  FileText,
  Sprout,
  GraduationCap,
  FlaskConical,
  Laptop,
  PenTool,
  Trophy,
  Search,
  BarChart3,
  Users,
  Link,
  Clock,
  Lock,
  Building2,
  Target,
  Newspaper,
  Video,
  Mic,
  BookOpen,
  Globe2,
  Handshake,
  User,
  Shield,
  Gift,
  Megaphone,
  Banknote,
  CreditCard,
  Bell,
  ArrowRight,
  ArrowLeft,
  Activity,
  Network,
  type LucideIcon,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import {
  PersonalityType,
  type ResolutionItem,
  getItemsByTypes,
  getRandomItemsForGrid,
} from '../data/resolutions';
import { Button } from './components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './components/ui/tooltip';
import { handleTwitterSignIn, handleSignOut } from '../actions/auth';

// Title suggestion: "Crypto Resolutions 2025 → 2026"
const APP_TITLE = 'Crypto Resolutions 2025 → 2026';

type TileState = 'completed-2025' | 'planned-2026' | 'none';

// Special Endur staking items
const ENDUR_STAKING_ITEMS: ResolutionItem[] = [
  {
    id: 'endur-btc',
    text: 'Stake BTC on Endur',
    icon: '💰', // Will be mapped to Coins or similar
    category: 'Other User' as PersonalityType,
    intensity: 'actionable',
  },
  {
    id: 'endur-strk',
    text: 'Stake STRK on Endur',
    icon: '💰', // Will be mapped to Coins or similar
    category: 'Other User' as PersonalityType,
    intensity: 'actionable',
  },
];

// Check if an item is an Endur staking item
function isEndurStakingItem(item: ResolutionItem): boolean {
  return item.id === 'endur-btc' || item.id === 'endur-strk';
}

// Generate a consistent random position for stamp based on tile ID (using percentages)
function getStampPosition(tileId: string): { x: number; y: number } {
  // Use tile ID as seed for consistent positioning
  let hash = 0;
  for (let i = 0; i < tileId.length; i++) {
    hash = ((hash << 5) - hash) + tileId.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
  }
  
  // Generate pseudo-random values from hash
  const seed1 = Math.abs(hash) % 1000;
  const seed2 = Math.abs(hash * 7919) % 1000;
  
  // Random position using percentages (stamp is ~45px, so keep 10-15% from edges)
  // Position between 10% and 70% to ensure stamp fits within tile
  const minPercent = 10;
  const maxPercent = 70;
  
  const xPercent = minPercent + (seed1 / 1000) * (maxPercent - minPercent);
  const yPercent = minPercent + (seed2 / 1000) * (maxPercent - minPercent);
  
  return { x: xPercent, y: yPercent };
}

// Todo Stamp Component - Rectangular stamp for planned items
function TodoStamp({ position }: { position: { x: number; y: number } }) {
  const uniqueId = `todo-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '50px',
        height: '50px',
        transform: 'translate(-50%, -50%)',
        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))',
      }}
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 30"
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        <defs>
          <filter id={`todo-grunge-${uniqueId}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              baseFrequency="0.7 0.8"
              numOctaves="3"
              result="noise"
              seed={Math.floor(Math.random() * 1000)}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <pattern
            id={`todo-noise-${uniqueId}`}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="#FFD93D" opacity="0.5" />
            <circle cx="20" cy="20" r="1" fill="#FFC107" opacity="0.3" />
            <circle cx="50" cy="30" r="0.5" fill="#FFC107" opacity="0.4" />
            <circle cx="70" cy="60" r="1.5" fill="#FFC107" opacity="0.2" />
          </pattern>
        </defs>
        
        {/* Circular stamp background - yellow translucent */}
        <circle
          cx="25"
          cy="15"
          r="20"
          fill={`url(#todo-noise-${uniqueId})`}
          stroke="#000000"
          strokeWidth="2"
          filter={`url(#todo-grunge-${uniqueId})`}
          style={{
            opacity: 0.9, // Translucent yellow
          }}
        />
        
        {/* Todo text */}
        <text
          x="25"
          y="20"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          style={{
            opacity: 0.9,
          }}
        >
          TODO
        </text>
      </svg>
    </div>
  );
}

// Stamp Component - Realistic circular stamp with grunge texture
function CompletedStamp({ position }: { position: { x: number; y: number } }) {
  const uniqueId = `stamp-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '45px',
        height: '45px',
        transform: 'translate(-50%, -50%)', // Center the stamp on the position
        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))',
      }}
    >
      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        <defs>
          {/* Grunge texture pattern */}
          <filter id={`grunge-${uniqueId}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              baseFrequency="0.8 0.9"
              numOctaves="3"
              result="noise"
              seed={Math.floor(Math.random() * 1000)}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          {/* Noise texture for grunge effect */}
          <pattern
            id={`noise-${uniqueId}`}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="#6BCF7F" opacity="0.5" />
            <circle cx="20" cy="20" r="1" fill="#4FA86B" opacity="0.3" />
            <circle cx="50" cy="30" r="0.5" fill="#4FA86B" opacity="0.4" />
            <circle cx="70" cy="60" r="1.5" fill="#4FA86B" opacity="0.2" />
            <circle cx="30" cy="70" r="0.8" fill="#4FA86B" opacity="0.35" />
            <circle cx="80" cy="20" r="1" fill="#4FA86B" opacity="0.25" />
          </pattern>
        </defs>
        
        {/* Outer circle with grunge texture - green translucent */}
        <circle
          cx="22.5"
          cy="22.5"
          r="20"
          fill={`url(#noise-${uniqueId})`}
          stroke="#000000"
          strokeWidth="2.5"
          filter={`url(#grunge-${uniqueId})`}
          style={{
            opacity: 0.9, // Translucent green
          }}
        />
        
        {/* Inner circle border for stamp effect */}
        <circle
          cx="22.5"
          cy="22.5"
          r="16"
          fill="none"
          stroke="#000000"
          strokeWidth="1.5"
          opacity="0.8"
        />
        
        {/* Tick mark - bold and white */}
        <path
          d="M 14 22.5 L 19 27.5 L 31 15.5"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))',
          }}
        />
      </svg>
    </div>
  );
}

// Icon mapping - maps emoji/string to lucide-react icons
const iconMap: Record<string, LucideIcon> = {
  '💣': Bomb,
  '🚀': Rocket,
  '💸': Coins,
  '🤖': Bot,
  '🎰': Activity,
  '📈': TrendingUp,
  '🌉': Network,
  '🔓': Unlock,
  '🗳️': Vote,
  '⚡': Zap,
  '🌐': Globe,
  '📉': TrendingDown,
  '💱': DollarSign,
  '⛽': Fuel,
  '👑': Crown,
  '📝': FileText,
  '🌱': Sprout,
  '🎓': GraduationCap,
  '🧪': FlaskConical,
  '💻': Laptop,
  '✍️': PenTool,
  '🏆': Trophy,
  '🔍': Search,
  '📊': BarChart3,
  '👥': Users,
  '🔗': Link,
  '⏰': Clock,
  '🔐': Lock,
  '💰': Coins,
  '🏦': Building2,
  '🎯': Target,
  '📰': Newspaper,
  '🎥': Video,
  '🎙️': Mic,
  '📖': BookOpen,
  '🌍': Globe2,
  '🤝': Handshake,
  '👤': User,
  '🛡️': Shield,
  '🎁': Gift,
  '📢': Megaphone,
  '💵': Banknote,
  '💳': CreditCard,
  '🔔': Bell,
  '→': ArrowRight,
  '←': ArrowLeft,
  '✓': Check,
};

// Get icon component from string/emoji
function getIconComponent(iconString: string): LucideIcon {
  // Handle bridge emoji specially
  if (iconString === '🌉') {
    return Network;
  }
  return iconMap[iconString] || Rocket; // Default to Rocket if not found
}

// Colorful card background colors - Neubrutalist vibrant palette (no green or yellow)
const cardColors = [
  '#C77DFF', // Vibrant Purple (like "POWER USER")
  '#4D96FF', // Sky Blue (like "DEFI PRO")
  '#FF6B9D', // Pink
  '#FFA07A', // Orange (for gradient effects)
  '#FFB6C1', // Light Pink
  '#FF8C94', // Coral Pink
  '#3498DB', // Bright Blue
  '#E74C3C', // Red
  '#F39C12', // Orange (darker)
];

// Neon brutal turquoise palette
const turquoiseColors = [
  '#00FFEF', // Neon Turquoise
  '#00E6D6', // Bright Turquoise
  '#00CCBF', // Medium Turquoise
  '#00B3A8', // Dark Turquoise
  '#00FFD9', // Cyan-Turquoise
  '#00E6C2', // Aqua Turquoise
  '#00CCAB', // Teal Turquoise
  '#00B394', // Deep Turquoise
  '#00FFC7', // Light Cyan
  '#00E6B3', // Medium Cyan
];

interface GridTile {
  id: string;
  item: ResolutionItem;
  state: TileState;
  stampPosition?: { x: number; y: number }; // Random position for stamp
}

type Screen = 'personality-selection' | 'grid-view';

function PersonalitySelectionScreen({
  onComplete,
  session,
  isTurquoiseMode,
  toggleTurquoiseMode,
}: {
  onComplete: (types: PersonalityType[]) => void;
  session: any;
  isTurquoiseMode: boolean;
  toggleTurquoiseMode: () => void;
}) {
  const [selectedTypes, setSelectedTypes] = useState<PersonalityType[]>([]);

  const personalityTypes: PersonalityType[] = [
    'Developer',
    'DeFi User',
    'Content Writer',
    'Marketer',
    'Founder',
    'Farmer',
    'Other User',
  ];

  const toggleType = (type: PersonalityType) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleContinue = () => {
    if (selectedTypes.length === 0) {
      toast.error('Please select at least one personality type');
      return;
    }
    onComplete(selectedTypes);
  };

  const bgColor = isTurquoiseMode ? '#00FFEF' : '#014a42';
  const accentColor = isTurquoiseMode ? '#00FFEF' : '#00DE71';

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Turquoise Toggle Button */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            onClick={toggleTurquoiseMode}
            className="border-4 border-black font-black text-sm px-4 py-2"
            style={{
              backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71',
              color: '#000000',
            }}
          >
            gTurquoise
          </Button>
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center max-w-4xl w-full"
        >
          {/* Title */}
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-5xl md:text-8xl font-black mb-8 leading-none"
            style={{
              color: isTurquoiseMode ? '#0b8074' : accentColor,
              textShadow: '4px 4px 0px #000000',
            }}
          >
            {APP_TITLE}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-bold mb-12"
            style={{
              color: isTurquoiseMode ? '#000000' : '#ffffff',
            }}
          >
            Choose your personality types (select one or more)
          </motion.p>

          {/* Personality Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {personalityTypes.map((type) => {
              const isSelected = selectedTypes.includes(type);
              return (
                <motion.button
                  key={type}
                  onClick={() => toggleType(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-6 border-4 border-black rounded-2xl font-black text-xl transition-all ${
                    isSelected
                      ? 'bg-[#00DE71] text-black'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? '8px 8px 0px 0px rgba(0,0,0,0.3)'
                      : '4px 4px 0px 0px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{type}</span>
                    {isSelected && <Check className="w-6 h-6" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={handleContinue}
            disabled={selectedTypes.length === 0}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-3 px-8 py-6 bg-black text-white border-4 border-black rounded-2xl font-black text-xl md:text-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: `8px 8px 0px 0px ${accentColor}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${accentColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `8px 8px 0px 0px ${accentColor}`;
            }}
          >
            <span>GENERATE YOUR GRID</span>
            <Sparkles className="w-6 h-6" />
          </motion.button>

          {/* Auth Section */}
          {session && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-10 h-10 rounded-full border-2 border-black"
                  />
                )}
                <span className="text-white font-bold">{session.user?.name || 'User'}</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-black bg-white text-black font-bold"
              >
                Sign Out
              </Button>
            </motion.div>
          )}

          {!session && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <Button
                onClick={handleTwitterSignIn}
                className="bg-black text-white border-4 border-black font-bold hover:bg-gray-900"
              >
                Sign in with X
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function GridViewScreen({
  personalityTypes,
  session,
  onBack,
  isTurquoiseMode,
  toggleTurquoiseMode,
}: {
  personalityTypes: PersonalityType[];
  session: any;
  onBack: () => void;
  isTurquoiseMode: boolean;
  toggleTurquoiseMode: () => void;
}) {
  const [grid, setGrid] = useState<GridTile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null); // Separate ref for download (only username/pic and grid)

  const generateNewGrid = useCallback(() => {
    setIsGenerating(true);
    const items = getItemsByTypes(personalityTypes);
    
    // Get 23 random items (24 total - 1 for Endur card)
    const randomItems = getRandomItemsForGrid(items, 23);
    
    // Randomly choose one Endur staking item
    const endurItem = ENDUR_STAKING_ITEMS[Math.floor(Math.random() * ENDUR_STAKING_ITEMS.length)];
    
    // Combine all items
    const allItems = [...randomItems, endurItem];
    
    // Create grid tiles with random stamp positions
    const tiles: GridTile[] = allItems.map((item) => {
      const tileId = `tile-${Math.random().toString(36).substr(2, 9)}`;
      return {
        id: tileId,
        item,
        state: 'none' as TileState,
        stampPosition: getStampPosition(tileId), // Pre-generate position
      };
    });
    
    // Shuffle tiles, but give higher probability to Endur card in first 2 rows (positions 0-11)
    const shuffledTiles = [...tiles];
    const endurTileIndex = shuffledTiles.findIndex(t => isEndurStakingItem(t.item));
    
    if (endurTileIndex !== -1) {
      // Remove Endur tile from its current position
      const [endurTile] = shuffledTiles.splice(endurTileIndex, 1);
      
      // Higher probability for first 2 rows (positions 0-11 in 6x4 grid)
      // 70% chance in first 2 rows, 30% chance in last 2 rows
      let targetPosition: number;
      if (Math.random() < 0.7) {
        // First 2 rows: positions 0-11
        targetPosition = Math.floor(Math.random() * 12);
      } else {
        // Last 2 rows: positions 12-23
        targetPosition = 12 + Math.floor(Math.random() * 12);
      }
      
      // Insert Endur tile at target position
      shuffledTiles.splice(targetPosition, 0, endurTile);
    }
    
    setGrid(shuffledTiles);
    setIsGenerating(false);
  }, [personalityTypes]);

  // Initialize grid
  useEffect(() => {
    generateNewGrid();
  }, [generateNewGrid]);

  const refreshTile = (tileId: string) => {
    const currentTile = grid.find(t => t.id === tileId);
    if (!currentTile) return;
    
    // Special handling for Endur staking items - only switch between BTC and STRK
    if (isEndurStakingItem(currentTile.item)) {
      const otherEndurItem = ENDUR_STAKING_ITEMS.find(item => item.id !== currentTile.item.id);
      if (otherEndurItem) {
        setGrid((prev) =>
          prev.map((tile) =>
            tile.id === tileId ? { ...tile, item: otherEndurItem } : tile
          )
        );
      }
      return;
    }
    
    // Regular refresh for other tiles
    const items = getItemsByTypes(personalityTypes);
    // Exclude Endur items and current grid items
    const currentItemIds = grid.map((t) => t.item.id);
    const endurItemIds = ENDUR_STAKING_ITEMS.map(item => item.id);
    const availableItems = items.filter(item => 
      !currentItemIds.includes(item.id) && !endurItemIds.includes(item.id)
    );
    
    if (availableItems.length === 0) {
      // Fallback: use any item except Endur items
      const fallbackItems = items.filter(item => !endurItemIds.includes(item.id));
      const newItem = fallbackItems[Math.floor(Math.random() * fallbackItems.length)];
      if (newItem) {
        setGrid((prev) =>
          prev.map((tile) =>
            tile.id === tileId ? { ...tile, item: newItem } : tile
          )
        );
      }
      return;
    }
    
    const newItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    setGrid((prev) =>
      prev.map((tile) =>
        tile.id === tileId ? { ...tile, item: newItem } : tile
      )
    );
  };

  const toggleTileState = (tileId: string) => {
    setGrid((prev) =>
      prev.map((tile) => {
        if (tile.id !== tileId) return tile;
        const nextState: Record<TileState, TileState> = {
          none: 'completed-2025',
          'completed-2025': 'planned-2026',
          'planned-2026': 'none',
        };
        // Ensure stamp position exists when marking as completed
        const newState = nextState[tile.state];
        return {
          ...tile,
          state: newState,
          stampPosition: tile.stampPosition || getStampPosition(tile.id),
        };
      })
    );
  };

  const downloadImage = async () => {
    if (!downloadRef.current) return;

    try {
      toast.loading('Generating image...');
      const canvas = await html2canvas(downloadRef.current, {
        backgroundColor: '#6bcf7f', // Match the card background
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `crypto-resolutions-2025-2026-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.dismiss();
      toast.success('Image downloaded!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate image');
      console.error(error);
    }
  };

  const shareOnX = () => {
    const text = encodeURIComponent(`Check out my ${APP_TITLE}! 🚀`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
    toast.info('Tip: Attach the downloaded image when posting on X!');
  };

  const getTileStyle = (state: TileState, index: number) => {
    const baseColor = isTurquoiseMode 
      ? turquoiseColors[index % turquoiseColors.length]
      : cardColors[index % cardColors.length];
    // Always return the base color, don't change background for completed/todo states
    return {
      backgroundColor: baseColor,
      borderColor: '#000000',
    };
  };

  const bgColor = isTurquoiseMode ? '#00FFEF' : '#014a42';

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto w-full p-4 md:p-6">
        {/* Header with refresh button */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-4 border-black bg-white text-black font-bold hover:bg-gray-100"
          >
            <X className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Button
              onClick={toggleTurquoiseMode}
              className="border-4 border-black font-black text-sm px-4 py-2"
              style={{
                backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71',
                color: '#000000',
              }}
            >
              gTurquoise
            </Button>
            <Button
              onClick={generateNewGrid}
              disabled={isGenerating}
              className="border-4 border-black bg-black text-white font-bold hover:bg-gray-900"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              Refresh Grid
            </Button>
          </div>
        </div>

        {/* Main Card */}
        <div
          ref={cardRef}
          className="border-4 border-black rounded-2xl p-4 md:p-6"
          style={{ 
            backgroundColor: isTurquoiseMode ? '#00FFEF' : '#6bcf7f', // Neubrutal turquoise or green
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)', // Strong black shadow like inspiration
          }}
        >
          {/* Download section (includes profile when user connected, and grid) */}
          <div ref={downloadRef} className="rounded-xl p-4 md:p-6" style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#6bcf7f' }}>
            {/* User Profile Section (for display and download) */}
            {session?.user ? (
              <div className="flex items-center gap-4 mb-4 pb-4 border-b-4 border-black">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-black"
                  />
                )}
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-black">
                    {session.user.name || 'Crypto User'}
                  </h2>
                  <p className="text-base md:text-lg font-bold text-gray-600">{APP_TITLE}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Show "Connect X" button in main view */}
                <button
                  onClick={handleTwitterSignIn}
                  className="w-full flex items-center gap-4 mb-4 pb-4 border-b-4 border-black hover:bg-gray-100 transition-colors cursor-pointer text-left p-2 rounded-lg"
                  style={{
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-black bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 md:w-8 md:h-8 text-black" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-black">
                      Connect X
                    </h2>
                    <p className="text-base md:text-lg font-bold text-gray-600">
                      Click to connect and personalise the card with your Info
                    </p>
                  </div>
                </button>
                {/* Show cursive title in download section when no user */}
                <div className="mb-4 text-center pb-4 border-b-4 border-black">
                  <h2
                    className="text-2xl md:text-3xl font-black text-black mb-2"
                    style={{
                      fontFamily: 'cursive',
                      fontStyle: 'italic',
                    }}
                  >
                    My 2025-2026 Crypto Resolutions Card
                  </h2>
                </div>
              </>
            )}

            {/* 6x4 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-3">
              {grid.map((tile, index) => {
                const style = getTileStyle(tile.state, index);
                const IconComponent = getIconComponent(tile.item.icon);
                return (
                  <motion.div
                    key={tile.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative border-4 rounded-[10px] p-1.5 md:p-[20px] cursor-pointer group transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: style.backgroundColor,
                      borderColor: style.borderColor,
                      boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)', // Strong black drop shadow like inspiration
                    }}
                    onClick={() => toggleTileState(tile.id)}
                  >
                    {/* Refresh Icon */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            refreshTile(tile.id);
                          }}
                          className="absolute top-1 right-1 w-6 h-6 md:w-7 md:h-7 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 border-2 border-white"
                          style={{
                            boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.5)',
                          }}
                        >
                          <RotateCw className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Switch to a new item</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Tile Content */}
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="mb-1.5 md:mb-2">
                        <IconComponent 
                          className="w-5 h-5 md:w-6 md:h-6 text-black" 
                          strokeWidth={3}
                          style={{
                            filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))',
                          }}
                        />
                      </div>
                      <p 
                        className="text-[9px] md:text-[11px] font-black leading-tight text-black uppercase tracking-tight"
                        style={{
                          textShadow: '1px 1px 0px rgba(255,255,255,0.5)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {tile.item.text}
                      </p>
                    </div>

                    {/* Completed Stamp */}
                    {tile.state === 'completed-2025' && (
                      <CompletedStamp
                        position={tile.stampPosition || getStampPosition(tile.id)}
                      />
                    )}

                    {/* Todo Stamp */}
                    {tile.state === 'planned-2026' && (
                      <TodoStamp
                        position={tile.stampPosition || getStampPosition(tile.id)}
                      />
                    )}

                    {/* State Indicator */}
                    {tile.state !== 'none' && (
                      <div className="absolute bottom-1 left-1 z-10">
                        {tile.state === 'completed-2025' && (
                          <span 
                            className="text-[8px] md:text-[9px] font-black bg-black text-white px-1.5 py-1 rounded border-2 border-white uppercase"
                            style={{
                              boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.5)',
                            }}
                          >
                            ✓ 2025
                          </span>
                        )}
                        {tile.state === 'planned-2026' && (
                          <span 
                            className="text-[8px] md:text-[9px] font-black bg-black text-white px-1.5 py-1 rounded border-2 border-white uppercase"
                            style={{
                              boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.5)',
                            }}
                          >
                            → 2026
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer for downloaded card */}
            <div 
              className="mt-6 pt-4 border-t-4 border-black text-right"
              style={{
                borderTopWidth: '4px',
              }}
            >
              <p className="text-xs md:text-sm font-black text-black leading-relaxed uppercase tracking-wide">
                Do more on-chain. Share no private keys. Do more with your BTC.
                <br />
                Happy New Year - From team Endur.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div 
          className="mt-4 mb-4 p-4 bg-white border-4 border-black rounded-xl uppercase"
          style={{
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <p className="text-xs md:text-sm font-black text-black leading-relaxed">
            <strong>Tip:</strong> Click a tile to mark it as completed in 2025 or planned for 2026. 
            Hover over tiles to refresh individual items.
          </p>
        </div>

        {/* Share Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            onClick={downloadImage}
            className="flex-1 border-4 border-black bg-black text-white font-black text-lg py-6 hover:bg-gray-900 uppercase"
            style={{
              boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
            }}
          >
            <Download className="w-5 h-5 mr-2" strokeWidth={2.5} />
            Download
          </Button>
          <Button
            onClick={shareOnX}
            className="flex-1 border-4 border-black bg-black text-white font-black text-lg py-6 hover:bg-gray-900 uppercase"
            style={{
              boxShadow: '6px 6px 0px 0px #FFD93D', // Yellow-orange bottom shadow like inspiration
            }}
          >
            <Share2 className="w-5 h-5 mr-2" strokeWidth={2.5} />
            Share on X
          </Button>
        </div>

        {/* Share Tip */}
        <div 
          className="mt-3 p-4 bg-yellow-100 border-4 border-black rounded-xl uppercase"
          style={{
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <p className="text-xs md:text-sm font-black text-black leading-relaxed">
            <strong>Remember:</strong> When posting on X, attach the downloaded image!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App({ session }: { session: any }) {
  const [screen, setScreen] = useState<Screen>('personality-selection');
  const [selectedPersonalityTypes, setSelectedPersonalityTypes] = useState<PersonalityType[]>([]);
  const [isTurquoiseMode, setIsTurquoiseMode] = useState(false);

  const toggleTurquoiseMode = () => {
    setIsTurquoiseMode((prev) => !prev);
  };

  const handlePersonalityComplete = (types: PersonalityType[]) => {
    setSelectedPersonalityTypes(types);
    setScreen('grid-view');
  };

  const handleBack = () => {
    setScreen('personality-selection');
  };

  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        {screen === 'personality-selection' && (
          <motion.div
            key="personality-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PersonalitySelectionScreen
              onComplete={handlePersonalityComplete}
              session={session}
              isTurquoiseMode={isTurquoiseMode}
              toggleTurquoiseMode={toggleTurquoiseMode}
            />
          </motion.div>
        )}

        {screen === 'grid-view' && (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GridViewScreen
              personalityTypes={selectedPersonalityTypes}
              session={session}
              onBack={handleBack}
              isTurquoiseMode={isTurquoiseMode}
              toggleTurquoiseMode={toggleTurquoiseMode}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
