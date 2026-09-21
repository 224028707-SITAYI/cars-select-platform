"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, Heart, User, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/search?category=CAR", label: "Cars" },
  { href: "/search?category=BIKE", label: "Bikes" },
  { href: "/search?category=LEISURE", label: "Leisure" },
  { href: "/search?category=COMMERCIAL", label: "Commercial" },
  { href: "/parts", label: "Parts" },
  { href: "/services", label: "Services" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Car className="h-7 w-7" />
          <span>Cars Select</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-primary rounded-lg hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="hidden sm:flex">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/favourites">
            <Button variant="ghost" size="icon" aria-label="Favourites">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard" className="hidden sm:block">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-1" />
              Account
            </Button>
          </Link>
          <Link href="/sell" className="hidden sm:block">
            <Button size="sm">Sell</Button>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden border-t border-border bg-white overflow-hidden transition-all",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-3 text-sm font-medium text-slate-700 hover:text-primary rounded-lg hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full">Account</Button>
            </Link>
            <Link href="/sell" className="flex-1">
              <Button className="w-full">Sell</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
