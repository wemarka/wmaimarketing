
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductionCost } from "../scheduler/types";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// بيانات توضيحية
const productionCostData: ProductionCost[] = [
  {
    id: 1,
    campaignName: "حملة عيد الفطر",
    productionCost: 3500,
    marketingBudget: 5000,
    actualSpent: 4800,
    revenue: 15000,
    roi: 3.1,
    impressions: 125000,
    conversions: 320
  },
  {
    id: 2,
    campaignName: "إطلاق منتج جديد",
    productionCost: 5000,
    marketingBudget: 8000,
    actualSpent: 7200,
    revenue: 32000,
    roi: 4.4,
    impressions: 210000,
    conversions: 580
  },
  {
    id: 3,
    campaignName: "حملة الصيف",
    productionCost: 4200,
    marketingBudget: 12000,
    actualSpent: 3500,
    revenue: 9500,
    roi: 2.7,
    impressions: 75000,
    conversions: 190
  },
  {
    id: 4,
    campaignName: "عروض نهاية العام",
    productionCost: 2800,
    marketingBudget: 7000,
    actualSpent: 6900,
    revenue: 18500,
    roi: 2.7,
    impressions: 95000,
    conversions: 320
  }
];

const ProductionCostAnalysis: React.FC = () => {
  const [view, setView] = useState<string>("table");
  
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
  
  // Calculate cost per conversion
  const calculateCostPerConversion = (spent: number, conversions: number): string => {
    const cpc = conversions > 0 ? spent / conversions : 0;
    return formatCurrency(cpc);
  };

  // Calculate cost effectiveness score
  const calculateEffectivenessScore = (roi: number): number => {
    if (roi >= 4) return 5;
    if (roi >= 3) return 4;
    if (roi >= 2) return 3;
    if (roi >= 1) return 2;
    return 1;
  };
  
  // Prepare chart data
  const chartData = productionCostData.map(item => ({
    name: item.campaignName,
    'تكلفة الإنتاج': item.productionCost,
    'الإنفاق الفعلي': item.actualSpent,
    'الإيرادات': item.revenue
  }));

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle>تحليل تكلفة الإنتاج وفعالية الحملات</CardTitle>
          <CardDescription>تحليل مقارن للتكاليف والعوائد للحملات التسويقية</CardDescription>
        </div>
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر طريقة العرض" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="table">جدول</SelectItem>
            <SelectItem value="chart">رسم بياني</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {view === "table" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الحملة</TableHead>
                <TableHead className="text-right">تكلفة الإنتاج</TableHead>
                <TableHead className="text-right">ميزانية التسويق</TableHead>
                <TableHead className="text-right">الإنفاق الفعلي</TableHead>
                <TableHead className="text-right">الإيرادات</TableHead>
                <TableHead className="text-right">تكلفة التحويل</TableHead>
                <TableHead className="text-right">العائد على الاستثمار</TableHead>
                <TableHead className="text-right">مؤشر الفعالية</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productionCostData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.campaignName}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.productionCost)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.marketingBudget)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.actualSpent)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.revenue)}</TableCell>
                  <TableCell className="text-right">{calculateCostPerConversion(item.actualSpent, item.conversions)}</TableCell>
                  <TableCell className="text-right font-medium">{item.roi.toFixed(1)}x</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < calculateEffectivenessScore(item.roi) ? 'bg-beauty-purple' : 'bg-muted'
                          }`} 
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-medium">
                <TableCell>المتوسط</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(
                    productionCostData.reduce((sum, item) => sum + item.productionCost, 0) / productionCostData.length
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(
                    productionCostData.reduce((sum, item) => sum + item.marketingBudget, 0) / productionCostData.length
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(
                    productionCostData.reduce((sum, item) => sum + item.actualSpent, 0) / productionCostData.length
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(
                    productionCostData.reduce((sum, item) => sum + item.revenue, 0) / productionCostData.length
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {calculateCostPerConversion(
                    productionCostData.reduce((sum, item) => sum + item.actualSpent, 0),
                    productionCostData.reduce((sum, item) => sum + item.conversions, 0)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {(productionCostData.reduce((sum, item) => sum + item.roi, 0) / productionCostData.length).toFixed(1)}x
                </TableCell>
                <TableCell className="text-right">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Bar dataKey="تكلفة الإنتاج" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="الإنفاق الفعلي" fill="#D946EF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="الإيرادات" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductionCostAnalysis;
