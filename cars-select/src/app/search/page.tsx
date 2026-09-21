import Link from "next/link";
import { Suspense } from "react";
import { VehicleCard, type VehicleCardData } from "@/components/vehicles/VehicleCard";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

// Mock data for demonstration (in production this comes from Prisma)
const mockVehicles: VehicleCardData[] = [
  {
    id: "1",
    title: "2023 Toyota Hilux 2.8 GD-6 Legend 4x4",
    price: 68990000,
    year: 2023,
    mileage: 28500,
    city: "Sandton",
    make: "Toyota",
    model: "Hilux",
    transmission: "Automatic",
    fuelType: "Diesel",
    isFeatured: true,
    isSponsored: true,
    sellerType: "DEALER",
    dealerRating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    imageCount: 12,
  },
  {
    id: "2",
    title: "2022 BMW X3 xDrive20d M Sport",
    price: 74990000,
    year: 2022,
    mileage: 41200,
    city: "Sandton",
    make: "BMW",
    model: "X3",
    transmission: "Automatic",
    fuelType: "Diesel",
    isFeatured: true,
    sellerType: "DEALER",
    dealerRating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980adfab?w=600",
    imageCount: 18,
  },
  {
    id: "3",
    title: "2019 Volkswagen Polo 1.0 TSI Comfortline",
    price: 22990000,
    year: 2019,
    mileage: 67800,
    city: "Johannesburg",
    make: "Volkswagen",
    model: "Polo",
    transmission: "Manual",
    fuelType: "Petrol",
    sellerType: "PRIVATE",
    imageUrl: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600",
    imageCount: 8,
  },
  {
    id: "4",
    title: "2024 Mercedes-Benz C200 AMG Line",
    price: 89990000,
    year: 2024,
    mileage: 150,
    city: "Durban",
    make: "Mercedes-Benz",
    model: "C-Class",
    transmission: "Automatic",
    fuelType: "Petrol",
    isFeatured: true,
    sellerType: "IMPORTER",
    dealerRating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600",
    imageCount: 15,
  },
  {
    id: "5",
    title: "2021 Ford Ranger 2.0 BiT Wildtrak 4x4",
    price: 54990000,
    year: 2021,
    mileage: 52300,
    city: "Sandton",
    make: "Ford",
    model: "Ranger",
    transmission: "Automatic",
    fuelType: "Diesel",
    sellerType: "DEALER",
    dealerRating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=600",
    imageCount: 10,
  },
  {
    id: "6",
    title: "2020 Hyundai Tucson 2.0 Elite",
    price: 34990000,
    year: 2020,
    mileage: 48500,
    city: "Johannesburg",
    make: "Hyundai",
    model: "Tucson",
    transmission: "Automatic",
    fuelType: "Petrol",
    sellerType: "PRIVATE",
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600",
    imageCount: 9,
  },
];

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs & count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <nav className="text-sm text-slate-500 mb-1">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span className="mx-1.5">/</span>
              <span className="text-slate-800">Search</span>
            </nav>
            <h1 className="text-xl font-bold text-slate-900">
              {mockVehicles.length} vehicles found
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <select className="h-9 rounded-lg border border-border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Newest first</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
              <option>Mileage: low to high</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Make</h3>
                <div className="space-y-2 text-sm">
                  {["Toyota", "BMW", "Volkswagen", "Ford", "Mercedes-Benz", "Hyundai"].map((make) => (
                    <label key={make} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                      <span>{make}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Price range</h3>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
                  <input type="number" placeholder="Max" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Year</h3>
                <div className="flex gap-2">
                  <input type="number" placeholder="From" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
                  <input type="number" placeholder="To" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Fuel type</h3>
                <div className="space-y-2 text-sm">
                  {["Petrol", "Diesel", "Hybrid", "Electric"].map((f) => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button className="w-full">Apply filters</Button>
              <button className="w-full text-sm text-slate-500 hover:text-primary">Reset all</button>
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {/* Featured strip */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Featured & Sponsored</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockVehicles.filter((v) => v.isFeatured || v.isSponsored).map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </div>

            <h2 className="text-sm font-semibold text-slate-700 mb-3">All results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary text-white border-primary">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
