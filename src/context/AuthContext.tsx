
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ProfileData } from '@/types/profile';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const navigate = useNavigate();

  // Function to fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      console.log("Fetched profile:", data);
      return data as ProfileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Refresh user profile data
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const profileData = await fetchProfile(user.id);
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    // Set a safety timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.log("Auth loading timeout reached - forcing loading to false");
        setLoading(false);
        setInitialLoadComplete(true);
      }
    }, 3000); // Reduced from 5000

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state change event:", event);
        
        if (!isMounted) return;
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (newSession?.user) {
            console.log("User signed in:", newSession.user);
            setUser(newSession.user);
            setSession(newSession);
            
            const profileData = await fetchProfile(newSession.user.id);
            if (isMounted) setProfile(profileData);
            
            const language = profileData?.app_metadata?.language || 'en';
            toast({
              title: language === 'ar' ? "تم تسجيل الدخول بنجاح" : "Successfully signed in",
              description: language === 'ar' ? "مرحباً بعودتك إلى التطبيق" : "Welcome back to the application",
            });
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setUser(null);
          setSession(null);
          setProfile(null);
          
          const language = profile?.app_metadata?.language || 'en';
          toast({
            title: language === 'ar' ? "تم تسجيل الخروج" : "Signed out",
            description: language === 'ar' ? "نتمنى رؤيتك مرة أخرى قريباً" : "We hope to see you again soon",
          });
        }
        
        // Important: Always update loading state after handling events
        if (event && isMounted) {
          setLoading(false);
          setInitialLoadComplete(true);
        }
      }
    );

    // Check for existing session
    console.log("Checking for existing session...");
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      if (!isMounted) return;
      
      console.log("Current session:", currentSession ? "exists" : "none");
      
      if (currentSession?.user) {
        setUser(currentSession.user);
        setSession(currentSession);
        const profileData = await fetchProfile(currentSession.user.id);
        if (isMounted) setProfile(profileData);
      }
      
      // Always mark loading as false after the initial check
      setLoading(false);
      setInitialLoadComplete(true);
    }).catch(error => {
      console.error("Error getting session:", error);
      if (isMounted) {
        setLoading(false);
        setInitialLoadComplete(true);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Signing in user:", email);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "فشل تسجيل الدخول" : "Failed to sign in",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setLoading(true);
    try {
      console.log("Signing up user:", email);
      const { error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName || '',
            last_name: lastName || '',
          },
        },
      });
      
      if (signUpError) throw signUpError;
      
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "تم إنشاء الحساب بنجاح" : "Account created successfully",
        description: language === 'ar' ? "تم إرسال رابط التأكيد إلى بريدك الإلكتروني" : "A confirmation link has been sent to your email",
      });
      setLoading(false);
    } catch (error: any) {
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "فشل إنشاء الحساب" : "Failed to create account",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      console.log("Signing out user");
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      const language = profile?.app_metadata?.language || 'en';
      toast({
        title: language === 'ar' ? "فشل تسجيل الخروج" : "Failed to sign out",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading: loading && !initialLoadComplete, 
      signIn, 
      signUp, 
      signOut, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
