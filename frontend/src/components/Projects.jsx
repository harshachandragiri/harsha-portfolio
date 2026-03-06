import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt, FaSitemap } from 'react-icons/fa';
import { projects } from '../data/portfolioData';

function ProjectCard({ project, index }) {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative"
        >
            <div
                className="relative glass-card p-8 h-full overflow-hidden transition-all duration-500 group-hover:border-opacity-100"
                style={{ borderColor: project.borderColor }}
            >
                {/* Glow effect on hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(600px at 50% 50%, ${project.borderColor}15, transparent 80%)`,
                    }}
                />

                {/* Top gradient bar */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${project.borderColor}, transparent)`,
                    }}
                />

                <div className="relative z-10">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                        <span
                            className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                            style={{
                                color: project.borderColor,
                                background: `${project.borderColor}15`,
                                border: `1px solid ${project.borderColor}30`,
                            }}
                        >
                            {project.category}
                        </span>
                        <div className="flex gap-3">
                            <a
                                href={project.architectureLink}
                                className="text-[#64748b] hover:text-[#a855f7] transition-colors"
                                title="View System Design"
                            >
                                <FaSitemap />
                            </a>
                            <a
                                href={project.link}
                                className="text-[#64748b] hover:text-[#00f0ff] transition-colors"
                                title="View Project"
                            >
                                <FaExternalLinkAlt />
                            </a>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
                        {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-3 py-1 rounded-md bg-white/5 text-[#94a3b8] border border-white/5 hover:border-[#00f0ff]/30 hover:text-[#00f0ff] transition-all"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* View Architecture Button */}
                    <a
                        href={project.architectureLink}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#a855f7] hover:text-[#00f0ff] transition-colors group/link"
                    >
                        <FaSitemap className="text-xs" />
                        View System Design
                        <span className="w-0 group-hover/link:w-4 overflow-hidden transition-all duration-300">→</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="projects" className="relative py-24 sm:py-32 px-6">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#ec4899]/5 rounded-full blur-[200px]" />

            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                className="relative z-10 max-w-7xl mx-auto"
            >
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-sm font-semibold text-[#00f0ff] tracking-widest uppercase mb-4 block"
                    >
                        Featured Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="section-heading text-white mb-4"
                    >
                        AI-Powered <span className="gradient-text">Projects</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="section-subheading mx-auto"
                    >
                        Systems I've built — each solving real-world problems with robust engineering.
                    </motion.p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
