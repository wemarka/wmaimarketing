
import { useState, useEffect } from 'react';

export interface Competitor {
  id: string;
  name: string;
  logo?: string;
  followers: number;
  engagement: number;
  growth: number;
  postFrequency: number;
  mainPlatforms: string[];
  categories: string[];
  strengths: string[];
  weaknesses: string[];
  // Adding the missing properties needed in CompetitorDashboard and CompetitorComparison
  website: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  category?: string;
  strength?: string;
}

export interface Metric {
  category: string;
  your_brand: number;
  competitor1: number;
  competitor2: number;
  competitor3: number;
}

export const useCompetitorData = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  // Add the performanceData state for CompetitorComparison
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCompetitorData = async () => {
      try {
        // في الواقع، هذا سيكون طلب API إلى الخادم
        // لكن للعرض التوضيحي نستخدم بيانات وهمية
        
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // بيانات المنافسين
        const competitorsData: Competitor[] = [
          {
            id: '1',
            name: 'مستحضرات النقاء',
            logo: 'https://picsum.photos/seed/comp1/200/200',
            followers: 125000,
            engagement: 3.8,
            growth: 2.5,
            postFrequency: 4.2,
            mainPlatforms: ['انستجرام', 'تيك توك', 'يوتيوب'],
            categories: ['مستحضرات طبيعية', 'عناية بالبشرة'],
            strengths: ['تسويق المؤثرين', 'محتوى فيديو جذاب', 'تفاعل عالي'],
            weaknesses: ['تأخر في الرد على التعليقات', 'محتوى غير متسق'],
            // Add missing properties
            website: 'https://example.com/purity',
            score: 75,
            trend: 'up',
            change: 2.5,
            category: 'مستحضرات طبيعية',
            strength: 'high'
          },
          {
            id: '2',
            name: 'جلوسي بيوتي',
            logo: 'https://picsum.photos/seed/comp2/200/200',
            followers: 310000,
            engagement: 4.5,
            growth: 5.8,
            postFrequency: 2.8,
            mainPlatforms: ['انستجرام', 'فيسبوك', 'تويتر'],
            categories: ['مكياج', 'عناية بالشعر'],
            strengths: ['عروض ترويجية جذابة', 'صور عالية الجودة', 'تغطية إعلامية قوية'],
            weaknesses: ['أسعار مرتفعة', 'نقص في المحتوى التعليمي'],
            // Add missing properties
            website: 'https://example.com/glossy',
            score: 85,
            trend: 'up',
            change: 5.8,
            category: 'مكياج',
            strength: 'high'
          },
          {
            id: '3',
            name: 'سكين فيرست',
            logo: 'https://picsum.photos/seed/comp3/200/200',
            followers: 85000,
            engagement: 5.2,
            growth: 7.2,
            postFrequency: 5.5,
            mainPlatforms: ['يوتيوب', 'انستجرام', 'تيك توك'],
            categories: ['عناية بالبشرة', 'منتجات طبية'],
            strengths: ['محتوى علمي موثق', 'تعاون مع أطباء', 'تفاعل مجتمعي'],
            weaknesses: ['تصميم بسيط للمنشورات', 'نقص في التنوع'],
            // Add missing properties
            website: 'https://example.com/skinfirst',
            score: 80,
            trend: 'up',
            change: 7.2,
            category: 'عناية بالبشرة',
            strength: 'medium'
          },
          {
            id: '4',
            name: 'بلوسم بيوتي',
            logo: 'https://picsum.photos/seed/comp4/200/200',
            followers: 210000,
            engagement: 3.2,
            growth: -1.5,
            postFrequency: 3.1,
            mainPlatforms: ['انستجرام', 'فيسبوك'],
            categories: ['مكياج', 'عطور'],
            strengths: ['تغليف فاخر', 'منتجات حصرية', 'تصميم مميز للحملات'],
            weaknesses: ['تأخر في مواكبة الاتجاهات', 'ضعف التفاعل', 'نقص في الابتكار'],
            // Add missing properties
            website: 'https://example.com/blossom',
            score: 65,
            trend: 'down',
            change: -1.5,
            category: 'مكياج',
            strength: 'medium'
          },
          {
            id: '5',
            name: 'جرين سكين',
            logo: 'https://picsum.photos/seed/comp5/200/200',
            followers: 120000,
            engagement: 4.8,
            growth: 4.2,
            postFrequency: 2.5,
            mainPlatforms: ['انستجرام', 'تويتر', 'تيك توك'],
            categories: ['منتجات طبيعية', 'عناية بالشعر'],
            strengths: ['مكونات عضوية', 'قصص المستخدمين', 'محتوى تثقيفي جيد'],
            weaknesses: ['نطاق محدود من المنتجات', 'توفر محدود'],
            // Add missing properties
            website: 'https://example.com/greenskin',
            score: 78,
            trend: 'up',
            change: 4.2,
            category: 'منتجات طبيعية',
            strength: 'medium'
          }
        ];
        
        // بيانات المقاييس
        const metricsData: Metric[] = [
          { category: 'المتابعين (بالآلاف)', your_brand: 180, competitor1: 125, competitor2: 310, competitor3: 85 },
          { category: 'التفاعل (%)', your_brand: 4.2, competitor1: 3.8, competitor2: 4.5, competitor3: 5.2 },
          { category: 'النمو (%)', your_brand: 3.5, competitor1: 2.5, competitor2: 5.8, competitor3: 7.2 },
          { category: 'معدل النشر اليومي', your_brand: 3.8, competitor1: 4.2, competitor2: 2.8, competitor3: 5.5 },
          { category: 'حصة السوق (%)', your_brand: 22, competitor1: 18, competitor2: 35, competitor3: 12 },
          { category: 'تقييم العملاء (من 5)', your_brand: 4.5, competitor1: 4.2, competitor2: 3.8, competitor3: 4.8 }
        ];

        // بيانات أداء المنافسين لمخطط الرادار
        const performanceDataItems = [
          { category: 'محتوى', your_brand: 8, competitor1: 6, competitor2: 9 },
          { category: 'تفاعل', your_brand: 7, competitor1: 8, competitor2: 5 },
          { category: 'سعر', your_brand: 6, competitor1: 9, competitor2: 7 },
          { category: 'جودة', your_brand: 9, competitor1: 7, competitor2: 8 },
          { category: 'خدمة عملاء', your_brand: 8, competitor1: 6, competitor2: 7 },
          { category: 'توفر', your_brand: 7, competitor1: 8, competitor2: 6 }
        ];
        
        setCompetitors(competitorsData);
        setMetrics(metricsData);
        setPerformanceData(performanceDataItems);
      } catch (err: any) {
        setError(err);
        console.error("Error fetching competitor data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompetitorData();
  }, []);

  return {
    competitors,
    metrics,
    performanceData, // Add performanceData to the return value
    isLoading,
    error
  };
};
