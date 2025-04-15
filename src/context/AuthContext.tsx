
import { createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { ProfileData } from '@/types/profile';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthMethods } from '@/hooks/useAuthMethods';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: ProfileData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // استخدام hooks المنفصلة
  const { user, session, profile, loading, setProfile } = useAuthState();
  const { authLoading, refreshProfile, signIn, signUp, signOut } = useAuthMethods(profile, setProfile);

  // دمج حالات التحميل
  const isLoading = loading || authLoading;

  // Log current user info
  console.log("AuthProvider - Current user:", user?.id);
  console.log("AuthProvider - Current profile:", profile?.role);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading: isLoading, 
      signIn, 
      signUp, 
      signOut, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Enhanced useAuth hook with better error handling
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth must be used within an AuthProvider");
    // Return default context values instead of throwing error
    return {
      user: null,
      session: null,
      profile: null,
      loading: false,
      signIn: async () => {},
      signUp: async () => {},
      signOut: async () => {},
      refreshProfile: async () => {}
    };
  }
  return context;
};
