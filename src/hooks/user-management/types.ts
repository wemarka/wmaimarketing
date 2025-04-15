
import { AppRole } from "@/types/profile";

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: AppRole;
  created_at: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string | null;
}

export interface NewUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: AppRole;
}
