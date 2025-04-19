
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';

interface SidebarStoreState {
  expanded: boolean;
  activePath: string;
  toggleExpanded: () => void;
  setExpanded: (value: boolean) => void;
  setActivePath: (path: string) => void;
}

export const useSidebarStore = create<SidebarStoreState>()(
  persist(
    (set, get) => ({
      expanded: true,
      activePath: '/',
      toggleExpanded: () => set({ expanded: !get().expanded }),
      setExpanded: (value: boolean) => set({ expanded: value }),
      setActivePath: (path: string) => set({ activePath: path }),
    }),
    {
      name: 'sidebar-store',
    }
  )
);

export const useActivePath = () => {
  const location = useLocation();
  const setActivePath = useSidebarStore(state => state.setActivePath);

  const checkIsActive = (path: string): boolean => {
    const currentPath = location.pathname;
    
    // Handle exact matches first
    if (path === '/' && currentPath === '/') return true;
    if (path === '/dashboard' && (currentPath === '/dashboard' || currentPath === '/')) return true;
    
    // Handle sub-paths
    if (path !== '/' && path !== '/dashboard') {
      if (currentPath === path) return true; // Exact match
      if (currentPath.startsWith(`${path}/`)) return true; // Sub-path
    }
    
    return false;
  };

  return { checkIsActive };
};
