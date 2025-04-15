
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "جاري البحث",
        description: `تبحث عن: ${searchQuery}`,
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden md:block">
      <Input 
        placeholder="بحث سريع..."
        className="w-[200px] lg:w-[300px] h-9 pl-9 rounded-full bg-muted/30 border-muted"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
    </form>
  );
};

export default SearchBar;
