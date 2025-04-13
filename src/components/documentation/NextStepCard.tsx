
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowRight, Image, Palette, Library } from "lucide-react";

const NextStepCard: React.FC = () => {
  return (
    <Card className="mb-8 border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span>الخطوة التالية</span>
          <ArrowRight className="h-5 w-5 text-amber-600" />
        </CardTitle>
        <CardDescription>
          بدء تنفيذ المرحلة الثالثة من المشروع: أدوات إنتاج المحتوى الأساسية
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            المرحلة الحالية في خطة التطوير تركز على أدوات إنتاج المحتوى الأساسية لنظام Beauty AI. سيتم إنشاء:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Image className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">تنظيم وتصنيف الصور</h4>
                <p className="text-sm text-muted-foreground">نظام متكامل لتنظيم صور المنتجات وتصنيفها</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Palette className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">تحليل الصور</h4>
                <p className="text-sm text-muted-foreground">تحليل تلقائي للألوان والزوايا والتفاصيل</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Library className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">مكتبة الأصول</h4>
                <p className="text-sm text-muted-foreground">مكتبة مركزية للأصول البصرية للشركة</p>
              </div>
            </div>
          </div>
          <p>
            هذه المرحلة ستضع الأساس لنظام إنتاج المحتوى الذي سيساعد فريق التسويق في إنشاء محتوى إبداعي وجذاب للمنتجات.
          </p>
          <div className="bg-white p-3 rounded-lg border border-amber-100 mt-4">
            <h4 className="font-medium mb-2">الموعد المستهدف للإنجاز</h4>
            <div className="flex justify-between text-sm">
              <span>تاريخ البدء: ١ مايو ٢٠٢٥</span>
              <span>تاريخ الانتهاء المتوقع: ٢٢ مايو ٢٠٢٥</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepCard;
