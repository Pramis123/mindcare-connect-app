import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[125px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  )
}

export function ChatMessageSkeleton() {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[180px]" />
      </div>
    </div>
  )
}

export function MoodEntrySkeleton() {
  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-[70%]" />
    </div>
  )
}
