export function LoadingSkeleton({ className = "" }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-white/10 rounded mb-2" />
      <div className="h-3 bg-white/10 rounded w-3/4" />
    </div>
  )
}

export function ProjectSkeleton() {
  return (
    <div className="glass p-6 rounded-2xl animate-pulse">
      <div className="h-48 bg-white/10 rounded-lg mb-4" />
      <div className="h-4 bg-white/10 rounded mb-2" />
      <div className="h-3 bg-white/10 rounded w-3/4 mb-4" />
      <div className="flex gap-2">
        <div className="h-6 bg-white/10 rounded w-16" />
        <div className="h-6 bg-white/10 rounded w-20" />
      </div>
    </div>
  )
}

export function BlogSkeleton() {
  return (
    <div className="glass p-6 rounded-2xl animate-pulse">
      <div className="h-48 bg-white/10 rounded-lg mb-4" />
      <div className="h-4 bg-white/10 rounded mb-2" />
      <div className="h-3 bg-white/10 rounded w-3/4 mb-4" />
      <div className="flex justify-between">
        <div className="h-3 bg-white/10 rounded w-20" />
        <div className="h-3 bg-white/10 rounded w-24" />
      </div>
    </div>
  )
}