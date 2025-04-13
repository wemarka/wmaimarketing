
import React from "react";
import { useTranslation } from "react-i18next";
import { Trash2, Pencil } from "lucide-react";
import { Asset } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface AssetDetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedAsset: Asset | null;
}

const AssetDetailsDialog: React.FC<AssetDetailsDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedAsset,
}) => {
  const { t } = useTranslation();

  if (!selectedAsset) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('assetsLibrary.fileDetails')}</DialogTitle>
        </DialogHeader>
        
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
                <p className="text-sm font-medium text-muted-foreground">{t('assetsLibrary.fileName')}</p>
                <p className="text-base">{selectedAsset.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('assetsLibrary.fileType')}</p>
                <p className="text-base capitalize">{selectedAsset.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('assetsLibrary.fileSize')}</p>
                <p className="text-base">{selectedAsset.size}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('assetsLibrary.creationDate')}</p>
                <p className="text-base">{selectedAsset.created}</p>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">{t('assetsLibrary.tags')}</p>
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
              <TabsTrigger value="preview">{t('assetsLibrary.preview')}</TabsTrigger>
              <TabsTrigger value="usage">{t('assetsLibrary.usage')}</TabsTrigger>
              <TabsTrigger value="history">{t('assetsLibrary.history')}</TabsTrigger>
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
                {t('assetsLibrary.usageDescription')}
              </p>
            </TabsContent>
            <TabsContent value="history" className="border rounded-md p-4 mt-3">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>{t('assetsLibrary.created')}</span>
                  <span className="text-muted-foreground">{selectedAsset.created}</span>
                </li>
                <li className="flex justify-between">
                  <span>{t('assetsLibrary.lastModified')}</span>
                  <span className="text-muted-foreground">2024-03-12</span>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-1" />
            {t('assetsLibrary.delete')}
          </Button>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4 mr-1" />
            {t('assetsLibrary.edit')}
          </Button>
          <Button size="sm">{t('assetsLibrary.download')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetailsDialog;
