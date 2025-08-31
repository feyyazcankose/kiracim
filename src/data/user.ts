import { UserProfile } from "@/types";

export const sampleUser: UserProfile = {
  id: "user-1",
  name: "Ahmet Yılmaz",
  income: 25000,
  preferredDistricts: ["Kadıköy", "Şişli", "Levent"],
  hasVehicle: true,
  workSchedule: "morning",
  workLocation: {
    city: "İstanbul",
    district: "Levent",
  },
  maxRent: 15000,
  preferredRooms: [1, 2, 3],
};
