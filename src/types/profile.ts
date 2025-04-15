
import { z } from "zod";

export type AppRole = "admin" | "manager" | "marketing" | "designer" | "user";

export interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  role: AppRole;
  updated_at: string;
  created_at: string;
  app_metadata?: {
    language?: string;
    [key: string]: any;
  };
}

export const profileFormSchema = z.object({
  first_name: z.string().min(1, "الاسم الأول مطلوب"),
  last_name: z.string().min(1, "الاسم الأخير مطلوب"),
});

export const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, "كلمة المرور الحالية يجب أن تحتوي على 6 أحرف على الأقل"),
  newPassword: z.string().min(6, "كلمة المرور الجديدة يجب أن تحتوي على 6 أحرف على الأقل"),
  confirmPassword: z.string().min(6, "تأكيد كلمة المرور يجب أن يتطابق مع كلمة المرور الجديدة"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
