import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data/portfolioData';
import { FaQuoteLeft } from 'react-icons/fa';

const frontendSkills = ['React', 'Angular', 'Advanced JavaScript', 'Responsive CSS'];
const backendSkills = ['Node.js', 'Express', 'Python', 'Flask', 'FastAPI'];
const databaseSkills = ['MongoDB', 'SQL', 'Schema Design', 'Query Optimization'];
const aiSkills = ['LLM Integration', 'RAG Pipelines', 'Prompt Engineering', 'Vector Databases', 'AI API Integration', 'Intelligent Automation'];

export default function About() {
    const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const StackColumn = ({ title, skills, color }) => (
        <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase" style={{ color }}>
                {title}
            </h4>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span key={skill} className="skill-tag text-xs">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <section id="about" className="relative py-24 sm:py-32 px-6">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a855f7]/5 rounded-full blur-[200px]" />

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="relative z-10 max-w-6xl mx-auto"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <span className="text-sm font-semibold text-[#00f0ff] tracking-widest uppercase mb-4 block">
                        About Me
                    </span>
                    <h2 className="section-heading text-white mb-4">
                        Full Stack + AI <span className="gradient-text">Minded</span>
                    </h2>
                    <p className="section-subheading mx-auto">
                        I build complete systems — frontend to backend to AI integration — with a systems-first mindset.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left - Content */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <p className="text-[#94a3b8] text-lg leading-relaxed">
                            {personalInfo.bio}
                        </p>

                        {/* Quote */}
                        <div className="glass-card p-6 relative overflow-hidden">
                            <FaQuoteLeft className="text-[#00f0ff]/20 text-4xl absolute top-4 left-4" />
                            <p className="text-xl font-semibold text-white italic pl-10">
                                {personalInfo.tagline}
                            </p>
                        </div>

                        <p className="text-[#94a3b8] leading-relaxed">
                            {personalInfo.about}
                        </p>
                    </motion.div>

                    {/* Right - Stack */}
                    <motion.div variants={itemVariants} className="glass-card p-8 space-y-6">
                        <h3 className="text-lg font-bold text-white mb-4">Tech Arsenal</h3>
                        <StackColumn title="Frontend" skills={frontendSkills} color="#00f0ff" />
                        <StackColumn title="Backend" skills={backendSkills} color="#a855f7" />
                        <StackColumn title="Database" skills={databaseSkills} color="#3b82f6" />
                        <StackColumn title="AI & GenAI" skills={aiSkills} color="#ec4899" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
