
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { AppRole } from "@/types/profile";
import { Permission, RoleInfo } from "@/hooks/user-management/useRolesPermissions";

interface PermissionRowProps {
  permission: Permission;
  roles: RoleInfo[];
  hasPermission: (role: AppRole, permissionId: number) => boolean;
}

const PermissionRow: React.FC<PermissionRowProps> = ({ permission, roles, hasPermission }) => {
  return (
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
  );
};

export default PermissionRow;
