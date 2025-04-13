
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
            startDate="١ أبريل ٢٠٢٥"
            endDate="١٤ أبريل ٢٠٢٥"
            tasks={[
              { name: "إنشاء مشروع React مع TypeScript", status: "complete" },
              { name: "تكامل مع مكتبة Shadcn UI", status: "complete", assignee: "أحمد" },
              { name: "هيكلة المجلدات والملفات", status: "complete", assignee: "محمد" },
              { name: "ربط المشروع مع Supabase", status: "complete", priority: "high" },
              { name: "إنشاء نظام المصادقة", status: "complete", assignee: "علي", priority: "high" },
            ]}
          />
          
          <TimelineItem 
            phase="المرحلة الثانية: إدارة المستخدمين والصلاحيات الداخلية" 
            duration="1-2 أسابيع" 
            status="in-progress"
            description="تطوير نظام إدارة المستخدمين، وإعداد صلاحيات الوصول للأدوار المختلفة، وتتبع نشاط المستخدمين" 
            startDate="١٥ أبريل ٢٠٢٥"
            endDate="٣٠ أبريل ٢٠٢٥"
            tasks={[
              { name: "إنشاء واجهة إدارة المستخدمين", status: "complete", assignee: "سارة" },
              { name: "تحديد وتنفيذ نظام الأدوار", status: "complete", assignee: "علي", priority: "high" },
              { name: "إنشاء سجل نشاط المستخدمين", status: "in-progress", assignee: "محمد" },
              { name: "تطوير صفحة الملف الشخصي", status: "pending", priority: "medium" },
              { name: "تنفيذ إعدادات المستخدم", status: "pending" },
              { name: "اختبارات أمان الحسابات", status: "pending", priority: "high" },
            ]}
          />
          
          <TimelineItem 
            phase="المرحلة الثالثة: أدوات إنتاج المحتوى الأساسية" 
            duration="2-3 أسابيع" 
            status="planned"
            description="تطوير واجهات لتحليل وتنظيم الصور، إنشاء إعلانات، وإدارة الأصول البصرية" 
            startDate="١ مايو ٢٠٢٥"
            endDate="٢٢ مايو ٢٠٢٥"
            tasks={[
              { name: "تطوير نظام تنظيم وتصنيف الصور", status: "pending", priority: "high" },
              { name: "إنشاء محرك التحليل التلقائي للصور", status: "pending", priority: "medium" },
              { name: "تطوير مكتبة الأصول البصرية", status: "pending" },
              { name: "إنشاء واجهة تصميم الإعلانات", status: "pending", priority: "high" },
              { name: "تطوير نظام القوالب المتعددة", status: "pending" },
            ]}
          />
          
          <TimelineItem 
            phase="المرحلة الرابعة: أدوات إنتاج المحتوى المتقدمة" 
            duration="2-3 أسابيع" 
            status="planned"
            description="تطوير أدوات لإنشاء النصوص التسويقية، إدارة قاموس المصطلحات، وتحويل الصور إلى فيديوهات" 
            startDate="٢٣ مايو ٢٠٢٥"
            endDate="١٣ يونيو ٢٠٢٥"
          />
          
          <TimelineItem 
            phase="المرحلة الخامسة: نظام الجدولة والنشر" 
            duration="2 أسابيع" 
            status="planned"
            description="تطوير نظام تقويم تسويقي، سير عمل للموافقات، وربط مع حسابات وسائل التواصل" 
            startDate="١٤ يونيو ٢٠٢٥"
            endDate="٢٨ يونيو ٢٠٢٥"
          />
          
          <TimelineItem 
            phase="المرحلة السادسة: التحليلات والتقارير الداخلية" 
            duration="1-2 أسابيع" 
            status="planned"
            description="تطوير نظام لتتبع أداء الحملات، مؤشرات الأداء، وتوليد التقارير الدورية" 
            startDate="٢٩ يونيو ٢٠٢٥"
            endDate="١٣ يوليو ٢٠٢٥"
          />
          
          <TimelineItem 
            phase="المرحلة السابعة: التكامل والتوسع" 
            duration="2-3 أسابيع" 
            status="planned"
            description="ربط النظام مع أنظمة الشركة الأخرى، تعريب كامل، ودعم متعدد اللغات" 
            startDate="١٤ يوليو ٢٠٢٥"
            endDate="٤ أغسطس ٢٠٢٥"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
