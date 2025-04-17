
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Trash2, 
  Copy, 
  Edit, 
  Eye,
  Clock,
  Check,
  X
} from "lucide-react";
import { WebhookItem } from './types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

// Mock data for webhook list
const mockWebhooks: WebhookItem[] = [
  {
    id: '1',
    name: 'المبيعات الجديدة',
    endpoint: 'https://webhook.site/12345678',
    eventTypes: ['new_order', 'order_payment'],
    active: true,
    lastTriggered: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    secretKey: 'sk_test_webhook_123456'
  },
  {
    id: '2',
    name: 'اشتراكات المستخدمين',
    endpoint: 'https://api.example.com/webhook/subscriptions',
    eventTypes: ['user_subscription', 'subscription_renewal'],
    active: false,
    lastTriggered: null,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'تعليقات المنتجات',
    endpoint: 'https://myapp.com/incoming/product-reviews',
    eventTypes: ['new_review', 'review_response'],
    active: true,
    lastTriggered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const WebhookList: React.FC = () => {
  const [webhooks, setWebhooks] = useState<WebhookItem[]>(mockWebhooks);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookItem | null>(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  
  const handleStatusChange = (id: string, active: boolean) => {
    setWebhooks(prev => 
      prev.map(webhook => 
        webhook.id === id ? { ...webhook, active } : webhook
      )
    );
    toast.success(`تم ${active ? 'تفعيل' : 'تعطيل'} الويب هوك بنجاح`);
  };
  
  const handleDelete = (id: string) => {
    setWebhooks(prev => prev.filter(webhook => webhook.id !== id));
    toast.success('تم حذف الويب هوك بنجاح');
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('تم نسخ النص إلى الحافظة');
  };
  
  const viewWebhookDetails = (webhook: WebhookItem) => {
    setSelectedWebhook(webhook);
  };
  
  const closeDialog = () => {
    setSelectedWebhook(null);
    setShowSecretKey(false);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>الرابط</TableHead>
            <TableHead>الأحداث</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>آخر استدعاء</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webhooks.map((webhook) => (
            <TableRow key={webhook.id}>
              <TableCell className="font-medium">{webhook.name}</TableCell>
              <TableCell className="relative">
                <div className="flex items-center gap-1">
                  <div className="truncate max-w-[200px]">
                    {webhook.endpoint}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => copyToClipboard(webhook.endpoint)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {webhook.eventTypes.map((event) => (
                    <Badge key={event} variant="outline" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  checked={webhook.active}
                  onCheckedChange={(checked) => handleStatusChange(webhook.id, checked)}
                />
              </TableCell>
              <TableCell>
                {webhook.lastTriggered ? (
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(webhook.lastTriggered), 'yyyy-MM-dd HH:mm')}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> لم يتم الاستدعاء بعد
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => viewWebhookDetails(webhook)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDelete(webhook.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {webhooks.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
          <p>لا توجد ويب هوك مضافة</p>
          <p className="text-sm">قم بإضافة ويب هوك جديد للبدء</p>
        </div>
      )}
      
      {/* Webhook Details Dialog */}
      <Dialog open={!!selectedWebhook} onOpenChange={closeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تفاصيل الويب هوك</DialogTitle>
            <DialogDescription>
              معلومات تفصيلية عن الويب هوك وإعداداته
            </DialogDescription>
          </DialogHeader>
          
          {selectedWebhook && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">الاسم:</div>
                <div className="col-span-2">{selectedWebhook.name}</div>
                
                <div className="font-semibold">الرابط:</div>
                <div className="col-span-2 break-all flex items-center gap-1">
                  {selectedWebhook.endpoint}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(selectedWebhook.endpoint)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="font-semibold">الأحداث:</div>
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {selectedWebhook.eventTypes.map((event) => (
                      <Badge key={event} variant="outline">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="font-semibold">الحالة:</div>
                <div className="col-span-2">
                  {selectedWebhook.active ? (
                    <Badge variant="success" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Check className="h-3 w-3 mr-1" /> مفعل
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <X className="h-3 w-3 mr-1" /> معطل
                    </Badge>
                  )}
                </div>
                
                <div className="font-semibold">تاريخ الإنشاء:</div>
                <div className="col-span-2">{format(new Date(selectedWebhook.createdAt), 'yyyy-MM-dd HH:mm')}</div>
                
                <div className="font-semibold">آخر استدعاء:</div>
                <div className="col-span-2">
                  {selectedWebhook.lastTriggered 
                    ? format(new Date(selectedWebhook.lastTriggered), 'yyyy-MM-dd HH:mm') 
                    : 'لم يتم الاستدعاء بعد'}
                </div>
                
                {selectedWebhook.secretKey && (
                  <>
                    <div className="font-semibold">مفتاح السر:</div>
                    <div className="col-span-2 flex items-center gap-1">
                      {showSecretKey ? (
                        <>
                          <span className="font-mono">{selectedWebhook.secretKey}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(selectedWebhook.secretKey || '')}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowSecretKey(true)}
                        >
                          إظهار المفتاح
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>إغلاق</Button>
            <Button variant="default">تحرير</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebhookList;
