import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Andi Indra Lestya Wicaksono | Creative Developer & UI Architect',
  description:
    'Personal portfolio of Andi Indra Lestya Wicaksono showcasing high-performance full-stack web applications, motion design, and digital experiences.',
  keywords: [
    'Andi Indra Lestya Wicaksono',
    'Creative Developer',
    'UI Architect',
    'Next.js Portfolio',
    'TypeScript',
    'Framer Motion',
    'Frontend Engineer',
  ],
  authors: [{ name: 'Andi Indra Lestya Wicaksono' }],
  icons: {
    icon: '/assets/favicon.png',
    shortcut: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
  openGraph: {
    title: 'Andi Indra Lestya Wicaksono | Creative Developer Portfolio',
    description:
      'Personal portfolio of Andi Indra Lestya Wicaksono showcasing high-performance web applications and kinetic motion design.',
    url: 'https://andiindra.dev',
    siteName: 'Andi Indra Lestya Wicaksono',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0c] text-[#f5f5f7] selection:bg-white selection:text-black">
        <SmoothScroll>
          <CustomCursor />
          <NoiseOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
