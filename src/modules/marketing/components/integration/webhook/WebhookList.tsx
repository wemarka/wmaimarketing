
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { WebhookItem } from './types';
import { Checkbox } from '@/components/ui/checkbox';
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

// Sample event types
const eventTypes = [
  { id: "post_created", name: "تم إنشاء منشور" },
  { id: "post_published", name: "تم نشر منشور" },
  { id: "post_updated", name: "تم تحديث منشور" },
  { id: "post_deleted", name: "تم حذف منشور" },
  { id: "campaign_created", name: "تم إنشاء حملة" },
  { id: "campaign_completed", name: "تم إكمال حملة" },
  { id: "user_registered", name: "تسجيل مستخدم جديد" },
  { id: "order_completed", name: "تم إكمال طلب" }
];

const WebhookList = () => {
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookItem | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    endpoint: '',
    eventTypes: [] as string[],
    secretKey: '',
  });

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setIsLoading(true);
      // Mock data for demonstration
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
    // Reset form and open dialog
    setFormState({
      name: '',
      endpoint: '',
      eventTypes: [],
      secretKey: '',
    });
    setSelectedWebhook(null);
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

  const handleEventTypeChange = (eventId: string) => {
    setFormState(prev => {
      const eventTypes = prev.eventTypes.includes(eventId)
        ? prev.eventTypes.filter(id => id !== eventId)
        : [...prev.eventTypes, eventId];
      
      return { ...prev, eventTypes };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      // Update existing
      setWebhooks(prevWebhooks =>
        prevWebhooks.map(hook => (hook.id === selectedWebhook.id ? newWebhook : hook))
      );
      toast.success('تم تحديث الويب هوك بنجاح');
    } else {
      // Add new
      setWebhooks(prevWebhooks => [...prevWebhooks, newWebhook]);
      toast.success('تم إضافة الويب هوك بنجاح');
    }

    setIsDialogOpen(false);
  };

  const copySecret = (secret: string) => {
    navigator.clipboard.writeText(secret);
    toast.success('تم نسخ المفتاح السري');
  };

  const getEventNames = (eventIds: string[]) => {
    return eventIds
      .map(id => eventTypes.find(event => event.id === id)?.name || id)
      .join('، ');
  };

  return (
    <div className="space-y-4">
      {/* Webhooks Management UI */}
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
                    variant={webhook.active ? "outline" : "outline"} 
                    className={webhook.active 
                      ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100" 
                      : "bg-gray-50 text-gray-500 border-gray-300 hover:bg-gray-100"
                    }
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

      {/* Add/Edit Webhook Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedWebhook ? 'تعديل ويب هوك' : 'إضافة ويب هوك'}</DialogTitle>
            <DialogDescription>
              {selectedWebhook
                ? 'قم بتعديل إعدادات الويب هوك'
                : 'أضف ويب هوك جديد للاتصال بخدمتك'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم الويب هوك</Label>
                <Input
                  id="name"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  placeholder="مثال: تحديثات المنشورات"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="endpoint">رابط الويب هوك (Endpoint)</Label>
                <Input
                  id="endpoint"
                  value={formState.endpoint}
                  onChange={e => setFormState({ ...formState, endpoint: e.target.value })}
                  placeholder="https://example.com/webhook"
                  required
                />
              </div>
              
              <div>
                <Label className="block mb-2">أحداث التشغيل</Label>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map(event => (
                    <div key={event.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id={`event-${event.id}`}
                        checked={formState.eventTypes.includes(event.id)}
                        onCheckedChange={() => handleEventTypeChange(event.id)}
                      />
                      <label
                        htmlFor={`event-${event.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {event.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="secret" className="flex items-center justify-between">
                  <span>المفتاح السري (اختياري)</span>
                  {selectedWebhook && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => copySecret(formState.secretKey)}
                      className="h-7 text-xs"
                    >
                      <Copy className="mr-1 h-3 w-3" /> نسخ
                    </Button>
                  )}
                </Label>
                <Input
                  id="secret"
                  value={formState.secretKey}
                  onChange={e => setFormState({ ...formState, secretKey: e.target.value })}
                  placeholder="المفتاح السري الخاص بك للتحقق من صحة الطلبات"
                  type="text"
                />
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button type="submit" className="w-full sm:w-auto">
                {selectedWebhook ? 'تحديث' : 'إضافة'} الويب هوك
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebhookList;
