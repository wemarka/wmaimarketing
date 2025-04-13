
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  RotateCw, 
  RotateCcw,
  FlipHorizontal, 
  FlipVertical,
  Crop,
  ImageUp,
  MoveHorizontal,
  MoveVertical
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Asset } from "./types";

interface BulkTransformProps {
  selectedAssets: Asset[];
  onComplete: () => void;
}

const BulkTransform: React.FC<BulkTransformProps> = ({ selectedAssets, onComplete }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Transform settings
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [resize, setResize] = useState<number | null>(null);
  const [resizeOption, setResizeOption] = useState<"percentage" | "fixedWidth" | "fixedHeight">("percentage");
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<string>("original");
  
  const imageCount = selectedAssets.filter(asset => asset.type === "image").length;
  
  const handleTransform = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // In a real app, this would apply transformations to the images
      
      toast({
        title: t('assetsLibrary.operationComplete'),
        description: t('assetsLibrary.imagesTransformed', { count: imageCount }),
      });
      
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };
  
  if (imageCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <ImageUp size={48} className="text-muted-foreground mb-4" />
        <p className="text-center text-muted-foreground">
          {t('assetsLibrary.noImagesSelected')}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 pb-4">
      <div>
        <Label className="mb-2 block">{t('assetsLibrary.rotate')}</Label>
        <div className="flex justify-between gap-2">
          <Button
            variant="outline" 
            size="icon" 
            onClick={() => setRotate((prev) => (prev - 90) % 360)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center py-2">
            {rotate}°
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setRotate((prev) => (prev + 90) % 360)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">{t('assetsLibrary.flip')}</Label>
        <div className="flex gap-2">
          <Button 
            variant={flipHorizontal ? "default" : "outline"}
            className="flex-1"
            onClick={() => setFlipHorizontal(!flipHorizontal)}
          >
            <FlipHorizontal className="h-4 w-4 mr-2" />
            {t('assetsLibrary.horizontal')}
          </Button>
          <Button 
            variant={flipVertical ? "default" : "outline"}
            className="flex-1"
            onClick={() => setFlipVertical(!flipVertical)}
          >
            <FlipVertical className="h-4 w-4 mr-2" />
            {t('assetsLibrary.vertical')}
          </Button>
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">{t('assetsLibrary.resize')}</Label>
        <Select 
          value={resizeOption} 
          onValueChange={(value) => setResizeOption(value as "percentage" | "fixedWidth" | "fixedHeight")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('assetsLibrary.selectResizeOption')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">{t('assetsLibrary.scaleByPercentage')}</SelectItem>
            <SelectItem value="fixedWidth">{t('assetsLibrary.setFixedWidth')}</SelectItem>
            <SelectItem value="fixedHeight">{t('assetsLibrary.setFixedHeight')}</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="mt-2">
          <Slider
            defaultValue={[100]}
            max={resizeOption === "percentage" ? 200 : 2000}
            min={resizeOption === "percentage" ? 10 : 50}
            step={1}
            onValueChange={(values) => setResize(values[0])}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {resizeOption === "percentage" ? "10%" : "50px"}
            </span>
            <span className="text-xs">
              {resize || (resizeOption === "percentage" ? 100 : 800)}
              {resizeOption === "percentage" ? "%" : "px"}
            </span>
            <span className="text-xs text-muted-foreground">
              {resizeOption === "percentage" ? "200%" : "2000px"}
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">{t('assetsLibrary.quality')}: {quality}%</Label>
        <Slider
          defaultValue={[80]}
          max={100}
          min={10}
          step={5}
          onValueChange={(values) => setQuality(values[0])}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">10%</span>
          <span className="text-xs text-muted-foreground">100%</span>
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">{t('assetsLibrary.convertTo')}</Label>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('assetsLibrary.selectFormat')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="original">{t('assetsLibrary.keepOriginal')}</SelectItem>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="webp">WEBP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mt-2 flex items-center space-x-2">
        <Checkbox id="maintainAspectRatio" defaultChecked />
        <label
          htmlFor="maintainAspectRatio"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t('assetsLibrary.maintainAspectRatio')}
        </label>
      </div>
      
      <Button 
        onClick={handleTransform} 
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? t('assetsLibrary.processing') : t('assetsLibrary.applyTransformations')}
      </Button>
    </div>
  );
};

export default BulkTransform;
