
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, FileBarChart, ArrowRightCircle, BarChart3, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

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
  lazyLoad?: boolean;
  importance?: 'high' | 'medium' | 'low';
  isLoading?: boolean;
  onCardClick?: () => void;
}

/**
 * مكون يعرض بطاقة بيانات متكاملة مُحسّنة الأداء تربط بين المنشورات والحملات والتحليلات
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
  lazyLoad = false,
  importance = 'medium',
  isLoading = false,
  onCardClick
}) => {
  const [isVisible, setIsVisible] = useState(!lazyLoad);
  const [isDataLoaded, setIsDataLoaded] = useState(!lazyLoad);

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
  
  // استخدام Intersection Observer للتحميل البطيء
  useEffect(() => {
    if (!lazyLoad) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        
        // محاكاة تأخير التحميل حسب الأهمية
        const loadDelay = importance === 'high' ? 0 : importance === 'medium' ? 150 : 300;
        
        setTimeout(() => {
          setIsDataLoaded(true);
          observer.disconnect();
        }, loadDelay);
      }
    }, { rootMargin: '200px' });
    
    const cardElement = document.getElementById(`card-${sourceId}`);
    if (cardElement) {
      observer.observe(cardElement);
    }
    
    return () => observer.disconnect();
  }, [lazyLoad, sourceId, importance]);
  
  if (lazyLoad && !isVisible) {
    return <div id={`card-${sourceId}`} className="h-[200px]" />;
  }

  if (isLoading || (lazyLoad && !isDataLoaded)) {
    return (
      <Card id={`card-${sourceId}`} className="overflow-hidden animate-pulse">
        <CardHeader className="pb-2 pt-4">
          <div className="flex justify-between items-start">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-5 w-[100px] rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-3/4 mb-3" />
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-muted/30 p-2 rounded">
                <Skeleton className="h-3 w-12 mb-1" />
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      id={`card-${sourceId}`}
      className={`overflow-hidden hover:shadow-md transition-shadow ${onCardClick ? 'cursor-pointer' : ''}`}
      onClick={onCardClick}
      data-source-type={sourceType}
      data-source-id={sourceId}
    >
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
          <Button size="sm" variant="ghost" className="group" asChild>
            <Link to={getDetailsLink()}>
              <span className="mr-1">التفاصيل</span>
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegratedDataCard;
