
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CampaignPerformance as CampaignPerformanceType } from "../scheduler/types";

// Sample data for campaigns
const campaignData: CampaignPerformanceType[] = [
  {
    id: 1,
    name: "حملة عيد الفطر",
    startDate: "2025-03-01",
    endDate: "2025-04-05",
    budget: 5000,
    spent: 4800,
    impressions: 125000,
    engagement: 8700,
    conversions: 320,
    roi: 2.8
  },
  {
    id: 2,
    name: "إطلاق منتج جديد",
    startDate: "2025-03-15",
    endDate: "2025-04-15",
    budget: 8000,
    spent: 7200,
    impressions: 210000,
    engagement: 15400,
    conversions: 580,
    roi: 3.5
  },
  {
    id: 3,
    name: "حملة الصيف",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    budget: 12000,
    spent: 3500,
    impressions: 75000,
    engagement: 5600,
    conversions: 190,
    roi: 2.1
  },
];

const CampaignPerformance: React.FC = () => {
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };
  
  // Calculate and format percentage
  const calculatePercentage = (spent: number, budget: number): string => {
    const percentage = (spent / budget) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  // ROI color based on value
  const getRoiColor = (roi: number): string => {
    if (roi >= 3) return "text-green-600";
    if (roi >= 2) return "text-blue-600";
    if (roi >= 1) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>أداء الحملات التسويقية</CardTitle>
        <CardDescription>تحليل الحملات الجارية والمنتهية</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم الحملة</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الميزانية/الإنفاق</TableHead>
              <TableHead>المشاهدات</TableHead>
              <TableHead>التفاعلات</TableHead>
              <TableHead>التحويلات</TableHead>
              <TableHead>العائد على الاستثمار</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignData.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">
                  {campaign.name}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{new Date(campaign.startDate).toLocaleDateString('ar-SA')}</p>
                    <p className="text-muted-foreground">إلى {new Date(campaign.endDate).toLocaleDateString('ar-SA')}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</p>
                    <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-beauty-purple rounded-full" 
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-right mt-0.5">
                      {calculatePercentage(campaign.spent, campaign.budget)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {formatNumber(campaign.impressions)}
                </TableCell>
                <TableCell>
                  {formatNumber(campaign.engagement)}
                </TableCell>
                <TableCell>
                  {formatNumber(campaign.conversions)}
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${getRoiColor(campaign.roi)}`}>
                    {campaign.roi}x
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CampaignPerformance;
