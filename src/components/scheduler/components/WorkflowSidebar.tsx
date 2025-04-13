
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface WorkflowSidebarProps {
  approvers: { name: string; role: string; status: string }[];
}

const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({ approvers }) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">{t("scheduler.workflow.activeApprovers", "الموافقون النشطون")}</CardTitle>
        </CardHeader>
        <div className="p-4">
          <ul className="space-y-3">
            {approvers.map((approver, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{approver.name}</p>
                  <p className="text-xs text-muted-foreground">{approver.role}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={approver.status === "متاح" ? 
                    "bg-green-100 text-green-700" : 
                    "bg-red-100 text-red-700"
                  }
                >
                  {approver.status}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">{t("scheduler.workflow.stats", "إحصائيات سير العمل")}</CardTitle>
        </CardHeader>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-3 text-center">
              <p className="text-3xl font-bold text-amber-500">3</p>
              <p className="text-sm text-muted-foreground">{t("scheduler.workflow.pending", "قيد الانتظار")}</p>
            </div>
            <div className="border rounded-md p-3 text-center">
              <p className="text-3xl font-bold text-green-500">12</p>
              <p className="text-sm text-muted-foreground">{t("scheduler.workflow.approved", "تمت الموافقة")}</p>
            </div>
            <div className="border rounded-md p-3 text-center">
              <p className="text-3xl font-bold text-red-500">2</p>
              <p className="text-sm text-muted-foreground">{t("scheduler.workflow.rejected", "مرفوضة")}</p>
            </div>
            <div className="border rounded-md p-3 text-center">
              <p className="text-3xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">{t("scheduler.workflow.approvalRate", "معدل الموافقة")}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkflowSidebar;
