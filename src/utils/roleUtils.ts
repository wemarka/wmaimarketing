
/**
 * Check if a user has one of the allowed roles
 * @param userRole - The user's current role
 * @param allowedRoles - Array of allowed roles
 * @returns boolean indicating if the user has a required role
 */
export const hasRequiredRole = (userRole: string, allowedRoles: string[]): boolean => {
  // Make case insensitive
  const normalizedUserRole = userRole.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
  
  // Check if user has required role
  return normalizedAllowedRoles.includes(normalizedUserRole);
};
