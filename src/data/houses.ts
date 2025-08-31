import { House } from "@/types";

export const sampleHouses: House[] = [
  {
    id: "1",
    name: "Modern Stüdyo Daire",
    city: "İstanbul",
    district: "Kadıköy",
    rooms: 1,
    rent: 8500,
    buildingAge: 3,
    photos: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    commuteTimes: {
      bus: { duration: 25, cost: 15 },
      metro: { duration: 20, cost: 18 },
    },
    dailyCost: 283,
    description:
      "Merkezi konumda, modern ve ferah stüdyo daire. Metro ve otobüs duraklarına yürüme mesafesinde.",
    features: ["Merkezi ısıtma", "Asansör", "Güvenlik", "İnternet"],
    size: 45,
  },
  {
    id: "2",
    name: "Aile Evi 2+1",
    city: "İstanbul",
    district: "Beylikdüzü",
    rooms: 3,
    rent: 12000,
    buildingAge: 8,
    photos: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    ],
    commuteTimes: {
      bus: { duration: 45, cost: 20 },
      car: { duration: 30, fuelCost: 35 },
    },
    dailyCost: 400,
    description:
      "Aile yaşamı için ideal, geniş ve konforlu 2+1 daire. Alışveriş merkezlerine yakın.",
    features: ["Balkon", "Kapalı otopark", "Spor salonu", "Çocuk oyun alanı"],
    size: 85,
  },
  {
    id: "3",
    name: "Lüks Rezidans 1+1",
    city: "İstanbul",
    district: "Şişli",
    rooms: 2,
    rent: 15000,
    buildingAge: 2,
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    commuteTimes: {
      metro: { duration: 15, cost: 18 },
      bus: { duration: 20, cost: 15 },
      car: { duration: 12, fuelCost: 25 },
    },
    dailyCost: 500,
    description:
      "Şehir merkezinde lüks rezidansta modern 1+1 daire. Tüm ihtiyaçlara yürüme mesafesinde.",
    features: ["Kapıcı", "Vale", "Spa", "Çatı terası", "Smart home"],
    size: 65,
  },
  {
    id: "4",
    name: "Öğrenci Evi",
    city: "Ankara",
    district: "Çankaya",
    rooms: 2,
    rent: 6500,
    buildingAge: 15,
    photos: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=600&fit=crop",
    ],
    commuteTimes: {
      bus: { duration: 20, cost: 12 },
      metro: { duration: 25, cost: 15 },
    },
    dailyCost: 217,
    description:
      "Üniversiteye yakın, öğrenci dostu fiyatlarda 1+1 daire. Temiz ve güvenli mahallede.",
    features: ["Eşyalı", "İnternet dahil", "Güvenlik"],
    size: 50,
  },
  {
    id: "5",
    name: "Deniz Manzaralı Villa",
    city: "İzmir",
    district: "Konak",
    rooms: 4,
    rent: 18000,
    buildingAge: 5,
    photos: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    ],
    commuteTimes: {
      bus: { duration: 30, cost: 18 },
      car: { duration: 20, fuelCost: 30 },
    },
    dailyCost: 600,
    description:
      "Deniz manzaralı, geniş bahçeli villa. Aileler için ideal, prestijli mahallede.",
    features: ["Bahçe", "Deniz manzarası", "BBQ alanı", "Otopark", "Güvenlik"],
    size: 150,
  },
  {
    id: "6",
    name: "Merkezi Ofis Yakını",
    city: "İstanbul",
    district: "Levent",
    rooms: 2,
    rent: 13500,
    buildingAge: 10,
    photos: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    ],
    commuteTimes: {
      metro: { duration: 10, cost: 18 },
      bus: { duration: 15, cost: 15 },
      car: { duration: 8, fuelCost: 20 },
    },
    dailyCost: 450,
    description:
      "İş merkezlerine çok yakın, ulaşım kolaylığı olan modern 1+1 daire.",
    features: ["Merkezi konum", "Asansör", "Güvenlik", "Otopark"],
    size: 70,
  },
];
