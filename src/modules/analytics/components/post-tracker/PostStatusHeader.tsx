
import React from "react";
import { BarChart2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface PostStatusHeaderProps {
  isLoading: boolean;
  onRefresh: () => void;
  onViewTypeToggle: () => void;
  viewType: "cards" | "chart";
}

const PostStatusHeader: React.FC<PostStatusHeaderProps> = ({
  isLoading,
  onRefresh,
  onViewTypeToggle,
  viewType
}) => {
  return (
    <div className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="flex items-center gap-2">
        حالة المنشورات
        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw size={16} className="text-muted-foreground" />
          </motion.div>
        )}
      </CardTitle>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
          <RefreshCw size={14} /> تحديث
        </Button>
        <Button variant="ghost" size="sm">عرض الكل</Button>
      </div>
    </div>
  );
};

export default PostStatusHeader;
