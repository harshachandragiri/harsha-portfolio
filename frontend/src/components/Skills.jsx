import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillCategories } from '../data/portfolioData';

function SkillBar({ name, Icon, level, delay, color }) {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className="group"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <Icon className="text-lg" style={{ color }} />
                    <span className="text-sm font-medium text-[#e2e8f0]">{name}</span>
                </div>
                <span className="text-xs font-mono text-[#64748b] group-hover:text-[#00f0ff] transition-colors">
                    {level}%
                </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full relative"
                    style={{
                        background: `linear-gradient(90deg, ${color}, ${color}80)`,
                        boxShadow: `0 0 10px ${color}40`,
                    }}
                >
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

function SkillCategory({ category, index }) {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    const Icon = category.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-card-hover p-6 sm:p-8"
        >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
                >
                    <Icon className="text-lg" style={{ color: category.color }} />
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
            </div>

            {/* Skill Bars */}
            <div className="space-y-4">
                {category.skills.map((skill, i) => (
                    <SkillBar
                        key={skill.name}
                        name={skill.name}
                        Icon={skill.icon}
                        level={skill.level}
                        delay={i * 0.08}
                        color={category.color}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="skills" className="relative py-24 sm:py-32 px-6">
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00f0ff]/3 rounded-full blur-[200px]" />

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
                        Technical Skills
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="section-heading text-white mb-4"
                    >
                        My <span className="gradient-text">Tech Stack</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="section-subheading mx-auto"
                    >
                        The technologies and tools I use to bring ideas to life — from concept to production.
                    </motion.p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <SkillCategory key={category.title} category={category} index={index} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
