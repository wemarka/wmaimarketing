
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from '@/types/profile';

// Hook منفصل لإدارة حالة المصادقة
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // دالة لجلب الملف الشخصي للمستخدم
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

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    // تعيين مهلة أمان لمنع التحميل اللانهائي
    timeoutId = setTimeout(() => {
      if (isMounted && loading) {
        console.log("Auth loading timeout reached - forcing loading to false");
        setLoading(false);
        setInitialLoadComplete(true);
      }
    }, 3000); // تقليل من 5000

    // إعداد مستمع حالة المصادقة
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
            if (isMounted) {
              setProfile(profileData);
              console.log("Profile set after sign in:", profileData);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setUser(null);
          setSession(null);
          setProfile(null);
        }
        
        // مهم: دائما تحديث حالة التحميل بعد معالجة الأحداث
        if (event && isMounted) {
          setLoading(false);
          setInitialLoadComplete(true);
        }
      }
    );

    // التحقق من وجود جلسة
    console.log("Checking for existing session...");
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      if (!isMounted) return;
      
      console.log("Current session:", currentSession ? "exists" : "none");
      
      if (currentSession?.user) {
        setUser(currentSession.user);
        setSession(currentSession);
        const profileData = await fetchProfile(currentSession.user.id);
        if (isMounted) {
          setProfile(profileData);
          console.log("Profile set after session check:", profileData);
        }
      }
      
      // دائما تعيين التحميل على false بعد الفحص الأولي
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

  return {
    user,
    session,
    profile,
    loading: loading && !initialLoadComplete,
    setProfile
  };
};
