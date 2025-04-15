
import { useState, useEffect } from "react";

interface UseGuardLoadingProps {
  loading: boolean;
}

export const useGuardLoading = ({ loading }: UseGuardLoadingProps) => {
  const [loadingTime, setLoadingTime] = useState(0);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  // Handle loading state and timing
  useEffect(() => {
    if (loading) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setLoadingTime(elapsedTime);
        
        // Show redirect message sooner (after 1 second)
        if (elapsedTime >= 1) {
          setShowRedirectMessage(true);
        }
        
        // Safety timeout to avoid infinite loading (after 3 seconds)
        if (elapsedTime >= 3) {
          console.log("Guard - Safety timeout reached");
          clearInterval(timer);
          setLoadingTime(0);
          setShowRedirectMessage(false);
        }
      }, 500);
      
      return () => clearInterval(timer);
    } else {
      // Reset when loading is finished
      setLoadingTime(0);
      setShowRedirectMessage(false);
    }
  }, [loading]);

  return {
    loadingTime,
    showRedirectMessage
  };
};
