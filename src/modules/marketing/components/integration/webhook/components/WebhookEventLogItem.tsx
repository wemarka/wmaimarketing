
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, ArrowUpRight } from 'lucide-react';
import { WebhookEventLogItemProps } from '../types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
    const statusClasses = {
      success: 'bg-green-100 text-green-700 border border-green-200',
      error: 'bg-red-100 text-red-700 border border-red-200',
      pending: 'bg-amber-100 text-amber-700 border border-amber-200'
    };
    
    const statusIcons = {
      success: <span className="mr-1 text-xs">✓</span>,
      error: <span className="mr-1 text-xs">✕</span>,
      pending: <span className="mr-1 text-xs">⟳</span>
    };
    
    return (
      <Badge variant="outline" className={cn(baseClasses, statusClasses[status])}>
        {statusIcons[status]}
        {getStatusLabel(status)}
      </Badge>
    );
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
    <TableRow className="transition-colors hover:bg-muted/30">
      <TableCell className="font-medium">
        <div className="flex items-center gap-1">
          {getFormattedEventName(log.event)}
          {log.event.includes('published') && (
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 ring-2 ring-green-500/20"></span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-muted/50 hover:bg-muted">
            {log.platform}
          </Badge>
        </div>
      </TableCell>
      <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
      <TableCell>{getStatusBadge(log.status)}</TableCell>
      <TableCell className="max-w-[200px] truncate">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate">{log.details}</div>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>{log.details}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(log)} className="flex items-center gap-1 h-8">
            <Eye className="h-3.5 w-3.5" />
            <span>عرض</span>
          </Button>
          {log.destination && (
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default WebhookEventLogItem;
