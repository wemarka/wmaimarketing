
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

// Extend the existing types from Supabase types
export interface Post extends Tables<"posts"> {
  title: string;
  content: string;
  media_url: string[];
  platform: "instagram" | "facebook" | "tiktok" | "twitter";
  status: "draft" | "scheduled" | "published" | "failed";
  scheduled_at: string;
  published_at: string | null;
  user_id: string;
  campaign_id: string | null;
}

export interface Campaign extends Tables<"campaigns"> {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "active" | "pending" | "completed" | "archived";
  budget: number;
  target_audience: string[];
  user_id: string;
}

export interface Product extends Tables<"products"> {
  name: string;
  description: string;
  category: string;
  image_url: string[];
  price: number;
  status: "active" | "inactive" | "archived";
}

export interface SocialAccount extends Tables<"social_accounts"> {
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
}

export interface MediaAsset extends Tables<"media_assets"> {
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
}

// Fetch functions for each model
export const fetchPosts = async (userId: string, status?: string) => {
  let query = supabase.from("posts").select("*").eq("user_id", userId);
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Post[];
};

export const fetchCampaigns = async (userId: string, status?: string) => {
  let query = supabase.from("campaigns").select("*").eq("user_id", userId);
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Campaign[];
};

export const fetchProducts = async (status?: string) => {
  let query = supabase.from("products").select("*");
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Product[];
};

export const fetchSocialAccounts = async (userId: string) => {
  const { data, error } = await supabase
    .from("social_accounts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as SocialAccount[];
};

export const fetchMediaAssets = async (userId: string, folderId?: string) => {
  let query = supabase.from("media_assets").select("*").eq("user_id", userId);
  
  if (folderId) {
    query = query.eq("folder_id", folderId);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as MediaAsset[];
};
