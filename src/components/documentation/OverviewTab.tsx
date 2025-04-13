
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const OverviewTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>نظرة عامة على المشروع</CardTitle>
        <CardDescription>
          Beauty AI هو نظام داخلي للشركة يستخدم الذكاء الاصطناعي لتعزيز عمليات التسويق وإنتاج المحتوى
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">الهدف من المشروع</h3>
          <p>
            تطوير منصة متكاملة تمكّن فريق التسويق في الشركة من إنشاء محتوى إبداعي وإدارة الحملات التسويقية بكفاءة أعلى وجودة أفضل باستخدام تقنيات الذكاء الاصطناعي.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">الميزات الرئيسية</h3>
          <ul className="list-disc list-inside space-y-1 mr-4">
            <li>إدارة المستخدمين والصلاحيات الداخلية</li>
            <li>تحليل صور المنتجات باستخدام الذكاء الاصطناعي</li>
            <li>إنشاء إعلانات وصور تسويقية</li>
            <li>توليد محتوى نصي للمنصات المختلفة</li>
            <li>إنشاء فيديوهات تسويقية قصيرة</li>
            <li>جدولة ونشر المحتوى عبر المنصات</li>
            <li>تحليلات وتقارير أداء الحملات</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">التقنيات المستخدمة</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            <div className="bg-muted rounded-md p-2 text-center">React</div>
            <div className="bg-muted rounded-md p-2 text-center">TypeScript</div>
            <div className="bg-muted rounded-md p-2 text-center">Tailwind CSS</div>
            <div className="bg-muted rounded-md p-2 text-center">Shadcn UI</div>
            <div className="bg-muted rounded-md p-2 text-center">Supabase</div>
            <div className="bg-muted rounded-md p-2 text-center">واجهات الذكاء الاصطناعي</div>
            <div className="bg-muted rounded-md p-2 text-center">React Query</div>
            <div className="bg-muted rounded-md p-2 text-center">React Router</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
