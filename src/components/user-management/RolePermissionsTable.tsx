
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCreateActivity } from "@/hooks/useCreateActivity";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { AppRole } from "@/types/profile";

interface RolePermissionTableProps {
  onEditRole?: (role: AppRole) => void;
}

const RolePermissionsTable: React.FC<RolePermissionTableProps> = ({ onEditRole }) => {
  const { user } = useAuth();
  const { logActivity } = useCreateActivity();
  
  const roles = [
    {
      name: "admin" as AppRole,
      title: "مدير",
      description: "وصول كامل للنظام وإدارة المستخدمين",
      badge: "bg-red-100 text-red-800 hover:bg-red-100",
    },
    {
      name: "manager" as AppRole,
      title: "مسؤول",
      description: "إدارة الفرق والمشاريع والتقارير",
      badge: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    },
    {
      name: "marketing" as AppRole,
      title: "تسويق",
      description: "إدارة المحتوى والحملات التسويقية",
      badge: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    },
    {
      name: "designer" as AppRole,
      title: "مصمم",
      description: "إنشاء وتحرير الصور والإعلانات",
      badge: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    },
    {
      name: "editor" as AppRole,
      title: "محرر",
      description: "إنشاء وتحرير المحتوى النصي",
      badge: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
    },
    {
      name: "analyst" as AppRole,
      title: "محلل",
      description: "الوصول للتحليلات وتقارير الأداء",
      badge: "bg-green-100 text-green-800 hover:bg-green-100",
    },
    {
      name: "user" as AppRole,
      title: "مستخدم",
      description: "وصول أساسي للمشاهدة",
      badge: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    },
  ];

  const permissions = [
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
  
  const handleEditRole = (role: AppRole) => {
    if (onEditRole) {
      logActivity("role_change", `تم بدء تحرير دور ${roles.find(r => r.name === role)?.title || role}`);
      
      toast({
        title: "تحرير الدور",
        description: `بدء تحرير صلاحيات دور ${roles.find(r => r.name === role)?.title}`,
      });
      
      onEditRole(role);
    }
  };

  return (
    <Table className="border rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">الصلاحية</TableHead>
          {roles.map((role) => (
            <TableHead key={role.name} className="text-center">
              <div className="flex flex-col items-center gap-2">
                <Badge className={role.badge}>{role.title}</Badge>
                {onEditRole && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 px-2 text-xs" 
                    onClick={() => handleEditRole(role.name)}
                  >
                    <Edit className="h-3 w-3 ml-1" />
                    تحرير
                  </Button>
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission.id}>
            <TableCell className="font-medium">
              <div>
                <div>{permission.name}</div>
                <div className="text-xs text-muted-foreground">{permission.group}</div>
              </div>
            </TableCell>
            {roles.map((role) => (
              <TableCell key={`${role.name}-${permission.id}`} className="text-center">
                {hasPermission(role.name, permission.id) ? (
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-gray-300" />
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RolePermissionsTable;
