
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Circle, CheckCircle, AlertCircle, Edit2 } from "lucide-react";
import { PhaseData } from "./TimelineTab";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  phase: PhaseData;
  isLast: boolean;
  onEdit?: (phase: PhaseData) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, isLast, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{getStatusIcon()}</div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium">{phase.name}</h3>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              {onEdit && isHovered && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => onEdit(phase)}
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{phase.description}</p>
          {phase.progress > 0 && (
            <div className="w-full bg-muted rounded-full h-2 mb-1">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-in-out",
                  phase.status === "completed" ? "bg-green-500" : "bg-beauty-purple"
                )}
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
