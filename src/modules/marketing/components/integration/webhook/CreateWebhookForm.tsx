
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EventTypeSelector, { EventType } from "./EventTypeSelector";

interface CreateWebhookFormProps {
  onCancel: () => void;
  onSubmit: (webhook: {
    name: string;
    endpoint: string;
    eventTypes: string[];
  }) => void;
}

const CreateWebhookForm: React.FC<CreateWebhookFormProps> = ({ onCancel, onSubmit }) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookName, setWebhookName] = useState('');

  // Event types with categories
  const eventTypes: EventType[] = [
    { id: 'content_created', name: 'إنشاء محتوى', description: 'يتم تشغيله عند إنشاء محتوى جديد', category: 'المحتوى' },
    { id: 'content_updated', name: 'تحديث محتوى', description: 'يتم تشغيله عند تحديث محتوى موجود', category: 'المحتوى' },
    { id: 'content_published', name: 'نشر محتوى', description: 'يتم تشغيله عند نشر محتوى', category: 'المحتوى' },
    { id: 'content_interaction', name: 'تفاعل مع محتوى', description: 'يتم تشغيله عند تفاعل المستخدم مع المحتوى', category: 'المحتوى' },
    { id: 'user_registered', name: 'تسجيل مستخدم', description: 'يتم تشغيله عند تسجيل مستخدم جديد', category: 'المستخدمون' },
    { id: 'user_login', name: 'تسجيل دخول', description: 'يتم تشغيله عند تسجيل دخول مستخدم', category: 'المستخدمون' },
    { id: 'user_updated', name: 'تحديث بيانات المستخدم', description: 'يتم تشغيله عند تحديث بيانات مستخدم', category: 'المستخدمون' },
    { id: 'product_created', name: 'إنشاء منتج', description: 'يتم تشغيله عند إضافة منتج جديد', category: 'المنتجات' },
    { id: 'product_updated', name: 'تحديث منتج', description: 'يتم تشغيله عند تحديث منتج', category: 'المنتجات' },
    { id: 'order_created', name: 'إنشاء طلب', description: 'يتم تشغيله عند إنشاء طلب جديد', category: 'الطلبات' },
    { id: 'order_updated', name: 'تحديث طلب', description: 'يتم تشغيله عند تحديث حالة طلب', category: 'الطلبات' },
    { id: 'payment_received', name: 'استلام دفعة', description: 'يتم تشغيله عند استلام دفعة جديدة', category: 'المدفوعات' },
  ];

  const handleSubmit = () => {
    if (!webhookName || !webhookUrl || selectedEventTypes.length === 0) return;
    
    onSubmit({
      name: webhookName,
      endpoint: webhookUrl,
      eventTypes: selectedEventTypes,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إنشاء ويب هوك جديد</CardTitle>
        <CardDescription>أدخل بيانات الويب هوك وحدد الأحداث التي تريد مراقبتها</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
          <EventTypeSelector
            eventTypes={eventTypes}
            selectedEventTypes={selectedEventTypes}
            onSelectEventType={setSelectedEventTypes}
          />
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!webhookName || !webhookUrl || selectedEventTypes.length === 0}
          >
            إنشاء الويب هوك
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateWebhookForm;
