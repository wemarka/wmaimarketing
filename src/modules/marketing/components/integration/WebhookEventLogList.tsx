
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import WebhookEventLogItem, { WebhookEventLogItemProps } from './WebhookEventLogItem';

interface WebhookEventLogListProps {
  events: WebhookEventLogItemProps[];
  onRefresh: () => void;
  isLoading: boolean;
}

const WebhookEventLogList = ({ events, onRefresh, isLoading }: WebhookEventLogListProps) => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md">سجل الأحداث الأخيرة</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {events.map((event, index) => (
            <WebhookEventLogItem
              key={index}
              event={event.event}
              timestamp={event.timestamp}
              status={event.status}
              destination={event.destination}
              payload={event.payload}
            />
          ))}
          {events.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              لا توجد أحداث مسجلة بعد
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookEventLogList;
