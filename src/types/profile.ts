
export type AppRole = "admin" | "marketing" | "designer" | "user" | "editor" | "analyst" | "manager";

export interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: AppRole;
  created_at: string;
  updated_at: string;
  app_metadata?: {
    language?: string;
    theme?: string;
  };
}

// الأنواع الجديدة المطلوبة للنماذج
export interface ProfileFormValues {
  first_name: string;
  last_name: string;
  email?: string;
}

export interface PasswordFormValues {
  currentPassword?: string;
  newPassword: string;
  confirmPassword?: string;
}
