
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { PlusCircle, CheckCircle2, AlertCircle, Clock, Code, Trash2, PlayCircle, Search, Filter, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

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

  // Filter webhooks based on search query and status
  const filteredWebhooks = webhooks.filter(webhook => {
    const matchesSearch = webhook.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         webhook.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         webhook.eventTypes.some(type => type.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === 'all') {
      return matchesSearch;
    } else if (statusFilter === 'active') {
      return matchesSearch && webhook.active;
    } else {
      return matchesSearch && !webhook.active;
    }
  });

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-xl font-bold">الويب هوك النشطة</CardTitle>
            <CardDescription className="mt-1">
              قائمة بجميع الويب هوك التي تم إعدادها لتطبيقك
            </CardDescription>
          </div>
          <Button 
            onClick={onCreateNew}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-md"
          >
            <PlusCircle className="h-4 w-4" />
            إنشاء ويب هوك جديد
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في الويب هوك..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs 
            value={statusFilter} 
            onValueChange={(value) => setStatusFilter(value as 'all' | 'active' | 'inactive')}
            className="md:self-end"
          >
            <TabsList className="bg-muted/50 border">
              <TabsTrigger value="all" className="text-xs">
                الكل{webhooks.length > 0 && <Badge variant="outline" className="ml-2 bg-background">{webhooks.length}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="active" className="text-xs">
                نشطة{webhooks.filter(w => w.active).length > 0 && 
                  <Badge variant="outline" className="ml-2 bg-background">{webhooks.filter(w => w.active).length}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="inactive" className="text-xs">
                غير نشطة{webhooks.filter(w => !w.active).length > 0 && 
                  <Badge variant="outline" className="ml-2 bg-background">{webhooks.filter(w => !w.active).length}</Badge>}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Empty State */}
        {webhooks.length === 0 ? (
          <div className="p-8 text-center border rounded-lg border-dashed">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 mb-4">
              <Code className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">لا توجد ويب هوك مكوّنة حالياً</h3>
            <p className="text-muted-foreground text-sm mb-4">أنشئ ويب هوك جديد للبدء في تلقي الأحداث من نظامك</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={onCreateNew}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              إنشاء ويب هوك جديد
            </Button>
          </div>
        ) : filteredWebhooks.length === 0 ? (
          <div className="p-8 text-center border rounded-lg border-dashed">
            <Filter className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">لا توجد نتائج تطابق معايير البحث الخاصة بك</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              مسح عوامل التصفية
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-medium">الاسم</TableHead>
                  <TableHead className="font-medium">عنوان الوجهة</TableHead>
                  <TableHead className="font-medium">الأحداث</TableHead>
                  <TableHead className="font-medium">آخر تنفيذ</TableHead>
                  <TableHead className="font-medium">الحالة</TableHead>
                  <TableHead className="font-medium">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWebhooks.map((webhook) => (
                  <TableRow key={webhook.id} className="hover:bg-muted/50 group transition-colors">
                    <TableCell className="font-medium">{webhook.name}</TableCell>
                    <TableCell className="font-mono text-xs max-w-[200px] truncate">
                      <div className="flex items-center">
                        <Code className="h-3 w-3 mr-1 text-muted-foreground shrink-0" />
                        <span className="truncate" title={webhook.endpoint}>{webhook.endpoint}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {webhook.eventTypes.length > 3 ? (
                          <>
                            {webhook.eventTypes.slice(0, 2).map((type) => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs bg-muted hover:bg-muted">
                              +{webhook.eventTypes.length - 2}
                            </Badge>
                          </>
                        ) : (
                          webhook.eventTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))
                        )}
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
                          <span>نشط</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>معطل</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={webhook.active} 
                          onCheckedChange={() => onToggle(webhook.id, webhook.active)} 
                        />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => onTrigger(webhook.id)}
                            title="تشغيل الويب هوك"
                          >
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => onDelete(webhook.id)}
                            title="حذف الويب هوك"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookList;
