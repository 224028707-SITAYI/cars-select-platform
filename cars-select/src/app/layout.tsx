import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cars Select – Buy & Sell Cars, Bikes & More",
    template: "%s | Cars Select",
  },
  description:
    "South Africa's trusted multi-sided marketplace for new and used cars, bikes, commercial vehicles, parts and services. Verified dealers and private sellers.",
  keywords: ["cars for sale", "used cars", "South Africa", "dealerships", "private sellers"],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Cars Select",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
