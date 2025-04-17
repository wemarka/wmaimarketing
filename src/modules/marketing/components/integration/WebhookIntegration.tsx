
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { mockWebhookEvents, mockWebhookLogs } from './data/webhookData';
import { WebhookEventLogItemProps } from "./WebhookEventLogItem";
import { CreateWebhookForm, WebhookTabs } from './webhook';

const WebhookIntegration = () => {
  const [activeTab, setActiveTab] = useState('configured');
  const [isCreating, setIsCreating] = useState(false);
  const [webhookEvents, setWebhookEvents] = useState(mockWebhookEvents);
  const [eventLogs, setEventLogs] = useState<WebhookEventLogItemProps[]>(mockWebhookLogs);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [maxRetries, setMaxRetries] = useState('3');
  
  const handleCreateWebhook = (webhookData: {
    name: string;
    endpoint: string;
    eventTypes: string[];
  }) => {
    // In a real implementation, this would send a request to create the webhook
    const newWebhook = {
      id: `${Date.now()}`,
      name: webhookData.name,
      endpoint: webhookData.endpoint,
      eventTypes: webhookData.eventTypes,
      active: true,
      lastTriggered: null,
      createdAt: new Date().toISOString(),
      secretKey: `wh_sec_${Math.random().toString(36).substring(2, 15)}`
    };
    
    setWebhookEvents([...webhookEvents, newWebhook]);
    
    toast.success("تم إنشاء الويب هوك بنجاح");
    
    // Reset form
    setIsCreating(false);
    setActiveTab('configured');
  };
  
  const handleToggleWebhook = (id: string, currentStatus: boolean) => {
    setWebhookEvents(webhookEvents.map(webhook => 
      webhook.id === id ? { ...webhook, active: !currentStatus } : webhook
    ));
    
    toast.success(`تم ${currentStatus ? 'تعطيل' : 'تفعيل'} الويب هوك`);
  };
  
  const handleDeleteWebhook = (id: string) => {
    setWebhookEvents(webhookEvents.filter(webhook => webhook.id !== id));
    toast.success("تم حذف الويب هوك بنجاح");
  };
  
  const handleTriggerWebhook = (id: string) => {
    // In a real implementation, this would manually trigger the webhook
    const webhook = webhookEvents.find(w => w.id === id);
    if (!webhook) return;
    
    // Create a new log entry with the correct status type
    const newLog: WebhookEventLogItemProps = {
      id: `log${Date.now()}`,
      event: webhook.eventTypes[0] || "manual_trigger",
      status: "success",
      platform: "تشغيل يدوي",
      timestamp: new Date().toISOString(),
      details: `تم التشغيل اليدوي للويب هوك: ${webhook.name}`,
      destination: webhook.endpoint
    };
    
    setEventLogs([newLog, ...eventLogs]);
    
    // Update the last triggered time
    setWebhookEvents(webhookEvents.map(w => 
      w.id === id ? { ...w, lastTriggered: new Date().toISOString() } : w
    ));
    
    toast.success("تم تشغيل الويب هوك بنجاح");
  };
  
  const handleRefreshLogs = () => {
    setIsLoadingLogs(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoadingLogs(false);
      toast.success("تم تحديث سجلات الأحداث");
    }, 1000);
  };
  
  const handleSaveSettings = () => {
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">إدارة ويب هوك</h1>
          <p className="text-muted-foreground">
            أنشئ ويب هوك لربط منصتك مع خدمات وتطبيقات خارجية
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          إنشاء ويب هوك جديد
        </Button>
      </div>
      
      {isCreating ? (
        <CreateWebhookForm 
          onCancel={() => setIsCreating(false)}
          onSubmit={handleCreateWebhook}
        />
      ) : (
        <WebhookTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          webhooks={webhookEvents}
          eventLogs={eventLogs}
          isLoadingLogs={isLoadingLogs}
          maxRetries={maxRetries}
          setMaxRetries={setMaxRetries}
          onToggleWebhook={handleToggleWebhook}
          onDeleteWebhook={handleDeleteWebhook}
          onTriggerWebhook={handleTriggerWebhook}
          onCreateNew={() => setIsCreating(true)}
          onRefreshLogs={handleRefreshLogs}
          onSaveSettings={handleSaveSettings}
        />
      )}
    </div>
  );
};

export default WebhookIntegration;
