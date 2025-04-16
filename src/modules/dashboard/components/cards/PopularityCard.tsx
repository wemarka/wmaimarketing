
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Target, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PerformanceIndicator from "../performance/PerformanceIndicator";

const PopularityCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-0">
        <div className="h-full bg-gradient-to-br from-[#3a7a8914] to-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="bg-[#3a7a89] p-2 rounded-md">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-xs">مؤشر نشاط الحساب</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <h3 className="text-sm font-medium text-slate-700">معدل الشعبية</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3.5 w-3.5 text-slate-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">قياس يجمع بين المشاركة والوصول والحضور على منصات التواصل الاجتماعي.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Consolidated Performance Display */}
          <PerformanceIndicator 
            title="معدل الشعبية"
            value="87°"
            previousValue="74°"
            changePercentage={17.6}
            icon={<Target className="h-4 w-4 text-[#3a7a89]" />}
            indicatorColor="bg-[#3a7a89]"
          />
          
          <div className="mb-4 mt-3">
            {/* Simplified gauge meter */}
            <div className="relative h-1 w-full">
              <div className="h-1 bg-slate-100 rounded-full w-full"></div>
              <motion.div 
                className="h-1 bg-[#3a7a89] rounded-full absolute top-0 right-0 rtl:right-auto rtl:left-0"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
              <motion.div 
                className="absolute left-3/4 rtl:right-3/4 rtl:left-auto top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white border border-[#3a7a89] rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              ></motion.div>
            </div>
          </div>
          
          <div className="space-y-3">
            <motion.div 
              className="flex items-center bg-white rounded-xl p-3 hover:bg-slate-50 transition-colors cursor-pointer"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -1 }}
              onClick={() => setShowDetails(!showDetails)}
            >
              <div className="bg-[#3a7a89]/10 rounded-full p-1.5 w-7 h-7 flex items-center justify-center">
                <Target className="h-3.5 w-3.5 text-[#3a7a89]" />
              </div>
              <p className="text-xs mx-2 text-slate-700 flex-1">
                تعلم كيفية زيادة معدل الشعبية والتفاعل مع حساباتك
              </p>
              
              <Button size="sm" variant="ghost" className="bg-white hover:bg-slate-100 rounded-full w-5 h-5 p-0">
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
                  <div className="bg-white/70 rounded-lg p-3 text-xs text-slate-700">
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
