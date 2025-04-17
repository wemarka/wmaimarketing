
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  expanded: boolean;
  expandedSection: string | undefined;
  activePath: string;
  isDarkMode: boolean;
  sidebarPosition: 'left' | 'right';
  isTransitioning: boolean;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  setExpandedSection: (section: string | undefined) => void;
  setActivePath: (path: string) => void;
  setDarkMode: (isDarkMode: boolean) => void;
  toggleDarkMode: () => void;
  setSidebarPosition: (position: 'left' | 'right') => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      expanded: true, // Make sure sidebar starts expanded by default
      expandedSection: undefined,
      activePath: '/dashboard',
      isDarkMode: false,
      sidebarPosition: 'right' as const, // Set to right for RTL support
      isTransitioning: false,
      
      setExpanded: (expanded) => set({ expanded }),
      toggleExpanded: () => set((state) => ({ 
        expanded: !state.expanded, 
        isTransitioning: true 
      })),
      
      setExpandedSection: (section) => set({ expandedSection: section }),
      
      setActivePath: (path) => set({ activePath: path }),
      
      setDarkMode: (isDarkMode) => set({ isDarkMode }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      setSidebarPosition: (position) => set({ sidebarPosition: position }),
      
      setIsTransitioning: (isTransitioning) => set({ isTransitioning })
    }),
    {
      name: 'sidebar-storage',
      partialize: (state) => ({ 
        expanded: state.expanded, 
        isDarkMode: state.isDarkMode,
        sidebarPosition: state.sidebarPosition,
        activePath: state.activePath
      })
    }
  )
);

// Hook for checking active state of links
export const useActivePath = () => {
  const activePath = useSidebarStore((state) => state.activePath);
  
  const checkIsActive = (path: string): boolean => {
    if (path === '/') {
      return activePath === '/';
    }
    return activePath.startsWith(path);
  };
  
  return { checkIsActive };
};
