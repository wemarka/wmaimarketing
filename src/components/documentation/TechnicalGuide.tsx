
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeHighlighter } from "./CodeHighlighter";

const TechnicalGuide: React.FC = () => {
  const codeExamples = {
    setup: `// تثبيت التبعيات
npm install

// تشغيل البيئة المحلية
npm run dev

// بناء المشروع للإنتاج
npm run build`,
    component: `import React from 'react';
import { Button } from '@/components/ui/button';

const MyComponent: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">عنوان المكون</h2>
      <p className="my-2">وصف المكون ووظيفته</p>
      <Button>زر العمل</Button>
    </div>
  );
};

export default MyComponent;`,
    api: `// مثال لإنشاء وظيفة جديدة في Supabase Edge Functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input } = await req.json();
    
    // المنطق الأساسي هنا

    return new Response(
      JSON.stringify({ result: 'تم التنفيذ بنجاح' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});`
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">الدليل الفني</h2>
        <p className="text-muted-foreground">
          دليل فني شامل للمطورين حول كيفية استخدام وتطوير وتوسيع النظام
        </p>
      </div>

      <Tabs defaultValue="architecture">
        <TabsList>
          <TabsTrigger value="architecture">بنية النظام</TabsTrigger>
          <TabsTrigger value="setup">الإعداد والتشغيل</TabsTrigger>
          <TabsTrigger value="components">المكونات</TabsTrigger>
          <TabsTrigger value="api-dev">تطوير API</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">بنية النظام</h3>
              <p className="mb-4">يتكون النظام من الطبقات الرئيسية التالية:</p>
              
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li className="font-medium">واجهة المستخدم (Frontend)
                  <ul className="list-circle list-inside ml-6 mt-1 text-sm text-muted-foreground">
                    <li>React مع TypeScript</li>
                    <li>Tailwind CSS للتنسيق</li>
                    <li>مكونات Shadcn UI</li>
                    <li>مكتبات للرسوم البيانية والتحليلات</li>
                  </ul>
                </li>
                <li className="font-medium">الخدمات الخلفية (Backend)
                  <ul className="list-circle list-inside ml-6 mt-1 text-sm text-muted-foreground">
                    <li>Supabase للمصادقة وقاعدة البيانات</li>
                    <li>Edge Functions لمعالجة الطلبات المتقدمة</li>
                    <li>تكامل مع OpenAI للذكاء الاصطناعي</li>
                  </ul>
                </li>
                <li className="font-medium">قاعدة البيانات
                  <ul className="list-circle list-inside ml-6 mt-1 text-sm text-muted-foreground">
                    <li>PostgreSQL مع نظام RLS للأمان</li>
                    <li>جداول العلاقات بين المستخدمين والمحتوى</li>
                  </ul>
                </li>
                <li className="font-medium">التكاملات الخارجية
                  <ul className="list-circle list-inside ml-6 mt-1 text-sm text-muted-foreground">
                    <li>واجهات برمجة منصات التواصل الاجتماعي</li>
                    <li>خدمات تحليل الصور والفيديو</li>
                    <li>معالجة الدفعات</li>
                  </ul>
                </li>
              </ul>
              
              <div className="border p-4 rounded-md bg-muted/30">
                <h4 className="text-sm font-medium mb-2">مخطط البنية:</h4>
                <div className="bg-white p-4 rounded border text-center">
                  [مخطط معماري للنظام - يمكن إضافة صورة هنا]
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">إعداد وتشغيل النظام</h3>
              <p className="mb-4">خطوات تثبيت وإعداد النظام على بيئة التطوير المحلية:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">1. المتطلبات الأساسية</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Node.js v16.0 أو أحدث</li>
                    <li>npm v8.0 أو أحدث</li>
                    <li>حساب Supabase</li>
                    <li>حساب OpenAI (اختياري للميزات المتقدمة)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">2. خطوات الإعداد</h4>
                  <div className="border rounded-md p-4 bg-muted/30">
                    <CodeHighlighter code={codeExamples.setup} language="bash" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">3. تكوين متغيرات البيئة</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    قم بإنشاء ملف <code>.env</code> في المجلد الرئيسي وأضف المتغيرات التالية:
                  </p>
                  <div className="border rounded-md p-3 bg-muted/30 text-sm font-mono">
                    <div>VITE_SUPABASE_URL=your_supabase_url</div>
                    <div>VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</div>
                    <div>OPENAI_API_KEY=your_openai_api_key</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">دليل المكونات</h3>
              <p className="mb-4">إرشادات وأمثلة لإنشاء واستخدام مكونات النظام:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">هيكل مكوّن نموذجي:</h4>
                  <div className="border rounded-md p-4 bg-muted/30">
                    <CodeHighlighter code={codeExamples.component} language="typescript" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">أفضل الممارسات:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>استخدام TypeScript لتحديد الأنواع</li>
                    <li>تقسيم المكونات الكبيرة إلى مكونات صغيرة قابلة لإعادة الاستخدام</li>
                    <li>استخدام مكتبة shadcn/ui للمكونات الأساسية</li>
                    <li>الالتزام بتسمية متناسقة للمتغيرات والملفات</li>
                    <li>توثيق الواجهات (interfaces) والأنواع (types) المهمة</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">مكتبات المكونات:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>مكونات UI: <code>@/components/ui</code></li>
                    <li>مكونات المحتوى: <code>@/components/content</code></li>
                    <li>مكونات الذكاء الاصطناعي: <code>@/components/ai</code></li>
                    <li>مكونات التحليلات: <code>@/components/analytics</code></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-dev" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-3">تطوير واجهات برمجة التطبيقات (API)</h3>
              <p className="mb-4">إرشادات لتطوير وتوسيع واجهات برمجة التطبيقات في النظام:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">إنشاء وظيفة Edge Function جديدة:</h4>
                  <div className="border rounded-md p-4 bg-muted/30">
                    <CodeHighlighter code={codeExamples.api} language="typescript" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">أفضل الممارسات:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>التعامل دائمًا مع استثناءات CORS</li>
                    <li>التحقق من المدخلات قبل معالجتها</li>
                    <li>استخدام الأمان المناسب مثل تحقق المستخدم (RLS)</li>
                    <li>تضمين رسائل خطأ واضحة وآمنة</li>
                    <li>توثيق جميع نقاط النهاية (endpoints) الجديدة</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">نشر التغييرات:</h4>
                  <p className="text-sm text-muted-foreground">
                    يتم نشر التغييرات على واجهات برمجة التطبيقات تلقائيًا عند دفعها إلى الفرع الرئيسي، أو باستخدام الأمر:
                  </p>
                  <div className="border rounded-md p-2 mt-2 bg-muted/30 text-sm font-mono">
                    npx supabase functions deploy ai-function-name
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicalGuide;
