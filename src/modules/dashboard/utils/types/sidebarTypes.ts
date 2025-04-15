
import React from "react";

export interface NavItem {
  id: string;
  to: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  badgeText?: string;
  variant?: "default" | "outline";
  className?: string;
  roles?: string[]; // For role-based access control
}

export type UserRole = 'admin' | 'manager' | 'marketing' | 'designer' | 'user';
