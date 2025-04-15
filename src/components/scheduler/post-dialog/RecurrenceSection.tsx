
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RecurrenceSectionProps {
  isRecurring: boolean;
  recurrencePattern: string;
  recurrenceEndDate: Date | undefined;
  setRecurrencePattern: (pattern: string) => void;
  setRecurrenceEndDate: (date: Date | undefined) => void;
}

const RecurrenceSection: React.FC<RecurrenceSectionProps> = ({
  isRecurring,
  recurrencePattern,
  recurrenceEndDate,
  setRecurrencePattern,
  setRecurrenceEndDate,
}) => {
  if (!isRecurring) return null;
  
  return (
    <div className="space-y-3 pl-6 border-l-2 border-muted">
      <div className="space-y-2">
        <Label htmlFor="recurrencePattern">نمط التكرار</Label>
        <Select value={recurrencePattern} onValueChange={setRecurrencePattern}>
          <SelectTrigger id="recurrencePattern">
            <SelectValue placeholder="اختر نمط التكرار" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">يومي</SelectItem>
            <SelectItem value="weekly">أسبوعي</SelectItem>
            <SelectItem value="monthly">شهري</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>تاريخ انتهاء التكرار</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !recurrenceEndDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {recurrenceEndDate ? format(recurrenceEndDate, "PPP") : <span>اختر تاريخاً</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={recurrenceEndDate}
              onSelect={setRecurrenceEndDate}
              initialFocus
              className="pointer-events-auto"
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default RecurrenceSection;
