
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, FolderOpen, Image, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sampleAssets } from "../content/assets-library/data";
import { Asset } from "../content/assets-library/types";

interface AssetLibrarySelectorProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelectImage: (url: string) => void;
}

const AssetLibrarySelector: React.FC<AssetLibrarySelectorProps> = ({
  isOpen,
  setIsOpen,
  onSelectImage
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(sampleAssets.map(asset => asset.category)));

  const filteredAssets = sampleAssets.filter(asset => {
    // Filter by type (only images)
    if (!asset.type.includes("image")) return false;
    
    // Filter by search query
    const matchesSearch = !searchQuery || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by category
    const matchesCategory = !selectedCategory || asset.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSelectAsset = (asset: typeof sampleAssets[0]) => {
    onSelectImage(asset.thumbnail);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[900px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('adDesigner.assetSelector.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="flex h-full space-x-4">
          {/* Sidebar */}
          <div className="w-[200px] border-r pr-4">
            <div className="mb-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start px-2" 
                onClick={() => setSelectedCategory(null)}
              >
                <Image className="mr-2 h-4 w-4" />
                {t('adDesigner.assetSelector.allImages')}
              </Button>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium px-2 py-1">{t('adDesigner.assetSelector.categories')}</p>
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "ghost"}
                  className="w-full justify-start px-2"
                  onClick={() => setSelectedCategory(category)}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('adDesigner.assetSelector.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <ScrollArea className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <div 
                      key={asset.id} 
                      className="border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleSelectAsset(asset)}
                    >
                      <div className="aspect-square relative">
                        <img 
                          src={asset.thumbnail} 
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.created}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 flex items-center justify-center h-40">
                    <p className="text-muted-foreground">{t('adDesigner.assetSelector.noResults')}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssetLibrarySelector;

