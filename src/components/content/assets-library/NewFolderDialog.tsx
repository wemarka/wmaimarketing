
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface NewFolderDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NewFolderDialog: React.FC<NewFolderDialogProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('assetsLibrary.createFolder')}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                {t('assetsLibrary.folderName')}
              </label>
              <Input 
                id="name" 
                className="col-span-3" 
                placeholder={t('assetsLibrary.enterFolderName')} 
              />
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
          <Button onClick={() => setIsOpen(false)}>{t('assetsLibrary.create')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewFolderDialog;
