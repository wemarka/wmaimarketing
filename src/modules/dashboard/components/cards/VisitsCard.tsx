
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisitsCard = () => {
  return (
    <Card className="overflow-hidden border-none">
      <CardContent className="p-0">
        <div className="h-full bg-gradient-to-r from-[#3a7a89] to-[#5ca7b6] p-6 text-white relative flex justify-between">
          <div>
            <h3 className="text-sm font-medium opacity-80 mb-1">Visits for today</h3>
            <div className="text-6xl font-bold mb-6">824</div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 rounded p-1 w-8 h-8 flex items-center justify-center">
                  <span className="text-xs">📊</span>
                </div>
                <div>
                  <p className="text-xs font-medium opacity-70">Popularity</p>
                  <p className="text-xl font-semibold">93</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 rounded p-1 w-8 h-8 flex items-center justify-center">
                  <span className="text-xs">📈</span>
                </div>
                <div>
                  <p className="text-xs font-medium opacity-70">Growth rate</p>
                  <p className="text-xl font-semibold">4.7</p>
                </div>
              </div>
            </div>
            
            <Button className="mt-6 bg-[#1c5966] hover:bg-[#164652] text-white flex items-center gap-2">
              <span>VIEW FULL STATISTIC</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <img 
              src="/lovable-uploads/d77ed891-93f6-4936-8db3-313eefe500ad.png" 
              alt="Illustration" 
              className="w-48 h-48 object-contain opacity-80"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitsCard;
