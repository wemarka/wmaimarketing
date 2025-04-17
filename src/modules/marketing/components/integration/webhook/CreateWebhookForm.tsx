import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, Code, Globe, KeyRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import EventTypeSelector, { EventType } from "./EventTypeSelector";

interface CreateWebhookFormProps {
  onCancel: () => void;
  onSubmit: (webhook: {
    name: string;
    endpoint: string;
    eventTypes: string[];
    description?: string;
  }) => void;
}

const CreateWebhookForm: React.FC<CreateWebhookFormProps> = ({ onCancel, onSubmit }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookName, setWebhookName] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    url?: string;
    events?: string;
  }>({});

  const eventTypes: EventType[] = [
    { id: 'content_created', name: 'إنشاء محتوى', description: 'يتم تشغيله عند إنشاء محتوى جديد', category: 'المحتوى' },
    { id: 'content_updated', name: 'تحديث محتوى', description: 'يتم تشغيله عند تحديث محتوى موجود', category: 'المحتوى' },
    { id: 'content_published', name: 'نشر محتوى', description: 'يتم تشغيله عند نشر محتوى', category: 'المحتوى' },
    { id: 'content_interaction', name: 'تفاعل مع محتوى', description: 'يتم تشغيله عند تفاعل المستخدم مع المحتوى', category: 'المحتوى' },
    { id: 'user_registered', name: 'تسجيل مستخدم', description: 'يتم تشغيله عند تسجيل مستخدم جديد', category: 'المستخدمون' },
    { id: 'user_login', name: 'تسجيل دخول', description: 'يتم تشغيله عند تسجيل دخول مستخدم', category: 'المستخدمون' },
    { id: 'user_updated', name: 'تحديث بيانات المستخدم', description: 'يتم تشغيله عند تحديث بيانات مستخدم', category: 'المستخدمون' },
    { id: 'product_created', name: 'إنشاء منتج', description: 'يتم تشغيله عند إضافة منتج جديد', category: 'المنتجات' },
    { id: 'product_updated', name: 'تحديث منتج', description: 'يتم تشغيله عند تحديث منتج', category: 'المنتجات' },
    { id: 'order_created', name: 'إنشاء طلب', description: 'يتم تشغيله عند إنشاء طلب جديد', category: 'الطلبات' },
    { id: 'order_updated', name: 'تحديث طلب', description: 'يتم تشغيله عند تحديث حالة طلب', category: 'الطلبات' },
    { id: 'payment_received', name: 'استلام دفعة', description: 'يتم تشغيله عند استلام دفعة جديدة', category: 'المدفوعات' },
  ];

  const validateForm = () => {
    const errors: {
      name?: string;
      url?: string;
      events?: string;
    } = {};
    
    if (!webhookName.trim()) {
      errors.name = 'يجب إدخال اسم الويب هوك';
    }
    
    if (!webhookUrl.trim()) {
      errors.url = 'يجب إدخال رابط URL للويب هوك';
    } else if (!webhookUrl.startsWith('http://') && !webhookUrl.startsWith('https://')) {
      errors.url = 'يجب أن يبدأ الرابط بـ http:// أو https://';
    }
    
    if (selectedEventTypes.length === 0) {
      errors.events = 'يجب اختيار نوع واحد على الأقل من الأحداث';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    onSubmit({
      name: webhookName,
      endpoint: webhookUrl,
      eventTypes: selectedEventTypes,
      description: description.trim() || undefined
    });
  };

  const goToNextTab = () => {
    if (activeTab === 'basic') {
      if (webhookName.trim() && webhookUrl.trim()) {
        setActiveTab('events');
      } else {
        validateForm();
      }
    } else if (activeTab === 'events') {
      if (selectedEventTypes.length > 0) {
        setActiveTab('advanced');
      } else {
        setFormErrors(prev => ({ ...prev, events: 'يجب اختيار نوع واحد على الأقل من الأحداث' }));
      }
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>إنشاء ويب هوك جديد</CardTitle>
        <CardDescription>أدخل بيانات الويب هوك وحدد الأحداث التي تريد مراقبتها</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="basic" className="relative">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                معلومات أساسية
              </span>
            </TabsTrigger>
            <TabsTrigger value="events">
              <span className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                الأحداث
              </span>
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <span className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                إعدادات إضافية
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="webhookName">اسم الويب هوك</Label>
                <Input 
                  id="webhookName"
                  placeholder="أدخل اسماً وصفياً للويب هوك" 
                  value={webhookName}
                  onChange={(e) => {
                    setWebhookName(e.target.value);
                    if (formErrors.name) {
                      setFormErrors(prev => ({ ...prev, name: undefined }));
                    }
                  }}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs">{formErrors.name}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  استخدم اسمًا وصفيًا سيساعدك على تذكر الغرض من هذا الويب هوك.
                </p>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="webhookUrl">عنوان الويب هوك URL</Label>
                <Input 
                  id="webhookUrl"
                  placeholder="https://example.com/webhook" 
                  value={webhookUrl}
                  onChange={(e) => {
                    setWebhookUrl(e.target.value);
                    if (formErrors.url) {
                      setFormErrors(prev => ({ ...prev, url: undefined }));
                    }
                  }}
                  className={formErrors.url ? "border-red-500" : ""}
                />
                {formErrors.url && (
                  <p className="text-red-500 text-xs">{formErrors.url}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  سيتم إرسال بيانات الأحداث إلى هذا العنوان عندما تحدث.
                </p>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="webhookDescription">وصف (اختياري)</Label>
                <Textarea 
                  id="webhookDescription"
                  placeholder="أدخل وصفًا للويب هوك..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-8 text-right">
              <Button 
                onClick={goToNextTab}
                disabled={!webhookName.trim() || !webhookUrl.trim()}
              >
                التالي: تحديد الأحداث
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <EventTypeSelector
              eventTypes={eventTypes}
              selectedEventTypes={selectedEventTypes}
              onSelectEventType={(eventTypes) => {
                setSelectedEventTypes(eventTypes);
                if (formErrors.events && eventTypes.length > 0) {
                  setFormErrors(prev => ({ ...prev, events: undefined }));
                }
              }}
            />
            
            {formErrors.events && (
              <p className="text-red-500 text-xs">{formErrors.events}</p>
            )}
            
            <Alert className="mt-6 bg-muted/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                سيتم إرسال إشعار إلى الويب هوك عندما يحدث أي من الأحداث المحددة. يمكنك تغيير هذه الإعدادات في أي وقت.
              </AlertDescription>
            </Alert>
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('basic')}
              >
                العودة: المعلومات الأساسية
              </Button>
              <Button 
                onClick={goToNextTab}
                disabled={selectedEventTypes.length === 0}
              >
                التالي: إعدادات إضافية
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Alert className="mb-6 bg-primary/10 border-primary/20">
              <AlertDescription>
                <div className="flex flex-col space-y-2">
                  <p>عند إنشاء الويب هوك، سيتم إنشاء مفتاح سري خاص به.</p>
                  <p>هذا المفتاح ضروري للتحقق من صحة الطلبات الواردة من نظامنا.</p>
                  <p>سيتم عرض المفتاح السري مرة واحدة فقط بعد الإنشاء، فتأكد من تخزينه في مكان آمن.</p>
                </div>
              </AlertDescription>
            </Alert>
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('events')}
              >
                العودة: تحديد الأحداث
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!webhookName || !webhookUrl || selectedEventTypes.length === 0}
              >
                إنشاء الويب هوك
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="ghost" 
          onClick={onCancel}
        >
          إلغاء
        </Button>
        {activeTab !== 'advanced' && (
          <Button 
            onClick={handleSubmit}
            disabled={!webhookName || !webhookUrl || selectedEventTypes.length === 0}
          >
            إنشاء الويب هوك
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateWebhookForm;
