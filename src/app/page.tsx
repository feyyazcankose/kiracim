"use client";

import { useState, useEffect } from "react";
import { House, FilterCriteria } from "@/types";
import { CursorAPI } from "@/lib/cursor";
import HouseCard from "@/components/HouseCard";
import Filter from "@/components/Filter";

export default function HomePage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    loadHouses();
  }, []);

  const loadHouses = async () => {
    try {
      setIsLoading(true);
      const allHouses = await CursorAPI.getAllHouses();
      setHouses(allHouses);
      setFilteredHouses(allHouses);
    } catch (error) {
      console.error("Error loading houses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (filters: FilterCriteria) => {
    try {
      setIsFiltering(true);
      const filtered = await CursorAPI.filterHouses(filters);
      setFilteredHouses(filtered);
    } catch (error) {
      console.error("Error filtering houses:", error);
    } finally {
      setIsFiltering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Evler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Size Özel <span className="text-gradient">Kira Evi</span> Bulun
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI destekli sistemimiz ile tercihlerinize en uygun kira evini
          keşfedin. Konum, fiyat ve ulaşım seçeneklerini karşılaştırın.
        </p>
      </div>

      {/* Filter Section */}
      <Filter onFilterChange={handleFilterChange} isLoading={isFiltering} />

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {filteredHouses.length} ev bulundu
        </h2>

        {/* Quick Stats */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span>Ortalama Kira:</span>
            <span className="font-medium">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
                minimumFractionDigits: 0,
              }).format(
                filteredHouses.reduce((sum, house) => sum + house.rent, 0) /
                  filteredHouses.length || 0
              )}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Şehir Sayısı:</span>
            <span className="font-medium">
              {new Set(filteredHouses.map((house) => house.city)).size}
            </span>
          </div>
        </div>
      </div>

      {/* Houses Grid */}
      {filteredHouses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Hiç ev bulunamadı
          </h3>
          <p className="text-gray-600">
            Arama kriterlerinizi değiştirerek tekrar deneyin.
          </p>
        </div>
      )}

      {/* Call to Action */}
      {filteredHouses.length > 0 && (
        <div className="mt-16 text-center">
          <div className="card p-8 bg-gradient-to-r from-primary to-primary-light text-white">
            <h3 className="text-2xl font-bold mb-4">
              Size Özel Öneriler İster misiniz?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Profilinizi oluşturun ve AI sistemimizin size özel ev önerilerini
              keşfedin.
            </p>
            <a
              href="/profile"
              className="inline-block bg-white text-primary px-8 py-3 rounded-button font-semibold hover:bg-gray-50 transition-colors"
            >
              Profil Oluştur
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
