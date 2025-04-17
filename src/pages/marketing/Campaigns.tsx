
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, CalendarRange, Layers, Notebook } from "lucide-react";
import { fetchCampaigns } from "@/lib/supabase/models";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import CampaignPerformance from "@/components/analytics/CampaignPerformance";
import { motion } from "framer-motion";

const MarketingCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadCampaigns = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const campaignsData = await fetchCampaigns(user.id);
        setCampaigns(campaignsData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        toast({
          title: "خطأ في جلب الحملات",
          description: "حدث خطأ أثناء جلب بيانات الحملات التسويقية",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadCampaigns();
  }, [user, toast]);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <Layout>
      <Helmet>
        <title>الحملات التسويقية - سيركل</title>
      </Helmet>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">الحملات التسويقية</h1>
            <p className="text-muted-foreground">إدارة وتتبع الحملات التسويقية المختلفة</p>
          </div>
          <Button className="gap-1">
            <PlusCircle className="h-4 w-4" /> حملة جديدة
          </Button>
        </div>

        <Tabs defaultValue="active">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="active">الحملات النشطة</TabsTrigger>
              <TabsTrigger value="upcoming">الحملات القادمة</TabsTrigger>
              <TabsTrigger value="past">الحملات السابقة</TabsTrigger>
              <TabsTrigger value="all">جميع الحملات</TabsTrigger>
            </TabsList>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">جاري تحميل البيانات...</p>
              </div>
            ) : campaigns.length > 0 ? (
              <TabsContent value="active">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {campaigns
                    .filter(campaign => campaign.status === "active")
                    .map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
              </TabsContent>
            ) : (
              <div className="py-16 text-center">
                <div className="bg-muted/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <CalendarRange className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">لا توجد حملات بعد</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                  ابدأ بإنشاء حملتك التسويقية الأولى لمتابعة أداء منشوراتك وقياس نتائجها
                </p>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-1" /> إنشاء حملة جديدة
                </Button>
              </div>
            )}
          </motion.div>
        </Tabs>
        
        {/* عرض أداء الحملات من التحليلات */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">أداء الحملات</h2>
          <Card>
            <CardHeader>
              <CardTitle>أداء الحملات التسويقية</CardTitle>
            </CardHeader>
            <CardContent>
              <CampaignPerformance />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// مكون لعرض بطاقة الحملة
const CampaignCard = ({ campaign }) => {
  const startDate = new Date(campaign.start_date).toLocaleDateString('ar-EG');
  const endDate = new Date(campaign.end_date).toLocaleDateString('ar-EG');
  
  // حساب نسبة تقدم الحملة
  const now = new Date();
  const start = new Date(campaign.start_date);
  const end = new Date(campaign.end_date);
  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const progress = Math.min(Math.max(Math.floor((elapsed / total) * 100), 0), 100);
  
  // تحديد لون الحالة
  const getStatusColor = () => {
    switch (campaign.status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "planned": return "bg-amber-100 text-amber-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{campaign.name}</h3>
            <div className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor()}`}>
              {campaign.status === "active" ? "نشطة" : 
               campaign.status === "completed" ? "مكتملة" : 
               campaign.status === "planned" ? "مخططة" : campaign.status}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{campaign.description}</p>
          <div className="text-xs text-muted-foreground mb-2">
            {startDate} - {endDate}
          </div>
          
          {/* شريط التقدم */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-3">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{progress}% مكتمل</span>
            <span>{campaign.budget.toLocaleString()} ر.س</span>
          </div>
        </div>
        
        <div className="border-t p-3 flex justify-between items-center bg-muted/20">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Notebook className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs">
              {campaign.posts_count?.[0]?.count || 0} منشور
            </span>
          </div>
          <Button variant="secondary" size="sm" className="h-8">التفاصيل</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingCampaigns;
