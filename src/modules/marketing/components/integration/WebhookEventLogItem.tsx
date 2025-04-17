
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface WebhookEventLogItemProps {
  id: string;
  event: string;
  status: 'success' | 'error' | 'pending';
  platform: string;
  timestamp: string;
  details?: string;
}

const WebhookEventLogItem: React.FC<WebhookEventLogItemProps> = ({ 
  event, 
  status, 
  platform, 
  timestamp, 
  details 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return "bg-green-50 text-green-700 border-green-200";
      case 'error':
        return "bg-red-50 text-red-700 border-red-200";
      case 'pending':
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return "bg-pink-50 text-pink-700 border-pink-200";
      case 'facebook':
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 'twitter':
        return "bg-sky-50 text-sky-700 border-sky-200";
      case 'linkedin':
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };
  
  const formattedTime = formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: ar });

  return (
    <div className="border rounded-lg p-3 hover:bg-muted/20 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("font-normal", getStatusColor(status))}>
            {status === 'success' ? 'ناجح' : status === 'error' ? 'فشل' : 'قيد التنفيذ'}
          </Badge>
          <Badge variant="outline" className={cn("font-normal", getPlatformColor(platform))}>
            {platform}
          </Badge>
          <span className="font-medium">{event}</span>
        </div>
        <span className="text-xs text-muted-foreground">{formattedTime}</span>
      </div>
      {details && (
        <p className="mt-2 text-sm text-muted-foreground">{details}</p>
      )}
    </div>
  );
};

export default WebhookEventLogItem;
