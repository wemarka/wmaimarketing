
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface TabsFilterProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  counts?: Record<string, number>;
}

const TabsFilter: React.FC<TabsFilterProps> = ({ statusFilter, onStatusChange, counts = {} }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";

  const tabs = [
    { id: "all", label: "الكل", count: counts.all || 0 },
    { id: "published", label: "المنشورة", count: counts.published || 0 },
    { id: "scheduled", label: "المجدولة", count: counts.scheduled || 0 },
    { id: "pending", label: "قيد الانتظار", count: counts.pending || 0 },
    { id: "rejected", label: "المرفوضة", count: counts.rejected || 0 },
  ];
  
  const tabListDirection = isRTL ? "flex-row-reverse" : "flex-row";

  // Animation based on RTL
  const activeIndicatorAnimation = {
    layoutId: "activeFilter",
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, type: "spring", stiffness: 500, damping: 30 }
  };
  
  return (
    <TabsList 
      className={cn(
        "grid grid-cols-2 md:grid-cols-5 mb-4 overflow-x-auto scrollbar-none",
        tabListDirection
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {tabs.map(tab => (
        <TabsTrigger 
          key={tab.id} 
          value={tab.id}
          onClick={() => onStatusChange(tab.id)}
          className="relative"
        >
          {tab.label}
          {tab.count > 0 && (
            <span className={cn(
              "text-xs bg-muted rounded-full px-1.5 py-0.5 text-muted-foreground",
              isRTL ? "mr-1.5" : "ml-1.5"
            )}>
              {tab.count}
            </span>
          )}
          {statusFilter === tab.id && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-beauty-purple"
              {...activeIndicatorAnimation}
            />
          )}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabsFilter;
