
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformTotals } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

interface PlatformStatsCardsProps {
  currentTotals: PlatformTotals;
  prevTotals: PlatformTotals;
  loading?: boolean;
}

const PlatformStatsCards: React.FC<PlatformStatsCardsProps> = ({
  currentTotals,
  prevTotals,
  loading = false,
}) => {
  // Calculate growth between periods
  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <Card className="bg-pink-50 border-pink-100">
        <CardContent className="p-4">
          <h3 className="text-pink-700 font-medium mb-1">انستجرام</h3>
          <div className="text-2xl font-bold">{(currentTotals.instagram / 1000).toFixed(1)}K</div>
          <div className={`text-xs mt-1 flex items-center ${
            Number(calculateGrowth(currentTotals.instagram, prevTotals.instagram)) > 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {Number(calculateGrowth(currentTotals.instagram, prevTotals.instagram)) > 0 ? '↑' : '↓'}
            {Math.abs(Number(calculateGrowth(currentTotals.instagram, prevTotals.instagram)))}%
            <span className="text-muted-foreground mr-1">من الفترة السابقة</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-4">
          <h3 className="text-blue-700 font-medium mb-1">فيسبوك</h3>
          <div className="text-2xl font-bold">{(currentTotals.facebook / 1000).toFixed(1)}K</div>
          <div className={`text-xs mt-1 flex items-center ${
            Number(calculateGrowth(currentTotals.facebook, prevTotals.facebook)) > 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {Number(calculateGrowth(currentTotals.facebook, prevTotals.facebook)) > 0 ? '↑' : '↓'}
            {Math.abs(Number(calculateGrowth(currentTotals.facebook, prevTotals.facebook)))}%
            <span className="text-muted-foreground mr-1">من الفترة السابقة</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-slate-50 border-slate-100">
        <CardContent className="p-4">
          <h3 className="text-slate-700 font-medium mb-1">تيك توك</h3>
          <div className="text-2xl font-bold">{(currentTotals.tiktok / 1000).toFixed(1)}K</div>
          <div className={`text-xs mt-1 flex items-center ${
            Number(calculateGrowth(currentTotals.tiktok, prevTotals.tiktok)) > 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {Number(calculateGrowth(currentTotals.tiktok, prevTotals.tiktok)) > 0 ? '↑' : '↓'}
            {Math.abs(Number(calculateGrowth(currentTotals.tiktok, prevTotals.tiktok)))}%
            <span className="text-muted-foreground mr-1">من الفترة السابقة</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformStatsCards;
