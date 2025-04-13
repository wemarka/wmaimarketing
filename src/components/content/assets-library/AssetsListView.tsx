
import React from "react";
import { Pencil } from "lucide-react";
import { Asset } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

interface AssetsListViewProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  toggleAssetSelection: (assetId: string) => void;
  handleAssetClick: (asset: Asset, event: React.MouseEvent) => void;
  handleSelectAllAssets: () => void;
}

const AssetsListView: React.FC<AssetsListViewProps> = ({
  assets,
  selectedAssets,
  toggleAssetSelection,
  handleAssetClick,
  handleSelectAllAssets,
}) => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="p-2 text-right w-8">
              <Checkbox 
                checked={selectedAssets.size > 0 && selectedAssets.size === assets.length}
                onClick={handleSelectAllAssets}
              />
            </th>
            <th className="p-2 text-right">{t("assetsLibrary.fileName")}</th>
            <th className="p-2 text-right">{t("assetsLibrary.type")}</th>
            <th className="p-2 text-right">{t("assetsLibrary.size")}</th>
            <th className="p-2 text-right">{t("assetsLibrary.date")}</th>
            <th className="p-2 text-right">{t("assetsLibrary.tags")}</th>
            <th className="p-2 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr 
              key={asset.id} 
              className={`border-t hover:bg-muted/50 cursor-pointer ${
                selectedAssets.has(asset.id) ? "bg-primary/10" : ""
              }`}
              onClick={(e) => handleAssetClick(asset, e)}
            >
              <td className="p-2">
                <Checkbox 
                  checked={selectedAssets.has(asset.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAssetSelection(asset.id);
                  }}
                />
              </td>
              <td className="p-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded overflow-hidden bg-muted ml-2">
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="truncate max-w-[200px]">{asset.name}</span>
                </div>
              </td>
              <td className="p-2">{asset.type}</td>
              <td className="p-2">{asset.size}</td>
              <td className="p-2">{asset.created}</td>
              <td className="p-2">
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {asset.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{asset.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </td>
              <td className="p-2">
                <Button variant="ghost" size="icon" onClick={(e) => {
                  e.stopPropagation();
                  handleAssetClick(asset, e);
                }}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsListView;
