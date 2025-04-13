import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FilePlus2, FolderPlus } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Asset, SortOption, SortDirection, ViewMode } from "./types";
import { sampleAssets, assetFolders } from "./data";
import AssetsSidebar from "./AssetsSidebar";
import AssetsGridView from "./AssetsGridView";
import AssetsListView from "./AssetsListView";
import AssetsToolbar from "./AssetsToolbar";
import AssetDetailsDialog from "./AssetDetailsDialog";
import NewFolderDialog from "./NewFolderDialog";
import NewAssetDialog from "./NewAssetDialog";

const AssetsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isNewAssetDialogOpen, setIsNewAssetDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());
  const { t } = useTranslation();
  const { toast } = useToast();

  const toggleAssetSelection = (assetId: string) => {
    const newSelectedAssets = new Set(selectedAssets);
    if (selectedAssets.has(assetId)) {
      newSelectedAssets.delete(assetId);
    } else {
      newSelectedAssets.add(assetId);
    }
    setSelectedAssets(newSelectedAssets);
  };

  const clearSelectedAssets = () => {
    setSelectedAssets(new Set());
  };

  const handleBulkDelete = () => {
    toast({
      title: t('assetsLibrary.deleted'),
      description: `${t('assetsLibrary.deletedDescription')} ${selectedAssets.size} ${t('assetsLibrary.items')}`,
    });
    clearSelectedAssets();
  };

  const handleBulkDownload = () => {
    toast({
      title: t('assetsLibrary.downloading'),
      description: `${t('assetsLibrary.downloadingDescription')} ${selectedAssets.size} ${t('assetsLibrary.items')}`,
    });
  };

  const handleBulkMove = () => {
    toast({
      title: t('assetsLibrary.moved'),
      description: `${t('assetsLibrary.movedDescription')} ${selectedAssets.size} ${t('assetsLibrary.items')}`,
    });
    clearSelectedAssets();
  };

  const handleBulkTag = () => {
    toast({
      title: t('assetsLibrary.tagsUpdated'),
      description: `${t('assetsLibrary.tagsUpdatedDescription')} ${selectedAssets.size} ${t('assetsLibrary.items')}`,
    });
    clearSelectedAssets();
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const filteredAssets = sampleAssets.filter(asset => {
    const matchesSearch = 
      !searchQuery || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFolder = !selectedFolder || asset.category === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return sortDirection === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      case "date":
        return sortDirection === "asc" 
          ? a.created.localeCompare(b.created) 
          : b.created.localeCompare(a.created);
      case "size":
        const getSize = (size: string) => parseInt(size.split(' ')[0]);
        return sortDirection === "asc" 
          ? getSize(a.size) - getSize(b.size) 
          : getSize(b.size) - getSize(a.size);
      case "type":
        return sortDirection === "asc" 
          ? a.type.localeCompare(b.type) 
          : b.type.localeCompare(a.type);
      default:
        return 0;
    }
  });

  const handleAssetClick = (asset: Asset, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      toggleAssetSelection(asset.id);
    } else {
      setSelectedAsset(asset);
      setIsDetailDialogOpen(true);
    }
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
    clearSelectedAssets();
  };

  const handleSelectAllAssets = () => {
    if (selectedAssets.size === sortedAssets.length) {
      clearSelectedAssets();
    } else {
      setSelectedAssets(new Set(sortedAssets.map(asset => asset.id)));
    }
  };

  const folderName = selectedFolder ? assetFolders.find(f => f.id === selectedFolder)?.name : undefined;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t('assetsLibrary.title')}</CardTitle>
            <div className="flex gap-2">
              <Button onClick={() => setIsNewFolderDialogOpen(true)} variant="outline" size="sm">
                <FolderPlus className="h-4 w-4 ml-2" />
                {t('assetsLibrary.newFolder')}
              </Button>
              <Button onClick={() => setIsNewAssetDialogOpen(true)} size="sm">
                <FilePlus2 className="h-4 w-4 ml-2" />
                {t('assetsLibrary.addFile')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-64">
              <AssetsSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFolder={selectedFolder}
                handleFolderClick={handleFolderClick}
              />
            </div>
            <div className="flex-1">
              <AssetsToolbar
                selectedFolder={selectedFolder}
                folderName={folderName}
                assetsCount={sortedAssets.length}
                selectedAssets={selectedAssets}
                viewMode={viewMode}
                sortBy={sortBy}
                sortDirection={sortDirection}
                setViewMode={setViewMode}
                setSortBy={setSortBy}
                toggleSortDirection={toggleSortDirection}
                clearSelectedAssets={clearSelectedAssets}
                handleBulkDelete={handleBulkDelete}
                handleBulkDownload={handleBulkDownload}
                handleBulkMove={handleBulkMove}
                handleBulkTag={handleBulkTag}
                setIsNewFolderDialogOpen={setIsNewFolderDialogOpen}
                setIsNewAssetDialogOpen={setIsNewAssetDialogOpen}
              />
              {sortedAssets.length > 0 ? (
                viewMode === "grid" ? (
                  <AssetsGridView
                    assets={sortedAssets}
                    selectedAssets={selectedAssets}
                    toggleAssetSelection={toggleAssetSelection}
                    handleAssetClick={handleAssetClick}
                  />
                ) : (
                  <AssetsListView
                    assets={sortedAssets}
                    selectedAssets={selectedAssets}
                    toggleAssetSelection={toggleAssetSelection}
                    handleAssetClick={handleAssetClick}
                    handleSelectAllAssets={handleSelectAllAssets}
                  />
                )
              ) : (
                <div className="border rounded-lg p-12 text-center">
                  <p className="text-muted-foreground">{t('assetsLibrary.noFiles')}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <AssetDetailsDialog
        isOpen={isDetailDialogOpen}
        setIsOpen={setIsDetailDialogOpen}
        selectedAsset={selectedAsset}
      />
      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        setIsOpen={setIsNewFolderDialogOpen}
      />
      <NewAssetDialog
        isOpen={isNewAssetDialogOpen}
        setIsOpen={setIsNewAssetDialogOpen}
      />
    </div>
  );
};

export default AssetsLibrary;
