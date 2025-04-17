
import React from 'react';
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignHeader from './CampaignHeader';
import CampaignItem from './CampaignItem';
import EmptyCampaignState from './EmptyCampaignState';

interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "draft" | "completed" | "cancelled";
  progress: number;
  budget: number;
  leadsCount: number;
  target: string;
  audience: string;
  owner: {
    name: string;
    avatar: string;
  };
}

const CampaignTracker = () => {
  const { campaigns, loading, error, refreshCampaigns } = useCampaigns();
  
  // Map the campaigns to the format expected by the CampaignItem
  const mappedCampaigns: Campaign[] = campaigns.map(campaign => ({
    id: campaign.id,
    title: campaign.name || '',
    description: campaign.description || '',
    startDate: campaign.start_date,
    endDate: campaign.end_date,
    status: campaign.status as "active" | "draft" | "completed" | "cancelled",
    progress: Math.floor(Math.random() * 100), // Example value
    budget: campaign.budget || 0,
    leadsCount: Math.floor(Math.random() * 1000), // Example value
    target: Array.isArray(campaign.target_audience) 
      ? campaign.target_audience.join(', ') 
      : (campaign.target_audience || ''),
    audience: Array.isArray(campaign.target_audience) 
      ? campaign.target_audience.join(', ') 
      : (campaign.target_audience || ''),
    owner: {
      name: campaign.creator?.name || 'Unknown',
      avatar: campaign.creator?.avatar || ''
    }
  }));

  return (
    <div className="space-y-4">
      <CampaignHeader 
        campaignCount={mappedCampaigns.length} 
        loading={loading} 
      />

      {loading ? (
        <div className="p-8 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : mappedCampaigns.length > 0 ? (
        <div className="space-y-3">
          {mappedCampaigns.map((campaign) => (
            <CampaignItem 
              key={campaign.id} 
              campaign={campaign}
            />
          ))}
        </div>
      ) : (
        <EmptyCampaignState />
      )}
    </div>
  );
};

export default CampaignTracker;
