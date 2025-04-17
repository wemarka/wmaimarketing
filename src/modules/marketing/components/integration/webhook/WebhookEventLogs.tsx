import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WebhookEventLogItemProps } from './types';
import { cn } from '@/lib/utils';
import { RefreshCw, Eye } from 'lucide-react';

const MOCK_EVENT_LOGS: WebhookEventLogItemProps[] = [
  {
    id: '1',
    event: 'post_created',
    status: 'success',
    platform: 'instagram',
    timestamp: '2025-04-14T10:30:00Z',
    details: 'تم إنشاء منشور جديد',
    destination: 'https://api.example.com/webhook/posts',
    payload: JSON.stringify({ id: '123', type: 'post_created', data: { title: 'منشور جديد', content: 'محتوى المنشور' } }, null, 2),
    response: JSON.stringify({ status: 'success', message: 'تم استلام الحدث بنجاح' }, null, 2)
  },
  {
    id: '2',
    event: 'campaign_created',
    status: 'error',
    platform: 'facebook',
    timestamp: '2025-04-13T14:15:00Z',
    details: 'فشل في إشعار الخدمة الخارجية',
    destination: 'https://api.myapp.com/webhook/campaigns',
    payload: JSON.stringify({ id: '456', type: 'campaign_created', data: { name: 'حملة الربيع', budget: 500 } }, null, 2),
    response: JSON.stringify({ error: 'Internal Server Error', message: 'خطأ في معالجة الطلب' }, null, 2)
  },
  {
    id: '3',
    event: 'post_published',
    status: 'pending',
    platform: 'tiktok',
    timestamp: '2025-04-12T09:45:00Z',
    details: 'جاري مزامنة الحدث',
    destination: 'https://webhooks.myservice.com/users',
    payload: JSON.stringify({ id: '789', type: 'post_published', data: { title: 'فيديو جديد', url: 'https://example.com/video' } }, null, 2)
  }
];

const WebhookEventLogs = () => {
  const [logs, setLogs] = useState<WebhookEventLogItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<WebhookEventLogItemProps | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setLogs(MOCK_EVENT_LOGS);
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleViewDetails = (log: WebhookEventLogItemProps) => {
    setSelectedLog(log);
    setShowDetails(true);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ar-EG');
  };

  const getStatusBadge = (status: 'success' | 'error' | 'pending') => {
    const baseClasses = 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium';
    const statusClasses = {
      success: 'bg-green-100 text-green-700',
      error: 'bg-red-100 text-red-700',
      pending: 'bg-amber-100 text-amber-700'
    };
    
    return <Badge className={cn(baseClasses, statusClasses[status])}>{getStatusLabel(status)}</Badge>;
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'success':
        return 'ناجح';
      case 'error':
        return 'خطأ';
      case 'pending':
        return 'قيد الانتظار';
      default:
        return status;
    }
  };

  const getFormattedEventName = (event: string) => {
    const eventMap: Record<string, string> = {
      post_created: 'إنشاء منشور',
      post_published: 'نشر منشور',
      post_updated: 'تحديث منشور',
      post_deleted: 'حذف منشور',
      campaign_created: 'إنشاء حملة',
      campaign_completed: 'اكتمال حملة',
      user_registered: 'تسجيل مستخدم'
    };
    
    return eventMap[event] || event;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">سجل أحداث الويب هوك</h3>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <RefreshCw className="h-10 w-10 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">جارِ تحميل السجل...</p>
        </div>
      ) : logs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الحدث</TableHead>
              <TableHead>المنصة</TableHead>
              <TableHead>التوقيت</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>التفاصيل</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map(log => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{getFormattedEventName(log.event)}</TableCell>
                <TableCell>{log.platform}</TableCell>
                <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                <TableCell>{getStatusBadge(log.status)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{log.details}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(log)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">لا توجد أحداث للعرض حاليًا.</p>
        </div>
      )}
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>تفاصيل حدث الويب هوك</DialogTitle>
            <DialogDescription>
              معرف الحدث: {selectedLog?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="mt-4">
              <div className="grid grid-cols-[1fr_2fr] gap-2 gap-x-4 mb-4">
                <div className="font-semibold text-muted-foreground">نوع الحدث</div>
                <div>{getFormattedEventName(selectedLog.event)}</div>
                
                <div className="font-semibold text-muted-foreground">المنصة</div>
                <div>{selectedLog.platform}</div>
                
                <div className="font-semibold text-muted-foreground">التوقيت</div>
                <div>{formatTimestamp(selectedLog.timestamp)}</div>
                
                <div className="font-semibold text-muted-foreground">الحالة</div>
                <div>{getStatusBadge(selectedLog.status)}</div>
                
                <div className="font-semibold text-muted-foreground">الوجهة</div>
                <div>{selectedLog.destination}</div>
                
                <div className="font-semibold text-muted-foreground">التفاصيل</div>
                <div>{selectedLog.details}</div>
              </div>
              
              {selectedLog.payload && (
                <>
                  <h4 className="font-medium mt-4 mb-2">المحتوى المرسل</h4>
                  <div className="bg-muted/30 rounded-md font-mono text-sm max-h-[200px] overflow-auto p-4 whitespace-pre">
                    {selectedLog.payload}
                  </div>
                </>
              )}
              
              {selectedLog.response && (
                <>
                  <h4 className="font-medium mt-4 mb-2">الرد المستلم</h4>
                  <div className="bg-muted/30 rounded-md font-mono text-sm max-h-[200px] overflow-auto p-4 whitespace-pre">
                    {selectedLog.response}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebhookEventLogs;
