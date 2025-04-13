
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="البحث عن مستخدم..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="كل الأدوار" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">كل الأدوار</SelectItem>
          <SelectItem value="admin">مدير</SelectItem>
          <SelectItem value="marketing">تسويق</SelectItem>
          <SelectItem value="designer">مصمم</SelectItem>
          <SelectItem value="user">مستخدم</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
