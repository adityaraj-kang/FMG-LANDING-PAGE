import { Warning, SpeakerSlash, MagnifyingGlass, CurrencyDollar } from '@phosphor-icons/react';

export default function ProblemGrid() {
    return (
        <section id="problem" className="py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                <div className="grid lg:grid-cols-2 gap-12 mb-20 items-end">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tight leading-none font-display">
                        Stop searching. <br /> Start fixing.
                    </h2>
                    <p className="text-white/60 text-lg max-w-md pb-2">
                        The old way of finding help is broken. You call. You wait. You gamble on quality. We removed the friction completely.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: SpeakerSlash,
                            title: "Too Many Calls",
                            desc: "Calling 10 different numbers just to get one answer."
                        },
                        {
                            icon: MagnifyingGlass,
                            title: "Long Wait Times",
                            desc: "Waiting days for an estimate that might change."
                        },
                        {
                            icon: Warning,
                            title: "Who to Trust?",
                            desc: "Gambling on unlicensed or unverified strangers."
                        },
                        {
                            icon: CurrencyDollar,
                            title: "Hidden Costs",
                            desc: "Surprise fees and last-minute price hikes."
                        }
                    ].map((item, i) => (
                        <div key={i} className="group bg-zinc-950 border border-white/10 p-6 md:p-10 rounded-3xl hover:bg-white/5 transition-all duration-300 hover:border-white/20 hover:-translate-y-1 shadow-xl">
                            <div className="mb-8 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                                <item.icon size={24} weight="fill" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed font-body">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
