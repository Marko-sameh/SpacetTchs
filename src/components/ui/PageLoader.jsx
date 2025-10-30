'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => setIsLoading(false)

    if (document.readyState === 'complete') {
      setIsLoading(false)
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center"
        >
          <div className="glass p-8 rounded-2xl text-center">
            <motion.img
              src="/logo_wbg.png"
              alt="SpaceTechs Logo"
              width={80}
              height={80}
              className="mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* <div className="animate-pulse mb-6">
              <div className="h-4 bg-white/10 rounded mb-2" />
              <div className="h-3 bg-white/10 rounded w-3/4 mx-auto mb-2" />
              <div className="h-3 bg-white/10 rounded w-1/2 mx-auto" />
            </div> */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-gradient font-display mb-2"
            >
              SpaceTechs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/70"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}