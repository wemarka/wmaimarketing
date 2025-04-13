
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Category {
  value: string;
  label: string;
  color?: string;
}

interface ImageCategorySelectProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  className?: string;
}

const ImageCategorySelect: React.FC<ImageCategorySelectProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  
  const selectedCategoryData = categories.find((category) => category.value === selectedCategory);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedCategory
            ? (
              <div className="flex items-center gap-2">
                {selectedCategoryData?.color && (
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedCategoryData.color }} 
                  />
                )}
                <span>{selectedCategoryData?.label || selectedCategory}</span>
              </div>
            )
            : "اختر تصنيف..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="ابحث عن تصنيف..." />
          <CommandList>
            <CommandEmpty>لم يتم العثور على تصنيفات.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    onCategoryChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {category.color && (
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }} 
                      />
                    )}
                    <span>{category.label}</span>
                  </div>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory === category.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ImageCategorySelect;
