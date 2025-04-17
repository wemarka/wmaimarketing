
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import UpcomingPostItem, { UpcomingPostItemProps } from './UpcomingPostItem';

interface UpcomingPostsProps {
  posts: UpcomingPostItemProps[];
}

const UpcomingPosts = ({ posts }: UpcomingPostsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-beauty-purple" />
          المنشورات القادمة
        </CardTitle>
        <CardDescription>آخر المنشورات المجدولة للنشر</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {posts.map((post, index) => (
            <UpcomingPostItem
              key={index}
              title={post.title}
              platform={post.platform}
              date={post.date}
              time={post.time}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
