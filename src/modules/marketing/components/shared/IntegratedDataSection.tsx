
import React, { useState } from 'react';
import IntegratedDataCard from './IntegratedDataCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ListFilter } from 'lucide-react';

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
}

interface IntegratedDataSectionProps {
  title: string;
  description?: string;
  items: IntegratedDataItem[];
  loading?: boolean;
  emptyMessage?: string;
  showFilters?: boolean;
}

/**
 * قسم لعرض البيانات المتكاملة بين المنشورات والحملات والتحليلات
 */
const IntegratedDataSection: React.FC<IntegratedDataSectionProps> = ({
  title,
  description,
  items = [],
  loading = false,
  emptyMessage = "لا توجد عناصر للعرض",
  showFilters = true
}) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  
  // تصفية العناصر حسب النوع والبحث
  const filteredItems = items.filter(item => {
    // تطبيق تصفية النوع
    if (filter !== "all" && item.type !== filter) return false;
    
    // تطبيق البحث
    if (searchTerm && !item.title.includes(searchTerm) && !item.description.includes(searchTerm)) {
      return false;
    }
    
    return true;
  });
  
  // ترتيب العناصر
  const sortedItems = [...filteredItems].sort((a, b) => {
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
            <Button variant="outline" size="icon">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-muted h-48 rounded-md"></div>
          ))}
        </div>
      ) : sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems.map((item) => (
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
            />
          ))}
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
