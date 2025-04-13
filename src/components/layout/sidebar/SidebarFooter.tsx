
import React from "react";
import { SidebarFooter as Footer } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

const SidebarFooter: React.FC = () => {
  const { signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Footer>
      <div className="p-4 border-t">
        <div className="rounded-lg bg-card p-4 border border-border/40 shadow-sm mb-4">
          <h5 className="mb-2 text-sm font-medium">
            {t("sidebar.trialUser")}
          </h5>
          <p className="text-xs text-muted-foreground">
            {t("sidebar.upgradeAccess")}
          </p>
          <Button className="mt-3 w-full bg-gradient-to-r from-beauty-pink to-beauty-purple hover:from-beauty-purple hover:to-beauty-pink transition-all duration-300" size="sm">
            {t("sidebar.upgradeNow")}
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 ml-2" />
          <span>{t("sidebar.signOut")}</span>
        </Button>
      </div>
    </Footer>
  );
};

export default SidebarFooter;
