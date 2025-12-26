'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedDefiBackground from '@/app/components/AnimatedDefiBackground';
import TwitterLogo from '@/imports/TwitterLogo';
import { fetchAllWrappedData } from '@/lib/api';
import { mapApiDataToUserData } from '@/lib/dataMapper';
import type { UserWrappedData } from '@/types/user';
import { handleTwitterSignIn, handleSignOut } from '@/actions/auth';
import {
  Rocket,
  Droplet,
  Bitcoin,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
  Trophy,
  Zap,
  Target,
  Shield,
  Check,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Waves,
  Coins,
  Activity,
  Calendar,
  Crown,
  Gem,
  Plus,
  Trash2,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

// Asset paths
const image_eb8b1b0f9d529bddb7455a7756fbecb420fb6b08 = '/eb8b1b0f9d529bddb7455a7756fbecb420fb6b08.png';
const endurLogo = '/b9c5f69ed5e93b116d0bf806f8c969da4fe4d221.png';
const protocol1 = '/b9c5f69ed5e93b116d0bf806f8c969da4fe4d221.png';
const protocol2 = '/b9c5f69ed5e93b116d0bf806f8c969da4fe4d221.png';
const protocol3 = '/b9c5f69ed5e93b116d0bf806f8c969da4fe4d221.png';

// Data Types
export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
  criteria?: string;
}

export interface ValidatorInfo {
  name: string;
  amountStaked: number;
  icon?: string;
}

interface Act {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  unlocked: boolean;
  color: string; // Flat color for brutalist design
  borderColor: string;
}

interface StatCard {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ElementType;
  images?: string[]; // Array of protocol images
  color: string;
  borderColor: string;
  button?: React.ReactElement; // Button with external link (ReactElement)
  secondaryInfo?: string; // Optional secondary information
  proTip?: string; // Optional pro tip
}

// Mock Data - Replace with real user data
const mockUserData: UserWrappedData = {
  address: '0x1234...5678',
  act1: {
    accountAge: 456,
    firstTxDate: 'March 15, 2023',
    totalTransactions: 1247,
    gasSavedUSD: 3420,
    gasSavedETH: 1.2,
    mostActiveMonth: '03',
    totalValueTransacted: 125000,
    uniqueContracts: 47,
    topDapp: 'Ekubo',
    topDappTransactions: 342,
		gaslessTransactionsCount: 100,
    badges: [
      {
        id: 'early-adopter',
        emoji: '🚀',
        name: 'Early Adopter',
        description: 'Been here since the beginning',
        earned: true,
      },
      {
        id: 'gas-saver',
        emoji: '⛽',
        name: 'Gas Saver Pro',
        description: 'Saved over $3000 in gas',
        earned: true,
      },
    ],
  },
  act2: {
    xSTRKHoldings: 25000,
    xSTRKValueUSD: 12500,
    protocolsUsed: ['Endur.fi', 'Protocol X'],
    lpPositions: 3,
    avgAPR: 12.5,
    season1Points: 15420,
    season1Rank: 'Diamond',
    stakingDays: 234,
    minStakedSTRK: 10000,
    maxStakedSTRK: 100000,
    minStakedBTC: 0.1,
    maxStakedBTC: 1,
    strkValueUSD: 100,
    btcValueUSD: 20000,
    // New fields for updated cards
    userRank: 500,
    isTop1000: true,
    hasLPPosition: true,
    lpValue: 5000,
    lpDuration: 180, // in days
    lpProtocol: 'Troves',
    endurStakingDays: 300,
    isLongTermStaker: true,
    isDiamondHand: true,
    maxXSTRKHeld: 30000,
    hasDeFiPositions: true,
    defiProtocols: ['xSTRK Sensei', 'Hyper', 'Vest'],
    defiTotalValue: 20000,
    badges: [
      {
        id: 'liquid-lord',
        emoji: '💧',
        name: 'Liquid Lord',
        description: 'Master of liquid staking',
        earned: true,
      },
    ],
    // New fields for ACT 1 cards
    daysStrkStaked: 234,
    firstStrkStakedDate: '2024-12-01T00:00:00Z',
    firstStakeDaysSinceLaunch: 5,
    strkEra: 'early' as const,
    daysBtcStaked: 45,
    firstBtcStakedDate: '2025-10-05T00:00:00Z',
    firstStakeDaysSinceBtcLaunch: 3,
    btcEra: '7d' as const,
    // Liquidity fields
    avgLiquidityInTrovesLpUsdTotal: 5000,
    avgLiquidityInEkuboLpUsdTotal: 3000,
    daysNonZeroLiquidityInTrovesLp: 120,
    daysNonZeroLiquidityInEkuboLp: 90,
    // Leverage fields
    avgXstrkInTrovesHyperOrSensei: 15000,
    avgXbtcInTrovesHyper: 0.5,
    // Vesu fields
    avgXstrkInVesu: 5000,
    avgXbtcInVesu: 0.2,
    avgBorrowedInVesu: 2000,
    // Diamond hands
    days100XstrkHeldThroughLows: 30,
  },
  act3: {
    totalStakedSTRK: 50000,
    totalStakedBTC: 0.5,
    validators: [
      { name: 'Validator 1', amountStaked: 30000 },
      { name: 'Validator 2', amountStaked: 20000 },
    ],
    nativeAPR: 8.5,
    rewardsEarnedUSD: 4250,
    stakingDays: 180,
    // New fields for updated cards
    firstStakeDate: 'May 1, 2025',
    isOGStaker: true, // First stake <= May
    hasBTCStake: true,
    btcStakeAmount: 0.5,
    numberOfValidators: 2,
    rewardsClaimed: 3,
    claimFrequency: 'active', // "active" | "moderate" | "lazy"
    avgDaysBetweenClaims: 30,
    hasSmallValidators: true,
    smallValidatorCount: 1,
    badges: [],
  },
};

const acts: Act[] = [
  {
    id: 1,
    title: 'Liquid Staking',
    subtitle: 'DeFi Moves',
    icon: Droplet,
    unlocked: true,
    color: '#6BCF7F', // Mint green
    borderColor: '#000000',
  },
  // {
  //   id: 2,
  //   title: 'STRK & BTC Native Staking',
  //   subtitle: 'Native Power',
  //   icon: Shield,
  //   unlocked: true,
  //   color: '#FF6B9D', // Pink
  //   borderColor: '#000000',
  // },
];

// Scrolling ticker component
function Ticker({ isTurquoiseMode }: { isTurquoiseMode?: boolean }) {
  const tickerText = [
    '🚀 WELCOME TO ENDUR WRAPPED 2025',
    '💎 CHECK YOUR STATS',
    '🔥 SHARE WITH FRENS',
  ].join(' • ');

  return (
    <div 
      className="w-full overflow-hidden border-b-4 py-2 relative z-50" 
      style={{ 
        backgroundColor: '#000000',
        borderColor: isTurquoiseMode ? '#00FFEF' : '#00DE71'
      }}
    >
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="whitespace-nowrap font-black italic text-lg"
        style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
      >
        {tickerText} {tickerText} {tickerText}
      </motion.div>
    </div>
  );
}

// Loading Screen
function LoadingScreen({ isTurquoiseMode }: { isTurquoiseMode: boolean }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: isTurquoiseMode ? '#008080' : '#014a42' }}>
      <AnimatedDefiBackground />
      <Ticker isTurquoiseMode={isTurquoiseMode} />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="mb-8"
          >
            <Loader2 className="w-24 h-24 mx-auto" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }} />
          </motion.div>
          
          <h2 
            className="text-4xl md:text-6xl font-black mb-4"
            style={{ 
              color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
              textShadow: '3px 3px 0px rgba(0,0,0,0.3)' 
            }}
          >
            LOADING YOUR WRAPPED...
          </h2>
          
          <p className="text-xl font-bold text-white/90">
            Analyzing your Starknet journey 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function LandingScreen({ 
  onStart, 
  isTurquoiseMode, 
  toggleTurquoiseMode: _toggleTurquoiseMode,
  session 
}: { 
  onStart: (walletAddresses: string[]) => void; 
  isTurquoiseMode: boolean; 
  toggleTurquoiseMode: () => void;
  session: any;
}) {
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);
  const [newWalletInput, setNewWalletInput] = useState('');
  const [error, setError] = useState('');

  const isTwitterConnected = !!session?.user;
  const twitterUsername = session?.user?.name ? `@${session.user.name}` : '';

  // Dummy stats data - replace with real data from API
  const statsData = {
    maxTPS: 992,
    maxTPSChange: 1000, // % change vs 2024
    totalTransactions: 1208000 * 100, // Total transactions
    totalTransactionsChange: 238, // % change vs 2024 // 1720000 page 
    blockTimeSeconds: 0.5, // Block time in seconds
    blockTimeChange: -40, // % change vs 2024 (negative = faster)
    btcTVL: 200000000, // BTC TVL in USD
    btcTVLChange: 2000, // % change vs 2024
  };

  // Load wallet addresses from localStorage on mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem('walletAddresses');
    if (savedAddresses) {
      try {
        const parsed = JSON.parse(savedAddresses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWalletAddresses(parsed);
        }
      } catch (error) {
        console.error('Error parsing saved addresses:', error);
      }
    }
  }, []);

  // Save wallet addresses to localStorage whenever they change
  useEffect(() => {
    if (walletAddresses.length > 0) {
      localStorage.setItem('walletAddresses', JSON.stringify(walletAddresses));
    } else {
      localStorage.removeItem('walletAddresses');
    }
  }, [walletAddresses]);

  const handleTwitterConnect = async () => {
    try {
      // Save wallet addresses before redirecting to Twitter OAuth
      if (walletAddresses.length > 0) {
        localStorage.setItem('walletAddresses', JSON.stringify(walletAddresses));
      }
      await handleTwitterSignIn();
    } catch (error) {
      console.error('Twitter sign in error:', error);
      toast.error('Failed to connect with Twitter');
    }
  };

  const handleAddWallet = () => {
    if (!newWalletInput.trim()) {
      setError('Enter a wallet address!');
      toast.error('Enter a wallet address!');
      return;
    }
    
    // Basic validation for Starknet address format
    if (!newWalletInput.startsWith('0x') || newWalletInput.length < 10) {
      setError('Invalid Starknet address!');
      toast.error('Invalid Starknet address!');
      return;
    }

    // Check for duplicates
    if (walletAddresses.includes(newWalletInput)) {
      setError('Wallet already added!');
      toast.error('Wallet already added!');
      return;
    }
    
    setWalletAddresses([...walletAddresses, newWalletInput]);
    setNewWalletInput('');
    setError('');
    toast.success('Wallet added! 🎉');
  };

  const handleRemoveWallet = (address: string) => {
    setWalletAddresses(walletAddresses.filter(w => w !== address));
    toast.success('Wallet removed');
  };

  const handleCTAClick = () => {
    if (walletAddresses.length === 0) {
      toast.error('Add at least one wallet address!');
      return;
    }

    if (!isTwitterConnected) {
      toast.error('Connect with Twitter first!');
      return;
    }
    
    // Clear localStorage before proceeding
    localStorage.removeItem('walletAddresses');
    
    // Proceed to wrapped experience with wallet addresses
    onStart(walletAddresses);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: isTurquoiseMode ? '#008080' : '#014a42' }}>
      <AnimatedDefiBackground />
      <Ticker isTurquoiseMode={isTurquoiseMode} />
      
      {/* "Endur your STRK" - Rotated decorative text on right side */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="hidden lg:block fixed right-0 xl:right-0 top-1/2 pointer-events-none z-20"
        style={{
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center',
        }}
      >
        <p
          className="text-4xl md:text-6xl xl:text-7xl font-bold whitespace-nowrap"
          style={{
            fontFamily: "'Chalkduster', cursive",
            color: isTurquoiseMode ? '#00FFEF' : 'white',
            textShadow: '4px 4px 0px rgba(0,0,0,0.4), 0 0 20px rgba(0,222,113,0.3)',
            letterSpacing: '0.1em',
            fontWeight: 700,
          }}
        >
          Endur your STRK
        </p>
      </motion.div> */}

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">

        {/* Main content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center max-w-5xl w-full mt-[100px]"
        >
          {/* Title */}
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-3xl md:text-8xl font-black mb-6 leading-none"
            style={{ 
              color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
              textShadow: '4px 4px 0px #000000' 
            }}
          >
            STARKNET STAKING
            <br />
            WRAPPED 2025
          </motion.h1>

          {/* Subtitle */}
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-black mb-12"
            style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
          >
            YOUR YEAR IN DEGEN STATS 🔥
          </motion.p> */}

          {/* Wallet Connection Section - STEP 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <label className="block text-center mb-3 text-xl font-black text-[#00DE71]">
              STEP 1: ADD YOUR WALLETS
            </label>
              
              {/* Add Wallet Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newWalletInput}
                  onChange={(e) => {
                    setNewWalletInput(e.target.value);
                    setError('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddWallet();
                    }
                  }}
                  placeholder="0x..."
                  className="flex-1 px-6 py-5 text-xl font-bold text-black bg-[#B6FECC] border-4 border-[#00DE71] rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all placeholder:text-black/40"
                />
                <motion.button
                  onClick={handleAddWallet}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-5 bg-[#00DE71] border-4 border-black rounded-2xl text-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <Plus className="w-6 h-6" />
                </motion.button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-left mb-4 text-lg font-bold text-[#FF6B9D] bg-black px-4 py-2 rounded-lg inline-block"
                >
                  {error}
                </motion.p>
              )}

              {/* Connected Wallets List */}
              {walletAddresses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2 mb-4"
                >
                  {walletAddresses.map((address, index) => (
                    <motion.div
                      key={address}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border-4 border-black rounded-xl p-4 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-[#6BCF7F] border-4 border-black rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="text-black font-black">{index + 1}</span>
                        </div>
                        <p className="text-lg font-bold text-black font-mono">{address.slice(0, 10)}...{address.slice(-10)}</p>
                      </div>
                      <motion.button
                        onClick={() => handleRemoveWallet(address)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-[#FF6B9D] border-2 border-black rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-black" />
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
          </motion.div>

          {/* Twitter Connect Section - STEP 2 (shown after wallet added) */}
          {walletAddresses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 max-w-2xl mx-auto"
            >
              <label className="block text-center mb-3 text-xl font-black text-[#00DE71]">
                STEP 2: CONNECT WITH TWITTER
              </label>
              
              {!isTwitterConnected ? (
                <motion.button
                  onClick={handleTwitterConnect}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-5 bg-[#00DE71] border-4 border-black rounded-2xl text-black font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3"
                >
                  <div className="w-6 h-6">
                    <TwitterLogo />
                  </div>
                  CONNECT WITH TWITTER
                </motion.button>
              ) : (
                <div className="bg-white border-4 border-black rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00DE71] border-4 border-black rounded-full p-2">
                      <div className="w-5 h-5">
                        <TwitterLogo />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-black text-black/70">CONNECTED AS</p>
                      <p className="text-xl font-black text-black">{twitterUsername}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-6 h-6 text-[#6BCF7F]" />
                    <motion.button
                      onClick={async () => {
                        try {
                          await handleSignOut();
                          toast.success('Disconnected from Twitter');
                        } catch (error) {
                          console.error('Sign out error:', error);
                          toast.error('Failed to disconnect');
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-[#FF6B9D] border-2 border-black rounded-lg transition-colors"
                      title="Disconnect Twitter"
                    >
                      <X className="w-5 h-5 text-black" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* CTA Button - Shown after Twitter connected */}
          {isTwitterConnected && walletAddresses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <motion.button
                onClick={handleCTAClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-12 py-6 bg-[#00DE71] border-4 border-black rounded-2xl text-black font-black text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                LET&apos;S FUCKING GO! 🚀
              </motion.button>
            </motion.div>
          )}
          
          <hr className="mt-[150px] mb-[70px] border-2 border-black" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-black mb-12"
            style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
          >
            Starknet Stats 2025
          </motion.p>

          {/* Stats Cards - Dummy values, replace with real data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="w-full max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
          >
            {/* Max TPS Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#FFD93D] border-4 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs md:text-sm font-black text-black/70 mb-2 uppercase tracking-wide">
                Max TPS
              </p>
              <p className="text-4xl md:text-5xl font-black text-black mb-2 leading-none">
                {statsData.maxTPS.toLocaleString()}
              </p>
              <p className="text-xs font-black text-black/60">
                {statsData.maxTPSChange > 0 ? '+' : ''}{statsData.maxTPSChange}% vs 2024
              </p>
            </motion.div>

            {/* Transactions Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
              className="bg-[#6BCF7F] border-4 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs md:text-sm font-black text-black/70 mb-2 uppercase tracking-wide">
                #Transactions
              </p>
              <p className="text-4xl md:text-5xl font-black text-black mb-2 leading-none">
                {statsData.totalTransactions >= 1000000 
                  ? `${(statsData.totalTransactions / 1000000).toFixed(1)}M`
                  : statsData.totalTransactions >= 1000
                  ? `${(statsData.totalTransactions / 1000).toFixed(1)}K`
                  : statsData.totalTransactions.toLocaleString()}
              </p>
              <p className="text-xs font-black text-black/60">
                {statsData.totalTransactionsChange > 0 ? '+' : ''}{statsData.totalTransactionsChange}% vs 2024
              </p>
            </motion.div>

            {/* Block Times Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#FF6B9D] border-4 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs md:text-sm font-black text-black/70 mb-2 uppercase tracking-wide">
                Block Times
              </p>
              <p className="text-4xl md:text-5xl font-black text-black mb-2 leading-none">
                {statsData.blockTimeSeconds}s
              </p>
              <p className="text-xs font-black text-black/60">
                {statsData.blockTimeChange > 0 ? '+' : ''}{statsData.blockTimeChange}% vs 2024
              </p>
            </motion.div>

            {/* BTC TVL Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              className="bg-[#FF8C42] border-4 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs md:text-sm font-black text-black/70 mb-2 uppercase tracking-wide">
                BTC TVL
              </p>
              <p className="text-4xl md:text-5xl font-black text-black mb-2 leading-none">
                ${statsData.btcTVL >= 1000000 
                  ? `${(statsData.btcTVL / 1000000).toFixed(0)}M+`
                  : statsData.btcTVL >= 1000
                  ? `${(statsData.btcTVL / 1000).toFixed(1)}K`
                  : `$${statsData.btcTVL.toLocaleString()}`}
              </p>
              <p className="text-xs font-black text-black/60">
                {statsData.btcTVLChange > 0 ? '+' : ''}{statsData.btcTVLChange}% vs 2024
              </p>
            </motion.div>
          </motion.div>

          {/* Year timeline for Starknet */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 mb-8"
          >
            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{ 
                  color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
                  textShadow: isTurquoiseMode 
                    ? '0 0 20px rgba(0, 255, 239, 0.6), 0 0 40px rgba(0, 255, 239, 0.4), 3px 3px 0px rgba(0,0,0,0.3)' 
                    : '3px 3px 0px rgba(0,0,0,0.3)' 
                }}
              >
                2025 ON STARKNET
              </h2>
              <p className="text-sm font-black opacity-70" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>
                Scroll to explore the highlights ↓
              </p>
            </div>

            {/* Vertical Timeline Container */}
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical Timeline with connecting line */}
              <div className="relative pl-12 md:pl-16">
                {/* Vertical connecting line */}
                <div 
                  className="absolute top-0 bottom-0 w-1"
                  style={{ 
                    backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71',
                    left: '-0.5rem'
                  }}
                />
                
                {/* Timeline */}
                <div className="space-y-8 pb-6">
                    {/* Timeline Item 1: Stage 1 Rollup */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-14 md:-left-16 top-6 w-4 h-4 rounded-full border-4 border-black z-10"
                        style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
                      />
                      <div
                        className="p-6 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative"
                        style={{ backgroundColor: isTurquoiseMode ? '#004d4d' : '#026b5f' }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center font-black text-xl"
                            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71', color: '#000000' }}
                          >
                            1
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              <Rocket className="w-5 h-5" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }} />
                              <span className="text-xs font-black uppercase tracking-wider" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>
                                May 2025
                              </span>
                            </div>
                            <h3 className="text-xl text-left font-black mb-2" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#FFFFFF' }}>
                              Stage 1 Rollup
                            </h3>
                            <p className="text-sm font-bold opacity-90 text-left" style={{ color: isTurquoiseMode ? '#E0FFFF' : '#E0F8F0' }}>
                              Starknet achieves Stage 1 rollup status, marking a major milestone in decentralization and security.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline Item 2: Extended Live on Starknet */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-14 md:-left-16 top-6 w-4 h-4 rounded-full border-4 border-black z-10"
                        style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
                      />
                      <div
                        className="p-6 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative"
                        style={{ backgroundColor: isTurquoiseMode ? '#004d4d' : '#026b5f' }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center font-black text-xl"
                            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71', color: '#000000' }}
                          >
                            2
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              <Zap className="w-5 h-5" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }} />
                              <span className="text-xs font-black uppercase tracking-wider" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>
                                Aug 2025
                              </span>
                            </div>
                            <h3 className="text-xl text-left font-black mb-2" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#FFFFFF' }}>
                              Extended Live on Starknet
                            </h3>
                            <p className="text-sm font-bold opacity-90 text-left" style={{ color: isTurquoiseMode ? '#E0FFFF' : '#E0F8F0' }}>
                              Extended protocol goes live, bringing new DeFi capabilities to the Starknet ecosystem.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline Item 3: Troves launches Ekubo CL Vaults */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-14 md:-left-16 top-6 w-4 h-4 rounded-full border-4 border-black z-10"
                        style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
                      />
                      <div
                        className="p-6 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative"
                        style={{ backgroundColor: isTurquoiseMode ? '#004d4d' : '#026b5f' }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center font-black text-xl"
                            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71', color: '#000000' }}
                          >
                            3
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              <Gem className="w-5 h-5" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }} />
                              <span className="text-xs font-black uppercase tracking-wider" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>
                                Sep 2025
                              </span>
                            </div>
                            <h3 className="text-xl text-left font-black mb-2" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#FFFFFF' }}>
                              Troves Launches Ekubo CL Vaults
                            </h3>
                            <p className="text-sm font-bold opacity-90 text-left" style={{ color: isTurquoiseMode ? '#E0FFFF' : '#E0F8F0' }}>
                              Troves partners with Re7 Labs to launch Ekubo CL Vaults, expanding liquidity options.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline Item 4: BTC Staking */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-14 md:-left-16 top-6 w-4 h-4 rounded-full border-4 border-black z-10"
                        style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
                      />
                      <div
                        className="p-6 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative"
                        style={{ backgroundColor: isTurquoiseMode ? '#004d4d' : '#026b5f' }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center font-black text-xl"
                            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71', color: '#000000' }}
                          >
                            4
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              <Bitcoin className="w-5 h-5" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }} />
                              <span className="text-xs font-black uppercase tracking-wider" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>
                                Oct 2025
                              </span>
                            </div>
                            <h3 className="text-xl text-left font-black mb-2" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#FFFFFF' }}>
                              BTC Staking
                            </h3>
                            <div className="space-y-2 mt-3">
                              <div className="flex items-start gap-2">
                                <span className="text-xs font-black mt-1" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>a.</span>
                                <p className="text-sm font-bold opacity-90 flex-1 text-left" style={{ color: isTurquoiseMode ? '#E0FFFF' : '#E0F8F0' }}>
                                  Endur hits <span className="font-black" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>$50M+</span> in TVL
                                </p>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-xs font-black mt-1" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>b.</span>
                                <p className="text-sm font-bold opacity-90 flex-1 text-left" style={{ color: isTurquoiseMode ? '#E0FFFF' : '#E0F8F0' }}>
                                  Vesu V2 launch, <span className="font-black" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>$60M+</span> TVL
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline Item 5: S-two integration */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-14 md:-left-16 top-6 w-4 h-4 rounded-full border-4 border-black z-10"
                        style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
                      />
                      <div
                        className="p-6 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative"
                        style={{ backgroundColor: isTurquoiseMode ? '#004d4d' : '#026b5f' }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center font-black text-xl"
                            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71', color: '#000000' }}
                          >
                            5
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              <Activity className="w-5 h-5" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }} />
                              <span className="text-xs font-black uppercase tracking-wider" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>
                                Nov 2025
                              </span>
                            </div>
                            <h3 className="text-xl text-left font-black mb-2 text-left" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#FFFFFF' }}>
                              S-two Integration
                            </h3>
                            <p className="text-sm font-bold opacity-90 text-left" style={{ color: isTurquoiseMode ? '#E0FFFF' : '#E0F8F0' }}>
                              S-two protocol integrates with Starknet, enabling new cross-chain capabilities.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline Item 6: Native USDC */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div
                        className="absolute -left-14 md:-left-16 top-6 w-4 h-4 rounded-full border-4 border-black z-10"
                        style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
                      />
                      <div
                        className="p-6 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative"
                        style={{ backgroundColor: isTurquoiseMode ? '#004d4d' : '#026b5f' }}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl border-4 border-black flex items-center justify-center font-black text-xl"
                            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71', color: '#000000' }}
                          >
                            6
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 mb-2">
                              <Coins className="w-5 h-5" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }} />
                              <span className="text-xs font-black uppercase tracking-wider" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>
                                Dec 2025
                              </span>
                            </div>
                            <h3 className="text-xl text-left font-black mb-2" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#FFFFFF' }}>
                              Native USDC
                            </h3>
                            <p className="text-sm font-bold opacity-90 text-left" style={{ color: isTurquoiseMode ? '#E0FFFF' : '#E0F8F0' }}>
                              Native USDC launches on Starknet, bringing seamless dollar-pegged stablecoin to the ecosystem.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
          </motion.div>

          {/* Powered by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <span className="font-black text-xs" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>POWERED BY</span>
            <img src={endurLogo} alt="Endur.fi" className="h-12" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Dashboard commented out - not currently used
// function Dashboard({
//   acts,
//   onSelectAct,
//   userData,
//   isTurquoiseMode,
//   toggleTurquoiseMode,
// }: {
//   acts: Act[];
//   onSelectAct: (actId: number) => void;
//   userData: UserWrappedData;
//   isTurquoiseMode: boolean;
//   toggleTurquoiseMode: () => void;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: isTurquoiseMode ? '#008080' : '#014a42' }}>
//       <AnimatedDefiBackground />
//       <Ticker isTurquoiseMode={isTurquoiseMode} />
//
//       <div className="flex-1 p-6 md:p-12 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="text-center mb-12"
//         >
//           <h1
//             className="text-5xl md:text-7xl font-black mb-4"
//             style={{ 
//               color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
//               textShadow: isTurquoiseMode 
//                 ? '0 0 20px rgba(0, 255, 239, 0.6), 0 0 40px rgba(0, 255, 239, 0.4), 3px 3px 0px rgba(0,0,0,0.3)' 
//                 : '3px 3px 0px rgba(0,0,0,0.3)' 
//             }}
//           >
//             YOUR WRAPPED
//           </h1>
//           <div 
//             className="inline-block border-4 border-black px-6 py-3 rounded-xl mb-6"
//             style={{ backgroundColor: isTurquoiseMode ? '#000000' : '#FFFFFF' }}
//           >
//             <p className="text-xl font-black" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#000000' }}>{userData.address}</p>
//           </div>
//           
//           {/* Mentor Toggle Button */}
//           <motion.button
//             onClick={toggleTurquoiseMode}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 px-6 py-3 border-4 border-black rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black mx-auto"
//             style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
//           >
//             <Heart className="w-5 h-5" />
//             gTurquoise
//           </motion.button>
//         </motion.div>
//
//         {/* Acts Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
//           {acts.map((act, index) => (
//             <motion.button
//               key={act.id}
//               initial={{ scale: 0, rotate: -10 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
//               whileHover={{ scale: 1.05, rotate: 2 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => act.unlocked && onSelectAct(act.id)}
//               disabled={!act.unlocked}
//               className={`relative p-8 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
//                 act.unlocked ? '' : 'opacity-50 cursor-not-allowed'
//               }`}
//               style={{ 
//                 backgroundColor: isTurquoiseMode ? '#00FFEF' : act.color 
//               }}
//             >
//               {/* Lock Icon for locked acts */}
//               {!act.unlocked && (
//                 <div className="absolute top-4 right-4 bg-black/20 p-2 rounded-full">
//                   <Lock className="w-6 h-6 text-white" />
//                 </div>
//               )}
//
//               {/* Icon */}
//               <div className="bg-white border-4 border-black rounded-2xl p-6 mb-6 w-fit mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
//                 <act.icon className="w-16 h-16 text-black drop-shadow-lg" strokeWidth={2.5} />
//               </div>
//
//               {/* Text */}
//               <div>
//                 <h3 className="text-2xl font-black mb-2" style={{ color: '#000000' }}>
//                   {act.title}
//                 </h3>
//                 <p className="text-lg font-bold" style={{ color: '#000000' }}>
//                   {act.subtitle}
//                 </p>
//               </div>
//
//               {/* Act number badge */}
//               <div className="absolute top-4 left-4 bg-black text-white border-4 border-black rounded-full w-12 h-12 flex items-center justify-center">
//                 <span className="text-xl font-black">{act.id}</span>
//               </div>
//             </motion.button>
//           ))}
//         </div>
//
//         {/* Powered by footer */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mt-12 flex items-center justify-center gap-3"
//         >
//           <span className="font-black text-xs" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>POWERED BY</span>
//           <img src={endurLogo} alt="Endur.fi" className="h-12" />
//         </motion.div>
//       </div>
//     </div>
//   );
// }

function ActViewer({
  act,
  userData,
  onBack,
  onNextAct,
  isTurquoiseMode,
  toggleTurquoiseMode,
}: {
  act: Act;
  userData: UserWrappedData;
  onBack: () => void;
  onNextAct?: () => void;
  isTurquoiseMode: boolean;
  toggleTurquoiseMode: () => void;
}) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Helper function to determine primary title and secondary badges for summary card
  const getSummaryCardInfo = () => {
    const allBadges: Array<{ label: string; color: string; icon: React.ElementType }> = [];
    let primaryTitle: { label: string; color: string; icon: React.ElementType } | null = null;
    
    // Collect all possible badges
    // 1. STRK OG (highest priority)
    if (userData.act2.strkEra && userData.act2.strkEra !== 'none') {
      const eraLabel = userData.act2.strkEra === 'og' 
        ? 'STRK OG' 
        : userData.act2.strkEra === 'early' 
        ? 'STRK Early Adopter' 
        : 'STRK Mainnet Native';
      const badge = { label: eraLabel, color: '#FFD93D', icon: Crown };
      allBadges.push(badge);
      primaryTitle = badge;

      // add days held
      allBadges.push({ label: `xSTRK held for ${userData.act2.daysStrkStaked} days`, color: '#FFD93D', icon: Clock });
    } else {
      allBadges.push({ label: 'STRK Rookie', color: '#9CA3AF', icon: Crown });
    }
    
    // 2. BTCFi Gangsta (second priority)
    if (userData.act2.btcEra && userData.act2.btcEra !== 'none') {
      const btcLabel = userData.act2.btcEra === '7d' 
        ? 'BTCFi Gangsta' 
        : 'BTCFi Believer';
      const badge = { label: btcLabel, color: '#FF8C42', icon: Bitcoin };
      allBadges.push(badge);
      primaryTitle = badge; // if label exists, overwrite it

      // add days held
      allBadges.push({ label: `BTC held for ${userData.act2.daysBtcStaked} days`, color: '#FF8C42', icon: Clock });
    } else if (userData.act2.minStakedBTC === 0) {
      allBadges.push({ label: 'BTC Rookie', color: '#9CA3AF', icon: Bitcoin });
    }
    
    // 3. Diamond Hands (third priority)
    if (userData.act2.days100XstrkHeldThroughLows > 0) {
      const badge = { label: 'Diamond Hands', color: '#4CC9F0', icon: Gem };
      allBadges.push(badge);
      primaryTitle = badge; // if label exists, overwrite it
    }
    
    // 4. Liquidity Provider
    if (userData.act2.avgLiquidityInEkuboLpUsdTotal > 0 || userData.act2.avgLiquidityInTrovesLpUsdTotal > 0) {
      allBadges.push({ label: 'Liquidity Provider', color: '#6BCF7F', icon: Waves });
    }
    
    // 5. Troves Leverage User
    if (userData.act2.avgXstrkInTrovesHyperOrSensei > 0 || userData.act2.avgXbtcInTrovesHyper > 0) {
      allBadges.push({ label: 'Troves Leverage Pro', color: '#C77DFF', icon: Zap });
    }
    
    // 6. Vesu Borrower
    if (userData.act2.avgXstrkInVesu > 0 || userData.act2.avgXbtcInVesu > 0) {
      allBadges.push({ label: 'Vesu Chad', color: '#FF6B9D', icon: Activity });
    }

    // 7. Top 1000
    if (userData.act2.userRank > 0 && userData.act2.userRank <= 1000) {
      if (userData.act2.userRank <= 100) {
        allBadges.push({ label: 'Top 100', color: '#FFD93D', icon: Trophy });
      } else if (userData.act2.userRank <= 500) {
        allBadges.push({ label: 'Top 500', color: '#FFD93D', icon: Trophy });
      } else {
        allBadges.push({ label: 'Top 1000', color: '#FFD93D', icon: Trophy });
      }
    }
    
    // Filter out primary title from secondary badges
    const secondaryBadges = primaryTitle 
      ? allBadges.filter(badge => badge.label !== primaryTitle!.label)
      : allBadges;
    
    // Default to "Diamond Hands" if no primary title found
    if (!primaryTitle) {
      primaryTitle = { label: 'Come back next year', color: '#4CC9F0', icon: Gem };
    }
    
    return { primaryTitle, secondaryBadges };
  };

  // Generate stat cards based on act
  const getStatCards = (actId: number): StatCard[] => {
    switch (actId) {
      case 3:
        return [
          {
            id: '1-1',
            title: 'staked since',
            value: `${userData.act1.accountAge}`,
            subtitle: 'days on Starknet',
            icon: Calendar,
            color: '#FFD93D',
            borderColor: '#000000',
          },
          {
            id: '1-2',
            title: 'Total Transactions',
            value: userData.act1.totalTransactions.toLocaleString(),
            subtitle: 'txns sent',
            icon: Activity,
            color: '#6BCF7F',
            borderColor: '#000000',
          },
          // {
          //   id: '1-3',
          //   title: 'Gas Saved',
          //   value: `${userData.act1.gasSavedUSD.toLocaleString()} STRK`,
          //   subtitle: `${userData.act1.gasSavedETH} ETH saved`,
          //   icon: Zap,
          //   color: '#FF6B9D',
          //   borderColor: '#000000',
          // },
          {
            id: '1-4',
            title: 'protocols explored',
            value: userData.act1.mostActiveMonth,
            subtitle: 'protocols used',
            images: [protocol1, protocol2, protocol3],
            color: '#C77DFF',
            borderColor: '#000000',
          },
          {
            id: '1-5',
            title: 'Your Top Dapp',
            value: userData.act1.topDapp,
            subtitle: `${userData.act1.topDappTransactions} transactions`,
            icon: Trophy,
            color: '#FF8C42',
            borderColor: '#000000',
          },
          {
            id: '1-6',
            title: 'gasless transactions',
            value: userData.act1.gaslessTransactionsCount.toLocaleString(),
            subtitle: `${userData.act1.gasSavedUSD.toLocaleString()} saved`,
            icon: Target,
            color: '#4CC9F0',
            borderColor: '#000000',
          },
          {
            id: '1-7',
            title: 'YOUR 2025 WRAPPED',
            value: 'NFT',
            subtitle: 'Share your journey!',
            icon: Gem,
            color: '#FF6B9D',
            borderColor: '#000000',
          },
        ];
      case 1: {
        const cards: StatCard[] = [];
        
        // Card #0: How Early Were You? (STRK)
        if (userData.act2.minStakedSTRK === 0) {
          // Never too late to start staking
          cards.push({
            id: '2-0-strk',
            title: 'Never too late to start staking STRK',
            value: 'START NOW',
            subtitle: 'Give your STRK the power it deserves. For now, continue to check your BTC stats.',
            icon: Clock,
            color: '#FFD93D',
            borderColor: '#000000',
            // button: (
            //   <motion.button
            //     initial={{ opacity: 0, scale: 0.8 }}
            //     animate={{ opacity: 1, scale: 1 }}
            //     transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
            //     whileHover={{ scale: 1.05 }}
            //     whileTap={{ scale: 0.95 }}
            //     onClick={() => {
            //       window.open('https://app.endur.fi', '_blank');
            //     }}
            //     className="flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black rounded-xl font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            //   >
            //     <span>Go to app.endur.fi</span>
            //     <ExternalLink className="w-5 h-5" />
            //   </motion.button>
            // ),
            // proTip: 'Start staking now to earn rewards and unlock your potential!',
          });
        } else if (userData.act2.strkEra && userData.act2.strkEra !== 'none' && userData.act2.daysStrkStaked) {
          let firstStakeDaysSinceLaunch = userData.act2.firstStakeDaysSinceLaunch || 0;
          if (firstStakeDaysSinceLaunch < 1) {
            firstStakeDaysSinceLaunch = 1;
          }
          const eraText = userData.act2.strkEra === 'og' 
            ? 'STRK OG' 
            : userData.act2.strkEra === 'early' 
            ? 'STRK Early Adopter' 
            : 'STRK Mainnet Native';
          const subtitleText = userData.act2.strkEra === 'og'
            ? `You were among the first to mint xSTRK. Precisely, you first staked ${firstStakeDaysSinceLaunch} days since launch and then continued to stake for ${userData.act2.daysStrkStaked} days`
            : userData.act2.strkEra === 'early'
            ? `You joined xSTRK in its early phase. Precisely, you first staked ${firstStakeDaysSinceLaunch} (${userData.act2.firstStakeDaysSinceLaunch}) days since launch and then continued to stake for ${userData.act2.daysStrkStaked} days`
            : `You made xSTRK part of your Starknet journey. Precisely, you first staked ${firstStakeDaysSinceLaunch} days since launch and then continued to stake for ${userData.act2.daysStrkStaked} days`;
          
          cards.push({
            id: '2-0-strk',
            title: 'How Early Were You?',
            value: eraText,
            subtitle: subtitleText,
            icon: Clock,
            color: '#FFD93D',
            borderColor: '#000000',
          });
        }

        // Card #0b: How Early Were You? (BTC)
        if (userData.act2.minStakedBTC === 0) {
          // Yet to stake BTC - handled in final card
        } else if (userData.act2.btcEra && userData.act2.btcEra !== 'none' && userData.act2.daysBtcStaked) {
          let firstStakeDaysSinceBtcLaunch = userData.act2.firstStakeDaysSinceBtcLaunch || 0;
          if (firstStakeDaysSinceBtcLaunch < 1) {
            firstStakeDaysSinceBtcLaunch = 1;
          }
          const btcEraText = userData.act2.btcEra === '7d' 
            ? 'BTCFi Gangsta' 
            : 'BTCFi Believer';
          const btcSubtitleText = userData.act2.btcEra === '7d'
            ? `You were among the first to stake BTC. Precisely, you first staked ${firstStakeDaysSinceBtcLaunch} days since launch and then continued to stake for ${userData.act2.daysBtcStaked} days`
            : `You jumped into the BTC LST revolution ${firstStakeDaysSinceBtcLaunch} days after launch and kept the momentum going for ${userData.act2.daysBtcStaked} days straight`;
          
          cards.push({
            id: '2-0-btc',
            title: 'Did you stake BTC?',
            value: btcEraText,
            subtitle: btcSubtitleText,
            icon: Clock,
            color: '#FF8C42',
            borderColor: '#000000',
          });
        }

        // Card #1: Peak Conviction Staker (STRK) - only if min_strk > 0
        if (userData.act2.minStakedSTRK > 0) {
          const minStrkExcludingZero = userData.act2.minStakedSTRK > 0 ? userData.act2.minStakedSTRK : userData.act2.maxStakedSTRK;
          const maxSTRKFormatted = Number((userData.act2.maxStakedSTRK / 1e18).toFixed(2)).toLocaleString();
          const minSTRKFormatted = Number((minStrkExcludingZero / 1e18).toFixed(2)).toLocaleString();
          cards.push({
            id: '2-1',
            title: 'Peak Conviction Staker',
            value: `${maxSTRKFormatted} STRK`,
            subtitle: `At peak conviction, you had ${maxSTRKFormatted} STRK staked — even at your lowest, you never dropped below ${minSTRKFormatted} STRK.`,
            icon: TrendingUp,
            color: '#FF6B9D',
            borderColor: '#000000',
            secondaryInfo: '*Includes leveraged exposure as well'
          });
        }

        // Card #1b: Peak Conviction Staker (BTC)
        if (userData.act2.minStakedBTC >= 1) {
          const minBtcExcludingZero = userData.act2.minStakedBTC >= 1 ? userData.act2.minStakedBTC : userData.act2.maxStakedBTC;
          const maxBTCFormatted = Number((userData.act2.maxStakedBTC).toFixed(0)).toLocaleString();
          const minBTCFormatted = Number((minBtcExcludingZero).toFixed(0)).toLocaleString();
          cards.push({
            id: '2-1b',
            title: 'BTC Gud',
            value: `$${maxBTCFormatted} of BTC`,
            subtitle: `At peak conviction, you had $${maxBTCFormatted} of BTC staked — even at your lowest, you never dropped below $${minBTCFormatted} of BTC.`,
            icon: TrendingUp,
            color: '#FF8C42',
            borderColor: '#000000',
            secondaryInfo: '*Includes leveraged exposure as well'
          });
        }

        // Card #2: Your Season 1 points (only if rank <= 1000)
        if (userData.act2.userRank > 0 && userData.act2.userRank <= 1000) {
          const rankText = userData.act2.userRank <= 100 
            ? '🏆 Top 100' 
            : userData.act2.userRank <= 500 
            ? '🏆 Top 500' 
            : '🏆 Top 1000';
          cards.push({
            id: '2-2',
            title: 'Your Season 1 points',
            value: `${userData.act2.season1Points.toLocaleString()}`,
            subtitle: `${rankText} • Rank #${userData.act2.userRank}`,
            icon: Trophy,
            color: '#FFD93D',
            borderColor: '#000000',
            secondaryInfo: userData.act2.userRank <= 100 
              ? 'You\'re in the elite top 100! Keep up the amazing work!' 
              : userData.act2.userRank <= 500 
              ? 'Top 500 is impressive! You\'re a power user!' 
              : 'Top 1000 is great! Keep staking to climb higher!',
            proTip: 'Did you know season 2 is live?',
          });
        }

        // Card #3: Liquidity Backbone of Endur
        const trovesLpTotal = userData.act2.avgLiquidityInTrovesLpUsdTotal;
        const ekuboLpTotal = userData.act2.avgLiquidityInEkuboLpUsdTotal;
        const hasTrovesLp = trovesLpTotal > 0;
        const hasEkuboLp = ekuboLpTotal > 0;
        
        // If troves > Ekubo, show troves strategist card first (handled below)
        // If troves == 0 and ekubo == 0, show educational message
        if (!hasTrovesLp && !hasEkuboLp) {
          cards.push({
            id: '2-3-edu',
            title: 'Liquidity is the Backbone of Endur',
            value: 'DID YOU KNOW?',
            subtitle: 'You could supply liquidity on Troves Ekubo Vaults to make LSTs liquidity deeper',
            icon: Waves,
            color: '#6BCF7F',
            borderColor: '#000000',
            proTip: 'In Season 2 points, high multipliers are given for LPers'
          });
        } else if (hasTrovesLp && trovesLpTotal > ekuboLpTotal) {
          // Troves card will be shown first (handled in Card #4)
        } else if (hasEkuboLp) {
          const totalLp = ekuboLpTotal + (hasTrovesLp ? trovesLpTotal : 0);
          const daysLp = Math.max(
            userData.act2.daysNonZeroLiquidityInEkuboLp,
            userData.act2.daysNonZeroLiquidityInTrovesLp
          );
          cards.push({
            id: '2-3',
            title: 'Liquidity Backbone of Endur',
            value: `$${totalLp.toLocaleString()}`,
            subtitle: `You supplied $${totalLp.toLocaleString()} average liquidity on Ekubo and/or Troves across ${daysLp} days, helping keep Endur LSTs tradable.`,
            icon: Waves,
            color: '#6BCF7F',
            borderColor: '#000000',
            secondaryInfo: `Endur loves you`,
          });
        }

        // Card #4: Trove Strategist (if troves lp > 0)
        if (hasTrovesLp) {
          // If troves > Ekubo, show this first
          const totalLp = ekuboLpTotal;
          if (trovesLpTotal > ekuboLpTotal) {
            cards.splice(cards.length - (hasEkuboLp ? 1 : 0), 0, {
              id: '2-4',
              title: 'You did it on Troves',
              value: `$${trovesLpTotal.toLocaleString()}`,
              subtitle: `You trusted automated Troves LPing on Ekubo with $${trovesLpTotal.toLocaleString()} average liquidity over ${userData.act2.daysNonZeroLiquidityInTrovesLp} days.`,
              icon: Zap,
              color: '#C77DFF',
              borderColor: '#000000',
              secondaryInfo: `Endur & Troves think of you as a brother`,
            });

            // add ekubo card too
            const daysLp = Math.max(
              userData.act2.daysNonZeroLiquidityInEkuboLp,
              0
            );  
            cards.push({
              id: '2-4b',
              title: 'Liquidity Chad',
              value: `$${totalLp.toLocaleString()}`,
              subtitle: `You also supplied $${totalLp.toLocaleString()} average liquidity on Ekubo across ${daysLp} days, helping keep Endur LSTs tradable.`,
              icon: Waves,
              color: '#6BCF7F',
              borderColor: '#000000',
              secondaryInfo: `Endur loves you`,
            });
          } else {
            cards.push({
              id: '2-4',
              title: 'Trove Strategist',
              value: `$${trovesLpTotal.toLocaleString()}`,
              subtitle: `You trusted automated Troves LPing on Ekubo with $${trovesLpTotal.toLocaleString()} average liquidity over ${userData.act2.daysNonZeroLiquidityInTrovesLp} days.`,
              icon: Zap,
              color: '#C77DFF',
              borderColor: '#000000',
              secondaryInfo: `Endur & Troves think of you as a brother`,
            });
          }
          
          // If troves == 0, show educational message (already handled above)
        }

        // Card #5: Held Through the Bloodbath
        if (userData.act2.days100XstrkHeldThroughLows > 0) {
          cards.push({
            id: '2-5',
            title: 'Diamond Hands',
            value: `${userData.act2.days100XstrkHeldThroughLows} days`,
            subtitle: `You held at least 100 xSTRK on ${userData.act2.days100XstrkHeldThroughLows} days while STRK was below $0.12.`,
            icon: Gem,
            color: '#4CC9F0',
            borderColor: '#000000',
          });
        }

        // Card #6: Capital Efficiency Maximalist (if > 0)
        const hasVesu = userData.act2.avgXstrkInVesu > 0 || userData.act2.avgXbtcInVesu > 0 || userData.act2.avgBorrowedInVesu > 0;
        if (hasVesu) {
          const decimalAdjustedXstrkVesu = userData.act2.avgXstrkInVesu / 1e18;
          const totalVesuValue = (decimalAdjustedXstrkVesu * (userData.act2.strkValueUSD)) + 
                                  (userData.act2.avgXbtcInVesu);
          const borrowedValue = userData.act2.avgBorrowedInVesu;
          if (totalVesuValue > 0) {
            cards.push({
              id: '2-6',
              title: 'Capital Efficiency Maximalist',
              value: `$${totalVesuValue.toLocaleString()} / $${borrowedValue.toLocaleString()}`,
              subtitle: `You kept $${totalVesuValue.toLocaleString()} worth of LSTs active on Vesu while borrowing $${borrowedValue.toLocaleString()} on average.`,
              icon: Activity,
              color: '#4CC9F0',
              borderColor: '#000000',
              proTip: borrowedValue > 0 ? undefined : "You can borrow STRK, BTC and Stable coins like USDC on Vesu against your LSTs",
            });
          }
        }

        // Card #7: Leverage Pro (if > 0)
        const hasLeverage = userData.act2.avgXstrkInTrovesHyperOrSensei > 0 || userData.act2.avgXbtcInTrovesHyper > 0;
        if (hasLeverage) {
          const xstrkLeverage = userData.act2.avgXstrkInTrovesHyperOrSensei;
          const xbtcLeverage = userData.act2.avgXbtcInTrovesHyper;
          cards.push({
            id: '2-7',
            title: 'Leverage Pro',
            value: `${xstrkLeverage > 0 ? xstrkLeverage.toLocaleString() : '0'} xSTRK / ${xbtcLeverage > 0 ? xbtcLeverage.toFixed(4) : '0'} BTC LSTs`,
            subtitle: `You averaged ${xstrkLeverage > 0 ? xstrkLeverage.toLocaleString() : '0'} xSTRK and ${xbtcLeverage > 0 ? xbtcLeverage.toFixed(4) : '0'} BTC LSTs through Troves Hyper/Sensei strategies — up to 3–5× exposure.`,
            icon: TrendingUp,
            color: '#FF6B9D',
            borderColor: '#000000',
          });
        } else {
          cards.push({
            id: '2-7',
            title: 'You could be Leverage Pro',
            subtitle: `You could leverage your LSTs for higher yield on Troves via their one-click Hyper vaults with active Liquidation risk management.`,
            icon: TrendingUp,
            color: '#FF6B9D',
            value: '?',
            borderColor: '#000000',
          });
        }

        // Card #8: Summary Card (always last)
        const summaryCardInfo = getSummaryCardInfo();
        cards.push({
          id: '2-8',
          title: summaryCardInfo.primaryTitle.label,
          value: summaryCardInfo.primaryTitle.label,
          subtitle: 'Your 2025 Journey',
          icon: Gem,
          color: summaryCardInfo.primaryTitle.color,
          borderColor: '#000000',
        });

        return cards;
      }
      case 2:
        return [
          {
            id: '3-1',
            title: 'OG Staker',
            value: userData.act3.isOGStaker ? '🔥 OG' : 'NEWBIE',
            subtitle: userData.act3.isOGStaker ? `Staked since ${userData.act3.firstStakeDate}` : `Staked since ${userData.act3.firstStakeDate}`,
            icon: Crown,
            color: '#FFD93D',
            borderColor: '#000000',
          },
          {
            id: '3-2',
            title: 'Validators',
            value: `${userData.act3.numberOfValidators}`,
            subtitle: userData.act3.hasSmallValidators ? `🌟 Decentralization Hero! (${userData.act3.smallValidatorCount} small)` : 'validators staked with',
            icon: Shield,
            color: '#6BCF7F',
            borderColor: '#000000',
          },
          {
            id: '3-3',
            title: 'Times Rewards Claimed',
            value: `${userData.act3.rewardsClaimed}`,
            subtitle: userData.act3.avgDaysBetweenClaims <= 7 ? '⚡ Super Active!' : userData.act3.avgDaysBetweenClaims <= 30 ? '👍 Moderate' : '😴 Too Lazy!',
            icon: Trophy,
            color: '#4CC9F0',
            borderColor: '#000000',
          },
          {
            id: '3-4',
            title: 'NATIVE STAKING WRAPPED',
            value: 'SUMMARY',
            subtitle: 'Your 2025 Journey',
            icon: Gem,
            color: '#FF6B9D',
            borderColor: '#000000',
          },
        ];
      default:
        return [];
    }
  };

  const cards = getStatCards(act.id);
  const currentCard = cards[currentCardIndex];

  // Safety check - if no card, return early
  if (!currentCard) {
    return null;
  }

  // Color helper - use turquoise when mode is active
  const getBgColor = (defaultColor: string) => {
    return isTurquoiseMode ? '#008080' : defaultColor;
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setDirection(1);
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setDirection(-1);
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: getBgColor('#014a42') }}>
      <AnimatedDefiBackground />
      <Ticker isTurquoiseMode={isTurquoiseMode} />

      {/* Header */}
      <div className="p-6 flex items-center justify-center border-b-4 border-black relative z-10" style={{ backgroundColor: getBgColor('#014a42') }}>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-black border-4 border-black rounded-xl font-black absolute left-6"
          style={{ 
            color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
            boxShadow: isTurquoiseMode ? '4px 4px 0px 0px #00FFEF' : '4px 4px 0px 0px #00DE71'
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          BACK
        </motion.button>

        <div className="text-center">
          <h2 
            className="text-2xl md:text-4xl font-black text-center" 
            style={{ 
              color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
              textShadow: isTurquoiseMode 
                ? '0 0 20px rgba(0, 255, 239, 0.6), 0 0 40px rgba(0, 255, 239, 0.4), 3px 3px 0px rgba(0,0,0,0.3)' 
                : '3px 3px 0px rgba(0,0,0,0.3)'
            }}
          >
            Your year with Liquid Staking
          </h2>
          <p className="text-lg font-bold text-white/90 text-[rgba(255,255,255,0.9)]">On Endur</p>
        </div>

        {/* For the love of Mentor button - always visible */}
        <motion.button
          onClick={toggleTurquoiseMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 border-4 border-black rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black absolute right-6"
          style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm md:text-base hidden lg:inline">gTurquoise</span>
        </motion.button>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentCardIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0, rotate: 10 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0, rotate: -10 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className={`w-full ${currentCard.id === '2-8' ? 'max-w-5xl' : 'max-w-2xl'}`}
          >
            {/* Unified Card Component */}
            {currentCard.id === '2-8' ? (
              /* Liquid Staking Summary Card */
              <div
                className="flex flex-row flex-1 border-8 border-black rounded-3xl p-8 md:p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : currentCard.color }}
              >
								<div className="flex flex-col items-center justify-center flex-1">
									{/* Title Banner */}
									<motion.div
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
										className="text-center mb-8"
									>
										<div className="inline-block bg-black border-4 border-black px-8 py-3 rounded-2xl mb-4">
											<h3 className="text-xl md:text-2xl font-black text-white">
												Liquid Staking 2025
											</h3>
										</div>
									<div className="inline-block bg-white/30 border-4 border-black px-6 py-2 rounded-xl">
										<p className="text-lg font-black text-black">COLLECTOR&apos;S EDITION NFT</p>
									</div>
									</motion.div>

                  {/* NFT Badge */}
									<motion.div
										initial={{ scale: 0, rotate: -180 }}
										animate={{ scale: 1, rotate: 0 }}
										transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
										className="flex items-center justify-center mb-8"
									>
										<div className="relative">
											<div className="absolute inset-0 bg-[#FFD93D] blur-xl opacity-50 rounded-3xl"></div>
											<div className="relative bg-gradient-to-br from-[#FFD93D] to-[#FF6B9D] border-6 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
												<Gem className="w-20 h-20 md:w-24 md:h-24 text-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" strokeWidth={2.5} />
											</div>
										</div>
									</motion.div>

									{/* Main Title */}
									{(() => {
										const summaryCardInfo = getSummaryCardInfo();
										return (
											<motion.h4
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.4 }}
												className="text-4xl md:text-5xl font-black text-black text-center mb-8 leading-tight"
												style={{ textShadow: '3px 3px 0px rgba(255,255,255,0.3)' }}
											>
												{summaryCardInfo.primaryTitle.label.split(' ').map((word, idx, arr) => (
													<React.Fragment key={idx}>
														{word}
														{idx < arr.length - 1 && <br />}
													</React.Fragment>
												))}
											</motion.h4>
										);
									})()}
								</div>

								<div className="flex flex-col items-center justify-center flex-2">
                  {/* Badges Grid */}
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5 }}
										className="space-y-3 mb-8 w-full"
									>
										{(() => {
											const summaryCardInfo = getSummaryCardInfo();
											const badges = summaryCardInfo.secondaryBadges;
											
											// Render badges in grid (2 columns)
											const rows = [];
											for (let i = 0; i < badges.length; i += 2) {
												const rowBadges = badges.slice(i, i + 2);
												rows.push(
													<div key={i} className="grid grid-cols-2 gap-3">
														{rowBadges.map((badge, idx) => {
															const IconComponent = badge.icon;
															return (
																<motion.div 
																	key={idx}
																	initial={{ opacity: 0, scale: 0.8 }}
																	animate={{ opacity: 1, scale: 1 }}
																	transition={{ delay: 0.6 + (i + idx) * 0.1, type: 'spring', bounce: 0.5 }}
																	className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
																	style={{ backgroundColor: badge.color }}
																>
																	<div className="flex items-center gap-2 mb-2">
																		<IconComponent className="w-5 h-5 text-black" strokeWidth={2.5} />
																		<p className="text-xs md:text-sm font-black text-black/70 uppercase">{badge.label}</p>
																	</div>
																</motion.div>
															);
														})}
													</div>
												);
											}
											
											return <>{rows}</>;
										})()}
									</motion.div>

                  {/* Share Button */}
									<motion.button
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 1.2, type: 'spring', bounce: 0.5 }}
										whileHover={{ scale: 1.05, rotate: -1 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => {
											const text = `🔥 My #StarknetWrapped2025 NFT 🔥\n\n📊 ${userData.act1.accountAge} days staked\n💸 ${userData.act1.totalTransactions.toLocaleString()} transactions\n⚡ $${userData.act1.gasSavedUSD.toLocaleString()} gas saved\n🎯 ${userData.act1.mostActiveMonth} protocols explored\n✨ 456 gasless transactions ($456 saved)\n\nPowered by @Endur_fi 🚀\n\n#Starknet #DeFi #Crypto`;
											const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
											window.open(tweetUrl, '_blank');
											toast.success('Opening Twitter! 🐦');
										}}
										className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-black text-white border-4 border-black rounded-2xl font-black text-xl md:text-2xl shadow-[8px_8px_0px_0px_#FFD93D] hover:shadow-[4px_4px_0px_0px_#FFD93D] transition-all relative overflow-hidden group"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-[#FFD93D] via-[#FF6B9D] to-[#C77DFF] opacity-0 group-hover:opacity-20 transition-opacity"></div>
										<Share2 className="w-7 h-7 relative z-10" />
										<span className="relative z-10">SHARE ON X</span>
										<Sparkles className="w-6 h-6 relative z-10" />
									</motion.button>
                </div>
              </div>
            ) : (
              /* Regular Stat Card - Optimized Structure */
              <div
                className="border-8 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12"
                style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : currentCard.color }}
              >
                {/* 1. Title */}
                {currentCard.id !== '1-1' && (
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-black mb-8 text-center"
                    style={{ color: '#000000' }}
                  >
                    {currentCard.id === '1-4' ? 'DApps Explored' : 
                     currentCard.id === '2-2' ? (
                       userData.act2.userRank <= 100 ? 'Power Liquid Staker - Top 100' :
                       userData.act2.userRank <= 500 ? 'Power Liquid Staker - Top 500' :
                       userData.act2.userRank <= 1000 ? 'Power Liquid Staker - Top 1000' :
                       currentCard.title
                     ) : currentCard.id === '2-3' ? (
                       <div>
                         <div className="mb-4">{currentCard.title}</div>
                         <div className="flex items-center justify-center gap-2 text-xl md:text-2xl">
                           <Heart className="w-6 h-6 text-[#FF6B9D]" strokeWidth={2.5} fill="#FF6B9D" />
                           <span>We love you for providing DEX liquidity for LSTs!</span>
                           <Heart className="w-6 h-6 text-[#FF6B9D]" strokeWidth={2.5} fill="#FF6B9D" />
                         </div>
                       </div>
                     ) : currentCard.id === '2-4' && userData.act2.endurStakingDays >= 7 ? (
                       <div>
                         <div className="mb-4">{currentCard.title}</div>
                         {/* <div className="flex items-center justify-center gap-2 text-xl md:text-2xl">
                           <Gem className="w-6 h-6 text-[#FFD700]" strokeWidth={2.5} fill="#FFD700" />
                           <span>You held xSTRK through its lows</span>
                           <Gem className="w-6 h-6 text-[#FFD700]" strokeWidth={2.5} fill="#FFD700" />
                         </div> */}
                       </div>
                     ) : currentCard.title}
                  </motion.h3>
                )}

                {/* 2. Value */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                  className="mb-8 text-center"
                >
                  {!(currentCard.id === '2-4' && userData.act2.endurStakingDays >= 7) && (
                    <p
                      className="text-6xl md:text-8xl font-black leading-none"
                      style={{ 
                        color: '#000000',
                        textShadow: '4px 4px 0px rgba(0,0,0,0.2)' 
                      }}
                    >
                      {currentCard.value}
                    </p>
                  )}
                </motion.div>

                {/* 3. Subtitle with Icon */}
                {currentCard.subtitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-black/10 border-4 border-black w-full mb-6"
                  >
                    <p className="text-xl md:text-3xl font-black text-center" style={{ color: '#000000' }}>
                      {currentCard.id === '1-3' ? (
                        <>
                          <span className="font-black">$34 Gas spent</span>
                          <span className="font-medium text-lg md:text-xl">{` (avg $0.01 per tx)`}</span>
                        </>
                      ) : (
                        currentCard.subtitle
                      )}
                    </p>
                    {currentCard.images ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className="flex items-center justify-center"
                      >
                        <div className="relative h-12 w-24">
                          {currentCard.images.map((img, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                              className="absolute bg-white border-4 border-black rounded-full p-2"
                              style={{ 
                                left: `${index * 20}px`,
                                zIndex: (currentCard.images?.length ?? 0) - index,
                              }}
                            >
                              <img src={img} alt={`Protocol ${index + 1}`} className="w-8 h-8 object-contain" />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ) : currentCard.icon ? (
                      <motion.div
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className={currentCard.id === '2-5' && userData.act2.hasDeFiPositions ? "" : "bg-white border-4 border-black rounded-full p-3"}
                      >
                        {/* <></> */}
                        {/* {currentCard.id === '2-5' && userData.act2.hasDeFiPositions ? (
                          <div className="flex items-center -space-x-4">
                            <div className="bg-white border-4 border-black rounded-full p-2 relative z-30">
                              <img src={protocol1} alt="Protocol 1" className="w-10 h-10" />
                            </div>
                            <div className="bg-white border-4 border-black rounded-full p-2 relative z-20">
                              <img src={protocol2} alt="Protocol 2" className="w-10 h-10" />
                            </div>
                            <div className="bg-white border-4 border-black rounded-full p-2 relative z-10">
                              <img src={protocol3} alt="Protocol 3" className="w-10 h-10" />
                            </div>
                          </div> */}
                        {/* ) : ( */}
                          <currentCard.icon className="w-8 h-8 text-black" />
                        {/* )} */}
                      </motion.div>
                    ) : null}
                  </motion.div>
                )}

                {/* 4. Button with External Link */}
                {currentCard.button && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: 'spring', bounce: 0.5 }}
                    className="mb-6 flex justify-center"
                  >
                    {currentCard.button}
                  </motion.div>
                )}

                {/* 5. Secondary Info (Optional) */}
                {currentCard.secondaryInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-6"
                  >
                    <div className="bg-white/20 border-4 border-black rounded-xl p-4">
                      <p className="text-lg md:text-xl font-bold text-center text-black">
                        {currentCard.secondaryInfo}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 6. Pro Tip (Optional) */}
                {currentCard.proTip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-[#FFD93D]/30 border-4 border-black rounded-xl p-4"
                  >
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-black flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <div>
                        <p className="text-sm font-black text-black uppercase mb-1">Pro Tip</p>
                        <p className="text-base md:text-lg font-bold text-black">
                          {currentCard.proTip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {currentCardIndex > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handlePrev}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20"
            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : 'rgb(0,222,113)' }}
          >
            <ChevronLeft className="w-8 h-8 text-black" />
          </motion.button>
        )}

        {currentCardIndex < cards.length - 1 ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20"
            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : 'rgb(0,222,113)' }}
          >
            <ChevronRight className="w-8 h-8 text-black" />
          </motion.button>
        ) : (
          onNextAct && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onNextAct}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 px-8 py-4 border-4 border-black rounded-2xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black text-xl z-20"
              style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#6BCF7F' }}
            >
              <span>NEXT ACT</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          )
        )}
      </div>

      {/* Progress Indicator */}
      <div className="p-6 border-t-4 border-black relative z-10" style={{ backgroundColor: getBgColor('#014a42') }}>
        <div className="flex items-center justify-center gap-3">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentCardIndex ? 1 : -1);
                setCurrentCardIndex(index);
              }}
              className={`h-4 rounded-full border-2 border-black transition-all ${
                index === currentCardIndex
                  ? 'w-12'
                  : 'w-4 hover:bg-black/20'
              }`}
              style={{ backgroundColor: index === currentCardIndex ? (isTurquoiseMode ? '#00FFEF' : '#00DE71') : (index !== currentCardIndex ? getBgColor('#014a42') : undefined) }}
            />
          ))}
        </div>
        <p className="text-center mt-3 text-white font-bold">
          {currentCardIndex + 1} / {cards.length}
        </p>
      </div>

      {/* Mentor Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex items-center justify-center"
      >
        <img 
          src={image_eb8b1b0f9d529bddb7455a7756fbecb420fb6b08} 
          alt="Mentor" 
          className="w-full max-w-[57.6rem] h-auto object-contain pt-[-20px] pr-[0px] pb-[0px] pl-[0px]"
        />
      </motion.div>

      {/* Powered by footer */}
      <div className="p-4 border-t-4 border-black relative z-10" style={{ backgroundColor: getBgColor('#014a42') }}>
        <div className="flex items-center justify-center gap-3">
          <span className="font-black text-xs" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>POWERED BY</span>
          <img src={endurLogo} alt="Endur.fi" className="h-12" />
        </div>
      </div>
    </div>
  );
}

export default function App({ session }: { session: any }) {
  const [screen, setScreen] = useState<'landing' | 'dashboard' | 'act' | 'loading'>(
    'landing'
  );
  const [selectedAct, setSelectedAct] = useState<Act | null>(null);
  const [isTurquoiseMode, setIsTurquoiseMode] = useState(false);
  const [userData, setUserData] = useState<UserWrappedData>(mockUserData);
  const [, setIsLoading] = useState(false);
  const [, setWalletAddresses] = useState<string[]>([]);

  const toggleTurquoiseMode = () => {
    setIsTurquoiseMode(prev => !prev);
    toast.success(isTurquoiseMode ? 'Back to normal! ✨' : 'gTurquoise activated! 💙');
  };

  const handleStart = async (addresses: string[]) => {
    setWalletAddresses(addresses);
    setIsLoading(true);
    setScreen('loading');

		const truncatedAddresses = addresses.map((address) => `${address.slice(0, 6)  }...${  address.slice(-4)}`);

    try {
      // Fetch both queries in parallel
      const { wrappedData, journeyData } = await fetchAllWrappedData(addresses);
      
      // Map API data to user data structure
      const mappedData = mapApiDataToUserData(wrappedData, journeyData, addresses);
      
      // Merge with mock data (to keep hardcoded values for missing fields)
      const finalUserData: UserWrappedData = {
        ...mockUserData,
        ...mappedData,
        address: truncatedAddresses.join(', '),
        act1: {
          ...mockUserData.act1,
          ...mappedData.act1,
        },
        act2: {
          ...mockUserData.act2,
          ...mappedData.act2,
        },
        act3: {
          ...mockUserData.act3,
          ...mappedData.act3,
        },
      };
      
      setUserData(finalUserData);
      setIsLoading(false);
      // Skip dashboard and go directly to first act (slides page)
      const firstAct = acts.find((a) => a.unlocked);
      if (firstAct) {
        setSelectedAct(firstAct);
        setScreen('act');
      } else {
        setScreen('dashboard');
      }
      toast.success('Wrapped data loaded! 🎉');
    } catch (error) {
      console.error('Error fetching wrapped data:', error);
      setIsLoading(false);
      toast.error('Failed to load wrapped data. Using demo data instead.');
      // Fall back to mock data
      setUserData(mockUserData);
      // Skip dashboard and go directly to first act (slides page)
      const firstAct = acts.find((a) => a.unlocked);
      if (firstAct) {
        setSelectedAct(firstAct);
        setScreen('act');
      } else {
        setScreen('dashboard');
      }
    }
  };

  // handleSelectAct commented out - not currently used (Dashboard is commented out)
  // const handleSelectAct = (actId: number) => {
  //   const act = acts.find((a) => a.id === actId);
  //   if (act) {
  //     setSelectedAct(act);
  //     setScreen('act');
  //   }
  // };

  const handleNextAct = () => {
    if (selectedAct) {
      const nextActId = selectedAct.id + 1;
      const nextAct = acts.find((a) => a.id === nextActId);
      if (nextAct && nextAct.unlocked) {
        setSelectedAct(nextAct);
      } else {
        // If no next act, go back to dashboard
        handleBackToDashboard();
        toast.success('All acts completed! 🎉');
      }
    }
  };

  const handleBackToDashboard = () => {
    // Skip dashboard and go directly to first act (slides page)
    const firstAct = acts.find((a) => a.unlocked);
    if (firstAct) {
      setSelectedAct(firstAct);
      setScreen('act');
    } else {
      setScreen('dashboard');
      setSelectedAct(null);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingScreen 
              onStart={handleStart} 
              isTurquoiseMode={isTurquoiseMode}
              toggleTurquoiseMode={toggleTurquoiseMode}
              session={session}
            />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingScreen isTurquoiseMode={isTurquoiseMode} />
          </motion.div>
        )}

        {/* Dashboard commented out - skipping directly to slides page */}
        {/* {screen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard
              acts={acts}
              onSelectAct={handleSelectAct}
              userData={userData}
              isTurquoiseMode={isTurquoiseMode}
              toggleTurquoiseMode={toggleTurquoiseMode}
            />
          </motion.div>
        )} */}

        {screen === 'act' && selectedAct && (
          <motion.div
            key={`act-${selectedAct.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ActViewer
              act={selectedAct}
              userData={userData}
              onBack={handleBackToDashboard}
              onNextAct={selectedAct.id < acts.length ? handleNextAct : undefined}
              isTurquoiseMode={isTurquoiseMode}
              toggleTurquoiseMode={toggleTurquoiseMode}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}