
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Database, ShoppingBag, BarChart, Settings, Globe, RefreshCw } from "lucide-react";

const IntegrationSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">إعدادات التكامل والتوسع</h1>
          <p className="text-muted-foreground">ربط المنصة مع أنظمة الشركة الأخرى وتخصيص الإعدادات</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          تحديث حالة الاتصال
        </Button>
      </div>
      
      <Tabs defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">
            <ShoppingBag className="h-4 w-4 mr-2" />
            نظام المنتجات
          </TabsTrigger>
          <TabsTrigger value="sales">
            <BarChart className="h-4 w-4 mr-2" />
            نظام المبيعات
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="h-4 w-4 mr-2" />
            تصدير/استيراد البيانات
          </TabsTrigger>
          <TabsTrigger value="localization">
            <Globe className="h-4 w-4 mr-2" />
            التعريب واللغات
          </TabsTrigger>
          <TabsTrigger value="branding">
            <Settings className="h-4 w-4 mr-2" />
            تخصيص الواجهة
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>تكامل نظام إدارة المنتجات</CardTitle>
                  <CardDescription>ربط المنصة مع نظام إدارة المنتجات الخاص بالشركة</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  متصل
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="api-url">عنوان واجهة برمجة التطبيقات (API URL)</Label>
                  <Input id="api-url" value="https://api.beautycompany.com/products" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">مفتاح الوصول (API Key)</Label>
                  <Input id="api-key" value="••••••••••••••••••••••" type="password" readOnly />
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-md">
                <h4 className="font-medium mb-2">معلومات التكامل</h4>
                <ul className="text-sm space-y-1">
                  <li>• آخر مزامنة: منذ ٣ ساعات</li>
                  <li>• عدد المنتجات: ١٢٨ منتج</li>
                  <li>• حالة المزامنة التلقائية: مفعّلة (كل ٦ ساعات)</li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button>مزامنة الآن</Button>
                <Button variant="outline">إعدادات متقدمة</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>تكامل نظام المبيعات</CardTitle>
                  <CardDescription>ربط المنصة مع نظام إدارة المبيعات لتتبع تأثير الحملات</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  متصل
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales-api-url">عنوان واجهة برمجة التطبيقات (API URL)</Label>
                  <Input id="sales-api-url" value="https://api.beautycompany.com/sales" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-api-key">مفتاح الوصول (API Key)</Label>
                  <Input id="sales-api-key" value="••••••••••••••••••••••" type="password" readOnly />
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-md">
                <h4 className="font-medium mb-2">معلومات التكامل</h4>
                <ul className="text-sm space-y-1">
                  <li>• آخر مزامنة: منذ ٦ ساعات</li>
                  <li>• بيانات المبيعات: متوفرة آخر ٦٠ يوم</li>
                  <li>• تحليل تأثير الحملات: مفعّل</li>
                </ul>
              </div>
              
              <div className="flex gap-2">
                <Button>مزامنة الآن</Button>
                <Button variant="outline">إعدادات متقدمة</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>استيراد/تصدير البيانات</CardTitle>
              <CardDescription>تبادل البيانات مع أنظمة الشركة الأخرى</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-dashed border-2 p-4">
                  <h3 className="font-medium mb-2">تصدير البيانات</h3>
                  <p className="text-sm text-muted-foreground mb-4">تصدير بيانات المنصة لاستخدامها في أنظمة أخرى</p>
                  <div className="space-y-2">
                    <Button className="w-full">تصدير بيانات التحليلات</Button>
                    <Button className="w-full" variant="outline">تصدير محتوى الحملات</Button>
                    <Button className="w-full" variant="outline">تصدير جدول النشر</Button>
                  </div>
                </Card>
                
                <Card className="border-dashed border-2 p-4">
                  <h3 className="font-medium mb-2">استيراد البيانات</h3>
                  <p className="text-sm text-muted-foreground mb-4">استيراد بيانات من مصادر خارجية</p>
                  <div className="space-y-2">
                    <Button className="w-full">استيراد بيانات المنتجات</Button>
                    <Button className="w-full" variant="outline">استيراد بيانات العملاء</Button>
                    <Button className="w-full" variant="outline">استيراد موارد بصرية</Button>
                  </div>
                </Card>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-md">
                <h4 className="font-medium mb-2">سجل العمليات</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• ١٢ أبريل ٢٠٢٥: تم تصدير بيانات التحليلات (admin@beautyai.com)</li>
                  <li>• ١٠ أبريل ٢٠٢٥: تم استيراد بيانات المنتجات (admin@beautyai.com)</li>
                  <li>• ٨ أبريل ٢٠٢٥: تم تصدير محتوى الحملات (marketing@beautyai.com)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="localization">
          <Card>
            <CardHeader>
              <CardTitle>التعريب ودعم اللغات المتعددة</CardTitle>
              <CardDescription>إعدادات اللغات المدعومة في المنصة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="border rounded-md p-3 bg-green-50 border-green-200">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">العربية</div>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-0">اللغة الأساسية</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">اكتمال الترجمة: 100%</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">English</div>
                      <Badge variant="outline">مفعّلة</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">اكتمال الترجمة: 85%</div>
                  </div>
                  
                  <div className="border rounded-md p-3 border-dashed">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Français</div>
                      <Badge variant="outline" className="bg-slate-100 text-slate-800">قريباً</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">اكتمال الترجمة: 0%</div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-md">
                  <h4 className="font-medium mb-2">إعدادات اللغة</h4>
                  <ul className="text-sm space-y-1">
                    <li>• اللغة الافتراضية للمستخدمين الجدد: العربية</li>
                    <li>• تحديد اللغة تلقائيًا حسب متصفح المستخدم: مفعّل</li>
                    <li>• السماح للمستخدمين بتغيير لغة الواجهة: مفعّل</li>
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <Button>إضافة لغة جديدة</Button>
                  <Button variant="outline">إدارة الترجمات</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>تخصيص واجهة المستخدم</CardTitle>
              <CardDescription>تعديل مظهر المنصة لتتوافق مع هوية العلامة التجارية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">اللون الرئيسي</Label>
                    <div className="flex">
                      <Input type="color" id="primary-color" value="#10b981" className="w-16 h-10 p-1" />
                      <Input type="text" value="#10b981" className="flex-1 ml-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">اللون الثانوي</Label>
                    <div className="flex">
                      <Input type="color" id="secondary-color" value="#f59e0b" className="w-16 h-10 p-1" />
                      <Input type="text" value="#f59e0b" className="flex-1 ml-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-color">لون النص</Label>
                    <div className="flex">
                      <Input type="color" id="text-color" value="#1f2937" className="w-16 h-10 p-1" />
                      <Input type="text" value="#1f2937" className="flex-1 ml-2" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الشعار</Label>
                    <div className="border-2 border-dashed rounded-md p-8 text-center bg-slate-50">
                      <p className="text-sm text-muted-foreground mb-2">اسحب ملف الشعار هنا أو</p>
                      <Button variant="outline" size="sm">استعرض الملفات</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>خلفية تسجيل الدخول</Label>
                    <div className="border-2 border-dashed rounded-md p-8 text-center bg-slate-50">
                      <p className="text-sm text-muted-foreground mb-2">اسحب صورة الخلفية هنا أو</p>
                      <Button variant="outline" size="sm">استعرض الملفات</Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-md">
                  <h4 className="font-medium mb-2">معاينة</h4>
                  <div className="text-center">
                    <Button className="mx-1" style={{ backgroundColor: "#10b981" }}>زر أساسي</Button>
                    <Button className="mx-1" variant="outline" style={{ borderColor: "#10b981", color: "#10b981" }}>زر ثانوي</Button>
                    <Button className="mx-1" variant="ghost" style={{ color: "#10b981" }}>زر شبح</Button>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button>حفظ التغييرات</Button>
                  <Button variant="outline">استعادة الافتراضي</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationSettings;
