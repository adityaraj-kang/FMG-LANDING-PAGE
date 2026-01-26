import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProblemGrid from './ProblemGrid';
import SolutionFlow from './SolutionFlow';
import Ecosystem from './Ecosystem';
import InteractiveDemo from './InteractiveDemo';
import Footer from './Footer';
import WaitlistForm from './WaitlistForm';

export default function LandingPage() {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 overflow-x-hidden font-body">
            <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
            <Hero
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
            />

            <ProblemGrid />
            <InteractiveDemo />
            <Ecosystem />
            <SolutionFlow />

            <Footer onOpenWaitlist={() => setIsWaitlistOpen(true)} />

            <WaitlistForm
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
                googleScriptUrl={import.meta.env.VITE_WAITLIST_SCRIPT_URL}
            />
        </div>
    );
}
