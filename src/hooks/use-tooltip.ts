
import { useState } from "react";

export const useTooltip = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  const showTooltip = () => setTooltipOpen(true);
  const hideTooltip = () => setTooltipOpen(false);
  
  return {
    tooltipOpen,
    showTooltip,
    hideTooltip
  };
};
