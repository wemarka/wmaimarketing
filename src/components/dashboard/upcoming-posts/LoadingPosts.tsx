
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPosts = () => {
  return (
    <div className="space-y-4">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
          <Skeleton className="h-12 w-12 rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingPosts;
