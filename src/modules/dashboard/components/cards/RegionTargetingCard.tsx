
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RegionTargetingCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Targeting by region</h3>
        
        <div className="relative h-48">
          <div className="absolute inset-0 bg-[#f5f7fa] rounded-md overflow-hidden">
            {/* World map SVG - simplified version */}
            <svg viewBox="0 0 1000 500" className="w-full h-full opacity-50">
              <path
                d="M171.8,170.6c-0.4,3.8-0.3,8.1-0.7,11.9c-0.4,3.1-1.9,6.3-2.3,9.4c-0.4,3.8,0.4,7.5,0,11.3c-0.4,3.8-1.9,7.5-2.3,11.3c-0.4,3.8,0.4,7.5,0,11.3c-0.4,3.1-1.9,6.3-2.3,9.4"
                fill="none" stroke="#ccc" strokeWidth="20"
              ></path>
            </svg>
            
            {/* Interactive points */}
            <div className="absolute top-1/4 left-1/3">
              <div className="w-3 h-3 bg-[#3a7a89] rounded-full animate-ping"></div>
            </div>
            <div className="absolute top-1/2 left-2/3">
              <div className="w-3 h-3 bg-[#3a7a89] rounded-full animate-ping"></div>
            </div>
            
            {/* Country card */}
            <div className="absolute top-1/3 left-2/3 bg-white p-2 rounded shadow-md flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-[#3a7a89]/20 flex items-center justify-center">
                <span className="text-xs">🌍</span>
              </div>
              <div>
                <p className="text-xs font-medium">Poland</p>
                <p className="text-[10px] text-gray-500">23.58% / +4.3%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionTargetingCard;
