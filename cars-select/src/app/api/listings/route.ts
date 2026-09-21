import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minYear: z.coerce.number().optional(),
  maxYear: z.coerce.number().optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  city: z.string().optional(),
  sellerType: z.string().optional(),
  featured: z.string().optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
  sort: z.enum(["newest", "price_asc", "price_desc", "mileage_asc"]).default("newest"),
});

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const parsed = searchSchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const { q, make, model, category, minPrice, maxPrice, minYear, maxYear, fuelType, transmission, city, sellerType, featured, page, limit, sort } = parsed.data;

    const where: any = {
      status: "ACTIVE",
    };

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { make: { contains: q, mode: "insensitive" } },
        { model: { contains: q, mode: "insensitive" } },
      ];
    }
    if (make) where.make = { equals: make, mode: "insensitive" };
    if (model) where.model = { equals: model, mode: "insensitive" };
    if (category) where.category = category;
    if (minPrice != null || maxPrice != null) {
      where.price = {};
      if (minPrice != null) where.price.gte = minPrice;
      if (maxPrice != null) where.price.lte = maxPrice;
    }
    if (minYear != null || maxYear != null) {
      where.year = {};
      if (minYear != null) where.year.gte = minYear;
      if (maxYear != null) where.year.lte = maxYear;
    }
    if (fuelType) where.fuelType = fuelType;
    if (transmission) where.transmission = transmission;
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (sellerType) where.sellerType = sellerType;
    if (featured === "true") where.isFeatured = true;

    const orderBy: any =
      sort === "price_asc" ? { price: "asc" } :
      sort === "price_desc" ? { price: "desc" } :
      sort === "mileage_asc" ? { mileage: "asc" } :
      { createdAt: "desc" };

    const [total, listings] = await Promise.all([
      prisma.listing.count({ where }),
      prisma.listing.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          images: { orderBy: { order: "asc" }, take: 1 },
          seller: {
            select: {
              id: true,
              name: true,
              businessName: true,
              dealerRating: true,
              city: true,
              role: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      data: listings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Listings API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
