'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Application Error:', {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    })
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">Something went wrong!</h1>
          <p className="text-text-secondary mb-8">
            An unexpected error occurred. Please try again or return to the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCw size={20} />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home size={20} />
                Go Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}