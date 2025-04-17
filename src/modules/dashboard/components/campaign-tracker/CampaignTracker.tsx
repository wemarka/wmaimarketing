
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignHeader from './CampaignHeader';
import CampaignItem from './CampaignItem';
import EmptyCampaignState from './EmptyCampaignState';
import { Skeleton } from '@/components/ui/skeleton';

const CampaignTracker = () => {
  const { campaigns, loading, error } = useCampaigns();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'planned'>('all');

  // Filter campaigns based on status
  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    return campaign.status === filter;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CampaignHeader 
          activeFilter={filter} 
          onFilterChange={setFilter}
          campaignsCount={filteredCampaigns.length}
          loading={loading}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-3 w-full" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign, index) => {
              // Adapt campaign to match expected props of CampaignItem
              const adaptedCampaign = {
                id: campaign.id,
                title: campaign.name,
                description: campaign.description,
                startDate: campaign.start_date,
                endDate: campaign.end_date,
                status: campaign.status,
                progress: Math.random() * 100, // Sample progress
                budget: campaign.budget,
                leadsCount: campaign.posts_count || 0,
              };
              
              return <CampaignItem key={campaign.id} campaign={adaptedCampaign} index={index} />;
            })}
          </div>
        ) : (
          <EmptyCampaignState filter={filter} />
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignTracker;
