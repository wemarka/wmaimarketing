
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PopularityCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-0">
        <div className="h-full bg-[#f8e5d7] p-6">
          <h3 className="text-sm font-medium text-[#654321] mb-1">Popularity rate</h3>
          <div className="text-6xl font-bold text-[#333333] mb-6">87°</div>
          
          <div className="mb-6">
            {/* Gauge meter */}
            <div className="relative h-2 w-full">
              <div className="h-2 bg-gradient-to-r from-[#ff9d6c] to-[#ff5c35] rounded-full w-3/4"></div>
              <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#ff5c35] rounded-full"></div>
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
              <p className="text-xs ml-2 text-[#654321]">
                Learn insights how to manage all aspects of your startup
              </p>
              
              <Button size="sm" variant="ghost" className="ml-auto bg-white/50 hover:bg-white/80 rounded-full w-6 h-6 p-0">
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
