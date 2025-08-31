"use client";

import { useState } from "react";
import { FilterCriteria } from "@/types";

interface FilterProps {
  onFilterChange: (filters: FilterCriteria) => void;
  isLoading?: boolean;
}

export default function Filter({
  onFilterChange,
  isLoading = false,
}: FilterProps) {
  const [filters, setFilters] = useState<FilterCriteria>({});

  const cities = ["İstanbul", "Ankara", "İzmir"];
  const districts = [
    "Kadıköy",
    "Şişli",
    "Levent",
    "Beylikdüzü",
    "Çankaya",
    "Konak",
  ];
  const roomOptions = [1, 2, 3, 4];

  const handleFilterChange = (key: keyof FilterCriteria, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRoomToggle = (room: number) => {
    const currentRooms = filters.rooms || [];
    const newRooms = currentRooms.includes(room)
      ? currentRooms.filter((r) => r !== room)
      : [...currentRooms, room];
    handleFilterChange("rooms", newRooms.length > 0 ? newRooms : undefined);
  };

  const handleDistrictToggle = (district: string) => {
    const currentDistricts = filters.districts || [];
    const newDistricts = currentDistricts.includes(district)
      ? currentDistricts.filter((d) => d !== district)
      : [...currentDistricts, district];
    handleFilterChange(
      "districts",
      newDistricts.length > 0 ? newDistricts : undefined
    );
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filtreler</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-primary-dark transition-colors"
        >
          Temizle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şehir
          </label>
          <select
            value={filters.city || ""}
            onChange={(e) =>
              handleFilterChange("city", e.target.value || undefined)
            }
            className="input w-full"
            disabled={isLoading}
          >
            <option value="">Tüm şehirler</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kira Aralığı (₺)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minRent || ""}
              onChange={(e) =>
                handleFilterChange(
                  "minRent",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="input w-full"
              disabled={isLoading}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxRent || ""}
              onChange={(e) =>
                handleFilterChange(
                  "maxRent",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="input w-full"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Room Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Oda Sayısı
          </label>
          <div className="flex space-x-2">
            {roomOptions.map((room) => (
              <button
                key={room}
                onClick={() => handleRoomToggle(room)}
                disabled={isLoading}
                className={`px-3 py-2 rounded-button text-sm font-medium transition-colors ${
                  filters.rooms?.includes(room)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {room}
              </button>
            ))}
          </div>
        </div>

        {/* Districts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İlçeler
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {districts.map((district) => (
              <label key={district} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.districts?.includes(district) || false}
                  onChange={() => handleDistrictToggle(district)}
                  disabled={isLoading}
                  className="rounded border-gray-300 text-primary focus:ring-primary mr-2"
                />
                <span className="text-sm text-gray-700">{district}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm text-gray-600">Filtreleniyor...</span>
        </div>
      )}
    </div>
  );
}
