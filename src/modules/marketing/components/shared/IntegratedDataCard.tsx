
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, FileBarChart, ArrowRightCircle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IntegratedDataCardProps {
  title: string;
  description: string;
  sourceType: 'post' | 'campaign' | 'analytics' | 'webhook';
  sourceId: string;
  metrics?: {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  relatedItems?: {
    id: string;
    name: string;
    type: 'post' | 'campaign' | 'webhook' | 'analytics';
  }[];
  status?: string;
  date?: string;
  analyticsUrl?: string;
}

/**
 * مكون يعرض بطاقة بيانات متكاملة تربط بين المنشورات والحملات والتحليلات
 */
const IntegratedDataCard: React.FC<IntegratedDataCardProps> = ({
  title,
  description,
  sourceType,
  sourceId,
  metrics = [],
  relatedItems = [],
  status,
  date,
  analyticsUrl,
}) => {
  // تحديد أيقونة ولون المصدر
  const getSourceIcon = () => {
    switch (sourceType) {
      case 'post': return <FileBarChart className="h-4 w-4" />;
      case 'campaign': return <BarChart3 className="h-4 w-4" />;
      case 'analytics': return <ArrowUpRight className="h-4 w-4" />;
      case 'webhook': return <ArrowRightCircle className="h-4 w-4" />;
      default: return <FileBarChart className="h-4 w-4" />;
    }
  };
  
  const getSourceColor = () => {
    switch (sourceType) {
      case 'post': return "bg-blue-100 text-blue-800";
      case 'campaign': return "bg-purple-100 text-purple-800";
      case 'analytics': return "bg-emerald-100 text-emerald-800";
      case 'webhook': return "bg-amber-100 text-amber-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };
  
  // تحديد رابط تفاصيل التحليلات
  const getDetailsLink = () => {
    if (analyticsUrl) return analyticsUrl;
    
    switch (sourceType) {
      case 'post': return `/content/posts/${sourceId}`;
      case 'campaign': return `/marketing/campaigns/${sourceId}`;
      case 'analytics': return `/analytics?source=${sourceId}`;
      case 'webhook': return `/marketing/integrations/webhooks/${sourceId}`;
      default: return '#';
    }
  };
  
  // تنسيق اتجاه التغير
  const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return "text-emerald-600";
      case 'down': return "text-red-600";
      default: return "text-slate-600";
    }
  };
  
  // تنسيق أيقونة الاتجاه
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="outline" className={getSourceColor()}>
            <div className="flex items-center gap-1">
              {getSourceIcon()}
              <span>{sourceType === 'post' ? 'منشور' : 
                     sourceType === 'campaign' ? 'حملة' :
                     sourceType === 'analytics' ? 'تحليلات' :
                     'ويب هوك'}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        
        {/* المقاييس */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-muted/30 p-2 rounded">
                <div className="text-xs text-muted-foreground">{metric.label}</div>
                <div className="font-medium">{metric.value}</div>
                {metric.change && (
                  <div className={`text-xs flex items-center gap-0.5 ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                    {metric.change}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* العناصر المرتبطة */}
        {relatedItems.length > 0 && (
          <div className="mt-3">
            <div className="text-xs text-muted-foreground mb-1">العناصر المرتبطة</div>
            <div className="flex flex-wrap gap-1">
              {relatedItems.map((item) => (
                <Badge key={item.id} variant="secondary" className="text-xs">
                  {item.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {status && (
              <Badge variant="outline" className="h-5 px-1 text-xs">
                {status}
              </Badge>
            )}
            {date && <span>{date}</span>}
          </div>
          <Button size="sm" variant="ghost" asChild>
            <Link to={getDetailsLink()}>
              التفاصيل
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegratedDataCard;
