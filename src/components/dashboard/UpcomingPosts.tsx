
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Facebook, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = {
  instagram: {
    icon: <Instagram className="h-4 w-4" />,
    color: "bg-pink-100 text-pink-600",
  },
  facebook: {
    icon: <Facebook className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-600", 
  },
};

const posts = [
  {
    id: 1,
    title: "Summer makeup collection",
    platform: "instagram",
    date: "Tomorrow, 10:00 AM",
  },
  {
    id: 2,
    title: "New lipstick shades",
    platform: "facebook",
    date: "Tomorrow, 2:30 PM",
  },
  {
    id: 3,
    title: "Skincare routine video",
    platform: "instagram",
    date: "Jul 15, 9:00 AM",
  },
];

const UpcomingPosts = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Upcoming Posts</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-3 text-sm"
            >
              <div className={cn("p-2 rounded-full", 
                platforms[post.platform as keyof typeof platforms].color
              )}>
                {platforms[post.platform as keyof typeof platforms].icon}
              </div>
              <div className="flex-1">
                <p className="font-medium">{post.title}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <CalendarCheck className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;
