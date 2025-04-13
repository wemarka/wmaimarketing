
import React, { useState } from "react";
import { FilePlus2, Filter, Tag, Search, Grid2X2, FolderPlus, Trash2, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "font";
  thumbnail: string;
  category: string;
  tags: string[];
  size: string;
  created: string;
}

interface AssetFolder {
  id: string;
  name: string;
  icon: JSX.Element;
  count: number;
}

const sampleAssets: Asset[] = [
  {
    id: "1",
    name: "logo_main.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?logo",
    category: "logos",
    tags: ["لوجو", "شعار", "رئيسي"],
    size: "120 كب",
    created: "2024-03-10",
  },
  {
    id: "2",
    name: "banner_summer.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?banner",
    category: "banners",
    tags: ["بانر", "صيف", "إعلان"],
    size: "450 كب",
    created: "2024-03-05",
  },
  {
    id: "3",
    name: "product_serum.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?serum",
    category: "products",
    tags: ["منتج", "سيروم", "عناية"],
    size: "280 كب",
    created: "2024-03-01",
  },
  {
    id: "4",
    name: "makeup_tutorial.mp4",
    type: "video",
    thumbnail: "https://source.unsplash.com/random/100x100?makeup",
    category: "videos",
    tags: ["فيديو", "مكياج", "تعليمي"],
    size: "4.2 مب",
    created: "2024-02-25",
  },
  {
    id: "5",
    name: "brand_guidelines.pdf",
    type: "document",
    thumbnail: "https://source.unsplash.com/random/100x100?document",
    category: "documents",
    tags: ["مستند", "براند", "إرشادات"],
    size: "1.8 مب",
    created: "2024-02-20",
  },
  {
    id: "6",
    name: "cairo_font.ttf",
    type: "font",
    thumbnail: "https://source.unsplash.com/random/100x100?font",
    category: "fonts",
    tags: ["خط", "عربي", "القاهرة"],
    size: "520 كب",
    created: "2024-02-15",
  },
  {
    id: "7",
    name: "instagram_post.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?instagram",
    category: "social",
    tags: ["منشور", "انستجرام", "وسائل التواصل"],
    size: "350 كب",
    created: "2024-02-10",
  },
  {
    id: "8",
    name: "product_cream.png",
    type: "image",
    thumbnail: "https://source.unsplash.com/random/100x100?cream",
    category: "products",
    tags: ["منتج", "كريم", "ترطيب"],
    size: "240 كب",
    created: "2024-02-05",
  }
];

const assetFolders: AssetFolder[] = [
  { id: "1", name: "الشعارات", icon: <div className="text-amber-500">🏷️</div>, count: 12 },
  { id: "2", name: "البانرات", icon: <div className="text-blue-500">🖼️</div>, count: 8 },
  { id: "3", name: "صور المنتجات", icon: <div className="text-pink-500">📦</div>, count: 45 },
  { id: "4", name: "الفيديوهات", icon: <div className="text-purple-500">🎬</div>, count: 6 },
  { id: "5", name: "المستندات", icon: <div className="text-green-500">📑</div>, count: 15 },
  { id: "6", name: "الخطوط", icon: <div className="text-orange-500">🔤</div>, count: 10 },
  { id: "7", name: "وسائل التواصل", icon: <div className="text-sky-500">📱</div>, count: 30 },
];

const typeIcons = {
  image: "🖼️",
  video: "🎬",
  document: "📄",
  font: "🔤",
};

const AssetsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isNewAssetDialogOpen, setIsNewAssetDialogOpen] = useState(false);

  const filteredAssets = sampleAssets.filter(asset => {
    const matchesSearch = 
      !searchQuery || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFolder = !selectedFolder || asset.category === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailDialogOpen(true);
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>مكتبة الأصول البصرية</CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => setIsNewFolderDialogOpen(true)} variant="outline" size="sm">
                <FolderPlus className="h-4 w-4 mr-2" />
                مجلد جديد
              </Button>
              <Button onClick={() => setIsNewAssetDialogOpen(true)} size="sm">
                <FilePlus2 className="h-4 w-4 mr-2" />
                إضافة ملف
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-64">
              <Card className="h-full">
                <CardHeader className="p-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-1">
                      {assetFolders.map((folder) => (
                        <Button
                          key={folder.id}
                          variant={selectedFolder === folder.id ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => handleFolderClick(folder.id)}
                        >
                          {folder.icon}
                          <span className="mr-2 flex-1 text-right">{folder.name}</span>
                          <Badge variant="outline">{folder.count}</Badge>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">
                    {selectedFolder 
                      ? assetFolders.find(f => f.id === selectedFolder)?.name
                      : "كل الملفات"}
                  </h3>
                  <Badge variant="outline" className="mr-2">
                    {filteredAssets.length} عنصر
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>خيارات التصفية</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <span>تصفية حسب النوع</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>تصفية حسب التاريخ</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="mr-2 h-4 w-4" />
                          <span>تصفية حسب الوسم</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="outline" size="icon">
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {filteredAssets.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredAssets.map((asset) => (
                    <Card
                      key={asset.id}
                      className="cursor-pointer hover:border-primary/50 transition-all"
                      onClick={() => handleAssetClick(asset)}
                    >
                      <CardContent className="p-2">
                        <div className="aspect-square relative rounded overflow-hidden bg-muted mb-2 flex items-center justify-center">
                          <div className="absolute top-1 right-1 bg-background/70 rounded p-1 text-xs">
                            {typeIcons[asset.type]}
                          </div>
                          <img
                            src={asset.thumbnail}
                            alt={asset.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="truncate text-sm font-medium" title={asset.name}>
                          {asset.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {asset.size}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-12 text-center">
                  <p className="text-muted-foreground">لا توجد ملفات تطابق معايير البحث</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">تفاصيل الملف</DialogTitle>
          </DialogHeader>
          
          {selectedAsset && (
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 aspect-square rounded overflow-hidden flex items-center justify-center bg-muted">
                  <img
                    src={selectedAsset.thumbnail}
                    alt={selectedAsset.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="col-span-2 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">اسم الملف</p>
                    <p className="text-base">{selectedAsset.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">النوع</p>
                    <p className="text-base capitalize">{selectedAsset.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">الحجم</p>
                    <p className="text-base">{selectedAsset.size}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">تاريخ الإنشاء</p>
                    <p className="text-base">{selectedAsset.created}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">الوسوم</p>
                <div className="flex flex-wrap gap-1">
                  {selectedAsset.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">معاينة</TabsTrigger>
                  <TabsTrigger value="usage">الاستخدام</TabsTrigger>
                  <TabsTrigger value="history">السجل</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="border rounded-md p-4 mt-3">
                  <div className="flex items-center justify-center">
                    <img
                      src={selectedAsset.thumbnail}
                      alt={selectedAsset.name}
                      className="max-h-[200px] object-contain"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="usage" className="border rounded-md p-4 mt-3">
                  <p className="text-center text-muted-foreground">
                    يستخدم هذا الملف في 3 منشورات و2 إعلانات
                  </p>
                </TabsContent>
                <TabsContent value="history" className="border rounded-md p-4 mt-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>تم الإنشاء</span>
                      <span className="text-muted-foreground">{selectedAsset.created}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>آخر تعديل</span>
                      <span className="text-muted-foreground">2024-03-12</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              حذف
            </Button>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              تعديل
            </Button>
            <Button size="sm">تحميل</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إنشاء مجلد جديد</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  اسم المجلد
                </label>
                <Input id="name" className="col-span-3" placeholder="أدخل اسم المجلد" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsNewFolderDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setIsNewFolderDialogOpen(false)}>إنشاء</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Asset Dialog */}
      <Dialog open={isNewAssetDialogOpen} onOpenChange={setIsNewAssetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة ملف جديد</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <label className="cursor-pointer flex flex-col items-center justify-center">
                  <FilePlus2 className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-1">انقر أو اسحب ملفات للتحميل</p>
                  <p className="text-xs text-muted-foreground">جميع أنواع الملفات (الحد الأقصى 10 ميجابايت)</p>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsNewAssetDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setIsNewAssetDialogOpen(false)}>تحميل</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetsLibrary;
