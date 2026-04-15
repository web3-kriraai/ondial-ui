import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <Skeleton className="h-10 w-56" />
      <Skeleton className="h-4 w-full max-w-md" />
      <Skeleton className="h-4 w-full max-w-sm" />
    </div>
  );
}
