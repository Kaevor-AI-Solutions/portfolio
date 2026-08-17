import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Nav from '@/components/Nav';
import ScrollProgress from '@/components/ScrollProgress';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kaevor AI Solutions — AI systems that move real work.',
  description:
    'Kaevor AI Solutions designs and ships applied AI, SaaS and cross-platform products for teams that need more than a polished prototype.',
  openGraph: {
    title: 'Kaevor AI Solutions — AI systems that move real work.',
    description:
      'Applied AI and product engineering for teams that need real systems, not isolated demonstrations.',
    siteName: 'Kaevor AI Solutions',
    locale: 'en_LK',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0B0D',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ScrollProgress />
        <Nav />
        {children}
      </body>
    </html>
  );
}
