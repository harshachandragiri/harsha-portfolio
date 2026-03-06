import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaRocket } from 'react-icons/fa';
import { personalInfo, typingStrings } from '../data/portfolioData';

export default function Hero() {
    const [typedText, setTypedText] = useState('');
    const [stringIndex, setStringIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const currentString = typingStrings[stringIndex];

        if (!isDeleting && charIndex <= currentString.length) {
            timeoutRef.current = setTimeout(() => {
                setTypedText(currentString.slice(0, charIndex));
                setCharIndex((prev) => prev + 1);
            }, 60);
        } else if (!isDeleting && charIndex > currentString.length) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex >= 0) {
            timeoutRef.current = setTimeout(() => {
                setTypedText(currentString.slice(0, charIndex));
                setCharIndex((prev) => prev - 1);
            }, 30);
        } else if (isDeleting && charIndex < 0) {
            setIsDeleting(false);
            setCharIndex(0);
            setStringIndex((prev) => (prev + 1) % typingStrings.length);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [charIndex, isDeleting, stringIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden"
        >
            {/* Gradient blobs */}
            <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[#00f0ff]/5 rounded-full blur-[120px] animate-float-blob" />
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#a855f7]/5 rounded-full blur-[150px] animate-float-blob" style={{ animationDelay: '-5s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ec4899]/3 rounded-full blur-[200px] animate-float-blob" style={{ animationDelay: '-10s' }} />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16"
            >
                {/* Left - Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    {/* Status badge */}

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5"
                    >
                        <span className="text-white">Building </span>
                        <span className="gradient-text">Intelligent Systems</span>
                        <br />
                        <span className="text-white">for the </span>
                        <span className="gradient-text">AI-First World</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base text-[#94a3b8] max-w-xl mb-5 leading-relaxed"
                    >
                        {personalInfo.subheading}
                    </motion.p>

                    {/* Typing animation */}
                    <motion.div
                        variants={itemVariants}
                        className="h-10 flex items-center justify-center lg:justify-start mb-8"
                    >
                        <span className="text-base sm:text-lg font-mono text-[#00f0ff]/80">
                            {'> '}
                        </span>
                        <span className="text-base sm:text-lg font-mono text-[#00f0ff]">
                            {typedText}
                        </span>
                        <span className="w-[2px] h-5 bg-[#00f0ff] ml-1 animate-pulse" />
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
                    >
                        <a href="#projects" className="btn-primary">
                            <FaRocket className="text-sm" />
                            View Projects
                        </a>
                        <a
                            href={personalInfo.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            <FaDownload className="text-sm" />
                            Download Resume
                        </a>
                        <a href="#contact" className="btn-secondary">
                            Let's Build Together
                            <FaArrowRight className="text-sm" />
                        </a>
                    </motion.div>
                </div>

                {/* Right - Profile Photo */}
                <motion.div
                    variants={itemVariants}
                    className="flex-shrink-0"
                >
                    <div className="relative group">
                        {/* Outer glow ring */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] rounded-2xl opacity-30 group-hover:opacity-50 blur-md transition-opacity duration-500" />

                        {/* Photo container */}
                        <div className="relative w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-[360px] rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#00f0ff]/30 transition-all duration-500">
                            <img
                                src="/assets/harsha.webp"
                                alt="Harsha Chandragiri"
                                loading="eager"
                                fetchPriority="high"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent" />

                            {/* Name overlay */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-bold text-lg">Harsha Chandragiri</p>
                                <p className="text-[#00f0ff] text-xs font-mono">Full Stack + AI Engineer</p>
                            </div>
                        </div>

                        {/* Decorative corner accents */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#00f0ff]/40 rounded-tr-lg" />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#a855f7]/40 rounded-bl-lg" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-[#00f0ff] rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
