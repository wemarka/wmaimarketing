
import React from 'react';
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignHeader from './CampaignHeader';
import CampaignItem from './CampaignItem';
import EmptyCampaignState from './EmptyCampaignState';

// Define the local campaign interface to match CampaignItem's requirements
interface CampaignItemData {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "planned" | "completed";
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
  const mappedCampaigns: CampaignItemData[] = campaigns.map(campaign => {
    // Convert status to match the CampaignItem expected values
    let mappedStatus: "active" | "planned" | "completed";
    switch (campaign.status) {
      case "draft":
        mappedStatus = "planned";
        break;
      case "cancelled":
        mappedStatus = "completed"; // Map cancelled to completed as fallback
        break;
      default:
        mappedStatus = campaign.status as "active" | "planned" | "completed";
    }
    
    // Create owner display name from profile data
    const ownerName = campaign.creator ? 
      `${campaign.creator.first_name || ''} ${campaign.creator.last_name || ''}`.trim() || 'Unknown' 
      : 'Unknown';
      
    return {
      id: campaign.id,
      title: campaign.name || '',
      description: campaign.description || '',
      startDate: campaign.start_date,
      endDate: campaign.end_date,
      status: mappedStatus,
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
        name: ownerName,
        avatar: campaign.creator?.avatar_url || ''
      }
    };
  });

  return (
    <div className="space-y-4">
      <CampaignHeader 
        campaignsCount={mappedCampaigns.length}
        loading={loading}
        activeFilter="all"
        onFilterChange={(filter) => console.log(`Filter changed to: ${filter}`)} 
      />

      {loading ? (
        <div className="p-8 flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : mappedCampaigns.length > 0 ? (
        <div className="space-y-3">
          {mappedCampaigns.map((campaign, index) => (
            <CampaignItem 
              key={campaign.id} 
              campaign={campaign}
              index={index}
            />
          ))}
        </div>
      ) : (
        <EmptyCampaignState filter="all" />
      )}
    </div>
  );
};

export default CampaignTracker;
