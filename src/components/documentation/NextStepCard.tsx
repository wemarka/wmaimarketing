
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const NextStepCard: React.FC = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>الخطوة التالية</CardTitle>
        <CardDescription>
          بدء تنفيذ المرحلة الثانية من المشروع
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            المرحلة التالية في خطة التطوير ستركز على إدارة المستخدمين والصلاحيات داخل نظام Beauty AI. سيتم إنشاء:
          </p>
          <ul className="list-disc list-inside space-y-1 mr-4">
            <li>صفحة الملف الشخصي للمستخدم مع القدرة على تحديث البيانات الشخصية</li>
            <li>نظام للأدوار والصلاحيات المختلفة (مدير، مسؤول تسويق، مصمم محتوى)</li>
            <li>لوحة تحكم للمدير لإدارة حسابات الموظفين</li>
            <li>نظام لتتبع نشاط المستخدمين داخل المنصة</li>
          </ul>
          <p>
            هذه الخطوة ستضع الأساس لباقي ميزات النظام من خلال تحديد من يمكنه الوصول إلى أي جزء من التطبيق، مما سيسمح بتنظيم سير العمل بشكل أفضل.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepCard;
