
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import WebhookList from "./WebhookList";
import WebhookEventLogList from "../WebhookEventLogList";
import WebhookSettings from "./WebhookSettings";
import { WebhookEventLogItemProps } from "../WebhookEventLogItem";
import { AlertTriangle, Bell, Cog } from "lucide-react";

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
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-muted/50 border p-1">
        <TabsTrigger value="configured" className="flex items-center gap-1.5">
          <Bell className="h-4 w-4" />
          <span>الويب هوك المكوّنة</span>
          {webhooks.length > 0 && (
            <span className="ml-1 text-xs rounded-full bg-primary/10 px-2 py-0.5">
              {webhooks.length}
            </span>
          )}
        </TabsTrigger>
        
        <TabsTrigger value="logs" className="flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4" />
          <span>سجلات الأحداث</span>
          {eventLogs.filter(log => log.status === 'error').length > 0 && (
            <span className="ml-1 text-xs rounded-full bg-red-100 text-red-600 px-2 py-0.5">
              {eventLogs.filter(log => log.status === 'error').length}
            </span>
          )}
        </TabsTrigger>
        
        <TabsTrigger value="settings" className="flex items-center gap-1.5">
          <Cog className="h-4 w-4" />
          <span>إعدادات</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="configured">
        <motion.div
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
        >
          <WebhookList 
            webhooks={webhooks}
            onToggle={onToggleWebhook}
            onDelete={onDeleteWebhook}
            onTrigger={onTriggerWebhook}
            onCreateNew={onCreateNew}
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="logs">
        <motion.div
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
        >
          <WebhookEventLogList 
            events={eventLogs} 
            isLoading={isLoadingLogs}
            onRefresh={onRefreshLogs}
          />
        </motion.div>
      </TabsContent>
      
      <TabsContent value="settings">
        <motion.div
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
        >
          <WebhookSettings 
            webhooks={webhooks}
            maxRetries={maxRetries}
            setMaxRetries={setMaxRetries}
            onSaveSettings={onSaveSettings}
          />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default WebhookTabs;
