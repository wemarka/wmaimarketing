
import React from "react";
import { LayoutList, LayoutGrid, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PostsHeaderProps {
  loading: boolean;
  postsCount: number;
  viewMode: "list" | "compact";
  onToggleView: () => void;
}

const PostsHeader: React.FC<PostsHeaderProps> = ({
  loading,
  postsCount,
  viewMode,
  onToggleView
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <CardTitle className="text-lg">المنشورات المعلقة</CardTitle>
        {postsCount > 0 && (
          <Badge variant="outline" className="h-6 bg-amber-50 text-amber-700 border-amber-200">
            {postsCount} منشور
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
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleView}
          className="h-8 w-8 p-0"
        >
          {viewMode === "list" ? (
            <LayoutGrid className="h-4 w-4" />
          ) : (
            <LayoutList className="h-4 w-4" />
          )}
          <span className="sr-only">
            {viewMode === "list" ? "عرض مضغوط" : "عرض موسع"}
          </span>
        </Button>
        <Button variant="ghost" size="sm">
          عرض الكل
        </Button>
      </div>
    </div>
  );
};

export default PostsHeader;
