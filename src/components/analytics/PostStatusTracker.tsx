
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostStatus } from "../scheduler/types";
import { ArrowRight, CheckCircle, Clock, Edit, HourglassIcon } from "lucide-react";

// بيانات توضيحية
const postStatusData: PostStatus = {
  scheduled: 23,
  published: 48,
  pending: 12,
  draft: 15
};

const PostStatusTracker: React.FC = () => {
  const total = Object.values(postStatusData).reduce((sum, value) => sum + value, 0);
  
  const getPercentage = (value: number): string => {
    return `${Math.round((value / total) * 100)}%`;
  };
  
  const getStatusColor = (status: keyof PostStatus): string => {
    switch (status) {
      case "scheduled": return "bg-blue-500";
      case "published": return "bg-green-500";
      case "pending": return "bg-amber-500";
      case "draft": return "bg-slate-400";
      default: return "bg-gray-300";
    }
  };
  
  const getStatusIcon = (status: keyof PostStatus) => {
    switch (status) {
      case "scheduled": return <Clock className="h-5 w-5" />;
      case "published": return <CheckCircle className="h-5 w-5" />;
      case "pending": return <HourglassIcon className="h-5 w-5" />;
      case "draft": return <Edit className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>متابعة حالة المنشورات</CardTitle>
        <CardDescription>توزيع المنشورات حسب حالتها الحالية</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* مؤشر تقدم رسومي */}
          <div className="w-full h-3 bg-muted rounded-full flex overflow-hidden">
            {(Object.keys(postStatusData) as Array<keyof PostStatus>).map((status) => (
              <div 
                key={status} 
                className={`h-full ${getStatusColor(status)}`} 
                style={{ width: getPercentage(postStatusData[status]) }} 
              />
            ))}
          </div>
          
          {/* تفاصيل الحالات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(postStatusData) as Array<keyof PostStatus>).map((status) => (
              <div key={status} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${status === "scheduled" ? "bg-blue-100 text-blue-600" : 
                                        status === "published" ? "bg-green-100 text-green-600" : 
                                        status === "pending" ? "bg-amber-100 text-amber-600" : 
                                        "bg-slate-100 text-slate-600"}`}>
                    {getStatusIcon(status)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {status === "scheduled" ? "مجدولة" : 
                       status === "published" ? "منشورة" : 
                       status === "pending" ? "قيد الانتظار" : 
                       "مسودة"}
                    </p>
                    <p className="text-sm text-muted-foreground">{getPercentage(postStatusData[status])} من إجمالي المنشورات</p>
                  </div>
                </div>
                <div className="text-2xl font-semibold">{postStatusData[status]}</div>
              </div>
            ))}
          </div>
          
          {/* إحصائيات إضافية */}
          <div className="flex justify-between items-center p-4 bg-muted rounded-md">
            <div className="text-sm">
              <p className="text-muted-foreground">إجمالي المنشورات</p>
              <p className="text-xl font-semibold">{total}</p>
            </div>
            <ArrowRight className="text-muted-foreground" />
            <div className="text-sm">
              <p className="text-muted-foreground">نسبة الاكتمال</p>
              <p className="text-xl font-semibold">{getPercentage(postStatusData.published)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostStatusTracker;
