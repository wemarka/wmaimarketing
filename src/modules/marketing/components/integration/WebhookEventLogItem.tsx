
import React from 'react';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export type EventStatus = 'success' | 'error' | 'warning';

interface WebhookEventLogItemProps {
  event: string;
  timestamp: string;
  status: EventStatus;
  destination: string;
  payload?: string;
}

const WebhookEventLogItem = ({
  event,
  timestamp,
  status,
  destination,
  payload
}: WebhookEventLogItemProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <Info className="h-4 w-4 text-amber-500" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 border rounded-md mb-2 ${getStatusColor()}`}>
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-white shadow-sm">
          {getStatusIcon()}
        </div>
        <div>
          <p className="text-sm font-medium">{event}</p>
          <p className="text-xs opacity-70">{timestamp}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs truncate max-w-[140px] opacity-70" dir="ltr">{destination}</span>
        
        {payload && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-sm">
                <pre className="text-xs overflow-auto max-h-40 p-2" dir="ltr">
                  {payload}
                </pre>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default WebhookEventLogItem;
