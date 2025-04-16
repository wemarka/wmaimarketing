
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
    if ('id' in status && 'value' in status) {
      acc[status.id as string] = status.value as number;
    } else if ('count' in status) {
      const statusId = status.label?.toLowerCase().includes('نشر') ? 'published' : 
                      status.label?.toLowerCase().includes('مجدول') ? 'scheduled' :
                      status.label?.toLowerCase().includes('انتظار') ? 'pending' :
                      status.label?.toLowerCase().includes('مرفوض') ? 'rejected' : 'all';
      acc[statusId] = status.count;
    }
    return acc;
  }, { all: totalPosts } as Record<string, number>);

  // Animation variants for content transitions
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.3 
      } 
    }
  };

  // RTL-aware animation variants
  const itemAnimationRTL = {
    hidden: { opacity: 0, x: isRTL ? -15 : 15 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4 
      } 
    }
  };
  
  // Container animation with staggered children
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      } 
    }
  };

  return (
    <Tabs 
      defaultValue={statusFilter} 
      className="w-full" 
      onValueChange={onStatusFilterChange} 
      dir={isRTL ? "rtl" : "ltr"}
    >
      <TabsFilter 
        statusFilter={statusFilter} 
        onStatusChange={onStatusFilterChange}
        counts={statusCounts}
      />
      
      <AnimatePresence mode="sync">
        {statusFilter === "all" && (
          <TabsContent value="all" className="outline-none mt-6">
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="all-content"
            >
              {viewType === "cards" ? (
                <>
                  {filteredPosts.length > 0 ? (
                    <motion.div 
                      className="space-y-4"
                      variants={containerAnimation}
                      initial="hidden"
                      animate="visible"
                    >
                      {filteredPosts.map((post, index) => (
                        <motion.div 
                          key={post.id}
                          variants={itemAnimationRTL}
                          custom={index}
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
        )}
        
        {statusFilter === "published" && (
          <TabsContent key="published" value="published" className="mt-6">
            <AnimatedTabContent status="published" posts={filteredPosts} />
          </TabsContent>
        )}
        
        {statusFilter === "scheduled" && (
          <TabsContent key="scheduled" value="scheduled" className="mt-6">
            <AnimatedTabContent status="scheduled" posts={filteredPosts} />
          </TabsContent>
        )}
        
        {statusFilter === "pending" && (
          <TabsContent key="pending" value="pending" className="mt-6">
            <AnimatedTabContent status="pending" posts={filteredPosts} />
          </TabsContent>
        )}
        
        {statusFilter === "rejected" && (
          <TabsContent key="rejected" value="rejected" className="mt-6">
            <AnimatedTabContent status="rejected" posts={filteredPosts} />
          </TabsContent>
        )}
      </AnimatePresence>
    </Tabs>
  );
};

export default PostStatusContent;
