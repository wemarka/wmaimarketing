
import React from "react";
import { CheckCircle } from "lucide-react";

const EmptyPostsPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <CheckCircle className="h-12 w-12 text-green-500 mb-4 opacity-50" />
      <h3 className="text-lg font-medium">لا توجد منشورات معلقة</h3>
      <p className="text-sm text-muted-foreground max-w-md mt-2">
        لا توجد منشورات تنتظر الموافقة حاليًا. ستظهر هنا المنشورات الجديدة التي تتطلب موافقتك قبل النشر.
      </p>
    </div>
  );
};

export default EmptyPostsPlaceholder;
