
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check } from 'lucide-react';

interface WebhookEventTypeListProps {
  selectedEventType: string | null;
  onSelectEventType: (type: string) => void;
}

const WebhookEventTypeList: React.FC<WebhookEventTypeListProps> = ({
  selectedEventType,
  onSelectEventType
}) => {
  const eventTypes = [
    { id: 'content_created', name: 'إنشاء محتوى', description: 'يتم تشغيله عند إنشاء محتوى جديد' },
    { id: 'content_updated', name: 'تحديث محتوى', description: 'يتم تشغيله عند تحديث محتوى موجود' },
    { id: 'content_published', name: 'نشر محتوى', description: 'يتم تشغيله عند نشر محتوى' },
    { id: 'user_registered', name: 'تسجيل مستخدم', description: 'يتم تشغيله عند تسجيل مستخدم جديد' },
    { id: 'product_created', name: 'إنشاء منتج', description: 'يتم تشغيله عند إضافة منتج جديد' },
    { id: 'content_interaction', name: 'تفاعل مع محتوى', description: 'يتم تشغيله عند تفاعل المستخدم مع المحتوى' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {eventTypes.map((eventType) => (
          <div
            key={eventType.id}
            className={`border rounded-lg p-3 cursor-pointer transition-all ${
              selectedEventType === eventType.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-muted/50'
            }`}
            onClick={() => onSelectEventType(eventType.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{eventType.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{eventType.description}</p>
              </div>
              {selectedEventType === eventType.id && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebhookEventTypeList;
