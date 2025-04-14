
import { EngagementDataPoint } from "./types";

// بيانات تجريبية للرسم البياني
export const engagementData: EngagementDataPoint[] = [
  { day: "السبت", instagram: 1500, facebook: 900, tiktok: 2200 },
  { day: "الأحد", instagram: 1800, facebook: 1200, tiktok: 2800 },
  { day: "الاثنين", instagram: 2000, facebook: 1100, tiktok: 3100 },
  { day: "الثلاثاء", instagram: 1700, facebook: 800, tiktok: 2600 },
  { day: "الأربعاء", instagram: 2200, facebook: 1300, tiktok: 3300 },
  { day: "الخميس", instagram: 2500, facebook: 1600, tiktok: 3800 },
  { day: "الجمعة", instagram: 2300, facebook: 1400, tiktok: 3500 },
];

// بيانات للأسبوع الماضي (للمقارنة)
export const prevWeekData: EngagementDataPoint[] = [
  { day: "السبت", instagram: 1200, facebook: 700, tiktok: 1800 },
  { day: "الأحد", instagram: 1500, facebook: 900, tiktok: 2200 },
  { day: "الاثنين", instagram: 1700, facebook: 850, tiktok: 2600 },
  { day: "الثلاثاء", instagram: 1400, facebook: 600, tiktok: 2100 },
  { day: "الأربعاء", instagram: 1900, facebook: 1000, tiktok: 2800 },
  { day: "الخميس", instagram: 2100, facebook: 1200, tiktok: 3200 },
  { day: "الجمعة", instagram: 1950, facebook: 1100, tiktok: 3000 },
];

// Utility function to calculate platform totals
export const calculateTotals = (data: EngagementDataPoint[]) => {
  return {
    instagram: data.reduce((sum, item) => sum + item.instagram, 0),
    facebook: data.reduce((sum, item) => sum + item.facebook, 0),
    tiktok: data.reduce((sum, item) => sum + item.tiktok, 0),
  };
};
