
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const eventTypes = [
  { id: 'content_created', name: 'إنشاء محتوى جديد', enabled: true },
  { id: 'content_updated', name: 'تحديث محتوى', enabled: true },
  { id: 'content_published', name: 'نشر محتوى', enabled: true },
  { id: 'campaign_created', name: 'إنشاء حملة إعلانية', enabled: false },
  { id: 'user_registered', name: 'تسجيل مستخدم', enabled: true },
  { id: 'content_interaction', name: 'تفاعل مع محتوى', enabled: false },
  { id: 'product_created', name: 'إضافة منتج جديد', enabled: false },
  { id: 'order_placed', name: 'طلب جديد', enabled: false },
];

const WebhookEventTypeList = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">الأحداث المفعلة:</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {eventTypes.map(eventType => (
            <WebhookEventTypeItem 
              key={eventType.id}
              event={eventType.name} 
              isEnabled={eventType.enabled} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const WebhookEventTypeItem = ({ 
  event, 
  isEnabled = true 
}: { 
  event: string; 
  isEnabled?: boolean;
}) => {
  const [enabled, setEnabled] = React.useState(isEnabled);
  
  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-card hover:bg-accent/50 transition-colors">
      <span className="text-sm">{event}</span>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
};

export default WebhookEventTypeList;
