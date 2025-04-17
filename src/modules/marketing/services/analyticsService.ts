
import { PlatformStats } from '../types/socialTypes';

// Get analytics data for social platforms
export const getPlatformAnalytics = async (): Promise<PlatformStats[]> => {
  try {
    // This would normally fetch from the API
    // For now, return mock data
    return [
      {
        platform: 'instagram',
        posts: 156,
        engagement: 3.2,
        followers: 24500,
        growth: 2.3,
        lastUpdated: '2025-04-10T12:00:00Z',
        accountName: '@beautycompany'
      },
      {
        platform: 'facebook',
        posts: 98,
        engagement: 1.8,
        followers: 18200,
        growth: 1.1,
        lastUpdated: '2025-04-10T12:00:00Z',
        accountName: 'Beauty Company'
      },
      {
        platform: 'twitter',
        posts: 215,
        engagement: 2.5,
        followers: 12300,
        growth: 4.2,
        lastUpdated: '2025-04-10T12:00:00Z',
        accountName: '@beautyco'
      },
      {
        platform: 'linkedin',
        posts: 78,
        engagement: 0.9,
        followers: 5600,
        growth: 0.7,
        lastUpdated: '2025-04-10T12:00:00Z',
        accountName: 'Beauty Company Inc.'
      }
    ];
  } catch (error) {
    console.error('Failed to fetch platform analytics:', error);
    return [];
  }
};

// Get engagement rate by platform
export const getEngagementByPlatform = async (): Promise<{ platform: string, rate: number }[]> => {
  try {
    return [
      { platform: 'instagram', rate: 3.2 },
      { platform: 'facebook', rate: 1.8 },
      { platform: 'twitter', rate: 2.5 },
      { platform: 'linkedin', rate: 0.9 }
    ];
  } catch (error) {
    console.error('Failed to fetch engagement data:', error);
    return [];
  }
};

// Get follower growth over time
export const getFollowerGrowth = async (platform: string, period: 'week' | 'month' | 'quarter' = 'month'): Promise<{ date: string, count: number }[]> => {
  try {
    const today = new Date();
    const results: { date: string, count: number }[] = [];
    
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
    const initialValue = platform === 'instagram' ? 24000 : 
                         platform === 'facebook' ? 17800 : 
                         platform === 'twitter' ? 12000 : 5500;
                         
    const growthRate = platform === 'instagram' ? 25 : 
                      platform === 'facebook' ? 15 : 
                      platform === 'twitter' ? 18 : 8;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simple growth formula with some randomness
      const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
      const dayGrowth = (growthRate / days) * randomFactor;
      const count = Math.round(initialValue + ((days - i) * dayGrowth));
      
      results.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    return results;
  } catch (error) {
    console.error('Failed to fetch follower growth data:', error);
    return [];
  }
};

// Get post performance
export const getPostPerformance = async (platform: string, limit = 5): Promise<any[]> => {
  try {
    const postTypes = ['photo', 'video', 'carousel', 'text'];
    const results = [];
    
    for (let i = 0; i < limit; i++) {
      const postType = postTypes[Math.floor(Math.random() * postTypes.length)];
      const likes = Math.floor(Math.random() * 1000) + 100;
      const comments = Math.floor(Math.random() * 50) + 5;
      const shares = Math.floor(Math.random() * 30) + 2;
      const reach = Math.floor(Math.random() * 5000) + 1000;
      
      results.push({
        id: `post-${i + 1}`,
        platform,
        postType,
        publishedAt: new Date(Date.now() - (i * 86400000)).toISOString(),
        metrics: {
          likes,
          comments,
          shares,
          reach,
          engagement: ((likes + comments + shares) / reach * 100).toFixed(2)
        }
      });
    }
    
    return results;
  } catch (error) {
    console.error('Failed to fetch post performance data:', error);
    return [];
  }
};

// Get best posting times
export const getBestPostingTimes = async (platform: string): Promise<{ day: string, hour: number, score: number }[]> => {
  try {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const results = [];
    
    // Each platform has slightly different optimal times
    const optimalHours = 
      platform === 'instagram' ? [12, 15, 18, 21] :
      platform === 'facebook' ? [9, 13, 15, 19] :
      platform === 'twitter' ? [8, 12, 17, 20] : [9, 11, 14, 16];
    
    for (const day of days) {
      for (const hour of optimalHours) {
        // Add some randomness to the score
        const baseScore = 0.7;
        const randomFactor = Math.random() * 0.3;
        const score = +(baseScore + randomFactor).toFixed(2);
        
        results.push({ day, hour, score });
      }
    }
    
    // Sort by score descending
    return results.sort((a, b) => b.score - a.score).slice(0, 10);
  } catch (error) {
    console.error('Failed to fetch best posting times:', error);
    return [];
  }
};
