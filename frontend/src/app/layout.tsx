import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Course & Teacher Management',
  description: 'A minimalist course and teacher management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}