import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Legal = () => {
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
                        Legal Information
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-white/80 space-y-16 leading-relaxed">
                        {/* Privacy Policy Section */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">
                                Privacy Policy
                            </h2>
                            <div className="space-y-4 font-light text-white/90">
                                <p>
                                    Last updated: January 2026
                                </p>
                                <p>
                                    At Find My Genie, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
                                </p>

                                <h3 className="text-xl font-bold text-white mt-8">1. Information We Collect</h3>
                                <p>
                                    We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and other contact details.
                                </p>

                                <h3 className="text-xl font-bold text-white mt-6">2. How We Use Your Information</h3>
                                <p>
                                    We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users and services.
                                </p>

                                <h3 className="text-xl font-bold text-white mt-6">3. Data Security</h3>
                                <p>
                                    We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
                                </p>
                            </div>
                        </section>

                        <div className="h-px bg-white/10 my-12" />

                        {/* Terms of Service Section */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">
                                Terms of Service
                            </h2>
                            <div className="space-y-4 font-light text-white/90">
                                <p>
                                    By accessing or using Find My Genie, you agree to be bound by these Terms of Service.
                                </p>

                                <h3 className="text-xl font-bold text-white mt-8">1. Acceptance of Terms</h3>
                                <p>
                                    By accessing or using our services, you agree to be legally bound by these terms and all terms incorporated by reference.
                                </p>

                                <h3 className="text-xl font-bold text-white mt-6">2. Use License</h3>
                                <p>
                                    Permission is granted to temporarily access the materials (information or software) on Find My Genie's website for personal, non-commercial transitory viewing only.
                                </p>

                                <h3 className="text-xl font-bold text-white mt-6">3. Disclaimer</h3>
                                <p>
                                    The materials on Find My Genie's website are provided on an 'as is' basis. Find My Genie makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>

                <div className="mt-24 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} Find My Genie Inc. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Legal;
