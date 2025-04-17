
import React, { useState, useEffect, useMemo } from 'react';
import IntegratedDataCard from './IntegratedDataCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ListFilter } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface IntegratedDataItem {
  id: string;
  title: string;
  description: string;
  type: 'post' | 'campaign' | 'analytics' | 'webhook';
  metrics?: {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  relatedItems?: {
    id: string;
    name: string;
    type: 'post' | 'campaign' | 'webhook' | 'analytics';
  }[];
  status?: string;
  date?: string;
  analyticsUrl?: string;
  importance?: 'high' | 'medium' | 'low';
}

interface IntegratedDataSectionProps {
  title: string;
  description?: string;
  items: IntegratedDataItem[];
  loading?: boolean;
  emptyMessage?: string;
  showFilters?: boolean;
  onRefresh?: () => Promise<void>;
}

/**
 * قسم لعرض البيانات المتكاملة بين المنشورات والحملات والتحليلات - محسن الأداء
 */
const IntegratedDataSection: React.FC<IntegratedDataSectionProps> = ({
  title,
  description,
  items = [],
  loading = false,
  emptyMessage = "لا توجد عناصر للعرض",
  showFilters = true,
  onRefresh
}) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // استخدام تقنية المهلة للبحث لتحسين الأداء
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  // تحسين الأداء باستخدام useMemo للتصفية والترتيب
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // تطبيق تصفية النوع
      if (filter !== "all" && item.type !== filter) return false;
      
      // تطبيق البحث
      if (debouncedSearch && !item.title.includes(debouncedSearch) && !item.description.includes(debouncedSearch)) {
        return false;
      }
      
      return true;
    });
  }, [items, filter, debouncedSearch]);
  
  // تحسين الأداء باستخدام useMemo للترتيب
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (new Date(b.date || "")).getTime() - (new Date(a.date || "")).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "status":
          return (a.status || "").localeCompare(b.status || "");
        default:
          return 0;
      }
    });
  }, [filteredItems, sortBy]);
  
  // معالجة حدث تحديث البيانات
  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  // استخدام تقنية التحميل البطيء لتحسين الأداء
  const renderItems = () => {
    // تحميل فوري للعناصر المهمة والمرئية في الشاشة الأولى
    const visibleLimit = 9;
    
    return sortedItems.map((item, index) => {
      // تعيين أهمية العناصر - سيتم تحميل العناصر المهمة أولاً
      const importance = index < 3 ? 'high' : index < visibleLimit ? 'medium' : 'low';
      const shouldLazyLoad = index >= visibleLimit;
      
      return (
        <IntegratedDataCard
          key={item.id}
          title={item.title}
          description={item.description}
          sourceType={item.type}
          sourceId={item.id}
          metrics={item.metrics}
          relatedItems={item.relatedItems}
          status={item.status}
          date={item.date}
          analyticsUrl={item.analyticsUrl}
          lazyLoad={shouldLazyLoad}
          importance={item.importance || importance}
          isLoading={loading}
        />
      );
    });
  };

  return (
    <div className="space-y-4">
      {/* العنوان والوصف */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        
        {/* عناصر التصفية */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative w-[200px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">التاريخ</SelectItem>
                <SelectItem value="title">العنوان</SelectItem>
                <SelectItem value="status">الحالة</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className={isRefreshing ? "animate-spin" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* تبويبات التصفية */}
      <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="post">المنشورات</TabsTrigger>
          <TabsTrigger value="campaign">الحملات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="webhook">التكاملات</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* عرض البيانات */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <IntegratedDataCard
              key={`skeleton-${i}`}
              title=""
              description=""
              sourceType="post"
              sourceId={`skeleton-${i}`}
              isLoading={true}
            />
          ))}
        </div>
      ) : sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderItems()}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="bg-muted/50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
            <ListFilter className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default IntegratedDataSection;
