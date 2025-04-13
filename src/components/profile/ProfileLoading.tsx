
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="space-y-2 mb-8">
      <h1>الملف الشخصي</h1>
      <p className="text-muted-foreground">
        إدارة حسابك ومعلوماتك الشخصية
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 mt-6">
        <div className="space-y-6">
          <Skeleton className="h-32 w-32 rounded-full mx-auto" />
          <Skeleton className="h-6 w-40 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
