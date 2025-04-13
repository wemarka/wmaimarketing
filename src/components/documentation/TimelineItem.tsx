
import React from "react";
import { PhaseData } from "./PhasesTab";

interface TimelineItemProps {
  phase: PhaseData;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase }) => {
  // Status circle color
  const getStatusCircleClass = () => {
    switch (phase.status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "planned":
        return "bg-gray-300 dark:bg-gray-600";
      default:
        return "bg-gray-300 dark:bg-gray-600";
    }
  };

  // Status text
  const getStatusText = () => {
    switch (phase.status) {
      case "completed":
        return "مكتمل";
      case "in-progress":
        return "قيد التنفيذ";
      case "planned":
        return "مخطط";
      default:
        return phase.status;
    }
  };

  return (
    <div className="flex items-start">
      {/* Status circle */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getStatusCircleClass()} flex items-center justify-center mr-4 z-10`}>
        {phase.status === "completed" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{phase.name}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {phase.progress}%
          </span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {phase.description}
        </p>
        
        <span className="text-xs font-medium inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded px-2 py-1">
          {getStatusText()}
        </span>
      </div>
    </div>
  );
};

export default TimelineItem;
