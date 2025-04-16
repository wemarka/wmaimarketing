
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Globe, MapPin } from "lucide-react";

const RegionTargetingCard = () => {
  // Sample data for regions
  const regions = [
    { id: 1, name: "Poland", percentage: 23.58, change: "+4.3%", icon: "🇵🇱" },
    { id: 2, name: "United States", percentage: 37.12, change: "+2.8%", icon: "🇺🇸" },
    { id: 3, name: "Saudi Arabia", percentage: 15.46, change: "+6.2%", icon: "🇸🇦" }
  ];

  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#3a7a89]/10 flex items-center justify-center ml-3">
                <Globe className="h-4 w-4 text-[#3a7a89]" />
              </div>
              <h3 className="text-lg font-semibold text-[#3a7a89]">استهداف حسب المنطقة</h3>
            </div>
            
            <div className="bg-[#f5f5f5] rounded-full py-1 px-3">
              <span className="text-xs text-gray-500">أسبوعي</span>
            </div>
          </div>
          
          <div className="relative h-[calc(100%-2rem)]">
            <div className="absolute inset-0 bg-[#f5f7fa] rounded-lg overflow-hidden">
              {/* World map SVG - with improved design */}
              <svg viewBox="0 0 1000 500" className="w-full h-full opacity-40">
                <path
                  d="M171.8,170.6c-0.4,3.8-0.3,8.1-0.7,11.9c-0.4,3.1-1.9,6.3-2.3,9.4c-0.4,3.8,0.4,7.5,0,11.3c-0.4,3.8-1.9,7.5-2.3,11.3c-0.4,3.8,0.4,7.5,0,11.3c-0.4,3.1-1.9,6.3-2.3,9.4"
                  fill="none" stroke="#ccc" strokeWidth="20"
                />
                <path
                  d="M250,150 C300,120 350,180 400,150 C450,120 500,200 550,170 C600,140 650,200 700,170"
                  fill="none" stroke="#ddd" strokeWidth="15" strokeLinecap="round"
                />
                <circle cx="300" cy="250" r="50" fill="#eee" stroke="#ddd" strokeWidth="5" />
                <circle cx="600" cy="200" r="70" fill="#eee" stroke="#ddd" strokeWidth="5" />
              </svg>
              
              {/* Interactive points */}
              {regions.map((region, index) => (
                <React.Fragment key={region.id}>
                  <motion.div 
                    className={`absolute ${index === 0 ? "top-1/4 left-1/3" : 
                      index === 1 ? "top-1/2 left-2/3" : "top-2/3 left-1/4"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                  >
                    <div className="relative">
                      <div className="w-3 h-3 bg-[#3a7a89] rounded-full animate-ping absolute"></div>
                      <div className="w-3 h-3 bg-[#3a7a89] rounded-full relative"></div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                    className={`absolute ${
                      index === 0 ? "top-1/4 left-1/3 mt-6 ml-6" : 
                      index === 1 ? "top-1/2 left-2/3 mt-6 ml-6" : 
                      "top-2/3 left-1/4 mt-6 ml-6"
                    } bg-white p-2 rounded shadow-md flex items-center space-x-2 rtl:space-x-reverse`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#3a7a89]/20 flex items-center justify-center">
                      <span className="text-xs">{region.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium">{region.name}</p>
                      <p className="text-[10px] text-gray-500">{region.percentage}% / {region.change}</p>
                    </div>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <button className="flex items-center justify-center text-sm text-[#3a7a89] hover:underline gap-1 w-full">
              <MapPin className="h-3 w-3" />
              <span>عرض جميع المناطق</span>
            </button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RegionTargetingCard;
