"use client";

import { useState, useEffect } from "react";
import { UserProfile, House } from "@/types";
import { CursorAPI } from "@/lib/cursor";
import HouseCard from "@/components/HouseCard";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const userProfile = await CursorAPI.getUserProfile();
      setProfile(userProfile);

      // Get recommendations based on profile
      const recs = await CursorAPI.getHouseRecommendations(userProfile);
      setRecommendations(recs);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedProfile: UserProfile) => {
    try {
      setIsUpdating(true);
      // In a real app, this would call an API to update the profile
      setProfile(updatedProfile);

      // Get new recommendations
      const recs = await CursorAPI.getHouseRecommendations(updatedProfile);
      setRecommendations(recs);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdating(false);
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
            <p className="text-gray-600">Profil yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Profil bulunamadı
          </h1>
          <p className="text-gray-600">
            Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
          <p className="text-gray-600 mt-1">
            Tercihlerinizi yönetin ve size özel öneriler alın
          </p>
        </div>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={isEditMode ? "btn-secondary" : "btn-primary"}
        >
          {isEditMode ? "İptal" : "Düzenle"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Kişisel Bilgiler
            </h2>

            {isEditMode ? (
              <ProfileEditForm
                profile={profile}
                onSave={handleProfileUpdate}
                isUpdating={isUpdating}
              />
            ) : (
              <ProfileView profile={profile} />
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Size Özel Öneriler
            </h2>
            <p className="text-gray-600">
              Profilinize göre en uygun {recommendations.length} ev bulundu
            </p>
          </div>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((house) => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
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
                Henüz öneri bulunmuyor
              </h3>
              <p className="text-gray-600">
                Tercihlerinizi güncelleyerek daha iyi öneriler alabilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Profile View Component
function ProfileView({ profile }: { profile: UserProfile }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          İsim
        </label>
        <p className="text-gray-900">{profile.name}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gelir
        </label>
        <p className="text-gray-900">{formatPrice(profile.income)}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Maksimum Kira
        </label>
        <p className="text-gray-900">
          {profile.maxRent ? formatPrice(profile.maxRent) : "Belirtilmemiş"}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tercih Edilen İlçeler
        </label>
        <div className="flex flex-wrap gap-1 mt-1">
          {profile.preferredDistricts.map((district) => (
            <span
              key={district}
              className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-lg text-sm"
            >
              {district}
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Araç Durumu
        </label>
        <p className="text-gray-900">{profile.hasVehicle ? "Var" : "Yok"}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Çalışma Saatleri
        </label>
        <p className="text-gray-900 capitalize">{profile.workSchedule}</p>
      </div>

      {profile.workLocation && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İş Yeri
          </label>
          <p className="text-gray-900">
            {profile.workLocation.district}, {profile.workLocation.city}
          </p>
        </div>
      )}
    </div>
  );
}

// Profile Edit Form Component
function ProfileEditForm({
  profile,
  onSave,
  isUpdating,
}: {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  isUpdating: boolean;
}) {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProfile);
  };

  const handleDistrictChange = (district: string, checked: boolean) => {
    const newDistricts = checked
      ? [...editedProfile.preferredDistricts, district]
      : editedProfile.preferredDistricts.filter((d) => d !== district);
    setEditedProfile({ ...editedProfile, preferredDistricts: newDistricts });
  };

  const districts = [
    "Kadıköy",
    "Şişli",
    "Levent",
    "Beylikdüzü",
    "Çankaya",
    "Konak",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          İsim
        </label>
        <input
          type="text"
          value={editedProfile.name}
          onChange={(e) =>
            setEditedProfile({ ...editedProfile, name: e.target.value })
          }
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gelir (₺)
        </label>
        <input
          type="number"
          value={editedProfile.income}
          onChange={(e) =>
            setEditedProfile({
              ...editedProfile,
              income: Number(e.target.value),
            })
          }
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Maksimum Kira (₺)
        </label>
        <input
          type="number"
          value={editedProfile.maxRent || ""}
          onChange={(e) =>
            setEditedProfile({
              ...editedProfile,
              maxRent: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tercih Edilen İlçeler
        </label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {districts.map((district) => (
            <label key={district} className="flex items-center">
              <input
                type="checkbox"
                checked={editedProfile.preferredDistricts.includes(district)}
                onChange={(e) =>
                  handleDistrictChange(district, e.target.checked)
                }
                className="rounded border-gray-300 text-primary focus:ring-primary mr-2"
              />
              <span className="text-sm text-gray-700">{district}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Araç Durumu
        </label>
        <select
          value={editedProfile.hasVehicle ? "true" : "false"}
          onChange={(e) =>
            setEditedProfile({
              ...editedProfile,
              hasVehicle: e.target.value === "true",
            })
          }
          className="input w-full"
        >
          <option value="true">Var</option>
          <option value="false">Yok</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Çalışma Saatleri
        </label>
        <select
          value={editedProfile.workSchedule}
          onChange={(e) =>
            setEditedProfile({
              ...editedProfile,
              workSchedule: e.target.value as any,
            })
          }
          className="input w-full"
        >
          <option value="morning">Sabah</option>
          <option value="afternoon">Öğleden sonra</option>
          <option value="night">Gece</option>
          <option value="flexible">Esnek</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className="w-full btn-primary disabled:opacity-50"
      >
        {isUpdating ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </form>
  );
}
