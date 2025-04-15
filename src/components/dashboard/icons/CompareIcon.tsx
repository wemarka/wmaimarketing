
import React from "react";

export const CompareIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="15" 
      height="15" 
      viewBox="0 0 15 15" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M5.5 3C5.22386 3 5 3.22386 5 3.5C5 3.77614 5.22386 4 5.5 4H9.5C9.77614 4 10 3.77614 10 3.5C10 3.22386 9.77614 3 9.5 3H5.5ZM3 7.5C3 7.22386 3.22386 7 3.5 7H11.5C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8H3.5C3.22386 8 3 7.77614 3 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
        fill="currentColor" 
        fillRule="evenodd" 
        clipRule="evenodd"
      />
    </svg>
  );
};

export default CompareIcon;
