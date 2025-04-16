
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PostData, StatusInfo } from "./types";
import AnimatedTabContent from "./AnimatedTabContent";
import StatusChart from "./StatusChart";
import PostItem from "./PostItem";
import TabsFilter from "./TabsFilter";

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
  // Calculate counts for each status - ensure we're accessing the correct properties based on StatusInfo type
  const statusCounts = statuses.reduce((acc, status) => {
    // Make sure we're accessing properties that exist on the StatusInfo type
    // We'll use a type assertion or optional chaining to avoid TypeScript errors
    if ('id' in status && 'value' in status) {
      acc[status.id as string] = status.value as number;
    }
    return acc;
  }, { all: totalPosts } as Record<string, number>);

  return (
    <Tabs defaultValue={statusFilter} className="w-full" onValueChange={onStatusFilterChange} dir="rtl">
      <TabsFilter 
        statusFilter={statusFilter} 
        onStatusChange={onStatusFilterChange}
        counts={statusCounts}
      />
      
      <AnimatePresence mode="wait">
        <TabsContent value="all" className="outline-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
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
