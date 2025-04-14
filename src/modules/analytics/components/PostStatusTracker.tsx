
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, AlertCircle, XCircle, LoaderCircle } from "lucide-react";

const PostStatusTracker = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>حالة المنشورات</CardTitle>
        <Button variant="ghost" size="sm">عرض الكل</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-900">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
              <div>
                <p className="font-medium">تم نشر 12 منشوراً</p>
                <p className="text-sm text-muted-foreground">تم النشر خلال آخر 7 أيام</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">التفاصيل</Button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-900">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              <div>
                <p className="font-medium">8 منشورات مجدولة</p>
                <p className="text-sm text-muted-foreground">سيتم نشرها خلال الأسبوع القادم</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">التفاصيل</Button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-900">
            <div className="flex items-center gap-3">
              <LoaderCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <div>
                <p className="font-medium">5 منشورات في انتظار المراجعة</p>
                <p className="text-sm text-muted-foreground">بانتظار الاعتماد النهائي</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">التفاصيل</Button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-900">
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
              <div>
                <p className="font-medium">2 منشورات مرفوضة</p>
                <p className="text-sm text-muted-foreground">تم رفضها بواسطة المراجع</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">التفاصيل</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostStatusTracker;
