
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" }),
  endpoint: z.string().url({ message: "الرابط غير صالح" }),
  description: z.string().optional(),
  eventTypes: z.array(z.string()).min(1, { message: "يرجى اختيار نوع حدث واحد على الأقل" }),
});

const eventTypeOptions = [
  { id: "post.created", label: "إنشاء منشور جديد" },
  { id: "post.scheduled", label: "جدولة منشور" },
  { id: "post.published", label: "نشر منشور" },
  { id: "comment.created", label: "إنشاء تعليق جديد" },
  { id: "comment.replied", label: "الرد على تعليق" },
  { id: "profile.updated", label: "تحديث الملف الشخصي" },
  { id: "campaign.started", label: "بدء حملة" },
  { id: "campaign.ended", label: "انتهاء حملة" },
  { id: "analytics.daily", label: "تقارير يومية" },
  { id: "analytics.weekly", label: "تقارير أسبوعية" },
];

interface CreateWebhookFormProps {
  onSubmit: (data: {
    name: string;
    endpoint: string;
    eventTypes: string[];
    description?: string;
  }) => void;
  onCancel: () => void;
}

const CreateWebhookForm: React.FC<CreateWebhookFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      endpoint: "",
      description: "",
      eventTypes: [],
    },
  });

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>إنشاء ويب هوك جديد</CardTitle>
        <CardDescription>
          قم بإنشاء ويب هوك جديد لربط منصتك مع خدمات وتطبيقات خارجية
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الويب هوك</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسماً وصفياً لهذا الويب هوك" {...field} />
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
                  <FormLabel>نقطة النهاية URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/webhook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="أدخل وصفاً لهذا الويب هوك..." {...field} />
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
                  <div className="mb-4">
                    <FormLabel>أنواع الأحداث</FormLabel>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eventTypeOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="eventTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex flex-row items-start space-x-3 space-x-reverse rtl:space-x-reverse space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== option.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {option.label}
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onCancel}>
              إلغاء
            </Button>
            <Button type="submit">إنشاء</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CreateWebhookForm;
