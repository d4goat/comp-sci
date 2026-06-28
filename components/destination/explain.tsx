'use client'
import { listItem } from "@/data";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Explain = ({ description, additionalDesc, notes }: { description: string, additionalDesc: string, notes: string }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const panel1Ref = useRef<HTMLDivElement>(null)
    const panel2Ref = useRef<HTMLDivElement>(null)
    const panel3Ref = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.set(containerRef.current, { opacity: 0, filter: 'blur(10px)' })

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(containerRef.current, {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'power2.out'
                })
            }
        })

        // Pre-set initial states to ensure hardware-accelerated properties
        gsap.set(panel1Ref.current, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transformPerspective: 1000,
            backfaceVisibility: 'hidden'
        })
        gsap.set(panel2Ref.current, {
            y: 80,
            opacity: 0,
            filter: 'blur(16px)',
            transformPerspective: 1000,
            backfaceVisibility: 'hidden'
        })
        gsap.set(panel3Ref.current, {
            y: 160,
            opacity: 0,
            filter: 'blur(16px)',
            transformPerspective: 1000,
            backfaceVisibility: 'hidden'
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2, // Smooth interpolation / inertia
            }
        })

        // SEQUENCE FOR 3 PANELS:
        // Total timeline duration is 2.5.
        // 0.0 - 0.2: Hold Panel 1 (0% - 8% scroll)
        // 0.2 - 0.8: Transition 1 (Panel 1 Out / Panel 2 In) (8% - 32% scroll)
        // 0.8 - 1.2: Hold Panel 2 (32% - 48% scroll)
        // 1.2 - 1.8: Transition 2 (Panel 2 Out / Panel 3 In) (48% - 72% scroll)
        // 1.8 - 2.5: Hold Panel 3 (72% - 100% scroll)

        // --- Transition 1 ---
        // Panel 1 Out: Fades, blurs, and shifts up
        tl.to(panel1Ref.current, {
            y: -80,
            opacity: 0,
            filter: 'blur(16px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 0.2)

        // Panel 2 In: Fades, deblurs, and shifts up to center
        tl.to(panel2Ref.current, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 0.3)

        // --- Transition 2 ---
        // Panel 2 Out: Fades, blurs, and shifts up
        tl.to(panel2Ref.current, {
            y: -80,
            opacity: 0,
            filter: 'blur(16px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 1.2)

        // Panel 3 In: Fades, deblurs, and shifts up to center
        tl.to(panel3Ref.current, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 1.3)

        // --- Hold Panel 3 ---
        // Keeps Panel 3 active and readable so the user has to scroll significantly before the next section appears
        tl.to(panel3Ref.current, {
            opacity: 1,
            duration: 0.7
        }, 1.8)

    }, { scope: containerRef })

    return (
        /* Increased container height to h-[350vh] to provide a longer, comfortable scroll track for 3 panels */
        <section
            ref={containerRef}
            className="relative h-[350vh] w-full"
        >
            {/* The sticky viewport container stays fixed on screen during the scroll track */}
            <div className="sticky top-0 h-dvh w-full overflow-hidden bg-white text-gray-800">

                {/* Panel 1 — Description */}
                <div
                    ref={panel1Ref}
                    className="absolute inset-0 flex flex-col gap-4 px-8 md:px-20 py-28"
                >
                    <h2 className="uppercase text-neutral-500 font-semibold">Tentang Destinasi</h2>
                    <p className="text-3xl md:text-5xl font-bold leading-tight text-text max-w-6xl text-justify">
                        {description}
                    </p>
                </div>

                {/* Panel 2 — Additional Description */}
                <div
                    ref={panel2Ref}
                    className="absolute inset-0 flex flex-col gap-4 px-8 md:px-20 py-28 opacity-0"
                    style={{ filter: 'blur(16px)' }}
                >
                    {/* <h2 className="uppercase text-neutral-500 font-semibold">Informasi Tambahan</h2> */}
                    <p className="text-3xl md:text-5xl font-bold leading-tight text-text max-w-6xl text-justify">
                        {additionalDesc}
                    </p>
                </div>

                {/* Panel 3 — Notes */}
                <div
                    ref={panel3Ref}
                    className="absolute inset-0 flex flex-col gap-4 px-8 md:px-20 py-28 opacity-0"
                    style={{ filter: 'blur(16px)' }}
                >
                    {/* <h2 className="uppercase text-neutral-500 font-semibold">Catatan</h2> */}
                    <p className="text-3xl md:text-5xl font-bold leading-tight text-text max-w-6xl text-justify">
                        {notes}
                    </p>
                </div>

            </div>
        </section>
    )
}

export { Explain }