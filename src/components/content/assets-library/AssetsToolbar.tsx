
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  FilePlus2, 
  FolderPlus, 
  Filter, 
  Download, 
  Tag, 
  Trash2,
  Grid2X2,
  List,
  SortAsc,
  SortDesc
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SortOption, SortDirection, ViewMode } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AssetsToolbarProps {
  selectedFolder: string | null;
  folderName: string | undefined;
  assetsCount: number;
  selectedAssets: Set<string>;
  viewMode: ViewMode;
  sortBy: SortOption;
  sortDirection: SortDirection;
  setViewMode: (mode: ViewMode) => void;
  setSortBy: (option: SortOption) => void;
  toggleSortDirection: () => void;
  clearSelectedAssets: () => void;
  handleBulkDelete: () => void;
  handleBulkDownload: () => void;
  handleBulkMove: () => void;
  handleBulkTag: () => void;
  setIsNewFolderDialogOpen: (open: boolean) => void;
  setIsNewAssetDialogOpen: (open: boolean) => void;
}

const AssetsToolbar: React.FC<AssetsToolbarProps> = ({
  selectedFolder,
  folderName,
  assetsCount,
  selectedAssets,
  viewMode,
  sortBy,
  sortDirection,
  setViewMode,
  setSortBy,
  toggleSortDirection,
  clearSelectedAssets,
  handleBulkDelete,
  handleBulkDownload,
  handleBulkMove,
  handleBulkTag,
  setIsNewFolderDialogOpen,
  setIsNewAssetDialogOpen,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <div className="flex items-center">
        <h3 className="text-lg font-medium">
          {selectedFolder 
            ? folderName
            : "كل الملفات"}
        </h3>
        <Badge variant="outline" className="mr-2">
          {assetsCount} عنصر
        </Badge>
      </div>
      
      {selectedAssets.size > 0 && (
        <div className="flex items-center ml-auto mr-2 bg-muted/50 px-2 py-1 rounded-md">
          <span className="text-sm ml-2">{t('assetsLibrary.selected', { count: selectedAssets.size })}: {selectedAssets.size}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                {t('assetsLibrary.bulkActions')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleBulkDownload}>
                <Download className="h-4 w-4 ml-2" />
                {t('assetsLibrary.download')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkMove}>
                <FolderPlus className="h-4 w-4 ml-2" />
                {t('assetsLibrary.move')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleBulkTag}>
                <Tag className="h-4 w-4 ml-2" />
                {t('assetsLibrary.manageTags')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleBulkDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 ml-2" />
                {t('assetsLibrary.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearSelectedAssets}
          >
            {t('assetsLibrary.clearSelection')}
          </Button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              {t('assetsLibrary.sortAndFilter')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('assetsLibrary.sortBy')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                <span>{t('assetsLibrary.name')}</span>
                {sortBy === "name" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date")}>
                <span>{t('assetsLibrary.date')}</span>
                {sortBy === "date" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("size")}>
                <span>{t('assetsLibrary.size')}</span>
                {sortBy === "size" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("type")}>
                <span>{t('assetsLibrary.type')}</span>
                {sortBy === "type" && (
                  sortDirection === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleSortDirection}>
              {sortDirection === "asc" ? (
                <>
                  <SortAsc className="h-4 w-4 ml-2" />
                  <span>{t('assetsLibrary.ascending')}</span>
                </>
              ) : (
                <>
                  <SortDesc className="h-4 w-4 ml-2" />
                  <span>{t('assetsLibrary.descending')}</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex border rounded-md overflow-hidden">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="rounded-none"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="rounded-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetsToolbar;
