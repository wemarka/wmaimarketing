
import React from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SocialAccount } from "../../services/integrationService";

interface CrossPostSectionProps {
  accounts: SocialAccount[];
  selectedAccounts: string[];
  onAccountToggle: (accountId: string, isChecked: boolean) => void;
}

const CrossPostSection: React.FC<CrossPostSectionProps> = ({
  accounts,
  selectedAccounts,
  onAccountToggle,
}) => {
  const { t } = useTranslation();

  // تجميع الحسابات حسب المنصة
  const accountsByPlatform: Record<string, SocialAccount[]> = accounts.reduce(
    (acc, account) => {
      if (!acc[account.platform]) {
        acc[account.platform] = [];
      }
      acc[account.platform].push(account);
      return acc;
    },
    {} as Record<string, SocialAccount[]>
  );

  // تعريف ألوان المنصات
  const platformColors: Record<string, string> = {
    instagram: "bg-pink-100 text-pink-800",
    facebook: "bg-blue-100 text-blue-800",
    twitter: "bg-sky-100 text-sky-800",
    linkedin: "bg-blue-200 text-blue-900",
    tiktok: "bg-slate-100 text-slate-800",
    pinterest: "bg-red-100 text-red-800",
    youtube: "bg-red-100 text-red-800",
  };

  if (accounts.length === 0) {
    return (
      <div className="text-center p-4 border border-dashed rounded-md">
        <p className="text-muted-foreground">
          {t("scheduler.crossPost.noAccounts", "لا توجد حسابات متصلة للمشاركة المتعددة")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">
          {t("scheduler.crossPost.title", "المشاركة المتعددة")}
        </h3>
        <Badge variant="outline">
          {selectedAccounts.length} / {accounts.length}
        </Badge>
      </div>

      <div className="space-y-4">
        {Object.entries(accountsByPlatform).map(([platform, platformAccounts]) => (
          <div key={platform} className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <Badge variant="outline" className={platformColors[platform] || "bg-gray-100"}>
                {platform}
              </Badge>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {platformAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center space-x-2 space-x-reverse border rounded-md p-2 hover:bg-accent"
                >
                  <Checkbox
                    id={account.id}
                    checked={selectedAccounts.includes(account.id)}
                    onCheckedChange={(checked) => onAccountToggle(account.id, Boolean(checked))}
                    className="ml-2"
                  />
                  <Label
                    htmlFor={account.id}
                    className="flex-grow cursor-pointer text-sm flex items-center justify-between"
                  >
                    <span>{account.profile_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {account.account_name}
                    </span>
                  </Label>
                  {account.insights && (
                    <span className="text-xs text-muted-foreground">
                      {account.insights.followers.toLocaleString()} {t("common.followers")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrossPostSection;
