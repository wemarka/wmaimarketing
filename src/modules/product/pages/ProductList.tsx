
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Package,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash,
  ShoppingCart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProducts, getProductCategories, deleteProduct } from "../services/productService";
import { Product } from "@/lib/supabase/models";

const ProductList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);
  
  useEffect(() => {
    // Filter and sort products whenever any filter criteria changes
    const filtered = filterProducts(products);
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);
  
  const loadProducts = async () => {
    setLoading(true);
    try {
      const productsData = await getProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error(t("products.errors.loadFailed"));
    } finally {
      setLoading(false);
    }
  };
  
  const loadCategories = async () => {
    try {
      const categoriesData = await getProductCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  
  const filterProducts = (products: Product[]): Product[] => {
    // Filter by search query and category
    let filtered = [...products];
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "oldest":
        filtered = filtered.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "priceAsc":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    return filtered;
  };
  
  const handleAddProduct = () => {
    navigate("/product/add");
  };
  
  const handleEditProduct = (id: string) => {
    navigate(`/product/edit/${id}`);
  };
  
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success(t("products.success.deleted"));
      loadProducts(); // Reload products
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(t("products.errors.deleteFailed"));
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(price);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{t("products.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("products.subtitle")}</p>
          </div>
          <Button onClick={handleAddProduct}>
            <Plus className="h-4 w-4 ml-2" />
            {t("products.addButton")}
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>{t("products.listTitle")}</CardTitle>
                <CardDescription>{t("products.listDescription")}</CardDescription>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadProducts}
                >
                  {t("common.refresh")}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("products.searchPlaceholder")}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 ml-2" />
                    <span className="ml-2">{selectedCategory || t("products.allCategories")}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t("products.allCategories")}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <ArrowUpDown className="h-4 w-4 ml-2" />
                    <span className="ml-2">{t("products.sortBy")}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{t("products.sortOptions.newest")}</SelectItem>
                    <SelectItem value="oldest">{t("products.sortOptions.oldest")}</SelectItem>
                    <SelectItem value="priceAsc">{t("products.sortOptions.priceAsc")}</SelectItem>
                    <SelectItem value="priceDesc">{t("products.sortOptions.priceDesc")}</SelectItem>
                    <SelectItem value="nameAsc">{t("products.sortOptions.nameAsc")}</SelectItem>
                    <SelectItem value="nameDesc">{t("products.sortOptions.nameDesc")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {loading ? (
              // Loading state
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto mb-4 animate-pulse text-muted-foreground" />
                <p>{t("products.loading")}</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              // Product grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden flex flex-col">
                    <div className="aspect-[4/3] w-full bg-secondary relative">
                      {product.image_url && product.image_url.length > 0 ? (
                        <img
                          src={Array.isArray(product.image_url) ? product.image_url[0] : product.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-muted">
                          <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2">
                        {product.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("products.actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                              <Edit className="h-4 w-4 ml-2" />
                              {t("products.actions.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash className="h-4 w-4 ml-2" />
                              {t("products.actions.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                    <Separator />
                    <div className="px-4 py-3 flex items-center justify-between">
                      <p className="font-bold text-lg">{formatPrice(product.price)}</p>
                      <Button size="sm" variant="secondary">
                        <ShoppingCart className="h-4 w-4 ml-2" />
                        {t("products.viewDetails")}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              // No products found
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-1">{t("products.noProducts")}</h3>
                <p className="text-muted-foreground mb-4">{t("products.noProductsDescription")}</p>
                <Button onClick={handleAddProduct}>
                  <Plus className="h-4 w-4 ml-2" />
                  {t("products.addButton")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductList;
