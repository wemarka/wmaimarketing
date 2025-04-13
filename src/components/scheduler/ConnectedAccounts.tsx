
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageSquare, Plus } from "lucide-react";

const ConnectedAccounts = () => {
  // Platform icons mapping
  const platformIcons = {
    instagram: <Instagram className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
    tiktok: <MessageSquare className="h-4 w-4" />,
  };

  // Platform colors mapping
  const platformColors = {
    instagram: "bg-pink-100 text-pink-600",
    facebook: "bg-blue-100 text-blue-600",
    tiktok: "bg-slate-100 text-slate-600",
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
        
        <div className="space-y-3">
          {[
            { name: "Beauty Brand", platform: "instagram", status: "connected" },
            { name: "Beauty Official", platform: "facebook", status: "connected" },
            { name: "Beauty Trends", platform: "tiktok", status: "connected" },
          ].map((account, index) => (
            <div key={index} className="flex items-center justify-between border rounded-md p-3">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${platformColors[account.platform as keyof typeof platformColors]}`}>
                  {platformIcons[account.platform as keyof typeof platformIcons]}
                </div>
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                </div>
              </div>
              <div className="flex items-center">
                {account.status === "connected" ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Connected
                  </span>
                ) : (
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Connect New Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccounts;
