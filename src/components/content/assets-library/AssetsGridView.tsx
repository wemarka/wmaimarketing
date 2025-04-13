
import React from "react";
import { Asset } from "./types";
import { typeIcons } from "./data";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface AssetsGridViewProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  toggleAssetSelection: (assetId: string) => void;
  handleAssetClick: (asset: Asset, event: React.MouseEvent) => void;
}

const AssetsGridView: React.FC<AssetsGridViewProps> = ({
  assets,
  selectedAssets,
  toggleAssetSelection,
  handleAssetClick,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {assets.map((asset) => (
        <Card
          key={asset.id}
          className={`cursor-pointer transition-all ${
            selectedAssets.has(asset.id) ? "ring-2 ring-primary" : "hover:border-primary/50"
          }`}
          onClick={(e) => handleAssetClick(asset, e)}
        >
          <CardContent className="p-2">
            <div className="aspect-square relative rounded overflow-hidden bg-muted mb-2 flex items-center justify-center">
              <div className="absolute top-1 right-1 bg-background/70 rounded p-1 text-xs">
                {typeIcons[asset.type]}
              </div>
              <img
                src={asset.thumbnail}
                alt={asset.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-1 left-1">
                <Checkbox 
                  checked={selectedAssets.has(asset.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAssetSelection(asset.id);
                  }}
                  className="bg-background/70"
                />
              </div>
            </div>
            <div className="truncate text-sm font-medium" title={asset.name}>
              {asset.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {asset.size}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssetsGridView;
