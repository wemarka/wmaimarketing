
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "planned";
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  target: string;
  audience: string;
  owner: {
    name: string;
    avatar?: string;
  };
}

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        
        // Get the current user
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError || !userData.user) {
          throw new Error("Authentication error");
        }
        
        // Fetch campaigns from the database
        const { data, error } = await supabase
          .from('campaigns')
          .select(`
            id, 
            name, 
            description, 
            status, 
            budget,
            start_date,
            end_date,
            target_audience,
            profiles:user_id (
              first_name,
              last_name,
              avatar_url
            )
          `)
          .eq('user_id', userData.user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // To calculate progress and spent amounts (this would come from real data in a production app)
        const calculateProgress = (startDate: string, endDate: string): number => {
          const start = new Date(startDate).getTime();
          const end = new Date(endDate).getTime();
          const now = Date.now();
          
          if (now < start) return 0;
          if (now > end) return 100;
          
          return Math.round(((now - start) / (end - start)) * 100);
        };
        
        const calculateSpent = (budget: number, progress: number): number => {
          return Math.round((budget * progress) / 100);
        };
        
        // Map the data to the expected format
        const campaignsData: Campaign[] = data.map(camp => {
          const progress = calculateProgress(camp.start_date, camp.end_date);
          const spent = calculateSpent(camp.budget, progress);
          
          return {
            id: camp.id,
            title: camp.name,
            description: camp.description,
            status: camp.status as "active" | "completed" | "planned",
            progress,
            budget: camp.budget,
            spent,
            startDate: camp.start_date,
            endDate: camp.end_date,
            target: camp.target_audience ? camp.target_audience.join(', ') : '',
            audience: camp.target_audience ? camp.target_audience.join(', ') : '',
            owner: {
              name: camp.profiles 
                ? `${camp.profiles.first_name || ''} ${camp.profiles.last_name || ''}`.trim() || 'مستخدم'
                : 'مستخدم',
              avatar: camp.profiles?.avatar_url
            }
          };
        });
        
        setCampaigns(campaignsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        toast({
          title: "خطأ في جلب البيانات",
          description: "تعذر تحميل بيانات الحملات",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [toast]);

  return { campaigns, loading, error };
};
