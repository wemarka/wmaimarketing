
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Line, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AnalyticsSummary = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">الزيارات اليومية</h3>
            <motion.div 
              className="text-3xl font-bold mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              1,927
            </motion.div>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center text-emerald-600 text-sm">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>+ 11.8%</span>
              </div>
              <span className="text-xs text-muted-foreground mr-2">من الأسبوع الماضي</span>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-md p-2">
            <Line className="h-5 w-5 text-primary" />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          الزيارات تزيد بشكل مستمر، حتى أكثر مما كان في أعلى المستويات السابقة.
        </p>
        
        <div className="h-16 relative">
          {/* Simple line chart visualization */}
          <svg className="w-full h-full overflow-visible">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M0,40 C20,50 40,10 60,30 C80,50 100,20 120,10 C140,0 160,30 180,20 C200,10 220,30 240,15 C260,0 280,20 300,15"
              fill="none"
              stroke="#3a7a89"
              strokeWidth="2"
              className={cn(
                "drop-shadow-md",
                "[stroke-dasharray:1000] [stroke-dashoffset:1000]"
              )}
            />
          </svg>
          
          <div className="absolute bottom-0 right-0 bg-gradient-to-r from-transparent to-card w-1/5 h-full" />
        </div>
        
        <div className="bg-primary/5 rounded-lg p-4 mt-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Line className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-primary font-medium">شاهد تحديثات من المنصات المدعومة</p>
          </div>
          <motion.div 
            className="bg-primary/10 rounded-full p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="h-4 w-4 text-primary rotate-45" />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSummary;
