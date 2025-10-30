'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function FloatingContactButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/contact">
        <motion.button
          whileHover={{ 
            scale: 1.1,
            rotateZ: 5,
            y: -5
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-gradient-to-r from-[#273469] via-[#1E2749] to-[#30343F] p-4 rounded-full shadow-2xl hover:shadow-[#273469]/50 transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-[#273469]/20 to-[#E4D9FF]/20 rounded-full blur-lg"
          />
          
          <motion.div
            whileHover={{ rotate: 15 }}
            className="relative text-white"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
          
          <div className="absolute -inset-2 bg-gradient-to-r from-[#273469]/30 to-[#E4D9FF]/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </Link>
    </motion.div>
  )
}