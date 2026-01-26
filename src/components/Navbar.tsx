import { useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onOpenWaitlist }: { onOpenWaitlist: () => void }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { name: 'The Problem', href: '/#problem' },
        { name: 'Live Demo', href: '/#demo' },
        { name: 'How it Works', href: '/#how-it-works' },
    ];

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`pointer-events-auto transition-all duration-300 ${isMobileMenuOpen
                    ? 'w-[95vw] md:w-[600px] h-auto p-6 rounded-[2rem] bg-zinc-950/90 backdrop-blur-2xl border border-white/10'
                    : 'h-16 px-6 bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl flex items-center justify-between w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-7xl'
                    }`}
            >
                {/* Logo */}
                <div
                    className={`flex items-center gap-2 font-bold text-white px-4 cursor-pointer hover:opacity-80 transition-opacity ${isMobileMenuOpen ? 'mb-8' : ''}`}
                    onClick={() => {
                        navigate('/');
                        window.scrollTo(0, 0);
                        setIsMobileMenuOpen(false);
                    }}
                >
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <span>Find My Genie</span>
                </div>

                {/* Desktop Nav */}
                {!isMobileMenuOpen && (
                    <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-5 py-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}

                {/* Desktop CTA */}
                {!isMobileMenuOpen && (
                    <div className="hidden md:block pr-1">
                        <button
                            onClick={onOpenWaitlist}
                            className="px-5 py-2 bg-primary text-black text-sm font-bold rounded-full hover:bg-white transition-colors mr-2 text-cursor-pointer"
                        >
                            Try Now
                        </button>
                        <button
                            onClick={() => navigate('/vendor')}
                            className="px-5 py-2 bg-transparent border border-white/20 text-white text-sm font-bold rounded-full hover:bg-white/10 transition-colors"
                        >
                            For Vendors
                        </button>

                    </div>
                )}


                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
                </button>

                {/* Mobile Menu Content */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-2"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-medium text-white py-4 border-b border-white/10 hover:text-primary pl-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    onOpenWaitlist();
                                }}
                                className="mt-4 w-full py-4 bg-primary text-black font-bold rounded-xl text-lg"
                            >
                                Request Access
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </nav>
    );
}
