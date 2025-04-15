
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PendingPost {
  id: string;
  title: string;
  platform: string;
  submittedAt: string;
  priority: "high" | "medium" | "low";
}

const PendingPostsWidget = () => {
  const { t } = useTranslation();
  
  const pendingPosts: PendingPost[] = [
    {
      id: "1",
      title: "أفضل 5 منتجات للعناية بالبشرة",
      platform: "instagram",
      submittedAt: "2025-04-14T14:30:00",
      priority: "high"
    },
    {
      id: "2",
      title: "نصائح لاختيار كريم الأساس المناسب",
      platform: "facebook",
      submittedAt: "2025-04-14T10:15:00",
      priority: "medium"
    },
    {
      id: "3",
      title: "كيفية استخدام قناع الوجه بشكل صحيح",
      platform: "tiktok",
      submittedAt: "2025-04-13T16:45:00",
      priority: "low"
    }
  ];
  
  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">Instagram</Badge>;
      case "facebook":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Facebook</Badge>;
      case "tiktok":
        return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">TikTok</Badge>;
      default:
        return <Badge variant="outline">{platform}</Badge>;
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "low":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const formatSubmissionTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `منذ ${diffMins} دقيقة`;
    } else if (diffHrs < 24) {
      return `منذ ${diffHrs} ساعة`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      return `منذ ${diffDays} يوم`;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Clock className="h-5 w-5 mr-2 text-amber-500" />
          {t("dashboard.pendingPosts.title", "منشورات في انتظار المراجعة")}
          <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">{pendingPosts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingPosts.length > 0 ? (
          <div className="space-y-3">
            {pendingPosts.map((post) => (
              <div key={post.id} className="p-3 border rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(post.priority)}
                      <h4 className="font-medium">{post.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      {getPlatformBadge(post.platform)}
                      <span>•</span>
                      <span>{formatSubmissionTime(post.submittedAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          
            <Button variant="outline" size="sm" className="w-full mt-2">
              {t("dashboard.pendingPosts.viewAll", "عرض كل المنشورات")}
            </Button>
          </div>
        ) : (
          <div className="text-center p-6">
            <p className="text-muted-foreground">
              {t("dashboard.pendingPosts.empty", "لا توجد منشورات في انتظار المراجعة")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingPostsWidget;
