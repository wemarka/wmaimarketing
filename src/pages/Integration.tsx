
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
  ArrowRight
} from "lucide-react";
import IntegrationSettings from "@/components/integration/IntegrationSettings";
import { CodeHighlighter } from "@/components/documentation/CodeHighlighter";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Integration = () => {
  const [activeTab, setActiveTab] = useState("settings");
  
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

  return (
    <Layout>
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
            <TabsList className="w-full justify-start rounded-none bg-card p-0 h-auto border-b">
              <TabsTrigger 
                value="settings" 
                onClick={() => setActiveTab("settings")}
                className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "settings" ? "border-beauty-purple" : "border-transparent"}`}
              >
                <Settings className="h-4 w-4 mr-2" />
                الإعدادات العامة
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                onClick={() => setActiveTab("social")}
                className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "social" ? "border-beauty-purple" : "border-transparent"}`}
              >
                <Globe className="h-4 w-4 mr-2" />
                منصات التواصل
              </TabsTrigger>
              <TabsTrigger 
                value="api" 
                onClick={() => setActiveTab("api")}
                className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "api" ? "border-beauty-purple" : "border-transparent"}`}
              >
                <Code className="h-4 w-4 mr-2" />
                واجهة برمجة التطبيقات
              </TabsTrigger>
              <TabsTrigger 
                value="webhooks" 
                onClick={() => setActiveTab("webhooks")}
                className={`rounded-none border-b-2 px-6 py-3 data-[state=active]:border-beauty-purple data-[state=active]:bg-transparent ${activeTab === "webhooks" ? "border-beauty-purple" : "border-transparent"}`}
              >
                <Webhook className="h-4 w-4 mr-2" />
                Webhooks
              </TabsTrigger>
            </TabsList>
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
                lastSynced="13/04/2025 10:23"
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
                lastSynced="12/04/2025 15:10"
                description="نشر المحتوى على صفحة Facebook"
                icon="facebook"
              />
              
              <SocialPlatformCard 
                title="Twitter" 
                isConnected={false}
                description="مشاركة التحديثات والأخبار على Twitter"
                icon="twitter"
              />
            </div>
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
                    <Button className="w-full gap-2">
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
                            <span className="font-medium text-beauty-purple">105</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>الطلبات هذا الشهر:</span>
                            <span className="font-medium text-beauty-purple">1,250</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>الحد الأقصى:</span>
                            <span className="font-medium">10,000 / الشهر</span>
                          </div>
                          <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-beauty-purple" style={{ width: "12.5%" }}></div>
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
                      <CardTitle className="text-md">سجل الأحداث الأخيرة</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        <EventLogItem 
                          event="نشر محتوى" 
                          timestamp="13/04/2025 15:23:45" 
                          status="success" 
                          destination="https://example.com/webhook"
                        />
                        <EventLogItem 
                          event="تسجيل مستخدم" 
                          timestamp="13/04/2025 14:17:22" 
                          status="success" 
                          destination="https://example.com/webhook"
                        />
                        <EventLogItem 
                          event="تحديث محتوى" 
                          timestamp="13/04/2025 12:05:11" 
                          status="error" 
                          destination="https://example.com/webhook"
                        />
                        <EventLogItem 
                          event="نشر محتوى" 
                          timestamp="12/04/2025 23:41:39" 
                          status="success" 
                          destination="https://example.com/webhook"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end pt-4">
                    <Button variant="outline" className="ml-2 rtl:mr-2">إلغاء</Button>
                    <Button className="gap-2">
                      <Layers className="h-4 w-4" />
                      حفظ الإعدادات
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Component for social platform integration card
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Component for webhook event item
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

// Component for event log item
const EventLogItem = ({
  event,
  timestamp,
  status,
  destination
}: {
  event: string;
  timestamp: string;
  status: "success" | "error";
  destination: string;
}) => {
  return (
    <div className="flex items-center justify-between p-2 border-b last:border-0">
      <div className="flex items-center gap-2">
        {status === "success" ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Info className="h-4 w-4 text-red-500" />
        )}
        <div>
          <p className="text-sm font-medium">{event}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground truncate max-w-[140px]">{destination}</div>
    </div>
  );
};

export default Integration;
