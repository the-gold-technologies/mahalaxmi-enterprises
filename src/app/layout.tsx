import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mahalaxmi Enterprises | Authorized Industrial Lubricants Distributor - HP Lubricants',
  description:
    'Mahalaxmi Enterprises is an Authorized Industrial Lubricants Division (ILD) of HP Lubricants (HPCL), offering industrial oils, greases, metalworking fluids, and machinery solutions.',
  keywords:
    'Mahalaxmi Enterprises, HP Lubricants, Industrial Oils, Greases, HPCL Distributor, Engine Oil Dealer, Baghpat, Uttar Pradesh',
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
