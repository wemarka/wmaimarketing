
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from 'sonner';
import { getCampaigns } from "../../services/integrationService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schedulePostSchema } from "./validationSchema";
import { SchedulePostForm } from './types';

export const useSchedulePostState = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [socialAccounts, setSocialAccounts] = useState<any[]>([]);
  
  // Initialize the form
  const form = useForm<SchedulePostForm>({
    resolver: zodResolver(schedulePostSchema),
    defaultValues: {
      title: "",
      content: "",
      mediaUrls: [],
      platform: "",
      scheduledAt: new Date().toISOString(),
      campaignId: "",
      crossPostAccountIds: []
    }
  });
  
  // Load campaigns when component mounts
  useEffect(() => {
    const loadCampaigns = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const campaignsData = await getCampaigns();
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error loading campaigns:", error);
        toast.error("فشل في تحميل الحملات");
      } finally {
        setLoading(false);
      }
    };
    
    loadCampaigns();
  }, [user]);
  
  // Load social accounts when component mounts
  useEffect(() => {
    const loadSocialAccounts = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // This would typically be loaded from an API
        // For now, let's mock it
        const mockAccounts = [
          {
            id: "1",
            platform: "instagram",
            username: "beautybrand",
            status: "connected"
          },
          {
            id: "2",
            platform: "facebook",
            username: "Beauty Brand",
            status: "connected"
          },
          {
            id: "3",
            platform: "twitter",
            username: "beautybrand",
            status: "connected"
          }
        ];
        
        setSocialAccounts(mockAccounts);
      } catch (error) {
        console.error("Error loading social accounts:", error);
        toast.error("فشل في تحميل الحسابات الاجتماعية");
      } finally {
        setLoading(false);
      }
    };
    
    loadSocialAccounts();
  }, [user]);
  
  return {
    form,
    loading,
    campaigns,
    socialAccounts
  };
};
