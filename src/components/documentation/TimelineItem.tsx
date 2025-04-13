
import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

interface TimelineItemProps {
  phase: string;
  duration: string;
  status: "complete" | "in-progress" | "planned";
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, duration, status }) => {
  return (
    <div className="flex items-center">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        status === "complete" ? "bg-green-100 text-green-600" : 
        status === "in-progress" ? "bg-amber-100 text-amber-600" : 
        "bg-slate-100 text-slate-500"
      }`}>
        {status === "complete" && <CheckCircle2 className="h-6 w-6" />}
        {status === "in-progress" && <Clock className="h-6 w-6" />}
        {status === "planned" && <span>•</span>}
      </div>
      <div className="ms-4 mr-auto">
        <p className="font-medium">{phase}</p>
        <p className="text-sm text-muted-foreground">{duration}</p>
      </div>
      <div className="flex-shrink-0 text-sm font-medium">
        {status === "complete" && <span className="text-green-600">مكتملة</span>}
        {status === "in-progress" && <span className="text-amber-600">قيد التنفيذ</span>}
        {status === "planned" && <span className="text-slate-500">مخطط لها</span>}
      </div>
    </div>
  );
};

export default TimelineItem;
