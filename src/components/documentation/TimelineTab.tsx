
import React from "react";
import { Card } from "@/components/ui/card";
import TimelineItem from "./TimelineItem";
import { PhaseData } from "./PhasesTab";

export interface TimelineTabProps {
  phases: PhaseData[];
}

const TimelineTab: React.FC<TimelineTabProps> = ({ phases }) => {
  // Sort phases by ID to ensure correct order
  const sortedPhases = [...phases].sort((a, b) => a.id - b.id);
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">الجدول الزمني للمشروع</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute right-[15px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Timeline items */}
        <div className="space-y-8">
          {sortedPhases.map((phase) => (
            <TimelineItem key={phase.id} phase={phase} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TimelineTab;
