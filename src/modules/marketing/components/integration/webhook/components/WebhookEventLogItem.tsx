
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { WebhookEventLogItemProps } from '../types';
import { cn } from '@/lib/utils';

interface Props {
  log: WebhookEventLogItemProps;
  onViewDetails: (log: WebhookEventLogItemProps) => void;
}

const WebhookEventLogItem = ({ log, onViewDetails }: Props) => {
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
    <TableRow>
      <TableCell className="font-medium">{getFormattedEventName(log.event)}</TableCell>
      <TableCell>{log.platform}</TableCell>
      <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
      <TableCell>{getStatusBadge(log.status)}</TableCell>
      <TableCell className="max-w-[200px] truncate">{log.details}</TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" onClick={() => onViewDetails(log)}>
          <Eye className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default WebhookEventLogItem;
