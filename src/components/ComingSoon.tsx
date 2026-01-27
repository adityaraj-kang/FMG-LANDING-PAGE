import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div className="bg-background min-h-screen p-8 md:p-16 relative overflow-hidden font-body text-foreground flex flex-col items-center justify-center">
            {/* Background elements to match the unified style */}
            <div className="absolute inset-0 z-0 aurora-bg opacity-30 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center max-w-2xl px-4"
            >
                <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-8 tracking-tight">
                    For Vendors
                </h1>
                <p className="text-xl md:text-2xl font-light text-white/80 mb-12 leading-relaxed">
                    We are building a dedicated portal for our partners. <br />
                    Join the network that connects you with high-intent customers automatically.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:scale-105 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>
            </motion.div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-sm">
                <p>© {new Date().getFullYear()} Find My Genie Inc. All rights reserved.</p>
            </div>
        </div>
    );
}
