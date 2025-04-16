
import React from "react";
import { BarChart2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface PostStatusHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
  onViewTypeToggle: () => void;
  viewType: "cards" | "chart";
  totalPosts?: number;
}

const PostStatusHeader: React.FC<PostStatusHeaderProps> = ({
  isLoading,
  onRefresh,
  onViewTypeToggle,
  viewType,
  totalPosts = 0
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  const spinAnimation = {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: "linear" }
  };

  return (
    <div className="flex flex-col space-y-2 pb-2">
      <div className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          حالة المنشورات
          {isLoading && (
            <motion.div {...spinAnimation}>
              <RefreshCw size={16} className="text-muted-foreground" />
            </motion.div>
          )}
          {totalPosts > 0 && (
            <Badge variant="secondary" className={cn(
              isRTL ? "mr-2" : "ml-2"
            )}>
              {totalPosts} منشور
            </Badge>
          )}
        </CardTitle>
        <div className={cn(
          "flex items-center",
          isRTL ? "space-x-reverse space-x-2" : "space-x-2"
        )}>
          <Button 
            variant="outline" 
            size="icon"
            className="h-8 w-8"
            onClick={onViewTypeToggle}
            title={viewType === "cards" ? "عرض المخطط البياني" : "عرض البطاقات"}
          >
            <BarChart2 className="h-4 w-4" />
            <span className="sr-only">تبديل العرض</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex gap-1 items-center"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={cn(isRTL ? "ml-1" : "mr-1")} /> تحديث
          </Button>
          <Button variant="ghost" size="sm">عرض الكل</Button>
        </div>
      </div>
      
      {/* شريط التقدم يظهر توزيع المنشورات */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex">
        <motion.div 
          className="bg-green-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: '45%' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        <motion.div 
          className="bg-yellow-500 h-full" 
          initial={{ width: 0 }}
          animate={{ width: '30%' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div 
          className="bg-blue-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: '20%' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div 
          className="bg-red-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: '5%' }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </div>
    </div>
  );
};

export default PostStatusHeader;
