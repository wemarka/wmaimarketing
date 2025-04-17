
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import WebhookEventTypeList from "./WebhookEventTypeList";
import WebhookEventLogList from "./WebhookEventLogList";
import { PlusCircle, CheckCircle2, AlertCircle, Clock, Code, ExternalLink, Trash2, Copy, Edit, PlayCircle } from "lucide-react";
import { mockWebhookEvents, mockWebhookLogs } from './data/webhookData';
import { toast } from "sonner";

const WebhookIntegration = () => {
  const [activeTab, setActiveTab] = useState('configured');
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookName, setWebhookName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [webhookEvents, setWebhookEvents] = useState(mockWebhookEvents);
  const [eventLogs, setEventLogs] = useState(mockWebhookLogs);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [maxRetries, setMaxRetries] = useState('3');
  
  const handleCreateWebhook = () => {
    // In a real implementation, this would send a request to create the webhook
    const newWebhook = {
      id: `${Date.now()}`,
      name: webhookName,
      endpoint: webhookUrl,
      eventTypes: selectedEventType ? [selectedEventType] : [],
      active: true,
      lastTriggered: null,
      createdAt: new Date().toISOString(),
      secretKey: `wh_sec_${Math.random().toString(36).substring(2, 15)}`
    };
    
    setWebhookEvents([...webhookEvents, newWebhook]);
    
    toast.success("تم إنشاء الويب هوك بنجاح");
    
    // Reset form
    setWebhookName('');
    setWebhookUrl('');
    setSelectedEventType(null);
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
    
    // Create a new log entry
    const newLog = {
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
  
  const handleCopySecret = (secret: string) => {
    navigator.clipboard.writeText(secret)
      .then(() => toast.success("تم نسخ المفتاح السري بنجاح"))
      .catch(() => toast.error("فشل في نسخ المفتاح السري"));
  };
  
  const handleRefreshLogs = () => {
    setIsLoadingLogs(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoadingLogs(false);
      toast.success("تم تحديث سجلات الأحداث");
    }, 1000);
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'لم يتم التشغيل بعد';
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <Card>
          <CardHeader>
            <CardTitle>إنشاء ويب هوك جديد</CardTitle>
            <CardDescription>أدخل بيانات الويب هوك وحدد الأحداث التي تريد مراقبتها</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم الويب هوك</label>
                <Input 
                  placeholder="أدخل اسماً وصفياً للويب هوك" 
                  value={webhookName}
                  onChange={(e) => setWebhookName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان الويب هوك URL</label>
                <Input 
                  placeholder="https://example.com/webhook" 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">اختر الأحداث</label>
              <p className="text-sm text-muted-foreground mb-4">
                حدد الأحداث التي تريد تلقي إشعارات عنها عبر هذا الويب هوك
              </p>
              <WebhookEventTypeList 
                selectedEventType={selectedEventType}
                onSelectEventType={setSelectedEventType}
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                إلغاء
              </Button>
              <Button 
                onClick={handleCreateWebhook}
                disabled={!webhookName || !webhookUrl || !selectedEventType}
              >
                إنشاء الويب هوك
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="configured">الويب هوك المكوّنة</TabsTrigger>
            <TabsTrigger value="logs">سجلات الأحداث</TabsTrigger>
            <TabsTrigger value="settings">إعدادات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="configured">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>الويب هوك النشطة</CardTitle>
                <CardDescription>
                  قائمة بجميع الويب هوك التي تم إعدادها لتطبيقك
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {webhookEvents.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>لا توجد ويب هوك مكوّنة حالياً</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setIsCreating(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      إنشاء ويب هوك جديد
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الاسم</TableHead>
                        <TableHead>عنوان الوجهة</TableHead>
                        <TableHead>الأحداث</TableHead>
                        <TableHead>آخر تنفيذ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>إجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {webhookEvents.map((webhook) => (
                        <TableRow key={webhook.id}>
                          <TableCell className="font-medium">{webhook.name}</TableCell>
                          <TableCell className="font-mono text-xs">
                            <div className="flex items-center">
                              <Code className="h-3 w-3 mr-1 text-muted-foreground" />
                              {webhook.endpoint}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {webhook.eventTypes.map((type) => (
                                <Badge key={type} variant="outline" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                              {formatDate(webhook.lastTriggered)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {webhook.active ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                نشط
                              </div>
                            ) : (
                              <div className="flex items-center text-amber-600">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                معطل
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch 
                                checked={webhook.active} 
                                onCheckedChange={() => handleToggleWebhook(webhook.id, webhook.active)} 
                              />
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleTriggerWebhook(webhook.id)}
                                title="تشغيل الويب هوك"
                              >
                                <PlayCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteWebhook(webhook.id)}
                                title="حذف الويب هوك"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs">
            <WebhookEventLogList 
              events={eventLogs} 
              isLoading={isLoadingLogs}
              onRefresh={handleRefreshLogs}
            />
          </TabsContent>
          
          <TabsContent value="settings">
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
                    {webhookEvents.map(webhook => (
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
                  <Button onClick={() => toast.success("تم حفظ الإعدادات بنجاح")}>
                    حفظ الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default WebhookIntegration;
