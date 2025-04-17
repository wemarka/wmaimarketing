
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import WebhookEventTypeList from "./WebhookEventTypeList";
import { PlusCircle, CheckCircle2, AlertCircle, Clock, Code, ExternalLink } from "lucide-react";
import { mockWebhookEvents } from './data/webhookData';

const WebhookIntegration = () => {
  const [activeTab, setActiveTab] = useState('configured');
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookName, setWebhookName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  const handleCreateWebhook = () => {
    // In a real implementation, this would send a request to create the webhook
    console.log('Creating webhook:', {
      name: webhookName,
      endpoint: webhookUrl,
      eventTypes: selectedEventType ? [selectedEventType] : []
    });
    
    // Reset form
    setWebhookName('');
    setWebhookUrl('');
    setSelectedEventType(null);
    setIsCreating(false);
    setActiveTab('configured');
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
                    {mockWebhookEvents.map((webhook) => (
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
                            <Switch checked={webhook.active} />
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>سجلات الأحداث</CardTitle>
                <CardDescription>
                  سجل تفصيلي لجميع الأحداث التي تم إرسالها عبر الويب هوك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center text-muted-foreground">
                  <p>لا توجد سجلات أحداث حالياً</p>
                </div>
              </CardContent>
            </Card>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">مفتاح التوقيع الرقمي</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      يستخدم هذا المفتاح للتحقق من أن الطلبات تأتي فعلاً من منصتنا
                    </p>
                    <div className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
                      sk_webhook_5f7c9a1b2e3d4f6a8b7c9d0e1f2a3b4c5d6e7f8a
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">محاولات إعادة الإرسال</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      عدد محاولات إعادة إرسال الويب هوك في حالة الفشل
                    </p>
                    <div className="flex items-center gap-2">
                      <Input type="number" className="w-20" defaultValue="3" />
                      <span className="text-sm">محاولات</span>
                    </div>
                  </div>
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
