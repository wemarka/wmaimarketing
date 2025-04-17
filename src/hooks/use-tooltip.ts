
import { useState, useCallback } from 'react';

interface UseTooltipOptions {
  initialOpen?: boolean;
  delay?: number;
}

export function useTooltip({ initialOpen = false, delay = 150 }: UseTooltipOptions = {}) {
  const [tooltipOpen, setTooltipOpen] = useState(initialOpen);
  const [tooltipTimeout, setTooltipTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = useCallback(() => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
      setTooltipTimeout(null);
    }
    setTooltipOpen(true);
  }, [tooltipTimeout]);

  const hideTooltip = useCallback(() => {
    const timeout = setTimeout(() => {
      setTooltipOpen(false);
    }, delay);
    
    setTooltipTimeout(timeout as unknown as ReturnType<typeof setTimeout>);
    
    return () => {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
    };
  }, [delay, tooltipTimeout]);

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
