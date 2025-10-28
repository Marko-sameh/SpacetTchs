'use client'

import { useEffect, useState, useCallback } from 'react'
import { throttle } from '@/lib/utils'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    try {
      if (typeof window === 'undefined' || !document?.documentElement) return

      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setProgress(0)
        return;
      }

      const newProgress = Math.min(Math.max((scrolled / maxScroll) * 100, 0), 100)
      setProgress(newProgress)
    } catch (error) {
      console.warn('ScrollProgress error:', error)
    }
  }, [])

  const throttledUpdate = useCallback(throttle(updateProgress, 16), [updateProgress])

  useEffect(() => {
    // Initial calculation
    updateProgress()

    window.addEventListener('scroll', throttledUpdate, { passive: true })
    window.addEventListener('resize', throttledUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledUpdate)
      window.removeEventListener('resize', throttledUpdate)
    }
  }, [throttledUpdate, updateProgress])

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}