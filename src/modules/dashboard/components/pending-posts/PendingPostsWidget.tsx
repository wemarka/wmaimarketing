
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePendingPosts } from "@/hooks/usePendingPosts";
import PostsHeader from "./PostsHeader";
import PostItem from "./PostItem";
import LoadingPosts from "./LoadingPosts";
import EmptyPostsPlaceholder from "./EmptyPostsPlaceholder";

const PendingPostsWidget = () => {
  const [viewMode, setViewMode] = useState<"list" | "compact">("list");
  const { posts, loading, handleApprove, handleReject } = usePendingPosts();

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "compact" : "list");
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <PostsHeader 
          loading={loading} 
          postsCount={posts.length} 
          viewMode={viewMode}
          onToggleView={toggleViewMode}
        />
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <LoadingPosts />
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <PostItem 
                key={post.id}
                post={post}
                index={index}
                viewMode={viewMode}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        ) : (
          <EmptyPostsPlaceholder />
        )}
      </CardContent>
    </Card>
  );
};

export default PendingPostsWidget;
