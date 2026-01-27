import { ArrowRight, TwitterLogo, InstagramLogo, LinkedinLogo, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenWaitlist }: { onOpenWaitlist: () => void }) {
    return (
        <footer className="bg-background pt-32 pb-12 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

                {/* Final CTA - GPT Warmth */}
                <div className="pt-12 pb-36 text-center border-b border-white/10 relative">
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] pointer-events-none" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-display relative z-10">
                        Make a wish. <br /> Get it done.
                    </h2>
                    <button
                        onClick={onOpenWaitlist}
                        className="bg-primary text-black px-10 py-4 font-bold rounded-full hover:bg-white transition-colors relative z-10"
                    >
                        Get Started
                    </button>
                </div>

                {/* Massive CTA */}
                <div className="mb-24">
                    <h2 className="text-6xl md:text-9xl font-black text-white tracking-tight leading-tight mb-12 font-display">
                        Ready to get <br />
                        <span className="text-white/40 hover:text-primary transition-colors duration-500 cursor-default">help in minutes?</span>
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <button
                            onClick={onOpenWaitlist}
                            className="bg-white text-black h-16 px-10 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 group"
                        >
                            Try Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Bento Grid Links */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    {/* Brand Block */}
                    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 flex flex-col justify-between h-64 hover:border-white/20 transition-colors group">
                        <div className="w-10 h-10 flex items-center justify-center mb-4">
                            <img src="/logo.webp" alt="Logo" width="40" height="40" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg">Find My Genie</div>
                            <div className="text-white/40 text-sm">Let AI call-around for you.</div>
                        </div>
                    </div>

                    {/* Link Block 1 */}
                    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 flex flex-col justify-between h-64 hover:bg-white/5 transition-colors">
                        <div className="text-white/40 text-sm font-mono uppercase tracking-widest">Explore</div>
                        <ul className="space-y-3">
                            {[
                                { name: 'The Problem', href: '/#problem' },
                                { name: 'Live Demo', href: '/#demo' },
                                { name: 'How It Works', href: '/#how-it-works' }
                            ].map(item => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="text-white font-bold text-lg hover:text-primary cursor-pointer flex items-center justify-between group"
                                    >
                                        {item.name}
                                        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Link Block 2 */}
                    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 flex flex-col justify-between h-64 hover:bg-white/5 transition-colors">
                        <div className="text-white/40 text-sm font-mono uppercase tracking-widest">Company</div>
                        <ul className="space-y-3">
                            {[
                                { name: 'About', href: '/about' },
                                { name: 'Legal', href: '/legal' },
                                { name: 'Contact', href: 'mailto:info@findmygenie.com' }
                            ].map(item => (
                                <li key={item.name}>
                                    {item.href.startsWith('/') ? (
                                        <Link
                                            to={item.href}
                                            className="text-white font-bold text-lg hover:text-primary cursor-pointer flex items-center justify-between group"
                                        >
                                            {item.name}
                                            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="text-white font-bold text-lg hover:text-primary cursor-pointer flex items-center justify-between group"
                                        >
                                            {item.name} <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials Block */}
                    <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 flex flex-col justify-between h-64 hover:border-primary/50 transition-colors">
                        <div className="text-white/40 text-sm font-mono uppercase tracking-widest">Follow Us</div>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Follow us on Twitter" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors cursor-pointer">
                                <TwitterLogo size={24} />
                            </a>
                            <a href="https://www.instagram.com/findmygenie?igsh=YmV3cTA1MnE2cjB0" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors cursor-pointer">
                                <InstagramLogo size={24} />
                            </a>
                            <a href="https://www.linkedin.com/company/find-my-genie/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors cursor-pointer">
                                <LinkedinLogo size={24} />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-white/40 text-xs font-mono uppercase gap-4 md:gap-0">
                    <div className="text-center md:text-left">© 2026 Find My Genie Inc. All rights reserved.</div>
                    <div className="text-center md:text-right">Built with love and a little bit of magic.</div>
                </div>

            </div>
        </footer>
    );
}
