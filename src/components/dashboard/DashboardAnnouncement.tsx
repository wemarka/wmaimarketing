
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const DashboardAnnouncement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card>
      <div className="grid md:grid-cols-8 overflow-hidden">
        <div className="md:col-span-5 bg-gradient-to-br from-beauty-purple/20 to-beauty-purple/5 p-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-beauty-purple" />
              <p className="text-sm font-medium text-beauty-purple">
                {t("dashboard.announcement.new")}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("dashboard.announcement.title")}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-lg">
              {t("dashboard.announcement.description")}
            </p>
            <Button 
              onClick={() => navigate("/ai-studio")} 
              className="bg-beauty-purple hover:bg-beauty-purple/90"
            >
              {t("dashboard.announcement.action")}
            </Button>
          </motion.div>
        </div>
        
        <div className="md:col-span-3 grid grid-cols-1 divide-y">
          <div className="p-4 text-center">
            <p className="text-2xl font-semibold mb-1">+50</p>
            <p className="text-sm text-muted-foreground">{t("dashboard.announcement.stats.templates")}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-semibold mb-1">{t("dashboard.announcement.stats.unlimitedLabel")}</p>
            <p className="text-sm text-muted-foreground">{t("dashboard.announcement.stats.contentCreation")}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-semibold mb-1">{t("dashboard.announcement.stats.priorityLabel")}</p>
            <p className="text-sm text-muted-foreground">{t("dashboard.announcement.stats.supportUpdates")}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardAnnouncement;
