
import React from "react";
import PhaseCard from "./PhaseCard";

const PhasesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <PhaseCard 
        phaseNumber={1}
        title="تأسيس المشروع والهيكلة الأساسية"
        status="complete"
        items={[
          { text: "إنشاء مشروع React مع TypeScript وTailwind CSS", done: true },
          { text: "تكامل مع مكتبة Shadcn UI للواجهة", done: true },
          { text: "هيكلة المجلدات والملفات بشكل منظم", done: true },
          { text: "ربط المشروع مع Supabase", done: true },
          { text: "إنشاء نظام المصادقة (تسجيل الدخول/الخروج)", done: true },
          { text: "إنشاء جدول الملفات الشخصية للمستخدمين", done: true },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={2}
        title="إدارة المستخدمين والصلاحيات الداخلية"
        status="in-progress"
        items={[
          { text: "إنشاء نظام للأدوار المختلفة (مدير، مسؤول تسويق، مصمم)", done: false },
          { text: "لوحة تحكم للمدير لإدارة الموظفين وصلاحياتهم", done: false },
          { text: "سجلات النشاط وتتبع الإجراءات", done: false },
          { text: "صفحة الملف الشخصي للموظف مع معلومات الاتصال", done: false },
          { text: "إدارة التفضيلات الشخصية والإعدادات", done: false },
          { text: "إدارة كلمات المرور وأمان الحساب", done: false },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={3}
        title="أدوات إنتاج المحتوى الأساسية"
        status="planned"
        items={[
          { text: "نظام تنظيم وتصنيف صور المنتجات", done: false },
          { text: "تحليل تلقائي للصور (الألوان، الزوايا، التفاصيل)", done: false },
          { text: "مكتبة مركزية للأصول البصرية للشركة", done: false },
          { text: "واجهة لإنشاء إعلانات بناءً على صور المنتجات", done: false },
          { text: "قوالب متعددة تتوافق مع هوية العلامة التجارية", done: false },
          { text: "خيارات تخصيص متقدمة مع الحفاظ على معايير الشركة", done: false },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={4}
        title="أدوات إنتاج المحتوى المتقدمة"
        status="planned"
        items={[
          { text: "إنشاء نصوص تسويقية متوافقة مع هوية العلامة التجارية", done: false },
          { text: "قاموس مصطلحات الشركة والكلمات المفتاحية", done: false },
          { text: "أنماط متنوعة للمنصات المختلفة", done: false },
          { text: "تحويل صور المنتجات إلى فيديوهات قصيرة", done: false },
          { text: "قوالب متعددة مع شعار الشركة وألوانها", done: false },
          { text: "أدوات تحرير بسيطة للفيديو", done: false },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={5}
        title="نظام الجدولة والنشر"
        status="planned"
        items={[
          { text: "تقويم تسويقي للحملات والمنشورات", done: false },
          { text: "سير عمل للموافقات قبل النشر", done: false },
          { text: "ربط مع حسابات الشركة على وسائل التواصل", done: false },
          { text: "تنظيم المحتوى حسب المنتجات أو الحملات", done: false },
          { text: "نظام مراجعة وموافقة للمحتوى قبل النشر", done: false },
          { text: "متابعة حالة المنشورات", done: false },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={6}
        title="التحليلات والتقارير الداخلية"
        status="planned"
        items={[
          { text: "تتبع أداء منشورات وحملات الشركة", done: false },
          { text: "مقارنة بين المنصات المختلفة", done: false },
          { text: "تقارير دورية للإدارة", done: false },
          { text: "مؤشرات الأداء الرئيسية للتسويق", done: false },
          { text: "تحليل تكلفة الإنتاج وفعالية الحملات", done: false },
          { text: "توصيات لتحسين المحتوى المستقبلي", done: false },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={7}
        title="التكامل والتوسع"
        status="planned"
        items={[
          { text: "ربط مع نظام إدارة المنتجات", done: false },
          { text: "تكامل مع نظام المبيعات لتتبع تأثير الحملات", done: false },
          { text: "استيراد/تصدير البيانات من/إلى أنظمة الشركة الأخرى", done: false },
          { text: "تعريب كامل للنظام", done: false },
          { text: "تخصيص الواجهة حسب هوية العلامة التجارية", done: false },
          { text: "دعم متعدد اللغات للأسواق المختلفة", done: false },
        ]}
      />
    </div>
  );
};

export default PhasesTab;
