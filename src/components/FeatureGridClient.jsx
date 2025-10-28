'use client'

import { motion } from 'framer-motion'
import { FeatureCard } from './FeatureCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function FeatureGridClient({ title, features }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {title}

          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center"
        >
          {features?.map((feature, index) => {
            if (!feature) return null;
            return (
              <FeatureCard
                key={feature.id || feature.title || index}
                {...feature}
                index={index}
              />
            );
          }) || null}
        </motion.div>
      </div>
    </section>
  )
}