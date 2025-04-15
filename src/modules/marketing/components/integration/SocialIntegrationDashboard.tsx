
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Facebook, Twitter, MessageSquare, Plus, BarChart, Clock, Share2, Settings, CheckCircle2, XCircle } from "lucide-react";
import { useSocialIntegration } from "../../hooks/useSocialIntegration";
import ConnectedAccounts from "@/components/scheduler/ConnectedAccounts";

const SocialIntegrationDashboard: React.FC = () => {
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [activeTab, setActiveTab] = useState("accounts");
  
  const {
    accounts,
    platformStats,
    isLoading,
    isConnecting,
    selectedPlatform,
    setSelectedPlatform,
    handleConnectAccount,
    handleDisconnectAccount,
    loadSuggestedPostingTimes,
    handleCrossPostContent
  } = useSocialIntegration();

  const platformIcons: { [key: string]: React.ReactNode } = {
    instagram: <Instagram className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    tiktok: <MessageSquare className="h-5 w-5" />
  };
  
  const platformColors: { [key: string]: string } = {
    instagram: "bg-pink-100 text-pink-600",
    facebook: "bg-blue-100 text-blue-600",
    twitter: "bg-sky-100 text-sky-500",
    tiktok: "bg-slate-100 text-slate-600"
  };
  
  const platformNames: { [key: string]: string } = {
    instagram: "انستجرام",
    facebook: "فيسبوك",
    twitter: "تويتر",
    tiktok: "تيك توك"
  };

  const handleAddAccount = async () => {
    if (!selectedPlatform || !accountName.trim() || !displayName.trim()) {
      return;
    }
    
    await handleConnectAccount({
      platform: selectedPlatform,
      accountName: accountName,
      profileName: displayName
    });
    
    setAddAccountOpen(false);
    setAccountName("");
    setDisplayName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">تكامل المنصات الاجتماعية</h1>
          <p className="text-muted-foreground">إدارة حساباتك على منصات التواصل الاجتماعي والاستفادة من التكامل مع النظام</p>
        </div>
        <Button onClick={() => setAddAccountOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          ربط حساب جديد
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="accounts">الحسابات المرتبطة</TabsTrigger>
          <TabsTrigger value="analytics">تحليلات الأداء</TabsTrigger>
          <TabsTrigger value="scheduling">جدولة النشر</TabsTrigger>
          <TabsTrigger value="crossposting">النشر المتعدد</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="space-y-6">
          <ConnectedAccounts />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات المنصات</CardTitle>
              <CardDescription>
                مقارنة أداء المحتوى الخاص بك عبر منصات التواصل الاجتماعي المختلفة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {platformStats.map((stat, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className={`pb-2 ${platformColors[stat.platform]}`}>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          {platformIcons[stat.platform]}
                          <span className="mr-2">{platformNames[stat.platform]}</span>
                        </CardTitle>
                        <Badge className={stat.growth >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {stat.growth > 0 ? '+' : ''}{stat.growth}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">المنشورات</p>
                          <p className="font-semibold">{stat.posts}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">التفاعل</p>
                          <p className="font-semibold">{stat.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">المتابعين</p>
                          <p className="font-semibold">{stat.followers.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="mt-6">
                <BarChart className="h-4 w-4 mr-2" />
                عرض تقرير التحليلات المفصل
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اقتراحات مواعيد النشر</CardTitle>
              <CardDescription>
                أفضل الأوقات للنشر بناءً على تحليل تفاعل الجمهور السابق
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {["instagram", "facebook", "twitter"].map((platform) => (
                  <Card key={platform} className="overflow-hidden">
                    <CardHeader className={`pb-2 ${platformColors[platform]}`}>
                      <CardTitle className="text-md flex items-center">
                        {platformIcons[platform]}
                        <span className="mr-2">{platformNames[platform]}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center p-2 bg-muted/50 rounded-md">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">السبت 10:00</span>
                        </div>
                        <div className="flex items-center p-2 bg-muted/50 rounded-md">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">الأحد 19:30</span>
                        </div>
                        <div className="flex items-center p-2 bg-muted/50 rounded-md">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">الثلاثاء 12:00</span>
                        </div>
                        <div className="flex items-center p-2 bg-muted/50 rounded-md">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">الخميس 20:00</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                جدولة منشور جديد
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crossposting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>النشر المتعدد</CardTitle>
              <CardDescription>
                انشر محتواك على جميع منصات التواصل الاجتماعي المتصلة بنقرة واحدة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">الحالة الحالية للنشر المتعدد</h3>
                  <div className="space-y-3">
                    {["instagram", "facebook", "twitter", "tiktok"].map((platform) => {
                      const isConnected = accounts.some(acc => acc.platform === platform && acc.status === "connected");
                      return (
                        <div key={platform} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full ${platformColors[platform]}`}>
                              {platformIcons[platform]}
                            </div>
                            <span className="mr-3">{platformNames[platform]}</span>
                          </div>
                          {isConnected ? (
                            <Badge className="bg-green-100 text-green-800 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              متصل
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="flex items-center">
                              <XCircle className="h-3 w-3 mr-1" />
                              غير متصل
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Share2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium">جاهز للنشر المتعدد</h3>
                      <p className="text-sm text-muted-foreground">
                        انشر محتواك على جميع المنصات المتصلة بتنسيقات مخصصة لكل منصة
                      </p>
                      <div className="pt-2">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          إنشاء منشور جديد
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">مزايا النشر المتعدد</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">توفير الوقت والجهد</h4>
                    <p className="text-sm text-muted-foreground">انشر مرة واحدة لجميع المنصات بدلاً من تكرار العمل</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">تنسيق تلقائي</h4>
                    <p className="text-sm text-muted-foreground">تنسيق المحتوى تلقائياً ليناسب كل منصة</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">تحليلات موحدة</h4>
                    <p className="text-sm text-muted-foreground">رؤية التفاعل والوصول على جميع المنصات في مكان واحد</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Account Dialog */}
      <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ربط حساب جديد</DialogTitle>
            <DialogDescription>
              اختر المنصة وأدخل معلومات الحساب للاتصال
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-3 py-4">
            {Object.keys(platformNames).map((platform) => (
              <Button
                key={platform}
                type="button"
                variant={selectedPlatform === platform ? "default" : "outline"}
                className="flex flex-col items-center justify-center gap-2 h-20"
                onClick={() => setSelectedPlatform(platform)}
              >
                <div className={`rounded-full p-2 ${selectedPlatform === platform ? "bg-white" : platformColors[platform]}`}>
                  {React.cloneElement(platformIcons[platform] as React.ReactElement, {
                    className: `h-5 w-5 ${selectedPlatform === platform ? "text-primary-foreground" : ""}`
                  })}
                </div>
                <span className="text-xs">{platformNames[platform]}</span>
              </Button>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">اسم المستخدم</Label>
              <Input
                id="accountName"
                placeholder="مثال: @beauty_brand"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName">الاسم المعروض</Label>
              <Input
                id="displayName"
                placeholder="مثال: Beauty Brand"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAccountOpen(false)}>إلغاء</Button>
            <Button 
              onClick={handleAddAccount} 
              disabled={!selectedPlatform || !accountName.trim() || !displayName.trim() || isConnecting}
            >
              {isConnecting ? "جاري الربط..." : "ربط الحساب"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialIntegrationDashboard;
