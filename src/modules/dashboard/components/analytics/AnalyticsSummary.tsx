
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, TrendingUp, Users, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  isPositive = true 
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className={`p-2 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold">{value}</h3>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-md text-xs ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AnalyticsSummary = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{t('analytics.summary.title', 'الخلاصة الإحصائية')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('analytics.summary.views', 'المشاهدات')}
          value="14,532"
          change="12.5%"
          icon={<Eye size={16} />}
          isPositive={true}
        />
        <StatCard
          title={t('analytics.summary.engagement', 'التفاعل')}
          value="8.7%"
          change="3.2%"
          icon={<TrendingUp size={16} />}
          isPositive={true}
        />
        <StatCard
          title={t('analytics.summary.audience', 'الجمهور')}
          value="3,642"
          change="5.1%"
          icon={<Users size={16} />}
          isPositive={true}
        />
        <StatCard
          title={t('analytics.summary.conversions', 'التحويلات')}
          value="2.4%"
          change="0.8%"
          icon={<BarChart size={16} />}
          isPositive={false}
        />
      </div>
    </div>
  );
};

export default AnalyticsSummary;
