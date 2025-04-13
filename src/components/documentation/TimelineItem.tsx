
import React, { useState } from "react";
import { CheckCircle2, Clock, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineItemProps {
  phase: string;
  duration: string;
  status: "complete" | "in-progress" | "planned";
  description?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, duration, status, description }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="border border-slate-100 rounded-lg transition-all duration-200 hover:shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center p-4 rounded-md hover:bg-slate-50">
        <div className="flex items-center mb-2 md:mb-0">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            status === "complete" ? "bg-green-100 text-green-600" : 
            status === "in-progress" ? "bg-amber-100 text-amber-600" : 
            "bg-slate-100 text-slate-500"
          }`}>
            {status === "complete" && <CheckCircle2 className="h-6 w-6" />}
            {status === "in-progress" && <Clock className="h-6 w-6" />}
            {status === "planned" && <Circle className="h-6 w-6" />}
          </div>
          <div className="ms-4 mr-auto">
            <p className="font-medium">{phase}</p>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
        </div>
        <div className="flex items-center ml-14 md:ml-auto">
          {description && (
            <p className="text-sm text-muted-foreground max-w-md mr-4 hidden md:block">{description}</p>
          )}
          <div className={`flex-shrink-0 text-sm font-medium px-3 py-1 rounded-full ${
            status === "complete" ? "bg-green-100 text-green-600" : 
            status === "in-progress" ? "bg-amber-100 text-amber-600" : 
            "bg-slate-100 text-slate-500"
          }`}>
            {status === "complete" && <span>مكتملة</span>}
            {status === "in-progress" && <span>قيد التنفيذ</span>}
            {status === "planned" && <span>مخطط لها</span>}
          </div>
        </div>
      </div>
      
      {description && (
        <div className="px-4 pb-2">
          <p className="text-sm text-muted-foreground mt-2 md:hidden ml-14">{description}</p>
          
          <div className="flex justify-end mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center" 
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  <span>إخفاء التفاصيل</span>
                  <ChevronUp className="h-4 w-4 mr-1" />
                </>
              ) : (
                <>
                  <span>عرض التفاصيل</span>
                  <ChevronDown className="h-4 w-4 mr-1" />
                </>
              )}
            </Button>
          </div>
          
          {expanded && (
            <div className="bg-slate-50 p-4 rounded-md mt-2 text-sm border border-slate-100 animate-fade-in">
              <h4 className="font-medium mb-2">تفاصيل المرحلة</h4>
              <p>{description}</p>
              {status === "in-progress" && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <h5 className="text-amber-600 font-medium">المهام الجارية:</h5>
                  <ul className="list-disc mr-5 mt-1 space-y-1">
                    <li>تطوير واجهة إدارة المستخدمين</li>
                    <li>إنشاء نظام الأدوار والصلاحيات</li>
                    <li>تطوير سجل نشاط المستخدمين</li>
                  </ul>
                </div>
              )}
              {status === "complete" && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-green-600">
                  <span className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>اكتملت جميع المهام بنجاح</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
