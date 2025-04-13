
import React from "react";
import { PhaseData } from "./PhasesTab";
import { Check, Clock } from "lucide-react";

interface TimelineItemProps {
  phase: PhaseData;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, isLast }) => {
  const isCompleted = phase.status === "completed";
  
  return (
    <div className="relative flex">
      <div className="mr-4 flex flex-col items-center">
        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isCompleted ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
        }`}>
          {isCompleted ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
        </div>
        {!isLast && <div className="h-full w-0.5 bg-gray-200" />}
      </div>
      <div className="pb-8">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-gray-900">{phase.name}</h4>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            isCompleted 
              ? "bg-green-100 text-green-600" 
              : "bg-yellow-100 text-yellow-600"
          }`}>
            {isCompleted ? "مكتمل" : "مخطط"}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{phase.description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
