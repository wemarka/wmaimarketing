
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Library } from "lucide-react";

interface AdContentProps {
  adContent: {
    headline: string;
    description: string;
    callToAction: string;
    imagePrompt: string;
    imageUrl: string;
  };
  onInputChange: (field: string, value: any) => void;
  onOpenAssetLibrary: () => void;
}

const AdContent: React.FC<AdContentProps> = ({ adContent, onInputChange, onOpenAssetLibrary }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="headline">{t("adDesigner.headline")}</Label>
        <Input 
          id="headline" 
          value={adContent.headline}
          onChange={(e) => onInputChange("headline", e.target.value)}
          placeholder={t("adDesigner.headlinePlaceholder")}
        />
      </div>

      <div>
        <Label htmlFor="description">{t("adDesigner.description")}</Label>
        <Textarea 
          id="description" 
          value={adContent.description}
          onChange={(e) => onInputChange("description", e.target.value)}
          placeholder={t("adDesigner.descriptionPlaceholder")}
          className="min-h-[100px]"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="imagePrompt">{t("adDesigner.imagePrompt")}</Label>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onOpenAssetLibrary}
          >
            <Library className="h-4 w-4 mr-2" />
            {t("adDesigner.selectFromLibrary")}
          </Button>
        </div>
        <Textarea 
          id="imagePrompt" 
          value={adContent.imagePrompt}
          onChange={(e) => onInputChange("imagePrompt", e.target.value)}
          placeholder={t("adDesigner.imagePlaceholder")}
          disabled={!!adContent.imageUrl}
        />
        {adContent.imageUrl && (
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-muted-foreground">{t("adDesigner.usingSelectedImage")}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onInputChange("imageUrl", "")}
            >
              {t("adDesigner.clearImage")}
            </Button>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="callToAction">{t("adDesigner.callToAction")}</Label>
        <Select 
          value={adContent.callToAction}
          onValueChange={(value) => onInputChange("callToAction", value)}
        >
          <SelectTrigger id="callToAction">
            <SelectValue placeholder={t("adDesigner.selectCTA")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shop_now">{t("adDesigner.cta.shop_now")}</SelectItem>
            <SelectItem value="learn_more">{t("adDesigner.cta.learn_more")}</SelectItem>
            <SelectItem value="sign_up">{t("adDesigner.cta.sign_up")}</SelectItem>
            <SelectItem value="contact_us">{t("adDesigner.cta.contact_us")}</SelectItem>
            <SelectItem value="book_now">{t("adDesigner.cta.book_now")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdContent;
