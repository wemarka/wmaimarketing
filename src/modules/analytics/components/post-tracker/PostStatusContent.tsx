
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PostData, StatusInfo } from "./types";
import AnimatedTabContent from "./AnimatedTabContent";
import StatusChart from "./StatusChart";
import PostItem from "./PostItem";
import TabsFilter from "./TabsFilter";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || document.dir === "rtl";
  
  // Calculate counts for each status
  const statusCounts = statuses.reduce((acc, status) => {
    // Make sure we're accessing properties that exist on the StatusInfo type
    if ('id' in status && 'value' in status) {
      acc[status.id as string] = status.value as number;
    }
    return acc;
  }, { all: totalPosts } as Record<string, number>);

  // Animation variants for content transitions
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // RTL-aware animation variants
  const itemAnimationRTL = {
    hidden: { opacity: 0, x: isRTL ? -10 : 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <Tabs defaultValue={statusFilter} className="w-full" onValueChange={onStatusFilterChange} dir={isRTL ? "rtl" : "ltr"}>
      <TabsFilter 
        statusFilter={statusFilter} 
        onStatusChange={onStatusFilterChange}
        counts={statusCounts}
      />
      
      <AnimatePresence mode="wait">
        <TabsContent value="all" className="outline-none">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {viewType === "cards" ? (
              <>
                {filteredPosts.length > 0 ? (
                  <motion.div 
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {filteredPosts.map((post, index) => (
                      <motion.div 
                        key={post.id}
                        variants={itemAnimationRTL}
                      >
                        <PostItem post={post} index={index} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="p-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-muted-foreground">لا توجد منشورات تطابق معايير البحث</p>
                  </motion.div>
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
