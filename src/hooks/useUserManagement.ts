
import { useUserData } from "./user-management/useUserData";
import { useUserForms } from "./user-management/useUserForms";
import { usePermissionsData } from "./user-management/usePermissionsData";
import { useUserActivation } from "./user-management/useUserActivation";
import { useUserSearch } from "./user-management/useUserSearch";
import type { User } from "./user-management/types";

export const useUserManagement = () => {
  // Get the user data and loading state
  const { users, loading, fetchUsers } = useUserData();
  
  // Get permissions data
  const { permissions } = usePermissionsData();
  
  // Get search functionality
  const { searchTerm, setSearchTerm } = useUserSearch();
  
  // Get user forms functionality
  const {
    isAddUserOpen,
    setIsAddUserOpen,
    isManageRoleOpen,
    setIsManageRoleOpen,
    selectedUser,
    setSelectedUser,
    newUser,
    setNewUser,
    handleAddUser,
    handleUpdateRole,
  } = useUserForms(fetchUsers);
  
  // Get user activation functionality
  const {
    activateUserByEmail,
    activateSpecificUser,
  } = useUserActivation(fetchUsers);
  
  // Return all the functionality from our specialized hooks
  return {
    // User data
    users,
    permissions,
    loading,
    
    // Search
    searchTerm,
    setSearchTerm,
    
    // Form state
    isAddUserOpen,
    setIsAddUserOpen,
    isManageRoleOpen,
    setIsManageRoleOpen,
    selectedUser,
    setSelectedUser,
    newUser,
    setNewUser,
    
    // CRUD operations
    handleAddUser,
    handleUpdateRole,
    activateUserByEmail,
    activateSpecificUser
  };
};

// Export the types
export type { User };
export type { Permission, NewUser } from "./user-management/types";
