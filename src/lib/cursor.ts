import { House, UserProfile, FilterCriteria } from "@/types";
import { sampleHouses } from "@/data/houses";
import { sampleUser } from "@/data/user";

/**
 * Dummy API wrapper functions for Cursor AI integration
 * These functions will be replaced with actual AI calls in the future
 */

export class CursorAPI {
  /**
   * Get house recommendations based on user profile
   */
  static async getHouseRecommendations(
    userProfile: UserProfile
  ): Promise<House[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Simple recommendation logic based on user preferences
    return sampleHouses
      .filter((house) => {
        // Filter by preferred districts
        if (
          userProfile.preferredDistricts.length > 0 &&
          !userProfile.preferredDistricts.includes(house.district)
        ) {
          return false;
        }

        // Filter by max rent
        if (userProfile.maxRent && house.rent > userProfile.maxRent) {
          return false;
        }

        // Filter by preferred rooms
        if (
          userProfile.preferredRooms &&
          !userProfile.preferredRooms.includes(house.rooms)
        ) {
          return false;
        }

        return true;
      })
      .slice(0, 10); // Limit to 10 recommendations
  }

  /**
   * Filter houses based on criteria
   */
  static async filterHouses(criteria: FilterCriteria): Promise<House[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return sampleHouses.filter((house) => {
      if (criteria.city && house.city !== criteria.city) {
        return false;
      }

      if (
        criteria.districts &&
        criteria.districts.length > 0 &&
        !criteria.districts.includes(house.district)
      ) {
        return false;
      }

      if (criteria.minRent && house.rent < criteria.minRent) {
        return false;
      }

      if (criteria.maxRent && house.rent > criteria.maxRent) {
        return false;
      }

      if (
        criteria.rooms &&
        criteria.rooms.length > 0 &&
        !criteria.rooms.includes(house.rooms)
      ) {
        return false;
      }

      return true;
    });
  }

  /**
   * Get all houses
   */
  static async getAllHouses(): Promise<House[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...sampleHouses];
  }

  /**
   * Get house by ID
   */
  static async getHouseById(id: string): Promise<House | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return sampleHouses.find((house) => house.id === id) || null;
  }

  /**
   * Get user profile
   */
  static async getUserProfile(): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { ...sampleUser };
  }

  /**
   * Compare houses and get AI insights
   */
  static async compareHouses(houseIds: string[]): Promise<{
    houses: House[];
    insights: string[];
  }> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const houses = sampleHouses.filter((house) => houseIds.includes(house.id));

    // Generate dummy insights
    const insights = [
      "En uygun fiyatlı seçenek ikinci ev.",
      "İlk ev ulaşım açısından en avantajlı konumda.",
      "Üçüncü ev en yeni binada bulunuyor.",
      "Günlük toplam maliyet açısından karşılaştırma yapıldığında...",
    ];

    return { houses, insights };
  }

  /**
   * Get route recommendations
   */
  static async getRouteRecommendations(
    houseId: string,
    workLocation: string
  ): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const house = sampleHouses.find((h) => h.id === houseId);
    if (!house) return null;

    return {
      routes: [
        {
          type: "bus",
          duration: house.commuteTimes.bus?.duration || 30,
          cost: house.commuteTimes.bus?.cost || 15,
          description: "Otobüs ile",
        },
        {
          type: "metro",
          duration: house.commuteTimes.metro?.duration || 25,
          cost: house.commuteTimes.metro?.cost || 18,
          description: "Metro ile",
        },
        {
          type: "car",
          duration: house.commuteTimes.car?.duration || 35,
          cost: house.commuteTimes.car?.fuelCost || 25,
          description: "Araç ile",
        },
      ],
    };
  }
}
