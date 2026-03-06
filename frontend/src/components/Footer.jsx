import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/5 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div>
                        <a href="#home" className="text-xl font-bold gradient-text">
                            {"<Harsha />"}
                        </a>
                        <p className="text-xs text-[#64748b] mt-1">
                            Full Stack + AI Engineer
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm text-[#64748b]">
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                        <a href="#skills" className="hover:text-white transition-colors">Skills</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </div>

                    {/* Social */}
                    <div className="flex items-center gap-3">
                        {[
                            { icon: FaGithub, href: personalInfo.github },
                            { icon: FaLinkedin, href: personalInfo.linkedin },
                            { icon: FaInstagram, href: personalInfo.instagram },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#64748b] hover:text-[#00f0ff] hover:border-[#00f0ff]/20 transition-all"
                            >
                                <social.icon />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mt-8 pt-6 border-t border-white/5"
                >
                    <p className="text-xs text-[#64748b]">
                        © {currentYear} Harsha Chandragiri. Built with{' '}
                        <FaHeart className="inline text-[#ec4899] mx-1" />
                        and React
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
