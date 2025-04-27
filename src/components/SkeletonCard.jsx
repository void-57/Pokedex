import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gray-100 dark:bg-gray-800">
        <Skeleton className="w-full aspect-square rounded-lg" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;