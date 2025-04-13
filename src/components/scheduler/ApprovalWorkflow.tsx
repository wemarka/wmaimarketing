
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ApprovalItem {
  id: number;
  title: string;
  submittedBy: string;
  submittedAt: string;
  type: string;
  reviewers: {
    name: string;
    status: "pending" | "approved" | "rejected";
  }[];
}

interface ApprovalWorkflowProps {
  approvals?: ApprovalItem[];
}

const ApprovalWorkflow: React.FC<ApprovalWorkflowProps> = ({ 
  approvals = [] 
}) => {
  const pendingApprovals = approvals.filter(
    item => item.reviewers.some(reviewer => reviewer.status === "pending")
  );
  
  const completedApprovals = approvals.filter(
    item => !item.reviewers.some(reviewer => reviewer.status === "pending")
  );
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>سير عمل الموافقات</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="pending">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
            <TabsTrigger value="completed">مكتمل</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingApprovals.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed rounded-md">
                <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">لا توجد منشورات تنتظر الموافقة حالياً</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <ApprovalCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedApprovals.length === 0 ? (
              <div className="text-center p-6 border-2 border-dashed rounded-md">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">لا توجد منشورات مكتملة المراجعة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completedApprovals.map((item) => (
                  <ApprovalCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ApprovalCard: React.FC<{ item: ApprovalItem }> = ({ item }) => {
  const pendingReviewers = item.reviewers.filter(r => r.status === "pending");
  const approvedReviewers = item.reviewers.filter(r => r.status === "approved");
  const rejectedReviewers = item.reviewers.filter(r => r.status === "rejected");
  
  const isApproved = approvedReviewers.length === item.reviewers.length;
  const isRejected = rejectedReviewers.length > 0;
  const isPending = pendingReviewers.length > 0;

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            بواسطة: {item.submittedBy} • {item.submittedAt}
          </p>
        </div>
        <Badge variant="outline" className={
          isRejected ? "bg-red-100 text-red-800" :
          isApproved ? "bg-green-100 text-green-800" :
          "bg-amber-100 text-amber-800"
        }>
          {isRejected ? "مرفوض" :
           isApproved ? "تمت الموافقة" :
           "قيد المراجعة"}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <Badge variant="secondary">{item.type}</Badge>
      </div>
      
      <div className="mt-3 pt-3 border-t">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium">المراجعون</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {item.reviewers.map((reviewer, idx) => (
            <div 
              key={idx} 
              className={`text-xs flex items-center px-2 py-1 rounded-full ${
                reviewer.status === "approved" ? "bg-green-100 text-green-800" :
                reviewer.status === "rejected" ? "bg-red-100 text-red-800" :
                "bg-slate-100 text-slate-800"
              }`}
            >
              {reviewer.name}
              {reviewer.status === "approved" && <Check className="h-3 w-3 ml-1" />}
              {reviewer.status === "rejected" && <X className="h-3 w-3 ml-1" />}
              {reviewer.status === "pending" && <Clock className="h-3 w-3 ml-1" />}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm">عرض التفاصيل</Button>
        {isPending && (
          <>
            <Button variant="destructive" size="sm">
              <X className="h-4 w-4 mr-1" />
              رفض
            </Button>
            <Button variant="default" size="sm">
              <Check className="h-4 w-4 mr-1" />
              موافقة
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ApprovalWorkflow;
