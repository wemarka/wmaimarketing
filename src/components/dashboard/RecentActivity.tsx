
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, FileText, Video, Calendar } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "image",
    title: "Generated ad image",
    time: "2 hours ago",
    icon: <Image className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "content",
    title: "Created caption for lipstick post",
    time: "5 hours ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "video",
    title: "Generated promo video",
    time: "Yesterday",
    icon: <Video className="h-4 w-4" />,
  },
  {
    id: 4,
    type: "schedule",
    title: "Scheduled 3 Instagram posts",
    time: "2 days ago",
    icon: <Calendar className="h-4 w-4" />,
  },
];

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 text-sm"
            >
              <div className="bg-muted p-2 rounded-full">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
