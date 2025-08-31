export interface CommuteTime {
  bus?: {
    duration: number; // minutes
    cost: number; // TL
  };
  car?: {
    duration: number; // minutes
    fuelCost: number; // TL
  };
  metro?: {
    duration: number; // minutes
    cost: number; // TL
  };
}

export interface House {
  id: string;
  name: string;
  city: string;
  district: string;
  rooms: number;
  rent: number; // TL
  buildingAge: number; // years
  photos: string[];
  commuteTimes: CommuteTime;
  dailyCost: number; // TL
  description?: string;
  features?: string[];
  size?: number; // m2
}

export interface UserProfile {
  id: string;
  name: string;
  income: number; // TL
  preferredDistricts: string[];
  hasVehicle: boolean;
  workSchedule: "morning" | "afternoon" | "night" | "flexible";
  workLocation?: {
    city: string;
    district: string;
  };
  maxRent?: number;
  preferredRooms?: number[];
}

export interface FilterCriteria {
  city?: string;
  minRent?: number;
  maxRent?: number;
  rooms?: number[];
  districts?: string[];
}
