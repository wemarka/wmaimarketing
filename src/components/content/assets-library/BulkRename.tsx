
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Asset } from "./types";

interface BulkRenameProps {
  selectedAssets: Asset[];
  onComplete: () => void;
}

const BulkRename: React.FC<BulkRenameProps> = ({ selectedAssets, onComplete }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [renamePattern, setRenamePattern] = useState("");
  const [renameMethod, setRenameMethod] = useState<"replace" | "append" | "prepend">("replace");
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleRename = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // In a real app, this would update the files in the backend
      
      toast({
        title: t('assetsLibrary.operationComplete'),
        description: t('assetsLibrary.filesRenamed', { count: selectedAssets.length }),
      });
      
      setIsProcessing(false);
      onComplete();
    }, 1000);
  };
  
  const getPreview = (fileName: string): string => {
    // Get file extension
    const lastDotIndex = fileName.lastIndexOf('.');
    const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
    const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
    
    let newName = name;
    
    switch (renameMethod) {
      case "replace":
        if (searchText) {
          newName = name.replace(new RegExp(searchText, 'g'), replaceText);
        } else {
          newName = renamePattern || name;
        }
        break;
      case "append":
        newName = name + renamePattern;
        break;
      case "prepend":
        newName = renamePattern + name;
        break;
    }
    
    return newName + extension;
  };
  
  return (
    <div className="space-y-4 pb-4">
      <RadioGroup
        value={renameMethod}
        onValueChange={(value) => setRenameMethod(value as "replace" | "append" | "prepend")}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="replace" id="replace" />
          <Label htmlFor="replace">{t('assetsLibrary.replaceFilename')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="append" id="append" />
          <Label htmlFor="append">{t('assetsLibrary.appendToFilename')}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="prepend" id="prepend" />
          <Label htmlFor="prepend">{t('assetsLibrary.prependToFilename')}</Label>
        </div>
      </RadioGroup>
      
      {renameMethod === "replace" ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="searchText">{t('assetsLibrary.searchFor')}</Label>
              <Input 
                id="searchText"
                placeholder={t('assetsLibrary.searchTextPlaceholder')}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="replaceText">{t('assetsLibrary.replaceWith')}</Label>
              <Input 
                id="replaceText"
                placeholder={t('assetsLibrary.replaceTextPlaceholder')}
                value={replaceText}
                onChange={e => setReplaceText(e.target.value)}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('assetsLibrary.leaveSearchEmptyToReplace')}
          </p>
        </div>
      ) : (
        <div>
          <Label htmlFor="pattern">{t('assetsLibrary.patternToApply')}</Label>
          <Input 
            id="pattern"
            placeholder={renameMethod === "append" ? "suffix" : "prefix"}
            value={renamePattern}
            onChange={e => setRenamePattern(e.target.value)}
          />
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">{t('assetsLibrary.preview')}</h3>
        <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
          <ul className="space-y-1">
            {selectedAssets.slice(0, 5).map((asset, index) => (
              <li key={index} className="text-xs">
                <span className="text-muted-foreground">{asset.name}</span>
                <span className="mx-2">→</span>
                <span>{getPreview(asset.name)}</span>
              </li>
            ))}
            {selectedAssets.length > 5 && (
              <li className="text-xs text-muted-foreground">
                {t('assetsLibrary.andMore', { count: selectedAssets.length - 5 })}
              </li>
            )}
          </ul>
        </div>
      </div>
      
      <Button 
        onClick={handleRename} 
        disabled={isProcessing || (renameMethod !== "replace" && !renamePattern) || (renameMethod === "replace" && !searchText && !renamePattern)}
        className="w-full"
      >
        {isProcessing ? t('assetsLibrary.processing') : t('assetsLibrary.applyRenaming')}
      </Button>
    </div>
  );
};

export default BulkRename;
