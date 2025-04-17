
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePendingPosts } from "@/hooks/usePendingPosts";
import PostsHeader from "./PostsHeader";
import PostItem from "./PostItem";
import LoadingPosts from "./LoadingPosts";
import EmptyPostsPlaceholder from "./EmptyPostsPlaceholder";

const PendingPostsWidget = () => {
  const [viewMode, setViewMode] = useState<"list" | "compact">("list");
  const { posts, isLoading, approvePost, rejectPost } = usePendingPosts();

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "compact" : "list");
  };

  // Create adapter functions for component props
  const handleApprove = (id: string) => approvePost(id);
  const handleReject = (id: string) => rejectPost(id);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <PostsHeader 
          loading={isLoading} 
          postsCount={posts.length} 
          viewMode={viewMode}
          onToggleView={toggleViewMode}
        />
      </CardHeader>
      <CardContent className="px-6">
        {isLoading ? (
          <LoadingPosts />
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post, index) => {
              // Map PendingPost to Post format expected by PostItem
              const adaptedPost = {
                id: post.id,
                title: post.title,
                content: post.content,
                platform: post.platform as "instagram" | "facebook" | "tiktok",
                createdAt: post.created_at,
                author: {
                  name: post.profile?.first_name || 'Unknown User',
                  avatar: post.profile?.avatar_url || undefined
                }
              };
              
              return (
                <PostItem 
                  key={post.id}
                  post={adaptedPost}
                  index={index}
                  viewMode={viewMode}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              );
            })}
          </div>
        ) : (
          <EmptyPostsPlaceholder />
        )}
      </CardContent>
    </Card>
  );
};

export default PendingPostsWidget;
