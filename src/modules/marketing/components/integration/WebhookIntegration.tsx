
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Webhook, RefreshCw, Layers } from 'lucide-react';
import WebhookEventLogList from './WebhookEventLogList';
import WebhookEventTypeList from './WebhookEventTypeList';
import { toast } from "sonner";
import { mockWebhookEvents } from './mockData';

const WebhookIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState('https://example.com/webhook');
  const [webhookSecret, setWebhookSecret] = useState('whsec_XXxXXxxXXxXXxxXX');
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(mockWebhookEvents);

  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("تم حفظ إعدادات الـ Webhook بنجاح");
    }, 1000);
  };

  const handleGenerateSecret = () => {
    const newSecret = 'whsec_' + Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 36).toString(36)
    ).join('');
    setWebhookSecret(newSecret);
    toast.info("تم إنشاء مفتاح سر جديد");
  };

  const handleRefreshEvents = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("تم تحديث سجل الأحداث");
    }, 800);
  };

  return (
    <Card className="shadow-lg border-beauty-purple/10">
      <CardHeader className="bg-gradient-to-r from-beauty-purple/10 to-beauty-lightpurple/10">
        <CardTitle className="flex items-center gap-2">
          <Webhook className="h-5 w-5 text-beauty-purple" />
          إعداد Webhooks
        </CardTitle>
        <CardDescription>
          إعداد نقاط نهاية لاستقبال الأحداث من النظام في الوقت الفعلي
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">عنوان URL للـ Webhook</Label>
              <Input 
                id="webhook-url" 
                placeholder="https://example.com/webhook"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-secret">مفتاح السر</Label>
              <div className="relative">
                <Input 
                  id="webhook-secret" 
                  placeholder="whsec_XXxXXxxXXxXXxxXX"
                  value={webhookSecret}
                  onChange={(e) => setWebhookSecret(e.target.value)}
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute left-1 top-1/2 -translate-y-1/2 h-8"
                  onClick={handleGenerateSecret}
                >
                  توليد
                </Button>
              </div>
            </div>
          </div>
          
          <WebhookEventTypeList />
          
          <WebhookEventLogList 
            events={events} 
            onRefresh={handleRefreshEvents} 
            isLoading={isLoading} 
          />
          
          <div className="flex justify-end pt-4">
            <Button variant="outline" className="ml-2 rtl:mr-2">إلغاء</Button>
            <Button 
              className="gap-2 bg-beauty-purple hover:bg-beauty-purple/90"
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  جارِ الحفظ...
                </>
              ) : (
                <>
                  <Layers className="h-4 w-4" />
                  حفظ الإعدادات
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookIntegration;
