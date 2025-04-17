
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface WebhookEventLogItemProps {
  id: string;
  event: string;
  status: 'success' | 'error' | 'pending';
  platform: string;
  timestamp: string;
  details?: string;
  destination?: string;
  payload?: string;
  response?: string;
}

const WebhookEventLogItem: React.FC<WebhookEventLogItemProps> = ({ 
  event, 
  status, 
  platform, 
  timestamp, 
  details,
  destination,
  payload,
  response
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
  const statusText = status === 'success' ? 'ناجح' : status === 'error' ? 'فشل' : 'قيد التنفيذ';

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "border rounded-lg transition-all hover:shadow-sm",
        isOpen ? "shadow-sm" : ""
      )}
    >
      <div className="p-3 flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("font-normal", getStatusColor(status))}>
            {statusText}
          </Badge>
          <Badge variant="outline" className={cn("font-normal", getPlatformColor(platform))}>
            {platform}
          </Badge>
          <span className="font-medium">{event}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      
      <CollapsibleContent>
        <div className="border-t p-3 bg-muted/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {details && (
              <div>
                <h4 className="text-sm font-medium mb-1">التفاصيل</h4>
                <p className="text-sm text-muted-foreground">{details}</p>
              </div>
            )}
            {destination && (
              <div>
                <h4 className="text-sm font-medium mb-1">الوجهة</h4>
                <div className="flex items-center">
                  <Code className="h-3 w-3 mr-1 text-muted-foreground" />
                  <p className="text-sm font-mono overflow-hidden text-ellipsis">{destination}</p>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 mr-1" title="فتح في نافذة جديدة">
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {(payload || response) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {payload && (
                <div>
                  <h4 className="text-sm font-medium mb-1">البيانات المرسلة</h4>
                  <div className="bg-muted p-2 rounded-md max-h-40 overflow-y-auto">
                    <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                      {typeof payload === 'string' ? payload : JSON.stringify(JSON.parse(payload), null, 2)}
                    </pre>
                  </div>
                </div>
              )}
              
              {response && (
                <div>
                  <h4 className="text-sm font-medium mb-1">الرد</h4>
                  <div className="bg-muted p-2 rounded-md max-h-40 overflow-y-auto">
                    <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                      {typeof response === 'string' ? response : JSON.stringify(JSON.parse(response), null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WebhookEventLogItem;
