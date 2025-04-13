
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Image, FileText, Video, Calendar, 
  UserCheck, LogIn, LogOut, UserCog, 
  FileEdit, Activity 
} from "lucide-react";
import { useActivityLog } from "@/hooks/useActivityLog";
import { Skeleton } from "@/components/ui/skeleton";

const RecentActivity = () => {
  const { activities, loading } = useActivityLog();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return <LogIn className="h-4 w-4" />;
      case "logout":
        return <LogOut className="h-4 w-4" />;
      case "profile_update":
        return <UserCheck className="h-4 w-4" />;
      case "password_change":
        return <UserCog className="h-4 w-4" />;
      case "role_change":
        return <UserCog className="h-4 w-4" />;
      case "content_create":
        return <FileText className="h-4 w-4" />;
      case "content_edit":
        return <FileEdit className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "schedule":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - activityTime.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "الآن";
    if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
    if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
    if (diffInSeconds < 604800) return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;
    
    return activityTime.toLocaleDateString("ar-SA");
  };

  // Default activities to show if there are no database activities
  const defaultActivities = [
    {
      id: 1,
      type: "image",
      title: "تم إنشاء صورة إعلانية",
      time: "منذ ساعتين",
      icon: <Image className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "content",
      title: "تم إنشاء محتوى لمنشور أحمر الشفاه",
      time: "منذ 5 ساعات",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "video",
      title: "تم إنشاء فيديو ترويجي",
      time: "أمس",
      icon: <Video className="h-4 w-4" />,
    },
    {
      id: 4,
      type: "schedule",
      title: "تمت جدولة 3 منشورات على انستجرام",
      time: "منذ يومين",
      icon: <Calendar className="h-4 w-4" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">النشاطات الأخيرة</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.length > 0 ? activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 text-sm"
              >
                <div className="bg-muted p-2 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            )) : (
              defaultActivities.map((activity) => (
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
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
