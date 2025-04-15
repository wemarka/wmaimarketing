
import React from "react";
import { LayoutDashboard } from "lucide-react";

interface PageTitleDisplayProps {
  pathname: string;
  pageTitle: string;
}

const PageTitleDisplay: React.FC<PageTitleDisplayProps> = ({ pathname, pageTitle }) => {
  return (
    <div className="flex items-center gap-2">
      {pathname === "/dashboard" && <LayoutDashboard className="h-5 w-5 text-beauty-purple" />}
      <h2 className="text-lg font-semibold">{pageTitle}</h2>
    </div>
  );
};

export default PageTitleDisplay;
