
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

const Documentation = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1>خطة تطوير مشروع Beauty AI</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            منصة الذكاء الاصطناعي المتكاملة لتسويق منتجات التجميل
          </p>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="phases">مراحل التطوير</TabsTrigger>
            <TabsTrigger value="timeline">الجدول الزمني</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>نظرة عامة على المشروع</CardTitle>
                <CardDescription>
                  Beauty AI هو نظام داخلي للشركة يستخدم الذكاء الاصطناعي لتعزيز عمليات التسويق وإنتاج المحتوى
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">الهدف من المشروع</h3>
                  <p>
                    تطوير منصة متكاملة تمكّن فريق التسويق في الشركة من إنشاء محتوى إبداعي وإدارة الحملات التسويقية بكفاءة أعلى وجودة أفضل باستخدام تقنيات الذكاء الاصطناعي.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">الميزات الرئيسية</h3>
                  <ul className="list-disc list-inside space-y-1 mr-4">
                    <li>إدارة المستخدمين والصلاحيات الداخلية</li>
                    <li>تحليل صور المنتجات باستخدام الذكاء الاصطناعي</li>
                    <li>إنشاء إعلانات وصور تسويقية</li>
                    <li>توليد محتوى نصي للمنصات المختلفة</li>
                    <li>إنشاء فيديوهات تسويقية قصيرة</li>
                    <li>جدولة ونشر المحتوى عبر المنصات</li>
                    <li>تحليلات وتقارير أداء الحملات</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">التقنيات المستخدمة</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    <div className="bg-muted rounded-md p-2 text-center">React</div>
                    <div className="bg-muted rounded-md p-2 text-center">TypeScript</div>
                    <div className="bg-muted rounded-md p-2 text-center">Tailwind CSS</div>
                    <div className="bg-muted rounded-md p-2 text-center">Shadcn UI</div>
                    <div className="bg-muted rounded-md p-2 text-center">Supabase</div>
                    <div className="bg-muted rounded-md p-2 text-center">واجهات الذكاء الاصطناعي</div>
                    <div className="bg-muted rounded-md p-2 text-center">React Query</div>
                    <div className="bg-muted rounded-md p-2 text-center">React Router</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="phases">
            <div className="space-y-6">
              <PhaseCard 
                phaseNumber={1}
                title="تأسيس المشروع والهيكلة الأساسية"
                status="complete"
                items={[
                  { text: "إنشاء مشروع React مع TypeScript وTailwind CSS", done: true },
                  { text: "تكامل مع مكتبة Shadcn UI للواجهة", done: true },
                  { text: "هيكلة المجلدات والملفات بشكل منظم", done: true },
                  { text: "ربط المشروع مع Supabase", done: true },
                  { text: "إنشاء نظام المصادقة (تسجيل الدخول/الخروج)", done: true },
                  { text: "إنشاء جدول الملفات الشخصية للمستخدمين", done: true },
                ]}
              />
              
              <PhaseCard 
                phaseNumber={2}
                title="إدارة المستخدمين والصلاحيات الداخلية"
                status="in-progress"
                items={[
                  { text: "إنشاء نظام للأدوار المختلفة (مدير، مسؤول تسويق، مصمم)", done: false },
                  { text: "لوحة تحكم للمدير لإدارة الموظفين وصلاحياتهم", done: false },
                  { text: "سجلات النشاط وتتبع الإجراءات", done: false },
                  { text: "صفحة الملف الشخصي للموظف مع معلومات الاتصال", done: false },
                  { text: "إدارة التفضيلات الشخصية والإعدادات", done: false },
                  { text: "إدارة كلمات المرور وأمان الحساب", done: false },
                ]}
              />
              
              <PhaseCard 
                phaseNumber={3}
                title="أدوات إنتاج المحتوى الأساسية"
                status="planned"
                items={[
                  { text: "نظام تنظيم وتصنيف صور المنتجات", done: false },
                  { text: "تحليل تلقائي للصور (الألوان، الزوايا، التفاصيل)", done: false },
                  { text: "مكتبة مركزية للأصول البصرية للشركة", done: false },
                  { text: "واجهة لإنشاء إعلانات بناءً على صور المنتجات", done: false },
                  { text: "قوالب متعددة تتوافق مع هوية العلامة التجارية", done: false },
                  { text: "خيارات تخصيص متقدمة مع الحفاظ على معايير الشركة", done: false },
                ]}
              />
              
              <PhaseCard 
                phaseNumber={4}
                title="أدوات إنتاج المحتوى المتقدمة"
                status="planned"
                items={[
                  { text: "إنشاء نصوص تسويقية متوافقة مع هوية العلامة التجارية", done: false },
                  { text: "قاموس مصطلحات الشركة والكلمات المفتاحية", done: false },
                  { text: "أنماط متنوعة للمنصات المختلفة", done: false },
                  { text: "تحويل صور المنتجات إلى فيديوهات قصيرة", done: false },
                  { text: "قوالب متعددة مع شعار الشركة وألوانها", done: false },
                  { text: "أدوات تحرير بسيطة للفيديو", done: false },
                ]}
              />
              
              <PhaseCard 
                phaseNumber={5}
                title="نظام الجدولة والنشر"
                status="planned"
                items={[
                  { text: "تقويم تسويقي للحملات والمنشورات", done: false },
                  { text: "سير عمل للموافقات قبل النشر", done: false },
                  { text: "ربط مع حسابات الشركة على وسائل التواصل", done: false },
                  { text: "تنظيم المحتوى حسب المنتجات أو الحملات", done: false },
                  { text: "نظام مراجعة وموافقة للمحتوى قبل النشر", done: false },
                  { text: "متابعة حالة المنشورات", done: false },
                ]}
              />
              
              <PhaseCard 
                phaseNumber={6}
                title="التحليلات والتقارير الداخلية"
                status="planned"
                items={[
                  { text: "تتبع أداء منشورات وحملات الشركة", done: false },
                  { text: "مقارنة بين المنصات المختلفة", done: false },
                  { text: "تقارير دورية للإدارة", done: false },
                  { text: "مؤشرات الأداء الرئيسية للتسويق", done: false },
                  { text: "تحليل تكلفة الإنتاج وفعالية الحملات", done: false },
                  { text: "توصيات لتحسين المحتوى المستقبلي", done: false },
                ]}
              />
              
              <PhaseCard 
                phaseNumber={7}
                title="التكامل والتوسع"
                status="planned"
                items={[
                  { text: "ربط مع نظام إدارة المنتجات", done: false },
                  { text: "تكامل مع نظام المبيعات لتتبع تأثير الحملات", done: false },
                  { text: "استيراد/تصدير البيانات من/إلى أنظمة الشركة الأخرى", done: false },
                  { text: "تعريب كامل للنظام", done: false },
                  { text: "تخصيص الواجهة حسب هوية العلامة التجارية", done: false },
                  { text: "دعم متعدد اللغات للأسواق المختلفة", done: false },
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>الجدول الزمني المقترح للتنفيذ</CardTitle>
                <CardDescription>
                  التقدير الزمني لإنجاز كل مرحلة من مراحل المشروع
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TimelineItem phase="المرحلة الأولى: تأسيس المشروع والهيكلة الأساسية" duration="مكتملة" status="complete" />
                  <TimelineItem phase="المرحلة الثانية: إدارة المستخدمين والصلاحيات الداخلية" duration="1-2 أسابيع" status="in-progress" />
                  <TimelineItem phase="المرحلة الثالثة: أدوات إنتاج المحتوى الأساسية" duration="2-3 أسابيع" status="planned" />
                  <TimelineItem phase="المرحلة الرابعة: أدوات إنتاج المحتوى المتقدمة" duration="2-3 أسابيع" status="planned" />
                  <TimelineItem phase="المرحلة الخامسة: نظام الجدولة والنشر" duration="2 أسابيع" status="planned" />
                  <TimelineItem phase="المرحلة السادسة: التحليلات والتقارير الداخلية" duration="1-2 أسابيع" status="planned" />
                  <TimelineItem phase="المرحلة السابعة: التكامل والتوسع" duration="2-3 أسابيع" status="planned" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>الخطوة التالية</CardTitle>
            <CardDescription>
              بدء تنفيذ المرحلة الثانية من المشروع
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                المرحلة التالية في خطة التطوير ستركز على إدارة المستخدمين والصلاحيات داخل نظام Beauty AI. سيتم إنشاء:
              </p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>صفحة الملف الشخصي للمستخدم مع القدرة على تحديث البيانات الشخصية</li>
                <li>نظام للأدوار والصلاحيات المختلفة (مدير، مسؤول تسويق، مصمم محتوى)</li>
                <li>لوحة تحكم للمدير لإدارة حسابات الموظفين</li>
                <li>نظام لتتبع نشاط المستخدمين داخل المنصة</li>
              </ul>
              <p>
                هذه الخطوة ستضع الأساس لباقي ميزات النظام من خلال تحديد من يمكنه الوصول إلى أي جزء من التطبيق، مما سيسمح بتنظيم سير العمل بشكل أفضل.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// مكون لعرض مرحلة من مراحل المشروع
interface PhaseCardProps {
  phaseNumber: number;
  title: string;
  status: "complete" | "in-progress" | "planned";
  items: { text: string; done: boolean }[];
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phaseNumber, title, status, items }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>المرحلة {phaseNumber}: {title}</CardTitle>
            <CardDescription>
              {status === "complete" && "مكتملة"}
              {status === "in-progress" && "قيد التنفيذ"}
              {status === "planned" && "مخطط لها"}
            </CardDescription>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
            status === "complete" ? "bg-green-100 text-green-600" : 
            status === "in-progress" ? "bg-amber-100 text-amber-600" : 
            "bg-slate-100 text-slate-500"
          }`}>
            {status === "complete" && <CheckCircle2 className="h-6 w-6" />}
            {status === "in-progress" && <Clock className="h-6 w-6" />}
            {status === "planned" && <span className="font-semibold">{phaseNumber}</span>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center ${
                item.done ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
              }`}>
                {item.done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">•</span>}
              </div>
              <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// مكون لعرض عنصر على الجدول الزمني
interface TimelineItemProps {
  phase: string;
  duration: string;
  status: "complete" | "in-progress" | "planned";
}

const TimelineItem: React.FC<TimelineItemProps> = ({ phase, duration, status }) => {
  return (
    <div className="flex items-center">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        status === "complete" ? "bg-green-100 text-green-600" : 
        status === "in-progress" ? "bg-amber-100 text-amber-600" : 
        "bg-slate-100 text-slate-500"
      }`}>
        {status === "complete" && <CheckCircle2 className="h-6 w-6" />}
        {status === "in-progress" && <Clock className="h-6 w-6" />}
        {status === "planned" && <span>•</span>}
      </div>
      <div className="ms-4 mr-auto">
        <p className="font-medium">{phase}</p>
        <p className="text-sm text-muted-foreground">{duration}</p>
      </div>
      <div className="flex-shrink-0 text-sm font-medium">
        {status === "complete" && <span className="text-green-600">مكتملة</span>}
        {status === "in-progress" && <span className="text-amber-600">قيد التنفيذ</span>}
        {status === "planned" && <span className="text-slate-500">مخطط لها</span>}
      </div>
    </div>
  );
};

export default Documentation;
