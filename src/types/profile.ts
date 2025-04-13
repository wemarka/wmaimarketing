
export interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: string | null;
  updated_at: string;
  created_at: string;
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
