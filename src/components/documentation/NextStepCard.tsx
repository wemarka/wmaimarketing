
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowRight, Globe, PaintBucket, BarChart } from "lucide-react";

const NextStepCard: React.FC = () => {
  return (
    <Card className="mb-8 border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span>الخطوات النهائية</span>
          <ArrowRight className="h-5 w-5 text-amber-600" />
        </CardTitle>
        <CardDescription>
          استكمال المرحلة السابعة: التكامل والتوسع
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            نحن في المراحل النهائية لتطوير منصة Beauty AI. للإنتهاء من المرحلة السابعة، سنركز على:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Globe className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">دعم متعدد اللغات</h4>
                <p className="text-sm text-muted-foreground">إضافة دعم للغات متعددة لتوسيع نطاق استخدام المنصة في أسواق مختلفة</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <PaintBucket className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">تخصيص واجهة المستخدم</h4>
                <p className="text-sm text-muted-foreground">تمكين تخصيص واجهة المستخدم حسب هوية العلامة التجارية للعميل</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <BarChart className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">استيراد/تصدير البيانات</h4>
                <p className="text-sm text-muted-foreground">تطوير واجهة لاستيراد وتصدير البيانات من وإلى أنظمة الشركة المختلفة</p>
              </div>
            </div>
          </div>
          <p>
            هذه التحسينات ستمكن المنصة من التكامل بشكل أفضل مع البنية التحتية التقنية للشركة وتوسيع نطاق استخدامها في أسواق مختلفة.
          </p>
          <div className="bg-white p-3 rounded-lg border border-amber-100 mt-4">
            <h4 className="font-medium mb-2">الموعد المستهدف للإطلاق النهائي</h4>
            <div className="flex justify-between text-sm">
              <span>تاريخ الإنتهاء المتوقع: ٣٠ يونيو ٢٠٢٥</span>
              <span>موعد الإطلاق: ١٥ يوليو ٢٠٢٥</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepCard;
