
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Copy, RefreshCw } from 'lucide-react';
import { WebhookItem } from '../types';
import { eventTypes } from '../constants';

interface WebhookFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formState: {
    name: string;
    endpoint: string;
    eventTypes: string[];
    secretKey: string;
  };
  setFormState: React.Dispatch<React.SetStateAction<{
    name: string;
    endpoint: string;
    eventTypes: string[];
    secretKey: string;
  }>>;
  selectedWebhook: WebhookItem | null;
  onSubmit: (e: React.FormEvent) => void;
  handleEventTypeChange: (eventId: string) => void;
  onCopySecret: (secret: string) => void;
  onRegenerateSecret: () => void;
}

export const WebhookFormDialog = ({
  open,
  onOpenChange,
  formState,
  setFormState,
  selectedWebhook,
  onSubmit,
  handleEventTypeChange,
  onCopySecret,
  onRegenerateSecret,
}: WebhookFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedWebhook ? 'تعديل ويب هوك' : 'إضافة ويب هوك'}</DialogTitle>
          <DialogDescription>
            {selectedWebhook
              ? 'قم بتعديل إعدادات الويب هوك'
              : 'أضف ويب هوك جديد للاتصال بخدمتك'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">اسم الويب هوك</Label>
              <Input
                id="name"
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                placeholder="مثال: تحديثات المنشورات"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="endpoint">رابط الويب هوك (Endpoint)</Label>
              <Input
                id="endpoint"
                value={formState.endpoint}
                onChange={e => setFormState({ ...formState, endpoint: e.target.value })}
                placeholder="https://example.com/webhook"
                required
              />
            </div>
            
            <div>
              <Label className="block mb-2">أحداث التشغيل</Label>
              <div className="grid grid-cols-2 gap-2">
                {eventTypes.map(event => (
                  <div key={event.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id={`event-${event.id}`}
                      checked={formState.eventTypes.includes(event.id)}
                      onCheckedChange={() => handleEventTypeChange(event.id)}
                    />
                    <label
                      htmlFor={`event-${event.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {event.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="secret" className="flex items-center justify-between">
                <span>المفتاح السري (اختياري)</span>
                {selectedWebhook && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={onRegenerateSecret}
                      className="h-7"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => onCopySecret(formState.secretKey)}
                      className="h-7"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </Label>
              <Input
                id="secret"
                value={formState.secretKey}
                onChange={e => setFormState({ ...formState, secretKey: e.target.value })}
                placeholder="المفتاح السري الخاص بك للتحقق من صحة الطلبات"
                type="text"
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                احفظ المفتاح السري الآن، لن تتمكن من مشاهدته بشكله الكامل مرة أخرى.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="submit">
              {selectedWebhook ? 'تحديث' : 'إضافة'} الويب هوك
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
