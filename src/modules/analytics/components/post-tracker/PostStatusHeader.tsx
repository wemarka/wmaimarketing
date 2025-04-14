
import React from "react";
import { BarChart2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="flex flex-col space-y-2 pb-2">
      <div className="flex flex-row items-center justify-between">
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
          {totalPosts > 0 && (
            <Badge variant="secondary" className="ml-2">
              {totalPosts} منشور
            </Badge>
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
      
      {/* شريط التقدم يظهر توزيع المنشورات */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex">
        <div className="bg-green-500 h-full" style={{ width: '45%' }}></div>
        <div className="bg-yellow-500 h-full" style={{ width: '30%' }}></div>
        <div className="bg-blue-500 h-full" style={{ width: '20%' }}></div>
        <div className="bg-red-500 h-full" style={{ width: '5%' }}></div>
      </div>
    </div>
  );
};

export default PostStatusHeader;
