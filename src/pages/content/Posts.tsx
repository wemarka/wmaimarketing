
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Filter, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentPosts = () => {
  return (
    <Layout>
      <Helmet>
        <title>المنشورات - سيركل</title>
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <FileText className="h-6 w-6" /> المنشورات
            </h1>
            <p className="text-muted-foreground">إدارة ونشر محتوى المنشورات</p>
          </div>
          <Button className="shrink-0">
            <PlusCircle className="h-4 w-4 mr-2" />
            منشور جديد
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
            <Tabs defaultValue="published">
              <TabsList className="mb-4">
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="published">المنشورة</TabsTrigger>
                <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
                <TabsTrigger value="draft">المسودات</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد منشورات بعد</p>
                </div>
              </TabsContent>
              <TabsContent value="published">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد منشورات منشورة</p>
                </div>
              </TabsContent>
              <TabsContent value="scheduled">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد منشورات مجدولة</p>
                </div>
              </TabsContent>
              <TabsContent value="draft">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد مسودات</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContentPosts;
