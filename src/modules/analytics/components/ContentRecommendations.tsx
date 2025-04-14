
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, TrendingUp, Check, AlertCircle, PieChart, BarChart2, Users } from "lucide-react";

const ContentRecommendations = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">توصيات المحتوى</h2>
          <p className="text-muted-foreground">استراتيجيات وتوصيات لتحسين أداء المحتوى</p>
        </div>
        <Button>تطبيق التوصيات</Button>
      </div>
      
      <Tabs defaultValue="timing">
        <TabsList>
          <TabsTrigger value="timing">أوقات النشر</TabsTrigger>
          <TabsTrigger value="content">نوع المحتوى</TabsTrigger>
          <TabsTrigger value="audience">الجمهور المستهدف</TabsTrigger>
          <TabsTrigger value="campaigns">الحملات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timing" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أفضل أوقات النشر</CardTitle>
                <CardDescription>توصيات بناءً على تحليل البيانات السابقة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">انستغرام</h4>
                    <p className="text-sm text-muted-foreground">أيام الثلاثاء والخميس، من الساعة 2-4 مساءً</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">فيسبوك</h4>
                    <p className="text-sm text-muted-foreground">أيام الأربعاء والجمعة، من الساعة 12-2 ظهراً</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">تيك توك</h4>
                    <p className="text-sm text-muted-foreground">يومياً، من الساعة 6-9 مساءً</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">تويتر</h4>
                    <p className="text-sm text-muted-foreground">أيام الإثنين والأربعاء، من الساعة 10-12 صباحاً</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>تكرار النشر الأمثل</CardTitle>
                <CardDescription>توصيات بناءً على تحليل التفاعل ومعدلات التحويل</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">انستغرام</h4>
                    <p className="text-sm text-muted-foreground">4-5 منشورات أسبوعياً، 1-2 قصص يومياً</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">فيسبوك</h4>
                    <p className="text-sm text-muted-foreground">3-4 منشورات أسبوعياً</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">تيك توك</h4>
                    <p className="text-sm text-muted-foreground">8-10 فيديوهات أسبوعياً</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">تويتر</h4>
                    <p className="text-sm text-muted-foreground">5-7 تغريدات يومياً</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>توصيات لتحسين التفاعل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">زيادة استخدام محتوى الفيديو القصير</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      تشير البيانات إلى أن محتوى الفيديو القصير يحقق معدلات تفاعل أعلى بنسبة 35% من المنشورات النصية أو الصور الثابتة. ينصح بزيادة إنتاج محتوى الفيديو القصير بنسبة 20% على الأقل.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">التركيز على محتوى تعليمي مرتبط بالمنتجات</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      المحتوى التعليمي المرتبط باستخدام المنتجات يحقق معدلات مشاهدة أعلى بنسبة 28% ومعدلات تحويل أعلى بنسبة 18%. ينصح بإنشاء سلسلة من الفيديوهات التعليمية القصيرة حول كيفية استخدام المنتجات.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 bg-primary/5 rounded-md border">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">تنويع الوسوم المستخدمة</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      المنشورات التي تستخدم مزيجاً من الوسوم المحددة والعامة تحقق وصولاً أكبر بنسبة 45%. ينصح باستخدام 5-7 وسوم محددة مرتبطة بالمنتج و3-5 وسوم عامة شائعة.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6 mt-6">
          {/* محتوى توصيات نوع المحتوى */}
        </TabsContent>
        
        <TabsContent value="audience" className="space-y-6 mt-6">
          {/* محتوى توصيات الجمهور المستهدف */}
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-6 mt-6">
          {/* محتوى توصيات الحملات */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentRecommendations;
