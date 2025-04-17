
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ChevronDown, Search, Filter, AlertCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WebhookEventLogItem, WebhookEventLogItemProps } from "./WebhookEventLogItem";

interface WebhookEventLogListProps {
  events: WebhookEventLogItemProps[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

const WebhookEventLogList: React.FC<WebhookEventLogListProps> = ({ 
  events, 
  isLoading = false,
  onRefresh = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(10);
  
  // Filter events based on search query and status
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.event.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.platform.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (event.details && event.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.destination && event.destination.toLowerCase().includes(searchQuery.toLowerCase()));
      
    if (statusFilter === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && event.status === statusFilter;
  });
  
  const visibleEvents = filteredEvents.slice(0, visibleCount);
  const hasMoreEvents = filteredEvents.length > visibleCount;
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 10);
  };
  
  // Count by status for badges
  const successCount = events.filter(e => e.status === 'success').length;
  const errorCount = events.filter(e => e.status === 'error').length;
  const pendingCount = events.filter(e => e.status === 'pending').length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">سجل الأحداث</CardTitle>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              ناجح: {successCount}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              فشل: {errorCount}
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              قيد التنفيذ: {pendingCount}
            </Badge>
          </div>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1 h-9"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          تحديث
        </Button>
      </CardHeader>
      <CardContent>
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث في السجلات..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[160px] h-10">
              <SelectValue placeholder="جميع الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="success">ناجح</SelectItem>
              <SelectItem value="error">فشل</SelectItem>
              <SelectItem value="pending">قيد التنفيذ</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="border rounded-lg p-3 animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-16 bg-muted rounded-full"></div>
                    <div className="h-6 w-20 bg-muted rounded-full"></div>
                    <div className="h-6 w-32 bg-muted rounded"></div>
                  </div>
                  <div className="h-4 w-24 bg-muted rounded"></div>
                </div>
              </div>
            ))
          ) : filteredEvents.length > 0 ? (
            <div className="space-y-3">
              {visibleEvents.map((event) => (
                <WebhookEventLogItem key={event.id} {...event} />
              ))}
              
              {hasMoreEvents && (
                <Button variant="ghost" className="w-full mt-4 text-muted-foreground" onClick={loadMore}>
                  عرض المزيد ({filteredEvents.length - visibleCount}) <ChevronDown className="mr-1 h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg border-dashed">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 mb-4">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">لا توجد أحداث لعرضها</h3>
              {searchQuery || statusFilter !== 'all' ? (
                <>
                  <p className="text-muted-foreground mb-4 text-sm">لا توجد نتائج تطابق معايير البحث</p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                    }}
                  >
                    مسح عوامل التصفية
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground text-sm">
                  ستظهر هنا سجلات الأحداث عند تنفيذ الويب هوك
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookEventLogList;
