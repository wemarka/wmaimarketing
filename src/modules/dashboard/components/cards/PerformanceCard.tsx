
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const PerformanceCard = () => {
  // Sample data for chart
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
  const values = [60, 30, 70, 45, 85, 55];
  const maxValue = Math.max(...values);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Animation variants for chart bars
  const barVariants = {
    hidden: { height: 0 },
    visible: (i: number) => ({
      height: `${(values[i] / maxValue) * 100}%`,
      transition: { 
        duration: 1, 
        delay: i * 0.1,
        ease: "easeOut" 
      }
    })
  };

  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          <div className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-full bg-[#3a7a89]/10 flex items-center justify-center ml-3"
            )}>
              <BarChart3 className="h-4 w-4 text-[#3a7a89]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3a7a89]">الأداء المالي</h3>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#f5f5f5] rounded-full py-1 px-3 flex items-center text-xs text-gray-500"
            >
              شهريًا
              {isDropdownOpen ? 
                <ChevronUp className="mr-1 h-3 w-3" /> : 
                <ChevronDown className="mr-1 h-3 w-3" />
              }
            </button>
            
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 mt-1 py-2 w-28 bg-white rounded-md shadow-lg z-10 border border-gray-100"
              >
                <button className="px-4 py-1 text-sm text-gray-700 hover:bg-[#3a7a89]/10 w-full text-right">
                  يوميًا
                </button>
                <button className="px-4 py-1 text-sm text-gray-700 hover:bg-[#3a7a89]/10 w-full text-right font-medium">
                  شهريًا
                </button>
                <button className="px-4 py-1 text-sm text-gray-700 hover:bg-[#3a7a89]/10 w-full text-right">
                  سنويًا
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <div className="flex items-baseline gap-2 mb-6">
          <div className="font-bold text-2xl">841</div>
          <div className="font-bold text-lg text-[#3a7a89]">+12</div>
          <div className="text-xs text-gray-500">الدخل المنتظم</div>
        </div>
        
        <div className="flex items-end justify-between h-36 mt-6">
          {months.map((month, index) => (
            <div key={month} className="flex flex-col items-center">
              <motion.div 
                className={cn(
                  "w-6 rounded-md", 
                  month === "MAY" ? "bg-[#3a7a89]" : "bg-[#3a7a89]/70"
                )}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={barVariants}
              ></motion.div>
              <div className="mt-2 text-xs text-gray-500">{month}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
