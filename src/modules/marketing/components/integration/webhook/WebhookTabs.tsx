
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebhookList from "./WebhookList";
import WebhookEventLogList from "../WebhookEventLogList";
import WebhookSettings from "./WebhookSettings";
import { WebhookEventLogItemProps } from "../WebhookEventLogItem";

interface Webhook {
  id: string;
  name: string;
  endpoint: string;
  eventTypes: string[];
  active: boolean;
  lastTriggered: string | null;
  createdAt: string;
  secretKey: string;
}

interface WebhookTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  webhooks: Webhook[];
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
  onSaveSettings
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="configured">الويب هوك المكوّنة</TabsTrigger>
        <TabsTrigger value="logs">سجلات الأحداث</TabsTrigger>
        <TabsTrigger value="settings">إعدادات</TabsTrigger>
      </TabsList>
      
      <TabsContent value="configured">
        <WebhookList 
          webhooks={webhooks}
          onToggle={onToggleWebhook}
          onDelete={onDeleteWebhook}
          onTrigger={onTriggerWebhook}
          onCreateNew={onCreateNew}
        />
      </TabsContent>
      
      <TabsContent value="logs">
        <WebhookEventLogList 
          events={eventLogs} 
          isLoading={isLoadingLogs}
          onRefresh={onRefreshLogs}
        />
      </TabsContent>
      
      <TabsContent value="settings">
        <WebhookSettings 
          webhooks={webhooks}
          maxRetries={maxRetries}
          setMaxRetries={setMaxRetries}
          onSaveSettings={onSaveSettings}
        />
      </TabsContent>
    </Tabs>
  );
};

export default WebhookTabs;
