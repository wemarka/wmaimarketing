
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Users, PlusCircle, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MarketingAudience = () => {
  return (
    <Layout>
      <Helmet>
        <title>الجمهور - سيركل</title>
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <Users className="h-6 w-6" /> الجمهور
            </h1>
            <p className="text-muted-foreground">إدارة وتحليل بيانات الجمهور</p>
          </div>
          <Button className="shrink-0">
            <UserPlus className="h-4 w-4 mr-2" />
            إضافة شريحة
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="segments">
              <TabsList className="mb-4">
                <TabsTrigger value="segments">الشرائح</TabsTrigger>
                <TabsTrigger value="demographics">التركيبة السكانية</TabsTrigger>
                <TabsTrigger value="behavior">السلوكيات</TabsTrigger>
                <TabsTrigger value="interests">الاهتمامات</TabsTrigger>
              </TabsList>
              <TabsContent value="segments">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد شرائح محددة بعد</p>
                </div>
              </TabsContent>
              <TabsContent value="demographics">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد بيانات سكانية متاحة</p>
                </div>
              </TabsContent>
              <TabsContent value="behavior">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد بيانات سلوكية متاحة</p>
                </div>
              </TabsContent>
              <TabsContent value="interests">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد بيانات اهتمامات متاحة</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MarketingAudience;
