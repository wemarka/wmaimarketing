
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { WebhookEventLogItemProps } from './types';
import { RefreshCw } from 'lucide-react';
import WebhookEventLogItem from './components/WebhookEventLogItem';
import WebhookEventLogDetails from './components/WebhookEventLogDetails';
import { AdvancedFilters } from './components/AdvancedFilters';
import { ExportButton } from './components/ExportButton';
import { isWithinInterval } from 'date-fns';

interface DateRange {
  from: Date;
  to?: Date;
}

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
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  // استخراج المنصات المتاحة من البيانات
  const availablePlatforms = Array.from(new Set(MOCK_EVENT_LOGS.map(log => log.platform)));

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

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  // تطبيق الفلاتر على السجلات
  const filteredLogs = logs.filter(log => {
    // فلتر التاريخ
    if (dateRange?.from) {
      const logDate = new Date(log.timestamp);
      const endDate = dateRange.to || dateRange.from;
      if (!isWithinInterval(logDate, { start: dateRange.from, end: endDate })) {
        return false;
      }
    }

    // فلتر المنصات
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(log.platform)) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">سجل أحداث الويب هوك</h3>
        <div className="flex items-center gap-2">
          <AdvancedFilters
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={handlePlatformChange}
            availablePlatforms={availablePlatforms}
          />
          <ExportButton events={filteredLogs} />
          <Button variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''} ml-2`} />
            تحديث
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <RefreshCw className="h-10 w-10 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">جارِ تحميل السجل...</p>
        </div>
      ) : filteredLogs.length > 0 ? (
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
            {filteredLogs.map(log => (
              <WebhookEventLogItem
                key={log.id}
                log={log}
                onViewDetails={handleViewDetails}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">لا توجد أحداث للعرض حالياً.</p>
        </div>
      )}
      
      <WebhookEventLogDetails
        log={selectedLog}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </div>
  );
};

export default WebhookEventLogs;

