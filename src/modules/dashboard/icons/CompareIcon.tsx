
import React from "react";

interface CompareIconProps {
  className?: string;
}

const CompareIcon: React.FC<CompareIconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m3 22 6-6M3 16v6h6M21 2l-6 6M21 8V2h-6" />
    </svg>
  );
};

export default CompareIcon;
