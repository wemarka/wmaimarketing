
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CampaignProgressProps {
  progress: number;
  status: 'active' | 'planned' | 'completed';
}

const CampaignProgress: React.FC<CampaignProgressProps> = ({ progress, status }) => {
  const getProgressStyle = () => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'planned':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">تقدم الحملة</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2 bg-muted" 
        indicatorClassName={cn("transition-all", getProgressStyle())}
      />
    </div>
  );
};

export default CampaignProgress;
