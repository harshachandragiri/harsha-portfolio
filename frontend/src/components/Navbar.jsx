import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'System Design', href: '#architecture' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map((item) => item.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 100) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/5'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="relative group">
                    <span className="text-2xl font-bold gradient-text tracking-tight">
                        {"<Harsha />"}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#a855f7] transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeSection === item.href.slice(1)
                                ? 'text-[#00f0ff]'
                                : 'text-[#94a3b8] hover:text-white'
                                }`}
                        >
                            {item.label}
                            {activeSection === item.href.slice(1) && (
                                <motion.span
                                    layoutId="navIndicator"
                                    className="absolute inset-0 bg-[#00f0ff]/5 rounded-lg border border-[#00f0ff]/20"
                                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                                />
                            )}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-2xl text-[#00f0ff] p-3 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#030014]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeSection === item.href.slice(1)
                                        ? 'text-[#00f0ff] bg-[#00f0ff]/5'
                                        : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
