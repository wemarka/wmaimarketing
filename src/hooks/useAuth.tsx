
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

interface Profile {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role?: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Assuming logged in for now
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'user@example.com'
  });
  const [profile, setProfile] = useState<Profile | null>({
    first_name: 'مستخدم',
    last_name: 'نموذجي',
    role: 'مدير'
  });

  // In a real app, you would check authentication status here
  useEffect(() => {
    // Simulated auth check
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return {
    isAuthenticated,
    loading,
    user,
    profile,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };
};
