
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { WebhookEventLogItemProps } from '../types';
import { cn } from '@/lib/utils';

interface Props {
  log: WebhookEventLogItemProps | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WebhookEventLogDetails = ({ log, open, onOpenChange }: Props) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>تفاصيل حدث الويب هوك</DialogTitle>
          <DialogDescription>معرف الحدث: {log?.id}</DialogDescription>
        </DialogHeader>
        
        {log && (
          <div className="mt-4">
            <div className="grid grid-cols-[1fr_2fr] gap-2 gap-x-4 mb-4">
              <div className="font-semibold text-muted-foreground">نوع الحدث</div>
              <div>{log.event}</div>
              
              <div className="font-semibold text-muted-foreground">المنصة</div>
              <div>{log.platform}</div>
              
              <div className="font-semibold text-muted-foreground">التوقيت</div>
              <div>{formatTimestamp(log.timestamp)}</div>
              
              <div className="font-semibold text-muted-foreground">الحالة</div>
              <div>{getStatusBadge(log.status)}</div>
              
              <div className="font-semibold text-muted-foreground">الوجهة</div>
              <div>{log.destination}</div>
              
              <div className="font-semibold text-muted-foreground">التفاصيل</div>
              <div>{log.details}</div>
            </div>
            
            {log.payload && (
              <>
                <h4 className="font-medium mt-4 mb-2">المحتوى المرسل</h4>
                <div className="bg-muted/30 rounded-md font-mono text-sm max-h-[200px] overflow-auto p-4 whitespace-pre">
                  {log.payload}
                </div>
              </>
            )}
            
            {log.response && (
              <>
                <h4 className="font-medium mt-4 mb-2">الرد المستلم</h4>
                <div className="bg-muted/30 rounded-md font-mono text-sm max-h-[200px] overflow-auto p-4 whitespace-pre">
                  {log.response}
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WebhookEventLogDetails;
