import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneRight, Microphone } from '@phosphor-icons/react';

export default function InteractiveDemo() {
    const [inputValue, setInputValue] = useState('');

    const [messages, setMessages] = useState<Array<{ id: number, role: 'user' | 'assistant', text: string }>>([]);

    useEffect(() => {
        let isMounted = true;

        const runAnimation = async () => {
            while (isMounted) {
                // Reset State
                setInputValue('');
                setMessages([]);


                // Phase 1: Show Map (Waiting for user intent)
                await new Promise(r => setTimeout(r, 1500));
                if (!isMounted) break;

                // --- Turn 1: User Request ---
                const query1 = "My basement in Austin is flooded! I need a plumber fast.";
                for (let i = 0; i <= query1.length; i++) {
                    if (!isMounted) break;
                    setInputValue(query1.slice(0, i));
                    await new Promise(r => setTimeout(r, Math.random() * 40 + 20));
                }
                if (!isMounted) break;
                await new Promise(r => setTimeout(r, 400));

                // Submit 1

                const msg1 = { id: 1, role: 'user' as const, text: query1 };
                setMessages(prev => [...prev, msg1]);
                setInputValue('');
                await new Promise(r => setTimeout(r, 1200)); // AI thinking

                if (!isMounted) break;

                // --- Turn 2: AI Verification ---
                const response1 = "Okay, so you need a plumber at your location urgently?";
                // Stream AI Response
                let currentText = "";
                const msg2Id = 2;
                setMessages(prev => [...prev, { id: msg2Id, role: 'assistant', text: '' }]);

                for (let i = 0; i <= response1.length; i++) {
                    if (!isMounted) break;
                    currentText = response1.slice(0, i);
                    setMessages(prev => prev.map(m => m.id === msg2Id ? { ...m, text: currentText } : m));
                    await new Promise(r => setTimeout(r, 15));
                }
                if (!isMounted) break;
                await new Promise(r => setTimeout(r, 1500)); // User reading time

                // --- Turn 3: User Confirmation ---
                const query2 = "Yes, it's rising fast!";
                for (let i = 0; i <= query2.length; i++) {
                    if (!isMounted) break;
                    setInputValue(query2.slice(0, i));
                    await new Promise(r => setTimeout(r, Math.random() * 40 + 20));
                }
                if (!isMounted) break;
                await new Promise(r => setTimeout(r, 400));

                // Submit 2

                const msg3 = { id: 3, role: 'user' as const, text: query2 };
                setMessages(prev => [...prev, msg3]);
                setInputValue('');

                // End of loop (No step 4)
                await new Promise(r => setTimeout(r, 5000));
            }
        };

        runAnimation();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section id="demo" className="py-32 bg-background border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Copy */}
                <div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-display tracking-tight leading-none">
                        Talk to the <br />
                        <span className="text-white/30">Network.</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-md leading-relaxed">
                        Experience instant natural-language dispatch. Just type your request like you’re texting a friend.
                    </p>
                </div>

                {/* Right: Demo UI */}
                <div className="relative">
                    {/* Real iPhone Mockup Container */}
                    <div className="relative mx-auto max-w-[360px]">

                        {/* Frame (Top Layer) */}
                        <div className="relative z-30 pointer-events-none">
                            <img src="/iphone_mockup.png" alt="iPhone Frame" className="w-full h-auto drop-shadow-2xl" />
                        </div>

                        {/* Screen Content (Behind Frame) */}
                        <div className="absolute top-[2.3%] left-[3.5%] right-[3.5%] bottom-[2.3%] bg-zinc-950 rounded-[45px] overflow-hidden z-10 flex flex-col" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>

                            {/* Map Background Layer - Always Visible */}
                            <div className="absolute inset-0 z-0 bg-zinc-900">
                                <img
                                    src="/map_layer.png"
                                    alt="Map Layer"
                                    className="w-full h-full object-cover opacity-60 grayscale-[0.2] scale-[1.75]"
                                />

                                {/* Simulated Network Activity (Overlaying the map) */}
                                <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)] z-10"></div>
                                <div className="absolute bottom-[40%] right-[15%] w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-700 shadow-[0_0_8px_rgba(16,185,129,1)] z-10"></div>
                                <div className="absolute top-[60%] left-[40%] w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-300 shadow-[0_0_8px_rgba(249,115,22,1)] z-10"></div>
                            </div>

                            {/* Dark Overlay when sheet is active */}
                            <div
                                className="absolute inset-0 bg-black/40 z-10 pointer-events-none"
                            />

                            {/* Status Bar Fake (Aligned to notch) */}
                            <div className="h-14 flex justify-between items-center px-8 pt-3 z-40 relative mix-blend-screen pointer-events-none">
                                <div className="text-[14px] font-semibold text-white pl-2">9:41</div>
                                <div className="flex gap-2 items-center pr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" className="hidden" />
                                        <path d="M12.53 3.65a.75.75 0 00-1.06 0L3.106 12.014a.75.75 0 00.53 1.28h16.728a.75.75 0 00.53-1.28L12.53 3.65z" className="hidden" />
                                        {/* CSS shapes for signal bars to ensure they look right without icons */}
                                        <path d="M1 12.5A1.5 1.5 0 0 1 2.5 11h1A1.5 1.5 0 0 1 5 12.5v4A1.5 1.5 0 0 1 3.5 18h-1A1.5 1.5 0 0 1 1 16.5v-4zm6-3A1.5 1.5 0 0 1 8.5 8h1A1.5 1.5 0 0 1 11 9.5v7A1.5 1.5 0 0 1 9.5 18h-1A1.5 1.5 0 0 1 7 16.5v-7zm6-3A1.5 1.5 0 0 1 14.5 5h1A1.5 1.5 0 0 1 17 6.5v10A1.5 1.5 0 0 1 15.5 18h-1A1.5 1.5 0 0 1 13 16.5v-10zm6-3A1.5 1.5 0 0 1 20.5 2h1a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 19 16.5v-13z" />
                                    </svg>
                                    <div className="w-5 h-3 bg-white/20 rounded-[3px] relative border border-white/30"><div className="absolute inset-0.5 bg-white rounded-[1px] w-[70%]"></div></div>
                                </div>
                            </div>

                            {/* Sliding Chat Sheet */}
                            <motion.div
                                initial={{ y: 0 }}
                                className="absolute bottom-0 left-0 right-0 h-[85%] bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 rounded-t-[30px] z-20 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                            >
                                {/* Sheet Handle */}
                                <div className="w-full flex justify-center pt-3 pb-1">
                                    <div className="w-10 h-1 bg-white/20 rounded-full" />
                                </div>

                                {/* Chat Interface Scroll Area */}
                                <div className="flex-1 flex flex-col justify-end px-5 pb-8 relative">
                                    <div className="space-y-4 mb-4">


                                        {/* Dynamic Conversation History */}
                                        <AnimatePresence mode='popLayout'>
                                            {messages.map((msg) => (
                                                <motion.div
                                                    key={msg.id}
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    className={`flex gap-3 items-end ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                                >


                                                    <div className={`
                                                        rounded-2xl p-3.5 text-[14px] leading-relaxed max-w-[85%] border border-white/5 shadow-sm
                                                        ${msg.role === 'user'
                                                            ? 'bg-primary text-black rounded-br-sm font-medium shadow-orange-500/10'
                                                            : 'bg-zinc-800/80 text-white/90 rounded-bl-sm backdrop-blur-md'}
                                                    `}>
                                                        {msg.text}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    {/* Custom Input Area */}
                                    <div className="bg-zinc-800/50 border border-white/5 rounded-full p-1.5 flex items-center gap-2 backdrop-blur-md mb-2 shadow-lg">

                                        <input
                                            type="text"
                                            value={inputValue}
                                            readOnly
                                            placeholder="Ask Genie"
                                            className="flex-1 bg-transparent border-none py-2 px-4 text-white focus:outline-none placeholder:text-white/30 text-[14px] font-medium"
                                        />
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
                                            <Microphone size={16} weight="fill" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-black transition-all duration-300">
                                            <PaperPlaneRight size={14} weight="fill" />
                                        </div>
                                    </div>

                                    {/* Home Indicator - Inside Sheet if preferred, or outside */}
                                    <div className="h-1 w-full flex justify-center items-center mt-2">
                                        <div className="w-32 h-1 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
