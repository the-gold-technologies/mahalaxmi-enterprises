import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAHALAXMI ENTERPRISES | Industrial Lubricants & Greases Distributor',
  description:
    'MAHALAXMI ENTERPRISES is a leading Industrial Lubricants Division (ILD) supplier, offering high-performance industrial oils, greases, metalworking fluids, and machinery solutions.',
  keywords:
    'MAHALAXMI ENTERPRISES, Mahalaxmi Enterprises, Industrial Oils, Greases, Engine Oil Dealer, Baghpat, Uttar Pradesh',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
