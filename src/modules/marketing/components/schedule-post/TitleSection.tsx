
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

interface TitleSectionProps {
  title: string;
  content: string;
  onChangeTitle: (title: string) => void;
  onChangeContent: (content: string) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  content,
  onChangeTitle,
  onChangeContent,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{t("scheduler.titleSection.title")}</Label>
        <Input
          id="title"
          placeholder={t("scheduler.titleSection.titlePlaceholder")}
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">{t("scheduler.titleSection.content")}</Label>
        <Textarea
          id="content"
          placeholder={t("scheduler.titleSection.contentPlaceholder")}
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          rows={5}
        />
      </div>
    </div>
  );
};

export default TitleSection;
