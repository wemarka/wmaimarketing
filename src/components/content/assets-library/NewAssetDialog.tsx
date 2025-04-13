
import React from "react";
import { useTranslation } from "react-i18next";
import { FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface NewAssetDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NewAssetDialog: React.FC<NewAssetDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('assetsLibrary.uploadFile')}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <label className="cursor-pointer flex flex-col items-center justify-center">
                <FilePlus2 className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-1">{t('assetsLibrary.dragDrop')}</p>
                <p className="text-xs text-muted-foreground">{t('assetsLibrary.fileTypes')}</p>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            {t('assetsLibrary.cancel')}
          </Button>
          <Button onClick={() => setIsOpen(false)}>{t('assetsLibrary.upload')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAssetDialog;
