
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowUpRight, Filter, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "completed" | "draft";
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
}

const CampaignTracker = () => {
  const { t } = useTranslation();
  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "حملة مستحضرات الجمال الشتوية",
      status: "active",
      progress: 45,
      budget: 5000,
      spent: 2250,
      startDate: "2025-03-01",
      endDate: "2025-05-15"
    },
    {
      id: "2",
      name: "إطلاق منتج جديد - كريم مرطب",
      status: "active",
      progress: 70,
      budget: 3000,
      spent: 2100,
      startDate: "2025-04-01",
      endDate: "2025-04-30"
    },
    {
      id: "3",
      name: "عروض العيد",
      status: "draft",
      progress: 0,
      budget: 7000,
      spent: 0,
      startDate: "2025-05-01",
      endDate: "2025-06-15"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">نشطة</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-slate-200 text-slate-500">مكتملة</Badge>;
      case "draft":
        return <Badge variant="secondary">مسودة</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{t("dashboard.campaign.title", "الحملات التسويقية")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("dashboard.campaign.subtitle", "تتبع أداء الحملات الحالية")}</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <Filter className="h-4 w-4" />
            <span className="sr-only">تصفية</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <BarChart3 className="h-4 w-4" />
            <span className="sr-only">عرض الإحصائيات</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-md p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium flex items-center">
                    {campaign.name}
                    {campaign.status === "active" && (
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    )}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span>{new Date(campaign.startDate).toLocaleDateString('ar-EG')}</span>
                    <span>-</span>
                    <span>{new Date(campaign.endDate).toLocaleDateString('ar-EG')}</span>
                    <span>•</span>
                    <span>{getStatusBadge(campaign.status)}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>التقدم</span>
                  <span className="font-medium">{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <div>
                  <span className="text-muted-foreground">الميزانية: </span>
                  <span className="font-medium">{campaign.budget.toLocaleString()} ر.س</span>
                </div>
                <div>
                  <span className="text-muted-foreground">الإنفاق: </span>
                  <span className="font-medium">{campaign.spent.toLocaleString()} ر.س</span>
                  {campaign.status === "active" && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({Math.round((campaign.spent / campaign.budget) * 100)}%)
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-4">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            {t("dashboard.campaign.viewAll", "عرض جميع الحملات")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignTracker;
