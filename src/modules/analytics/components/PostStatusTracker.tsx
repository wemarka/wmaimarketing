
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { usePostStatus } from "./post-tracker/hooks/usePostStatus";
import PostStatusHeader from "./post-tracker/PostStatusHeader";
import SearchFilters from "./post-tracker/SearchFilters";
import PostStatusContent from "./post-tracker/PostStatusContent";

const PostStatusTracker = () => {
  const {
    viewType,
    isLoading,
    searchQuery,
    statusFilter,
    platformFilter,
    statuses,
    totalPosts,
    filteredPosts,
    setSearchQuery,
    setStatusFilter,
    setPlatformFilter,
    handleRefresh,
    toggleViewType
  } = usePostStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <PostStatusHeader 
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onViewTypeToggle={toggleViewType}
            viewType={viewType}
          />
        </CardHeader>
        <CardContent>
          {/* استخدام مكون البحث والتصفية */}
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPlatformFilterChange={setPlatformFilter}
          />
          
          <PostStatusContent 
            viewType={viewType}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            filteredPosts={filteredPosts}
            statuses={statuses}
            totalPosts={totalPosts}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostStatusTracker;
