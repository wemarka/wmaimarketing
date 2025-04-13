
import React from "react";
import ConnectedAccounts from "../ConnectedAccounts";
import PostTimesCard from "../PostTimesCard";
import PerformanceCard from "../PerformanceCard";
import AccountsManager from "../AccountsManager";
import { SocialAccount } from "../types";

interface ListViewSidebarProps {
  view: "list" | "calendar";
  accounts?: SocialAccount[];
}

const SidebarWidgets: React.FC<ListViewSidebarProps> = ({ view, accounts }) => {
  if (view === "list") {
    return (
      <div className="space-y-6">
        <ConnectedAccounts />
        <PostTimesCard />
        <PerformanceCard />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {accounts && <AccountsManager accounts={accounts} />}
    </div>
  );
};

export default SidebarWidgets;
