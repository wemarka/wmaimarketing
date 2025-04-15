
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface CampaignHeaderProps {
  activeFilter: 'all' | 'active' | 'completed' | 'planned';
  onFilterChange: (filter: 'all' | 'active' | 'completed' | 'planned') => void;
  campaignsCount: number;
  loading: boolean;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  activeFilter,
  onFilterChange,
  campaignsCount,
  loading
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <CardTitle>متتبع الحملات</CardTitle>
        {campaignsCount > 0 && (
          <Badge variant="outline" className="h-6">
            {campaignsCount} حملة
          </Badge>
        )}
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw size={16} className="text-muted-foreground" />
          </motion.div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <Tabs
          value={activeFilter}
          onValueChange={(value) => onFilterChange(value as any)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="active">نشطة</TabsTrigger>
            <TabsTrigger value="planned">مخططة</TabsTrigger>
            <TabsTrigger value="completed">مكتملة</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button size="sm" className="gap-1 whitespace-nowrap min-w-max">
          <PlusCircle className="h-4 w-4" />
          <span>حملة جديدة</span>
        </Button>
      </div>
    </div>
  );
};

export default CampaignHeader;
