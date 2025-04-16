
import React from "react";

export const AreaChart = () => {
  // Placeholder component for an area chart
  return (
    <div className="w-full h-full bg-gradient-to-t from-primary/5 to-primary/20 rounded-md relative">
      <div className="absolute bottom-0 left-0 right-0 h-[60%] border-t border-primary/30"></div>
      <div className="absolute top-0 left-0 right-0 h-1/3 flex items-end">
        <div className="w-full flex items-end justify-between px-2">
          <div className="h-4 w-1 bg-primary/20 rounded-t"></div>
          <div className="h-10 w-1 bg-primary/30 rounded-t"></div>
          <div className="h-6 w-1 bg-primary/20 rounded-t"></div>
          <div className="h-12 w-1 bg-primary/40 rounded-t"></div>
          <div className="h-8 w-1 bg-primary/30 rounded-t"></div>
          <div className="h-16 w-1 bg-primary/50 rounded-t"></div>
          <div className="h-12 w-1 bg-primary/40 rounded-t"></div>
        </div>
      </div>
    </div>
  );
};

export const BarChart = () => {
  // Placeholder component for a bar chart
  return (
    <div className="w-full h-full flex items-end justify-around px-4">
      <div className="h-[30%] w-[8%] bg-primary/60 rounded-t"></div>
      <div className="h-[70%] w-[8%] bg-primary/80 rounded-t"></div>
      <div className="h-[40%] w-[8%] bg-primary/60 rounded-t"></div>
      <div className="h-[60%] w-[8%] bg-primary/70 rounded-t"></div>
      <div className="h-[90%] w-[8%] bg-primary/90 rounded-t"></div>
      <div className="h-[50%] w-[8%] bg-primary/70 rounded-t"></div>
      <div className="h-[75%] w-[8%] bg-primary/80 rounded-t"></div>
    </div>
  );
};

export const DoughnutChart = () => {
  // Placeholder component for a doughnut chart
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-8 border-t-primary/80 border-r-primary/80 border-b-transparent border-l-transparent transform rotate-45"></div>
        <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-900"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">48%</span>
        </div>
      </div>
    </div>
  );
};
