
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NextStepCard from "./NextStepCard";

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">مقدمة عن المشروع</h2>
          <p className="mb-4">
            يهدف نظام إدارة التسويق والمحتوى للعلامة التجارية إلى تبسيط وأتمتة عمليات إنشاء وجدولة ونشر المحتوى التسويقي للعلامات التجارية في مجال منتجات العناية والتجميل. يوفر النظام مجموعة متكاملة من الأدوات لإدارة المحتوى وتحليل أدائه وتحسين الإعلانات عبر منصات التواصل الاجتماعي المختلفة.
          </p>
          <p>
            تم تصميم النظام ليكون مرنًا وقابلًا للتخصيص، مما يتيح للعلامات التجارية تكييفه وفقًا لاحتياجاتهم الخاصة. يعتمد النظام على تقنيات الذكاء الاصطناعي لتحسين المحتوى وإنشاء الصور وتحليل البيانات، مما يساعد العلامات التجارية على تحقيق نتائج أفضل في استراتيجياتهم التسويقية.
          </p>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">ميزات رئيسية</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">إدارة المحتوى</h3>
              <p className="text-sm text-muted-foreground">
                أدوات متقدمة لإنشاء وتنظيم وتخزين المحتوى النصي والبصري للعلامة التجارية.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">جدولة النشر</h3>
              <p className="text-sm text-muted-foreground">
                نظام جدولة مرن لنشر المحتوى على منصات متعددة في الأوقات المناسبة للجمهور المستهدف.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">إدارة الإعلانات</h3>
              <p className="text-sm text-muted-foreground">
                إنشاء وإدارة الحملات الإعلانية بكفاءة عبر مختلف المنصات الرقمية.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">تحليلات الأداء</h3>
              <p className="text-sm text-muted-foreground">
                تقارير وتحليلات مفصلة لقياس أداء المحتوى والإعلانات واتخاذ قرارات مدروسة.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">الخطوات التالية</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <NextStepCard 
            title="دمج منصات إضافية" 
            description="توسيع النظام ليشمل منصات تواصل اجتماعي وقنوات تسويق إضافية" 
          />
          <NextStepCard 
            title="تطوير ميزات الذكاء الاصطناعي" 
            description="تحسين قدرات التحليل والتوصيات المستندة إلى الذكاء الاصطناعي" 
          />
          <NextStepCard 
            title="تخصيص واجهة المستخدم" 
            description="إضافة المزيد من خيارات التخصيص لتلبية احتياجات العملاء المختلفة" 
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
