
import { PlatformStats } from "../types/socialTypes";

/**
 * Get statistics for all platforms
 */
export const getPlatformStats = async (): Promise<PlatformStats[]> => {
  // In a real implementation, this would fetch actual statistics
  // For now, we'll return mock data
  const currentDate = new Date().toISOString();
  
  return [
    {
      platform: "instagram",
      posts: 42,
      engagement: 3.2,
      followers: 12500,
      growth: 2.5,
      lastUpdated: currentDate
    },
    {
      platform: "facebook",
      posts: 38,
      engagement: 1.8,
      followers: 8700,
      growth: -0.3,
      lastUpdated: currentDate
    },
    {
      platform: "twitter",
      posts: 67,
      engagement: 2.1,
      followers: 5300,
      growth: 1.7,
      lastUpdated: currentDate
    },
    {
      platform: "tiktok",
      posts: 12,
      engagement: 4.7,
      followers: 3200,
      growth: 8.2,
      lastUpdated: currentDate
    }
  ];
};

/**
 * Get insights for a specific post across platforms
 */
export const getPostInsights = async (postId: string): Promise<any> => {
  // This would fetch engagement metrics for a specific post
  // Returning mock data for demonstration
  return {
    engagementRate: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    impressions: Math.floor(Math.random() * 5000) + 500,
    clicks: Math.floor(Math.random() * 200) + 20,
    shares: Math.floor(Math.random() * 50) + 5,
    comments: Math.floor(Math.random() * 30) + 2,
    likes: Math.floor(Math.random() * 300) + 50,
  };
};
