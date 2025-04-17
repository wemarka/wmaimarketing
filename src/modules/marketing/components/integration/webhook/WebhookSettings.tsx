
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Webhook {
  id: string;
  name: string;
  secretKey: string;
}

interface WebhookSettingsProps {
  webhooks: Webhook[];
  maxRetries: string;
  setMaxRetries: (value: string) => void;
  onSaveSettings: () => void;
}

const WebhookSettings: React.FC<WebhookSettingsProps> = ({
  webhooks,
  maxRetries,
  setMaxRetries,
  onSaveSettings
}) => {
  const handleCopySecret = (secret: string) => {
    navigator.clipboard.writeText(secret)
      .then(() => toast.success("تم نسخ المفتاح السري بنجاح"))
      .catch(() => toast.error("فشل في نسخ المفتاح السري"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات الويب هوك</CardTitle>
        <CardDescription>
          تكوين إعدادات متقدمة للويب هوك
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium mb-2">مفاتيح التوقيع الرقمي</h3>
            <p className="text-xs text-muted-foreground mb-2">
              تستخدم هذه المفاتيح للتحقق من أن الطلبات تأتي فعلاً من منصتنا
            </p>
            {webhooks.map(webhook => (
              <div key={webhook.id} className="bg-muted p-3 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{webhook.name}</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => handleCopySecret(webhook.secretKey)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="text-xs font-mono overflow-x-auto">{webhook.secretKey}</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">محاولات إعادة الإرسال</h3>
              <p className="text-xs text-muted-foreground mb-2">
                عدد محاولات إعادة إرسال الويب هوك في حالة الفشل
              </p>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  className="w-20" 
                  value={maxRetries} 
                  onChange={(e) => setMaxRetries(e.target.value)}
                />
                <span className="text-sm">محاولات</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">التوثيق</h3>
              <p className="text-xs text-muted-foreground mb-2">
                طريقة التحقق من صحة الطلبات
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input type="radio" id="hmac" name="auth" checked />
                  <label htmlFor="hmac" className="text-sm">HMAC SHA-256</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" id="basic" name="auth" />
                  <label htmlFor="basic" className="text-sm">Basic Auth</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-6">
          <Button onClick={onSaveSettings}>
            حفظ الإعدادات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookSettings;
