import { motion } from 'framer-motion';
import { Microphone, Crosshair } from '@phosphor-icons/react';

export default function Ecosystem() {
    return (
        <section id="ecosystem" className="py-32 bg-background border-t border-white/5 relative">
            <div className="container mx-auto px-6">

                <div className="text-center mb-24 relative z-10">
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-8 font-display tracking-tight leading-none px-4">
                        Made for humans. <br />
                        <span className="text-white/30">Built on trust.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-primary font-mono text-xs tracking-widest uppercase text-center">
                        <Crosshair size={16} weight="bold" className="hidden sm:block" />
                        <Crosshair size={24} weight="bold" className="sm:hidden mb-2" />
                        <span>Verified Professionals <span className="hidden sm:inline">•</span> <span className="sm:inline block mt-1 sm:mt-0">Instant Connection</span></span>
                    </div>
                </div>

                <div className="w-full bg-white/10 border border-white/10 overflow-hidden rounded-3xl">

                    {/* User Side - The Request */}
                    <div className="bg-black p-6 md:p-16 flex flex-col justify-between min-h-[500px] sm:h-[600px] relative group overflow-hidden">
                        {/* Visuals: Radar Grid */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,255,255,0.03)_0deg,transparent_60deg)] animate-[spin_8s_linear_infinite] opacity-50"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8">
                                <Microphone size={28} weight="fill" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-2 font-display tracking-tight">Just Ask.</h3>
                            <p className="text-white/40 text-lg font-mono">Say what you need — we’ll handle the rest.</p>
                        </div>

                        <div className="relative z-10 mt-12 bg-zinc-950 border border-white/10 rounded-2xl p-6 shadow-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">U</div>
                                <div className="h-2 w-24 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="text-xl sm:text-2xl font-medium text-white leading-tight">
                                "I need a <span className="text-primary">plumber</span> for a burst pipe. <span className="text-white/50">Urgent.</span>"
                            </div>
                            <div className="mt-6 flex gap-1 h-6 items-end">
                                {[4, 8, 3, 7, 5, 9, 4, 2, 6, 3].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [h * 2, h * 4, h * 2] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1 bg-primary rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
