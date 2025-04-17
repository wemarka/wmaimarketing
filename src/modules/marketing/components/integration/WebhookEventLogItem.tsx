
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface WebhookEventLogItemProps {
  event: string;
  timestamp: string;
  status: "success" | "error" | "warning";
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
  const [expanded, setExpanded] = useState(false);

  const statusIcon = {
    success: <CheckCircle className="h-4 w-4 text-green-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div 
        className={cn(
          "flex items-center justify-between p-3 text-sm",
          status === "success" ? "bg-green-50" : 
          status === "error" ? "bg-red-50" : "bg-amber-50"
        )}
      >
        <div className="flex items-center gap-2">
          {statusIcon[status]}
          <span className="font-medium">{event}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground truncate max-w-[160px]">{destination}</span>
          {payload && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      {expanded && payload && (
        <div className="p-3 bg-muted/30 border-t">
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{payload}</pre>
        </div>
      )}
    </div>
  );
};

export default WebhookEventLogItem;
