
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppRole } from "@/types/profile";
import { useRolesPermissions } from "@/hooks/user-management/useRolesPermissions";
import RoleHeader from "./permissions/RoleHeader";
import PermissionRow from "./permissions/PermissionRow";

interface RolePermissionTableProps {
  onEditRole?: (role: AppRole) => void;
}

const RolePermissionsTable: React.FC<RolePermissionTableProps> = ({ onEditRole }) => {
  const { roles, permissions, hasPermission, handleEditRole } = useRolesPermissions();

  return (
    <Table className="border rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">الصلاحية</TableHead>
          {roles.map((role) => (
            <RoleHeader 
              key={role.name}
              role={role}
              onEditRole={onEditRole}
              onHandleEditRole={handleEditRole}
            />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <PermissionRow
            key={permission.id}
            permission={permission}
            roles={roles}
            hasPermission={hasPermission}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default RolePermissionsTable;
