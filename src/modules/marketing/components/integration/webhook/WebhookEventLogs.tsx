
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Search, FileJson, ExternalLink, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WebhookEventLogItemProps } from './types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for webhook event logs
const mockEventLogs: WebhookEventLogItemProps[] = [
  {
    id: '1',
    event: 'new_order',
    status: 'success',
    platform: 'المتجر الإلكتروني',
    timestamp: new Date().toISOString(),
    details: 'تم استلام طلب جديد رقم #12345',
    destination: 'https://webhook.example.com/orders',
    payload: JSON.stringify({ 
      order_id: '12345',
      customer: 'عبدالله محمد',
      total: 599,
      items: 3 
    }, null, 2),
    response: JSON.stringify({ 
      status: 'success',
      message: 'Order received' 
    }, null, 2)
  },
  {
    id: '2',
    event: 'post_published',
    status: 'error',
    platform: 'مدونة المنتجات',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    details: 'فشل في إرسال بيانات المنشور الجديد',
    destination: 'https://api.myblog.com/hooks',
    payload: JSON.stringify({ 
      post_id: '789',
      title: 'منتج جديد رائع',
      author: 'سارة أحمد',
      category: 'منتجات العناية بالبشرة' 
    }, null, 2),
    response: JSON.stringify({ 
      status: 'error',
      message: 'Invalid authentication token',
      code: 401 
    }, null, 2)
  },
  {
    id: '3',
    event: 'user_subscription',
    status: 'pending',
    platform: 'نظام الاشتراكات',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    details: 'اشتراك جديد في الباقة الشهرية',
    destination: 'https://subscriptions.example.com/webhook',
    payload: JSON.stringify({ 
      subscription_id: '456',
      user_id: 'user_789',
      plan: 'monthly',
      price: 49.99
    }, null, 2)
  },
  {
    id: '4',
    event: 'order_payment',
    status: 'success',
    platform: 'بوابة الدفع',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    details: 'تم استلام الدفع للطلب #54321',
    destination: 'https://payments.example.com/webhook',
    payload: JSON.stringify({ 
      payment_id: 'pay_123456',
      order_id: '54321',
      amount: 799,
      method: 'credit_card'
    }, null, 2),
    response: JSON.stringify({ 
      status: 'success',
      transaction_id: 'tx_987654',
      received_at: new Date().toISOString()
    }, null, 2)
  }
];

const WebhookEventLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventLogs, setEventLogs] = useState<WebhookEventLogItemProps[]>(mockEventLogs);
  const [selectedLog, setSelectedLog] = useState<WebhookEventLogItemProps | null>(null);

  // Filter logs based on search and status filter
  const filteredLogs = eventLogs.filter(log => {
    const matchesSearch = 
      log.event.includes(searchQuery) || 
      log.platform.includes(searchQuery) || 
      log.details.includes(searchQuery) || 
      log.destination.includes(searchQuery);
      
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const renderStatusBadge = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">ناجح</Badge>;
      case 'error':
        return <Badge variant="destructive">فشل</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-800 dark:text-yellow-200">معلق</Badge>;
      default:
        return null;
    }
  };
  
  const viewLogDetails = (log: WebhookEventLogItemProps) => {
    setSelectedLog(log);
  };
  
  const closeDialog = () => {
    setSelectedLog(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في سجل الأحداث..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select 
          value={statusFilter} 
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="جميع الحالات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="success">ناجح</SelectItem>
            <SelectItem value="error">فشل</SelectItem>
            <SelectItem value="pending">معلق</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الحدث</TableHead>
            <TableHead>المنصة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>التفاصيل</TableHead>
            <TableHead>التوقيت</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.event}</TableCell>
              <TableCell>{log.platform}</TableCell>
              <TableCell>{renderStatusBadge(log.status)}</TableCell>
              <TableCell>{log.details}</TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm')}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => viewLogDetails(log)}
                >
                  <Info className="h-4 w-4 mr-1" />
                  التفاصيل
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredLogs.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
          <p>لا توجد سجلات تطابق بحثك</p>
          <p className="text-sm">جرب تغيير معايير البحث</p>
        </div>
      )}
      
      {/* Log Details Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>تفاصيل سجل الويب هوك</DialogTitle>
            <DialogDescription>
              تفاصيل كاملة عن الطلب والاستجابة
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">الحدث:</div>
                <div className="col-span-2">{selectedLog.event}</div>
                
                <div className="font-semibold">المنصة:</div>
                <div className="col-span-2">{selectedLog.platform}</div>
                
                <div className="font-semibold">الحالة:</div>
                <div className="col-span-2">{renderStatusBadge(selectedLog.status)}</div>
                
                <div className="font-semibold">التفاصيل:</div>
                <div className="col-span-2">{selectedLog.details}</div>
                
                <div className="font-semibold">الوجهة:</div>
                <div className="col-span-2 break-all flex items-center gap-1">
                  {selectedLog.destination}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => window.open(selectedLog.destination, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="font-semibold">التوقيت:</div>
                <div className="col-span-2">
                  {format(new Date(selectedLog.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-semibold">البيانات المرسلة:</div>
                <div className="border rounded-md p-4 bg-muted/30 relative">
                  <ScrollArea className="h-[150px]">
                    <pre className="font-mono text-sm whitespace-pre overflow-x-auto">
                      {selectedLog.payload}
                    </pre>
                  </ScrollArea>
                </div>
              </div>
              
              {selectedLog.response && (
                <div className="space-y-2">
                  <div className="font-semibold">الرد المستلم:</div>
                  <div className="border rounded-md p-4 bg-muted/30 relative">
                    <ScrollArea className="h-[150px]">
                      <pre className="font-mono text-sm whitespace-pre overflow-x-auto">
                        {selectedLog.response}
                      </pre>
                    </ScrollArea>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>إغلاق</Button>
            {selectedLog?.status === 'error' && (
              <Button variant="default">إعادة المحاولة</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebhookEventLogs;
