import { LoadingSkeleton } from '@/components/ui/common/LoadingSkeleton'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSkeleton />
    </div>
  )
}