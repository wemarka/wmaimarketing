
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Update matches state when media query changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the listener to begin watching for changes
    media.addEventListener("change", listener);
    
    // Clean up function
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
