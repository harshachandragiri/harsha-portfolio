import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { developmentFlow } from '../data/portfolioData';

function ArchStep({ step, index }) {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
    const Icon = step.icon;
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative flex items-start gap-6"
        >
            {/* Timeline line */}
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center flex-shrink-0 relative">
                    <Icon className="text-[#00f0ff] text-lg" />
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-xl border border-[#00f0ff]/20 animate-ping opacity-20" />
                </div>
                {index < developmentFlow.length - 1 && (
                    <div className="w-[1px] h-full min-h-[60px] bg-gradient-to-b from-[#00f0ff]/30 to-transparent mt-2" />
                )}
            </div>

            {/* Content */}
            <div className="pb-10">
                <span className="text-xs font-mono text-[#00f0ff]/60 tracking-wider">STEP {step.step}</span>
                <h4 className="text-lg font-bold text-white mt-1 mb-2">{step.title}</h4>
                <p className="text-[#94a3b8] text-sm leading-relaxed max-w-md">{step.description}</p>
            </div>
        </motion.div>
    );
}

export default function Architecture() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="architecture" className="relative py-24 sm:py-32 px-6">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[200px]" />

            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                className="relative z-10 max-w-6xl mx-auto"
            >
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-sm font-semibold text-[#00f0ff] tracking-widest uppercase mb-4 block"
                    >
                        System Design
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="section-heading text-white mb-4"
                    >
                        How I Build <span className="gradient-text">Systems in Real time</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="section-subheading mx-auto"
                    >
                        A methodical approach to building production-grade systems from zero to one.
                    </motion.p>
                </div>

                {/* Architecture Steps */}
                <div className="grid lg:grid-cols-2 gap-x-16 gap-y-0">
                    <div>
                        {developmentFlow.slice(0, 3).map((step, i) => (
                            <ArchStep key={step.step} step={step} index={i} />
                        ))}
                    </div>
                    <div>
                        {developmentFlow.slice(3).map((step, i) => (
                            <ArchStep key={step.step} step={step} index={i + 3} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
