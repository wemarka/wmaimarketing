
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

// النماذج الرئيسية للبيانات في التطبيق

// نموذج المستخدم
export interface UserProfile extends Tables<"profiles"> {
  avatar_url: string | null;
}

// نموذج المنشور
export interface Post {
  id: string;
  title: string;
  content: string;
  media_url: string[];
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  status: "draft" | "scheduled" | "published" | "failed";
  scheduled_at: string;
  published_at: string | null;
  user_id: string;
  campaign_id: string | null;
  created_at: string;
  updated_at: string;
}

// نموذج الحملة
export interface Campaign {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "active" | "pending" | "completed" | "archived";
  budget: number;
  target_audience: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

// نموذج المنتج
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string[];
  price: number;
  status: "active" | "inactive" | "archived";
  created_at: string;
  updated_at: string;
}

// نموذج الحساب الاجتماعي
export interface SocialAccount {
  id: string;
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  account_name: string;
  profile_name: string;
  status: "connected" | "disconnected" | "error";
  user_id: string;
  access_token: string | null;
  refresh_token: string | null;
  insights: {
    followers: number;
    engagement: number;
    postCount: number;
  };
  created_at: string;
  updated_at: string;
}

// نموذج الأصول الإعلامية
export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "audio";
  format: string;
  size: number;
  dimensions?: { width: number; height: number };
  duration?: number;
  folder_id: string | null;
  tags: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

// واجهات للتعامل مع البيانات

// جلب قائمة المنشورات
export const fetchPosts = async (userId: string, status?: string) => {
  let query = supabase.from("posts").select("*").eq("user_id", userId);
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Post[];
};

// جلب قائمة الحملات
export const fetchCampaigns = async (userId: string, status?: string) => {
  let query = supabase.from("campaigns").select("*").eq("user_id", userId);
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Campaign[];
};

// جلب قائمة المنتجات
export const fetchProducts = async (status?: string) => {
  let query = supabase.from("products").select("*");
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Product[];
};

// جلب قائمة الحسابات الاجتماعية
export const fetchSocialAccounts = async (userId: string) => {
  const { data, error } = await supabase
    .from("social_accounts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as SocialAccount[];
};

// جلب قائمة الأصول الإعلامية
export const fetchMediaAssets = async (userId: string, folderId?: string) => {
  let query = supabase.from("media_assets").select("*").eq("user_id", userId);
  
  if (folderId) {
    query = query.eq("folder_id", folderId);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as MediaAsset[];
};
