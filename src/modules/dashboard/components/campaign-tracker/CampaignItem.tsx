
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Target, Clock, CheckCircle, PauseCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import CampaignProgress from './CampaignProgress';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'active' | 'planned' | 'completed';
  target: string;
  audience: string;
  owner: {
    name: string;
    avatar?: string;
  };
}

interface CampaignItemProps {
  campaign: Campaign;
  index: number;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ campaign, index }) => {
  // Format dates
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM', { locale: ar });
    } catch (error) {
      return dateString;
    }
  };
  
  // Campaign status display
  const getStatusDisplay = () => {
    switch (campaign.status) {
      case 'active':
        return { 
          icon: <Clock className="h-4 w-4 text-green-500" />, 
          text: 'نشطة', 
          colors: 'bg-green-50 text-green-700 border-green-200' 
        };
      case 'planned':
        return { 
          icon: <Calendar className="h-4 w-4 text-blue-500" />, 
          text: 'مخططة', 
          colors: 'bg-blue-50 text-blue-700 border-blue-200' 
        };
      case 'completed':
        return { 
          icon: <CheckCircle className="h-4 w-4 text-purple-500" />, 
          text: 'مكتملة', 
          colors: 'bg-purple-50 text-purple-700 border-purple-200' 
        };
      default:
        return { 
          icon: <PauseCircle className="h-4 w-4 text-gray-500" />, 
          text: 'متوقفة', 
          colors: 'bg-gray-50 text-gray-700 border-gray-200' 
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border rounded-xl p-5 hover:shadow-sm transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-lg">{campaign.title}</h3>
            <Badge variant="outline" className={cn("text-xs", status.colors)}>
              <span className="flex items-center gap-1">
                {status.icon}
                {status.text}
              </span>
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{campaign.target}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{campaign.audience}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={campaign.owner.avatar} alt={campaign.owner.name} />
            <AvatarFallback>{campaign.owner.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="text-muted-foreground">المسؤول</p>
            <p className="font-medium">{campaign.owner.name}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <CampaignProgress 
          progress={campaign.progress} 
          status={campaign.status} 
        />
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm">التفاصيل</Button>
      </div>
    </motion.div>
  );
};

export default CampaignItem;
