import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Star, Heart, Share2, Bell, Shield, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, formatMileage } from "@/lib/utils";

async function getListing(id: string) {
  return {
    id,
    title: "2023 Toyota Hilux 2.8 GD-6 Legend 4x4",
    price: 68990000,
    year: 2023,
    mileage: 28500,
    make: "Toyota",
    model: "Hilux",
    variant: "2.8 GD-6 Legend 4x4",
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "Pickup",
    driveType: "4WD",
    colour: "White",
    seats: 5,
    doors: 4,
    owners: 1,
    engineSize: 2.8,
    power: 150,
    serviceHistory: true,
    accidentFree: true,
    features: ["Leather Seats", "Navigation", "Reverse Camera", "Towbar", "Bluetooth", "Cruise Control", "Alloy Wheels"],
    description: "Immaculate single-owner Hilux Legend with full service history at Toyota. Towbar, reverse camera, leather seats, navigation. Never off-road. Perfect for work and weekend adventures.",
    city: "Sandton",
    province: "Gauteng",
    sellerType: "DEALER",
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200",
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200",
    ],
    seller: {
      name: "Prestige Motors Sandton",
      rating: 4.7,
      reviewCount: 128,
      city: "Sandton",
      phone: "+27115551234",
      verified: true,
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/search" className="hover:text-primary">Search</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-800 line-clamp-1">{listing.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {listing.isFeatured && (
                <span className="absolute top-3 left-3 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white">
                  Featured
                </span>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {listing.images.map((img, i) => (
                <div key={i} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 border-transparent hover:border-primary cursor-pointer">
                  <Image src={img} alt="" fill className="object-cover" sizes="112px" />
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Key specifications</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                {[
                  ["Year", listing.year],
                  ["Mileage", formatMileage(listing.mileage)],
                  ["Transmission", listing.transmission],
                  ["Fuel", listing.fuelType],
                  ["Body", listing.bodyType],
                  ["Drive", listing.driveType],
                  ["Colour", listing.colour],
                  ["Seats", listing.seats],
                  ["Owners", listing.owners],
                  ["Engine", `${listing.engineSize}L`],
                  ["Power", `${listing.power} kW`],
                  ["Service history", listing.serviceHistory ? "Yes" : "No"],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="font-medium text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Features</h2>
              <ul className="flex flex-wrap gap-2">
                {listing.features.map((f) => (
                  <li key={f} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{listing.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <p className="text-3xl font-bold text-slate-900">{formatPrice(listing.price)}</p>
                <p className="mt-1 text-sm text-slate-500">{listing.title}</p>
                <div className="mt-5 flex flex-col gap-2">
                  <Button size="lg" className="w-full gap-2">
                    <Mail className="h-4 w-4" /> Contact seller
                  </Button>
                  <Button variant="outline" size="lg" className="w-full gap-2">
                    <Phone className="h-4 w-4" /> Show phone
                  </Button>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 gap-1">
                    <Heart className="h-4 w-4" /> Favourite
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-1">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 gap-1">
                    <Bell className="h-4 w-4" /> Alert
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-primary font-bold">
                    {listing.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-slate-900">{listing.seller.name}</h3>
                      {listing.seller.verified && <Shield className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {listing.seller.rating} ({listing.seller.reviewCount} reviews)
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {listing.seller.city}
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">View dealer page</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
