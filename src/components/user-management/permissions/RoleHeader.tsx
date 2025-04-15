
import React from "react";
import { TableHead } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { AppRole } from "@/types/profile";
import { RoleInfo } from "@/hooks/user-management/useRolesPermissions";
import { useTranslation } from "react-i18next";

interface RoleHeaderProps {
  role: RoleInfo;
  onEditRole?: (role: AppRole) => void;
  onHandleEditRole: (role: AppRole, onEditRole?: (role: AppRole) => void) => void;
}

const RoleHeader: React.FC<RoleHeaderProps> = ({ role, onEditRole, onHandleEditRole }) => {
  const { t } = useTranslation();
  
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
            <Edit className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
            {t('userManagement.editRole', 'Edit')}
          </Button>
        )}
      </div>
    </TableHead>
  );
};

export default RoleHeader;
