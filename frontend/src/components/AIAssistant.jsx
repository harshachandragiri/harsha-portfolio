import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hey! 👋 I'm Harsha's AI assistant. Ask me about his projects, tech stack, or AI systems!",
        },
    ]);
    const [input, setInput] = useState('');

    const quickQuestions = [
        'What AI systems has Harsha built?',
        'What is his tech stack?',
        'Tell me about RAG pipelines',
        'What makes him startup-ready?',
    ];

    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (text) => {
        const msg = text || input;
        if (!msg.trim()) return;

        setMessages((prev) => [...prev, { role: 'user', content: msg }]);
        setInput('');
        setIsLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
            const response = await fetch(`${API_URL}/api/ai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: msg }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch AI response');
            }

            const data = await response.json();
            setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }]);
        } catch (error) {
            console.error('AI Error:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please make sure the backend is running and the GROQ API key is set!" },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: isOpen
                        ? '0 0 20px rgba(0,240,255,0.3)'
                        : [
                            '0 0 20px rgba(0,240,255,0.3)',
                            '0 0 40px rgba(168,85,247,0.4)',
                            '0 0 20px rgba(0,240,255,0.3)',
                        ],
                }}
                transition={{ boxShadow: { repeat: Infinity, duration: 3 } }}
            >
                {isOpen ? <FaTimes className="text-white text-lg" /> : <FaRobot className="text-white text-xl" />}
            </motion.button>

            {/* Label */}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed bottom-10 right-24 z-50 bg-[#0a0a2e] border border-[#00f0ff]/20 rounded-lg px-3 py-2 text-xs text-[#00f0ff] whitespace-nowrap"
                >
                    Ask me about my AI systems
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0a0a2e] border-r border-t border-[#00f0ff]/20 rotate-45" />
                </motion.div>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] glass-card overflow-hidden"
                        style={{
                            border: '1px solid rgba(0, 240, 255, 0.15)',
                            boxShadow: '0 0 40px rgba(0, 240, 255, 0.08)',
                        }}
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-[#00f0ff]/5 to-[#a855f7]/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
                                    <FaRobot className="text-white text-sm" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white">Harsha's AI Assistant</h4>
                                    <span className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[300px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 rounded-br-md whitespace-pre-wrap'
                                            : 'bg-white/5 text-[#e2e8f0] border border-white/5 rounded-bl-md prose prose-invert prose-sm max-w-none'
                                            }`}
                                    >
                                        {msg.role === 'user' ? (
                                            msg.content
                                        ) : (
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed bg-white/5 text-[#e2e8f0] border border-white/5 rounded-bl-md">
                                        <div className="flex space-x-1 items-center h-5">
                                            <div className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Questions */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-3 flex flex-wrap gap-2">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => handleSend(q)}
                                        className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#94a3b8] hover:text-[#00f0ff] hover:border-[#00f0ff]/30 transition-all"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t border-white/5">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask me anything..."
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white outline-none focus:border-[#00f0ff]/30 transition-colors"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#a855f7] flex items-center justify-center flex-shrink-0 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-shadow"
                                >
                                    <FaPaperPlane className="text-white text-sm" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
