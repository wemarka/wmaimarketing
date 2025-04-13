
import React from "react";
import PhaseCard from "./PhaseCard";

export interface PhaseData {
  id: number;
  name: string;
  status: string;
  progress: number;
  description: string;
}

export interface PhasesTabProps {
  phases: PhaseData[];
}

const PhasesTab: React.FC<PhasesTabProps> = ({ phases }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {phases.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>
    </div>
  );
};

export default PhasesTab;
