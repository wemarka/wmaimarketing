
import React from "react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

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
        <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
          <CheckCircle2 className="h-4 w-4" />
          <span>المرحلة الحالية: إدارة المستخدمين</span>
        </div>
      </div>
      
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: "30%" }}></div>
      </div>
      <div className="text-xs text-muted-foreground text-center">تم إنجاز ٣٠٪ من المشروع</div>
    </div>
  );
};

export default ProjectHeader;
