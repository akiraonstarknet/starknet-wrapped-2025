'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import DefiBackgroundIllustrations from '../imports/DefiBackgroundIllustrations';
import TwitterLogo from '../imports/TwitterLogo';
import { fetchAllWrappedData } from '../lib/api';
import { mapApiDataToUserData } from '../lib/dataMapper';
import type { UserWrappedData } from '../types/user';
import { handleTwitterSignIn, handleSignOut } from '../actions/auth';
import {
  Rocket,
  Droplet,
  Bitcoin,
  Gamepad2,
  Globe2,
  Sparkles,
  Lock,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
  Trophy,
  Zap,
  TrendingUp,
  Users,
  Target,
  Star,
  Award,
  Shield,
  Check,
  Loader2,
  Copy,
  X,
  ChevronLeft,
  ChevronRight,
  Waves,
  Coins,
  Activity,
  BarChart3,
  Calendar,
  Flame,
  Crown,
  Gem,
  Download,
  Plus,
  Trash2,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

// Asset paths
const image_eb8b1b0f9d529bddb7455a7756fbecb420fb6b08 = '/eb8b1b0f9d529bddb7455a7756fbecb420fb6b08.png';
const image_3e42fce03399e38ff4bc7b7ac1aac5523d7f5b21 = '/3e42fce03399e38ff4bc7b7ac1aac5523d7f5b21.png';
const mentorImage = '/f4fbdc80ee72c690b4f2b7319e431b41c607dbef.png';
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
    title: 'Your Starknet Journey',
    subtitle: 'The Beginning',
    icon: Rocket,
    unlocked: true,
    color: '#FFD93D', // Yellow
    borderColor: '#000000',
  },
  {
    id: 2,
    title: 'Liquid Staking',
    subtitle: 'DeFi Moves',
    icon: Droplet,
    unlocked: true,
    color: '#6BCF7F', // Mint green
    borderColor: '#000000',
  },
  {
    id: 3,
    title: 'STRK & BTC Native Staking',
    subtitle: 'Native Power',
    icon: Shield,
    unlocked: false,
    color: '#FF6B9D', // Pink
    borderColor: '#000000',
  },
];

// Scrolling ticker component
function Ticker({ isTurquoiseMode }: { isTurquoiseMode?: boolean }) {
  const tickerText = [
    '🚀 WELCOME TO STARKNET WRAPPED 2025',
    '💎 CHECK YOUR STATS',
    '🔥 SHARE WITH FRENS',
    '⚡ POWERED BY ENDUR.FI',
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

// Animated DeFi Background
function AnimatedDefiBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <DefiBackgroundIllustrations />
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
  toggleTurquoiseMode,
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

  const handleSubmit = () => {
    if (walletAddresses.length === 0) {
      toast.error('Add at least one wallet!');
      return;
    }

    if (!isTwitterConnected) {
      toast.error('Connect with Twitter first!');
      return;
    }
    
    // Clear localStorage before proceeding
    localStorage.removeItem('walletAddresses');
    
    onStart(walletAddresses);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: isTurquoiseMode ? '#008080' : '#014a42' }}>
      <AnimatedDefiBackground />
      <Ticker isTurquoiseMode={isTurquoiseMode} />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        {/* Main content */}
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
            className="text-6xl md:text-9xl font-black mb-6 leading-none"
            style={{ 
              color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
              textShadow: '4px 4px 0px #000000' 
            }}
          >
            STARKNET
            <br />
            WRAPPED
            <br />
            2025
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-black mb-12"
            style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
          >
            YOUR YEAR IN DEGEN STATS 🔥
          </motion.p>

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
                        <p className="text-lg font-bold text-black font-mono">{address}</p>
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
                LET'S FUCKING GO! 🚀
              </motion.button>
            </motion.div>
          )}

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

function Dashboard({
  acts,
  onSelectAct,
  userData,
  isTurquoiseMode,
  toggleTurquoiseMode,
}: {
  acts: Act[];
  onSelectAct: (actId: number) => void;
  userData: UserWrappedData;
  isTurquoiseMode: boolean;
  toggleTurquoiseMode: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: isTurquoiseMode ? '#008080' : '#014a42' }}>
      <AnimatedDefiBackground />
      <Ticker isTurquoiseMode={isTurquoiseMode} />

      <div className="flex-1 p-6 md:p-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl md:text-7xl font-black mb-4"
            style={{ 
              color: isTurquoiseMode ? '#00FFEF' : '#00DE71',
              textShadow: isTurquoiseMode 
                ? '0 0 20px rgba(0, 255, 239, 0.6), 0 0 40px rgba(0, 255, 239, 0.4), 3px 3px 0px rgba(0,0,0,0.3)' 
                : '3px 3px 0px rgba(0,0,0,0.3)' 
            }}
          >
            YOUR WRAPPED
          </h1>
          <div 
            className="inline-block border-4 border-black px-6 py-3 rounded-xl mb-6"
            style={{ backgroundColor: isTurquoiseMode ? '#000000' : '#FFFFFF' }}
          >
            <p className="text-xl font-black" style={{ color: isTurquoiseMode ? '#FFFFFF' : '#000000' }}>{userData.address}</p>
          </div>
          
          {/* Mentor Toggle Button */}
          <motion.button
            onClick={toggleTurquoiseMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 border-4 border-black rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black mx-auto"
            style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}
          >
            <Heart className="w-5 h-5" />
            for the love of Mentor
          </motion.button>
        </motion.div>

        {/* Acts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {acts.map((act, index) => (
            <motion.button
              key={act.id}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', bounce: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => act.unlocked && onSelectAct(act.id)}
              disabled={!act.unlocked}
              className={`relative p-8 border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${
                act.unlocked ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ 
                backgroundColor: isTurquoiseMode ? '#00FFEF' : act.color 
              }}
            >
              {/* Lock Icon for locked acts */}
              {!act.unlocked && (
                <div className="absolute top-4 right-4 bg-black/20 p-2 rounded-full">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Icon */}
              <div className="bg-white border-4 border-black rounded-2xl p-6 mb-6 w-fit mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                <act.icon className="w-16 h-16 text-black drop-shadow-lg" strokeWidth={2.5} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl font-black mb-2" style={{ color: '#000000' }}>
                  {act.title}
                </h3>
                <p className="text-lg font-bold" style={{ color: '#000000' }}>
                  {act.subtitle}
                </p>
              </div>

              {/* Act number badge */}
              <div className="absolute top-4 left-4 bg-black text-white border-4 border-black rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-xl font-black">{act.id}</span>
              </div>
            </motion.button>
          ))}
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <span className="font-black text-xs" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>POWERED BY</span>
          <img src={endurLogo} alt="Endur.fi" className="h-12" />
        </motion.div>
      </div>
    </div>
  );
}

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

  // Generate stat cards based on act
  const getStatCards = (actId: number): StatCard[] => {
    switch (actId) {
      case 1:
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
      case 2:
        return [
          {
            id: '2-1',
            title: 'STRK Staked',
            value: 'MIN & MAX',
            subtitle: 'liquid staking power',
            icon: Shield,
            color: '#FF6B9D',
            borderColor: '#000000',
          },
          {
            id: '2-2',
            title: 'Protocol Commitment',
            value: userData.act2.isTop1000 ? `RANK #${userData.act2.userRank}` : `${userData.act2.season1Points.toLocaleString()}`,
            subtitle: userData.act2.isTop1000 ? '🏆 Top 1000 Staker!' : 'Season 1 Points',
            icon: Trophy,
            color: '#FFD93D',
            borderColor: '#000000',
          },
          {
            id: '2-3',
            title: 'LP Provider',
            value: userData.act2.hasLPPosition ? `$${userData.act2.lpValue.toLocaleString()}` : 'NO LP',
            subtitle: userData.act2.hasLPPosition ? `${userData.act2.lpDuration} days on ${userData.act2.lpProtocol}` : 'Keep stacking!',
            icon: Waves,
            color: '#6BCF7F',
            borderColor: '#000000',
          },
          {
            id: '2-4',
            title: 'Endur Staking',
            value: `${userData.act2.endurStakingDays}`,
            subtitle: userData.act2.isDiamondHand ? '💎 Diamond Hands!' : userData.act2.isLongTermStaker ? '🔥 Long-term Staker' : 'days locked',
            icon: Shield,
            color: '#C77DFF',
            borderColor: '#000000',
          },
          {
            id: '2-5',
            title: 'DeFi Explored',
            value: userData.act2.hasDeFiPositions ? `${userData.act2.defiProtocols.length}` : 'START',
            subtitle: userData.act2.hasDeFiPositions ? '✨ True Endur User!' : 'Explore more DeFi',
            icon: Sparkles,
            color: '#4CC9F0',
            borderColor: '#000000',
          },
          {
            id: '2-6',
            title: 'LIQUID STAKING WRAPPED',
            value: 'NFT',
            subtitle: 'Share your journey!',
            icon: Droplet,
            color: '#6BCF7F',
            borderColor: '#000000',
          },
        ].filter(card => {
          // Hide LP Provider card if user has no LP position
          if (card.id === '2-3' && !userData.act2.hasLPPosition) {
            return false;
          }
          return true;
        });
      case 3:
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

  const handleShare = () => {
    const text = `Check out my #StarknetWrapped2025! 🔥\n\nAct ${act.id}: ${act.title}\n${currentCard.title}: ${currentCard.value}\n\nPowered by @Endur_fi 🚀`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(tweetUrl, '_blank');
    toast.success('Opening Twitter! 🐦');
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
            ACT {act.id}
          </h2>
          <p className="text-lg font-bold text-white/90 text-[rgba(255,255,255,0.9)]">{act.title}</p>
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
          <span className="text-sm md:text-base hidden lg:inline">for the love of Mentor</span>
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
            className="w-full max-w-2xl"
          >
            {/* Check if it's the NFT Summary Card (7th card) */}
            {currentCard.id === '1-7' ? (
              /* NFT Summary Card */
              <div
                className="border-8 border-black rounded-3xl p-8 md:p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : currentCard.color }}
              >
                {/* Decorative corner badges */}
                <div className="absolute top-4 left-4 bg-[#FFD93D] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Star className="w-7 h-7 text-black" strokeWidth={2.5} fill="black" />
                </div>
                <div className="absolute top-4 right-4 bg-[#6BCF7F] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Crown className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>

                {/* Title Banner */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <div className="inline-block bg-black border-4 border-black px-8 py-3 rounded-2xl mb-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white">
                      YOUR 2025 WRAPPED
                    </h3>
                  </div>
                  <div className="inline-block bg-white/30 border-4 border-black px-6 py-2 rounded-xl">
                    <p className="text-lg font-black text-black">COLLECTOR'S EDITION NFT</p>
                  </div>
                </motion.div>

                {/* NFT Badge - Larger and More Prominent */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                  className="flex items-center justify-center mb-8"
                >
                  <div className="relative">
                    {/* Glow effect background */}
                    <div className="absolute inset-0 bg-[#FFD93D] blur-xl opacity-50 rounded-3xl"></div>
                    {/* Main badge */}
                    <div className="relative bg-gradient-to-br from-[#FFD93D] to-[#FF6B9D] border-6 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <Gem className="w-20 h-20 md:w-24 md:h-24 text-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-black text-black text-center mb-8 leading-tight"
                  style={{ textShadow: '3px 3px 0px rgba(255,255,255,0.3)' }}
                >
                  STARKNET
                  <br />
                  LEGEND
                </motion.h4>

                {/* Stats Grid with Enhanced Design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 mb-8"
                >
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-[#FFD93D] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <p className="text-sm md:text-base font-black text-black/70">DAYS STAKED</p>
                      </div>
                      <p className="text-3xl md:text-4xl font-black text-black">{userData.act1.accountAge}</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-[#6BCF7F] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <p className="text-sm md:text-base font-black text-black/70">TRANSACTIONS</p>
                      </div>
                      <p className="text-3xl md:text-4xl font-black text-black">{userData.act1.totalTransactions.toLocaleString()}</p>
                    </motion.div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-[#C77DFF] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-black" strokeWidth={2.5} fill="black" />
                        <p className="text-sm md:text-base font-black text-black/70">GAS SAVED</p>
                      </div>
                      <p className="text-3xl md:text-4xl font-black text-black">${userData.act1.gasSavedUSD.toLocaleString()}</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="bg-[#4CC9F0] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <p className="text-sm md:text-base font-black text-black/70">PROTOCOLS</p>
                      </div>
                      <p className="text-3xl md:text-4xl font-black text-black">{userData.act1.mostActiveMonth}</p>
                    </motion.div>
                  </div>

                  {/* Row 3 - Full Width Highlight */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-gradient-to-r from-[#FFD93D] via-[#FF6B9D] to-[#C77DFF] border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white border-4 border-black rounded-full p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                          <Sparkles className="w-6 h-6 text-black" strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-base md:text-lg font-black text-black/70">GASLESS POWER</p>
                          <p className="text-2xl md:text-3xl font-black text-black">456 Transactions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl md:text-4xl font-black text-black">$456</p>
                        <p className="text-sm font-black text-black/70">SAVED</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Edition Number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center mb-6"
                >
                  <div className="inline-block bg-black border-4 border-black px-6 py-2 rounded-xl">
                    <p className="text-sm font-black text-white">
                      EDITION #{Math.floor(Math.random() * 9999) + 1} / ∞
                    </p>
                  </div>
                </motion.div>

                {/* Share Button - Enhanced */}
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
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD93D] via-[#FF6B9D] to-[#C77DFF] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Share2 className="w-7 h-7 relative z-10" />
                  <span className="relative z-10">SHARE ON X</span>
                  <Sparkles className="w-6 h-6 relative z-10" />
                </motion.button>

                {/* Powered by - Premium style */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <span className="font-black text-xs" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>POWERED BY</span>
                  <img src={endurLogo} alt="Endur.fi" className="h-12" />
                </motion.div>

                {/* Decorative bottom corners */}
                <div className="absolute bottom-4 left-4 bg-[#4CC9F0] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Zap className="w-7 h-7 text-black" strokeWidth={2.5} fill="black" />
                </div>
                <div className="absolute bottom-4 right-4 bg-[#C77DFF] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Sparkles className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>
              </div>
            ) : currentCard.id === '2-1' ? (
              /* STRK & BTC Min/Max Staking Card */
              <div
                className="border-8 border-black rounded-3xl p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]]"
                style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : currentCard.color }}
              >
                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-black mb-12 text-center"
                  style={{ color: '#000000' }}
                >
                  {currentCard.title}
                </motion.h3>

                {/* STRK Stats */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="bg-[#FFD93D] border-4 border-black rounded-full p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
                      <Coins className="w-8 h-8 text-black" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black" style={{ color: '#000000' }}>STRK</h4>
                  </div>
                  <div className="bg-white/30 border-4 border-black rounded-2xl p-6 text-center mb-4">
                    <p className="text-4xl md:text-5xl font-black text-black">{userData.act2.maxStakedSTRK.toLocaleString()}</p>
                  </div>
                  <div className="bg-black/10 border-4 border-black rounded-2xl p-4 text-center">
                    <p className="text-xl md:text-2xl font-black text-black">
                      {(userData.act2.minStakedSTRK).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : currentCard.id === '2-6' ? (
              /* Act 2 Summary Card - Liquid Staking Wrapped */
              <div
                className="border-8 border-black rounded-3xl p-8 md:p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : currentCard.color }}
              >
                {/* Decorative corner badges */}
                <div className="absolute top-4 left-4 bg-[#FFD93D] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Droplet className="w-7 h-7 text-black" strokeWidth={2.5} fill="black" />
                </div>
                <div className="absolute top-4 right-4 bg-[#4CC9F0] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Sparkles className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>

                {/* Title Banner */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <div className="inline-block bg-black border-4 border-black px-8 py-3 rounded-2xl mb-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white">
                      LIQUID STAKING 2025
                    </h3>
                  </div>
                  <div className="inline-block bg-white/30 border-4 border-black px-6 py-2 rounded-xl">
                    <p className="text-lg font-black text-black">COLLECTOR'S EDITION NFT</p>
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
                    <div className="absolute inset-0 bg-[#4CC9F0] blur-xl opacity-50 rounded-3xl"></div>
                    <div className="relative bg-gradient-to-br from-[#6BCF7F] to-[#4CC9F0] border-6 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <Droplet className="w-20 h-20 md:w-24 md:h-24 text-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-black text-black text-center mb-8 leading-tight"
                  style={{ textShadow: '3px 3px 0px rgba(255,255,255,0.3)' }}
                >
                  {userData.act2.isDiamondHand ? 'DIAMOND HANDS' : 'LIQUID LEGEND'}
                </motion.h4>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 mb-8"
                >
                  {/* Row 1 - Staking Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-[#FFD93D] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <p className="text-sm md:text-base font-black text-black/70">MAX STRK</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">{userData.act2.maxStakedSTRK.toLocaleString()}</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-[#6BCF7F] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Bitcoin className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <p className="text-sm md:text-base font-black text-black/70">MAX BTC</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">{userData.act2.maxStakedBTC}</p>
                    </motion.div>
                  </div>

                  {/* Row 2 - Protocol & LP */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-[#C77DFF] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-black" strokeWidth={2.5} fill="black" />
                        <p className="text-sm md:text-base font-black text-black/70">RANK</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">#{userData.act2.userRank}</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="bg-[#4CC9F0] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Waves className="w-5 h-5 text-black" strokeWidth={2.5} />
                        <p className="text-sm md:text-base font-black text-black/70">LP VALUE</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">${userData.act2.lpValue.toLocaleString()}</p>
                    </motion.div>
                  </div>

                  {/* Row 3 - Full Width Highlight - Staking Days & DeFi */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-gradient-to-r from-[#FFD93D] via-[#FF6B9D] to-[#C77DFF] border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white border-4 border-black rounded-full p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                          <Calendar className="w-6 h-6 text-black" strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-base md:text-lg font-black text-black/70">STAKING DAYS</p>
                          <p className="text-2xl md:text-3xl font-black text-black">{userData.act2.endurStakingDays} Days</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl md:text-4xl font-black text-black">${userData.act2.defiTotalValue.toLocaleString()}</p>
                        <p className="text-sm font-black text-black/70">DeFi VALUE</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Achievements Row */}
                  {(userData.act2.isTop1000 || userData.act2.isDiamondHand || userData.act2.hasDeFiPositions) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 }}
                      className="bg-white/30 border-4 border-black rounded-2xl p-4"
                    >
                      <p className="text-center text-base md:text-lg font-black text-black mb-2">🏆 ACHIEVEMENTS</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {userData.act2.isTop1000 && (
                          <span className="bg-[#FFD93D] border-2 border-black px-3 py-1 rounded-lg text-sm font-black">
                            🏆 TOP 1000
                          </span>
                        )}
                        {userData.act2.isDiamondHand && (
                          <span className="bg-[#6BCF7F] border-2 border-black px-3 py-1 rounded-lg text-sm font-black">
                            💎 DIAMOND HANDS
                          </span>
                        )}
                        {userData.act2.hasDeFiPositions && (
                          <span className="bg-[#4CC9F0] border-2 border-black px-3 py-1 rounded-lg text-sm font-black">
                            ✨ TRUE ENDUR USER
                          </span>
                        )}
                        {userData.act2.isLongTermStaker && (
                          <span className="bg-[#C77DFF] border-2 border-black px-3 py-1 rounded-lg text-sm font-black">
                            🔥 LONG-TERM STAKER
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Edition Number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-center mb-6"
                >
                  <div className="inline-block bg-black border-4 border-black px-6 py-2 rounded-xl">
                    <p className="text-sm font-black text-white">
                      EDITION #{Math.floor(Math.random() * 9999) + 1} / ∞
                    </p>
                  </div>
                </motion.div>

                {/* Share Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, type: 'spring', bounce: 0.5 }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const text = `🔥 My Liquid Staking #StarknetWrapped2025 🔥\\n\\n💧 ${userData.act2.maxStakedSTRK.toLocaleString()} STRK staked\\n₿ ${userData.act2.maxStakedBTC} BTC staked\\n🏆 Rank #${userData.act2.userRank}${userData.act2.isTop1000 ? ' (Top 1000!)' : ''}\\n💰 $${userData.act2.lpValue.toLocaleString()} LP value\\n📅 ${userData.act2.endurStakingDays} days staking\\n✨ $${userData.act2.defiTotalValue.toLocaleString()} DeFi value\\n\\n${userData.act2.isDiamondHand ? '💎 Diamond Hands' : ''}${userData.act2.hasDeFiPositions ? ' ✨ True Endur User' : ''}\\n\\nPowered by @Endur_fi 🚀\\n\\n#Starknet #DeFi #Crypto`;
                    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                    window.open(tweetUrl, '_blank');
                    toast.success('Opening Twitter! 🐦');
                  }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-black text-white border-4 border-black rounded-2xl font-black text-xl md:text-2xl shadow-[8px_8px_0px_0px_#6BCF7F] hover:shadow-[4px_4px_0px_0px_#6BCF7F] transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6BCF7F] via-[#4CC9F0] to-[#C77DFF] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Share2 className="w-7 h-7 relative z-10" />
                  <span className="relative z-10">SHARE ON X</span>
                  <Sparkles className="w-6 h-6 relative z-10" />
                </motion.button>

                {/* Powered by */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <span className="font-black text-xs" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>POWERED BY</span>
                  <img src={endurLogo} alt="Endur.fi" className="h-12" />
                </motion.div>

                {/* Decorative bottom corners */}
                <div className="absolute bottom-4 left-4 bg-[#FFD93D] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Waves className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>
                <div className="absolute bottom-4 right-4 bg-[#FF6B9D] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Trophy className="w-7 h-7 text-black" strokeWidth={2.5} fill="black" />
                </div>
              </div>
            ) : currentCard.id === '3-4' ? (
              /* Act 3 Summary Card - Native Staking Wrapped */
              <div
                className="border-8 border-black rounded-3xl p-8 md:p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : currentCard.color }}
              >
                {/* Decorative corner badges */}
                <div className="absolute top-4 left-4 bg-[#FFD93D] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Shield className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>
                <div className="absolute top-4 right-4 bg-[#6BCF7F] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <Bitcoin className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>

                {/* Title Banner */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <div className="inline-block bg-black border-4 border-black px-8 py-3 rounded-2xl mb-4">
                    <h3 className="text-2xl md:text-3xl font-black text-white">
                      NATIVE STAKING 2025
                    </h3>
                  </div>
                  <div className="inline-block bg-white/30 border-4 border-black px-6 py-2 rounded-xl">
                    <p className="text-lg font-black text-black">YOUR JOURNEY SUMMARY</p>
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
                      <Shield className="w-20 h-20 md:w-24 md:h-24 text-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>

                {/* Main Title */}
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-black text-black text-center mb-8 leading-tight"
                  style={{ textShadow: '3px 3px 0px rgba(255,255,255,0.3)' }}
                >
                  {userData.act3.isOGStaker ? 'OG STAKER' : 'NATIVE STAKER'}
                </motion.h4>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 mb-8"
                >
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-[#FFD93D] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Coins className="w-5 h-5 text-black" />
                        <p className="text-sm md:text-base font-black text-black/70">STRK STAKED</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">{userData.act3.totalStakedSTRK.toLocaleString()}</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-[#6BCF7F] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Bitcoin className="w-5 h-5 text-black" />
                        <p className="text-sm md:text-base font-black text-black/70">BTC STAKED</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">{userData.act3.totalStakedBTC}</p>
                    </motion.div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-[#C77DFF] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-black" />
                        <p className="text-sm md:text-base font-black text-black/70">VALIDATORS</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">{userData.act3.numberOfValidators}</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 }}
                      className="bg-[#4CC9F0] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-black" />
                        <p className="text-sm md:text-base font-black text-black/70">REWARDS</p>
                      </div>
                      <p className="text-2xl md:text-3xl font-black text-black">${userData.act3.rewardsEarnedUSD.toLocaleString()}</p>
                    </motion.div>
                  </div>

                  {/* Row 3 - Full Width Highlight */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-gradient-to-r from-[#FFD93D] via-[#FF6B9D] to-[#C77DFF] border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white border-4 border-black rounded-full p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                          <Calendar className="w-6 h-6 text-black" strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-base md:text-lg font-black text-black/70">STAKING DAYS</p>
                          <p className="text-2xl md:text-3xl font-black text-black">{userData.act3.stakingDays} Days</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl md:text-4xl font-black text-black">{userData.act3.nativeAPR}%</p>
                        <p className="text-sm font-black text-black/70">APR</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Achievements Row */}
                  {(userData.act3.isOGStaker || userData.act3.hasSmallValidators) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 }}
                      className="bg-white/30 border-4 border-black rounded-2xl p-4"
                    >
                      <p className="text-center text-base md:text-lg font-black text-black mb-2">🏆 ACHIEVEMENTS</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {userData.act3.isOGStaker && (
                          <span className="bg-[#FFD93D] border-2 border-black px-3 py-1 rounded-lg text-sm font-black">
                            🔥 OG STAKER
                          </span>
                        )}
                        {userData.act3.hasSmallValidators && (
                          <span className="bg-[#6BCF7F] border-2 border-black px-3 py-1 rounded-lg text-sm font-black">
                            🌟 DECENTRALIZATION HERO
                          </span>
                        )}
                        {userData.act3.avgDaysBetweenClaims <= 7 && (
                          <span className="bg-[#4CC9F0] border-2 border-black px-3 py-1 rounded-lg text-sm font-black">
                            ⚡ SUPER ACTIVE
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Edition Number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-center mb-6"
                >
                  <div className="inline-block bg-black border-4 border-black px-6 py-2 rounded-xl">
                    <p className="text-sm font-black text-white">
                      EDITION #{Math.floor(Math.random() * 9999) + 1} / ∞
                    </p>
                  </div>
                </motion.div>

                {/* Share Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, type: 'spring', bounce: 0.5 }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const text = `🔥 My Native Staking #StarknetWrapped2025 🔥\\n\\n🪙 ${userData.act3.totalStakedSTRK.toLocaleString()} STRK staked\\n₿ ${userData.act3.totalStakedBTC} BTC staked\\n🛡️ ${userData.act3.numberOfValidators} validators\\n💰 $${userData.act3.rewardsEarnedUSD.toLocaleString()} rewards earned\\n📅 ${userData.act3.stakingDays} days staking\\n\\n${userData.act3.isOGStaker ? '🔥 OG Staker' : ''}${userData.act3.hasSmallValidators ? ' 🌟 Decentralization Hero' : ''}\\n\\nPowered by @Endur_fi 🚀\\n\\n#Starknet #DeFi #Crypto`;
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

                {/* Powered by */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mt-6 flex items-center justify-center gap-3"
                >
                  <span className="font-black text-xs" style={{ color: isTurquoiseMode ? '#00FFEF' : '#00DE71' }}>POWERED BY</span>
                  <img src={endurLogo} alt="Endur.fi" className="h-12" />
                </motion.div>

                {/* Decorative bottom corners */}
                <div className="absolute bottom-4 left-4 bg-[#4CC9F0] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-black" />
                </div>
                <div className="absolute bottom-4 right-4 bg-[#C77DFF] border-4 border-black rounded-full w-12 h-12 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-black" />
                </div>
              </div>
            ) : (
              /* Regular Stat Card */
              <div
                className="border-8 border-black rounded-3xl p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: isTurquoiseMode ? '#00FFEF' : currentCard.color }}
              >
                {/* Title */}
                {currentCard.id !== '1-1' && (
                  <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-black mb-12 text-center"
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
                         <div className="flex items-center justify-center gap-2 text-xl md:text-2xl">
                           <Gem className="w-6 h-6 text-[#FFD700]" strokeWidth={2.5} fill="#FFD700" />
                           <span>You held xSTRK through its lows</span>
                           <Gem className="w-6 h-6 text-[#FFD700]" strokeWidth={2.5} fill="#FFD700" />
                         </div>
                       </div>
                     ) : currentCard.id === '2-6' ? 'Times Rewards Claimed' :
                     currentCard.title}
                  </motion.h3>
                )}

                {/* Value */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                  className="mb-12 text-center"
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

                {/* Subtitle with Icon */}
                {currentCard.subtitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-black/10 border-4 border-black w-full"
                  >
                    <p className="text-xl md:text-3xl font-black text-center" style={{ color: '#000000' }}>
                      {currentCard.id === '1-3' ? (
                        <>
                          <span className="font-black">$34 Gas spent</span>
                          <span className="font-medium text-lg md:text-2xl">{` (avg $0.01 per tx)`}</span>
                        </>
                      ) : (
                        currentCard.subtitle
                      )}
                    </p>
                    {currentCard.images ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, type: 'spring' }}
                        className="flex items-center justify-center"
                      >
                        <div className="relative h-12 w-24">
                          {currentCard.images.map((img, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                              className="absolute bg-white border-4 border-black rounded-full p-2"
                              style={{ 
                                left: `${index * 20}px`,
                                zIndex: currentCard.images.length - index,
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
                        transition={{ delay: 0.7, type: 'spring' }}
                        className={currentCard.id === '2-5' && userData.act2.hasDeFiPositions ? "" : "bg-white border-4 border-black rounded-full p-3"}
                      >
                        {currentCard.id === '2-5' && userData.act2.hasDeFiPositions ? (
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
                          </div>
                        ) : (
                          <currentCard.icon className="w-8 h-8 text-black" />
                        )}
                      </motion.div>
                    ) : null}
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
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);

  const toggleTurquoiseMode = () => {
    setIsTurquoiseMode(prev => !prev);
    toast.success(isTurquoiseMode ? 'Back to normal! ✨' : 'For the love of Mentor! 💙');
  };

  const handleStart = async (addresses: string[]) => {
    setWalletAddresses(addresses);
    setIsLoading(true);
    setScreen('loading');

		let truncatedAddresses = addresses.map((address) => address.slice(0, 6) + '...' + address.slice(-4));

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
      setScreen('dashboard');
      toast.success('Wrapped data loaded! 🎉');
    } catch (error) {
      console.error('Error fetching wrapped data:', error);
      setIsLoading(false);
      toast.error('Failed to load wrapped data. Using demo data instead.');
      // Fall back to mock data
      setUserData(mockUserData);
      setScreen('dashboard');
    }
  };

  const handleSelectAct = (actId: number) => {
    const act = acts.find((a) => a.id === actId);
    if (act) {
      setSelectedAct(act);
      setScreen('act');
    }
  };

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
    setScreen('dashboard');
    setSelectedAct(null);
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

        {screen === 'dashboard' && (
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
        )}

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