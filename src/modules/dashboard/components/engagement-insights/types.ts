
// Define types for the engagement insights components
export interface EngagementDataPoint {
  day: string;
  instagram: number;
  facebook: number;
  tiktok: number;
  email?: number;
}

export interface PlatformTotals {
  instagram: number;
  facebook: number;
  tiktok: number;
  email: number;
}
