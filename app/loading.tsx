// "use client";

import { Skeleton } from "./components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex-grow mx-auto pt-28 lg:ml-64 lg:pl-10 ">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-neutral-600 mt-2" />
        <Skeleton className="h-[200px] w-full  bg-neutral-600 mt-2" />
        <Skeleton className="h-4 w-[250px] bg-neutral-600" />
        <Skeleton className="h-[200px] w-full  bg-neutral-600 mt-2" />
        <Skeleton className="h-4 w-[250px] bg-neutral-600" />
        <Skeleton className="h-[200px] w-full  bg-neutral-600 mt-2" />
      </div>
    </div>
  );
}
