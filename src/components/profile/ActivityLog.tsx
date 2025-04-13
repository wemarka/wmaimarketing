
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, FileEdit, LogIn, LogOut, User, UserCog, FileText, Loader2, Filter } from "lucide-react";
import { Activity } from "@/hooks/useActivityLog";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ActivityLogProps {
  activities: Activity[];
  isLoading: boolean;
}

const ActivityLog = ({ activities, isLoading }: ActivityLogProps) => {
  const [filter, setFilter] = useState<string | null>(null);

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

  const filteredActivities = filter 
    ? activities.filter(activity => activity.type === filter) 
    : activities;

  const activityTypes = [...new Set(activities.map(a => a.type))];

  return (
    <Card className="overflow-hidden border-2 border-border/30 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-card/50 backdrop-blur-sm flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              سجل النشاط
            </CardTitle>
            <CardDescription>
              آخر الأنشطة التي قمت بها على حسابك
            </CardDescription>
          </div>
        </div>
        
        {activities.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                {filter ? getActivityLabel(filter) : "تصفية"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter(null)}>
                عرض الكل
              </DropdownMenuItem>
              {activityTypes.map(type => (
                <DropdownMenuItem key={type} onClick={() => setFilter(type)}>
                  {getActivityLabel(type)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4 space-x-reverse rtl:space-x-reverse">
                <Skeleton className="flex-shrink-0 rounded-full w-10 h-10" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredActivities.length === 0 ? (
          <motion.div 
            className="text-center p-10 text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Clock className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-lg">لا يوجد أنشطة {filter ? `من نوع "${getActivityLabel(filter)}"` : "مسجلة بعد"}</p>
            <p className="text-sm mt-2">ستظهر هنا الأنشطة التي تقوم بها على حسابك</p>
          </motion.div>
        ) : (
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-0.5 p-6">
              <AnimatePresence>
                {filteredActivities.map((activity, index) => (
                  <motion.div 
                    key={activity.id} 
                    className="flex items-start space-x-4 space-x-reverse rtl:space-x-reverse p-3 rounded-lg hover:bg-muted/30 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.01, backgroundColor: "rgba(0,0,0,0.03)" }}
                  >
                    <div className={`flex-shrink-0 rounded-full p-3 ${getActivityBadgeColor(activity.type).split(" ").slice(0, 1).join(" ")}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={getActivityBadgeColor(activity.type)}>
                          {getActivityLabel(activity.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString("ar-SA")}
                        </span>
                      </div>
                      <p className="text-sm">{activity.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
