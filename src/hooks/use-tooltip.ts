
import { useState, useCallback, useEffect } from 'react';

interface UseTooltipOptions {
  initialOpen?: boolean;
  delay?: number;
  hoverDelay?: number;
  leaveDelay?: number;
  mouseOnly?: boolean;
}

export function useTooltip({
  initialOpen = false,
  delay = 150,
  hoverDelay = 200,
  leaveDelay = 150,
  mouseOnly = false
}: UseTooltipOptions = {}) {
  const [tooltipOpen, setTooltipOpen] = useState(initialOpen);
  const [tooltipTimeout, setTooltipTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  
  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
    };
  }, [tooltipTimeout]);

  const showTooltip = useCallback((immediate = false) => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(null);
    }
    
    if (immediate) {
      setTooltipOpen(true);
    } else {
      const showTimeout = setTimeout(() => {
        setTooltipOpen(true);
      }, hoverDelay);
      
      setTooltipTimeout(showTimeout as unknown as ReturnType<typeof setTimeout>);
    }
  }, [tooltipTimeout, hoverDelay]);

  const hideTooltip = useCallback((immediate = false) => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(null);
    }
    
    if (immediate) {
      setTooltipOpen(false);
    } else {
      const hideTimeout = setTimeout(() => {
        setTooltipOpen(false);
      }, leaveDelay);
      
      setTooltipTimeout(hideTimeout as unknown as ReturnType<typeof setTimeout>);
    }
  }, [tooltipTimeout, leaveDelay]);

  const toggleTooltip = useCallback(() => {
    setTooltipOpen(prev => !prev);
  }, []);

  return {
    tooltipOpen,
    showTooltip,
    hideTooltip,
    toggleTooltip,
    setTooltipOpen
  };
}
