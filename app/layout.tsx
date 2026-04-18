import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Secure Watch 24 | Professional Security Monitoring',
  description: '24/7 CCTV surveillance and remote security management for residential, commercial, and industrial sectors.',
  keywords: 'security, monitoring, CCTV, surveillance, remote management, Secure Watch 24',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
