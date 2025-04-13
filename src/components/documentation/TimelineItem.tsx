
import React from "react";
import { CheckCircle2, Clock, Circle } from "lucide-react";

interface TimelineItemProps {
  phase: string;
  duration: string;
  status: "complete" | "in-progress" | "planned";
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, duration, status }) => {
  return (
    <div className="flex items-center p-2 rounded-md hover:bg-slate-50 transition-colors">
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
  );
};

export default TimelineItem;
