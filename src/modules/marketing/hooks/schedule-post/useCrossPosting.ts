
import { UseSchedulePostStateWithSetters } from "./types";

export const useCrossPosting = (state: UseSchedulePostStateWithSetters) => {
  const { 
    platform, 
    socialAccounts, 
    setSelectedAccounts,
    setEnableCrossPosting 
  } = state;

  const handleAccountToggle = (accountId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedAccounts(prev => [...prev, accountId]);
    } else {
      setSelectedAccounts(prev => prev.filter(id => id !== accountId));
    }
  };

  const toggleCrossPosting = (enabled: boolean) => {
    setEnableCrossPosting(enabled);
    if (!enabled) {
      setSelectedAccounts([]);
    } else if (platform) {
      // عند تفعيل المشاركة المتعددة، اختر تلقائياً الحساب الأساسي للمنصة المحددة
      const primaryAccount = socialAccounts.find(account => account.platform === platform);
      if (primaryAccount) {
        setSelectedAccounts([primaryAccount.id]);
      }
    }
  };

  const handlePlatformChange = (selectedPlatform: string) => {
    if (state.enableCrossPosting) {
      // عند تغيير المنصة مع تفعيل المشاركة المتعددة، اختر الحساب الرئيسي لتلك المنصة
      const primaryAccount = socialAccounts.find(account => account.platform === selectedPlatform);
      if (primaryAccount) {
        setSelectedAccounts([primaryAccount.id]);
      }
    }
    return selectedPlatform;
  };

  return {
    handleAccountToggle,
    toggleCrossPosting,
    handlePlatformChange
  };
};
