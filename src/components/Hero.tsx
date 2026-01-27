import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Microphone, X } from '@phosphor-icons/react';
import { useConversation } from '@elevenlabs/react';
import { useState, useCallback, useEffect } from 'react';


// Fluid Orb Component - "Living Liquid Spirit"
const FluidOrb = ({ active }: { active: boolean }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Layer 1: Deep Core (Purple/Blue) - Slow, grounding motion */}
            <motion.div
                animate={active ? {
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    x: [0, 30, -20, 10, 0],
                    y: [0, -20, 30, -10, 0],
                    rotate: [0, 90, 180, 270, 360],
                } : {
                    scale: 0.8,
                    opacity: 0.3
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-48 h-48 bg-indigo-600/60 rounded-full blur-[60px] mix-blend-screen"
            />

            {/* Layer 2: Primary Energy (Orange/Red) - Faster, main character */}
            <motion.div
                animate={active ? {
                    scale: [1, 1.3, 0.8, 1.2, 1],
                    x: [0, -40, 30, -20, 0],
                    y: [0, 30, -40, 20, 0],
                    rotate: [0, -120, -240, -360],
                } : {
                    scale: 0.5,
                    opacity: 0
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-40 h-40 bg-orange-500/80 rounded-full blur-[50px] mix-blend-screen"
            />

            {/* Layer 3: Highlights (White/Cyan) - Fast, nervous energy, gives it "spirit" */}
            <motion.div
                animate={active ? {
                    scale: [0.8, 1.2, 0.8],
                    x: [0, 20, -20, 0],
                    y: [0, -20, 20, 0],
                    opacity: [0.4, 0.8, 0.4]
                } : {
                    scale: 0,
                    opacity: 0
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-32 h-32 bg-cyan-300/40 rounded-full blur-[40px] mix-blend-overlay"
            />

            {/* Layer 4: Reactive Glow Pulse */}
            <motion.div
                animate={active ? {
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.3, 0.1]
                } : {
                    opacity: 0
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-64 h-64 bg-white/10 rounded-full blur-[80px]"
            />
        </div>
    );
};



const prompts = [
    "Ask your Genie",
    "Find a plumber...",
    "Book a reservation...",
    "Negotiate a deal...",
    "Check availability..."
];

export default function Hero({ onOpenWaitlist }: { onOpenWaitlist: () => void }) {
    const [status, setStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
    const [error, setError] = useState<string | null>(null);

    const conversation = useConversation({
        onConnect: () => {
            setStatus('connected');
            setError(null);
        },
        onDisconnect: () => setStatus('idle'),
        onMessage: (_message) => { },
        onError: (error) => {
            console.error('Error:', error);
            setStatus('idle');
            // @ts-expect-error - Error type from SDK might not match explicitly but message exists
            setError(error?.message || 'Unknown conversation error');
        },
    });

    const startConversation = useCallback(async () => {
        try {
            setStatus('connecting');
            setError(null);

            // Request microphone permission explicitly to be safe, though SDK manages it
            await navigator.mediaDevices.getUserMedia({ audio: true });

            await conversation.startSession({
                agentId: import.meta.env.VITE_ELEVENLABS_AGENT_ID,
                connectionType: 'websocket'
            });
        } catch (error: unknown) {
            console.error('Failed to start conversation:', error);
            setStatus('idle');
            setError((error as Error)?.message || 'Failed to start conversation');
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        try {
            await conversation.endSession();
        } catch (error) {
            console.error("Failed to end session:", error);
        } finally {
            setStatus('idle');
            // Clear any errors when closing
            setError(null);
        }
    }, [conversation]);

    const [activePromptIndex, setActivePromptIndex] = useState(0);



    useEffect(() => {
        if (status !== 'idle') return;
        const interval = setInterval(() => {
            setActivePromptIndex((prev) => (prev + 1) % prompts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [status]);

    return (
        <section className="relative min-h-[100dvh] lg:h-screen lg:min-h-[800px] flex items-center bg-background overflow-hidden font-sans pt-36 pb-20 lg:py-0">
            {/* Aurora Ambient Background */}
            <div className="absolute inset-0 z-0 aurora-bg opacity-40"></div>



            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">

                {/* Left: Content */}
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >

                        <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-semibold text-white mb-8 tracking-tight leading-[1.1]">
                            Let AI call-around <br />
                            <span className="text-white/30">for your needs.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-lg leading-relaxed font-normal tracking-tight">
                            AI agent who calls 20+ places near you to find availability, quote and also negotiate with multiple vendors simultaneously to get you the best deal.
                        </p>
                        {/* GPT-Style Prompt Input */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
                            <button
                                onClick={onOpenWaitlist}
                                className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2 group"
                            >
                                Try Now
                                <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right: "Apple x Uber x GPT" Interface */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0">
                    <div className="relative w-full max-w-[320px] sm:max-w-md h-[400px] flex items-center justify-center">

                        {/* Static Ambient Halo - Always visible to create focus */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,77,0,0.25)_0%,transparent_70%)] blur-[100px] pointer-events-none mix-blend-screen" />

                        {/* Dynamic Island Container */}
                        <motion.div
                            layout
                            initial={{ width: 100, height: 100, borderRadius: 50 }}
                            animate={{
                                width: status === 'connected' ? 340 : 100,
                                height: status === 'connected' ? 500 : 100,
                                borderRadius: status === 'connected' ? 40 : 50
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative overflow-hidden z-20 group hover:border-white/20 transition-colors max-w-[90vw] isolate"
                            style={{ transform: 'translateZ(0)', WebkitMaskImage: '-webkit-radial-gradient(white, white)' }}
                        >
                            {/* Fluid Ambient Light - Inside Container */}
                            <div className="absolute inset-0 pointer-events-none">
                                <FluidOrb active={status === 'connected'} />
                            </div>

                            {/* Interaction Layer */}
                            <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full h-full">

                                {/* Avatar / Orb Core */}
                                <AnimatePresence mode="wait">
                                    {status === 'connected' ? (
                                        <motion.div
                                            key="visualizer"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center gap-6"
                                        >
                                            {/* Clean View - Just the Spirit Orb */}
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="trigger"
                                            onClick={startConversation}
                                            initial={{ scale: 1 }}
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                opacity: [0.9, 1, 0.9]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            whileHover={{
                                                scale: 1.15,
                                                transition: { duration: 0.2 }
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full h-full absolute inset-0 flex items-center justify-center cursor-pointer z-50 group/mic"
                                        >
                                            {/* Glow Effect on Hover */}
                                            <div className="absolute inset-0 bg-primary/0 group-hover/mic:bg-primary/20 blur-xl transition-colors duration-500 rounded-full" />

                                            {status === 'connecting' ? (
                                                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Microphone size={32} weight="fill" className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] relative z-10" />
                                            )}
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                            </div>

                            {/* Bottom Controls (Only visible when connected) */}
                            {status === 'connected' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute bottom-8 w-full px-8 flex justify-center items-center z-50"
                                >
                                    <button
                                        onClick={stopConversation}
                                        className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
                                    >
                                        <X size={20} className="text-white" />
                                    </button>
                                </motion.div>
                            )}

                        </motion.div>

                        {/* Text Below Microphone (Outside Container) */}
                        <AnimatePresence mode="wait">
                            {status === 'idle' && (
                                <motion.div
                                    key={activePromptIndex}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-[calc(50%+65px)] left-1/2 -translate-x-1/2 pointer-events-none w-max text-center"
                                >
                                    <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest whitespace-nowrap">
                                        {prompts[activePromptIndex]}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Outer Glow (Under Container) caused by the "Orb" */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 ${status === 'connected' ? 'opacity-60' : 'opacity-0'}`} />

                        {error && (
                            <div className="absolute -bottom-24 w-full text-center px-4">
                                <p className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg text-sm inline-block">
                                    {error}
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
