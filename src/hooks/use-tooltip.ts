
import { useState } from 'react';

export function useTooltip() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setTooltipOpen(true);
  };

  const hideTooltip = () => {
    const timeout = setTimeout(() => {
      setTooltipOpen(false);
    }, 150);
    
    setTooltipTimeout(timeout as unknown as ReturnType<typeof setTimeout>);
    
    return () => {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
      }
    };
  };

  return {
    tooltipOpen,
    showTooltip,
    hideTooltip
  };
}
