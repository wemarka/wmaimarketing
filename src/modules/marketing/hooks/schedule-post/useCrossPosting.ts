
import { useState } from "react";
import { UseSchedulePostStateWithSetters } from "./types";

export const useCrossPosting = (state: UseSchedulePostStateWithSetters) => {
  // Use the state setter for proper typing
  const handleAccountToggle = (accountId: string) => {
    state.setSelectedAccounts((prev: string[]) => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const toggleCrossPosting = () => {
    state.setEnableCrossPosting(!state.enableCrossPosting);
  };

  const handlePlatformChange = (selectedPlatform: string) => {
    // Update the platform
    state.setPlatform(selectedPlatform);
    
    // Reset cross-posting when platform changes
    state.setSelectedAccounts([]);
    
    return selectedPlatform;
  };

  return {
    handleAccountToggle,
    toggleCrossPosting,
    handlePlatformChange
  };
};
