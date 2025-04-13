
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ImageIcon } from "lucide-react";

interface AdPreviewProps {
  adContent: {
    headline: string;
    description: string;
    callToAction: string;
    color: string;
    adSize: string;
    customWidth: number;
    customHeight: number;
    effectStyle: string;
    fontSize: number;
    overlayOpacity: number;
    showLogo: boolean;
    brandPosition: string;
    customFont: string;
    textShadow: boolean;
    alignmentX: string;
    alignmentY: string;
    platform: string;
  };
  generatedAd: string | null;
  getAdSizeConfig: {
    id: string;
    name: string;
    aspectRatio: string;
    size: string;
  };
  onDownload: () => void;
}

const AdPreview: React.FC<AdPreviewProps> = ({
  adContent,
  generatedAd,
  getAdSizeConfig,
  onDownload
}) => {
  const { t } = useTranslation();

  const getAspectRatio = () => {
    if (adContent.adSize === "custom") {
      return "";
    }
    return getAdSizeConfig.aspectRatio;
  };

  const getTextStyle = () => {
    let style: React.CSSProperties = {
      fontFamily: getFontFamily(),
      fontSize: `${adContent.fontSize}%`,
      textAlign: adContent.alignmentX as any
    };
    
    if (adContent.textShadow) {
      style.textShadow = "0 2px 4px rgba(0,0,0,0.3)";
    }
    
    return style;
  };

  const getFontFamily = () => {
    switch (adContent.customFont) {
      case "elegant": return "serif";
      case "bold": return "system-ui";
      case "playful": return "cursive";
      case "minimal": return "monospace";
      default: return "sans-serif";
    }
  };

  const getBackgroundStyle = () => {
    if (!generatedAd) return {};
    
    let style: React.CSSProperties = {
      backgroundImage: `url(${generatedAd})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
    
    switch (adContent.effectStyle) {
      case "gradient":
        style.backgroundImage = `linear-gradient(to bottom, transparent, rgba(0,0,0,0.7)), url(${generatedAd})`;
        break;
      case "blur": 
        style.filter = "blur(3px)";
        break;
      case "overlay":
        style.boxShadow = `inset 0 0 0 2000px rgba(0, 0, 0, ${adContent.overlayOpacity / 100})`;
        break;
      case "duotone":
        style.filter = "grayscale(100%) sepia(20%) brightness(90%) hue-rotate(45deg)";
        break;
      default:
        break;
    }
    
    return style;
  };

  const getContentPosition = () => {
    let position = "justify-end";
    
    switch (adContent.brandPosition) {
      case "top": position = "justify-start"; break;
      case "center": position = "justify-center"; break;
      case "bottom": position = "justify-end"; break;
      case "none": position = "hidden"; break;
    }
    
    switch (adContent.alignmentX) {
      case "left": position += " items-start"; break;
      case "center": position += " items-center"; break;
      case "right": position += " items-end"; break;
      default: position += " items-center";
    }
    
    return position;
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">{t("adDesigner.preview")}</h3>
          <div className="flex items-center gap-2">
            {generatedAd && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="mr-2 h-4 w-4" />
                {t("adDesigner.download")}
              </Button>
            )}
            <div className="text-sm text-muted-foreground">
              {getAdSizeConfig.size}
            </div>
          </div>
        </div>

        <div className={`bg-gray-50 rounded-lg ${generatedAd ? '' : 'h-[400px]'} flex items-center justify-center border overflow-hidden`}>
          {generatedAd ? (
            <div 
              className={`relative w-full ${getAspectRatio()}`}
              style={adContent.adSize === "custom" ? { 
                width: `${adContent.customWidth}px`, 
                height: `${adContent.customHeight}px`,
                maxWidth: "100%",
                maxHeight: "600px"
              } : {}}
            >
              <div className="absolute inset-0" style={getBackgroundStyle()}></div>
              
              <div className={`absolute inset-0 flex flex-col p-4 ${getContentPosition()}`}>
                <div className={`${adContent.effectStyle === "overlay" ? "text-white" : ""} max-w-[80%]`} style={getTextStyle()}>
                  {adContent.headline && <h3 className="text-xl font-bold mb-1">{adContent.headline}</h3>}
                  {adContent.description && <p className="text-sm mb-2">{adContent.description}</p>}
                  <Button size="sm" style={{backgroundColor: adContent.color}}>
                    {t(`adDesigner.cta.${adContent.callToAction}`)}
                  </Button>
                </div>
              </div>
              
              {adContent.showLogo && (
                <div className="absolute top-2 left-2 bg-white/80 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gray-800"></div>
                </div>
              )}
              
              <div className="absolute bottom-2 right-2 text-xs px-2 py-1 bg-black/50 text-white rounded-full">
                {adContent.platform}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <ImageIcon className="mx-auto h-16 w-16 mb-2 opacity-30" />
              <p>{t("adDesigner.noPreview")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdPreview;
