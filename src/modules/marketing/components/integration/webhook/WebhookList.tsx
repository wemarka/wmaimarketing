import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { WebhookItem } from './types';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, MoreHorizontal, RefreshCw, Trash2 } from 'lucide-react';
import { useWebhookForm } from './hooks/useWebhookForm';
import { WebhookFormDialog } from './components/WebhookFormDialog';
import { eventTypes } from './constants';

const WebhookList = () => {
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isDialogOpen,
    setIsDialogOpen,
    selectedWebhook,
    setSelectedWebhook,
    formState,
    setFormState,
    resetForm,
    handleEventTypeChange,
    copySecret
  } = useWebhookForm();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const mockWebhooks: WebhookItem[] = [
        {
          id: '1',
          name: 'تنبيهات المنشورات',
          endpoint: 'https://api.example.com/webhook/posts',
          eventTypes: ['post_created', 'post_published', 'post_updated'],
          active: true,
          lastTriggered: new Date().toISOString(),
          createdAt: '2025-01-15T10:30:00Z',
          secretKey: 'whsec_Mds2VGl5BxHhkfYc7EoXpWs9',
        },
        {
          id: '2',
          name: 'أحداث الحملات',
          endpoint: 'https://api.myapp.com/webhook/campaigns',
          eventTypes: ['campaign_created', 'campaign_completed'],
          active: true,
          lastTriggered: null,
          createdAt: '2025-03-05T14:20:00Z',
          secretKey: 'whsec_TyZ8LpQxCr3Nmv2FAeUjH7Gs',
        },
        {
          id: '3',
          name: 'تسجيلات المستخدمين',
          endpoint: 'https://webhooks.myservice.com/users',
          eventTypes: ['user_registered'],
          active: false,
          lastTriggered: '2025-04-01T09:45:32Z',
          createdAt: '2025-02-20T11:15:00Z',
          secretKey: 'whsec_KbP9XwR4Ej5VaSm2ycLgDh3F',
        },
      ];

      setTimeout(() => {
        setWebhooks(mockWebhooks);
        setIsLoading(false);
      }, 500);
    };

    loadData();
  }, []);

  const handleToggleState = (id: string) => {
    setWebhooks(prevWebhooks =>
      prevWebhooks.map(webhook =>
        webhook.id === id ? { ...webhook, active: !webhook.active } : webhook
      )
    );
    toast.success('تم تحديث حالة الويب هوك بنجاح');
  };

  const handleAddWebhook = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditWebhook = (webhook: WebhookItem) => {
    setFormState({
      name: webhook.name,
      endpoint: webhook.endpoint,
      eventTypes: webhook.eventTypes,
      secretKey: webhook.secretKey || '',
    });
    setSelectedWebhook(webhook);
    setIsDialogOpen(true);
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(prevWebhooks => prevWebhooks.filter(webhook => webhook.id !== id));
    toast.success('تم حذف الويب هوك بنجاح');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.name || !formState.endpoint || formState.eventTypes.length === 0) {
      toast.error("يرجى ملء جميع الحقول المطلوبة واختيار حدث واحد على الأقل");
      return;
    }
    
    const newWebhook: WebhookItem = {
      id: selectedWebhook?.id || Date.now().toString(),
      name: formState.name,
      endpoint: formState.endpoint,
      eventTypes: formState.eventTypes,
      active: selectedWebhook?.active ?? true,
      lastTriggered: selectedWebhook?.lastTriggered || null,
      createdAt: selectedWebhook?.createdAt || new Date().toISOString(),
      secretKey: formState.secretKey || `whsec_${Math.random().toString(36).substring(2, 15)}`,
    };

    if (selectedWebhook) {
      setWebhooks(prevWebhooks =>
        prevWebhooks.map(hook => (hook.id === selectedWebhook.id ? newWebhook : hook))
      );
      toast.success('تم تحديث الويب هوك بنجاح');
    } else {
      setWebhooks(prevWebhooks => [...prevWebhooks, newWebhook]);
      toast.success('تم إضافة الويب هوك بنجاح');
    }

    setIsDialogOpen(false);
  };

  const regenerateSecret = () => {
    setFormState(prev => ({
      ...prev,
      secretKey: `whsec_${Math.random().toString(36).substring(2, 15)}`,
    }));
    toast.success("تم إنشاء مفتاح سرّي جديد");
  };

  const getEventNames = (eventIds: string[]) => {
    return eventIds
      .map(id => eventTypes.find(event => event.id === id)?.name || id)
      .join('، ');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">الويب هوك المتاح</h2>
        <Button onClick={handleAddWebhook}>إضافة ويب هوك</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <RefreshCw className="h-10 w-10 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">جارِ تحميل الويب هوك...</p>
        </div>
      ) : webhooks.length > 0 ? (
        <Table>
          <TableCaption>قائمة الويب هوك المسجلة</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>نقطة النهاية</TableHead>
              <TableHead>الأحداث</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>آخر تنفيذ</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map(webhook => (
              <TableRow key={webhook.id}>
                <TableCell className="font-medium">{webhook.name}</TableCell>
                <TableCell className="font-mono text-xs">
                  {webhook.endpoint}
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate">
                    {getEventNames(webhook.eventTypes)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className="bg-green-100 text-green-800"
                  >
                    {webhook.active ? 'نشط' : 'معطل'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {webhook.lastTriggered 
                    ? new Date(webhook.lastTriggered).toLocaleDateString('ar-EG') 
                    : 'لم يتم التشغيل بعد'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>خيارات</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditWebhook(webhook)}>
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copySecret(webhook.secretKey || '')}>
                        <Copy className="mr-2 h-4 w-4" /> نسخ المفتاح
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleState(webhook.id)}>
                        {webhook.active ? 'تعطيل' : 'تفعيل'}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteWebhook(webhook.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">
            لم يتم إضافة أي ويب هوك بعد، قم بإضافة أول ويب هوك الآن.
          </p>
        </div>
      )}

      <WebhookFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        formState={formState}
        setFormState={setFormState}
        selectedWebhook={selectedWebhook}
        onSubmit={handleFormSubmit}
        handleEventTypeChange={handleEventTypeChange}
        onCopySecret={copySecret}
        onRegenerateSecret={regenerateSecret}
      />
    </div>
  );
};

export default WebhookList;
