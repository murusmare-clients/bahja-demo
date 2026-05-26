import type { Metadata, Viewport } from 'next';
import PWARegister from '@/components/PWARegister';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://bahja.aissam.cloud'),
  title: {
    default: 'Fast Food El Bahdja',
    template: '%s · Fast Food El Bahdja',
  },
  description: 'Commandez pizzas, burgers et sandwichs en ligne — livraison rapide à domicile à Alger.',
  applicationName: 'El Bahdja',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'El Bahdja',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    url: 'https://bahja.aissam.cloud',
    siteName: 'Fast Food El Bahdja',
    title: 'Fast Food El Bahdja — commande WhatsApp',
    description: 'Menu en ligne, panier et commande WhatsApp pour livraison rapide à domicile.',
    images: ['/icons/icon.svg'],
    locale: 'fr_DZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Food El Bahdja — commande WhatsApp',
    description: 'Menu en ligne, panier et commande WhatsApp pour livraison rapide à domicile.',
    images: ['/icons/icon.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icons/icon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Google Fonts — loaded in browser, not at build time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Cairo:wght@200;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
