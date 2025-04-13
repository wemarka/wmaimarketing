
import React, { useState } from "react";
import TimelineItem from "./TimelineItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export interface PhaseData {
  id: number;
  name: string;
  status: "completed" | "in-progress" | "not-started";
  progress: number;
  description: string;
}

export interface TimelineTabProps {
  phases: PhaseData[];
}

const TimelineTab: React.FC<TimelineTabProps> = ({ phases }) => {
  const [displayPhases, setDisplayPhases] = useState<PhaseData[]>(phases);
  const [filterActive, setFilterActive] = useState<boolean>(false);

  const showActiveOnly = () => {
    if (filterActive) {
      setDisplayPhases(phases);
      setFilterActive(false);
    } else {
      setDisplayPhases(phases.filter(phase => phase.status === "in-progress"));
      setFilterActive(true);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-beauty-gold" />
            <span>الجدول الزمني للمشروع</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={showActiveOnly}
            className="text-xs"
          >
            {filterActive ? "عرض الكل" : "عرض المراحل النشطة فقط"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6 mt-4">
          {displayPhases.length > 0 ? (
            displayPhases.map((phase, index) => (
              <TimelineItem 
                key={phase.id} 
                phase={phase} 
                isLast={index === displayPhases.length - 1} 
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              لا توجد مراحل نشطة حاليا
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineTab;
