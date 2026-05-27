import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KoinX — Tax Loss Harvesting',
  description:
    'Optimize your crypto tax liability with intelligent tax-loss harvesting. Visualize capital gains and simulate harvesting strategies in real-time.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
