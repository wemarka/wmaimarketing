
import { useState } from "react";

export const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return {
    searchTerm,
    setSearchTerm,
  };
};
