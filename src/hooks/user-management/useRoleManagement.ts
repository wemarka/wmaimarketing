
import { useState } from "react";
import { AppRole } from "@/types/profile";
import { User } from "@/hooks/user-management/types";

export interface RoleInfo {
  title: string;
  description: string;
  color: string;
}

export const roleInfo: Record<AppRole, RoleInfo> = {
  admin: {
    title: "مدير",
    description: "وصول كامل إلى جميع ميزات النظام وإدارة المستخدمين والأذونات",
    color: "red",
  },
  marketing: {
    title: "تسويق",
    description: "إدارة المحتوى والحملات التسويقية وتحليل الأداء",
    color: "blue",
  },
  designer: {
    title: "مصمم",
    description: "إنشاء وتحرير المحتوى البصري والإعلانات",
    color: "purple",
  },
  user: {
    title: "مستخدم",
    description: "وصول أساسي للمشاهدة والعمليات العادية",
    color: "gray",
  },
  manager: {
    title: "مسؤول",
    description: "إدارة الفرق والمشاريع والتقارير",
    color: "orange",
  },
  editor: {
    title: "محرر",
    description: "إنشاء وتحرير المحتوى النصي",
    color: "cyan",
  },
  analyst: {
    title: "محلل",
    description: "الوصول للتحليلات وتقارير الأداء",
    color: "green",
  }
};

export const useRoleManagement = (
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  onUpdateRole: () => Promise<void>
) => {
  const [activeTab, setActiveTab] = useState<"role" | "permissions">("role");
  const [saving, setSaving] = useState(false);

  // Define helper functions
  const getUserInitials = (user: User) => {
    if (!user.first_name && !user.last_name) {
      return user.email.substring(0, 2).toUpperCase();
    }
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onUpdateRole();
    } finally {
      setSaving(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    saving,
    getUserInitials,
    handleSave,
    roleInfo
  };
};
