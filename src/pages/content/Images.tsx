
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Image as ImageIcon, PlusCircle, Search, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentImages = () => {
  return (
    <Layout>
      <Helmet>
        <title>الصور - سيركل</title>
      </Helmet>
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <ImageIcon className="h-6 w-6" /> الصور
            </h1>
            <p className="text-muted-foreground">إدارة وتنظيم مكتبة الصور</p>
          </div>
          <Button className="shrink-0">
            <UploadCloud className="h-4 w-4 mr-2" />
            رفع صور
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
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">كل الصور</TabsTrigger>
                <TabsTrigger value="recent">الأحدث</TabsTrigger>
                <TabsTrigger value="favorites">المفضلة</TabsTrigger>
                <TabsTrigger value="unused">غير مستخدمة</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                    <PlusCircle className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="recent">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد صور حديثة</p>
                </div>
              </TabsContent>
              <TabsContent value="favorites">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد صور في المفضلة</p>
                </div>
              </TabsContent>
              <TabsContent value="unused">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">لا توجد صور غير مستخدمة</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContentImages;
