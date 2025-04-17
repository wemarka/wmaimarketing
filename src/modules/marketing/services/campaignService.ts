
import { supabase } from "@/integrations/supabase/client";
import { Campaign } from "@/lib/supabase/models";
import { BaseService } from "./BaseService";
import { toast } from "@/components/ui/use-toast";

export interface CreateCampaignParams {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  targetAudience?: string[];
}

export class CampaignService extends BaseService {
  constructor() {
    super('campaigns');
  }

  async getCampaigns(): Promise<Campaign[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data as Campaign[];
    } catch (error) {
      return this.handleError(error, 'fetching campaigns');
    }
  }

  async createCampaign(params: CreateCampaignParams): Promise<Campaign> {
    try {
      const userId = await this.getCurrentUserId();
      
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          name: params.name,
          description: params.description,
          start_date: params.startDate,
          end_date: params.endDate,
          budget: params.budget,
          status: params.status,
          target_audience: params.targetAudience || [],
          user_id: userId
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "نجاح",
        description: "تم إنشاء الحملة بنجاح"
      });
      
      return data as Campaign;
    } catch (error) {
      return this.handleError(error, 'creating campaign');
    }
  }

  async updateCampaign(id: string, params: Partial<CreateCampaignParams>): Promise<Campaign> {
    try {
      const updateData: Record<string, any> = {};
      
      if (params.name) updateData.name = params.name;
      if (params.description) updateData.description = params.description;
      if (params.startDate) updateData.start_date = params.startDate;
      if (params.endDate) updateData.end_date = params.endDate;
      if (params.budget) updateData.budget = params.budget;
      if (params.status) updateData.status = params.status;
      if (params.targetAudience) updateData.target_audience = params.targetAudience;
      
      updateData.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('campaigns')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "نجاح",
        description: "تم تحديث الحملة بنجاح"
      });
      
      return data as Campaign;
    } catch (error) {
      return this.handleError(error, 'updating campaign');
    }
  }

  async deleteCampaign(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "نجاح",
        description: "تم حذف الحملة بنجاح"
      });
    } catch (error) {
      this.handleError(error, 'deleting campaign');
    }
  }

  async getCampaignById(id: string): Promise<Campaign> {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return data as Campaign;
    } catch (error) {
      return this.handleError(error, 'fetching campaign');
    }
  }
}

export const campaignService = new CampaignService();

/**
 * Get campaigns for the current user
 */
export const getCampaigns = async (): Promise<Campaign[]> => {
  return campaignService.getCampaigns();
};
