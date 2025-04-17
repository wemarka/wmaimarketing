import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WebhookEventLogItemProps } from '../types';
import { cn } from '@/lib/utils';
import { Clipboard, RefreshCw, ArrowRight, Check, Copy } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface Props {
  log: WebhookEventLogItemProps | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WebhookEventLogDetails = ({ log, open, onOpenChange }: Props) => {
  const [copied, setCopied] = useState<'payload' | 'response' | null>(null);
  const [retrying, setRetrying] = useState(false);
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ar-EG');
  };

  const getStatusBadge = (status: 'success' | 'error' | 'pending') => {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium';
    const statusClasses = {
      success: 'bg-green-100 text-green-700 border border-green-200',
      error: 'bg-red-100 text-red-700 border border-red-200',
      pending: 'bg-amber-100 text-amber-700 border border-amber-200'
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
  
  const copyToClipboard = (text: string | undefined, type: 'payload' | 'response') => {
    if (!text) return;
    
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast({
      title: "تم النسخ",
      description: "تم نسخ البيانات إلى الحافظة",
    });
    
    setTimeout(() => setCopied(null), 2000);
  };
  
  const handleRetry = () => {
    setRetrying(true);
    
    setTimeout(() => {
      setRetrying(false);
      toast({
        title: "تمت إعادة المحاولة",
        description: "تم إرسال الويب هوك مرة أخرى بنجاح",
        variant: "default",
      });
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>تفاصيل حدث الويب هوك</DialogTitle>
              <DialogDescription>معرف الحدث: {log?.id}</DialogDescription>
            </div>
            {log?.status === 'error' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRetry}
                disabled={retrying}
                className="flex items-center gap-1.5"
              >
                <RefreshCw className={cn("h-3.5 w-3.5", retrying && "animate-spin")} />
                <span>إعادة المحاولة</span>
              </Button>
            )}
          </div>
        </DialogHeader>
        
        {log && (
          <div className="mt-4">
            <div className="grid grid-cols-[1fr_2fr] gap-2 gap-x-4 mb-4">
              <div className="font-semibold text-muted-foreground">نوع الحدث</div>
              <div>{log.event}</div>
              
              <div className="font-semibold text-muted-foreground">المنصة</div>
              <div>
                <Badge variant="outline" className="bg-muted/50">
                  {log.platform}
                </Badge>
              </div>
              
              <div className="font-semibold text-muted-foreground">التوقيت</div>
              <div>{formatTimestamp(log.timestamp)}</div>
              
              <div className="font-semibold text-muted-foreground">الحالة</div>
              <div>{getStatusBadge(log.status)}</div>
              
              <div className="font-semibold text-muted-foreground">الوجهة</div>
              <div className="flex items-center gap-2">
                <span>{log.destination}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="font-semibold text-muted-foreground">التفاصيل</div>
              <div>{log.details}</div>
            </div>
            
            <div className="space-y-6">
              {log.payload && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">المحتوى المرسل</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 flex items-center gap-1.5 text-xs"
                      onClick={() => copyToClipboard(log.payload, 'payload')}
                    >
                      {copied === 'payload' ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>نسخ</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted/30 rounded-md font-mono text-sm max-h-[200px] overflow-auto p-4 whitespace-pre border border-muted hover:border-muted-foreground/20 transition-colors">
                    {log.payload}
                  </div>
                </div>
              )}
              
              {log.response && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">الرد المستلم</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 flex items-center gap-1.5 text-xs"
                      onClick={() => copyToClipboard(log.response, 'response')}
                    >
                      {copied === 'response' ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>نسخ</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="bg-muted/30 rounded-md font-mono text-sm max-h-[200px] overflow-auto p-4 whitespace-pre border border-muted hover:border-muted-foreground/20 transition-colors">
                    {log.response}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>إغلاق</Button>
              <Button variant="default">تنزيل البيانات</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WebhookEventLogDetails;
