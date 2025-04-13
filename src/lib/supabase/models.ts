
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

// Define types using the imported Tables type
export interface Post extends Tables<"posts"> {}
export interface Campaign extends Tables<"campaigns"> {}
export interface Product extends Tables<"products"> {}
export interface SocialAccount extends Tables<"social_accounts"> {}
export interface MediaAsset extends Tables<"media_assets"> {}

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

// Add insert and update functions if needed
export const createPost = async (post: TablesInsert<"posts">) => {
  const { data, error } = await supabase.from("posts").insert(post).select().single();
  if (error) throw new Error(error.message);
  return data as Post;
};

export const updatePost = async (id: string, post: TablesUpdate<"posts">) => {
  const { data, error } = await supabase.from("posts").update(post).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as Post;
};
