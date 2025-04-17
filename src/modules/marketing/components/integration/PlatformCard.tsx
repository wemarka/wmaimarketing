
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Facebook, Instagram, Twitter, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformCardProps {
  name: string;
  status: string;
  platform: string;
  accountName: string;
  posts: number;
  engagement: number;
  followers: string;
  trend: 'up' | 'down' | 'stable';
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  name,
  status,
  platform,
  accountName,
  posts,
  engagement,
  followers,
  trend
}) => {
  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'tiktok':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
            <path d="M15 8c0 1.5-.5 3-2 4"></path>
            <path d="M21 8v8a5 5 0 0 1-5 5h-4"></path>
            <path d="M12 16v-8a5 5 0 0 1 5-5h0"></path>
          </svg>
        );
      default:
        return <Facebook className="h-5 w-5" />;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden",
      status === 'غير متصل' && "opacity-70"
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getIcon()}
              <h3 className="font-semibold">{name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{accountName}</p>
          </div>
          <Badge
            variant={status === 'متصل' ? "outline" : "secondary"}
            className={cn(
              "px-2 py-0.5",
              status === 'متصل' ? "text-emerald-500 border-emerald-200 bg-emerald-50" : ""
            )}
          >
            {status}
          </Badge>
        </div>

        {status === 'متصل' ? (
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="space-y-1">
              <p className="text-lg font-semibold">{posts}</p>
              <p className="text-xs text-muted-foreground">منشورات</p>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold">{engagement}%</p>
              <p className="text-xs text-muted-foreground">تفاعل</p>
            </div>
            <div className="space-y-1 flex flex-col items-center">
              <div className="flex items-center">
                <p className="text-lg font-semibold">{followers}</p>
                {getTrendIcon()}
              </div>
              <p className="text-xs text-muted-foreground">متابعين</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 py-2">
            <button className="w-full py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium">
              ربط الحساب
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
