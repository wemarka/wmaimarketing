
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisitsCard = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md h-full">
      <CardContent className="p-0">
        <div className="h-full bg-[#e6f7ff] p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-[#0c4a6e] mb-1">الزيارات الأخيرة</h3>
            <div className="bg-white/50 rounded-full py-1 px-3">
              <span className="text-xs text-[#0c4a6e]">أسبوعيًا</span>
            </div>
          </div>
          
          <div className="text-6xl font-bold text-[#333333] mb-6">1,927</div>
          
          <div className="mb-4">
            <div className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              <ArrowUp className="h-3.5 w-3.5 ml-1" />
              <span className="text-xs font-medium">12.8%</span>
            </div>
            <span className="text-sm text-gray-600 mr-2">من الأسبوع الماضي</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-[#0c4a6e]">
              الزيارات تزيد بشكل مستمر، مما يشير إلى تحسن في أداء الحملات التسويقية.
            </p>
            
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                <span className="text-xs">📊</span>
              </div>
              <p className="text-xs mr-2 text-[#0c4a6e]">
                شاهد التحليلات لمزيد من الإحصائيات التفصيلية
              </p>
              
              <Button size="sm" variant="ghost" className="mr-auto bg-white/50 hover:bg-white/80 rounded-full w-6 h-6 p-0">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitsCard;
