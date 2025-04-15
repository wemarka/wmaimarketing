
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { platforms } from "@/modules/content-creator/utils/platformIcons";

interface PlatformSectionProps {
  platform: string;
  setPlatform: (platform: string) => void;
}

const PlatformSection: React.FC<PlatformSectionProps> = ({
  platform,
  setPlatform,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="platform">المنصة</Label>
      <Select value={platform} onValueChange={setPlatform}>
        <SelectTrigger id="platform">
          <SelectValue placeholder="اختر المنصة" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(platforms).map(([key, { icon, label }]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                {React.cloneElement(icon as React.ReactElement, {
                  className: `h-4 w-4 ${
                    key === "instagram" ? "text-pink-600" : 
                    key === "facebook" ? "text-blue-600" : 
                    key === "linkedin" ? "text-blue-700" :
                    key === "youtube" ? "text-red-600" :
                    key === "pinterest" ? "text-red-700" :
                    key === "twitter" ? "text-sky-500" :
                    "text-slate-600"
                  }`
                })}
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlatformSection;
