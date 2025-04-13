
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const SchedulerSettings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم حفظ إعدادات الجدولة بنجاح",
      });
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/scheduler">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-2xl font-semibold">إعدادات الجدولة والنشر</h1>
            </div>
            <p className="text-muted-foreground">
              تخصيص إعدادات الجدولة والنشر لتناسب احتياجات عملك
            </p>
          </div>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? (
              <span>جاري الحفظ...</span>
            ) : (
              <>
                <Save className="h-4 w-4 ml-2" />
                <span>حفظ الإعدادات</span>
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="approval">سير العمل</TabsTrigger>
            <TabsTrigger value="accounts">الحسابات</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid gap-6 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الجدولة العامة</CardTitle>
                  <CardDescription>تخصيص كيفية عمل نظام الجدولة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">المنطقة الزمنية</Label>
                    <Select defaultValue="Asia/Riyadh">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="اختر المنطقة الزمنية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Riyadh">الرياض (UTC+3)</SelectItem>
                        <SelectItem value="Asia/Dubai">دبي (UTC+4)</SelectItem>
                        <SelectItem value="Asia/Baghdad">بغداد (UTC+3)</SelectItem>
                        <SelectItem value="Africa/Cairo">القاهرة (UTC+2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-format">تنسيق الوقت</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="اختر تنسيق الوقت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12 ساعة (مساءً/صباحًا)</SelectItem>
                        <SelectItem value="24h">24 ساعة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="first-day">أول يوم في الأسبوع</Label>
                    <Select defaultValue="sunday">
                      <SelectTrigger id="first-day">
                        <SelectValue placeholder="اختر أول يوم في الأسبوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saturday">السبت</SelectItem>
                        <SelectItem value="sunday">الأحد</SelectItem>
                        <SelectItem value="monday">الإثنين</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="buffer">فترة فاصلة بين المنشورات</Label>
                      <p className="text-sm text-muted-foreground">
                        ترك فترة زمنية بين المنشورات على نفس المنصة
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Input 
                        id="buffer" 
                        type="number" 
                        defaultValue="30" 
                        className="w-20 mr-2"
                      />
                      <span>دقيقة</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-schedule">جدولة تلقائية</Label>
                      <p className="text-sm text-muted-foreground">
                        جدولة المنشورات تلقائيًا في أفضل الأوقات
                      </p>
                    </div>
                    <Switch id="auto-schedule" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>أوقات النشر المفضلة</CardTitle>
                  <CardDescription>حدد أفضل أوقات النشر لكل منصة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="instagram-times">انستجرام</Label>
                    <Select defaultValue="evening">
                      <SelectTrigger id="instagram-times">
                        <SelectValue placeholder="اختر أفضل وقت للنشر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">صباحًا (8-10)</SelectItem>
                        <SelectItem value="afternoon">ظهرًا (12-2)</SelectItem>
                        <SelectItem value="evening">مساءً (6-8)</SelectItem>
                        <SelectItem value="custom">تخصيص</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facebook-times">فيسبوك</Label>
                    <Select defaultValue="afternoon">
                      <SelectTrigger id="facebook-times">
                        <SelectValue placeholder="اختر أفضل وقت للنشر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">صباحًا (8-10)</SelectItem>
                        <SelectItem value="afternoon">ظهرًا (12-2)</SelectItem>
                        <SelectItem value="evening">مساءً (6-8)</SelectItem>
                        <SelectItem value="custom">تخصيص</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tiktok-times">تيك توك</Label>
                    <Select defaultValue="evening">
                      <SelectTrigger id="tiktok-times">
                        <SelectValue placeholder="اختر أفضل وقت للنشر" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">صباحًا (8-10)</SelectItem>
                        <SelectItem value="afternoon">ظهرًا (12-2)</SelectItem>
                        <SelectItem value="evening">مساءً (6-8)</SelectItem>
                        <SelectItem value="custom">تخصيص</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="approval">
            <div className="grid gap-6 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>سير عمل الموافقات</CardTitle>
                  <CardDescription>تكوين خطوات الموافقة على المنشورات قبل النشر</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-approval">تفعيل سير عمل الموافقات</Label>
                      <p className="text-sm text-muted-foreground">
                        تتطلب جميع المنشورات موافقة قبل النشر
                      </p>
                    </div>
                    <Switch id="require-approval" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="approvers">عدد الموافقات المطلوبة</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="approvers">
                        <SelectValue placeholder="اختر عدد الموافقات المطلوبة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 موافقة</SelectItem>
                        <SelectItem value="2">2 موافقة</SelectItem>
                        <SelectItem value="3">3 موافقات</SelectItem>
                        <SelectItem value="all">جميع المراجعين</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="escalation">تصعيد الموافقات التأخيرية</Label>
                      <p className="text-sm text-muted-foreground">
                        تصعيد الطلبات التي لم تتم الموافقة عليها في الوقت المحدد
                      </p>
                    </div>
                    <Switch id="escalation" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeout">مهلة الموافقة</Label>
                    <div className="flex items-center">
                      <Input 
                        id="timeout" 
                        type="number" 
                        defaultValue="24" 
                        className="w-20 ml-2"
                      />
                      <span>ساعة</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-approve-edits">الموافقة التلقائية على التعديلات الطفيفة</Label>
                      <p className="text-sm text-muted-foreground">
                        السماح بتعديلات طفيفة بدون إعادة الموافقة
                      </p>
                    </div>
                    <Switch id="auto-approve-edits" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="self-approval">منع الموافقة الذاتية</Label>
                      <p className="text-sm text-muted-foreground">
                        لا يمكن للشخص الذي أنشأ المحتوى أن يوافق عليه
                      </p>
                    </div>
                    <Switch id="self-approval" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="accounts">
            <div className="grid gap-6 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الحسابات المرتبطة</CardTitle>
                  <CardDescription>إدارة إعدادات التكامل مع منصات التواصل الاجتماعي</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-refresh">تحديث التوكن تلقائيًا</Label>
                      <p className="text-sm text-muted-foreground">
                        تحديث رموز الوصول للحسابات تلقائيًا قبل انتهاء صلاحيتها
                      </p>
                    </div>
                    <Switch id="auto-refresh" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">جمع تحليلات المنشورات</Label>
                      <p className="text-sm text-muted-foreground">
                        جمع بيانات أداء المنشورات بعد النشر
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="hashtags">الهاشتاغات الافتراضية</Label>
                    <Input 
                      id="hashtags" 
                      placeholder="#beauty #skincare #makeup" 
                    />
                    <p className="text-xs text-muted-foreground">
                      هاشتاغات سيتم اقتراحها تلقائيًا عند إنشاء منشور جديد
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cta">دعوات الحث على التصرف الافتراضية</Label>
                    <Select defaultValue="shop">
                      <SelectTrigger id="cta">
                        <SelectValue placeholder="اختر نوع الدعوة للتصرف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shop">تسوق الآن</SelectItem>
                        <SelectItem value="learn">اكتشف المزيد</SelectItem>
                        <SelectItem value="register">سجل الآن</SelectItem>
                        <SelectItem value="contact">تواصل معنا</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="grid gap-6 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الإشعارات</CardTitle>
                  <CardDescription>إدارة إشعارات النشر والموافقات</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات طلبات الموافقة</Label>
                      <p className="text-sm text-muted-foreground">
                        إعلام المراجعين عند إرسال محتوى جديد للموافقة
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات النشر</Label>
                      <p className="text-sm text-muted-foreground">
                        إعلامك عند نشر محتوى بنجاح
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>إشعارات الفشل</Label>
                      <p className="text-sm text-muted-foreground">
                        إعلامك عند فشل نشر محتوى
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>تذكيرات المحتوى المجدول</Label>
                      <p className="text-sm text-muted-foreground">
                        إرسال تذكير قبل نشر المحتوى المجدول
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="notification-email">البريد الإلكتروني للإشعارات</Label>
                    <Input 
                      id="notification-email" 
                      placeholder="marketing@example.com" 
                    />
                    <p className="text-xs text-muted-foreground">
                      سيتم إرسال جميع إشعارات الجدولة والنشر إلى هذا البريد الإلكتروني
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SchedulerSettings;
