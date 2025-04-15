
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useInvitations } from "@/hooks/useInvitations";
import { Invitation } from "@/types/invitation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  RotateCw, // استبدال ArrowPathIcon
  Plus, // استبدال PlusIcon
  X, // استبدال XMarkIcon
  Mail // استبدال EnvelopeIcon
} from "lucide-react";
import { format } from "date-fns";
import CreateInvitationDialog from "./CreateInvitationDialog";

const InvitationsTab = () => {
  const { loading, invitations, fetchInvitations, resendInvitation, revokeInvitation } = useInvitations();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  useEffect(() => {
    fetchInvitations();
  }, []);

  const getBadgeVariant = (status: string, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();
    
    if (status === 'accepted') return "outline";
    if (status === 'revoked') return "destructive";
    if (status === 'pending' && isExpired) return "secondary";
    return "default";
  };

  const getBadgeText = (status: string, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();
    
    if (status === 'accepted') return "تم القبول";
    if (status === 'revoked') return "ملغاة";
    if (status === 'pending' && isExpired) return "منتهية الصلاحية";
    return "قيد الانتظار";
  };

  const handleResend = async (invitation: Invitation) => {
    await resendInvitation(invitation.id);
  };

  const handleRevoke = async (invitation: Invitation) => {
    await revokeInvitation(invitation.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">دعوات المستخدمين</h2>
          <p className="text-sm text-muted-foreground">
            قم بإدارة الدعوات وإرسالها للمستخدمين الجدد للانضمام للنظام
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إنشاء دعوة جديدة
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الدور</TableHead>
              <TableHead>تاريخ الإنشاء</TableHead>
              <TableHead>تاريخ الانتهاء</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="w-[120px]">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  جاري تحميل البيانات...
                </TableCell>
              </TableRow>
            ) : invitations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  لا توجد دعوات مرسلة بعد
                </TableCell>
              </TableRow>
            ) : (
              invitations.map((invitation) => (
                <TableRow key={invitation.id}>
                  <TableCell>{invitation.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {invitation.role === 'admin' && 'مدير'}
                      {invitation.role === 'marketing' && 'تسويق'}
                      {invitation.role === 'designer' && 'مصمم'}
                      {invitation.role === 'editor' && 'محرر'}
                      {invitation.role === 'analyst' && 'محلل'}
                      {invitation.role === 'user' && 'مستخدم'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(invitation.created_at), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(invitation.expires_at), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(invitation.status, invitation.expires_at)}>
                      {getBadgeText(invitation.status, invitation.expires_at)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      {invitation.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleResend(invitation)}
                            title="إعادة إرسال"
                          >
                            <RotateCw className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRevoke(invitation)}
                            title="إلغاء"
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CreateInvitationDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default InvitationsTab;
