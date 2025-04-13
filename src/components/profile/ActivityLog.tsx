
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, FileEdit, LogIn, LogOut, User, UserCog, FileText, Image, Video } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "login" | "logout" | "profile_update" | "password_change" | "role_change" | "content_create" | "content_edit";
  description: string;
  timestamp: string;
}

interface ActivityLogProps {
  activities: ActivityItem[];
  isLoading: boolean;
}

const ActivityLog = ({ activities, isLoading }: ActivityLogProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return <LogIn className="h-4 w-4" />;
      case "logout":
        return <LogOut className="h-4 w-4" />;
      case "profile_update":
        return <FileEdit className="h-4 w-4" />;
      case "password_change":
        return <UserCog className="h-4 w-4" />;
      case "role_change":
        return <User className="h-4 w-4" />;
      case "content_create":
        return <FileText className="h-4 w-4" />;
      case "content_edit":
        return <FileEdit className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "login":
        return "bg-green-50 text-green-700 border-green-200";
      case "logout":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "profile_update":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "password_change":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "role_change":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "content_create":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "content_edit":
        return "bg-cyan-50 text-cyan-700 border-cyan-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "login":
        return "تسجيل دخول";
      case "logout":
        return "تسجيل خروج";
      case "profile_update":
        return "تحديث الملف";
      case "password_change":
        return "تغيير كلمة المرور";
      case "role_change":
        return "تغيير الصلاحيات";
      case "content_create":
        return "إنشاء محتوى";
      case "content_edit":
        return "تحرير محتوى";
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>سجل النشاط</CardTitle>
        <CardDescription>
          آخر الأنشطة التي قمت بها على حسابك
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-4">جاري التحميل...</div>
        ) : activities.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">
            لا يوجد أنشطة مسجلة بعد
          </div>
        ) : (
          <ScrollArea className="h-64 w-full pr-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 space-x-reverse">
                  <div className={`flex-shrink-0 rounded-full p-2 ${getActivityBadgeColor(activity.type).split(" ").slice(0, 1).join(" ")}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <Badge variant="outline" className={getActivityBadgeColor(activity.type)}>
                        {getActivityLabel(activity.type)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString("ar-SA")}
                      </span>
                    </div>
                    <p className="text-sm">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
