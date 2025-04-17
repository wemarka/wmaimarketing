
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompetitorData } from '@/modules/marketing/hooks/useCompetitorData';
import CompetitorOverviewCard from './CompetitorOverviewCard';
import CompetitorMetricsChart from './CompetitorMetricsChart';
import CompetitorActivityFeed from './CompetitorActivityFeed';
import TopCompetitorsTable from './TopCompetitorsTable';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

const CompetitorDashboard = () => {
  const { competitors, metrics, isLoading, error } = useCompetitorData();
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>خطأ في تحميل البيانات</AlertTitle>
        <AlertDescription>
          حدثت مشكلة أثناء تحميل بيانات المنافسين. الرجاء المحاولة مرة أخرى.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitors.slice(0, 3).map((competitor) => (
              <CompetitorOverviewCard key={competitor.id} competitor={competitor} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
                </CardHeader>
                <CardContent>
                  <CompetitorMetricsChart metrics={metrics} />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>آخر النشاطات</CardTitle>
                </CardHeader>
                <CardContent>
                  <CompetitorActivityFeed />
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>أهم المنافسين</CardTitle>
            </CardHeader>
            <CardContent>
              <TopCompetitorsTable competitors={competitors} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CompetitorDashboard;
