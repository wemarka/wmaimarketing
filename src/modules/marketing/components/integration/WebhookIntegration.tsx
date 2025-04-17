
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, ArrowUpDown, RefreshCw, Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { mockWebhookEvents, mockWebhookLogs } from './data/webhookData';
import { WebhookEventLogItemProps } from "./WebhookEventLogItem";
import { CreateWebhookForm, WebhookList, WebhookTabs } from './webhook';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const WebhookIntegration = () => {
  const [activeTab, setActiveTab] = useState('configured');
  const [isCreating, setIsCreating] = useState(false);
  const [webhookEvents, setWebhookEvents] = useState(mockWebhookEvents);
  const [eventLogs, setEventLogs] = useState<WebhookEventLogItemProps[]>(mockWebhookLogs);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [maxRetries, setMaxRetries] = useState('3');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const handleCreateWebhook = (webhookData: {
    name: string;
    endpoint: string;
    eventTypes: string[];
    description?: string;
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
    
    toast.success("تم إنشاء الويب هوك بنجاح", {
      description: `تم إنشاء "${webhookData.name}" وهو جاهز لاستقبال الأحداث`,
      action: {
        label: "عرض المفتاح السري",
        onClick: () => {
          toast.message(`المفتاح السري: ${newWebhook.secretKey}`, {
            description: "احتفظ بهذا المفتاح في مكان آمن. لن يتم عرضه مرة أخرى.",
          })
        }
      }
    });
    
    // Reset form
    setIsCreating(false);
    setActiveTab('configured');
  };
  
  const handleToggleWebhook = (id: string, currentStatus: boolean) => {
    setWebhookEvents(webhookEvents.map(webhook => 
      webhook.id === id ? { ...webhook, active: !currentStatus } : webhook
    ));
    
    const webhook = webhookEvents.find(w => w.id === id);
    if (webhook) {
      toast.success(`تم ${currentStatus ? 'تعطيل' : 'تفعيل'} الويب هوك: ${webhook.name}`);
    }
  };
  
  const handleDeleteWebhook = (id: string) => {
    const webhook = webhookEvents.find(w => w.id === id);
    if (!webhook) return;
    
    toast({
      description: (
        <div>
          <div className="font-semibold mb-1">هل أنت متأكد من حذف الويب هوك؟</div>
          <div>سيتم حذف "{webhook.name}" بشكل نهائي.</div>
        </div>
      ),
      action: {
        label: "نعم، حذف",
        onClick: () => {
          setWebhookEvents(webhookEvents.filter(webhook => webhook.id !== id));
          toast.success("تم حذف الويب هوك بنجاح");
        }
      },
      cancel: {
        label: "إلغاء",
      }
    });
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
      destination: webhook.endpoint,
      payload: JSON.stringify({
        event: webhook.eventTypes[0] || "manual_trigger",
        timestamp: new Date().toISOString(),
        data: {
          message: "تم تشغيل الويب هوك يدويًا للاختبار",
          webhook_id: webhook.id
        }
      }),
      response: JSON.stringify({
        status: "success",
        message: "تم استلام الحدث بنجاح",
        timestamp: new Date().toISOString()
      })
    };
    
    setEventLogs([newLog, ...eventLogs]);
    
    // Update the last triggered time
    setWebhookEvents(webhookEvents.map(w => 
      w.id === id ? { ...w, lastTriggered: new Date().toISOString() } : w
    ));
    
    toast.success("تم تشغيل الويب هوك بنجاح", {
      description: `تم تشغيل "${webhook.name}" يدويًا`
    });

    // Change to logs tab to show the new log
    setActiveTab('logs');
  };
  
  const handleRefreshLogs = () => {
    setIsLoadingLogs(true);
    
    // Simulate loading
    setTimeout(() => {
      // Generate a new random log
      const webhookId = webhookEvents.length > 0 ? 
        webhookEvents[Math.floor(Math.random() * webhookEvents.length)].id : 
        'unknown';
      
      const webhook = webhookEvents.find(w => w.id === webhookId);
      const eventType = webhook?.eventTypes[0] || 'unknown_event';
      const statuses: ('success' | 'error' | 'pending')[] = ['success', 'error', 'pending'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      const platforms = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'تشغيل يدوي'];
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      
      const newLog: WebhookEventLogItemProps = {
        id: `log${Date.now()}`,
        event: eventType,
        status: status,
        platform: platform,
        timestamp: new Date().toISOString(),
        details: `حدث جديد من نوع ${eventType}`,
        destination: webhook?.endpoint || 'https://example.com/webhook',
      };
      
      setEventLogs([newLog, ...eventLogs]);
      setIsLoadingLogs(false);
      toast.success("تم تحديث سجلات الأحداث");
    }, 1000);
  };
  
  const handleSaveSettings = () => {
    toast.success("تم حفظ الإعدادات بنجاح");
  };
  
  const handleSortLogs = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    
    // Sort logs based on timestamp
    const sortedLogs = [...eventLogs].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return newSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setEventLogs(sortedLogs);
    toast.success(`تم ترتيب السجلات ${newSortOrder === 'asc' ? 'تصاعديًا' : 'تنازليًا'}`);
  };

  // Summary statistics
  const activeWebhooks = webhookEvents.filter(w => w.active).length;
  const inactiveWebhooks = webhookEvents.length - activeWebhooks;
  const successfulEvents = eventLogs.filter(log => log.status === 'success').length;
  const failedEvents = eventLogs.filter(log => log.status === 'error').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">إدارة ويب هوك</h1>
          <p className="text-muted-foreground">
            أنشئ ويب هوك لربط منصتك مع خدمات وتطبيقات خارجية
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                فرز وتصفية
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleSortLogs}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <span>
                    ترتيب حسب {sortOrder === 'asc' ? 'الأقدم أولاً' : 'الأحدث أولاً'}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleRefreshLogs}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>تحديث السجلات</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={() => setIsCreating(true)} className="flex items-center gap-1 bg-primary hover:bg-primary/90">
            <PlusCircle className="h-4 w-4" />
            إنشاء ويب هوك جديد
          </Button>
        </div>
      </div>
      
      {/* Dashboard Stats */}
      {!isCreating && webhookEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">إجمالي الويب هوك</p>
                  <h3 className="text-2xl font-bold">{webhookEvents.length}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">الويب هوك النشطة</p>
                  <h3 className="text-2xl font-bold">{activeWebhooks}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">أحداث ناجحة</p>
                  <h3 className="text-2xl font-bold">{successfulEvents}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">أحداث فاشلة</p>
                  <h3 className="text-2xl font-bold">{failedEvents}</h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {isCreating ? (
          <motion.div
            key="create-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <CreateWebhookForm 
              onCancel={() => setIsCreating(false)}
              onSubmit={handleCreateWebhook}
            />
          </motion.div>
        ) : (
          <motion.div
            key="webhook-tabs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebhookIntegration;
