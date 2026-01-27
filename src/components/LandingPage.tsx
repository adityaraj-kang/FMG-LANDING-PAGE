import { useState, Suspense, lazy } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// Lazy load heavy or below-the-fold components
const ProblemGrid = lazy(() => import('@/components/ProblemGrid'));
const SolutionFlow = lazy(() => import('@/components/SolutionFlow'));
const Ecosystem = lazy(() => import('@/components/Ecosystem'));
const InteractiveDemo = lazy(() => import('@/components/InteractiveDemo'));
const Footer = lazy(() => import('@/components/Footer'));
const WaitlistForm = lazy(() => import('@/components/WaitlistForm'));
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function LandingPage() {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const [isVendorWaitlistOpen, setIsVendorWaitlistOpen] = useState(false);

    return (
        <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 overflow-x-hidden font-body">
            <title>Find My Genie - Let AI call-around for your needs</title>
            <meta name="description" content="Stop calling, start living. Find My Genie uses AI to call vendors, negotiate deals, and book appointments for you." />
            <meta property="og:title" content="Find My Genie" />
            <meta property="og:description" content="AI-powered personal assistant calling service." />
            <meta name="twitter:card" content="summary_large_image" />
            <Navbar
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
                onOpenVendorWaitlist={() => setIsVendorWaitlistOpen(true)}
            />
            <Hero
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
            />

            <Suspense fallback={<div className="h-96" />}>
                <ProblemGrid />
            </Suspense>

            <Suspense fallback={<div className="h-96 w-full flex items-center justify-center text-muted-foreground animate-pulse">Loading demo...</div>}>
                <ErrorBoundary name="Interactive Demo">
                    <InteractiveDemo />
                </ErrorBoundary>
                <Ecosystem />
            </Suspense>
            <Suspense fallback={<div className="h-96" />}>
                <SolutionFlow />
            </Suspense>

            <Suspense fallback={<div className="h-24" />}>
                <Footer onOpenWaitlist={() => setIsWaitlistOpen(true)} />
            </Suspense>

            <Suspense fallback={null}>
                <WaitlistForm
                    isOpen={isWaitlistOpen}
                    onClose={() => setIsWaitlistOpen(false)}
                    googleScriptUrl={import.meta.env.VITE_WAITLIST_SCRIPT_URL}
                />

                <WaitlistForm
                    isOpen={isVendorWaitlistOpen}
                    onClose={() => setIsVendorWaitlistOpen(false)}
                    googleScriptUrl={import.meta.env.VITE_VENDOR_SCRIPT_URL}
                    title="Join as a Vendor"
                    description="Connect with high-intent leads instantly. Sign up to get notified when we launch."
                    successMessage={{
                        title: "Welcome aboard!",
                        description: "We'll contact you for onboarding soon."
                    }}
                />
            </Suspense>
        </div>
    );
}
