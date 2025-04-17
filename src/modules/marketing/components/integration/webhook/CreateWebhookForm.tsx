
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WebhookEventTypeList from "../WebhookEventTypeList";

interface CreateWebhookFormProps {
  onCancel: () => void;
  onSubmit: (webhook: {
    name: string;
    endpoint: string;
    eventTypes: string[];
  }) => void;
}

const CreateWebhookForm: React.FC<CreateWebhookFormProps> = ({ onCancel, onSubmit }) => {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookName, setWebhookName] = useState('');

  const handleSubmit = () => {
    if (!webhookName || !webhookUrl || !selectedEventType) return;
    
    onSubmit({
      name: webhookName,
      endpoint: webhookUrl,
      eventTypes: selectedEventType ? [selectedEventType] : [],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إنشاء ويب هوك جديد</CardTitle>
        <CardDescription>أدخل بيانات الويب هوك وحدد الأحداث التي تريد مراقبتها</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">اسم الويب هوك</label>
            <Input 
              placeholder="أدخل اسماً وصفياً للويب هوك" 
              value={webhookName}
              onChange={(e) => setWebhookName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">عنوان الويب هوك URL</label>
            <Input 
              placeholder="https://example.com/webhook" 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="text-sm font-medium mb-2 block">اختر الأحداث</label>
          <p className="text-sm text-muted-foreground mb-4">
            حدد الأحداث التي تريد تلقي إشعارات عنها عبر هذا الويب هوك
          </p>
          <WebhookEventTypeList 
            selectedEventType={selectedEventType}
            onSelectEventType={setSelectedEventType}
          />
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!webhookName || !webhookUrl || !selectedEventType}
          >
            إنشاء الويب هوك
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateWebhookForm;
