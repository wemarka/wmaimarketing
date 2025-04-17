
import { UseSchedulePostStateWithSetters } from "./types";

export const useCrossPosting = (state: UseSchedulePostStateWithSetters) => {
  const {
    selectedAccounts,
    enableCrossPosting,
    socialAccounts,
    setSelectedAccounts,
    setEnableCrossPosting
  } = state;

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts((prev: string[]) => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  const toggleCrossPosting = () => {
    setEnableCrossPosting((prev: boolean) => !prev);
  };

  const handlePlatformChange = (platform: string) => {
    // Update platform
    state.setPlatform(platform);
    
    // Filter social accounts based on selected platform
    const filteredAccounts = socialAccounts.filter(account => account.platform === platform);
    
    if (filteredAccounts.length > 0 && enableCrossPosting) {
      // Auto-select the first account of this platform if cross-posting is enabled
      setSelectedAccounts([filteredAccounts[0].id]);
    }
    
    return platform; // Return the platform for chaining
  };

  return { handleAccountToggle, toggleCrossPosting, handlePlatformChange };
};
