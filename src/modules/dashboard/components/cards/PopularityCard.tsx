
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PopularityCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-0">
        <div className="h-full bg-[#f8e5d7] p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-[#654321] mb-1">Popularity rate</h3>
            <div className="bg-white/50 rounded-full py-1 px-3">
              <span className="text-xs text-[#654321]">Daily</span>
            </div>
          </div>
          
          <motion.div 
            className="text-6xl font-bold text-[#333333] mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            87°
          </motion.div>
          
          <div className="mb-6">
            {/* Gauge meter */}
            <div className="relative h-2 w-full">
              <div className="h-2 bg-gray-200 rounded-full w-full"></div>
              <motion.div 
                className="h-2 bg-gradient-to-r from-[#ff9d6c] to-[#ff5c35] rounded-full absolute top-0 left-0"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
              <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#ff5c35] rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-[#654321]">
              Your Rate has increased because of your recent update activity. <span className="font-semibold">Keep moving</span> forward and get more points!
            </p>
            
            <div className="flex items-center">
              <div className="bg-[#ff9d6c]/20 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <span className="text-xs">🚀</span>
              </div>
              <p className="text-xs mr-2 text-[#654321] flex-1">
                Learn insights how to manage all aspects of your startup
              </p>
              
              <Button size="sm" variant="ghost" className="bg-white/50 hover:bg-white/80 rounded-full w-6 h-6 p-0">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularityCard;
