
export interface ProfileFormValues {
  first_name: string;
  last_name: string;
}

export interface PasswordFormValues {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ProfileData {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}
