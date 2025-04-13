
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
        status="complete"
        items={[
          { text: "إنشاء نظام للأدوار المختلفة (مدير، مسؤول تسويق، مصمم)", done: true },
          { text: "لوحة تحكم للمدير لإدارة الموظفين وصلاحياتهم", done: true },
          { text: "سجلات النشاط وتتبع الإجراءات", done: true },
          { text: "صفحة الملف الشخصي للموظف مع معلومات الاتصال", done: true },
          { text: "إدارة التفضيلات الشخصية والإعدادات", done: true },
          { text: "إدارة كلمات المرور وأمان الحساب", done: true },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={3}
        title="أدوات إنتاج المحتوى الأساسية"
        status="complete"
        items={[
          { text: "نظام تنظيم وتصنيف صور المنتجات", done: true },
          { text: "تحليل تلقائي للصور (الألوان، الزوايا، التفاصيل)", done: true },
          { text: "مكتبة مركزية للأصول البصرية للشركة", done: true },
          { text: "واجهة لإنشاء إعلانات بناءً على صور المنتجات", done: true },
          { text: "قوالب متعددة تتوافق مع هوية العلامة التجارية", done: true },
          { text: "خيارات تخصيص متقدمة مع الحفاظ على معايير الشركة", done: true },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={4}
        title="أدوات إنتاج المحتوى المتقدمة"
        status="complete"
        items={[
          { text: "إنشاء نصوص تسويقية متوافقة مع هوية العلامة التجارية", done: true },
          { text: "قاموس مصطلحات الشركة والكلمات المفتاحية", done: true },
          { text: "أنماط متنوعة للمنصات المختلفة", done: true },
          { text: "تحويل صور المنتجات إلى فيديوهات قصيرة", done: true },
          { text: "قوالب متعددة مع شعار الشركة وألوانها", done: true },
          { text: "أدوات تحرير بسيطة للفيديو", done: true },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={5}
        title="نظام الجدولة والنشر"
        status="in-progress"
        items={[
          { text: "تقويم تسويقي للحملات والمنشورات", done: true },
          { text: "سير عمل للموافقات قبل النشر", done: true },
          { text: "ربط مع حسابات الشركة على وسائل التواصل", done: true },
          { text: "تنظيم المحتوى حسب المنتجات أو الحملات", done: true },
          { text: "نظام مراجعة وموافقة للمحتوى قبل النشر", done: true },
          { text: "متابعة حالة المنشورات", done: false },
        ]}
      />
      
      <PhaseCard 
        phaseNumber={6}
        title="التحليلات والتقارير الداخلية"
        status="in-progress"
        items={[
          { text: "تتبع أداء منشورات وحملات الشركة", done: true },
          { text: "مقارنة بين المنصات المختلفة", done: true },
          { text: "تقارير دورية للإدارة", done: true },
          { text: "مؤشرات الأداء الرئيسية للتسويق", done: true },
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
