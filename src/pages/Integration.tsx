
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, Info, Key, Link2, Settings, Share2 } from "lucide-react";
import IntegrationSettings from "@/components/integration/IntegrationSettings";
import { CodeHighlighter } from "@/components/documentation/CodeHighlighter";

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
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">إعدادات التكامل</h1>
          <p className="text-muted-foreground">
            إدارة تكاملات النظام مع المنصات والخدمات الخارجية
          </p>
        </div>
        
        <Tabs 
          defaultValue="settings" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="settings">الإعدادات العامة</TabsTrigger>
            <TabsTrigger value="social">منصات التواصل</TabsTrigger>
            <TabsTrigger value="api">واجهة برمجة التطبيقات</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="social">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SocialPlatformCard 
                title="Instagram" 
                isConnected={true} 
                lastSynced="13/04/2025 10:23"
                description="مزامنة المحتوى مع حساب Instagram التجاري"
              />
              
              <SocialPlatformCard 
                title="TikTok" 
                isConnected={false}
                description="نشر الفيديوهات على منصة TikTok"
              />
              
              <SocialPlatformCard 
                title="Facebook" 
                isConnected={true}
                lastSynced="12/04/2025 15:10"
                description="نشر المحتوى على صفحة Facebook"
              />
              
              <SocialPlatformCard 
                title="Twitter" 
                isConnected={false}
                description="مشاركة التحديثات والأخبار على Twitter"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-beauty-purple" />
                  إدارة مفاتيح API
                </CardTitle>
                <CardDescription>
                  إنشاء وإدارة مفاتيح واجهة برمجة التطبيقات للاتصال بالنظام من تطبيقات خارجية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium text-sm">مفتاح API الرئيسي</h3>
                        <p className="text-xs text-muted-foreground">صلاحية كاملة للنظام</p>
                      </div>
                      <Badge>نشط</Badge>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Input 
                        value="sk_live_XXxXXxxXXxXXxxXXxXXxxXX" 
                        disabled 
                        type="password" 
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="space-y-1">
                        <h3 className="font-medium text-sm">مفتاح API للتطوير</h3>
                        <p className="text-xs text-muted-foreground">للاختبار في بيئة التطوير</p>
                      </div>
                      <Badge variant="outline">تطوير</Badge>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Input 
                        value="sk_test_XXxXXxxXXxXXxxXXxXXxxXX" 
                        disabled 
                        type="password" 
                        className="font-mono text-sm"
                      />
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full">
                      إنشاء مفتاح API جديد
                    </Button>
                    
                    <div className="border rounded-md p-4 space-y-3">
                      <h3 className="font-medium text-sm">إحصائيات API</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>الطلبات اليوم:</span>
                          <span className="font-medium">105</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>الطلبات هذا الشهر:</span>
                          <span className="font-medium">1,250</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>الحد الأقصى:</span>
                          <span className="font-medium">10,000 / الشهر</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-medium">مثال للاستخدام</h3>
                  <CodeHighlighter code={apiSampleCode} language="javascript" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-beauty-purple" />
                  إعداد Webhooks
                </CardTitle>
                <CardDescription>
                  إعداد نقاط نهاية لاستقبال الأحداث من النظام في الوقت الفعلي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">عنوان URL للـ Webhook</Label>
                      <Input id="webhook-url" placeholder="https://example.com/webhook" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-secret">مفتاح السر</Label>
                      <Input id="webhook-secret" placeholder="whsec_XXxXXxxXXxXXxxXX" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">الأحداث المفعلة:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      <WebhookEventItem event="إنشاء محتوى جديد" />
                      <WebhookEventItem event="تحديث محتوى" />
                      <WebhookEventItem event="نشر محتوى" />
                      <WebhookEventItem event="إنشاء حملة إعلانية" isEnabled={false} />
                      <WebhookEventItem event="تسجيل مستخدم" />
                      <WebhookEventItem event="تفاعل مع محتوى" isEnabled={false} />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button className="ml-2 rtl:mr-2">حفظ الإعدادات</Button>
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
  description 
}: { 
  title: string; 
  isConnected: boolean; 
  lastSynced?: string;
  description: string;
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Badge variant={isConnected ? "default" : "outline"}>
                {isConnected ? "متصل" : "غير متصل"}
              </Badge>
              {lastSynced && (
                <span className="text-xs text-muted-foreground">
                  آخر مزامنة: {lastSynced}
                </span>
              )}
            </div>
            <Button variant={isConnected ? "destructive" : "default"} size="sm">
              {isConnected ? "فصل" : "اتصال"}
            </Button>
          </div>
          
          {isConnected && (
            <div className="space-y-2">
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
    <div className="flex items-center justify-between border rounded-md p-2">
      <span className="text-sm">{event}</span>
      <Switch defaultChecked={isEnabled} />
    </div>
  );
};

export default Integration;
