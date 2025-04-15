
import { useAuth } from "@/context/AuthContext";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { toast } from "@/hooks/use-toast";
import { AppRole } from "@/types/profile";

export interface Permission {
  id: number;
  name: string;
  group: string;
}

export interface RoleInfo {
  name: AppRole;
  title: string;
  description: string;
  badge: string;
}

export const useRolesPermissions = () => {
  const { user } = useAuth();
  const { logActivity } = useCreateActivity();
  
  // Role definitions
  const roles: RoleInfo[] = [
    {
      name: "admin",
      title: "مدير",
      description: "وصول كامل للنظام وإدارة المستخدمين",
      badge: "bg-red-100 text-red-800 hover:bg-red-100",
    },
    {
      name: "manager",
      title: "مسؤول",
      description: "إدارة الفرق والمشاريع والتقارير",
      badge: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    },
    {
      name: "marketing",
      title: "تسويق",
      description: "إدارة المحتوى والحملات التسويقية",
      badge: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    },
    {
      name: "designer",
      title: "مصمم",
      description: "إنشاء وتحرير الصور والإعلانات",
      badge: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    },
    {
      name: "editor",
      title: "محرر",
      description: "إنشاء وتحرير المحتوى النصي",
      badge: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
    },
    {
      name: "analyst",
      title: "محلل",
      description: "الوصول للتحليلات وتقارير الأداء",
      badge: "bg-green-100 text-green-800 hover:bg-green-100",
    },
    {
      name: "user",
      title: "مستخدم",
      description: "وصول أساسي للمشاهدة",
      badge: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    },
  ];

  // Permission definitions
  const permissions: Permission[] = [
    { id: 1, name: "إدارة المستخدمين", group: "المستخدمين" },
    { id: 2, name: "إضافة مستخدمين", group: "المستخدمين" },
    { id: 3, name: "تحرير الأدوار", group: "المستخدمين" },
    { id: 4, name: "إنشاء محتوى", group: "المحتوى" },
    { id: 5, name: "تحرير محتوى", group: "المحتوى" },
    { id: 6, name: "حذف محتوى", group: "المحتوى" },
    { id: 7, name: "رفع الصور والملفات", group: "الوسائط" },
    { id: 8, name: "إنشاء إعلانات", group: "الإعلانات" },
    { id: 9, name: "جدولة النشر", group: "النشر" },
    { id: 10, name: "وصول للتحليلات", group: "التقارير" },
    { id: 11, name: "إنشاء تقارير", group: "التقارير" },
    { id: 12, name: "إدارة الفرق", group: "الإدارة" },
  ];

  const permissionMap: Record<AppRole, number[]> = {
    admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    manager: [1, 2, 4, 5, 9, 10, 11, 12],
    marketing: [4, 5, 6, 7, 8, 9, 10],
    designer: [4, 5, 7, 8],
    editor: [4, 5, 7],
    analyst: [10, 11],
    user: []
  };
  
  const hasPermission = (role: AppRole, permissionId: number) => {
    return permissionMap[role].includes(permissionId);
  };
  
  const handleEditRole = (role: AppRole, onEditRole?: (role: AppRole) => void) => {
    if (onEditRole) {
      logActivity("role_change", `تم بدء تحرير دور ${roles.find(r => r.name === role)?.title || role}`);
      
      toast({
        title: "تحرير الدور",
        description: `بدء تحرير صلاحيات دور ${roles.find(r => r.name === role)?.title}`,
      });
      
      onEditRole(role);
    }
  };
  
  return {
    roles,
    permissions,
    hasPermission,
    handleEditRole
  };
};
