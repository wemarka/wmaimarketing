
import React from "react";
import { motion } from "framer-motion";
import { ImagePlus, Search, Filter, Palette, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageCategorySelect from "./ImageCategorySelect";

// Sample data - this would come from your API in a real implementation
const categories = [
  { value: "all", label: "الكل" },
  { value: "skincare", label: "العناية بالبشرة", color: "#f59e0b" },
  { value: "makeup", label: "المكياج", color: "#ec4899" },
  { value: "haircare", label: "العناية بالشعر", color: "#8b5cf6" },
  { value: "fragrance", label: "العطور", color: "#10b981" },
];

interface ImageGalleryProps {
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Sample images - in a real app these would come from your API/database
  const images = [
    { id: 1, src: "https://source.unsplash.com/random/300x300?cosmetics", alt: "منتج تجميل", category: "makeup" },
    { id: 2, src: "https://source.unsplash.com/random/300x300?skincare", alt: "عناية بالبشرة", category: "skincare" },
    { id: 3, src: "https://source.unsplash.com/random/300x300?makeup", alt: "مكياج", category: "makeup" },
    { id: 4, src: "https://source.unsplash.com/random/300x300?hair", alt: "شعر", category: "haircare" },
    { id: 5, src: "https://source.unsplash.com/random/300x300?perfume", alt: "عطر", category: "fragrance" },
    { id: 6, src: "https://source.unsplash.com/random/300x300?lipstick", alt: "أحمر شفاه", category: "makeup" },
  ];

  // Filter images based on category and search query
  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;
    const matchesSearch = !searchQuery || image.alt.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن صور..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <ImageCategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            className="w-[180px]"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>خيارات تصفية</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>تصفية حسب اللون</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Tag className="mr-2 h-4 w-4" />
                  <span>تصفية حسب الكلمات المفتاحية</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button>
            <ImagePlus className="mr-2 h-4 w-4" />
            رفع صورة
          </Button>
        </div>
      </div>
      
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-2">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="mt-2 text-sm font-medium">{image.alt}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {categories.find(c => c.value === image.category)?.label || image.category}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">لم يتم العثور على صور تطابق بحثك.</p>
          <Button variant="outline" className="mt-4">
            <ImagePlus className="mr-2 h-4 w-4" />
            رفع صورة جديدة
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
