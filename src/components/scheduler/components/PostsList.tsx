
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import ScheduledPosts from "../ScheduledPosts";
import EmptyTabContent from "../EmptyTabContent";
import { ScheduledPost } from "../types";

interface PostsListProps {
  scheduledPosts: ScheduledPost[];
  completedPosts: ScheduledPost[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const PostsList: React.FC<PostsListProps> = ({
  scheduledPosts,
  completedPosts,
  activeTab,
  onTabChange
}) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-lg font-medium">{t("scheduler.postsList", "قائمة المنشورات")}</CardTitle>
      </CardHeader>
      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={onTabChange}
        className="w-full"
      >
        <div className="px-6 pt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="upcoming">{t("scheduler.tabs.upcoming", "قادم")}</TabsTrigger>
            <TabsTrigger value="completed">{t("scheduler.tabs.completed", "مكتمل")}</TabsTrigger>
            <TabsTrigger value="drafts">{t("scheduler.tabs.drafts", "مسودات")}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming">
          {scheduledPosts.length > 0 ? (
            <ScheduledPosts posts={scheduledPosts} />
          ) : (
            <EmptyTabContent message={t("scheduler.empty.upcoming", "لا توجد منشورات قادمة مجدولة. أنشئ منشوراً جديداً للبدء.")} />
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedPosts.length > 0 ? (
            <ScheduledPosts posts={completedPosts} />
          ) : (
            <EmptyTabContent message={t("scheduler.empty.completed", "لا توجد منشورات مكتملة بعد.")} />
          )}
        </TabsContent>

        <TabsContent value="drafts">
          <EmptyTabContent message={t("scheduler.empty.drafts", "لا توجد مسودات منشورات.")} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PostsList;
