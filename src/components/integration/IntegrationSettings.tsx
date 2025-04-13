
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, RotateCw, Link, ShoppingBag, BarChart2, Globe, Palette, Upload, Download, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const IntegrationSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث إعدادات التكامل بنجاح",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold mb-2">إعدادات التكامل</h1>
        <p className="text-muted-foreground">
          قم بربط منصة Beauty AI مع أنظمتك الحالية وتخصيص واجهة المستخدم والتوسع في النطاق
        </p>
      </div>
      
      <Tabs defaultValue="products">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="products">
            <ShoppingBag className="h-4 w-4 mr-2" />
            المنتجات والمبيعات
          </TabsTrigger>
          <TabsTrigger value="data">
            <BarChart2 className="h-4 w-4 mr-2" />
            البيانات
          </TabsTrigger>
          <TabsTrigger value="localization">
            <Globe className="h-4 w-4 mr-2" />
            التعريب والتدويل
          </TabsTrigger>
          <TabsTrigger value="ui">
            <Palette className="h-4 w-4 mr-2" />
            تخصيص الواجهة
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                تكامل نظام المنتجات والمبيعات
              </CardTitle>
              <CardDescription>
                ربط منصة Beauty AI مع نظام إدارة المنتجات والمبيعات الخاص بك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>اختر نظام المنتجات</Label>
                  <Select defaultValue="shopify">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النظام" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="woocommerce">WooCommerce</SelectItem>
                      <SelectItem value="magento">Magento</SelectItem>
                      <SelectItem value="opencart">OpenCart</SelectItem>
                      <SelectItem value="custom">نظام مخصص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>رابط واجهة برمجة التطبيقات API</Label>
                  <Input placeholder="https://your-store.com/api" dir="ltr" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>مفتاح API</Label>
                <Input placeholder="أدخل مفتاح API الخاص بك" type="password" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sync-products">مزامنة المنتجات تلقائياً</Label>
                  <p className="text-sm text-muted-foreground">مزامنة المنتجات الجديدة والمحدثة تلقائياً مع Beauty AI</p>
                </div>
                <Switch id="sync-products" />
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      جارِ الحفظ...
                    </>
                  ) : (
                    <>حفظ التغييرات</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="mr-2 h-5 w-5" />
                ربط المنتج بالمحتوى
              </CardTitle>
              <CardDescription>
                إعداد كيفية ربط منتجاتك بالمحتوى المنشأ في Beauty AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-link">ربط تلقائي للمنتجات في المحتوى</Label>
                  <p className="text-sm text-muted-foreground">إضافة روابط المنتجات تلقائياً في المحتوى المنشأ</p>
                </div>
                <Switch id="auto-link" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="product-labels">عرض ملصقات المنتج</Label>
                  <p className="text-sm text-muted-foreground">عرض ملصقات مثل "جديد" أو "الأكثر مبيعاً" في المحتوى</p>
                </div>
                <Switch id="product-labels" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button variant="outline">إعدادات متقدمة</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                استيراد البيانات
              </CardTitle>
              <CardDescription>
                استيراد بيانات من مصادر خارجية إلى منصة Beauty AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>مصدر البيانات</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المصدر" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">ملف CSV</SelectItem>
                      <SelectItem value="excel">ملف Excel</SelectItem>
                      <SelectItem value="api">API خارجي</SelectItem>
                      <SelectItem value="database">قاعدة بيانات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>نوع البيانات</Label>
                  <Select defaultValue="products">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع البيانات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="products">منتجات</SelectItem>
                      <SelectItem value="customers">عملاء</SelectItem>
                      <SelectItem value="orders">طلبات</SelectItem>
                      <SelectItem value="content">محتوى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button>تحميل ملف</Button>
                <Button variant="outline">استيراد من API</Button>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">عمليات الاستيراد الأخيرة</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <div className="flex items-center">
                      <CheckCircle2 className="text-green-500 h-4 w-4 mr-2" />
                      <span>منتجات_ابريل.csv</span>
                    </div>
                    <Badge variant="outline">منذ يومين</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="text-amber-500 h-4 w-4 mr-2" />
                      <span>عملاء_مارس.xlsx</span>
                    </div>
                    <Badge variant="outline">منذ أسبوع</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="mr-2 h-5 w-5" />
                تصدير البيانات
              </CardTitle>
              <CardDescription>
                تصدير البيانات من Beauty AI إلى أنظمة خارجية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>نوع البيانات للتصدير</Label>
                  <Select defaultValue="content">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع البيانات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content">محتوى منشأ</SelectItem>
                      <SelectItem value="analytics">تحليلات</SelectItem>
                      <SelectItem value="assets">أصول الوسائط</SelectItem>
                      <SelectItem value="schedule">جدول النشر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>تنسيق التصدير</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التنسيق" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="api">إرسال إلى API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline">تصدير</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                إعدادات اللغة والتعريب
              </CardTitle>
              <CardDescription>
                تخصيص إعدادات اللغة والتعريب لمنصة Beauty AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>اللغة الافتراضية</Label>
                  <Select defaultValue="ar">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر اللغة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>اللغات الإضافية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر لغات إضافية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="tr">Türkçe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>مصطلحات مخصصة</Label>
                <Textarea 
                  placeholder="أدخل مصطلحات خاصة بمجال التجميل والمنتجات الخاصة بك"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">أدخل المصطلحات بتنسيق: المصطلح بالعربية = المصطلح بالإنجليزية</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-translate">ترجمة المحتوى تلقائياً</Label>
                  <p className="text-sm text-muted-foreground">ترجمة المحتوى المنشأ تلقائياً إلى اللغات المحددة</p>
                </div>
                <Switch id="auto-translate" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rtl-support">دعم الكتابة من اليمين لليسار</Label>
                  <p className="text-sm text-muted-foreground">تفعيل دعم الكتابة من اليمين لليسار للغات مثل العربية</p>
                </div>
                <Switch id="rtl-support" defaultChecked />
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      جارِ الحفظ...
                    </>
                  ) : (
                    <>حفظ التغييرات</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ui" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                تخصيص واجهة المستخدم
              </CardTitle>
              <CardDescription>
                تخصيص مظهر منصة Beauty AI لتتناسب مع هوية علامتك التجارية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>لون العلامة التجارية الرئيسي</Label>
                  <div className="flex">
                    <Input 
                      type="color" 
                      defaultValue="#8B5CF6" 
                      className="w-12 p-1 h-10"
                    />
                    <Input 
                      type="text" 
                      defaultValue="#8B5CF6" 
                      className="w-full ml-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>اللون الثانوي</Label>
                  <div className="flex">
                    <Input 
                      type="color" 
                      defaultValue="#EC4899" 
                      className="w-12 p-1 h-10"
                    />
                    <Input 
                      type="text" 
                      defaultValue="#EC4899" 
                      className="w-full ml-2"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>شعار الشركة</Label>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-20 h-20 border rounded flex items-center justify-center bg-muted">
                    <p className="text-xs text-center text-muted-foreground">صورة الشعار</p>
                  </div>
                  <Button variant="outline">تحميل شعار</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-fonts">استخدام خطوط مخصصة</Label>
                  <p className="text-sm text-muted-foreground">تمكين استخدام خطوط مخصصة للعلامة التجارية</p>
                </div>
                <Switch id="custom-fonts" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">الوضع الداكن</Label>
                  <p className="text-sm text-muted-foreground">تفعيل خيار الوضع الداكن للمستخدمين</p>
                </div>
                <Switch id="dark-mode" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      جارِ الحفظ...
                    </>
                  ) : (
                    <>حفظ التغييرات</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                إعدادات واجهة المستخدم المتقدمة
              </CardTitle>
              <CardDescription>
                إعدادات متقدمة لتخصيص تجربة المستخدم
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>قالب التطبيق</Label>
                  <Select defaultValue="modern">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القالب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">عصري</SelectItem>
                      <SelectItem value="classic">كلاسيكي</SelectItem>
                      <SelectItem value="minimal">بسيط</SelectItem>
                      <SelectItem value="creative">إبداعي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>كثافة العناصر</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الكثافة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">مدمجة</SelectItem>
                      <SelectItem value="comfortable">مريحة</SelectItem>
                      <SelectItem value="spacious">فسيحة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">تأثيرات الحركة</Label>
                  <p className="text-sm text-muted-foreground">تفعيل تأثيرات الحركة في واجهة المستخدم</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="feedback">اقتراحات تفاعلية</Label>
                  <p className="text-sm text-muted-foreground">عرض اقتراحات تفاعلية لتحسين المحتوى</p>
                </div>
                <Switch id="feedback" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button variant="outline">استعادة الإعدادات الافتراضية</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2 space-x-reverse">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              جارِ الحفظ...
            </>
          ) : (
            <>حفظ جميع التغييرات</>
          )}
        </Button>
        <Button variant="outline">إلغاء</Button>
      </div>
    </div>
  );
};

export default IntegrationSettings;
