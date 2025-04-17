
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, CheckCircle2, AlertCircle, Clock, Code, Trash2, PlayCircle } from "lucide-react";

interface Webhook {
  id: string;
  name: string;
  endpoint: string;
  eventTypes: string[];
  active: boolean;
  lastTriggered: string | null;
  createdAt: string;
  secretKey: string;
}

interface WebhookListProps {
  webhooks: Webhook[];
  onToggle: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  onTrigger: (id: string) => void;
  onCreateNew: () => void;
}

const WebhookList: React.FC<WebhookListProps> = ({
  webhooks,
  onToggle,
  onDelete,
  onTrigger,
  onCreateNew
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'لم يتم التشغيل بعد';
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>الويب هوك النشطة</CardTitle>
        <CardDescription>
          قائمة بجميع الويب هوك التي تم إعدادها لتطبيقك
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {webhooks.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>لا توجد ويب هوك مكوّنة حالياً</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onCreateNew}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              إنشاء ويب هوك جديد
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>عنوان الوجهة</TableHead>
                <TableHead>الأحداث</TableHead>
                <TableHead>آخر تنفيذ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell className="font-mono text-xs">
                    <div className="flex items-center">
                      <Code className="h-3 w-3 mr-1 text-muted-foreground" />
                      {webhook.endpoint}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.eventTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      {formatDate(webhook.lastTriggered)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {webhook.active ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        نشط
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        معطل
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={webhook.active} 
                        onCheckedChange={() => onToggle(webhook.id, webhook.active)} 
                      />
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => onTrigger(webhook.id)}
                        title="تشغيل الويب هوك"
                      >
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0"
                        onClick={() => onDelete(webhook.id)}
                        title="حذف الويب هوك"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookList;
