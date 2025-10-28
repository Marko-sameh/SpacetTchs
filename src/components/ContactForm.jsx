'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { z } from 'zod'
import { Button } from './ui/Button'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})

    try {
      const validatedData = contactSchema.parse(formData)

      const subject = encodeURIComponent('Contact Form Submission')
      const body = encodeURIComponent(`Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`)
      const mailtoLink = `mailto:contact@spacetechs.net?subject=${subject}&body=${body}`

      window.location.href = mailtoLink
      setStatus('success')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {}
        error.errors.forEach(err => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl space-y-4 sm:space-y-6 w-full max-w-2xl mx-auto"
    >
      <div>
        <label htmlFor="name" className="block text-responsive-sm font-medium text-text mb-2">
          Name
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface border border-border rounded-lg text-responsive-base text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          placeholder="Your name"
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle size={16} />
            {errors.name}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-responsive-sm font-medium text-text mb-2">
          Email
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface border border-border rounded-lg text-responsive-base text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          placeholder="your@email.com"
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle size={16} />
            {errors.email}
          </motion.p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-responsive-sm font-medium text-text mb-2">
          Message
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface border border-border rounded-lg text-responsive-base text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none min-h-[100px] sm:min-h-[120px]"
          placeholder="Your message..."
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle size={16} />
            {errors.message}
          </motion.p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full flex items-center justify-center gap-2"
        magnetic
      >
        {status === 'success' ? (
          <CheckCircle size={20} />
        ) : (
          <Send size={20} />
        )}
        {status === 'success' ? 'Opening Email Client...' : 'Send Message'}
      </Button>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 text-center flex items-center justify-center gap-2"
        >
          <CheckCircle size={16} />
          Message sent successfully!
        </motion.p>
      )}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-center flex items-center justify-center gap-2"
        >
          <AlertCircle size={16} />
          Failed to send message. Please try again.
        </motion.p>
      )}
    </motion.form>
  )
}