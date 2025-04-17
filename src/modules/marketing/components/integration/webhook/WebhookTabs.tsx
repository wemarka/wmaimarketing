
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, RefreshCw } from "lucide-react";
import WebhookList from './WebhookList';
import WebhookEventLogList from './WebhookEventLogList';
import { ScrollArea } from "@/components/ui/scroll-area";
import { WebhookEventLogItemProps, WebhookItem } from './types';

interface WebhookTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  webhooks: WebhookItem[];
  eventLogs: WebhookEventLogItemProps[];
  isLoadingLogs: boolean;
  maxRetries: string;
  setMaxRetries: (value: string) => void;
  onToggleWebhook: (id: string, currentStatus: boolean) => void;
  onDeleteWebhook: (id: string) => void;
  onTriggerWebhook: (id: string) => void;
  onCreateNew: () => void;
  onRefreshLogs: () => void;
  onSaveSettings: () => void;
}

const WebhookTabs: React.FC<WebhookTabsProps> = ({
  activeTab,
  setActiveTab,
  webhooks,
  eventLogs,
  isLoadingLogs,
  maxRetries,
  setMaxRetries,
  onToggleWebhook,
  onDeleteWebhook,
  onTriggerWebhook,
  onCreateNew,
  onRefreshLogs,
  onSaveSettings,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="configured" className="text-sm">الويب هوك المكونة</TabsTrigger>
        <TabsTrigger value="logs" className="text-sm">سجلات الأحداث</TabsTrigger>
        <TabsTrigger value="settings" className="text-sm">الإعدادات</TabsTrigger>
      </TabsList>
      
      <TabsContent value="configured" className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">الويب هوك المكونة</h3>
            <p className="text-sm text-muted-foreground">
              قم بإدارة نقاط النهاية التي تتلقى أحداث من منصتك
            </p>
          </div>
          <Button onClick={onCreateNew} className="shrink-0">
            <PlusCircle className="h-4 w-4 mr-2" />
            إضافة ويب هوك
          </Button>
        </div>
        
        <WebhookList 
          webhooks={webhooks}
          onToggleWebhook={onToggleWebhook}
          onDeleteWebhook={onDeleteWebhook}
          onTriggerWebhook={onTriggerWebhook}
        />
      </TabsContent>
      
      <TabsContent value="logs" className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">سجلات الأحداث</h3>
            <p className="text-sm text-muted-foreground">
              متابعة الأحداث المرسلة وحالة الاستجابة
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onRefreshLogs}
            disabled={isLoadingLogs}
            className="shrink-0"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingLogs ? "animate-spin" : ""}`} />
            تحديث
          </Button>
        </div>
        
        <Card className="border">
          <ScrollArea className="h-[400px]">
            <CardContent className="p-4">
              <WebhookEventLogList logs={eventLogs} isLoading={isLoadingLogs} />
            </CardContent>
          </ScrollArea>
        </Card>
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>إعدادات عامة</CardTitle>
            <CardDescription>
              إعدادات متقدمة للويب هوك وإعادة المحاولات
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="max-retries">الحد الأقصى لمحاولات إعادة الإرسال</Label>
              <Input
                id="max-retries"
                placeholder="3"
                value={maxRetries}
                onChange={(e) => setMaxRetries(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                عدد المرات التي سيتم فيها إعادة محاولة إرسال الويب هوك في حال الفشل
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <Label htmlFor="signature-secret">مفتاح التوقيع السري</Label>
              <div className="flex gap-2">
                <Input
                  id="signature-secret"
                  className="flex-1"
                  value="••••••••••••••••••••••••"
                  disabled
                />
                <Button variant="outline">إعادة إنشاء</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                يستخدم هذا المفتاح للتحقق من صحة الأحداث المرسلة من منصتك
              </p>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={onSaveSettings}>حفظ الإعدادات</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default WebhookTabs;
