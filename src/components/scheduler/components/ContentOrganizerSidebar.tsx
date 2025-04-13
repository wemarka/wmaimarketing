
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ContentOrganizerSidebar: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">{t("scheduler.organize.checklists", "قوائم التحقق")}</CardTitle>
        </CardHeader>
        <div className="p-4">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <span>{t("scheduler.organize.task1", "تنظيم المنتجات حسب المجموعات")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <span>{t("scheduler.organize.task2", "إنشاء حملة لمنتجات العناية بالبشرة")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-xs">•</span>
              </div>
              <span>{t("scheduler.organize.task3", "مراجعة المنشورات المجدولة للأسبوع القادم")}</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-xs">•</span>
              </div>
              <span>{t("scheduler.organize.task4", "تحديث تصنيفات المنتجات الجديدة")}</span>
            </li>
          </ul>
        </div>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">{t("scheduler.organize.suggestedContent", "المحتوى المقترح")}</CardTitle>
        </CardHeader>
        <div className="p-4 space-y-3">
          <div className="border rounded-md p-2">
            <p className="font-medium text-sm">{t("scheduler.organize.productImages", "صور المنتجات الجديدة")}</p>
            <p className="text-xs text-muted-foreground">{t("scheduler.organize.imagesAvailable", "15 صورة متاحة للنشر")}</p>
          </div>
          <div className="border rounded-md p-2">
            <p className="font-medium text-sm">{t("scheduler.organize.tutorials", "فيديوهات تعليمية")}</p>
            <p className="text-xs text-muted-foreground">{t("scheduler.organize.videosReady", "3 فيديوهات جاهزة للجدولة")}</p>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            {t("scheduler.organize.exploreMore", "استكشاف المزيد من المحتوى")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContentOrganizerSidebar;
