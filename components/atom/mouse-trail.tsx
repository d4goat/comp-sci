"use client";

import { useRef } from "react";
import { useMouseTrail, TrailConfig } from "@/hooks/useMouseTrail";

interface MouseTrailProps {
    /** Optional className for the canvas wrapper */
    className?: string;
    /** Trail configuration overrides */
    config?: TrailConfig;
}

/**
 * MouseTrail — a reusable canvas-based mouse trail component.
 *
 * Renders as a fixed, full-screen, pointer-events-none canvas overlay.
 * Uses mix-blend-difference by default for a stylish inversion effect
 * that works on both light and dark backgrounds.
 *
 * Usage:
 *   <MouseTrail />
 *   <MouseTrail config={{ color: [200, 100, 255], particleRadius: 16 }} />
 */
export default function MouseTrail({ className, config }: MouseTrailProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useMouseTrail(canvasRef, config);

    return (
        <canvas
            ref={canvasRef}
            className={
                className ??
                "fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-difference"
            }
        />
    );
}