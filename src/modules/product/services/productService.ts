
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/lib/supabase/models";

export interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrls?: string[];
}

export const createProduct = async (params: CreateProductParams): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: params.name,
      description: params.description,
      price: params.price,
      category: params.category,
      image_url: params.imageUrls || [],
      status: 'active'
    })
    .select()
    .single();
  
  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }
  
  return data as Product;
};

export const getProducts = async (category?: string, status: string = 'active'): Promise<Product[]> => {
  let query = supabase
    .from('products')
    .select('*')
    .eq('status', status);
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  return data as Product[];
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
  
  return data as Product;
};

export const updateProduct = async (id: string, updates: Partial<CreateProductParams>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: updates.name,
      description: updates.description,
      price: updates.price,
      category: updates.category,
      image_url: updates.imageUrls,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }
  
  return data as Product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Soft delete by updating status
  const { error } = await supabase
    .from('products')
    .update({ 
      status: 'deleted',
      updated_at: new Date().toISOString()
    })
    .eq('id', id);
  
  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .eq('status', 'active');
  
  if (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
  
  // Extract unique categories
  const categories = [...new Set(data.map(item => item.category))];
  return categories;
};

export const uploadProductImage = async (file: File): Promise<string> => {
  // Using the media_assets table for tracking
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  // Generate a unique file name
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `product_images/${fileName}`;
  
  // Upload the file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);
  
  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw uploadError;
  }
  
  // Get the public URL for the file
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);
  
  // Add to media_assets table for tracking
  const { error: assetError } = await supabase
    .from('media_assets')
    .insert({
      name: file.name,
      url: data.publicUrl,
      type: 'image',
      format: fileExt,
      size: file.size,
      user_id: user.user.id,
      tags: ['product', 'product-image']
    });
  
  if (assetError) {
    console.error("Error adding to media_assets:", assetError);
  }
  
  return data.publicUrl;
};
