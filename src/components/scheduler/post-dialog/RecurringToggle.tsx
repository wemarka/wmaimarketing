
import React from "react";
import { Label } from "@/components/ui/label";

interface RecurringToggleProps {
  isRecurring: boolean;
  setIsRecurring: (value: boolean) => void;
}

const RecurringToggle: React.FC<RecurringToggleProps> = ({
  isRecurring,
  setIsRecurring,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id="isRecurring"
        type="checkbox"
        checked={isRecurring}
        onChange={(e) => setIsRecurring(e.target.checked)}
        className="h-4 w-4"
      />
      <Label htmlFor="isRecurring" className="cursor-pointer">نشر متكرر</Label>
    </div>
  );
};

export default RecurringToggle;
