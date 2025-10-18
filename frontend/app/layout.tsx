import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tracker de transactions",
  description: " Une simple application de suivi des transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="synthwave">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <div className="flex justify-center items-center min-h-screen my-5">
          {children}
        </div>
      </body>
    </html>
  );
}
