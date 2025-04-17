
import React from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import CrossPostSection from "./CrossPostSection";
import { SocialAccount } from "../../services/integrationService";

interface CrossPostingSectionProps {
  accounts: SocialAccount[];
  enableCrossPosting: boolean;
  selectedAccounts: string[];
  onToggleCrossPosting: (enabled: boolean) => void;
  onAccountToggle: (accountId: string, isChecked: boolean) => void;
}

const CrossPostingSection: React.FC<CrossPostingSectionProps> = ({
  accounts,
  enableCrossPosting,
  selectedAccounts,
  onToggleCrossPosting,
  onAccountToggle,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="border">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          {t("scheduler.crossPosting.title", "المشاركة المتعددة")}
        </CardTitle>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Switch
            id="cross-posting"
            checked={enableCrossPosting}
            onCheckedChange={onToggleCrossPosting}
          />
          <Label htmlFor="cross-posting" className="cursor-pointer">
            {enableCrossPosting
              ? t("scheduler.crossPosting.enabled", "مفعل")
              : t("scheduler.crossPosting.disabled", "معطل")}
          </Label>
        </div>
      </CardHeader>
      {enableCrossPosting && (
        <CardContent className="pt-0">
          <CrossPostSection
            accounts={accounts}
            selectedAccounts={selectedAccounts}
            onAccountToggle={onAccountToggle}
          />
        </CardContent>
      )}
    </Card>
  );
};

export default CrossPostingSection;
