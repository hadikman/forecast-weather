export default function SkeletonTable() {
  return (
    <div className="flex h-[95svh] flex-col rounded-md bg-zinc-200/60 p-2">
      <div className="h-28 animate-pulse rounded-ss-md rounded-se-md border-b-2 border-b-zinc-50 bg-zinc-300"></div>
      <div className="h-full animate-pulse rounded-ee-md rounded-es-md bg-zinc-300"></div>
    </div>
  )
}
