
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Image, Video, FileImage, FileText, TrendingUp, BadgePlus } from "lucide-react";

interface MediaPerformanceCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  total: number;
  change: number;
  color: string;
}

const MediaPerformanceCard: React.FC<MediaPerformanceCardProps> = ({
  title,
  icon,
  value,
  total,
  change,
  color
}) => {
  const percentage = (value / total) * 100;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div 
              className={`mr-3 p-2 rounded-md`} 
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-2xl font-semibold">{value.toLocaleString()}</p>
            </div>
          </div>
          <div className={`flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            <span className="text-xs">{change > 0 ? '+' : ''}{change}%</span>
          </div>
        </div>
        <Progress value={percentage} className="h-1" />
        <p className="text-xs text-muted-foreground mt-2 text-center">{percentage.toFixed(1)}% من إجمالي المنشورات</p>
      </CardContent>
    </Card>
  );
};

export const MediaTypePerformance: React.FC = () => {
  const mediaTypes = [
    {
      title: "صور",
      icon: <Image className="h-4 w-4" />,
      value: 427,
      total: 854,
      change: 12.5,
      color: "#9b87f5"
    },
    {
      title: "فيديو",
      icon: <Video className="h-4 w-4" />,
      value: 216,
      total: 854,
      change: 18.7,
      color: "#D946EF"
    },
    {
      title: "كاروسيل",
      icon: <FileImage className="h-4 w-4" />,
      value: 184,
      total: 854,
      change: 7.2,
      color: "#F59E0B"
    },
    {
      title: "بدون وسائط",
      icon: <FileText className="h-4 w-4" />,
      value: 27,
      total: 854,
      change: -3.1,
      color: "#6366F1"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {mediaTypes.map((type, index) => (
        <MediaPerformanceCard
          key={index}
          title={type.title}
          icon={type.icon}
          value={type.value}
          total={type.total}
          change={type.change}
          color={type.color}
        />
      ))}
    </div>
  );
};

export default MediaTypePerformance;
