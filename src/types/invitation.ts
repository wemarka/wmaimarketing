
export interface Invitation {
  id: string;
  email: string;
  role: string;
  invited_by: string | null;
  token: string;
  expires_at: string;
  created_at: string;
  accepted_at: string | null;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
}

export interface InvitationFormData {
  email: string;
  role: string;
  expiresInDays: number;
}
