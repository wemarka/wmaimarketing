
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface TitleSectionProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  setTitle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{t("scheduler.titleSection.title", "عنوان المنشور")}</Label>
        <Input
          id="title"
          placeholder={t("scheduler.titleSection.titlePlaceholder", "أدخل عنوان المنشور هنا")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TitleSection;
