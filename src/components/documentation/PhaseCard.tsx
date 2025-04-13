
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Clock } from "lucide-react";
import { PhaseData } from "./PhasesTab";

interface PhaseCardProps {
  phase: PhaseData;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase }) => {
  const isCompleted = phase.status === "completed";
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{phase.name}</h3>
          <div className={`flex items-center space-x-1 p-1 rounded-full ${
            isCompleted 
              ? "text-green-600" 
              : "text-yellow-600"
          }`}>
            {isCompleted ? (
              <Check className="h-4 w-4" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
            <span className="text-xs font-medium">
              {isCompleted ? "مكتمل" : "مخطط"}
            </span>
          </div>
        </div>
        
        <Progress value={phase.progress} className="h-2 mb-3" />
        <p className="text-sm text-muted-foreground">{phase.description}</p>
      </CardContent>
    </Card>
  );
};

export default PhaseCard;
