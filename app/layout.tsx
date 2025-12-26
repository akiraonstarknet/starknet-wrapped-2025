import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../src/styles/index.css';

export const metadata: Metadata = {
  title: 'Year on Starknet 2024 Wrapped',
  description: 'Your year in DeFi stats',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#00de71' }}>{children}</body>
    </html>
  );
}
