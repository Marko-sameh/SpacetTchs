'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Brain, TrendingUp, Zap, Shield, Search, Users } from 'lucide-react'

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    emoji: "🚀",
    description: "At SpaceTechs, we don't just build websites — we craft digital experiences that represent your brand and deliver measurable results. Every line of code is written with precision to ensure your website is fast, SEO-optimized, and scalable.",
    features: [
      "100% custom-coded projects tailored to your business goals",
      "Lightning-fast performance powered by Next.js and React",
      "Built-in SEO structure to help you dominate search results",
      "Fully responsive on all devices — mobile, tablet, and desktop",
      "Secure and optimized backend systems for reliability and scalability"
    ],
    highlight: "We specialize in creating custom websites built from scratch — no generic templates, no bloated code. That means your site loads faster, ranks higher, and stands out visually."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile App Development",
    emoji: "📱",
    description: "We create high-performance, user-focused mobile apps that seamlessly blend design and functionality. Our team builds apps that are fast, stable, and intuitive, helping your business stay connected with customers — anytime, anywhere.",
    features: [
      "Cross-platform frameworks like Flutter & React Native to reduce costs while maintaining native-like performance",
      "Each app is crafted with a focus on usability, speed, and long-term maintainability",
      "We prioritize security, offline usability, and modern UI/UX principles for smooth user journeys",
      "100% custom-built, flexible, and future-ready — no generic app builders"
    ],
    highlight: "Our goal is to help your brand stand out in app stores, boost user retention, and provide real business value — not just downloads."
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Artificial Intelligence Solutions",
    emoji: "🧠",
    description: "We help businesses step into the future by integrating AI-driven automation and intelligence into their systems. Our AI services go beyond chatbots — we build smart, data-powered tools that make your business faster, smarter, and more adaptive.",
    features: [
      "Custom machine learning models trained on your business data",
      "AI chatbots that actually understand and respond — not just follow scripts",
      "Predictive analytics to forecast trends, improve operations, and reduce costs",
      "Seamless integration with existing apps and dashboards"
    ],
    highlight: "We don't just deliver AI — we deliver intelligence that improves performance, reduces workload, and transforms decision-making."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Digital Marketing",
    emoji: "💼",
    description: "In a world full of noise, we make your brand impossible to ignore. Our digital marketing team blends creativity, analytics, and strategy to drive real, trackable growth. We don't rely on guesswork — we use data to make every click, post, and ad count.",
    features: [
      "Data-driven decisions for maximum ROI",
      "Advanced SEO & content strategies that boost rankings naturally",
      "Performance-based social media campaigns focused on engagement and conversions",
      "Smart ad management and analytics to track every move and optimize results"
    ],
    highlight: "We focus on long-term brand growth, not short-term hype — helping you build a digital presence that lasts."
  }
]

const differentiators = [
  { icon: <Zap />, title: "Speed + Precision", desc: "We combine cutting-edge technology with meticulous attention to detail." },
  { icon: <Code />, title: "Custom Everything", desc: "No templates. No shortcuts. Every project is hand-crafted to match your brand's identity." },
  { icon: <TrendingUp />, title: "Performance First", desc: "Whether web, app, or AI — we ensure top performance on every device and platform." },
  { icon: <Search />, title: "SEO & Scalability", desc: "We bake optimization into the foundation, not as an afterthought." },
  { icon: <Shield />, title: "Transparency", desc: "You always know what's happening, with clear reports and progress tracking." },
  { icon: <Users />, title: "Future-Ready", desc: "Our team stays ahead of trends — from Web 3.0 to AI integration." }
]

export function DetailedServices() {
  return (
    <div className="py-20">
      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl hover:border-cyan-500/30 transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <span className="text-3xl">{service.emoji}</span>
              <h3 className="text-2xl font-bold text-white font-display">{service.title}</h3>
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed">{service.description}</p>
            
            <div className="mb-6">
              <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                💡 Why choose SpaceTechs for {service.title.toLowerCase()}?
              </h4>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
              <p className="text-white/90 text-sm italic">{service.highlight}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Why SpaceTechs Is Different */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass p-8 rounded-2xl"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display flex items-center justify-center gap-3">
            <span>🪐</span>
            Why SpaceTechs Is Different
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-xl border border-gray-700/60 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}