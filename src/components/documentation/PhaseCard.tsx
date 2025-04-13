
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PhaseData } from "./PhasesTab";

interface PhaseCardProps {
  phase: PhaseData;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  // Status badge color
  const getStatusBadgeClass = () => {
    switch (phase.status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
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
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{phase.name}</CardTitle>
          <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeClass()}`}>
            {getStatusText()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-gray-500 dark:text-gray-400">{phase.description}</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">التقدم</span>
            <span className="text-sm font-medium">{phase.progress}%</span>
          </div>
          <Progress value={phase.progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseCard;
