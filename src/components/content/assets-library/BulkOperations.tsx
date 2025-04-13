
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Asset } from "./types";
import BulkRename from "./BulkRename";
import BulkTransform from "./BulkTransform";

interface BulkOperationsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedAssets: Asset[];
  onComplete: () => void;
}

const BulkOperations: React.FC<BulkOperationsProps> = ({
  isOpen,
  setIsOpen,
  selectedAssets,
  onComplete,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>{t('assetsLibrary.bulkOperations')}</DrawerTitle>
          <DrawerDescription>
            {t('assetsLibrary.selectedItems', { count: selectedAssets.length })}: {selectedAssets.length}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4">
          <Tabs defaultValue="rename" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="rename">{t('assetsLibrary.renameFiles')}</TabsTrigger>
              <TabsTrigger value="transform">{t('assetsLibrary.transformImages')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rename" className="space-y-4">
              <BulkRename 
                selectedAssets={selectedAssets} 
                onComplete={() => {
                  setIsOpen(false);
                  onComplete();
                }}
              />
            </TabsContent>
            
            <TabsContent value="transform" className="space-y-4">
              <BulkTransform 
                selectedAssets={selectedAssets} 
                onComplete={() => {
                  setIsOpen(false);
                  onComplete();
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{t('assetsLibrary.cancel')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BulkOperations;
