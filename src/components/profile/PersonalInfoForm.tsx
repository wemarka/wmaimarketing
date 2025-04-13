
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { ProfileData } from "@/types/profile";

// Define validation schema for profile form
const profileFormSchema = z.object({
  first_name: z.string().min(2, {
    message: "الاسم الأول يجب أن يحتوي على حرفين على الأقل",
  }),
  last_name: z.string().min(2, {
    message: "الاسم الأخير يجب أن يحتوي على حرفين على الأقل",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface PersonalInfoFormProps {
  profileData: ProfileData;
  userEmail: string;
  onUpdateProfile: (data: ProfileFormValues) => Promise<void>;
  isUpdating: boolean;
}

const PersonalInfoForm = ({ profileData, userEmail, onUpdateProfile, isUpdating }: PersonalInfoFormProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: profileData?.first_name || "",
      last_name: profileData?.last_name || "",
      email: userEmail || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUpdateProfile)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الأول</FormLabel>
                <FormControl>
                  <Input placeholder="الاسم الأول" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الأخير</FormLabel>
                <FormControl>
                  <Input placeholder="الاسم الأخير" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input placeholder="example@domain.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
