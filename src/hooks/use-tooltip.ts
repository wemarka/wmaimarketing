
import { useState, useCallback } from 'react';

export function useTooltip() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  const showTooltip = useCallback(() => {
    setTooltipOpen(true);
  }, []);
  
  const hideTooltip = useCallback(() => {
    setTooltipOpen(false);
  }, []);
  
  return {
    tooltipOpen,
    showTooltip,
    hideTooltip
  };
}
