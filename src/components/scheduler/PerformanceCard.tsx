
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PerformanceCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Engagement Rate</span>
              <span className="text-sm font-medium">4.2%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-beauty-purple rounded-full" style={{ width: "42%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Click-through Rate</span>
              <span className="text-sm font-medium">2.8%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-beauty-gold rounded-full" style={{ width: "28%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Conversion Rate</span>
              <span className="text-sm font-medium">1.5%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-beauty-pink rounded-full" style={{ width: "15%" }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
