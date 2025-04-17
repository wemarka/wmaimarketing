
import { supabase } from "@/integrations/supabase/client";
import { Campaign } from "@/hooks/useCampaigns";

// Platform statistics type
export interface PlatformStats {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  growth: number;
  accountName: string;
}

// Get campaigns
export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching campaigns: ${error.message}`);
    }
    
    // Transform to Campaign type
    return data.map(campaign => ({
      ...campaign,
      status: campaign.status as 'active' | 'draft' | 'completed' | 'cancelled',
      target_audience: campaign.target_audience || []
    }));
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    return [];
  }
};

// Get platform statistics
export const getPlatformStats = async (): Promise<PlatformStats[]> => {
  try {
    // This would normally fetch from the API
    // For now, return mock data
    return [
      {
        platform: 'instagram',
        followers: 24500,
        engagement: 3.2,
        posts: 156,
        growth: 2.3,
        accountName: '@beautycompany'
      },
      {
        platform: 'facebook',
        followers: 18200,
        engagement: 1.8,
        posts: 98,
        growth: 1.1,
        accountName: 'Beauty Company'
      },
      {
        platform: 'twitter',
        followers: 12300,
        engagement: 2.5,
        posts: 215,
        growth: 4.2,
        accountName: '@beautyco'
      }
    ];
  } catch (error) {
    console.error('Failed to fetch platform stats:', error);
    return [];
  }
};
