import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HP Lubricants: Buy Engine Oils & Lubricants Online | Mahalaxmi Enterprises',
  description:
    'HP Lubricants: Buy lubrication oils for bike, car, trucks & electric vehicle (EV) from the largest lube marketer. Direct supply via Mahalaxmi Enterprises.',
  keywords:
    'HP Lubricants, HPCL, Racer, Milcy, NeoSynth, Futur-X, Mahalaxmi Enterprises, Engine Oil Dealer Mumbai, Industrial Oil',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://www.hplubricants.in/sites/default/files/fevicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
