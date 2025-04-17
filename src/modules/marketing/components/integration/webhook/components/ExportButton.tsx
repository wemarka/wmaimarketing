
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { WebhookEventLogItemProps } from "../types";
import { toast } from "@/components/ui/use-toast";

interface ExportButtonProps {
  events: WebhookEventLogItemProps[];
}

export const ExportButton = ({ events }: ExportButtonProps) => {
  const handleExport = () => {
    try {
      // تحضير البيانات للتصدير
      const exportData = events.map(event => ({
        id: event.id,
        event: event.event,
        status: event.status,
        platform: event.platform,
        timestamp: event.timestamp,
        details: event.details,
        destination: event.destination,
        payload: event.payload,
        response: event.response
      }));

      // إنشاء ملف للتنزيل
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // إنشاء رابط وتنزيل الملف
      const link = document.createElement('a');
      link.href = url;
      link.download = `webhook-events-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "تم التصدير بنجاح",
        description: "تم تصدير سجلات الويب هوك بنجاح",
        variant: "default",
      });
    } catch (error) {
      console.error('Error exporting events:', error);
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير السجلات",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="h-9 flex items-center gap-1.5"
    >
      <FileDown className="h-4 w-4" />
      <span>تصدير السجلات</span>
    </Button>
  );
};

