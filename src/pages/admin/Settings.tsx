
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Globe, Bell, Lock, Database, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AdminSettings = () => {
  return (
    <Layout>
      <Helmet>
        <title>إعدادات النظام - سيركل</title>
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <SettingsIcon className="h-6 w-6" /> إعدادات النظام
            </h1>
            <p className="text-muted-foreground">تكوين وتخصيص إعدادات النظام</p>
          </div>
          <Button className="shrink-0">
            حفظ التغييرات
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>عام</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>المظهر</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>الإشعارات</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>الأمان</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>قاعدة البيانات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>
                  تكوين الإعدادات الأساسية للنظام
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">اسم التطبيق</Label>
                  <Input id="app-name" defaultValue="سيركل" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-url">رابط الموقع</Label>
                  <Input id="app-url" defaultValue="https://circle.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني للدعم</Label>
                  <Input id="email" type="email" defaultValue="support@circle.example.com" />
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="maintenance" />
                  <Label htmlFor="maintenance">وضع الصيانة</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المظهر</CardTitle>
                <CardDescription>
                  تخصيص مظهر التطبيق
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="dark-mode" defaultChecked />
                  <Label htmlFor="dark-mode">تفعيل الوضع الداكن</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="rtl" defaultChecked />
                  <Label htmlFor="rtl">تفعيل واجهة من اليمين لليسار (RTL)</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>
                  تكوين إشعارات النظام
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="push-notifications" defaultChecked />
                  <Label htmlFor="push-notifications">إشعارات الدفع</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
                <CardDescription>
                  تكوين إجراءات أمان النظام
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">تفعيل المصادقة الثنائية</Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Switch id="ip-restriction" />
                  <Label htmlFor="ip-restriction">تقييد الوصول عبر عناوين IP</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات قاعدة البيانات</CardTitle>
                <CardDescription>
                  إعدادات النسخ الاحتياطي واستعادة البيانات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label>النسخ الاحتياطي التلقائي</Label>
                  <div className="flex gap-2">
                    <Button variant="outline">إنشاء نسخة احتياطية</Button>
                    <Button variant="outline">استعادة النسخة الاحتياطية</Button>
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

export default AdminSettings;
