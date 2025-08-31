"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { House } from "@/types";
import { CursorAPI } from "@/lib/cursor";
import RouteCard from "@/components/RouteCard";

export default function HouseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [house, setHouse] = useState<House | null>(null);
  const [routes, setRoutes] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      loadHouseDetails(params.id as string);
    }
  }, [params.id]);

  const loadHouseDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const [houseData, routeData] = await Promise.all([
        CursorAPI.getHouseById(id),
        CursorAPI.getRouteRecommendations(id, "Levent"),
      ]);

      setHouse(houseData);
      setRoutes(routeData);
    } catch (error) {
      console.error("Error loading house details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Ev detayları yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!house) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Ev bulunamadı
          </h1>
          <p className="text-gray-600 mb-6">
            Aradığınız ev mevcut değil veya kaldırılmış.
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <button onClick={() => router.push("/")} className="hover:text-primary">
          Ana Sayfa
        </button>
        <span>/</span>
        <span className="text-gray-900">{house.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Main Info */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="card overflow-hidden mb-8">
            <div className="relative h-80 md:h-96">
              <Image
                src={
                  house.photos[currentImageIndex] || "/placeholder-house.jpg"
                }
                alt={house.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              />

              {/* Image Navigation */}
              {house.photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        currentImageIndex === 0
                          ? house.photos.length - 1
                          : currentImageIndex - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        currentImageIndex === house.photos.length - 1
                          ? 0
                          : currentImageIndex + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {house.photos.length > 1 && (
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {house.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden ${
                      index === currentImageIndex ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`${house.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* House Information */}
          <div className="card p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {house.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {house.district}, {house.city}
                </p>
              </div>
              {house.buildingAge < 5 && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Yeni Bina
                </span>
              )}
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {house.rooms}
                </div>
                <div className="text-sm text-gray-600">Oda</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {house.size}m²
                </div>
                <div className="text-sm text-gray-600">Alan</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {house.buildingAge}
                </div>
                <div className="text-sm text-gray-600">Yaşında</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {house.features?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Özellik</div>
              </div>
            </div>

            {/* Description */}
            {house.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Açıklama
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {house.description}
                </p>
              </div>
            )}

            {/* Features */}
            {house.features && house.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Özellikler
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {house.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Price and Contact */}
        <div className="lg:col-span-1">
          {/* Price Card */}
          <div className="card p-6 mb-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {formatPrice(house.rent)}
              </div>
              <div className="text-sm text-gray-600">aylık kira</div>
              <div className="text-lg font-medium text-gray-700 mt-2">
                Günlük: {formatPrice(house.dailyCost)}
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full btn-primary">İletişime Geç</button>
              <button className="w-full btn-secondary">Favorilere Ekle</button>
              <button
                onClick={() => router.push("/compare")}
                className="w-full btn-secondary"
              >
                Karşılaştırmaya Ekle
              </button>
            </div>
          </div>

          {/* Route Information */}
          {routes && routes.routes && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ulaşım Seçenekleri
              </h3>
              <div className="space-y-4">
                {routes.routes.map((route: any, index: number) => (
                  <RouteCard
                    key={index}
                    type={route.type}
                    duration={route.duration}
                    cost={route.cost}
                    description={route.description}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
