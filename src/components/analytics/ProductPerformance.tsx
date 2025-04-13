
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductPerformance as ProductPerformanceType } from "../scheduler/types";

// Sample data for products
const productData: ProductPerformanceType[] = [
  {
    id: 1,
    name: "كريم مرطب يومي",
    impressions: 45000,
    engagement: 3200,
    clicks: 1800,
    conversions: 420,
    revenue: 25200
  },
  {
    id: 2,
    name: "سيروم فيتامين سي",
    impressions: 38000,
    engagement: 2900,
    clicks: 1500,
    conversions: 380,
    revenue: 30400
  },
  {
    id: 3,
    name: "مجموعة العناية بالبشرة",
    impressions: 32000,
    engagement: 2100,
    clicks: 1200,
    conversions: 310,
    revenue: 46500
  },
  {
    id: 4,
    name: "ماسك الشعر المغذي",
    impressions: 28000,
    engagement: 1800,
    clicks: 980,
    conversions: 250,
    revenue: 20000
  },
  {
    id: 5,
    name: "مجموعة العناية بالشفاه",
    impressions: 24000,
    engagement: 1500,
    clicks: 850,
    conversions: 210,
    revenue: 10500
  }
];

const ProductPerformance: React.FC = () => {
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
  
  // Calculate conversion rate
  const calculateConversionRate = (conversions: number, clicks: number): string => {
    const rate = (conversions / clicks) * 100;
    return `${rate.toFixed(1)}%`;
  };

  // Calculate averages
  const totals = productData.reduce(
    (acc, product) => {
      return {
        impressions: acc.impressions + product.impressions,
        engagement: acc.engagement + product.engagement,
        clicks: acc.clicks + product.clicks,
        conversions: acc.conversions + product.conversions,
        revenue: acc.revenue + product.revenue
      };
    },
    { impressions: 0, engagement: 0, clicks: 0, conversions: 0, revenue: 0 }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>أداء المنتجات</CardTitle>
        <CardDescription>تحليل أداء المنتجات وتأثيرها على المبيعات</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المنتج</TableHead>
              <TableHead className="text-right">المشاهدات</TableHead>
              <TableHead className="text-right">التفاعلات</TableHead>
              <TableHead className="text-right">النقرات</TableHead>
              <TableHead className="text-right">التحويلات</TableHead>
              <TableHead className="text-right">معدل التحويل</TableHead>
              <TableHead className="text-right">الإيرادات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">{formatNumber(product.impressions)}</TableCell>
                <TableCell className="text-right">{formatNumber(product.engagement)}</TableCell>
                <TableCell className="text-right">{formatNumber(product.clicks)}</TableCell>
                <TableCell className="text-right">{formatNumber(product.conversions)}</TableCell>
                <TableCell className="text-right">
                  {calculateConversionRate(product.conversions, product.clicks)}
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(product.revenue)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell className="font-medium">المجموع</TableCell>
              <TableCell className="text-right">{formatNumber(totals.impressions)}</TableCell>
              <TableCell className="text-right">{formatNumber(totals.engagement)}</TableCell>
              <TableCell className="text-right">{formatNumber(totals.clicks)}</TableCell>
              <TableCell className="text-right">{formatNumber(totals.conversions)}</TableCell>
              <TableCell className="text-right">
                {calculateConversionRate(totals.conversions, totals.clicks)}
              </TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(totals.revenue)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductPerformance;
