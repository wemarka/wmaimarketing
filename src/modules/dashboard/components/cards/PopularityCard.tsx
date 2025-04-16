
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Target, Zap, TrendingUp, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AIFeedbackMessage } from "@/components/dashboard/AIFeedbackMessage";

const PopularityCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  
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
                  <TooltipContent side="right" className="bg-white/90 backdrop-blur-sm text-[#654321] border-none shadow-lg">
                    <p className="text-xs">مؤشر نشاط الحساب</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <h3 className="text-sm font-medium text-[#654321]">معدل الشعبية</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-[#654321]/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">قياس يجمع بين المشاركة والوصول والحضور على منصات التواصل الاجتماعي.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <motion.div 
              className="bg-white/50 rounded-full py-1 px-3 cursor-pointer hover:bg-white/60 transition-colors flex items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs text-[#654321]">يومي</span>
              <ChevronRight className="h-3 w-3 text-[#654321]/60" />
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
                className="absolute left-3/4 rtl:right-3/4 rtl:left-auto top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#ff5c35] rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              ></motion.div>
              
              {/* Percentage labels */}
              <div className="flex justify-between mt-2 text-xs text-[#654321]/60">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <AIFeedbackMessage 
              performanceData={{
                current: 87,
                previous: 74,
                metric: "معدل الشعبية",
                sourceChannel: "انستجرام"
              }}
              className="mb-4"
            />
            
            <motion.div 
              className="flex items-center bg-white/70 rounded-xl p-3 hover:bg-white/90 transition-colors cursor-pointer"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" }}
              onClick={() => setShowDetails(!showDetails)}
            >
              <div className="bg-[#ff9d6c]/20 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-[#ff5c35]" />
              </div>
              <p className="text-xs mx-2 text-[#654321] flex-1">
                تعلم كيفية إدارة جميع جوانب مشروعك الناشئ بشكل فعال
              </p>
              
              <Button size="sm" variant="ghost" className="bg-white hover:bg-white/80 rounded-full w-6 h-6 p-0 shadow-sm">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </motion.div>
            
            {/* Expandable details section */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white/40 rounded-lg p-3 text-xs text-[#654321]">
                    <h4 className="font-medium mb-2">تفاصيل المقاييس:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>المشاهدات:</span>
                        <span className="font-medium">12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>التفاعلات:</span>
                        <span className="font-medium">4,230</span>
                      </div>
                      <div className="flex justify-between">
                        <span>معدل التحويل:</span>
                        <span className="font-medium">2.8%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularityCard;
