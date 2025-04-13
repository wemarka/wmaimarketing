
import React from "react";
import Layout from "@/components/layout/Layout";
import FeatureCard from "@/components/dashboard/FeatureCard";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingPosts from "@/components/dashboard/UpcomingPosts";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Image, 
  FileText, 
  Video, 
  CalendarDays,
  BarChart,
  Eye, 
  Heart,
  MousePointerClick
} from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1>لوحة التحكم</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            منصة التسويق المتكاملة المدعومة بالذكاء الاصطناعي لمنتجات التجميل
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Eye className="h-5 w-5 text-beauty-purple" />}
            title="المشاهدات"
            value="15.2K"
            change="12%"
            positive={true}
          />
          <StatCard
            icon={<Heart className="h-5 w-5 text-beauty-pink" />}
            title="معدل التفاعل"
            value="4.8%"
            change="0.5%"
            positive={true}
          />
          <StatCard
            icon={<MousePointerClick className="h-5 w-5 text-beauty-gold" />}
            title="معدل التحويل"
            value="2.1%"
            change="0.2%"
            positive={false}
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">المميزات</h2>
          <Button variant="outline">عرض الكل</Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            icon={<Upload className="h-5 w-5" />}
            title="تحليل صور المنتجات"
            description="قم بتحميل صور المنتجات واحصل على تحليل الذكاء الاصطناعي للألوان والزوايا وتفاصيل المنتج."
            href="/image-upload"
            iconColor="bg-beauty-pink/20 text-beauty-pink"
          />
          <FeatureCard
            icon={<Image className="h-5 w-5" />}
            title="إنشاء الإعلانات"
            description="إنشاء صور تسويقية مذهلة مع خلفيات وأنماط قابلة للتخصيص."
            href="/ad-generator"
            iconColor="bg-beauty-purple/20 text-beauty-purple"
          />
          <FeatureCard
            icon={<FileText className="h-5 w-5" />}
            title="إنشاء المحتوى"
            description="توليد تعليقات وهاشتاجات بعدة لغات لمختلف منصات التواصل الاجتماعي."
            href="/content-creator"
            iconColor="bg-beauty-gold/20 text-beauty-gold"
          />
          <FeatureCard
            icon={<Video className="h-5 w-5" />}
            title="إنشاء الفيديوهات"
            description="إنشاء فيديوهات تسويقية قصيرة مع نصوص متحركة وتأثيرات وموسيقى."
            href="/video-generator"
            iconColor="bg-blue-100 text-blue-600"
          />
          <FeatureCard
            icon={<CalendarDays className="h-5 w-5" />}
            title="جدولة المحتوى"
            description="جدولة ونشر المحتوى الخاص بك على العديد من منصات التواصل الاجتماعي."
            href="/scheduler"
            iconColor="bg-green-100 text-green-700"
          />
          <FeatureCard
            icon={<BarChart className="h-5 w-5" />}
            title="تحليلات الأداء"
            description="تتبع مقاييس المشاركة والوصول والتحويل لحملاتك التسويقية."
            href="/analytics"
            iconColor="bg-purple-100 text-purple-700"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <RecentActivity />
          <UpcomingPosts />
        </div>
        
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="bg-beauty-purple/10 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">الترقية إلى النسخة الاحترافية</h3>
                <p className="text-muted-foreground">
                  احصل على إمكانية توليد محتوى غير محدود، وتحليلات متقدمة، ودعم ذو أولوية
                </p>
              </div>
              <Button>الترقية الآن</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t divide-x">
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold mb-1">+50</p>
              <p className="text-sm text-muted-foreground">قالب ذكاء اصطناعي</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold mb-1">غير محدود</p>
              <p className="text-sm text-muted-foreground">إنشاء محتوى</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-2xl font-semibold mb-1">أولوية</p>
              <p className="text-sm text-muted-foreground">الدعم والتحديثات</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
