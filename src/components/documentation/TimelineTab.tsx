
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import TimelineItem from "./TimelineItem";

const TimelineTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الجدول الزمني المقترح للتنفيذ</CardTitle>
        <CardDescription>
          التقدير الزمني لإنجاز كل مرحلة من مراحل المشروع
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TimelineItem 
            phase="المرحلة الأولى: تأسيس المشروع والهيكلة الأساسية" 
            duration="مكتملة" 
            status="complete"
            description="تم إنشاء هيكل المشروع الأساسي، وتكامل واجهة المستخدم، وإعداد نظام المصادقة للمستخدمين" 
          />
          <TimelineItem 
            phase="المرحلة الثانية: إدارة المستخدمين والصلاحيات الداخلية" 
            duration="1-2 أسابيع" 
            status="in-progress"
            description="تطوير نظام إدارة المستخدمين، وإعداد صلاحيات الوصول للأدوار المختلفة، وتتبع نشاط المستخدمين" 
          />
          <TimelineItem 
            phase="المرحلة الثالثة: أدوات إنتاج المحتوى الأساسية" 
            duration="2-3 أسابيع" 
            status="planned"
            description="تطوير واجهات لتحليل وتنظيم الصور، إنشاء إعلانات، وإدارة الأصول البصرية" 
          />
          <TimelineItem 
            phase="المرحلة الرابعة: أدوات إنتاج المحتوى المتقدمة" 
            duration="2-3 أسابيع" 
            status="planned"
            description="تطوير أدوات لإنشاء النصوص التسويقية، إدارة قاموس المصطلحات، وتحويل الصور إلى فيديوهات" 
          />
          <TimelineItem 
            phase="المرحلة الخامسة: نظام الجدولة والنشر" 
            duration="2 أسابيع" 
            status="planned"
            description="تطوير نظام تقويم تسويقي، سير عمل للموافقات، وربط مع حسابات وسائل التواصل" 
          />
          <TimelineItem 
            phase="المرحلة السادسة: التحليلات والتقارير الداخلية" 
            duration="1-2 أسابيع" 
            status="planned"
            description="تطوير نظام لتتبع أداء الحملات، مؤشرات الأداء، وتوليد التقارير الدورية" 
          />
          <TimelineItem 
            phase="المرحلة السابعة: التكامل والتوسع" 
            duration="2-3 أسابيع" 
            status="planned"
            description="ربط النظام مع أنظمة الشركة الأخرى، تعريب كامل، ودعم متعدد اللغات" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
