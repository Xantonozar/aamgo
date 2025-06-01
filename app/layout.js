import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://www.amgomangoes.com'),
  title: {
    default: 'AmGo Mangoes - Premium Mangoes from Bangladesh',
    template: '%s | AmGo Mangoes'
  },
  description: 'Discover premium quality mangoes from Bangladesh. Shop fresh, organic mangoes including Alphonso, Langra, and more. Fast delivery and excellent customer service.',
  keywords: ['mangoes', 'Bangladesh mangoes', 'premium mangoes', 'fresh mangoes', 'organic mangoes', 'Alphonso mango', 'Langra mango', 'mango delivery'],
  authors: [{ name: 'AmGo Mangoes' }],
  creator: 'AmGo Mangoes',
  publisher: 'AmGo Mangoes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.amgomangoes.com',
    siteName: 'AmGo Mangoes',
    title: 'AmGo Mangoes - Premium Mangoes from Bangladesh',
    description: 'Discover premium quality mangoes from Bangladesh. Shop fresh, organic mangoes including Alphonso, Langra, and more.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AmGo Mangoes - Premium Mangoes from Bangladesh',
        type: 'image/jpeg',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AmGo Mangoes - Premium Mangoes from Bangladesh',
    description: 'Discover premium quality mangoes from Bangladesh. Shop fresh, organic mangoes including Alphonso, Langra, and more.',
    images: [
      {
        url: '/images/twitter-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AmGo Mangoes - Premium Mangoes from Bangladesh',
        type: 'image/jpeg',
      }
    ],
    creator: '@amgomangoes',
    site: '@amgomangoes'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    bing: 'your-bing-verification',
  },
  alternates: {
    canonical: 'https://www.amgomangoes.com',
    languages: {
      'en-US': 'https://www.amgomangoes.com',
      'bn-BD': 'https://www.amgomangoes.com/bn',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDBE02' },
    { media: '(prefers-color-scheme: dark)', color: '#F57F17' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AmGo Mangoes',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#FDBE02" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
