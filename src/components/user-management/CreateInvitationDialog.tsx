
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInvitations } from "@/hooks/useInvitations";
import { InvitationFormData } from "@/types/invitation";
import { Loader2Icon } from "lucide-react";
import { z } from "zod";

interface CreateInvitationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const emailSchema = z.string().email("البريد الإلكتروني غير صالح");

const CreateInvitationDialog = ({ open, onOpenChange }: CreateInvitationDialogProps) => {
  const { loading, createInvitation } = useInvitations();
  const [formData, setFormData] = useState<InvitationFormData>({
    email: "",
    role: "user",
    expiresInDays: 7,
  });
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      setEmailError("");
      return true;
    } catch (error) {
      setEmailError("الرجاء إدخال بريد إلكتروني صالح");
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) return;
    
    const result = await createInvitation(formData);
    if (result) {
      setFormData({
        email: "",
        role: "user",
        expiresInDays: 7,
      });
      onOpenChange(false);
    }
  };

  const handleExpiresInChange = (value: string) => {
    setFormData({
      ...formData,
      expiresInDays: parseInt(value),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>إنشاء دعوة جديدة</DialogTitle>
            <DialogDescription>
              أرسل دعوة لمستخدم جديد للانضمام إلى النظام
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@company.com"
              />
              {emailError && <p className="text-xs text-red-500">{emailError}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                الدور
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">مدير</SelectItem>
                  <SelectItem value="marketing">تسويق</SelectItem>
                  <SelectItem value="designer">مصمم</SelectItem>
                  <SelectItem value="editor">محرر</SelectItem>
                  <SelectItem value="analyst">محلل</SelectItem>
                  <SelectItem value="user">مستخدم عادي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="expiresIn" className="text-sm font-medium">
                مدة صلاحية الدعوة
              </label>
              <Select
                value={formData.expiresInDays.toString()}
                onValueChange={handleExpiresInChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">يوم واحد</SelectItem>
                  <SelectItem value="3">3 أيام</SelectItem>
                  <SelectItem value="7">أسبوع</SelectItem>
                  <SelectItem value="14">أسبوعين</SelectItem>
                  <SelectItem value="30">شهر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                "إرسال الدعوة"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvitationDialog;
