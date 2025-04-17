
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWebhookEvents } from './data';
import WebhookEventTypeList from './WebhookEventTypeList';
import WebhookEventLogList from './WebhookEventLogList';
import { Plus } from 'lucide-react';

const WebhookIntegration = () => {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">تكامل وب هوك API</h2>
          <p className="text-muted-foreground">إعداد وإدارة تكاملات API مع منصات التواصل الاجتماعي</p>
        </div>
        <Button className="bg-beauty-purple hover:bg-beauty-purple/90">
          <Plus className="mr-2 h-4 w-4" /> إضافة وب هوك جديد
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>أنواع الأحداث</CardTitle>
              <CardDescription>الأحداث المتاحة للإشتراك</CardDescription>
            </CardHeader>
            <CardContent>
              <WebhookEventTypeList 
                selectedEventType={selectedEventType}
                onSelectEventType={setSelectedEventType}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>سجل الأحداث</CardTitle>
              <CardDescription>آخر الأحداث المسجلة</CardDescription>
            </CardHeader>
            <CardContent>
              <WebhookEventLogList events={mockWebhookEvents} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebhookIntegration;
