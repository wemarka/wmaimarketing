
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const RegionTargetingCard = () => {
  const regions = [
    { id: "sa", name: "السعودية", percentage: 35, color: "#4CAF50" },
    { id: "ae", name: "الإمارات", percentage: 25, color: "#2196F3" },
    { id: "kw", name: "الكويت", percentage: 15, color: "#FFC107" },
    { id: "qa", name: "قطر", percentage: 10, color: "#9C27B0" },
    { id: "bh", name: "البحرين", percentage: 7, color: "#FF5722" },
    { id: "om", name: "عمان", percentage: 8, color: "#607D8B" }
  ];
  
  const [hoverRegion, setHoverRegion] = useState<string | null>(null);
  const [period, setPeriod] = useState<"month" | "week" | "day">("month");
  
  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#3a7a89]/10 flex items-center justify-center ml-3">
              <Globe className="h-4 w-4 text-[#3a7a89]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3a7a89]">التوزيع الجغرافي</h3>
          </div>
          
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as "month" | "week" | "day")}
              className="appearance-none bg-[#f5f5f5] rounded-full py-1 px-3 pr-6 text-xs text-gray-500 cursor-pointer focus:outline-none"
            >
              <option value="month">شهريًا</option>
              <option value="week">أسبوعيًا</option>
              <option value="day">يوميًا</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
          </div>
        </div>
        
        <div className="relative h-[180px] mb-2 bg-[#f5f7fa] dark:bg-slate-800/50 rounded-lg p-4">
          <svg viewBox="0 0 240 160" className="w-full h-full">
            {/* Simplified map */}
            <g transform="translate(20, 10) scale(0.9)">
              <path 
                d="M60,40 Q80,20 100,40 Q120,60 140,40 Q160,20 180,40 Q160,80 180,120 Q160,140 140,120 Q120,100 100,120 Q80,140 60,120 Q40,80 60,40 Z" 
                fill="#e0e0e0"
                stroke="#d0d0d0"
                strokeWidth="1"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <circle
                      cx="100" cy="70" r="8"
                      fill={hoverRegion === "sa" ? "#4CAF50" : "#4CAF5080"}
                      stroke={hoverRegion === "sa" ? "#fff" : "none"}
                      strokeWidth="2"
                      onMouseEnter={() => setHoverRegion("sa")}
                      onMouseLeave={() => setHoverRegion(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>السعودية: 35%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <circle
                      cx="140" cy="85" r="6"
                      fill={hoverRegion === "ae" ? "#2196F3" : "#2196F380"}
                      stroke={hoverRegion === "ae" ? "#fff" : "none"}
                      strokeWidth="2"
                      onMouseEnter={() => setHoverRegion("ae")}
                      onMouseLeave={() => setHoverRegion(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>الإمارات: 25%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <circle
                      cx="120" cy="60" r="5"
                      fill={hoverRegion === "kw" ? "#FFC107" : "#FFC10780"}
                      stroke={hoverRegion === "kw" ? "#fff" : "none"}
                      strokeWidth="1"
                      onMouseEnter={() => setHoverRegion("kw")}
                      onMouseLeave={() => setHoverRegion(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>الكويت: 15%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <circle
                      cx="130" cy="100" r="4"
                      fill={hoverRegion === "qa" ? "#9C27B0" : "#9C27B080"}
                      stroke={hoverRegion === "qa" ? "#fff" : "none"}
                      strokeWidth="1"
                      onMouseEnter={() => setHoverRegion("qa")}
                      onMouseLeave={() => setHoverRegion(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>قطر: 10%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <circle
                      cx="115" cy="90" r="3"
                      fill={hoverRegion === "bh" ? "#FF5722" : "#FF572280"}
                      stroke={hoverRegion === "bh" ? "#fff" : "none"}
                      strokeWidth="1"
                      onMouseEnter={() => setHoverRegion("bh")}
                      onMouseLeave={() => setHoverRegion(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>البحرين: 7%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <circle
                      cx="160" cy="95" r="4"
                      fill={hoverRegion === "om" ? "#607D8B" : "#607D8B80"}
                      stroke={hoverRegion === "om" ? "#fff" : "none"}
                      strokeWidth="1"
                      onMouseEnter={() => setHoverRegion("om")}
                      onMouseLeave={() => setHoverRegion(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>عمان: 8%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </g>
          </svg>
        </div>
        
        <div className="space-y-3 mt-4">
          {regions.map((region) => (
            <div 
              key={region.id}
              className="flex items-center justify-between"
              onMouseEnter={() => setHoverRegion(region.id)}
              onMouseLeave={() => setHoverRegion(null)}
            >
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full ml-2"
                  style={{ backgroundColor: region.color }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{region.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ml-2">
                  <motion.div 
                    className="h-full"
                    style={{ backgroundColor: region.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${region.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{region.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionTargetingCard;
