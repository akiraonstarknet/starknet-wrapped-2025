'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
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
  Code,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import {
  PersonalityType,
  Chain,
  type ResolutionItem,
  getItemsByTypes,
  getRandomItemsForGrid,
  getItemsByChain,
} from '../data/resolutions';
import { Button } from './components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './components/ui/tooltip';
import { handleTwitterSignIn, handleSignOut } from '../actions/auth';
import AnimatedDefiBackground from './components/AnimatedDefiBackground';

// Title suggestion: "Crypto Resolutions 2025 → 2026"
const APP_TITLE = 'My Crypto Bingo Card 2025-26';

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

// Running Banner Component - Bingo card themed
function RunningBanner({ isTurquoiseMode }: { isTurquoiseMode: boolean }) {
  const bannerSegment = `🎰 MY CRYPTO BINGO CARD 2025-26 • 💥 GOT REKT • 🔑 LOST PRIVATE KEYS • 🚀 100x's MEMECOINS • 📉 BOUGHT THE TOP • 💸 SOLD THE BOTTOM • 🎯 MISSED THE AIRDROP • 🔥 RUGGED AGAIN • 💎 DIAMOND HANDS • ⚡ POWERED BY ENDUR.FI • `;
  const bannerText = bannerSegment.repeat(4); // Repeat for seamless loop
  const textColor = isTurquoiseMode ? '#00FFEF' : '#00DE71';

  return (
    <div 
      className="bg-black h-[48px] relative w-full overflow-hidden z-30"
      style={{
        borderBottom: `4px solid ${textColor}`,
      }}
    >
      <div className="absolute inset-0 flex items-center">
        <div
          className="whitespace-nowrap flex banner-scroll"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '-0.4395px',
            color: textColor,
          }}
        >
          <span>{bannerText}</span>
          <span>{bannerSegment}</span>
        </div>
      </div>
    </div>
  );
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

// Completed Stamp Component - Big hand-drawn tick with bright blue neon glow
function CompletedStamp({ position }: { position: { x: number; y: number } }) {
  // Hand-drawn style checkmark with curved, organic lines - more natural and less perfect
  const checkPath = "M 10 35 Q 14 30, 20 36 Q 24 40, 30 32 Q 35 27, 42 24 Q 46 22, 50 20";
  
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '90px',
        height: '90px',
        transform: 'translate(-50%, -50%)',
        background: 'none',
        mixBlendMode: 'normal',
      }}
    >
      <svg
        width="90"
        height="90"
        viewBox="0 0 60 60"
        style={{
          overflow: 'visible',
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Glow layer - light blue, wider stroke */}
        <path
          d={checkPath}
          stroke="#00FFFF"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
          style={{
            filter: 'blur(4px)',
          }}
        />
        {/* Main tick mark - dark blue, hand-drawn style */}
        <path
          d={checkPath}
          stroke="#000080"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
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

// Light card background colors - Neubrutalist vibrant palette (no green or yellow)
const cardColors = [
  '#E8D5FF', // Light Purple
  '#B3D9FF', // Light Sky Blue
  '#FFC0D9', // Light Pink
  '#FFD4B3', // Light Orange
  '#FFE0E6', // Very Light Pink
  '#FFC5CA', // Light Coral Pink
  '#A8D5F5', // Light Blue
  '#FFB3B3', // Light Red
  '#FFD699', // Light Orange
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
  onComplete: (types: PersonalityType[], chains: Chain[]) => void;
  session: any;
  isTurquoiseMode: boolean;
  toggleTurquoiseMode: () => void;
}) {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<PersonalityType[]>([]);
  const [selectedChains, setSelectedChains] = useState<Chain[]>([]);
  
  // Shuffle chains each time component mounts
  const [shuffledChains] = useState<Chain[]>(() => {
    const chains: Chain[] = ['Starknet', 'Ethereum', 'Bitcoin', 'Base', 'Solana'];
    return chains.sort(() => 0.5 - Math.random());
  });

  const personalityTypes: PersonalityType[] = [
    'Developer',
    'DeFi User',
    'Content Writer',
    'Marketer',
    'Founder',
    'Farmer',
    'Other User',
  ];

  // Light gradient backgrounds for personality type cards
  const lightGradients = [
    'linear-gradient(135deg, #E8D5FF 0%, #D4B3FF 100%)', // Light purple
    'linear-gradient(135deg, #B3D9FF 0%, #99C7FF 100%)', // Light sky blue
    'linear-gradient(135deg, #FFC0D9 0%, #FFA8CC 100%)', // Light pink
    'linear-gradient(135deg, #FFD4B3 0%, #FFC299 100%)', // Light orange
    'linear-gradient(135deg, #FFE0E6 0%, #FFCCD9 100%)', // Very light pink
    'linear-gradient(135deg, #FFC5CA 0%, #FFB3BA 100%)', // Light coral pink
    'linear-gradient(135deg, #A8D5F5 0%, #8FC5F0 100%)', // Light blue
    'linear-gradient(135deg, #FFD699 0%, #FFCC80 100%)', // Light peach
    'linear-gradient(135deg, #E0F0FF 0%, #CCE5FF 100%)', // Light cyan
    'linear-gradient(135deg, #FFF0E6 0%, #FFE6CC 100%)', // Light cream
    'linear-gradient(135deg, #F0E6FF 0%, #E6CCFF 100%)', // Light lavender
    'linear-gradient(135deg, #E6F5FF 0%, #CCEBFF 100%)', // Light ice blue
  ];

  // Get consistent gradient for a personality type based on its name
  const getGradientForType = (type: string): string => {
    let hash = 0;
    for (let i = 0; i < type.length; i++) {
      hash = ((hash << 5) - hash) + type.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    const index = Math.abs(hash) % lightGradients.length;
    return lightGradients[index];
  };

  // Get icon for each personality type
  const getIconForType = (type: PersonalityType): LucideIcon => {
    const iconMap: Record<PersonalityType, LucideIcon> = {
      'Developer': Code,
      'DeFi User': Wallet,
      'Content Writer': PenTool,
      'Marketer': Megaphone,
      'Founder': Crown,
      'Farmer': Sprout,
      'Other User': User,
    };
    return iconMap[type] || User;
  };

  // Chain logo components
  const ChainLogo = ({ chain }: { chain: Chain }) => {
    const size = 20;
    switch (chain) {
      case 'Starknet':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'Ethereum':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M12 2L5 12L12 16L19 12L12 2Z" fill="currentColor"/>
            <path d="M5 12L12 16L19 12L12 22L5 12Z" fill="currentColor" opacity="0.6"/>
          </svg>
        );
      case 'Bitcoin':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M10.5 8.5H13.5C14.6 8.5 15.5 9.4 15.5 10.5C15.5 11.6 14.6 12.5 13.5 12.5H10.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5 12.5H14.5C15.6 12.5 16.5 13.4 16.5 14.5C16.5 15.6 15.6 16.5 14.5 16.5H10.5V12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5 6V8.5M10.5 16.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      case 'Base':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="currentColor"/>
          </svg>
        );
      case 'Solana':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M4 6L12 2L20 6L12 10L4 6Z" fill="currentColor"/>
            <path d="M4 12L12 8L20 12L12 16L4 12Z" fill="currentColor" opacity="0.6"/>
            <path d="M4 18L12 14L20 18L12 22L4 18Z" fill="currentColor" opacity="0.4"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const toggleType = (type: PersonalityType) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const toggleChain = (chain: Chain) => {
    setSelectedChains((prev) =>
      prev.includes(chain)
        ? prev.filter((c) => c !== chain)
        : [...prev, chain]
    );
  };

  const handleContinue = () => {
    if (selectedTypes.length === 0) {
      toast.error('Please select at least one personality type');
      return;
    }
    onComplete(selectedTypes, selectedChains);
  };

  const bgColor = isTurquoiseMode ? '#00FFEF' : '#014a42';
  const accentColor = isTurquoiseMode ? '#00FFEF' : '#00DE71';

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <AnimatedDefiBackground />
      <RunningBanner isTurquoiseMode={isTurquoiseMode} />
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Header Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          <Button
            onClick={() => router.push('/endur-wrapped')}
            className="border-4 border-black bg-black text-white font-black text-base px-6 py-3 hover:bg-gray-900 uppercase"
            style={{
              boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
            }}
          >
            Endur Wrapped
          </Button>
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
            className="text-xl md:text-2xl font-bold mb-8"
            style={{
              color: isTurquoiseMode ? '#000000' : '#ffffff',
            }}
          >
            Choose your personality types (select one or more)
          </motion.p>

          {/* Personality Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {personalityTypes.map((type) => {
              const isSelected = selectedTypes.includes(type);
              const gradientBg = getGradientForType(type);
              const IconComponent = getIconForType(type);
              return (
                <motion.button
                  key={type}
                  onClick={() => toggleType(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 border-4 border-black rounded-2xl font-black text-xl transition-all ${
                    isSelected
                      ? 'text-black'
                      : 'text-black'
                  }`}
                  style={{
                    background: isSelected
                      ? '#00DE71'
                      : gradientBg,
                    boxShadow: isSelected
                      ? '8px 8px 0px 0px rgba(0,0,0,0.3)'
                      : '4px 4px 0px 0px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
                      <span>{type}</span>
                    </div>
                    {isSelected && <Check className="w-6 h-6 flex-shrink-0" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Chain Selection (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <motion.p
              className="text-lg md:text-xl font-bold mb-4"
              style={{
                color: isTurquoiseMode ? '#000000' : '#c4c4c4',
              }}
            >
              Select chains (optional) - personalizes some resolutions
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {shuffledChains.map((chain) => {
                const isSelected = selectedChains.includes(chain);
                return (
                  <motion.button
                    key={chain}
                    onClick={() => toggleChain(chain)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 md:p-4 rounded-full font-black text-sm md:text-base transition-all ${
                      isSelected
                        ? isTurquoiseMode ? 'bg-[#00DE71] text-black' : 'bg-[#00DE71] text-white'
                        : isTurquoiseMode ? 'bg-transparent text-black' : 'bg-transparent text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <ChainLogo chain={chain} />
                      <span>{chain}</span>
                      {isSelected && <Check className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

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
                <span className={`${isTurquoiseMode ? 'text-black' : 'text-white'} font-bold`}>{session.user?.name || 'User'}</span>
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
  chains,
  session,
  onBack,
  isTurquoiseMode,
  toggleTurquoiseMode,
}: {
  personalityTypes: PersonalityType[];
  chains: Chain[];
  session: any;
  onBack: () => void;
  isTurquoiseMode: boolean;
  toggleTurquoiseMode: () => void;
}) {
  const [grid, setGrid] = useState<GridTile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [profileImageDataUrl, setProfileImageDataUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null); // Separate ref for download (only username/pic and grid)

  // Convert profile image to data URL to avoid CORS issues
  useEffect(() => {
    if (session?.user?.image) {
      // Use API route to proxy the image and convert to data URL
      const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(session.user.image)}`;
      fetch(proxyUrl)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch image');
          return response.blob();
        })
        .then(blob => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const dataUrl = reader.result as string;
              resolve(dataUrl);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
        .then(dataUrl => {
          setProfileImageDataUrl(dataUrl);
        })
        .catch(error => {
          console.error('Failed to convert image to data URL:', error);
          // Fallback to original URL
          setProfileImageDataUrl(session.user.image);
        });
    } else {
      setProfileImageDataUrl(null);
    }
  }, [session?.user?.image]);

  const generateNewGrid = useCallback(() => {
    setIsGenerating(true);
    const personalityItems = getItemsByTypes(personalityTypes);
    const chainSpecificItems = chains.length > 0 ? getItemsByChain(chains) : [];
    
    // Calculate how many chain-specific items to include (30-50% of remaining = 5-7 items)
    const chainItemCount = chains.length > 0 
      ? Math.floor(Math.random() * 3) + 5 // Random between 5-7
      : 0;
    
    // Get chain-specific items
    const selectedChainItems = chainSpecificItems.length > 0
      ? getRandomItemsForGrid(chainSpecificItems, chainItemCount)
      : [];
    
    // Get remaining items from personality types (15 - chain items - 1 Endur)
    const remainingCount = 15 - selectedChainItems.length - 1; // -1 for Endur card
    const personalitySelectedItems = getRandomItemsForGrid(personalityItems, remainingCount);
    
    // Randomly choose one Endur staking item
    const endurItem = ENDUR_STAKING_ITEMS[Math.floor(Math.random() * ENDUR_STAKING_ITEMS.length)];
    
    // Combine all items
    const allItems = [...personalitySelectedItems, ...selectedChainItems, endurItem];
    
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
    
    // Shuffle all tiles randomly first
    const shuffledTiles = [...tiles].sort(() => Math.random() - 0.5);
    
    // Then give higher probability to Endur card in first 2 rows (positions 0-9 in 5x3 grid)
    const endurTileIndex = shuffledTiles.findIndex(t => isEndurStakingItem(t.item));
    
    if (endurTileIndex !== -1) {
      // Remove Endur tile from its current position
      const [endurTile] = shuffledTiles.splice(endurTileIndex, 1);
      
      // Higher probability for first 2 rows (positions 0-9 in 5x3 grid)
      // 70% chance in first 2 rows, 30% chance in last row
      let targetPosition: number;
      if (Math.random() < 0.7) {
        // First 2 rows: positions 0-9
        targetPosition = Math.floor(Math.random() * 10);
      } else {
        // Last row: positions 10-14
        targetPosition = 10 + Math.floor(Math.random() * 5);
      }
      
      // Insert Endur tile at target position
      shuffledTiles.splice(targetPosition, 0, endurTile);
    }
    
    setGrid(shuffledTiles);
    setIsGenerating(false);
  }, [personalityTypes, chains]);

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
    
    // Check if current tile is chain-specific
    const isChainItem = currentTile.item.chain !== undefined;
    
    // Regular refresh for other tiles
    const personalityItems = getItemsByTypes(personalityTypes);
    const chainItems = chains.length > 0 ? getItemsByChain(chains) : [];
    
    // Determine which item pool to use
    let allAvailableItems: ResolutionItem[];
    if (isChainItem) {
      allAvailableItems = chainItems;
    } else {
      allAvailableItems = personalityItems;
    }
    
    // Exclude Endur items and current grid items
    const currentItemIds = grid.map((t) => t.item.id);
    const endurItemIds = ENDUR_STAKING_ITEMS.map(item => item.id);
    const availableItems = allAvailableItems.filter(item => 
      !currentItemIds.includes(item.id) && 
      !endurItemIds.includes(item.id) &&
      (isChainItem ? item.chain !== undefined : item.chain === undefined)
    );
    
    if (availableItems.length === 0) {
      // Fallback: use any item of same type except Endur items
      const fallbackItems = allAvailableItems.filter(item => 
        !endurItemIds.includes(item.id) &&
        (isChainItem ? item.chain !== undefined : item.chain === undefined)
      );
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
        backgroundColor: null, // Use transparent background to show the image
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: false,
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

  const getTileStyle = (_state: TileState, index: number, item?: ResolutionItem) => {
    // Check if item is red based on color property
    if (item && item.color === 'red') {
      return {
        backgroundColor: '#FFB3B3', // Light red
        borderColor: '#000000',
      };
    }
    
    const baseColor = isTurquoiseMode 
      ? turquoiseColors[index % turquoiseColors.length]
      : '#d9f8e0'
    // Always return the base color, don't change background for completed/todo states
    return {
      backgroundColor: baseColor,
      borderColor: '#000000',
    };
  };

  const bgColor = isTurquoiseMode ? '#00FFEF' : '#014a42';

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <AnimatedDefiBackground />
      <RunningBanner isTurquoiseMode={isTurquoiseMode} />
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

        {/* Main Content: Card and Actions */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Main Card - 80% width on md+ */}
          <div
            ref={cardRef}
            className="w-full md:w-[80%] border-4 border-black rounded-2xl p-4 md:p-6"
            style={{ 
              backgroundImage: 'url(/bingo-cardbg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)', // Strong black shadow like inspiration
            }}
          >
          {/* User Profile Section (for main view only, not in download) */}
          {session?.user ? (
            <></>
            // <div className="flex items-center gap-4 mb-4 pb-4 border-b-4 border-black">
            //   {session.user.image && (
            //     <img
            //       src={session.user.image}
            //       alt={session.user.name || 'User'}
            //       className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-black"
            //     />
            //   )}
            //   <div>
            //     <h2 className="text-xl md:text-2xl font-black text-black">
            //       {session.user.name || 'Crypto User'}
            //     </h2>
            //     <p className="text-base md:text-lg font-bold text-gray-600">{APP_TITLE}</p>
            //   </div>
            // </div>
          ) : (
            <>
              {/* Show "Connect X" button in main view only (not in download) */}
              <button
                onClick={handleTwitterSignIn}
                className="w-full flex items-center gap-4 mb-4 pb-4 border-b-4 rounded-xl border-black bg-white hover:bg-gray-100 transition-colors cursor-pointer text-left p-2 px-4 rounded-lg"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-black">
                    Connect X
                  </h2>
                  <p className="text-base md:text-lg font-bold text-gray-600">
                    Click to connect and personalise the card with your Info
                  </p>
                </div>
              </button>
            </>
          )}

          {/* Download section (includes profile when user connected, and grid) */}
          <div 
            ref={downloadRef} 
            className="relative rounded-xl p-4 md:p-6" 
            style={{ 
              backgroundImage: 'url(/bingo-cardbg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Happy New Year image in top right corner */}
            <img
              src="/hny.png"
              alt="Happy New Year"
              className="absolute top-0 right-0 w-1/2 h-auto z-10"
            />
            {/* User Profile Section (for download only) */}
            {session?.user ? (
              <div className="flex items-center gap-4 mb-4 pb-4 border-b-4 border-black">
                {session.user.image && (
                  <img
                    src={profileImageDataUrl || session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-cyan-400 shadow-[0_0_15px_#00ffff,0_0_30px_#00ffcc,inset_0_0_10px_#00ffff]"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      // Fallback if image fails to load
                      console.error('Image failed to load:', e);
                    }}
                  />
                )}
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-black">
                    {session.user.name || 'Crypto User'}
                  </h2>
                  <p className="text-base md:text-lg font-bold text-gray-800">{APP_TITLE}</p>
                </div>
              </div>
            ) : (
              /* Show title in download section when no user (no Connect X button) */
              <div className="mb-4 text-center pb-4 border-b-4 border-black">
                <h2 className="text-2xl md:text-3xl font-black text-black mb-2">
                  My 2025-2026 Crypto Bingo Card
                </h2>
              </div>
            )}

            {/* 5x3 Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
              {grid.map((tile, index) => {
                const style = getTileStyle(tile.state, index, tile.item);
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
                      {/* <div className="mb-1.5 md:mb-2">
                        <IconComponent 
                          className="w-5 h-5 md:w-6 md:h-6 text-black" 
                          strokeWidth={3}
                          style={{
                            filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))',
                          }}
                        />
                      </div> */}
                      <p 
                        className="text-[11px] md:text-[13px] font-black leading-tight text-black uppercase tracking-tight"
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

          {/* Actions Section - 20% width on md+, aligned vertically */}
          <div className="w-full md:w-[20%] flex flex-col gap-4">
            {/* Instructions */}
            <div 
              className="p-4 bg-white border-4 border-black rounded-xl uppercase"
              style={{
                boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
              }}
            >
              <p className="text-xs md:text-sm font-black text-black leading-relaxed">
                <strong>Instructions:</strong>
              </p>
              <p className="text-xs md:text-sm font-black text-black leading-relaxed mt-2">
                <strong>1:</strong> Click a tile to mark it as completed in 2025
              </p>
              <p className="text-xs md:text-sm font-black text-black leading-relaxed mt-2">
                <strong>2:</strong> Double click to set resolution for 2026
              </p>
              <p className="text-xs md:text-sm font-black text-black leading-relaxed mt-2">
                <strong>3:</strong> Click Refresh icon on item to get new items
              </p>
              <p className="text-xs md:text-sm font-black text-black leading-relaxed mt-2">
                <strong>4:</strong> Download your card and share
              </p>
            </div>

            {/* Share Section */}
            <div className="flex flex-col gap-4">
              <Button
                onClick={downloadImage}
                className="w-full border-4 border-black bg-black text-white font-black text-lg py-6 hover:bg-gray-900 uppercase"
                style={{
                  boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
                }}
              >
                <Download className="w-5 h-5 mr-2" strokeWidth={2.5} />
                Download
              </Button>
              <Button
                onClick={shareOnX}
                className="w-full border-4 border-black bg-black text-white font-black text-lg py-6 hover:bg-gray-900 uppercase"
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
              className="p-4 bg-yellow-100 border-4 border-black rounded-xl uppercase"
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
      </div>
    </div>
  );
}

export default function App({ session }: { session: any }) {
  const [screen, setScreen] = useState<Screen>('personality-selection');
  const [selectedPersonalityTypes, setSelectedPersonalityTypes] = useState<PersonalityType[]>([]);
  const [selectedChains, setSelectedChains] = useState<Chain[]>([]);
  const [isTurquoiseMode, setIsTurquoiseMode] = useState(false);

  const toggleTurquoiseMode = () => {
    setIsTurquoiseMode((prev) => !prev);
  };

  const handlePersonalityComplete = (types: PersonalityType[], chains: Chain[]) => {
    setSelectedPersonalityTypes(types);
    setSelectedChains(chains);
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
              chains={selectedChains}
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
