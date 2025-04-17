
import { useState, useEffect } from 'react';

interface Competitor {
  id: string;
  name: string;
  logo?: string;
  website: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  category?: string;
  strength?: string;
  engagement?: number;
}

interface Metric {
  category: string;
  your_brand: number;
  competitor1: number;
  competitor2: number;
  competitor3: number;
}

interface CompetitorDataResult {
  competitors: Competitor[];
  metrics: Metric[];
  performanceData: any[];
  isLoading: boolean;
  error: Error | null;
}

export const useCompetitorData = (): CompetitorDataResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // محاكاة طلب API مع تأخير
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // بيانات المنافسين
        const competitorsData: Competitor[] = [
          {
            id: 'competitor1',
            name: 'شركة الجمال الأولى',
            logo: '/logo1.png',
            website: 'https://example.com/competitor1',
            score: 85,
            trend: 'up',
            change: 5,
            category: 'العناية بالبشرة',
            strength: 'high',
            engagement: 4.5
          },
          {
            id: 'competitor2',
            name: 'مستحضرات التجميل الطبيعية',
            logo: '/logo2.png',
            website: 'https://example.com/competitor2',
            score: 72,
            trend: 'down',
            change: -3,
            category: 'مستحضرات التجميل',
            strength: 'medium',
            engagement: 3.5
          },
          {
            id: 'competitor3',
            name: 'بيوتي ماركت',
            logo: '/logo3.png',
            website: 'https://example.com/competitor3',
            score: 68,
            trend: 'stable',
            change: 1,
            category: 'متنوع',
            strength: 'medium',
            engagement: 3.0
          },
          {
            id: 'competitor4',
            name: 'روز كوزمتيكس',
            logo: '/logo4.png',
            website: 'https://example.com/competitor4',
            score: 60,
            trend: 'up',
            change: 8,
            category: 'المكياج',
            strength: 'low',
            engagement: 4.0
          },
        ];
        
        // بيانات المقاييس
        const metricsData: Metric[] = [
          {
            category: 'التفاعل',
            your_brand: 65,
            competitor1: 85,
            competitor2: 72,
            competitor3: 68
          },
          {
            category: 'الوصول',
            your_brand: 72,
            competitor1: 78,
            competitor2: 68,
            competitor3: 60
          },
          {
            category: 'المتابعين',
            your_brand: 80,
            competitor1: 90,
            competitor2: 65,
            competitor3: 50
          },
          {
            category: 'السمعة',
            your_brand: 85,
            competitor1: 80,
            competitor2: 75,
            competitor3: 70
          },
        ];
        
        // بيانات الأداء لمخطط الرادار
        const performanceData = [
          {
            category: 'جودة المحتوى',
            your_brand: 8,
            competitor1: 9,
            competitor2: 7,
            competitor3: 6
          },
          {
            category: 'فاعلية الإعلانات',
            your_brand: 7,
            competitor1: 8,
            competitor2: 6,
            competitor3: 5
          },
          {
            category: 'وسائل التواصل',
            your_brand: 9,
            competitor1: 6,
            competitor2: 8,
            competitor3: 7
          },
          {
            category: 'سمعة العلامة',
            your_brand: 8,
            competitor1: 9,
            competitor2: 7,
            competitor3: 6
          },
          {
            category: 'رضا العملاء',
            your_brand: 8,
            competitor1: 7,
            competitor2: 8,
            competitor3: 6
          },
        ];
        
        setCompetitors(competitorsData);
        setMetrics(metricsData);
        setPerformanceData(performanceData);
        
      } catch (err) {
        setError(err as Error);
        console.error("خطأ في جلب بيانات المنافسين:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return {
    competitors,
    metrics,
    performanceData,
    isLoading,
    error
  };
};
