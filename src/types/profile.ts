
export interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string | null;
  updated_at: string;
  created_at: string;
  app_metadata?: {
    language?: string;
  };
}

export interface ProfileFormValues {
  first_name: string;
  last_name: string;
  email: string;
}

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  activityType: "login" | "logout" | "profile_update" | "password_change" | "role_change" | "content_create" | "content_edit" | "security_check";
  description: string;
  timestamp: string;
}
