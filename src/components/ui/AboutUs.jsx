'use client';

import { motion } from 'framer-motion'
import { useIsMobile } from "@/hooks/useMediaQuery";
import { aboutVariants } from '@/lib/animations'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

const ANIMATION_CONFIG = {
    duration: (i) => 4 + (i % 3),
    delay: (i) => i * 0.15
};
const SECTIONS = [
    {
        id: '01',
        title: 'CUSTOM WEB DEVELOPMENT',
        subtitle: 'NO TEMPLATES, NO LIMITS',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
        glowColor: 'from-purple-600/30'
    },
    {
        id: '02',
        title: 'AI & AUTOMATION',
        subtitle: 'SMART SOLUTIONS',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)',
        glowColor: 'from-blue-600/30'
    },
    {
        id: '03',
        title: 'DIGITAL MARKETING',
        subtitle: 'GROW YOUR BUSINESS',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
        glowColor: 'from-gray-600/30'
    }
];

export default function AboutUs() {
    const isMobile = useIsMobile();
    const { prefersReducedMotion } = useScrollAnimations();

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* 🔹 خلفية الخطوط المتحركة (SlideDown) */}
            <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none z-0">
                {Array.from({ length: 30 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        style={{
                            top: `${-20 + i * 5}%`,
                            left: '-50%',
                            width: '200%',
                            transform: 'rotate(-15deg)',
                            animation: `slideDown ${ANIMATION_CONFIG.duration(i)}s linear infinite`,
                            animationDelay: `${ANIMATION_CONFIG.delay(i)}s`
                        }}
                    />
                ))}
            </div>

            <motion.h1 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={aboutVariants.slideLeft}
                className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-lg sm:text-3xl font-bold z-10 tracking-widest"
            >
                About Us
            </motion.h1>

            <motion.div 
                variants={aboutVariants.container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20%' }}
                className="relative w-full h-full flex flex-col sm:flex-row z-10"
            >
                {SECTIONS.map((section, index) => (
                    <motion.div
                        key={section.id}
                        variants={index % 2 === 0 ? aboutVariants.slideLeft : aboutVariants.slideRight}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.02, transition: { duration: 0.3 } }}
                        className={`relative flex-1 group cursor-pointer overflow-hidden ${index > 0 ? 'sm:-ml-32' : ''}`}
                        style={{ clipPath: isMobile ? 'none' : section.clipPath }}
                    >
                        <div className="absolute inset-0">
                            <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>

                        <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${section.glowColor} to-transparent`}></div>

                        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 sm:px-12">
                            <div className="text-2xl sm:text-6xl font-thin text-gray-400 mb-2 sm:mb-4">{section.id}</div>
                            <h2 className="text-sm sm:text-5xl font-bold text-white mb-2 sm:mb-4 tracking-wider">
                                {section.title}
                            </h2>
                            <div className="h-px w-16 sm:w-24 bg-white/50 mb-2 sm:mb-4"></div>
                            <p className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-gray-300">{section.subtitle}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    );
}

