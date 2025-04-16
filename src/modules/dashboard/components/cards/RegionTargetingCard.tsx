
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const RegionTargetingCard = () => {
  // Sample data
  const regions = [
    { id: 1, name: "الرياض", percentage: 45, color: "bg-blue-500" },
    { id: 2, name: "جدة", percentage: 25, color: "bg-green-500" },
    { id: 3, name: "الدمام", percentage: 15, color: "bg-purple-500" },
    { id: 4, name: "مناطق أخرى", percentage: 15, color: "bg-amber-500" },
  ];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-8 h-8 rounded-full bg-[#3a7a89]/10 flex items-center justify-center"
            )}>
              <Globe className="h-4 w-4 text-[#3a7a89]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3a7a89]">استهداف المناطق</h3>
          </div>
          <div className="bg-[#f5f5f5] rounded-full py-1 px-3">
            <span className="text-xs text-gray-500">شهري</span>
          </div>
        </div>
        
        <motion.div 
          className="flex mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {regions.map((region) => (
            <motion.div 
              key={region.id}
              variants={item}
              className="flex-1 text-center"
            >
              <div className="relative mx-auto w-12 h-12 mb-2">
                <motion.div 
                  className={`${region.color} opacity-20 absolute inset-0 rounded-full`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * region.id }}
                />
                <motion.div 
                  className={`${region.color} opacity-40 absolute inset-0 rounded-full scale-75`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 0.75 }}
                  transition={{ duration: 0.5, delay: 0.1 + 0.2 * region.id }}
                />
                <motion.div 
                  className={`${region.color} flex items-center justify-center absolute inset-0 rounded-full scale-50 text-white`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.2 + 0.2 * region.id }}
                >
                  <MapPin className="h-4 w-4" />
                </motion.div>
              </div>
              <div className="text-sm font-medium">{region.percentage}%</div>
              <div className="text-xs text-muted-foreground">{region.name}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-sm">توزيع الزوار حسب المنطقة</h4>
          <motion.div 
            className="space-y-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {regions.map((region) => (
              <motion.div 
                key={region.id}
                variants={item}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${region.color}`}></div>
                <div className="text-sm flex-1">{region.name}</div>
                <div className="text-sm font-medium">{region.percentage}%</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-4 pt-4 border-t border-gray-100"
          variants={item}
          initial="hidden"
          animate="show"
        >
          <button className="text-sm text-[#3a7a89] hover:underline flex items-center justify-center w-full">
            عرض تقرير التوزيع الجغرافي الكامل
          </button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RegionTargetingCard;
