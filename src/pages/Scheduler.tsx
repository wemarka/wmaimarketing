
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import NewPostDialog from "@/components/scheduler/NewPostDialog";
import MarketingCalendar from "@/components/scheduler/MarketingCalendar";
import ApprovalWorkflow from "@/components/scheduler/ApprovalWorkflow";
import ContentOrganizer from "@/components/scheduler/ContentOrganizer";
import { useSchedulerData } from "@/components/scheduler/hooks/useSchedulerData";

import SchedulerHeader from "@/components/scheduler/components/SchedulerHeader";
import PostsList from "@/components/scheduler/components/PostsList";
import SidebarWidgets from "@/components/scheduler/components/SidebarWidgets";
import WorkflowSidebar from "@/components/scheduler/components/WorkflowSidebar";
import ContentOrganizerSidebar from "@/components/scheduler/components/ContentOrganizerSidebar";
import { TaskReminderWidget } from "@/components/scheduler/TaskReminder";

const Scheduler = () => {
  const { t } = useTranslation();
  const {
    isDialogOpen,
    setIsDialogOpen,
    activeTab,
    setActiveTab,
    mainView,
    setMainView,
    scheduledPosts,
    completedPosts,
    calendarPosts,
    socialAccounts,
    approvalItems,
    contentItems,
    workflowApprovers
  } = useSchedulerData();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <SchedulerHeader onNewPostClick={() => setIsDialogOpen(true)} />

        <Tabs value={mainView} onValueChange={(value) => {
          // Type casting to ensure the value is one of the allowed types
          if (value === "list" || value === "calendar" || value === "organize" || value === "workflow" || value === "tasks") {
            setMainView(value);
          }
        }}>
          <TabsList className="mb-4">
            <TabsTrigger value="list">{t("scheduler.views.list", "قائمة المنشورات")}</TabsTrigger>
            <TabsTrigger value="calendar">{t("scheduler.views.calendar", "التقويم")}</TabsTrigger>
            <TabsTrigger value="organize">{t("scheduler.views.organize", "تنظيم المحتوى")}</TabsTrigger>
            <TabsTrigger value="workflow">{t("scheduler.views.workflow", "سير العمل")}</TabsTrigger>
            <TabsTrigger value="tasks">{t("scheduler.views.tasks", "المهام")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PostsList 
                scheduledPosts={scheduledPosts}
                completedPosts={completedPosts}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
            <SidebarWidgets view="list" />
          </TabsContent>
          
          <TabsContent value="calendar" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px]">
              <MarketingCalendar posts={calendarPosts} />
            </div>
            <SidebarWidgets view="calendar" accounts={socialAccounts} />
          </TabsContent>
          
          <TabsContent value="organize" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px]">
              <ContentOrganizer items={contentItems} />
            </div>
            <ContentOrganizerSidebar />
          </TabsContent>
          
          <TabsContent value="workflow" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px]">
              <ApprovalWorkflow approvals={approvalItems} />
            </div>
            <WorkflowSidebar approvers={workflowApprovers} />
          </TabsContent>
          
          <TabsContent value="tasks" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TaskReminderWidget />
            </div>
            <div className="space-y-6">
              <SidebarWidgets view="tasks" />
            </div>
          </TabsContent>
        </Tabs>

        <NewPostDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </Layout>
  );
};

export default Scheduler;
