
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface TabsFilterProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  counts?: Record<string, number>;
}

const TabsFilter: React.FC<TabsFilterProps> = ({ statusFilter, onStatusChange, counts = {} }) => {
  const tabs = [
    { id: "all", label: "الكل", count: counts.all || 0 },
    { id: "published", label: "المنشورة", count: counts.published || 0 },
    { id: "scheduled", label: "المجدولة", count: counts.scheduled || 0 },
    { id: "pending", label: "قيد الانتظار", count: counts.pending || 0 },
    { id: "rejected", label: "المرفوضة", count: counts.rejected || 0 },
  ];
  
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4 overflow-x-auto scrollbar-none">
      {tabs.map(tab => (
        <TabsTrigger 
          key={tab.id} 
          value={tab.id}
          onClick={() => onStatusChange(tab.id)}
          className="relative"
        >
          {tab.label}
          {tab.count > 0 && (
            <span className="ml-1.5 text-xs bg-muted rounded-full px-1.5 py-0.5 text-muted-foreground">
              {tab.count}
            </span>
          )}
          {statusFilter === tab.id && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-beauty-purple"
              layoutId="activeFilter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabsFilter;
