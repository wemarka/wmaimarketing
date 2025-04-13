
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Search, Filter, Palette, Tag, GridIcon, LayoutGrid, Trash2, Edit, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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

interface ImageData {
  id: number;
  src: string;
  alt: string;
  category: string;
  tags?: string[];
  uploadDate?: string;
  description?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid");
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  // Sample images - in a real app these would come from your API/database
  const images: ImageData[] = [
    { 
      id: 1, 
      src: "https://source.unsplash.com/random/300x300?cosmetics", 
      alt: "منتج تجميل", 
      category: "makeup",
      tags: ["أحمر شفاه", "وردي", "لامع"],
      uploadDate: "2024-03-15",
      description: "أحمر شفاه وردي لامع مناسب للبشرة الدافئة"
    },
    { 
      id: 2, 
      src: "https://source.unsplash.com/random/300x300?skincare", 
      alt: "عناية بالبشرة", 
      category: "skincare",
      tags: ["كريم", "ترطيب", "نهاري"],
      uploadDate: "2024-03-10",
      description: "كريم ترطيب للبشرة الجافة وحمايتها من أشعة الشمس"
    },
    { 
      id: 3, 
      src: "https://source.unsplash.com/random/300x300?makeup", 
      alt: "مكياج", 
      category: "makeup",
      tags: ["أساس", "تغطية كاملة", "سائل"],
      uploadDate: "2024-03-05",
      description: "كريم أساس سائل ذو تغطية كاملة ومقاوم للماء"
    },
    { 
      id: 4, 
      src: "https://source.unsplash.com/random/300x300?hair", 
      alt: "شعر", 
      category: "haircare",
      tags: ["شامبو", "مضاد للقشرة", "منظف"],
      uploadDate: "2024-02-28",
      description: "شامبو منظف للشعر ومضاد للقشرة مناسب لجميع أنواع الشعر"
    },
    { 
      id: 5, 
      src: "https://source.unsplash.com/random/300x300?perfume", 
      alt: "عطر", 
      category: "fragrance",
      tags: ["عطر", "زهري", "نسائي"],
      uploadDate: "2024-02-20",
      description: "عطر نسائي بتركيبة زهرية مركزة تدوم طويلاً"
    },
    { 
      id: 6, 
      src: "https://source.unsplash.com/random/300x300?lipstick", 
      alt: "أحمر شفاه", 
      category: "makeup",
      tags: ["أحمر شفاه", "أحمر", "مات"],
      uploadDate: "2024-02-15",
      description: "أحمر شفاه مات طويل الأمد مناسب للمناسبات"
    },
    { 
      id: 7, 
      src: "https://source.unsplash.com/random/300x300?sunscreen", 
      alt: "واقي شمس", 
      category: "skincare",
      tags: ["واقي شمس", "SPF 50", "خفيف"],
      uploadDate: "2024-01-30",
      description: "واقي شمس خفيف بعامل حماية 50 مناسب للبشرة الدهنية"
    },
    { 
      id: 8, 
      src: "https://source.unsplash.com/random/300x300?hairbrush", 
      alt: "فرشاة شعر", 
      category: "haircare",
      tags: ["فرشاة", "تصفيف", "فك تشابك"],
      uploadDate: "2024-01-25",
      description: "فرشاة شعر لفك التشابك وتصفيف سهل للشعر"
    },
  ];

  // Filter images based on category and search query
  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      image.alt.includes(searchQuery) || 
      image.description?.includes(searchQuery) ||
      image.tags?.some(tag => tag.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setIsDetailDialogOpen(true);
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط الصورة بنجاح",
    });
  };

  const downloadImage = (src: string, alt: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${alt || 'image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "جاري التحميل",
      description: "بدأ تحميل الصورة",
    });
  };

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن صور بالاسم أو الوصف أو الكلمات المفتاحية..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-accent" : ""}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("large")}
            className={viewMode === "large" ? "bg-accent" : ""}
          >
            <GridIcon className="h-4 w-4" />
          </Button>
          
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
        <div className={`grid gap-4 ${viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          : "grid-cols-1 md:grid-cols-2"}`}
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <Card className={`overflow-hidden border-2 hover:border-primary/50 transition-all ${
                viewMode === "large" ? "flex flex-col md:flex-row h-full" : ""
              }`}>
                <div className={viewMode === "large" ? "md:w-1/2" : ""}>
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className={`w-full object-cover ${
                      viewMode === "grid" ? "h-48" : "h-64 md:h-full"
                    } rounded-t ${viewMode === "large" ? "md:rounded-l md:rounded-t-none" : ""}`}
                  />
                </div>
                <CardContent className={`p-3 ${viewMode === "large" ? "md:w-1/2 flex flex-col" : ""}`}>
                  <div className="mt-1 text-sm font-medium">{image.alt}</div>
                  {viewMode === "large" && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge 
                      variant="secondary"
                      style={{
                        backgroundColor: categories.find(c => c.value === image.category)?.color + "30",
                        color: categories.find(c => c.value === image.category)?.color
                      }}
                    >
                      {categories.find(c => c.value === image.category)?.label || image.category}
                    </Badge>
                    {viewMode === "large" && image.tags && image.tags.slice(0, 2).map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {viewMode === "large" && (
                    <div className="mt-auto pt-4 flex gap-2 justify-end">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
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

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedImage?.alt}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4 md:grid-cols-2">
            <div>
              <img 
                src={selectedImage?.src} 
                alt={selectedImage?.alt} 
                className="w-full h-auto object-cover rounded-md border"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">الوصف:</h4>
                <p className="text-sm text-muted-foreground">{selectedImage?.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">التصنيف:</h4>
                <Badge 
                  variant="secondary"
                  style={{
                    backgroundColor: categories.find(c => c.value === selectedImage?.category)?.color + "30",
                    color: categories.find(c => c.value === selectedImage?.category)?.color
                  }}
                >
                  {categories.find(c => c.value === selectedImage?.category)?.label || selectedImage?.category}
                </Badge>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">الكلمات المفتاحية:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedImage?.tags?.map((tag, i) => (
                    <Badge key={i} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">تاريخ الرفع:</h4>
                <p className="text-sm text-muted-foreground">{selectedImage?.uploadDate}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => selectedImage && copyImageUrl(selectedImage.src)}>
              نسخ الرابط
            </Button>
            <div className="flex gap-2">
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-1" /> حذف
              </Button>
              <Button size="sm" onClick={() => selectedImage && downloadImage(selectedImage.src, selectedImage.alt)}>
                <Download className="h-4 w-4 mr-1" /> تحميل
              </Button>
              <Button variant="secondary" size="sm">
                <Edit className="h-4 w-4 mr-1" /> تعديل
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
