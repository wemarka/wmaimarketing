
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

// Available event types
const eventTypes = [
  { id: "new_post", label: "منشور جديد" },
  { id: "post_updated", label: "تحديث منشور" },
  { id: "post_published", label: "نشر منشور" },
  { id: "new_order", label: "طلب جديد" },
  { id: "order_payment", label: "دفعة جديدة" },
  { id: "user_subscription", label: "اشتراك مستخدم" },
  { id: "subscription_renewal", label: "تجديد اشتراك" },
  { id: "new_review", label: "تقييم جديد" },
  { id: "review_response", label: "رد على تقييم" },
];

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يكون الاسم أكثر من حرفين",
  }),
  endpoint: z.string().url({
    message: "يجب إدخال رابط صحيح",
  }),
  eventTypes: z.array(z.string()).min(1, {
    message: "يجب اختيار نوع حدث واحد على الأقل",
  }),
  generateSecret: z.boolean().default(false),
  active: z.boolean().default(true),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateWebhookForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      endpoint: "",
      eventTypes: [],
      generateSecret: true,
      active: true,
      description: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    toast.success("تم إنشاء الويب هوك بنجاح");
    form.reset();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الويب هوك</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: إشعارات المبيعات" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط الويب هوك</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/webhook"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف (اختياري)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="وصف مختصر للويب هوك"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventTypes"
              render={() => (
                <FormItem>
                  <FormLabel>أنواع الأحداث</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {eventTypes.map((event) => (
                      <FormField
                        key={event.id}
                        control={form.control}
                        name="eventTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={event.id}
                              className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(event.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, event.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== event.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {event.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="generateSecret"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">إنشاء مفتاح سر</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        إنشاء مفتاح سر لتأمين الويب هوك
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">الحالة</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        تفعيل أو تعطيل الويب هوك
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button type="button" variant="outline">
                إلغاء
              </Button>
              <Button type="submit">إنشاء الويب هوك</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateWebhookForm;
