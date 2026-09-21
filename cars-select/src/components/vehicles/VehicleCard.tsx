import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Star, Camera } from "lucide-react";
import { formatPrice, formatMileage } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type VehicleCardData = {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage?: number | null;
  city?: string | null;
  make: string;
  model: string;
  transmission?: string | null;
  fuelType?: string | null;
  isFeatured?: boolean;
  isSponsored?: boolean;
  sellerType?: string;
  dealerRating?: number | null;
  imageUrl?: string | null;
  imageCount?: number;
};

export function VehicleCard({ vehicle }: { vehicle: VehicleCardData }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/listings/${vehicle.id}`} className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {vehicle.imageUrl ? (
          <Image
            src={vehicle.imageUrl}
            alt={vehicle.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No image
          </div>
        )}
        {vehicle.imageCount && vehicle.imageCount > 1 && (
          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
            <Camera className="h-3 w-3" />
            {vehicle.imageCount}
          </span>
        )}
        {(vehicle.isFeatured || vehicle.isSponsored) && (
          <span className="absolute top-2 left-2 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-white">
            {vehicle.isSponsored ? "Sponsored" : "Featured"}
          </span>
        )}
        <button
          className="absolute top-2 right-2 rounded-full bg-white/90 p-2 shadow hover:bg-white transition"
          aria-label="Add to favourites"
        >
          <Heart className="h-4 w-4 text-slate-600" />
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(vehicle.price)}
            </p>
            <Link href={`/listings/${vehicle.id}`} className="mt-0.5 block text-sm font-medium text-slate-800 hover:text-primary line-clamp-2">
              {vehicle.title}
            </Link>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>{vehicle.year}</span>
          {vehicle.mileage != null && <span>{formatMileage(vehicle.mileage)}</span>}
          {vehicle.transmission && <span>{vehicle.transmission}</span>}
          {vehicle.fuelType && <span>{vehicle.fuelType}</span>}
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            {vehicle.city && (
              <>
                <MapPin className="h-3.5 w-3.5" />
                <span>{vehicle.city}</span>
              </>
            )}
          </div>
          {vehicle.dealerRating != null && (
            <div className="flex items-center gap-0.5">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{vehicle.dealerRating.toFixed(1)}</span>
            </div>
          )}
          {vehicle.sellerType === "PRIVATE" && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
              Private
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
