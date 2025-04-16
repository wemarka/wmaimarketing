
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const PerformanceCard = () => {
  // Sample data for chart
  const months = ["JAN", "FEB", "MAR", "APR", "MAY"];
  const values = [60, 30, 70, 45, 85];
  const maxValue = Math.max(...values);

  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          <h3 className="text-lg font-semibold text-[#3a7a89]">Finance Performance</h3>
          <div className="bg-[#f5f5f5] rounded-full py-1 px-3">
            <span className="text-xs text-gray-500">Monthly</span>
          </div>
        </motion.div>
        
        <div className="flex items-baseline gap-2 mb-6">
          <div className="font-bold text-2xl">841</div>
          <div className="font-bold text-lg">12</div>
          <div className="text-xs text-gray-500">Regular income</div>
        </div>
        
        <div className="flex items-end justify-between h-36 mt-6">
          {months.map((month, index) => (
            <div key={month} className="flex flex-col items-center">
              <div 
                className="w-5 rounded-md bg-[#3a7a89]" 
                style={{ 
                  height: `${(values[index] / maxValue) * 100}%`,
                  opacity: month === "MAY" ? 1 : 0.7
                }}
              ></div>
              <div className="mt-2 text-xs text-gray-500">{month}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
