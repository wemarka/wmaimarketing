
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, X, CheckCircle, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DashboardAnnouncement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  // Calculate the current date and promo end date for countdown
  const today = new Date();
  const promoEndDate = new Date(today);
  promoEndDate.setDate(today.getDate() + 7);
  
  const daysRemaining = Math.ceil((promoEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const progressPercentage = ((7 - daysRemaining) / 7) * 100;

  return (
    <Card>
      <div className="grid md:grid-cols-8 overflow-hidden">
        <div className="md:col-span-5 bg-gradient-to-br from-beauty-purple/20 to-beauty-purple/5 p-6 relative">
          <button 
            className="absolute top-4 right-4 hover:bg-slate-200/50 p-1 rounded-full transition-colors"
            onClick={() => setDismissed(true)}
          >
            <X className="h-4 w-4" />
          </button>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-beauty-purple" />
              <p className="text-sm font-medium text-beauty-purple bg-beauty-purple/10 px-2 py-0.5 rounded">
                {t("dashboard.announcement.new")}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("dashboard.announcement.title")}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-lg">
              {t("dashboard.announcement.description")}
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t("dashboard.announcement.endsIn", { days: daysRemaining })}
              </span>
            </div>
            
            <Progress value={progressPercentage} className="h-1.5 mb-4" />
            
            <Button 
              onClick={() => navigate("/ai-studio")} 
              className="bg-beauty-purple hover:bg-beauty-purple/90 flex items-center gap-2"
            >
              {t("dashboard.announcement.action")}
              <Sparkles className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
        
        <div className="md:col-span-3 grid grid-cols-1 divide-y">
          <div className="p-4 text-center flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div className="text-left">
              <p className="text-lg font-semibold">+50</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.announcement.stats.templates")}</p>
            </div>
          </div>
          <div className="p-4 text-center flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div className="text-left">
              <p className="text-lg font-semibold">{t("dashboard.announcement.stats.unlimitedLabel")}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.announcement.stats.contentCreation")}</p>
            </div>
          </div>
          <div className="p-4 text-center flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div className="text-left">
              <p className="text-lg font-semibold">{t("dashboard.announcement.stats.priorityLabel")}</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.announcement.stats.supportUpdates")}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardAnnouncement;
