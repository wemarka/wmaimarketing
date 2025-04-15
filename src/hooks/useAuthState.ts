
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { ProfileData, AppRole } from '@/types/profile';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

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
        
        // If profile not found, try to create one
        if (error.code === 'PGRST116') {
          console.log("Profile not found, creating a new one");
          const newProfileData = {
            id: userId,
            first_name: "",
            last_name: "",
            avatar_url: null,
            role: "user" as AppRole, // Cast to ensure type safety
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          
          const { data: createdProfile, error: insertError } = await supabase
            .from('profiles')
            .insert(newProfileData)
            .select()
            .single();
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
            return null;
          }
          
          console.log("Created profile:", createdProfile);
          return createdProfile as ProfileData;
        }
        
        return null;
      }
      
      console.log("Fetched profile:", data);
      
      // Ensure role is valid, default to 'user' if not
      const validRole = data.role && ['admin', 'user', 'marketing', 'designer'].includes(data.role) 
        ? data.role 
        : 'user';
      
      // Return profile with validated role
      return {
        ...data,
        role: validRole
      } as ProfileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    // Set safety timeout to prevent infinite loading
    timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.log("Auth loading timeout reached - forcing loading to false");
        setLoading(false);
        setInitialLoadComplete(true);
      }
    }, 5000); // 5-second timeout

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state change event:", event);
        
        if (!isMounted) return;
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (newSession?.user) {
            console.log("User signed in:", newSession.user);
            setUser(newSession.user);
            setSession(newSession);
            
            // Delay profile fetch to avoid race conditions
            setTimeout(async () => {
              if (!isMounted) return;
              const profileData = await fetchProfile(newSession.user.id);
              if (isMounted) {
                setProfile(profileData);
                console.log("Profile set after sign in:", profileData);
                setLoading(false);
                setInitialLoadComplete(true);
              }
            }, 100);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setUser(null);
          setSession(null);
          setProfile(null);
          if (isMounted) {
            setLoading(false);
            setInitialLoadComplete(true);
          }
        } else if (isMounted) {
          // For other events, just update loading state
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
        
        // Delay profile fetch to avoid race conditions
        setTimeout(async () => {
          if (!isMounted) return;
          const profileData = await fetchProfile(currentSession.user.id);
          if (isMounted) {
            setProfile(profileData);
            console.log("Profile set after session check:", profileData);
            setLoading(false);
            setInitialLoadComplete(true);
          }
        }, 100);
      } else {
        // No active session
        if (isMounted) {
          setLoading(false);
          setInitialLoadComplete(true);
        }
      }
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

  return {
    user,
    session,
    profile,
    loading: loading && !initialLoadComplete,
    setProfile
  };
};
