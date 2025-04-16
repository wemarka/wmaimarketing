
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Target, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PopularityCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-0">
        <div className="h-full bg-gradient-to-br from-[#f8e5d7] to-[#fef9ed] p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="bg-[#ff9d6c]/20 p-1.5 rounded-md">
                      <Target className="h-4 w-4 text-[#ff5c35]" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-xs">مؤشر نشاط الحساب</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <h3 className="text-sm font-medium text-[#654321]">معدل الشعبية</h3>
            </div>
            <motion.div 
              className="bg-white/50 rounded-full py-1 px-3 cursor-pointer hover:bg-white/60 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs text-[#654321]">يومي</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-6xl font-bold text-[#333333] mb-6 mt-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-baseline">
              87°
              <div className="flex items-center text-lg text-green-600 mr-2">
                <TrendingUp className="h-4 w-4 mr-0.5" />
                <div>3.2</div>
              </div>
            </div>
          </motion.div>
          
          <div className="mb-6">
            {/* Gauge meter */}
            <div className="relative h-2 w-full">
              <div className="h-2 bg-gray-200 rounded-full w-full"></div>
              <motion.div 
                className="h-2 bg-gradient-to-r from-[#ff9d6c] to-[#ff5c35] rounded-full absolute top-0 right-0 rtl:right-auto rtl:left-0"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
              <motion.div 
                className="absolute left-1/4 rtl:right-1/4 rtl:left-auto top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#ff5c35] rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              ></motion.div>
            </div>
          </div>
          
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-[#654321]"
            >
              <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-medium">
                🔥 نشاطك أعلى بنسبة 18% هذا الأسبوع!
              </span> استمر في التقدم واحصل على المزيد من النقاط!
            </motion.p>
            
            <motion.div 
              className="flex items-center bg-white/70 rounded-xl p-3 hover:bg-white/90 transition-colors"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" }}
            >
              <div className="bg-[#ff9d6c]/20 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                <Zap className="h-4 w-4 text-[#ff5c35]" />
              </div>
              <p className="text-xs mx-2 text-[#654321] flex-1">
                تعلم كيفية إدارة جميع جوانب مشروعك الناشئ بشكل فعال
              </p>
              
              <Button size="sm" variant="ghost" className="bg-white hover:bg-white/80 rounded-full w-6 h-6 p-0 shadow-sm">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularityCard;
