
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { usePostStatus } from "./post-tracker/hooks/usePostStatus";
import PostStatusHeader from "./post-tracker/PostStatusHeader";
import SearchFilters from "./post-tracker/SearchFilters";
import PostStatusContent from "./post-tracker/PostStatusContent";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw } from "lucide-react";

const PostStatusTracker = () => {
  const {
    viewType,
    isLoading,
    searchQuery,
    statusFilter,
    platformFilter,
    dateFilter,
    statuses,
    totalPosts,
    filteredPosts,
    setSearchQuery,
    setStatusFilter,
    setPlatformFilter,
    setDateFilter,
    handleRefresh,
    toggleViewType
  } = usePostStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-muted">
        <CardHeader className="pb-0">
          <PostStatusHeader 
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onViewTypeToggle={toggleViewType}
            viewType={viewType}
            totalPosts={totalPosts}
          />
        </CardHeader>
        <CardContent>
          {/* عرض تنبيه إذا كان هناك تحديث */}
          {new Date().getDate() === 14 && (
            <Alert variant="default" className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
              <AlertDescription className="text-sm">
                تم إضافة 2 منشورات جديدة اليوم. قم بالتحديث لعرض البيانات الأحدث.
              </AlertDescription>
            </Alert>
          )}
          
          {/* استخدام مكون البحث والتصفية المحدث */}
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPlatformFilterChange={setPlatformFilter}
            onDateFilterChange={setDateFilter}
          />
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <PostStatusContent 
              viewType={viewType}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              filteredPosts={filteredPosts}
              statuses={statuses}
              totalPosts={totalPosts}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostStatusTracker;
