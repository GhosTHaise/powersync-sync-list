import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DynamicSystemProvider } from '@/app/components/providers/dynamicSystemProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DynamicSystemProvider>{children}</DynamicSystemProvider>
      </body>
    </html>
  );
}