import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import QueryProvider from "@/components/layouts/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticketify",
  description: "A modern application that allows you to create and delete tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
          min-h-screen bg-zinc-900 text-zinc-200 px-8
        `} 
      >
        <Header />
        <main role="main">
          <QueryProvider>
            {children}
          </QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
