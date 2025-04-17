
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from 'lucide-react';

export type PlatformTrend = 'up' | 'down' | 'stable';

interface PlatformCardProps {
  name: string;
  posts: number;
  engagement: number;
  followers: string;
  trend: PlatformTrend;
}

const PlatformCard = ({ name, posts, engagement, followers, trend }: PlatformCardProps) => {
  const getPlatformColor = () => {
    switch (name) {
      case 'انستغرام': return '#E1306C';
      case 'فيسبوك': return '#4267B2';
      case 'تويتر': return '#1DA1F2';
      case 'تيك توك': return '#000000';
      default: return '#6941C6';
    }
  };
  
  const getTrendBadge = () => {
    switch (trend) {
      case 'up': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+2.5%</Badge>;
      case 'down': return <Badge variant="outline" className="border-red-200 text-red-800">-1.2%</Badge>;
      case 'stable': return <Badge variant="outline" className="border-gray-200 text-gray-800">مستقر</Badge>;
      default: return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: getPlatformColor() }}
            />
            <CardTitle className="text-base font-medium">{name}</CardTitle>
          </div>
          {getTrendBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">المتابعين</span>
            <span className="text-lg font-bold">{followers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">المنشورات</span>
            <span className="text-lg font-bold">{posts}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">معدل التفاعل</span>
            <span className="text-lg font-bold">{engagement}%</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 border-dashed" 
            style={{ borderColor: getPlatformColor(), color: getPlatformColor() }}
          >
            تفاصيل المنصة
            <ArrowUpRight className="ms-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
