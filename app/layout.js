import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'আমGO - Premium Mangoes from Rajshahi , Chapai Nawab Ganj and Naogaon. Have an আম on the GO ',
    template: '%s | আমGO Shop',
  },
  description: 'Have an আম on the GO',
  icons: {
    icon: [
      { url: '/vercel.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/vercel.svg',
    apple: '/vercel.svg'
  },
  openGraph: {
    title: 'আমGO ',
    description: 'Have an আম on the GO',
    url: 'https://aamgoshop.vercel.app',
    siteName: 'আমGO',
    images: [
      {
        url: 'https://aamgoshop.vercel.app/vercel.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'আমGO',
    description: 'Have an আম on the GO',
    images: ['https://aamgoshop.vercel.app/vercel.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDBE02' },
    { media: '(prefers-color-scheme: dark)', color: '#F57F17' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
