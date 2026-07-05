'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/molecul/magnetic';
import { useOffcanvasToggle } from '@/hooks/useOffCanvasToggle';
import { cn } from '@/lib/utils';

export function OffcanvasToggle({ isOpen, handleOpen }: { isOpen: boolean, handleOpen: (isOpen: boolean) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useOffcanvasToggle({
        element: containerRef,
        callback: (latest) => latest <= 1 && handleOpen(false),
    });

    return (
        <motion.div
            ref={containerRef}
            className="fixed top-0 right-0 m-6 z-50"
            initial={false}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ scale: isOpen ? 1 : scrollYProgress }}
        >
            <MagneticButton
                size="default"
                variant="primary"
                className="before:bg-neutral-500 after:bg-neutral-500 bg-primary"
                onClick={() => handleOpen(!isOpen)}
            >
                <span
                    className={cn(
                        "relative flex w-8 h-4", // base styles
                        "before:absolute before:top-0 before:w-full before:h-[2px] before:bg-background before:transition-transform before:duration-300 before:ease-in-expo",
                        "after:absolute after:bottom-0 after:w-full after:h-[2px] after:bg-background after:transition-transform after:duration-300 after:ease-in-expo",
                        isOpen && "before:-rotate-45 before:top-[50%] after:rotate-45 after:bottom-[50%]"
                    )}
                />
                <span className="sr-only focus:not-sr-only">Offcanvas Toggle</span>
            </MagneticButton>
        </motion.div>
    );
}