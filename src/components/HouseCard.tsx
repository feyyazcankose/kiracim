"use client";

import Image from "next/image";
import Link from "next/link";
import { House } from "@/types";

interface HouseCardProps {
  house: House;
  onCompareAdd?: () => void;
  showCompareButton?: boolean;
  isSelected?: boolean;
}

export default function HouseCard({
  house,
  onCompareAdd,
  showCompareButton = false,
  isSelected = false,
}: HouseCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`card overflow-hidden transition-all duration-300 hover:shadow-lg ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={house.photos[0] || "/placeholder-house.jpg"}
          alt={house.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {house.buildingAge < 5 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            Yeni Bina
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {house.name}
            </h3>
            <p className="text-gray-600 text-sm">
              {house.district}, {house.city}
            </p>
          </div>
          {showCompareButton && (
            <button
              onClick={onCompareAdd}
              className={`ml-3 p-2 rounded-lg transition-colors ${
                isSelected
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-primary hover:text-white"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Details */}
        <div className="space-y-3">
          {/* Rooms and Size */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {house.rooms} oda • {house.size}m²
            </span>
            <span className="text-gray-600">{house.buildingAge} yaşında</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(house.rent)}
              </div>
              <div className="text-sm text-gray-600">
                Günlük: {formatPrice(house.dailyCost)}
              </div>
            </div>
          </div>

          {/* Commute Info */}
          <div className="border-t pt-3">
            <div className="flex items-center space-x-4 text-sm">
              {house.commuteTimes.bus && (
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2H10a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span className="text-gray-600">
                    {house.commuteTimes.bus.duration}dk
                  </span>
                </div>
              )}

              {house.commuteTimes.metro && (
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-gray-600">
                    {house.commuteTimes.metro.duration}dk
                  </span>
                </div>
              )}

              {house.commuteTimes.car && (
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="text-gray-600">
                    {house.commuteTimes.car.duration}dk
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Link
            href={`/house/${house.id}`}
            className="block w-full text-center btn-primary mt-4"
          >
            Detayları Gör
          </Link>
        </div>
      </div>
    </div>
  );
}
