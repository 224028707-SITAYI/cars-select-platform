import { PrismaClient, Role, VerificationStatus, ListingStatus, VehicleCategory, FuelType, Transmission, BodyType, DriveType, SellerType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Cars Select database...");

  // Clean existing data (order matters for FKs)
  await prisma.message.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favourite.deleteMany();
  await prisma.searchAlert.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.partListing.deleteMany();
  await prisma.serviceListing.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.model.deleteMany();
  await prisma.make.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 12);

  // ==================== USERS ====================
  const admin = await prisma.user.create({
    data: {
      email: "admin@carsselect.com",
      passwordHash,
      name: "Platform Admin",
      role: Role.ADMIN,
      verificationStatus: VerificationStatus.APPROVED,
      isActive: true,
      emailVerified: new Date(),
    },
  });

  const privateSeller = await prisma.user.create({
    data: {
      email: "john.private@example.com",
      passwordHash,
      name: "John Mokoena",
      phone: "+27821234567",
      role: Role.PRIVATE_SELLER,
      verificationStatus: VerificationStatus.APPROVED,
      city: "Johannesburg",
      country: "ZA",
      emailVerified: new Date(),
      verifiedAt: new Date(),
    },
  });

  const dealership = await prisma.user.create({
    data: {
      email: "sales@prestigemotors.co.za",
      passwordHash,
      name: "Sarah van der Berg",
      phone: "+27115551234",
      role: Role.DEALERSHIP,
      verificationStatus: VerificationStatus.APPROVED,
      businessName: "Prestige Motors Sandton",
      businessRegNo: "2020/123456/07",
      vatNumber: "4123456789",
      website: "https://prestigemotors.co.za",
      city: "Sandton",
      province: "Gauteng",
      country: "ZA",
      dealerRating: 4.7,
      reviewCount: 128,
      emailVerified: new Date(),
      verifiedAt: new Date(),
      logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200",
    },
  });

  const importer = await prisma.user.create({
    data: {
      email: "import@globalauto.za",
      passwordHash,
      name: "David Chen",
      role: Role.IMPORTER_EXPORTER,
      verificationStatus: VerificationStatus.APPROVED,
      businessName: "Global Auto Imports",
      city: "Durban",
      province: "KwaZulu-Natal",
      country: "ZA",
      dealerRating: 4.5,
      reviewCount: 64,
      emailVerified: new Date(),
      verifiedAt: new Date(),
    },
  });

  const partsSeller = await prisma.user.create({
    data: {
      email: "parts@autozone.co.za",
      passwordHash,
      name: "Thabo Nkosi",
      role: Role.PARTS_SELLER,
      verificationStatus: VerificationStatus.APPROVED,
      businessName: "AutoZone Parts SA",
      city: "Pretoria",
      country: "ZA",
      emailVerified: new Date(),
      verifiedAt: new Date(),
    },
  });

  const serviceCentre = await prisma.user.create({
    data: {
      email: "bookings@precisionauto.co.za",
      passwordHash,
      name: "Lisa Botha",
      role: Role.SERVICE_CENTRE,
      verificationStatus: VerificationStatus.APPROVED,
      businessName: "Precision Auto Service",
      city: "Cape Town",
      province: "Western Cape",
      country: "ZA",
      dealerRating: 4.8,
      reviewCount: 95,
      emailVerified: new Date(),
      verifiedAt: new Date(),
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: "buyer@example.com",
      passwordHash,
      name: "Emma Wilson",
      role: Role.USER,
      verificationStatus: VerificationStatus.APPROVED,
      city: "Johannesburg",
      emailVerified: new Date(),
    },
  });

  console.log("✅ Users created");

  // ==================== MAKES & MODELS ====================
  const makesData = [
    { name: "Toyota", slug: "toyota", isPopular: true, models: ["Corolla", "Hilux", "RAV4", "Fortuner", "Land Cruiser", "Yaris"] },
    { name: "Volkswagen", slug: "volkswagen", isPopular: true, models: ["Polo", "Golf", "Tiguan", "Amarok", "T-Cross"] },
    { name: "BMW", slug: "bmw", isPopular: true, models: ["3 Series", "5 Series", "X3", "X5", "1 Series"] },
    { name: "Mercedes-Benz", slug: "mercedes-benz", isPopular: true, models: ["C-Class", "E-Class", "GLC", "A-Class", "GLE"] },
    { name: "Ford", slug: "ford", isPopular: true, models: ["Ranger", "Everest", "Focus", "EcoSport", "Mustang"] },
    { name: "Hyundai", slug: "hyundai", isPopular: true, models: ["i20", "Tucson", "Creta", "Santa Fe", "i10"] },
    { name: "Nissan", slug: "nissan", isPopular: false, models: ["Navara", "Qashqai", "X-Trail", "Micra"] },
    { name: "Audi", slug: "audi", isPopular: true, models: ["A3", "A4", "Q5", "Q3", "A1"] },
    { name: "Kia", slug: "kia", isPopular: false, models: ["Sportage", "Seltos", "Picanto", "Sorento"] },
    { name: "Isuzu", slug: "isuzu", isPopular: false, models: ["D-Max", "mu-X"] },
  ];

  for (const m of makesData) {
    const make = await prisma.make.create({
      data: {
        name: m.name,
        slug: m.slug,
        isPopular: m.isPopular,
        models: {
          create: m.models.map((modelName) => ({
            name: modelName,
            slug: modelName.toLowerCase().replace(/\s+/g, "-"),
            variants: [],
          })),
        },
      },
    });
  }

  console.log("✅ Makes & models created");

  // ==================== VEHICLE LISTINGS ====================
  const vehicles = [
    {
      sellerId: dealership.id,
      title: "2023 Toyota Hilux 2.8 GD-6 Legend 4x4",
      description: "Immaculate single-owner Hilux Legend with full service history at Toyota. Towbar, reverse camera, leather seats, navigation. Never off-road. Perfect for work and weekend adventures.",
      price: 68990000, // R689,900
      make: "Toyota",
      model: "Hilux",
      variant: "2.8 GD-6 Legend 4x4",
      year: 2023,
      mileage: 28500,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.PICKUP,
      driveType: DriveType.FOUR_WD,
      colour: "White",
      seats: 5,
      doors: 4,
      owners: 1,
      engineSize: 2.8,
      power: 150,
      serviceHistory: true,
      features: ["Leather Seats", "Navigation", "Reverse Camera", "Towbar", "Bluetooth", "Cruise Control", "Alloy Wheels"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      isFeatured: true,
      isSponsored: true,
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      ],
    },
    {
      sellerId: dealership.id,
      title: "2022 BMW X3 xDrive20d M Sport",
      description: "Stunning M Sport X3 in Phytonic Blue. Full BMW service history, panoramic roof, harman/kardon sound, adaptive suspension. One previous owner.",
      price: 74990000,
      make: "BMW",
      model: "X3",
      variant: "xDrive20d M Sport",
      year: 2022,
      mileage: 41200,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SUV,
      driveType: DriveType.AWD,
      colour: "Phytonic Blue",
      seats: 5,
      doors: 5,
      owners: 1,
      engineSize: 2.0,
      power: 140,
      serviceHistory: true,
      features: ["Panoramic Roof", "Harman/Kardon", "Adaptive Suspension", "Leather", "Navigation", "Parking Assist", "LED Headlights"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      isFeatured: true,
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980adfab?w=800",
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e226?w=800",
      ],
    },
    {
      sellerId: privateSeller.id,
      title: "2019 Volkswagen Polo 1.0 TSI Comfortline",
      description: "Well looked after Polo with full service history. Great first car or city runabout. Fuel efficient and reliable. Recent new tyres and brakes.",
      price: 22990000,
      make: "Volkswagen",
      model: "Polo",
      variant: "1.0 TSI Comfortline",
      year: 2019,
      mileage: 67800,
      fuelType: FuelType.PETROL,
      transmission: Transmission.MANUAL,
      bodyType: BodyType.HATCHBACK,
      driveType: DriveType.FWD,
      colour: "Reflex Silver",
      seats: 5,
      doors: 5,
      owners: 2,
      engineSize: 1.0,
      power: 70,
      serviceHistory: true,
      features: ["Bluetooth", "Air Conditioning", "Electric Windows", "ABS", "Isofix"],
      city: "Johannesburg",
      province: "Gauteng",
      sellerType: SellerType.PRIVATE,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
      ],
    },
    {
      sellerId: importer.id,
      title: "2024 Mercedes-Benz C200 AMG Line (Import)",
      description: "Brand new imported C200 AMG Line. Full local warranty conversion available. Spec includes panoramic roof, ambient lighting, MBUX, and AMG styling package.",
      price: 89990000,
      make: "Mercedes-Benz",
      model: "C-Class",
      variant: "C200 AMG Line",
      year: 2024,
      mileage: 150,
      fuelType: FuelType.PETROL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SEDAN,
      driveType: DriveType.RWD,
      colour: "Obsidian Black",
      seats: 5,
      doors: 4,
      owners: 0,
      engineSize: 1.5,
      power: 150,
      serviceHistory: true,
      features: ["Panoramic Roof", "Ambient Lighting", "MBUX", "AMG Styling", "Digital Cockpit", "Wireless Charging", "Burmester Sound"],
      city: "Durban",
      province: "KwaZulu-Natal",
      sellerType: SellerType.IMPORTER,
      condition: "New",
      isFeatured: true,
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      ],
    },
    {
      sellerId: dealership.id,
      title: "2021 Ford Ranger 2.0 BiT Wildtrak 4x4",
      description: "Popular Wildtrak double cab. Full service history, roller shutter, towbar, side steps. Ideal family and work vehicle.",
      price: 54990000,
      make: "Ford",
      model: "Ranger",
      variant: "2.0 BiT Wildtrak 4x4",
      year: 2021,
      mileage: 52300,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.PICKUP,
      driveType: DriveType.FOUR_WD,
      colour: "Orange",
      seats: 5,
      doors: 4,
      owners: 1,
      engineSize: 2.0,
      power: 157,
      serviceHistory: true,
      features: ["Roller Shutter", "Towbar", "Side Steps", "Leather", "Navigation", "Reverse Camera", "Parking Sensors"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800",
      ],
    },
    {
      sellerId: privateSeller.id,
      title: "2020 Hyundai Tucson 2.0 Elite",
      description: "Family-friendly SUV with panoramic sunroof and excellent residual value. Full Hyundai service history. Spacious and comfortable.",
      price: 34990000,
      make: "Hyundai",
      model: "Tucson",
      variant: "2.0 Elite",
      year: 2020,
      mileage: 48500,
      fuelType: FuelType.PETROL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SUV,
      driveType: DriveType.FWD,
      colour: "Polar White",
      seats: 5,
      doors: 5,
      owners: 1,
      engineSize: 2.0,
      power: 115,
      serviceHistory: true,
      features: ["Panoramic Sunroof", "Leather", "Reverse Camera", "Bluetooth", "Cruise Control", "Alloy Wheels"],
      city: "Johannesburg",
      province: "Gauteng",
      sellerType: SellerType.PRIVATE,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800",
      ],
    },
    {
      sellerId: dealership.id,
      title: "2018 Audi A4 2.0 TDI Sport",
      description: "Elegant A4 with S-line styling package. Full Audi service history. Great executive sedan.",
      price: 32990000,
      make: "Audi",
      model: "A4",
      variant: "2.0 TDI Sport",
      year: 2018,
      mileage: 89200,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SEDAN,
      driveType: DriveType.FWD,
      colour: "Monsoon Grey",
      seats: 5,
      doors: 4,
      owners: 2,
      engineSize: 2.0,
      power: 110,
      serviceHistory: true,
      features: ["S-line", "Virtual Cockpit", "Leather", "Navigation", "Parking Sensors", "LED Lights"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      ],
    },
    {
      sellerId: importer.id,
      title: "2023 Toyota Land Cruiser 300 VX-R",
      description: "Iconic Land Cruiser 300 series. Fully loaded VX-R. Ideal for safari and serious off-road. Low mileage import.",
      price: 149990000,
      make: "Toyota",
      model: "Land Cruiser",
      variant: "300 VX-R",
      year: 2023,
      mileage: 12500,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SUV,
      driveType: DriveType.FOUR_WD,
      colour: "White Pearl",
      seats: 7,
      doors: 5,
      owners: 1,
      engineSize: 3.3,
      power: 225,
      serviceHistory: true,
      features: ["7 Seats", "Leather", "Multi-Terrain Select", "Crawl Control", "Premium Audio", "Cool Box", "Sunroof"],
      city: "Durban",
      province: "KwaZulu-Natal",
      sellerType: SellerType.IMPORTER,
      condition: "Used",
      isFeatured: true,
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
      ],
    },
    {
      sellerId: privateSeller.id,
      title: "2017 BMW 320i M Sport",
      description: "Sporty 3 Series with M Sport package. Well maintained, recent major service. Fun to drive.",
      price: 28990000,
      make: "BMW",
      model: "3 Series",
      variant: "320i M Sport",
      year: 2017,
      mileage: 98500,
      fuelType: FuelType.PETROL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SEDAN,
      driveType: DriveType.RWD,
      colour: "Estoril Blue",
      seats: 5,
      doors: 4,
      owners: 2,
      engineSize: 2.0,
      power: 135,
      serviceHistory: true,
      features: ["M Sport", "Leather", "Navigation", "Parking Sensors", "Sport Seats", "Alloy Wheels"],
      city: "Johannesburg",
      province: "Gauteng",
      sellerType: SellerType.PRIVATE,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980adfab?w=800",
      ],
    },
    {
      sellerId: dealership.id,
      title: "2022 Kia Sportage 2.0 CRDi EX+",
      description: "Modern Sportage with excellent warranty remaining. Feature packed and economical.",
      price: 39990000,
      make: "Kia",
      model: "Sportage",
      variant: "2.0 CRDi EX+",
      year: 2022,
      mileage: 32100,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SUV,
      driveType: DriveType.FWD,
      colour: "Gravity Grey",
      seats: 5,
      doors: 5,
      owners: 1,
      engineSize: 2.0,
      power: 136,
      serviceHistory: true,
      features: ["Panoramic Roof", "Leather", "Navigation", "Reverse Camera", "Blind Spot Monitor", "Apple CarPlay"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800",
      ],
    },
    {
      sellerId: dealership.id,
      title: "2020 Mercedes-Benz GLC 220d",
      description: "Premium compact SUV. Full Mercedes service history. Luxurious interior and strong residual values.",
      price: 59990000,
      make: "Mercedes-Benz",
      model: "GLC",
      variant: "220d",
      year: 2020,
      mileage: 55600,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SUV,
      driveType: DriveType.AWD,
      colour: "Iridium Silver",
      seats: 5,
      doors: 5,
      owners: 1,
      engineSize: 2.0,
      power: 143,
      serviceHistory: true,
      features: ["Leather", "Panoramic Roof", "Navigation", "Parking Package", "LED Headlights", "Ambient Lighting"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      isSponsored: true,
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      ],
    },
    {
      sellerId: privateSeller.id,
      title: "2016 Toyota Corolla 1.8 Exclusive",
      description: "Reliable Corolla with low running costs. Perfect daily driver. Full service history.",
      price: 18990000,
      make: "Toyota",
      model: "Corolla",
      variant: "1.8 Exclusive",
      year: 2016,
      mileage: 112000,
      fuelType: FuelType.PETROL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SEDAN,
      driveType: DriveType.FWD,
      colour: "Silver",
      seats: 5,
      doors: 4,
      owners: 2,
      engineSize: 1.8,
      power: 103,
      serviceHistory: true,
      features: ["Air Conditioning", "Bluetooth", "Electric Windows", "ABS", "Airbags"],
      city: "Johannesburg",
      province: "Gauteng",
      sellerType: SellerType.PRIVATE,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      ],
    },
    {
      sellerId: dealership.id,
      title: "2023 Volkswagen Tiguan 1.4 TSI R-Line",
      description: "Sporty R-Line Tiguan. Low mileage, full VW service history. Family SUV with style.",
      price: 54990000,
      make: "Volkswagen",
      model: "Tiguan",
      variant: "1.4 TSI R-Line",
      year: 2023,
      mileage: 18900,
      fuelType: FuelType.PETROL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.SUV,
      driveType: DriveType.FWD,
      colour: "Pure White",
      seats: 5,
      doors: 5,
      owners: 1,
      engineSize: 1.4,
      power: 110,
      serviceHistory: true,
      features: ["R-Line", "Digital Cockpit", "Navigation", "Panoramic Roof", "Leather", "Parking Assist"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      isFeatured: true,
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
      ],
    },
    {
      sellerId: importer.id,
      title: "2021 Isuzu D-Max 3.0 TD LSE 4x4",
      description: "Rugged and reliable D-Max. Excellent towing capacity. Ideal bakkie for serious work.",
      price: 45990000,
      make: "Isuzu",
      model: "D-Max",
      variant: "3.0 TD LSE 4x4",
      year: 2021,
      mileage: 47800,
      fuelType: FuelType.DIESEL,
      transmission: Transmission.AUTOMATIC,
      bodyType: BodyType.PICKUP,
      driveType: DriveType.FOUR_WD,
      colour: "Red",
      seats: 5,
      doors: 4,
      owners: 1,
      engineSize: 3.0,
      power: 140,
      serviceHistory: true,
      features: ["Towbar", "Canopy", "Leather", "Navigation", "Reverse Camera", "Diff Lock"],
      city: "Durban",
      province: "KwaZulu-Natal",
      sellerType: SellerType.IMPORTER,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800",
      ],
    },
    {
      sellerId: dealership.id,
      title: "2019 Ford Focus 1.0 EcoBoost Trend",
      description: "Economical and fun hatchback. Great for city driving with low fuel consumption.",
      price: 19990000,
      make: "Ford",
      model: "Focus",
      variant: "1.0 EcoBoost Trend",
      year: 2019,
      mileage: 72100,
      fuelType: FuelType.PETROL,
      transmission: Transmission.MANUAL,
      bodyType: BodyType.HATCHBACK,
      driveType: DriveType.FWD,
      colour: "Blue",
      seats: 5,
      doors: 5,
      owners: 1,
      engineSize: 1.0,
      power: 92,
      serviceHistory: true,
      features: ["Bluetooth", "Air Conditioning", "Electric Windows", "Cruise Control"],
      city: "Sandton",
      province: "Gauteng",
      sellerType: SellerType.DEALER,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800",
      ],
    },
    {
      sellerId: privateSeller.id,
      title: "2022 Nissan Qashqai 1.2T Acenta",
      description: "Stylish crossover with low mileage. Perfect for small families. Full service history.",
      price: 31990000,
      make: "Nissan",
      model: "Qashqai",
      variant: "1.2T Acenta",
      year: 2022,
      mileage: 24500,
      fuelType: FuelType.PETROL,
      transmission: Transmission.CVT,
      bodyType: BodyType.SUV,
      driveType: DriveType.FWD,
      colour: "Gun Metallic",
      seats: 5,
      doors: 5,
      owners: 1,
      engineSize: 1.2,
      power: 85,
      serviceHistory: true,
      features: ["Reverse Camera", "Bluetooth", "Alloy Wheels", "Climate Control", "Apple CarPlay"],
      city: "Johannesburg",
      province: "Gauteng",
      sellerType: SellerType.PRIVATE,
      condition: "Used",
      status: ListingStatus.ACTIVE,
      images: [
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800",
      ],
    },
  ];

  for (const v of vehicles) {
    const { images, ...listingData } = v;
    const listing = await prisma.listing.create({
      data: {
        ...listingData,
        publishedAt: new Date(),
        images: {
          create: images.map((url, idx) => ({
            url,
            order: idx,
            isPrimary: idx === 0,
            alt: `${listingData.make} ${listingData.model}`,
          })),
        },
      },
    });
  }

  console.log(`✅ ${vehicles.length} vehicle listings created`);

  // ==================== PARTS ====================
  await prisma.partListing.createMany({
    data: [
      {
        sellerId: partsSeller.id,
        status: ListingStatus.ACTIVE,
        title: "OEM Brake Pads Set - Toyota Hilux 2016+",
        description: "Genuine Toyota brake pads for Hilux 2016 onwards. Front set. High quality friction material.",
        price: 189900,
        condition: "New",
        brand: "Toyota",
        partNumber: "04465-0K280",
        category: "Brakes",
        compatibleMakes: ["Toyota"],
        images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400"],
        city: "Pretoria",
      },
      {
        sellerId: partsSeller.id,
        status: ListingStatus.ACTIVE,
        title: "LED Headlight Upgrade Kit - Universal",
        description: "High performance LED conversion kit. 6000K pure white. Plug and play for most modern vehicles.",
        price: 249900,
        condition: "New",
        brand: "Philips",
        category: "Lighting",
        compatibleMakes: ["Toyota", "Volkswagen", "BMW", "Ford", "Hyundai"],
        images: ["https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"],
        city: "Pretoria",
      },
      {
        sellerId: partsSeller.id,
        status: ListingStatus.ACTIVE,
        title: "Performance Air Filter - BMW B48",
        description: "High flow air filter for BMW 2.0 turbo engines. Improves throttle response and sound.",
        price: 159900,
        condition: "New",
        brand: "K&N",
        category: "Engine",
        compatibleMakes: ["BMW"],
        images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400"],
        city: "Pretoria",
      },
    ],
  });

  console.log("✅ Parts listings created");

  // ==================== SERVICES ====================
  await prisma.serviceListing.createMany({
    data: [
      {
        sellerId: serviceCentre.id,
        status: ListingStatus.ACTIVE,
        title: "Full Service - Most Vehicles",
        description: "Comprehensive full service including oil, filters, fluids, inspection and road test. Book online for priority slots.",
        priceFrom: 189900,
        category: "Service",
        services: ["Oil Change", "Filter Replacement", "Fluid Top-up", "Brake Inspection", "Road Test"],
        images: ["https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400"],
        city: "Cape Town",
        address: "45 Marine Drive, Cape Town",
        phone: "+27215551234",
        rating: 4.8,
        reviewCount: 95,
      },
      {
        sellerId: serviceCentre.id,
        status: ListingStatus.ACTIVE,
        title: "Brake Pad & Disc Replacement",
        description: "Professional brake job using quality parts. Includes machining or new discs as required.",
        priceFrom: 349900,
        category: "Repair",
        services: ["Brake Pads", "Discs", "Brake Fluid", "Safety Check"],
        images: ["https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400"],
        city: "Cape Town",
        phone: "+27215551234",
        rating: 4.8,
        reviewCount: 42,
      },
      {
        sellerId: serviceCentre.id,
        status: ListingStatus.ACTIVE,
        title: "Premium Detailing Package",
        description: "Full exterior and interior detail. Paint correction, ceramic coating option available.",
        priceFrom: 249900,
        category: "Detailing",
        services: ["Wash & Clay", "Polish", "Interior Deep Clean", "Engine Bay", "Tyre Dressing"],
        images: ["https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400"],
        city: "Cape Town",
        phone: "+27215551234",
        rating: 4.9,
        reviewCount: 67,
      },
    ],
  });

  console.log("✅ Service listings created");

  // ==================== SAMPLE FAVOURITES & ALERT ====================
  const firstListing = await prisma.listing.findFirst();
  if (firstListing) {
    await prisma.favourite.create({
      data: {
        userId: regularUser.id,
        listingId: firstListing.id,
      },
    });

    await prisma.searchAlert.create({
      data: {
        userId: regularUser.id,
        name: "Toyota Hilux under R700k",
        filters: {
          make: "Toyota",
          model: "Hilux",
          maxPrice: 70000000,
        },
        frequency: "DAILY",
      },
    });
  }

  console.log("✅ Sample engagement data created");
  console.log("\n🎉 Seed completed successfully!");
  console.log("\nTest accounts (password for all: Password123!):");
  console.log("  Admin:           admin@carsselect.com");
  console.log("  Private Seller:  john.private@example.com");
  console.log("  Dealership:      sales@prestigemotors.co.za");
  console.log("  Importer:        import@globalauto.za");
  console.log("  Parts Seller:    parts@autozone.co.za");
  console.log("  Service Centre:  bookings@precisionauto.co.za");
  console.log("  Buyer:           buyer@example.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
