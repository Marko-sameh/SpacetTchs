import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "./Button";

function ProjectHoverOverlay({ image }) {
    return null;
}

export default function SplitRevealSection({
    title = 'Project Showcase',
    text = 'A modern split reveal with mask animation inspired by product showcases.',
    image = '/images/sample-project.jpg',
    cta = { label: 'View Project', href: '/projects/sample' },
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { threshold: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) controls.start('visible');
        else controls.start('hidden');
    }, [inView, controls]);

    const leftMask = {
        hidden: { x: '-2%' },
        visible: { x: '0%', transition: { duration: 0.9, ease: 'easeOut' } },
    };

    const rightMask = {
        hidden: { x: '2%' },
        visible: { x: '0%', transition: { duration: 0.9, ease: 'easeOut' } },
    };

    const textAnim = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.7 } },
    };

    return (
        <section ref={ref} className="relative w-full min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div className="relative z-10" initial="hidden" animate={controls}>
                    <motion.h2 variants={textAnim} className="text-4xl lg:text-5xl font-heading font-bold text-[var(--text-primary)] mb-4">
                        {title}
                    </motion.h2>
                    <motion.p variants={textAnim} className="text-lg text-[var(--text-secondary)] max-w-xl mb-6">
                        {text}
                    </motion.p>
                    <motion.div variants={textAnim} className="flex gap-4">
                        <Link href={cta.href} className="inline-block px-6 py-3 bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white rounded-lg font-semibold shadow-lg">
                            <Button>
                                {cta.label}
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                <div className="relative w-full h-[420px] lg:h-[520px] rounded-2xl overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.06 }}
                        animate={inView ? { scale: 1 } : { scale: 1.06 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="absolute inset-0 bg-center bg-cover"
                        style={{ backgroundImage: `url(${image})` }}
                        aria-hidden
                    />

                    <div className="absolute inset-0 flex">
                        <motion.div
                            className="w-1/2 h-full relative overflow-hidden"
                            initial="hidden"
                            animate={controls}
                            variants={leftMask}
                            style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)' }}
                        >
                            <div className="absolute inset-0 bg-black/30" />
                            <img src={image} alt="left" className="w-full h-full object-cover object-left" />
                        </motion.div>

                        <motion.div
                            className="w-1/2 h-full relative overflow-hidden"
                            initial="hidden"
                            animate={controls}
                            variants={rightMask}
                            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40" />
                            <img src={image} alt="right" className="w-full h-full object-cover object-right" />
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 pointer-events-auto">
                        <ProjectHoverOverlay image={image} />
                    </div>
                </div>
            </div>

            <style jsx>{`
        .container { max-width: 1200px; }
      `}</style>
        </section>
    );
}