
import React from "react";
import { Calendar, Clock, CheckCircle2, Users, AlertCircle } from "lucide-react";

const ProjectHeader: React.FC = () => {
  return (
    <div className="space-y-4 mb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">خطة تطوير مشروع Beauty AI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          منصة الذكاء الاصطناعي المتكاملة لتسويق منتجات التجميل
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>تاريخ البدء: ١ أبريل ٢٠٢٥</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>المدة المقدرة: ١٢-١٥ أسبوع</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          <span>فريق التطوير: ٤ مطورين</span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
          <AlertCircle className="h-4 w-4" />
          <span>أولوية المشروع: عالية</span>
        </div>
      </div>

      <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-3">
        <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">المرحلة الحالية: أدوات إنتاج المحتوى الأساسية</h3>
          <p className="text-sm text-muted-foreground">تطوير نظام لتنظيم وتحليل صور المنتجات، وإنشاء مكتبة مركزية للأصول البصرية</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">تقدم المشروع</span>
          <span className="font-medium">٤٠٪</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: "40%" }}></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>المرحلتان ١-٢ (مكتملتان)</span>
          <span>المرحلة ٣ (قيد التنفيذ)</span>
          <span>المراحل ٤-٧ (مخطط لها)</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
