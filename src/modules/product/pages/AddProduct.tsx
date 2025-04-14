
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowLeft, Plus, X, Upload, Loader2, Save } from "lucide-react";
import { createProduct, uploadProductImage, getProductCategories } from "../services/productService";

const AddProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("0");
  const [category, setCategory] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Load existing categories for suggestions
    const loadCategories = async () => {
      try {
        const categories = await getProductCategories();
        setExistingCategories(categories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    
    loadCategories();
  }, []);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const files = Array.from(event.target.files);
    setImageFiles(prevFiles => [...prevFiles, ...files]);
    
    // Create preview URLs for the new files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };
  
  const removeImage = (index: number) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form
    if (!name.trim() || !description.trim() || !category.trim() || parseFloat(price) <= 0) {
      toast.error(t("products.errors.invalidForm"));
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Upload images if any
      const uploadedImageUrls: string[] = [];
      
      if (imageFiles.length > 0) {
        setIsUploading(true);
        for (const file of imageFiles) {
          const imageUrl = await uploadProductImage(file);
          uploadedImageUrls.push(imageUrl);
        }
        setIsUploading(false);
      }
      
      // Create product
      await createProduct({
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrls: uploadedImageUrls
      });
      
      toast.success(t("products.success.created"));
      navigate("/product/list");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(t("products.errors.createFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t("products.add.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("products.add.subtitle")}</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/product/list")}>
            <ArrowLeft className="h-4 w-4 ml-2" />
            {t("common.back")}
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("products.add.basicInfo")}</CardTitle>
                  <CardDescription>
                    {t("products.add.basicInfoDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("products.add.name")}</Label>
                    <Input
                      id="name"
                      placeholder={t("products.add.namePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">{t("products.add.description")}</Label>
                    <Textarea
                      id="description"
                      placeholder={t("products.add.descriptionPlaceholder")}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">{t("products.add.price")}</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">{t("products.add.category")}</Label>
                      <Input
                        id="category"
                        list="categories"
                        placeholder={t("products.add.categoryPlaceholder")}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                      <datalist id="categories">
                        {existingCategories.map((cat, index) => (
                          <option key={index} value={cat} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t("products.add.images")}</CardTitle>
                  <CardDescription>
                    {t("products.add.imagesDescription")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="images" className="block mb-3">
                        {t("products.add.uploadImages")}
                      </Label>
                      
                      <div className="flex items-center justify-center w-full">
                        <Label
                          htmlFor="images"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/40"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              {t("products.add.dragAndDrop")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t("products.add.supportedFormats")}
                            </p>
                          </div>
                          <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            multiple
                          />
                        </Label>
                      </div>
                    </div>
                    
                    {previewUrls.length > 0 && (
                      <div>
                        <Label className="block mb-3">{t("products.add.preview")}</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {previewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>{t("products.add.actions")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {t("products.add.requiredFields")}
                    </p>
                    
                    <div className="flex items-center text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>{t("products.add.fieldName")}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>{t("products.add.fieldPrice")}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>{t("products.add.fieldCategory")}</span>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-4">
                  <div className="space-y-3 w-full">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || isUploading}
                    >
                      {isSubmitting || isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isUploading ? t("common.uploading") : t("common.saving")}
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {t("products.add.saveButton")}
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/product/list")}
                    >
                      {t("common.cancel")}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;
