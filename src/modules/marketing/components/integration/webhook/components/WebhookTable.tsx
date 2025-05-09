
import React from 'react';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, MoreHorizontal, Trash2, Link2, Layers } from 'lucide-react';
import { WebhookItem } from '../types';
import { eventTypes } from '../constants';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface WebhookTableProps {
  webhooks: WebhookItem[];
  onEditWebhook: (webhook: WebhookItem) => void;
  onDeleteWebhook: (id: string) => void;
  onToggleState: (id: string) => void;
  onCopySecret: (secret: string) => void;
}

export const WebhookTable = ({
  webhooks,
  onEditWebhook,
  onDeleteWebhook,
  onToggleState,
  onCopySecret,
}: WebhookTableProps) => {
  const { toast } = useToast();
  
  const getEventNames = (eventIds: string[]) => {
    return eventIds
      .map(id => eventTypes.find(event => event.id === id)?.name || id)
      .join('، ');
  };
  
  // معالجة النقر على روابط التكامل
  const handleIntegrationClick = (type: string, id: string) => {
    // هنا يمكن تطبيق منطق إضافي للتعامل مع الروابط مثل تخزين البيانات في الجلسة
    toast({
      title: "تم النقر على رابط التكامل",
      description: `نوع التكامل: ${type}، المعرف: ${id}`,
    });
  };

  return (
    <Table>
      <TableCaption>قائمة الويب هوك المسجلة</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>الاسم</TableHead>
          <TableHead>نقطة النهاية</TableHead>
          <TableHead>الأحداث</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>آخر تنفيذ</TableHead>
          <TableHead>التكاملات</TableHead>
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
                className={webhook.active ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}
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
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  asChild
                  title="ربط بالمنشورات"
                >
                  <Link to={`/marketing/posts?webhook=${webhook.id}`} onClick={() => handleIntegrationClick('posts', webhook.id)}>
                    <Link2 className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  asChild
                  title="ربط بالحملات"
                >
                  <Link to={`/marketing/campaigns?webhook=${webhook.id}`} onClick={() => handleIntegrationClick('campaigns', webhook.id)}>
                    <Layers className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
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
                  <DropdownMenuItem onClick={() => onEditWebhook(webhook)}>
                    تعديل
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCopySecret(webhook.secretKey || '')}>
                    <Copy className="mr-2 h-4 w-4" /> نسخ المفتاح
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleState(webhook.id)}>
                    {webhook.active ? 'تعطيل' : 'تفعيل'}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDeleteWebhook(webhook.id)}
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
  );
};
