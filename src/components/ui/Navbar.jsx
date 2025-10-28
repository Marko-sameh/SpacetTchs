'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/stores/useUIStore'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from "@/../public/logo_wbg.png"


export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isMenuOpen, setMenuOpen } = useUIStore()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(typeof window !== 'undefined' && window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src={logo}
              alt="Speed Tech Logo"
              width={80}
              height={80}
              className="w-12 h-12 sm:w-22 sm:h-22"
            />
            <span className="text-lg sm:text-xl font-bold  font-display">
              Speed Tech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.href} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm xl:text-base font-medium transition-colors hover:text-accent relative whitespace-nowrap',
                    pathname === item.href ? 'text-accent' : 'text-text'
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </Link>
              </motion.div>
            ))}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="p-2 text-text rounded-lg hover:bg-surface/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass backdrop-blur-md border-t border-border"
          >
            <div className="container-responsive py-4">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-base font-medium py-3 px-4 rounded-lg transition-colors",
                        pathname === item.href
                          ? 'text-accent bg-accent/10'
                          : 'text-text hover:text-accent hover:bg-surface/50'
                      )}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="flex items-center justify-center space-x-4 pt-4 mt-4 border-t border-border md:hidden"
              >

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}