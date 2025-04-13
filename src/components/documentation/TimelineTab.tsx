
import React from "react";
import TimelineItem from "./TimelineItem";
import { Card, CardContent } from "@/components/ui/card";
import { PhaseData } from "./PhasesTab";

export interface TimelineTabProps {
  phases: PhaseData[];
}

const TimelineTab: React.FC<TimelineTabProps> = ({ phases }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <TimelineItem 
              key={phase.id} 
              phase={phase} 
              isLast={index === phases.length - 1} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
