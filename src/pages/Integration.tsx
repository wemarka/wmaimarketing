
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Info, 
  Key, 
  Link2, 
  Settings, 
  Share2, 
  Zap,
  ShieldCheck,
  Layers,
  Globe,
  Code,
  Webhook,
  AlertCircle,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import IntegrationSettings from "@/components/integration/IntegrationSettings";
import { CodeHighlighter } from "@/components/documentation/CodeHighlighter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WebhookEventLogItem from "@/modules/marketing/components/integration/WebhookEventLogItem";
import IntegrationAnalytics from "@/modules/marketing/components/integration/IntegrationAnalytics";
import { Helmet } from "react-helmet-async";

const Integration = () => {
  const [activeTab, setActiveTab] = useState("social");
  
  const apiSampleCode = `// مثال لاستخدام واجهة برمجة التطبيقات
const fetchAnalytics = async () => {
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
    
  if (error) {
    console.error('Error fetching analytics:', error);
    return [];
  }
  
  return data;
};`;

  const webhookPayloadExample = `{
  "event_type": "content_published",
  "content_id": "post_1234",
  "timestamp": "2025-04-17T15:23:45.000Z",
  "platform": "instagram",
  "status": "success",
  "metadata": {
    "engagement_rate": 3.2,
    "likes": 423,
    "comments": 52,
    "shares": 18
  }
}`;

  return (
    <Layout>
      <Helmet>
        <title>إدارة التكاملات - سيركل</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-beauty-purple to-beauty-lightpurple bg-clip-text text-transparent">
                إعدادات التكامل
              </h1>
              <p className="text-muted-foreground mt-2">
                إدارة تكاملات النظام مع المنصات والخدمات الخارجية
              </p>
            </div>
            <Button className="gap-2 hidden md:flex">
              <Zap className="h-4 w-4" />
              تفعيل التكاملات التلقائية
            </Button>
          </div>

          <Alert className="bg-beauty-purple/10 border-beauty-purple/20 my-4">
            <AlertCircle className="h-5 w-5 text-beauty-purple" />
            <AlertDescription>
              تم تحديث واجهة برمجة التطبيقات. يرجى التحقق من آخر التغييرات في وثائق التطوير.
            </AlertDescription>
          </Alert>
          
          <Card className="border-none shadow-md mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-beauty-purple to-beauty-lightpurple h-1"></div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start rounded-none bg-card p-0 h-auto border-b">
                <TabsTrigger 
                  value="settings" 
                  className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "settings" ? "border-beauty-purple" : "border-transparent"}`}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  الإعدادات العامة
                </TabsTrigger>
                <TabsTrigger 
                  value="social" 
                  className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "social" ? "border-beauty-purple" : "border-transparent"}`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  منصات التواصل
                </TabsTrigger>
                <TabsTrigger 
                  value="api" 
                  className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "api" ? "border-beauty-purple" : "border-transparent"}`}
                >
                  <Code className="h-4 w-4 mr-2" />
                  واجهة برمجة التطبيقات
                </TabsTrigger>
                <TabsTrigger 
                  value="webhooks" 
                  className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "webhooks" ? "border-beauty-purple" : "border-transparent"}`}
                >
                  <Webhook className="h-4 w-4 mr-2" />
                  Webhooks
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "analytics" ? "border-beauty-purple" : "border-transparent"}`}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  تحليلات التكامل
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>
        </div>
        
        <Tabs 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsContent value="settings" className="animate-in fade-in-50 duration-300">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="social" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialPlatformCard 
                title="Instagram" 
                isConnected={true} 
                lastSynced="17/04/2025 14:23"
                description="مزامنة المحتوى مع حساب Instagram التجاري"
                icon="instagram"
              />
              
              <SocialPlatformCard 
                title="TikTok" 
                isConnected={false}
                description="نشر الفيديوهات على منصة TikTok"
                icon="video"
              />
              
              <SocialPlatformCard 
                title="Facebook" 
                isConnected={true}
                lastSynced="15/04/2025 09:15"
                description="نشر المحتوى على صفحة Facebook"
                icon="facebook"
              />
              
              <SocialPlatformCard 
                title="Twitter" 
                isConnected={false}
                description="مشاركة التحديثات والأخبار على Twitter"
                icon="twitter"
              />
              
              <Card className="md:col-span-2 bg-beauty-purple/5 border-dashed border-beauty-purple/30">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-beauty-purple/10 p-3 mb-4">
                    <Link2 className="h-6 w-6 text-beauty-purple" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">إضافة منصات جديدة</h3>
                  <p className="text-muted-foreground text-center mb-4 max-w-md">
                    يمكنك إضافة المزيد من منصات التواصل الاجتماعي لإدارة حملاتك التسويقية بشكل أفضل
                  </p>
                  <Button className="bg-beauty-purple hover:bg-beauty-purple/90">إضافة منصة جديدة</Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">إحصائيات منصات التواصل الاجتماعي</CardTitle>
                <CardDescription>
                  ملخص أداء المنصات المتصلة ومقارنة النتائج
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <h3 className="font-medium text-green-800 mb-1">إجمالي المتابعين</h3>
                    <p className="text-2xl font-bold text-green-700">21,200+</p>
                    <p className="text-xs text-green-600 mt-1">+5.2% في الشهر الأخير</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-1">متوسط التفاعل</h3>
                    <p className="text-2xl font-bold text-blue-700">3.8%</p>
                    <p className="text-xs text-blue-600 mt-1">+0.7% في الشهر الأخير</p>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                    <h3 className="font-medium text-purple-800 mb-1">المنشورات الشهرية</h3>
                    <p className="text-2xl font-bold text-purple-700">78</p>
                    <p className="text-xs text-purple-600 mt-1">+12% في الشهر الأخير</p>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <Button variant="outline" className="flex items-center gap-1">
                    <ArrowRight className="h-4 w-4" />
                    الانتقال إلى إدارة منصات التواصل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="animate-in fade-in-50 duration-300">
            <Card className="shadow-lg border-beauty-purple/10">
              <CardHeader className="bg-gradient-to-r from-beauty-purple/10 to-beauty-lightpurple/10">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-beauty-purple" />
                  إدارة مفاتيح API
                </CardTitle>
                <CardDescription>
                  إنشاء وإدارة مفاتيح واجهة برمجة التطبيقات للاتصال بالنظام من تطبيقات خارجية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="space-y-1">
                          <h3 className="font-medium">مفتاح API الرئيسي</h3>
                          <p className="text-xs text-muted-foreground">صلاحية كاملة للنظام</p>
                        </div>
                        <Badge className="bg-beauty-purple hover:bg-beauty-purple/90">نشط</Badge>
                      </div>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Input 
                          value="sk_live_XXxXXxxXXxXXxxXXxXXxxXX" 
                          disabled 
                          type="password" 
                          className="font-mono text-sm bg-muted/50"
                        />
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-3">
                        <div className="space-y-1">
                          <h3 className="font-medium">مفتاح API للتطوير</h3>
                          <p className="text-xs text-muted-foreground">للاختبار في بيئة التطوير</p>
                        </div>
                        <Badge variant="outline">تطوير</Badge>
                      </div>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Input 
                          value="sk_test_XXxXXxxXXxXXxxXXxXXxxXX" 
                          disabled 
                          type="password" 
                          className="font-mono text-sm bg-muted/50"
                        />
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full gap-2 bg-beauty-purple hover:bg-beauty-purple/90">
                      <Key className="h-4 w-4" />
                      إنشاء مفتاح API جديد
                    </Button>
                    
                    <Card className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">إحصائيات API</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>الطلبات اليوم:</span>
                            <span className="font-medium text-beauty-purple">158</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>الطلبات هذا الشهر:</span>
                            <span className="font-medium text-beauty-purple">1,860</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>الحد الأقصى:</span>
                            <span className="font-medium">10,000 / الشهر</span>
                          </div>
                          <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-beauty-purple" style={{ width: "18.6%" }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2 text-beauty-purple" />
                          أمان API
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">تقييد بالعنوان IP</span>
                            <Switch defaultChecked={true} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">التحقق بخطوتين</span>
                            <Switch defaultChecked={false} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">تدوير المفاتيح تلقائياً</span>
                            <Switch defaultChecked={true} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">مثال للاستخدام</h3>
                    <Button variant="ghost" className="text-xs gap-1">
                      عرض المزيد من الأمثلة
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <Card className="border shadow-sm bg-muted/30">
                    <CardContent className="p-0">
                      <CodeHighlighter code={apiSampleCode} language="javascript" />
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks" className="animate-in fade-in-50 duration-300">
            <Card className="shadow-lg border-beauty-purple/10">
              <CardHeader className="bg-gradient-to-r from-beauty-purple/10 to-beauty-lightpurple/10">
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-beauty-purple" />
                  إعداد Webhooks
                </CardTitle>
                <CardDescription>
                  إعداد نقاط نهاية لاستقبال الأحداث من النظام في الوقت الفعلي
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">عنوان URL للـ Webhook</Label>
                      <Input id="webhook-url" placeholder="https://example.com/webhook" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-secret">مفتاح السر</Label>
                      <div className="relative">
                        <Input id="webhook-secret" placeholder="whsec_XXxXXxxXXxXXxxXX" />
                        <Button variant="ghost" size="sm" className="absolute left-1 top-1/2 -translate-y-1/2 h-8">
                          توليد
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">الأحداث المفعلة:</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <WebhookEventItem event="إنشاء محتوى جديد" />
                        <WebhookEventItem event="تحديث محتوى" />
                        <WebhookEventItem event="نشر محتوى" />
                        <WebhookEventItem event="إنشاء حملة إعلانية" isEnabled={false} />
                        <WebhookEventItem event="تسجيل مستخدم" />
                        <WebhookEventItem event="تفاعل مع محتوى" isEnabled={false} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-md">سجل الأحداث الأخيرة</CardTitle>
                        <Button variant="outline" size="sm" className="gap-1">
                          <RefreshCw className="h-3.5 w-3.5" />
                          تحديث
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        <WebhookEventLogItem
                          event="نشر محتوى" 
                          timestamp="17/04/2025 15:23:45" 
                          status="success" 
                          destination="https://example.com/webhook"
                          payload={webhookPayloadExample}
                        />
                        <WebhookEventLogItem
                          event="تسجيل مستخدم" 
                          timestamp="17/04/2025 14:17:22" 
                          status="success" 
                          destination="https://example.com/webhook"
                        />
                        <WebhookEventLogItem 
                          event="تحديث محتوى" 
                          timestamp="17/04/2025 12:05:11" 
                          status="error" 
                          destination="https://example.com/webhook"
                        />
                        <WebhookEventLogItem
                          event="نشر محتوى" 
                          timestamp="16/04/2025 23:41:39" 
                          status="warning" 
                          destination="https://example.com/webhook"
                        />
                        <WebhookEventLogItem
                          event="إنشاء حملة إعلانية" 
                          timestamp="16/04/2025 16:22:05" 
                          status="success" 
                          destination="https://example.com/webhook"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end pt-4">
                    <Button variant="outline" className="ml-2 rtl:mr-2">إلغاء</Button>
                    <Button className="gap-2 bg-beauty-purple hover:bg-beauty-purple/90">
                      <Layers className="h-4 w-4" />
                      حفظ الإعدادات
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="animate-in fade-in-50 duration-300">
            <IntegrationAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const SocialPlatformCard = ({ 
  title, 
  isConnected, 
  lastSynced,
  description,
  icon
}: { 
  title: string; 
  isConnected: boolean; 
  lastSynced?: string;
  description: string;
  icon: string;
}) => {
  const getIcon = () => {
    switch(icon) {
      case "instagram":
        return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center text-white">In</div>;
      case "video":
        return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-black to-gray-700 flex items-center justify-center text-white">Tk</div>;
      case "facebook":
        return <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">Fb</div>;
      case "twitter":
        return <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">Tw</div>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md transition-all hover:shadow-lg border-beauty-purple/10">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Badge 
                variant={isConnected ? "default" : "outline"}
                className={isConnected ? "bg-beauty-purple hover:bg-beauty-purple/90" : ""}
              >
                {isConnected ? "متصل" : "غير متصل"}
              </Badge>
              {lastSynced && (
                <span className="text-xs text-muted-foreground">
                  آخر مزامنة: {lastSynced}
                </span>
              )}
            </div>
            <Button 
              variant={isConnected ? "destructive" : "default"} 
              size="sm"
              className={!isConnected ? "bg-beauty-purple hover:bg-beauty-purple/90" : ""}
            >
              {isConnected ? "فصل" : "اتصال"}
            </Button>
          </div>
          
          {isConnected && (
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm">النشر التلقائي</span>
                <Switch defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">مزامنة التعليقات</span>
                <Switch defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">تحليل البيانات</span>
                <Switch defaultChecked={true} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const WebhookEventItem = ({ 
  event, 
  isEnabled = true 
}: { 
  event: string; 
  isEnabled?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-card hover:bg-accent/50 transition-colors">
      <span className="text-sm">{event}</span>
      <Switch defaultChecked={isEnabled} />
    </div>
  );
};

export default Integration;
