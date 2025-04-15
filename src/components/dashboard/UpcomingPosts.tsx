
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUpcomingPosts } from "@/hooks/useUpcomingPosts";

// Import sub-components
import PostsHeader from "./upcoming-posts/PostsHeader";
import PostItem from "./upcoming-posts/PostItem";
import LoadingPosts from "./upcoming-posts/LoadingPosts";
import EmptyPostsPlaceholder from "./upcoming-posts/EmptyPostsPlaceholder";

const UpcomingPosts = () => {
  const [viewMode, setViewMode] = useState<"list" | "compact">("list");
  const { posts, loading, handleEdit, handleDelete } = useUpcomingPosts();

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
                onEdit={handleEdit}
                onDelete={handleDelete}
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

export default UpcomingPosts;
