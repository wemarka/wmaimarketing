
import { useInvitationManagement } from "./invitations/useInvitationManagement";
import { useInvitationCreation } from "./invitations/useInvitationCreation";
import { useInvitationValidation } from "./invitations/useInvitationValidation";
import type { ValidationResult, RegistrationResult } from "./invitations/useInvitationValidation";
import type { InvitationFormData } from "@/types/invitation";

export const useInvitations = () => {
  // Get all the invitation functionalities from the specialized hooks
  const invitationManagement = useInvitationManagement();
  const invitationCreation = useInvitationCreation(invitationManagement.fetchInvitations);
  const invitationValidation = useInvitationValidation();

  // Calculate the combined loading state
  const loading = invitationManagement.loading || 
                 invitationCreation.loading || 
                 invitationValidation.loading;

  return {
    // Management functions
    invitations: invitationManagement.invitations,
    fetchInvitations: invitationManagement.fetchInvitations,
    resendInvitation: invitationManagement.resendInvitation,
    revokeInvitation: invitationManagement.revokeInvitation,
    
    // Creation functions
    createInvitation: invitationCreation.createInvitation,
    
    // Validation functions
    validateInvitationToken: invitationValidation.validateInvitationToken,
    registerFromInvitation: invitationValidation.registerFromInvitation,
    
    // Combined loading state
    loading
  };
};

// Re-export types from the validation module
export type { ValidationResult, RegistrationResult };
