import { Microphone, Circuitry, CheckCircle } from '@phosphor-icons/react';

export default function SolutionFlow() {
    return (
        <section id="how-it-works" className="py-24 bg-zinc-950 border-y border-white/5">
            <div className="container mx-auto px-4 sm:px-6">

                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-12">How it Works</div>

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Step 1 */}
                    <div className="bg-black border border-white/10 rounded-3xl p-10 relative overflow-hidden group" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                        <span className="text-8xl font-black text-white/5 absolute -right-4 -bottom-8 font-display">01</span>
                        <div className="w-14 h-14 bg-white/10 flex items-center justify-center rounded-2xl mb-8 text-white">
                            <Microphone size={28} weight="fill" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">You Ask</h3>
                        <p className="text-white/50 text-sm relative z-10">Tell us what you need in plain English.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-black border border-white/10 rounded-3xl p-10 relative overflow-hidden group" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                        <span className="text-8xl font-black text-white/5 absolute -right-4 -bottom-8 font-display">02</span>
                        <div className="w-14 h-14 bg-white/10 flex items-center justify-center rounded-2xl mb-8 text-white">
                            <Circuitry size={28} weight="fill" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">We Match</h3>
                        <p className="text-white/50 text-sm relative z-10">Our AI instantly finds the perfect local expert.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-black border border-white/10 rounded-3xl p-10 relative overflow-hidden group" style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                        <span className="text-8xl font-black text-white/5 absolute -right-4 -bottom-8 font-display">03</span>
                        <div className="w-14 h-14 bg-primary flex items-center justify-center rounded-2xl mb-8 text-black">
                            <CheckCircle size={28} weight="fill" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Pro Arrives</h3>
                        <p className="text-white/50 text-sm relative z-10">Verified help is on the way in minutes.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
