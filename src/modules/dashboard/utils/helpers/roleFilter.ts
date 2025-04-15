
import { NavItem, UserRole } from "../types/sidebarTypes";

export const filterByRole = (items: NavItem[], userRole: string = 'user'): NavItem[] => {
  // Normalize the role to lowercase for case-insensitive comparison
  const normalizedUserRole = userRole.toLowerCase();
  
  return items.filter(item => {
    // If no roles specified, show to everyone
    if (!item.roles || item.roles.length === 0) {
      return true;
    }
    
    // Convert all roles to lowercase for case-insensitive comparison
    const normalizedRoles = item.roles.map(role => role.toLowerCase());
    
    // Special case: 'admin' role should see everything
    if (normalizedUserRole === 'admin') {
      return true;
    }
    
    // Check if user's role is in the allowed roles
    return normalizedRoles.includes(normalizedUserRole);
  });
};
