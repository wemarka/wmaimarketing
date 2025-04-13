
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader2, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  videoGenerated: boolean;
  setVideoGenerated: (generated: boolean) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImage,
  setSelectedImage,
  videoGenerated,
  setVideoGenerated
}) => {
  const { toast } = useToast();
  const [imageUploading, setImageUploading] = useState(false);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setImageUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        setSelectedImage(URL.createObjectURL(file));
        setImageUploading(false);
        
        toast({
          title: "تم رفع الصورة",
          description: "تم تحميل الصورة بنجاح",
        });
      }, 1500);
    }
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setVideoGenerated(false);
  };
  
  return (
    <div className="border-2 border-dashed rounded-lg p-4 text-center">
      {!selectedImage ? (
        <>
          <label htmlFor="image-upload" className="block cursor-pointer">
            <div className="flex flex-col items-center justify-center py-8">
              {imageUploading ? (
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin mb-2" />
              ) : (
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
              )}
              <p className="mb-1 font-medium">اختر صورة أو اسحبها هنا</p>
              <p className="text-xs text-muted-foreground">PNG, JPG أو WEBP</p>
            </div>
            <Input
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              onChange={handleImageUpload}
              disabled={imageUploading}
            />
          </label>
        </>
      ) : (
        <>
          <AspectRatio ratio={1 / 1} className="overflow-hidden rounded-md">
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={handleRemoveImage}>
              تغيير الصورة
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
