
import { supabase } from "@/integrations/supabase/client";

/**
 * Get campaigns for the current user
 */
export const getCampaigns = async (): Promise<any[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.user.id);
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};
