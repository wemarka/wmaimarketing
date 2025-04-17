
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Competitor {
  id: string;
  name: string;
  logo?: string;
  website: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface CompetitorOverviewCardProps {
  competitor: Competitor;
}

const CompetitorOverviewCard = ({ competitor }: CompetitorOverviewCardProps) => {
  const getTrendIcon = () => {
    switch (competitor.trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getChangeColor = () => {
    switch (competitor.trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return '';
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {competitor.logo && (
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img src={competitor.logo} alt={competitor.name} className="h-full w-full object-cover" />
            </div>
          )}
          <CardTitle className="text-base font-medium">{competitor.name}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <a href={competitor.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold">{competitor.score}%</div>
          <div className="flex items-center gap-1 text-sm">
            {getTrendIcon()}
            <span className={getChangeColor()}>
              {competitor.change > 0 ? '+' : ''}{competitor.change}%
            </span>
            <span className="text-muted-foreground">منذ الشهر الماضي</span>
          </div>
          
          <div className="h-4 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${competitor.score}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorOverviewCard;
