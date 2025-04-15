
import React from "react";
import { GitCompare } from "lucide-react";

export const CompareIcon: React.FC<{ className?: string }> = ({ className }) => {
  return <GitCompare className={className} />;
};

export default CompareIcon;
