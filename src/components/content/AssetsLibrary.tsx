
import React, { useState } from "react";
import { FilePlus2, Filter, Tag, Search, Grid2X2, FolderPlus, Trash2, Pencil, Download, List, SortDesc, SortAsc } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

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

type ViewMode = "grid" | "list";
type SortOption = "name" | "date" | "size" | "type";
type SortDirection = "asc" | "desc";

const AssetsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isNewAssetDialogOpen, setIsNewAssetDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());
  const [isBulkActionMenuOpen, setIsBulkActionMenuOpen] = useState(false);
  const { toast } = useToast();

  const toggleAssetSelection = (assetId: string) => {
    const newSelectedAssets = new Set(selectedAssets);
    if (selectedAssets.has(assetId)) {
      newSelectedAssets.delete(assetId);
    } else {
      newSelectedAssets.add(assetId);
    }
    setSelectedAssets(newSelectedAssets);
  };

  const clearSelectedAssets = () => {
    setSelectedAssets(new Set());
  };

  const handleBulkDelete = () => {
    toast({
      title: "تم الحذف",
      description: `تم حذف ${selectedAssets.size} عناصر بنجاح`,
    });
    clearSelectedAssets();
  };

  const handleBulkDownload = () => {
    toast({
      title: "جاري التحميل",
      description: `جاري تحميل ${selectedAssets.size} عناصر`,
    });
  };

  const handleBulkMove = () => {
    toast({
      title: "تم النقل",
      description: `تم نقل ${selectedAssets.size} عناصر بنجاح`,
    });
    clearSelectedAssets();
  };

  const handleBulkTag = () => {
    toast({
      title: "تم تحديث الوسوم",
      description: `تم تحديث وسوم ${selectedAssets.size} عناصر بنجاح`,
    });
    clearSelectedAssets();
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const filteredAssets = sampleAssets.filter(asset => {
    const matchesSearch = 
      !searchQuery || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFolder = !selectedFolder || asset.category === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return sortDirection === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      case "date":
        return sortDirection === "asc" 
          ? a.created.localeCompare(b.created) 
          : b.created.localeCompare(a.created);
      case "size":
        const getSize = (size: string) => parseInt(size.split(' ')[0]);
        return sortDirection === "asc" 
          ? getSize(a.size) - getSize(b.size) 
          : getSize(b.size) - getSize(a.size);
      case "type":
        return sortDirection === "asc" 
          ? a.type.localeCompare(b.type) 
          : b.type.localeCompare(a.type);
      default:
        return 0;
    }
  });

  const handleAssetClick = (asset: Asset, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      toggleAssetSelection(asset.id);
    } else {
      setSelectedAsset(asset);
      setIsDetailDialogOpen(true);
    }
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
    clearSelectedAssets();
  };

  const handleAssetSelectionChange = (assetId: string, checked: boolean) => {
    if (checked) {
      setSelectedAssets(prev => new Set([...prev, assetId]));
    } else {
      const newSelected = new Set(selectedAssets);
      newSelected.delete(assetId);
      setSelectedAssets(newSelected);
    }
  };

  const handleSelectAllAssets = () => {
    if (selectedAssets.size === sortedAssets.length) {
      clearSelectedAssets();
    } else {
      setSelectedAssets(new Set(sortedAssets.map(asset => asset.id)));
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {sortedAssets.map((asset) => (
        <Card
          key={asset.id}
          className={`cursor-pointer transition-all ${
            selectedAssets.has(asset.id) ? "ring-2 ring-primary" : "hover:border-primary/50"
          }`}
          onClick={(e) => handleAssetClick(asset, e)}
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
              <div className="absolute top-1 left-1">
                <Checkbox 
                  checked={selectedAssets.has(asset.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAssetSelection(asset.id);
                  }}
                  className="bg-background/70"
                />
              </div>
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
  );

  const renderListView = () => (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="p-2 text-right w-8">
              <Checkbox 
                checked={selectedAssets.size > 0 && selectedAssets.size === sortedAssets.length}
                onClick={handleSelectAllAssets}
              />
            </th>
            <th className="p-2 text-right">اسم الملف</th>
            <th className="p-2 text-right">النوع</th>
            <th className="p-2 text-right">الحجم</th>
            <th className="p-2 text-right">التاريخ</th>
            <th className="p-2 text-right">الوسوم</th>
            <th className="p-2 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset) => (
            <tr 
              key={asset.id} 
              className={`border-t hover:bg-muted/50 cursor-pointer ${
                selectedAssets.has(asset.id) ? "bg-primary/10" : ""
              }`}
              onClick={(e) => handleAssetClick(asset, e)}
            >
              <td className="p-2">
                <Checkbox 
                  checked={selectedAssets.has(asset.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAssetSelection(asset.id);
                  }}
                />
              </td>
              <td className="p-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded overflow-hidden bg-muted ml-2">
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="truncate max-w-[200px]">{asset.name}</span>
                </div>
              </td>
              <td className="p-2">{asset.type}</td>
              <td className="p-2">{asset.size}</td>
              <td className="p-2">{asset.created}</td>
              <td className="p-2">
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {asset.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{asset.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="p-2">
                <Button variant="ghost" size="icon" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAsset(asset);
                  setIsDetailDialogOpen(true);
                }}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>مكتبة الأصول البصرية</CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => setIsNewFolderDialogOpen(true)} variant="outline" size="sm">
                <FolderPlus className="h-4 w-4 ml-2" />
                مجلد جديد
              </Button>
              <Button onClick={() => setIsNewAssetDialogOpen(true)} size="sm">
                <FilePlus2 className="h-4 w-4 ml-2" />
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
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">
                    {selectedFolder 
                      ? assetFolders.find(f => f.id === selectedFolder)?.name
                      : "كل الملفات"}
                  </h3>
                  <Badge variant="outline" className="mr-2">
                    {sortedAssets.length} عنصر
                  </Badge>
                </div>
                
                {selectedAssets.size > 0 && (
                  <div className="flex items-center ml-auto mr-2 bg-muted/50 px-2 py-1 rounded-md">
                    <span className="text-sm ml-2">تم تحديد {selectedAssets.size} عناصر</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          إجراءات جماعية
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleBulkDownload}>
                          <Download className="h-4 w-4 ml-2" />
                          تحميل الملفات
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleBulkMove}>
                          <FolderPlus className="h-4 w-4 ml-2" />
                          نقل إلى مجلد
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleBulkTag}>
                          <Tag className="h-4 w-4 ml-2" />
                          إدارة الوسوم
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={handleBulkDelete}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 ml-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearSelectedAssets}
                    >
                      إلغاء التحديد
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 ml-2" />
                        ترتيب وفلترة
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>ترتيب حسب</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setSortBy("name")}>
                          <span>الاسم</span>
                          {sortBy === "name" && (
                            sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("date")}>
                          <span>التاريخ</span>
                          {sortBy === "date" && (
                            sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("size")}>
                          <span>الحجم</span>
                          {sortBy === "size" && (
                            sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("type")}>
                          <span>النوع</span>
                          {sortBy === "type" && (
                            sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={toggleSortDirection}>
                        {sortDirection === "asc" ? (
                          <>
                            <SortAsc className="h-4 w-4 ml-2" />
                            <span>تصاعدي</span>
                          </>
                        ) : (
                          <>
                            <SortDesc className="h-4 w-4 ml-2" />
                            <span>تنازلي</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none"
                    >
                      <Grid2X2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {sortedAssets.length > 0 ? (
                viewMode === "grid" ? renderGridView() : renderListView()
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
