import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LayoutProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gamified cybersecurity training platform',
  description: 'Modern cybersecurity learniing solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}