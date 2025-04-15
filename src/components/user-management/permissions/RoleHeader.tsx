
import React from "react";
import { TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { AppRole } from "@/types/profile";
import { RoleInfo } from "@/hooks/user-management/useRolesPermissions";

interface RoleHeaderProps {
  role: RoleInfo;
  onEditRole?: (role: AppRole) => void;
  onHandleEditRole: (role: AppRole, onEditRole?: (role: AppRole) => void) => void;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({ role, onEditRole, onHandleEditRole }) => {
  return (
    <TableHead key={role.name} className="text-center">
      <div className="flex flex-col items-center gap-2">
        <Badge className={role.badge}>{role.title}</Badge>
        {onEditRole && (
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 px-2 text-xs" 
            onClick={() => onHandleEditRole(role.name, onEditRole)}
          >
            <Edit className="h-3 w-3 ml-1" />
            تحرير
          </Button>
        )}
      </div>
    </TableHead>
  );
};

export default RoleHeader;
