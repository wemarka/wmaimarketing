
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeHighlighter } from "./CodeHighlighter";

const ApiDocumentation: React.FC = () => {
  const endpointExamples = {
    auth: `// مثال لعملية تسجيل الدخول
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});`,
    content: `// مثال لجلب قائمة المنتجات
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('status', 'active')
  .order('created_at', { ascending: false });`,
    ai: `// مثال لاستخدام وظيفة تحسين المحتوى
const { data, error } = await supabase.functions.invoke('ai-content-enhancer', {
  body: { 
    content: "نص المحتوى الأصلي", 
    action: "improve",
    language: "Arabic"
  }
});`
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">توثيق واجهات البرمجة (API)</h2>
        <p className="text-muted-foreground">
          وصف تفصيلي لواجهات برمجة التطبيقات المتاحة في النظام وكيفية استخدامها
        </p>
      </div>

      <Tabs defaultValue="auth">
        <TabsList>
          <TabsTrigger value="auth">المصادقة</TabsTrigger>
          <TabsTrigger value="content">إدارة المحتوى</TabsTrigger>
          <TabsTrigger value="ai">وظائف الذكاء الاصطناعي</TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">واجهات المصادقة وإدارة المستخدمين</h3>
              <p className="mb-4">تتيح واجهات المصادقة التحكم في عمليات تسجيل الدخول والخروج وإدارة حسابات المستخدمين وأدوارهم.</p>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="text-sm font-medium mb-2">مثال الاستخدام:</h4>
                <CodeHighlighter code={endpointExamples.auth} language="typescript" />
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">النقاط النهائية المتاحة:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>تسجيل الدخول: <code>POST /auth/signin</code></li>
                  <li>تسجيل مستخدم جديد: <code>POST /auth/signup</code></li>
                  <li>تسجيل الخروج: <code>POST /auth/signout</code></li>
                  <li>تحديث الملف الشخصي: <code>PUT /auth/profile</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">واجهات إدارة المحتوى</h3>
              <p className="mb-4">تتيح هذه الواجهات التعامل مع المحتوى والمنتجات والحملات الإعلانية.</p>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="text-sm font-medium mb-2">مثال الاستخدام:</h4>
                <CodeHighlighter code={endpointExamples.content} language="typescript" />
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">النقاط النهائية المتاحة:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>إدارة المنتجات: <code>GET/POST/PUT/DELETE /api/products</code></li>
                  <li>إدارة الحملات: <code>GET/POST/PUT/DELETE /api/campaigns</code></li>
                  <li>إدارة الوسائط: <code>GET/POST/PUT/DELETE /api/media</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">واجهات الذكاء الاصطناعي</h3>
              <p className="mb-4">تتيح هذه الواجهات استخدام ميزات الذكاء الاصطناعي المختلفة في النظام.</p>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="text-sm font-medium mb-2">مثال الاستخدام:</h4>
                <CodeHighlighter code={endpointExamples.ai} language="typescript" />
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">النقاط النهائية المتاحة:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>توليد الصور: <code>POST /functions/ai-image-generator</code></li>
                  <li>تحسين المحتوى: <code>POST /functions/ai-content-enhancer</code></li>
                  <li>توليد أفكار الفيديو: <code>POST /functions/ai-video-ideas</code></li>
                  <li>تحليل المحتوى: <code>POST /functions/ai-content-analyzer</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDocumentation;
