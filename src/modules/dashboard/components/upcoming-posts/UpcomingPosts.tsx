
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useUpcomingPosts, formatDate } from '@/hooks/useUpcomingPosts';
import PostsHeader from '@/components/dashboard/upcoming-posts/PostsHeader';
import PostItem from '@/components/dashboard/upcoming-posts/PostItem';
import EmptyPostsPlaceholder from '@/components/dashboard/upcoming-posts/EmptyPostsPlaceholder';
import LoadingPosts from '@/components/dashboard/upcoming-posts/LoadingPosts';
import { Badge } from '@/components/ui/badge';
import { CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';

const UpcomingPosts = () => {
  const { posts, loading: isLoading, handleEdit, handleDelete } = useUpcomingPosts();
  const [viewMode, setViewMode] = useState<"list" | "compact">("compact");

  // Animation variants for the posts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <PostsHeader 
          loading={isLoading}
          postsCount={posts.length}
          viewMode={viewMode}
          onToggleView={() => setViewMode(viewMode === "list" ? "compact" : "list")}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingPosts />
        ) : posts.length > 0 ? (
          <motion.div 
            className={viewMode === "compact" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                {viewMode === "list" ? (
                  <PostItem 
                    post={post} 
                    index={index}
                    viewMode={viewMode}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ) : (
                  <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="px-2 py-0.5">
                        <div className="flex items-center gap-1">
                          <CalendarClock className="h-3 w-3" />
                          <span>مجدول</span>
                        </div>
                      </Badge>
                      <div className="text-xs text-muted-foreground">{formatDate(post.scheduled_at)}</div>
                    </div>
                    <h4 className="font-medium mb-1 truncate">{post.title}</h4>
                    {post.platform && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="secondary" className="px-1.5 py-0 text-xs">
                          {post.platform}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyPostsPlaceholder />
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
