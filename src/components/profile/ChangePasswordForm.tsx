
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

// Define validation schema for password form
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "كلمة المرور الحالية يجب أن تحتوي على 6 أحرف على الأقل",
  }),
  newPassword: z.string().min(6, {
    message: "كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل",
  }),
  confirmPassword: z.string().min(6, {
    message: "تأكيد كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "كلمة المرور الجديدة وتأكيدها يجب أن تكونا متطابقتين",
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface ChangePasswordFormProps {
  onChangePassword: (data: PasswordFormValues) => Promise<void>;
  isChangingPassword: boolean;
}

const ChangePasswordForm = ({ onChangePassword, isChangingPassword }: ChangePasswordFormProps) => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onChangePassword)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور الحالية</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور الجديدة</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isChangingPassword}>
          {isChangingPassword ? "جاري التغيير..." : "تغيير كلمة المرور"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
