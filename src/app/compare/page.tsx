"use client";

import { useState, useEffect } from "react";
import { House } from "@/types";
import { CursorAPI } from "@/lib/cursor";
import HouseCard from "@/components/HouseCard";
import Image from "next/image";

export default function ComparePage() {
  const [allHouses, setAllHouses] = useState<House[]>([]);
  const [selectedHouses, setSelectedHouses] = useState<House[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    loadHouses();
  }, []);

  const loadHouses = async () => {
    try {
      setIsLoading(true);
      const houses = await CursorAPI.getAllHouses();
      setAllHouses(houses);
    } catch (error) {
      console.error("Error loading houses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHouseSelect = (house: House) => {
    if (selectedHouses.find((h) => h.id === house.id)) {
      // Remove house
      setSelectedHouses(selectedHouses.filter((h) => h.id !== house.id));
    } else if (selectedHouses.length < 3) {
      // Add house
      setSelectedHouses([...selectedHouses, house]);
    }
  };

  const handleCompare = async () => {
    if (selectedHouses.length < 2) return;

    try {
      setIsComparing(true);
      const result = await CursorAPI.compareHouses(
        selectedHouses.map((h) => h.id)
      );
      setInsights(result.insights);
    } catch (error) {
      console.error("Error comparing houses:", error);
    } finally {
      setIsComparing(false);
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
            <p className="text-gray-600">Evler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ev <span className="text-gradient">Karşılaştırma</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          En fazla 3 ev seçerek özelliklerini karşılaştırabilir, size en uygun
          seçeneği bulabilirsiniz.
        </p>
      </div>

      {/* Selection Status */}
      <div className="card p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Seçilen evler:{" "}
              <span className="font-semibold">{selectedHouses.length}/3</span>
            </span>
            {selectedHouses.length > 0 && (
              <button
                onClick={() => setSelectedHouses([])}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Tümünü Temizle
              </button>
            )}
          </div>

          {selectedHouses.length >= 2 && (
            <button
              onClick={handleCompare}
              disabled={isComparing}
              className="btn-primary disabled:opacity-50"
            >
              {isComparing ? "Karşılaştırılıyor..." : "Karşılaştır"}
            </button>
          )}
        </div>
      </div>

      {/* Selected Houses Comparison */}
      {selectedHouses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Seçilen Evler
          </h2>

          {selectedHouses.length >= 2 ? (
            /* Comparison Table */
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                        Özellik
                      </th>
                      {selectedHouses.map((house) => (
                        <th
                          key={house.id}
                          className="px-6 py-4 text-center text-sm font-medium text-gray-900 min-w-[200px]"
                        >
                          <div className="relative w-full h-32 mb-2 rounded-lg overflow-hidden">
                            <Image
                              src={house.photos[0] || "/placeholder-house.jpg"}
                              alt={house.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="font-semibold">{house.name}</div>
                          <div className="text-xs text-gray-600">
                            {house.district}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Aylık Kira
                      </td>
                      {selectedHouses.map((house) => (
                        <td
                          key={house.id}
                          className="px-6 py-4 text-center font-semibold text-primary"
                        >
                          {formatPrice(house.rent)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Günlük Maliyet
                      </td>
                      {selectedHouses.map((house) => (
                        <td key={house.id} className="px-6 py-4 text-center">
                          {formatPrice(house.dailyCost)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Oda Sayısı
                      </td>
                      {selectedHouses.map((house) => (
                        <td key={house.id} className="px-6 py-4 text-center">
                          {house.rooms} oda
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Alan
                      </td>
                      {selectedHouses.map((house) => (
                        <td key={house.id} className="px-6 py-4 text-center">
                          {house.size}m²
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Bina Yaşı
                      </td>
                      {selectedHouses.map((house) => (
                        <td key={house.id} className="px-6 py-4 text-center">
                          {house.buildingAge} yıl
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Otobüs Ulaşımı
                      </td>
                      {selectedHouses.map((house) => (
                        <td key={house.id} className="px-6 py-4 text-center">
                          {house.commuteTimes.bus
                            ? `${
                                house.commuteTimes.bus.duration
                              }dk - ${formatPrice(house.commuteTimes.bus.cost)}`
                            : "Bilgi yok"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Metro Ulaşımı
                      </td>
                      {selectedHouses.map((house) => (
                        <td key={house.id} className="px-6 py-4 text-center">
                          {house.commuteTimes.metro
                            ? `${
                                house.commuteTimes.metro.duration
                              }dk - ${formatPrice(
                                house.commuteTimes.metro.cost
                              )}`
                            : "Bilgi yok"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Selected Houses Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedHouses.map((house) => (
                <HouseCard
                  key={house.id}
                  house={house}
                  onCompareAdd={() => handleHouseSelect(house)}
                  showCompareButton={true}
                  isSelected={true}
                />
              ))}
            </div>
          )}

          {/* AI Insights */}
          {insights.length > 0 && (
            <div className="mt-8 card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                AI Önerileri
              </h3>
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* All Houses */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Tüm Evler ({allHouses.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allHouses.map((house) => (
            <HouseCard
              key={house.id}
              house={house}
              onCompareAdd={() => handleHouseSelect(house)}
              showCompareButton={true}
              isSelected={selectedHouses.some((h) => h.id === house.id)}
            />
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-12 text-center">
        <div className="card p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nasıl Karşılaştırırım?
          </h3>
          <p className="text-gray-600">
            Karşılaştırmak istediğiniz evlerin üzerindeki <strong>+</strong>{" "}
            butonuna tıklayın. En az 2, en fazla 3 ev seçebilirsiniz. Seçtikten
            sonra &ldquo;Karşılaştır&rdquo; butonuna tıklayarak detaylı
            karşılaştırma tablosunu görüntüleyebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
