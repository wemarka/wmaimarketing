
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Image, FileText, Video, Calendar, 
  UserCheck, LogIn, LogOut, UserCog, 
  FileEdit, Activity, Badge
} from "lucide-react";
import { useActivityLog, Activity as ActivityType } from "@/hooks/useActivityLog";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
        return <Badge className="h-4 w-4" />;
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
      id: "1",
      type: "image",
      description: "تم إنشاء صورة إعلانية جديدة لمنتج كريم الأساس",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: "2",
      type: "content_create",
      description: "تم إنشاء محتوى لمنشور جديد حول أحمر الشفاه الجديد",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    },
    {
      id: "3",
      type: "video",
      description: "تم إنشاء فيديو ترويجي للمجموعة الجديدة من العطور",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "4",
      type: "schedule",
      description: "تمت جدولة 3 منشورات جديدة على انستجرام للأسبوع القادم",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "5",
      type: "login",
      description: "تم تسجيل الدخول إلى النظام من جهاز جديد",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
  ];

  const displayActivities = activities.length > 0 ? activities.slice(0, 5) : defaultActivities;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">النشاطات الأخيرة</CardTitle>
          <div className="bg-muted text-muted-foreground text-xs py-1 px-2 rounded-full">
            {displayActivities.length} نشاط
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 overflow-hidden">
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
            {displayActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
