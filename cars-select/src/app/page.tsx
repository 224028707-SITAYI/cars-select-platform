import Link from "next/link";
import { Search, Calculator, TrendingUp, Shield, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const popularMakes = [
  { name: "Toyota", slug: "toyota", count: 1240 },
  { name: "Volkswagen", slug: "volkswagen", count: 890 },
  { name: "BMW", slug: "bmw", count: 670 },
  { name: "Mercedes-Benz", slug: "mercedes-benz", count: 540 },
  { name: "Ford", slug: "ford", count: 720 },
  { name: "Hyundai", slug: "hyundai", count: 480 },
  { name: "Audi", slug: "audi", count: 390 },
  { name: "Kia", slug: "kia", count: 310 },
];

const categories = [
  { name: "Cars", href: "/search?category=CAR", desc: "Sedans, SUVs, hatchbacks" },
  { name: "Bikes", href: "/search?category=BIKE", desc: "Motorcycles & scooters" },
  { name: "Leisure", href: "/search?category=LEISURE", desc: "Boats & caravans" },
  { name: "Commercial", href: "/search?category=COMMERCIAL", desc: "Vans, trucks, bakkies" },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find your next vehicle with confidence
            </h1>
            <p className="mt-4 text-lg text-slate-200">
              Verified dealers, private sellers and trusted service centres — all in one fast, modern marketplace.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-10 max-w-3xl">
            <form action="/search" method="GET" className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="h-5 w-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  name="q"
                  placeholder="Search make, model or keyword..."
                  className="w-full h-12 text-slate-900 placeholder:text-slate-400 focus:outline-none text-base"
                />
              </div>
              <Button type="submit" size="lg" className="sm:w-auto w-full">
                Search cars
              </Button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="text-slate-300">Popular:</span>
              {["Toyota Hilux", "BMW X3", "VW Polo", "Ford Ranger"].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="text-teal-200 hover:text-white underline-offset-2 hover:underline"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group rounded-2xl border border-border bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-primary">{cat.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="bg-slate-50 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/valuation" className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-border hover:border-teal-200 transition">
              <div className="rounded-xl bg-teal-50 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Free Valuation</h3>
                <p className="mt-1 text-sm text-slate-600">Get an instant market estimate for your vehicle.</p>
              </div>
            </Link>
            <Link href="/finance" className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-border hover:border-teal-200 transition">
              <div className="rounded-xl bg-teal-50 p-3">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Finance Calculator</h3>
                <p className="mt-1 text-sm text-slate-600">Estimate monthly repayments in seconds.</p>
              </div>
            </Link>
            <Link href="/dealers" className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-border hover:border-teal-200 transition">
              <div className="rounded-xl bg-teal-50 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Verified Dealers</h3>
                <p className="mt-1 text-sm text-slate-600">Buy with confidence from authorised partners.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Makes */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Popular makes</h2>
          <Link href="/search" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {popularMakes.map((make) => (
            <Link
              key={make.slug}
              href={`/search?make=${make.slug}`}
              className="flex flex-col items-center justify-center rounded-xl border border-border bg-white p-4 hover:border-teal-300 hover:shadow-sm transition text-center"
            >
              <span className="font-medium text-slate-900 text-sm">{make.name}</span>
              <span className="text-xs text-slate-500 mt-1">{make.count.toLocaleString()} cars</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured teaser */}
      <section className="bg-slate-50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-primary mb-4">
            <Star className="h-4 w-4 fill-current" /> Featured & Sponsored
          </div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Premium vehicles from verified sellers
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Explore our curated selection of high-quality listings from authorised dealerships and trusted private sellers.
          </p>
          <div className="mt-8">
            <Link href="/search?featured=true">
              <Button size="lg">Browse featured cars</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-800 to-slate-900 px-8 py-12 text-white text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Sell with Cars Select</h2>
          <p className="mt-3 text-teal-100 max-w-lg mx-auto">
            Reach thousands of serious buyers. Private sellers and authorised dealerships welcome.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/sell">
              <Button size="lg" variant="secondary">List your vehicle</Button>
            </Link>
            <Link href="/dealers">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Dealer programme
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
