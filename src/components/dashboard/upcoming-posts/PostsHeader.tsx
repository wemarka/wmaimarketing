
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PostsHeaderProps {
  loading: boolean;
  postsCount: number;
  viewMode: "list" | "compact";
  onToggleView: () => void;
}

const PostsHeader = ({ loading, postsCount, viewMode, onToggleView }: PostsHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-lg font-medium">المنشورات القادمة</CardTitle>
        {loading ? (
          <div className="mt-1">
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          <CardDescription>
            {`${postsCount} منشور مجدول للأيام القادمة`}
          </CardDescription>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleView}
          className="text-xs"
        >
          {viewMode === "list" ? "عرض مختصر" : "عرض مفصل"}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/scheduler')}
          className="text-xs"
        >
          عرض الجدول
        </Button>
      </div>
    </div>
  );
};

export default PostsHeader;
