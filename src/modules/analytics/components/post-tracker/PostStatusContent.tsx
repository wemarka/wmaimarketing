
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostData, StatusInfo } from "./types";
import AnimatedTabContent from "./AnimatedTabContent";
import StatusChart from "./StatusChart";
import PostItem from "./PostItem";

interface PostStatusContentProps {
  viewType: "cards" | "chart";
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  filteredPosts: PostData[];
  statuses: StatusInfo[];
  totalPosts: number;
}

const PostStatusContent: React.FC<PostStatusContentProps> = ({
  viewType,
  statusFilter,
  onStatusFilterChange,
  filteredPosts,
  statuses,
  totalPosts
}) => {
  return (
    <Tabs defaultValue={statusFilter} className="w-full" onValueChange={onStatusFilterChange}>
      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
        <TabsTrigger value="all">الكل</TabsTrigger>
        <TabsTrigger value="published">المنشورة</TabsTrigger>
        <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
        <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
      </TabsList>
      
      <AnimatePresence mode="wait">
        <TabsContent value="all" className="outline-none">
          {viewType === "cards" ? (
            <>
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post, index) => (
                    <PostItem key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">لا توجد منشورات تطابق معايير البحث</p>
                </div>
              )}
            </>
          ) : (
            <StatusChart statuses={statuses} totalPosts={totalPosts} />
          )}
        </TabsContent>
        
        <TabsContent value="published">
          <AnimatedTabContent status="published" posts={filteredPosts} />
        </TabsContent>
        
        <TabsContent value="scheduled">
          <AnimatedTabContent status="scheduled" posts={filteredPosts} />
        </TabsContent>
        
        <TabsContent value="pending">
          <AnimatedTabContent status="pending" posts={filteredPosts} />
        </TabsContent>
        
        <TabsContent value="rejected">
          <AnimatedTabContent status="rejected" posts={filteredPosts} />
        </TabsContent>
      </AnimatePresence>
    </Tabs>
  );
};

export default PostStatusContent;
