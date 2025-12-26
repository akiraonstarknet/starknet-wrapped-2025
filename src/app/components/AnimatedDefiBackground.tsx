'use client';

import React from 'react';
import DefiBackgroundIllustrations from '@/imports/DefiBackgroundIllustrations';

/**
 * Animated DeFi Background Component
 * 
 * A reusable component that displays animated DeFi background illustrations
 * across the application. Positioned as a fixed background layer with no pointer events.
 */
export default function AnimatedDefiBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <DefiBackgroundIllustrations />
    </div>
  );
}

