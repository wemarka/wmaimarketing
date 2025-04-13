
import React from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { assetFolders } from "./data";

interface AssetsSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFolder: string | null;
  handleFolderClick: (folderId: string) => void;
}

const AssetsSidebar: React.FC<AssetsSidebarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedFolder,
  handleFolderClick,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="h-full">
      <CardHeader className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("assetsLibrary.search")}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[500px]">
          <div className="space-y-1">
            {assetFolders.map((folder) => (
              <Button
                key={folder.id}
                variant={selectedFolder === folder.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFolderClick(folder.id)}
              >
                {folder.icon}
                <span className="mr-2 flex-1 text-right">{folder.name}</span>
                <Badge variant="outline">{folder.count}</Badge>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AssetsSidebar;
