
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronDown } from 'lucide-react';
import WebhookEventLogItem, { WebhookEventLogItemProps } from "./WebhookEventLogItem";

interface WebhookEventLogListProps {
  events: WebhookEventLogItemProps[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

const WebhookEventLogList: React.FC<WebhookEventLogListProps> = ({ 
  events, 
  isLoading = false,
  onRefresh = () => {}
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-md">سجل الأحداث</CardTitle>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          تحديث
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.length > 0 ? (
            events.map((event) => (
              <WebhookEventLogItem key={event.id} {...event} />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              لا توجد أحداث لعرضها
            </div>
          )}
        </div>
        
        {events.length > 5 && (
          <Button variant="ghost" className="w-full mt-4 text-muted-foreground">
            عرض المزيد <ChevronDown className="mr-1 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookEventLogList;
