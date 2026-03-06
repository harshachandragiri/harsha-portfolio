import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setSubmitted(true);
                showToast('Message sent successfully! I will get back to you soon.', 'success');
                setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                console.error('Failed to send message');
                showToast('Failed to send message. Please try again later.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('An error occurred. Please try again later.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
        { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
        { icon: FaInstagram, href: personalInfo.instagram, label: 'Instagram' },
    ];

    return (
        <section id="contact" className="relative py-24 sm:py-32 px-6">
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#00f0ff]/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#a855f7]/5 rounded-full blur-[200px]" />

            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                className="relative z-10 max-w-4xl mx-auto"
            >
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-sm font-semibold text-[#00f0ff] tracking-widest uppercase mb-4 block"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="section-heading text-white mb-4"
                    >
                        Let's <span className="gradient-text">Build Together</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="section-subheading mx-auto"
                    >
                        Have an idea for an AI-powered project or need a full-stack engineer? Let's talk.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 glass-card p-8 space-y-5"
                    >
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-medium text-[#64748b] mb-2 block uppercase tracking-wider">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    placeholder="Harsha Vardhan"
                                    className="glow-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-[#64748b] mb-2 block uppercase tracking-wider">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    placeholder="hello@example.com"
                                    className="glow-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-medium text-[#64748b] mb-2 block uppercase tracking-wider">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formState.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className="glow-input"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-[#64748b] mb-2 block uppercase tracking-wider">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleChange}
                                    placeholder="Project Discussion"
                                    className="glow-input"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-[#64748b] mb-2 block uppercase tracking-wider">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                rows={5}
                                className="glow-input resize-none"
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full btn-primary justify-center text-base py-4 ${submitted ? '!bg-green-500/20 !border-green-500/40 !text-green-400' : ''
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin" />
                            ) : submitted ? (
                                'Message Sent! ✓'
                            ) : (
                                <>
                                    <FaPaperPlane />
                                    Send Message
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        <div className="glass-card p-6 text-center">
                            <h4 className="text-lg font-bold text-white mb-2">Connect with me</h4>
                            <p className="text-sm text-[#94a3b8] mb-6">
                                Follow my work and let's stay connected
                            </p>
                            <div className="flex justify-center gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#94a3b8] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
                                        title={social.label}
                                    >
                                        <social.icon className="text-xl" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h4 className="text-sm font-semibold text-[#00f0ff] mb-3">Quick Info</h4>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-[#64748b]">Location</span>
                                    <p className="text-white">India</p>
                                </div>
                                <div>
                                    <span className="text-[#64748b]">Experience</span>
                                    <p className="text-white">Full Stack + AI Engineer</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className={`fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-xl border flex items-center gap-3 backdrop-blur-md shadow-2xl ${toast.type === 'success'
                            ? 'bg-green-500/10 border-green-500/20 text-green-400'
                            : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}
                    >
                        <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                        <span className="text-sm font-medium">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
