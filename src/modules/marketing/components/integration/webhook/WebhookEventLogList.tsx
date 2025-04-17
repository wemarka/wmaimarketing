
import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { WebhookEventLogItemProps } from './types';

interface WebhookEventLogListProps {
  logs: WebhookEventLogItemProps[];
  isLoading?: boolean;
}

const WebhookEventLogList: React.FC<WebhookEventLogListProps> = ({ logs, isLoading = false }) => {
  const getStatusBadge = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" /> ناجح
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="h-3 w-3 mr-1" /> فشل
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="h-3 w-3 mr-1" /> قيد التنفيذ
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground">جاري تحميل السجلات...</p>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-md">
        <p className="text-muted-foreground mb-2">لا توجد سجلات أحداث بعد</p>
        <p className="text-xs text-muted-foreground">
          ستظهر السجلات هنا عندما يتم إرسال أحداث إلى نقاط النهاية الخاصة بك
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <Accordion key={log.id} type="single" collapsible className="border rounded-md">
          <AccordionItem value={log.id} className="border-0">
            <AccordionTrigger className="px-4 py-3 hover:bg-accent/50 [&[data-state=open]]:bg-accent/50">
              <div className="flex flex-1 items-center justify-between overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">{log.event}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true, locale: ar })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{log.platform}</Badge>
                  {getStatusBadge(log.status)}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-0">
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">{log.details}</p>
                <div>
                  <p className="font-medium mb-1">نقطة النهاية:</p>
                  <code className="bg-accent/50 p-1 rounded text-xs">{log.destination}</code>
                </div>
                
                {log.payload && (
                  <div>
                    <p className="font-medium mb-1">البيانات المرسلة:</p>
                    <pre className="bg-accent/50 p-2 rounded text-xs overflow-auto max-h-24 rtl:text-left">
                      {log.payload}
                    </pre>
                  </div>
                )}
                
                {log.response && (
                  <div>
                    <p className="font-medium mb-1">الاستجابة:</p>
                    <pre className="bg-accent/50 p-2 rounded text-xs overflow-auto max-h-24 rtl:text-left">
                      {log.response}
                    </pre>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default WebhookEventLogList;
