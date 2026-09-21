import Link from "next/link";
import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
              <Car className="h-6 w-6" />
              Cars Select
            </Link>
            <p className="mt-3 text-sm text-slate-600 max-w-xs">
              South Africa&apos;s trusted multi-sided marketplace for cars, bikes, parts and services.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Buy</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/search?category=CAR" className="hover:text-primary">Cars</Link></li>
              <li><Link href="/search?category=BIKE" className="hover:text-primary">Bikes</Link></li>
              <li><Link href="/search?category=COMMERCIAL" className="hover:text-primary">Commercial</Link></li>
              <li><Link href="/parts" className="hover:text-primary">Parts</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Sell</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/sell" className="hover:text-primary">List your vehicle</Link></li>
              <li><Link href="/dealers" className="hover:text-primary">Dealer programme</Link></li>
              <li><Link href="/valuation" className="hover:text-primary">Free valuation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Cars Select. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built for speed, security & trust.
          </p>
        </div>
      </div>
    </footer>
  );
}
