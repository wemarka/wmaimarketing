
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: 'active' | 'draft' | 'completed' | 'cancelled';
  target_audience: string[];
  user_id: string;
  creator?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
  posts_count?: number;
  created_at: string;
  updated_at: string;
}

export const useCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('campaigns')
        .select(`
          *,
          creator:profiles(first_name, last_name, avatar_url),
          posts_count:posts(count)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      // Process and transform data
      const processedCampaigns = data.map(campaign => {
        // Safely handle creator data typing
        let creatorData = null;
        if (campaign.creator) {
          const creator = campaign.creator as any;
          creatorData = {
            first_name: creator.first_name || null,
            last_name: creator.last_name || null,
            avatar_url: creator.avatar_url || null
          };
        }
        
        // Handle posts count
        const postsCount = campaign.posts_count as unknown as { count: number } | null;
        
        // Cast status to the proper type
        const status = campaign.status as 'active' | 'draft' | 'completed' | 'cancelled';
        
        return {
          ...campaign,
          creator: creatorData,
          posts_count: postsCount ? postsCount.count : 0,
          status: status
        } as Campaign;
      });
      
      setCampaigns(processedCampaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("فشل في تحميل الحملات");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCampaigns();
    
    // Set up a real-time subscription for campaign updates
    if (user) {
      const campaignsSubscription = supabase
        .channel('campaigns-changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'campaigns',
          filter: `user_id=eq.${user.id}`
        }, () => {
          fetchCampaigns();
        })
        .subscribe();
      
      return () => {
        supabase.removeChannel(campaignsSubscription);
      };
    }
  }, [fetchCampaigns, user]);

  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'creator' | 'posts_count'>) => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لإنشاء حملة");
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          ...campaignData,
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast.success("تم إنشاء الحملة بنجاح");
      fetchCampaigns();
      return data;
    } catch (err) {
      console.error("Error creating campaign:", err);
      toast.error("فشل في إنشاء الحملة");
      return null;
    }
  };

  const updateCampaignStatus = async (campaignId: string, status: Campaign['status']) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({ status })
        .eq('id', campaignId);
      
      if (error) throw error;
      
      toast.success("تم تحديث حالة الحملة");
      fetchCampaigns();
    } catch (err) {
      console.error("Error updating campaign status:", err);
      toast.error("فشل في تحديث حالة الحملة");
    }
  };

  return { 
    campaigns, 
    loading: isLoading, 
    error, 
    refreshCampaigns: fetchCampaigns,
    createCampaign,
    updateCampaignStatus
  };
};
