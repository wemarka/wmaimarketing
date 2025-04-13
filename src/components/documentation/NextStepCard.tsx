
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowRight, Users, Shield, Activity } from "lucide-react";

const NextStepCard: React.FC = () => {
  return (
    <Card className="mb-8 border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <span>الخطوة التالية</span>
          <ArrowRight className="h-5 w-5 text-amber-600" />
        </CardTitle>
        <CardDescription>
          بدء تنفيذ المرحلة الثانية من المشروع: إدارة المستخدمين والصلاحيات
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            المرحلة التالية في خطة التطوير ستركز على إدارة المستخدمين والصلاحيات داخل نظام Beauty AI. سيتم إنشاء:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Users className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">إدارة الملفات الشخصية</h4>
                <p className="text-sm text-muted-foreground">صفحات الملف الشخصي مع القدرة على تحديث البيانات</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Shield className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">نظام الصلاحيات</h4>
                <p className="text-sm text-muted-foreground">أدوار مختلفة (مدير، مسؤول تسويق، مصمم)</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <Activity className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">سجل النشاط</h4>
                <p className="text-sm text-muted-foreground">تتبع نشاط المستخدمين وإجراءاتهم</p>
              </div>
            </div>
          </div>
          <p>
            هذه الخطوة ستضع الأساس لباقي ميزات النظام من خلال تحديد من يمكنه الوصول إلى أي جزء من التطبيق، مما سيسمح بتنظيم سير العمل بشكل أفضل.
          </p>
          <div className="bg-white p-3 rounded-lg border border-amber-100 mt-4">
            <h4 className="font-medium mb-2">الموعد المستهدف للإنجاز</h4>
            <div className="flex justify-between text-sm">
              <span>تاريخ البدء: ١٥ أبريل ٢٠٢٥</span>
              <span>تاريخ الانتهاء المتوقع: ٣٠ أبريل ٢٠٢٥</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepCard;
