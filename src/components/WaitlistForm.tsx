import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Spinner, CheckCircle, WarningCircle } from '@phosphor-icons/react';

interface WaitlistFormProps {
    isOpen: boolean;
    onClose: () => void;
    googleScriptUrl?: string; // Optional for now, will be required
}

export default function WaitlistForm({ isOpen, onClose, googleScriptUrl }: WaitlistFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!googleScriptUrl) {
            setErrorMessage("Configuration Error: Backend URL missing.");
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            await fetch(googleScriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Critical for Google Apps Script Web App
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    source: 'Web Form'
                })
            });

            // Since 'no-cors' doesn't return data, we assume success if no network error thrown
            setStatus('success');

            // Auto close after 2 seconds
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', email: '', phone: '' });
            }, 3000);

        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-sans">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Glossy Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative z-10">
                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
                                        <CheckCircle size={32} weight="fill" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white">You're on the list!</h3>
                                    <p className="text-white/60">We'll be in touch shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-semibold text-white mb-2">Join the Waitlist</h3>
                                        <p className="text-white/60 text-sm">
                                            Our agents are currently busy. Leave your details and we'll have a human or AI get back to you ASAP.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                type="email"
                                                required
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                            />
                                        </div>

                                        {errorMessage && (
                                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                                                <WarningCircle size={16} weight="fill" />
                                                {errorMessage}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full bg-primary text-black font-bold text-lg rounded-xl py-4 mt-2 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === 'submitting' ? (
                                                <>
                                                    <Spinner className="animate-spin" size={20} />
                                                    Adding...
                                                </>
                                            ) : (
                                                "Join Waitlist"
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
