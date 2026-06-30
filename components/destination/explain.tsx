'use client'
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

        gsap.set(panel1Ref.current, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transformPerspective: 1000,
            backfaceVisibility: 'hidden'
        })
        gsap.set(panel2Ref.current, {
            y: 60, // Sedikit dikurangi dari 80 agar transisi mobile tidak terlalu jauh melompat
            opacity: 0,
            filter: 'blur(16px)',
            transformPerspective: 1000,
            backfaceVisibility: 'hidden'
        })
        gsap.set(panel3Ref.current, {
            y: 120,
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
                scrub: 1, // Dipercepat sedikit dari 1.2 agar lebih responsif di mobile
            }
        })

        // --- Transition 1 ---
        tl.to(panel1Ref.current, {
            y: -60,
            opacity: 0,
            filter: 'blur(16px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 0.2)

        tl.to(panel2Ref.current, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 0.3)

        // --- Transition 2 ---
        tl.to(panel2Ref.current, {
            y: -60,
            opacity: 0,
            filter: 'blur(16px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 1.2)

        tl.to(panel3Ref.current, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'sine.inOut'
        }, 1.3)

        // --- Hold Panel 3 ---
        tl.to(panel3Ref.current, {
            opacity: 1,
            duration: 0.7
        }, 1.8)

        // Pastikan ScrollTrigger menghitung ulang setelah inisialisasi state selesai
        ScrollTrigger.refresh();

    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] w-full"
        >
            {/* FIX: Mengubah h-dvh menjadi h-screen agar tinggi tetap konsisten saat URL bar mobile bergeser */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-white text-gray-800">

                {/* Panel 1 — Description */}
                {/* FIX: Ditambahkan justify-center agar teks panjang tidak menjorok paksa ke atas */}
                <div
                    ref={panel1Ref}
                    className="absolute inset-0 flex flex-col justify-center gap-4 px-6 sm:px-12 md:px-20 py-10"
                >
                    <h2 className="uppercase text-neutral-400 text-sm md:text-base font-semibold tracking-wider">Tentang Destinasi</h2>
                    <p className="text-3xl md:text-5xl font-bold leading-tight max-w-6xl">
                        {description}
                    </p>
                </div>

                {/* Panel 2 — Additional Description */}
                <div
                    ref={panel2Ref}
                    className="absolute inset-0 flex flex-col justify-center gap-4 px-6 sm:px-12 md:px-20 py-10 opacity-0"
                    style={{ filter: 'blur(16px)' }}
                >
                    {/* <h2 className="uppercase text-neutral-400 text-sm md:text-base font-semibold tracking-wider">Informasi Tambahan</h2> */}
                    <p className="text-3xl md:text-5xl font-bold leading-tight max-w-6xl">
                        {additionalDesc}
                    </p>
                </div>

                {/* Panel 3 — Notes */}
                <div
                    ref={panel3Ref}
                    className="absolute inset-0 flex flex-col justify-center gap-4 px-6 sm:px-12 md:px-20 py-10 opacity-0"
                    style={{ filter: 'blur(16px)' }}
                >
                    {/* <h2 className="uppercase text-neutral-400 text-sm md:text-base font-semibold tracking-wider">Akses & Tips</h2> */}
                    <p className="text-3xl md:text-5xl font-bold leading-tight max-w-6xl">
                        {notes}
                    </p>
                </div>

            </div>
        </section>
    )
}

export { Explain }