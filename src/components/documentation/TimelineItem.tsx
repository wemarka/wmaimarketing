
import React from "react";
import { CheckCircle2, Clock, Circle, ArrowRight } from "lucide-react";

interface TimelineItemProps {
  phase: string;
  duration: string;
  status: "complete" | "in-progress" | "planned";
  description?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, duration, status, description }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center p-3 rounded-md hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <div className="flex items-center mb-2 md:mb-0">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
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
      {description && (
        <p className="text-sm text-muted-foreground mt-2 md:hidden ml-14">{description}</p>
      )}
    </div>
  );
};

export default TimelineItem;
