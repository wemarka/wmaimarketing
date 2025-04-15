
import React from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ThemeToggleProps {
  expanded: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ expanded, isDarkMode, toggleDarkMode }) => {
  return expanded ? (
    <div className="mt-auto pt-4 px-3 flex items-center">
      <Sun className="h-4 w-4 text-gray-500" />
      <Switch 
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
        className="mx-2"
      />
      <Moon className="h-4 w-4 text-gray-500" />
    </div>
  ) : (
    <div className="mt-auto pt-4">
      <Switch 
        checked={isDarkMode}
        onCheckedChange={toggleDarkMode}
      />
    </div>
  );
};

export default ThemeToggle;
