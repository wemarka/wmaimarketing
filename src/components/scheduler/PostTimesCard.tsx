
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook, MessageSquare } from "lucide-react";

const PostTimesCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Best Times to Post</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-pink-600" />
              <span className="font-medium">Instagram</span>
            </div>
            <div className="text-sm">
              Tue, Thu 2-4PM
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Facebook</span>
            </div>
            <div className="text-sm">
              Wed, Fri 12-2PM
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-slate-600" />
              <span className="font-medium">TikTok</span>
            </div>
            <div className="text-sm">
              Daily 6-9PM
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostTimesCard;
