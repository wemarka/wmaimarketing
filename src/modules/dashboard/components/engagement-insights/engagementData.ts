
import { EngagementDataPoint, PlatformTotals } from "./types";

// Sample engagement data
export const engagementData: EngagementDataPoint[] = [
  { day: "السبت", instagram: 1500, facebook: 900, tiktok: 2200, email: 300 },
  { day: "الأحد", instagram: 1800, facebook: 1200, tiktok: 2800, email: 450 },
  { day: "الاثنين", instagram: 2000, facebook: 1100, tiktok: 3100, email: 380 },
  { day: "الثلاثاء", instagram: 1700, facebook: 800, tiktok: 2600, email: 400 },
  { day: "الأربعاء", instagram: 2200, facebook: 1300, tiktok: 3300, email: 520 },
  { day: "الخميس", instagram: 2500, facebook: 1600, tiktok: 3800, email: 590 },
  { day: "الجمعة", instagram: 2300, facebook: 1400, tiktok: 3500, email: 420 },
];

// Previous week data for comparison
export const prevWeekData: EngagementDataPoint[] = [
  { day: "السبت", instagram: 1200, facebook: 700, tiktok: 1800, email: 250 },
  { day: "الأحد", instagram: 1500, facebook: 900, tiktok: 2200, email: 380 },
  { day: "الاثنين", instagram: 1700, facebook: 850, tiktok: 2600, email: 320 },
  { day: "الثلاثاء", instagram: 1400, facebook: 600, tiktok: 2100, email: 340 },
  { day: "الأربعاء", instagram: 1900, facebook: 1000, tiktok: 2800, email: 450 },
  { day: "الخميس", instagram: 2100, facebook: 1200, tiktok: 3200, email: 500 },
  { day: "الجمعة", instagram: 1950, facebook: 1100, tiktok: 3000, email: 370 },
];

// Function to calculate totals for each platform
export const calculateTotals = (data: EngagementDataPoint[]): PlatformTotals => {
  return data.reduce(
    (acc, curr) => {
      return {
        instagram: acc.instagram + curr.instagram,
        facebook: acc.facebook + curr.facebook,
        tiktok: acc.tiktok + curr.tiktok,
        email: acc.email + (curr.email || 0),
      };
    },
    { instagram: 0, facebook: 0, tiktok: 0, email: 0 }
  );
};

// Additional export for month and year data if needed
export const getMonthData = () => {
  return [...engagementData, ...engagementData, ...engagementData];
};

export const getYearData = () => {
  const result = [];
  for (let i = 0; i < 12; i++) {
    result.push(...engagementData.map(item => ({
      ...item,
      day: `${item.day} (${i + 1})`
    })));
  }
  return result;
};
