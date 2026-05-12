import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Secure Watch 24 Services | Advanced CCTV Monitoring & Real-Time Protection',
  description: 'Secure Watch 24 Services provides 24/7 professional CCTV monitoring and smart surveillance solutions for businesses, homes, and critical assets. Real-time threat detection and rapid response.',
  keywords: 'Secure Watch 24 Services, CCTV monitoring, surveillance solutions, 24/7 security, remote monitoring, threat detection, professional security, Pakistan, USA',
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
