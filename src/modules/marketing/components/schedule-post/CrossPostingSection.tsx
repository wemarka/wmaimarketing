
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";

interface SocialAccount {
  id: string;
  platform: string;
  account_name: string;
  profile_name: string;
  status: string;
}

interface CrossPostingSectionProps {
  accounts: SocialAccount[];
  enableCrossPosting: boolean;
  selectedAccounts: string[];
  onToggleCrossPosting: () => void;
  onAccountToggle: (accountId: string) => void;
}

const CrossPostingSection: React.FC<CrossPostingSectionProps> = ({
  accounts,
  enableCrossPosting,
  selectedAccounts,
  onToggleCrossPosting,
  onAccountToggle
}) => {
  const { t } = useTranslation();
  
  // Filter only active accounts
  const activeAccounts = accounts.filter(account => account.status === 'connected');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="cross-posting">{t("scheduler.crossPosting.title", "النشر على منصات متعددة")}</Label>
        <Switch
          id="cross-posting"
          checked={enableCrossPosting}
          onCheckedChange={onToggleCrossPosting}
        />
      </div>
      
      {enableCrossPosting && activeAccounts.length > 0 ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {t("scheduler.crossPosting.description", "اختر المنصات الإضافية التي تريد نشر المحتوى عليها")}
          </p>
          
          <div className="grid gap-3">
            {activeAccounts.map((account) => (
              <Card key={account.id} className="p-3">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    id={`account-${account.id}`}
                    checked={selectedAccounts.includes(account.id)}
                    onCheckedChange={() => onAccountToggle(account.id)}
                  />
                  <div className="grid gap-1">
                    <Label
                      htmlFor={`account-${account.id}`}
                      className="font-medium"
                    >
                      {account.profile_name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {account.platform} • {account.account_name}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : enableCrossPosting && activeAccounts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {t("scheduler.crossPosting.noAccounts", "لا توجد حسابات متصلة للنشر المتعدد. قم بإضافة حسابات أولاً.")}
        </p>
      ) : null}
    </div>
  );
};

export default CrossPostingSection;
