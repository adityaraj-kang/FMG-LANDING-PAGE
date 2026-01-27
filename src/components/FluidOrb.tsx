import { motion } from 'framer-motion';

interface FluidOrbProps {
    active: boolean;
}

const FluidOrb = ({ active }: FluidOrbProps) => {
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
                className="absolute w-[220px] h-[220px] rounded-full blur-[60px] mix-blend-screen will-change-[transform,opacity]"
                style={{ background: 'radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, transparent 70%)', transform: 'translateZ(0)' }}
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
                className="absolute w-[187px] h-[187px] rounded-full blur-[50px] mix-blend-screen will-change-[transform,opacity]"
                style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, transparent 70%)', transform: 'translateZ(0)' }}
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
                className="absolute w-[148px] h-[148px] rounded-full blur-[40px] mix-blend-overlay"
                style={{ background: 'radial-gradient(circle, rgba(103, 232, 249, 0.4) 0%, transparent 70%)' }}
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
                className="absolute w-[297px] h-[297px] rounded-full blur-[80px]"
                style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}
            />
        </div>
    );
};

export default FluidOrb;
