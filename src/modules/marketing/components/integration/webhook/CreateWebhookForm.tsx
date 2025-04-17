
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Copy, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

// Event types
const eventCategories = [
  {
    title: 'أحداث المنشورات',
    events: [
      { id: 'post_created', name: 'تم إنشاء منشور' },
      { id: 'post_updated', name: 'تم تحديث منشور' },
      { id: 'post_published', name: 'تم نشر منشور' },
      { id: 'post_deleted', name: 'تم حذف منشور' },
    ]
  },
  {
    title: 'أحداث الحملات',
    events: [
      { id: 'campaign_created', name: 'تم إنشاء حملة' },
      { id: 'campaign_started', name: 'تم بدء حملة' },
      { id: 'campaign_completed', name: 'تم إكمال حملة' },
      { id: 'campaign_updated', name: 'تم تحديث حملة' },
    ]
  },
  {
    title: 'أحداث الحسابات',
    events: [
      { id: 'user_registered', name: 'تم تسجيل مستخدم جديد' },
      { id: 'user_updated', name: 'تم تحديث حساب مستخدم' },
      { id: 'user_deleted', name: 'تم حذف مستخدم' },
    ]
  }
];

const CreateWebhookForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    endpoint: '',
    secretKey: generateSecretKey(),
    selectedEvents: [] as string[],
    advancedMode: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  function generateSecretKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'whsec_';
    for (let i = 0; i < 24; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const regenerateSecretKey = () => {
    setFormState({
      ...formState,
      secretKey: generateSecretKey()
    });
    
    toast.success("تم إنشاء مفتاح سرّي جديد");
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(formState.secretKey);
    toast.success("تم نسخ المفتاح السرّي");
  };

  const handleEventToggle = (eventId: string) => {
    setFormState(prev => ({
      ...prev,
      selectedEvents: prev.selectedEvents.includes(eventId)
        ? prev.selectedEvents.filter(id => id !== eventId)
        : [...prev.selectedEvents, eventId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formState.name || !formState.endpoint || formState.selectedEvents.length === 0) {
      toast.error("يرجى ملء جميع الحقول المطلوبة واختيار حدث واحد على الأقل");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("تم إنشاء الويب هوك بنجاح");
      
      // Reset the form
      setFormState({
        name: '',
        endpoint: '',
        secretKey: generateSecretKey(),
        selectedEvents: [],
        advancedMode: false,
      });
    } catch (error) {
      console.error("Error creating webhook:", error);
      toast.error("حدث خطأ أثناء إنشاء الويب هوك");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إنشاء ويب هوك جديد</CardTitle>
        <CardDescription>
          قم بإعداد ويب هوك جديد لربط التطبيق مع الخدمات الخارجية
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="webhook-name">اسم الويب هوك</Label>
              <Input 
                id="webhook-name"
                placeholder="مثال: تنبيهات المنشورات"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="webhook-endpoint">رابط الويب هوك (URL)</Label>
              <Input 
                id="webhook-endpoint"
                placeholder="https://example.com/webhook"
                value={formState.endpoint}
                onChange={(e) => setFormState({ ...formState, endpoint: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                سيتم إرسال الطلبات إلى هذا العنوان عند حدوث الأحداث المحددة
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label className="flex items-center justify-between">
                المفتاح السرّي
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={regenerateSecretKey}
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={copySecretKey}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </Label>
              <Input 
                value={formState.secretKey}
                readOnly 
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground">
                هذا المفتاح يستخدم للتحقق من صحة طلبات الويب هوك. احتفظ به بشكل آمن.
              </p>
            </div>
            
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                احفظ المفتاح السرّي الآن، لن تتمكن من مشاهدته بشكله الكامل مرة أخرى.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-2 mt-6">
              <Label className="mb-2">اختر الأحداث التي تريد الاشتراك بها</Label>
              
              <div className="space-y-6">
                {eventCategories.map(category => (
                  <div key={category.title} className="space-y-2">
                    <h4 className="font-medium text-sm">{category.title}</h4>
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                      {category.events.map(event => (
                        <div key={event.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Checkbox 
                            id={`event-${event.id}`}
                            checked={formState.selectedEvents.includes(event.id)}
                            onCheckedChange={() => handleEventToggle(event.id)}
                          />
                          <label
                            htmlFor={`event-${event.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {event.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <CardFooter className="px-0 pt-6 pb-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جارِ الإنشاء...' : 'إنشاء الويب هوك'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateWebhookForm;
