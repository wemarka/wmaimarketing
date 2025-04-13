
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowRight, Calendar, MessageSquare, CheckCircle2 } from "lucide-react";

const NextStepCard: React.FC = () => {
  return (
    <Card className="mb-8 border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span>الخطوة التالية</span>
          <ArrowRight className="h-5 w-5 text-amber-600" />
        </CardTitle>
        <CardDescription>
          بدء تنفيذ المرحلة الخامسة من المشروع: نظام الجدولة والنشر
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            المرحلة التالية في خطة التطوير ستركز على نظام الجدولة والنشر لمنصة Beauty AI. سيتم إنشاء:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Calendar className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">تقويم تسويقي</h4>
                <p className="text-sm text-muted-foreground">جدولة الحملات والمنشورات لوسائل التواصل المختلفة</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <MessageSquare className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">سير عمل الموافقات</h4>
                <p className="text-sm text-muted-foreground">نظام مراجعة وموافقة للمحتوى قبل النشر</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">متابعة المنشورات</h4>
                <p className="text-sm text-muted-foreground">تتبع حالة المنشورات وإجراءات النشر</p>
              </div>
            </div>
          </div>
          <p>
            هذه المرحلة ستضيف القدرة على تنظيم وجدولة المحتوى الذي تم إنشاؤه بواسطة أدوات إنتاج المحتوى التي تم تطويرها في المراحل السابقة.
          </p>
          <div className="bg-white p-3 rounded-lg border border-amber-100 mt-4">
            <h4 className="font-medium mb-2">الموعد المستهدف للإنجاز</h4>
            <div className="flex justify-between text-sm">
              <span>تاريخ البدء: ٢٥ مايو ٢٠٢٥</span>
              <span>تاريخ الانتهاء المتوقع: ١٥ يونيو ٢٠٢٥</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepCard;
