import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="bg-background min-h-screen p-8 md:p-16 relative overflow-hidden font-body text-foreground">
            {/* Background elements to match the unified style */}
            <div className="absolute inset-0 z-0 aurora-bg opacity-30 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center text-white/60 hover:text-white mb-12 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-12">
                        About Find My Genie
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-white/80 space-y-8 leading-relaxed">
                        <p className="text-xl md:text-2xl font-light text-white/90">
                            Find My Genie is your personal AI agent that does the heavy lifting. We find, vet, and negotiate with local vendors so you don't have to.
                        </p>

                        <div className="h-px bg-white/10 my-12" />

                        <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                        <p>
                            We believe that finding reliable local services shouldn't be a chore. Phone tag, endless research, and price uncertainty are problems of the past. Our mission is to empower you with an AI agent that acts as your personal advocate, ensuring you get the best service at the best price, effortlessly.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12">How it started</h2>
                        <p>
                            Born from the frustration of spending hours calling plumbers, electricians, and contractors, we realized there had to be a better way. We built Find My Genie to bring the convenience of modern technology to the local service industry, bridging the gap between busy homeowners and quality service providers.
                        </p>
                    </div>
                </motion.div>

                <div className="mt-24 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} Find My Genie Inc. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
