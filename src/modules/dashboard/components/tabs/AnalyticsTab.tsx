
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";

const AnalyticsTab = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("dashboard.analytics.title", "التحليلات")}</h2>
      </div>
      
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-0">
          <AnalyticsDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
