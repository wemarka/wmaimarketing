
export type SecurityCheckStatus = "pending" | "running" | "passed" | "warning" | "failed";

export interface SecurityCheck {
  id: string;
  name: string;
  status: SecurityCheckStatus;
  message?: string;
}

export interface SecurityTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
