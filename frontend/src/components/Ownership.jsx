import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ownershipPrinciples } from '../data/portfolioData';
import { FaCheckCircle } from 'react-icons/fa';

export default function Ownership() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="relative py-24 sm:py-32 px-6">
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#a855f7]/5 rounded-full blur-[200px]" />

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
                        Engineering Philosophy
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="section-heading text-white mb-4"
                    >
                        Engineering with <span className="gradient-text">Ownership</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="section-subheading mx-auto"
                    >
                        The principles that guide my engineering decisions — because code is not just logic, it's responsibility.
                    </motion.p>
                </div>

                {/* Principles Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ownershipPrinciples.map((principle, index) => (
                        <motion.div
                            key={principle.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card-hover p-6 group"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <FaCheckCircle className="text-[#00f0ff] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <h4 className="text-base font-bold text-white">{principle.title}</h4>
                            </div>
                            <p className="text-[#94a3b8] text-sm leading-relaxed pl-7">
                                {principle.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
