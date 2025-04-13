
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Define types manually instead of extending from Tables
export interface Post {
  id: string;
  title: string;
  content: string;
  media_url: string[] | null;
  platform: string;
  published_at: string | null;
  scheduled_at: string;
  status: string;
  campaign_id: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: string;
  target_audience: string[] | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SocialAccount {
  id: string;
  platform: string;
  account_name: string;
  profile_name: string;
  status: string;
  user_id: string;
  access_token: string | null;
  refresh_token: string | null;
  insights: any | null;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  format: string;
  size: number;
  dimensions: any | null;
  duration: number | null;
  tags: string[] | null;
  folder_id: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Fetch functions for each model
export const fetchPosts = async (userId: string, status?: string) => {
  let query = supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId);
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Post[];
};

export const fetchCampaigns = async (userId: string, status?: string) => {
  let query = supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId);
  
  if (status) {
    query = query.eq("status", status);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as Campaign[];
};

export const fetchProducts = async (status?: string) => {
  let query = supabase
    .from("products")
    .select("*");
  
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
  let query = supabase
    .from("media_assets")
    .select("*")
    .eq("user_id", userId);
  
  if (folderId) {
    query = query.eq("folder_id", folderId);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) throw new Error(error.message);
  return data as MediaAsset[];
};

// Add insert and update functions if needed
export const createPost = async (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase.from("posts").insert(post).select().single();
  if (error) throw new Error(error.message);
  return data as Post;
};

export const updatePost = async (id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase.from("posts").update(post).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Post;
};
