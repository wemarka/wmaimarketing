
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Circle, CheckCircle, AlertCircle } from "lucide-react";
import { PhaseData } from "./TimelineTab";

interface TimelineItemProps {
  phase: PhaseData;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, isLast }) => {
  const getStatusIcon = () => {
    switch (phase.status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "in-progress":
        return <Circle className="h-6 w-6 text-beauty-purple animate-pulse" />;
      case "not-started":
        return <AlertCircle className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (phase.status) {
      case "completed":
        return <Badge className="bg-green-500">مكتمل</Badge>;
      case "in-progress":
        return <Badge className="bg-beauty-purple">قيد التنفيذ</Badge>;
      case "not-started":
        return <Badge variant="outline">لم يبدأ</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium">{phase.name}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-muted-foreground text-sm mb-2">{phase.description}</p>
          {phase.progress > 0 && (
            <div className="w-full bg-muted rounded-full h-2 mb-1">
              <div
                className={`h-2 rounded-full ${
                  phase.status === "completed"
                    ? "bg-green-500"
                    : "bg-beauty-purple"
                } transition-all duration-500 ease-in-out`}
                style={{ width: `${phase.progress}%` }}
              ></div>
            </div>
          )}
          {phase.progress > 0 && (
            <div className="text-xs text-right text-muted-foreground">
              {phase.progress}%
            </div>
          )}
        </div>
      </div>
      {!isLast && (
        <div className="absolute top-8 bottom-0 left-3 w-px bg-muted-foreground/20"></div>
      )}
    </div>
  );
};

export default TimelineItem;
