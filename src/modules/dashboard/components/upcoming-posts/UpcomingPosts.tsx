
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useUpcomingPosts } from '@/hooks/useUpcomingPosts';
import PostsHeader from '@/components/dashboard/upcoming-posts/PostsHeader';
import PostItem from '@/components/dashboard/upcoming-posts/PostItem';
import EmptyPostsPlaceholder from '@/components/dashboard/upcoming-posts/EmptyPostsPlaceholder';
import LoadingPosts from '@/components/dashboard/upcoming-posts/LoadingPosts';
import { Badge } from '@/components/ui/badge';
import { CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';

const UpcomingPosts = () => {
  const { posts, loading, error } = useUpcomingPosts();
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
          loading={loading}
          postsCount={posts.length}
          viewMode={viewMode}
          onToggleView={() => setViewMode(viewMode === "list" ? "compact" : "list")}
        />
      </CardHeader>
      <CardContent>
        {loading ? (
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
                  <PostItem post={post} index={index} />
                ) : (
                  <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={post.status === 'scheduled' ? 'outline' : 'default'} className="px-2 py-0.5">
                        {post.status === 'scheduled' ? (
                          <div className="flex items-center gap-1">
                            <CalendarClock className="h-3 w-3" />
                            <span>مجدول</span>
                          </div>
                        ) : post.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{post.scheduledDate}</div>
                    </div>
                    <h4 className="font-medium mb-1 truncate">{post.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                    {post.platforms && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.platforms.map(platform => (
                          <Badge key={platform} variant="secondary" className="px-1.5 py-0 text-xs">
                            {platform}
                          </Badge>
                        ))}
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
