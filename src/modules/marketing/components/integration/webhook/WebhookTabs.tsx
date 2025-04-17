
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { WebhookTabsProps } from './types';
import WebhookList from './WebhookList';
import WebhookEventLogs from './WebhookEventLogs';
import CreateWebhookForm from './CreateWebhookForm';

const WebhookTabs: React.FC<WebhookTabsProps> = ({
  activeTab = 'webhooks',
  onTabChange
}) => {
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="webhooks">قائمة الويب هوك</TabsTrigger>
        <TabsTrigger value="events">سجل الأحداث</TabsTrigger>
        <TabsTrigger value="create">إضافة ويب هوك جديد</TabsTrigger>
      </TabsList>
      
      <TabsContent value="webhooks" className="space-y-4">
        <WebhookList />
      </TabsContent>
      
      <TabsContent value="events" className="space-y-4">
        <WebhookEventLogs />
      </TabsContent>
      
      <TabsContent value="create" className="space-y-4">
        <CreateWebhookForm />
      </TabsContent>
    </Tabs>
  );
};

export default WebhookTabs;
