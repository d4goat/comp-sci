'use client'

import Image from "next/image"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { CustomEase } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { imageList } from "@/data"
import { useState, useEffect } from "react"

declare global {
    interface Window {
        __preloader_shown?: boolean;
    }
}

const Preloader = () => {
    // Mengecek apakah preloader harus ditampilkan.
    // Jika window.__preloader_shown bernilai true, preloader dilewati langsung.
    const [shouldShow, setShouldShow] = useState(() => {
        if (typeof window === 'undefined') return true
        return !window.__preloader_shown
    })

    useEffect(() => {
        // Tandai preloader sudah pernah ditampilkan setelah komponen ini dipasang
        if (typeof window !== 'undefined') {
            window.__preloader_shown = true
        }
    }, [])

    useGSAP(() => {
        if (!shouldShow) return

        gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger)
        CustomEase.create('hop', "0.8, 0, 0.2, 1")
        CustomEase.create('hop2', "0.9, 0, 0.1, 1")

        const splitText = (selector: Element | string, type: 'words' | 'chars' | 'lines', className: string, mask = true) => {
            return SplitText.create(selector, {
                type: type,
                [`${type}Class`]: className,
                ...(mask && { mask: type })
            })
        }

        const preloaderHeaderSplit = splitText('.preloader-header h1', 'chars', 'char')
        const testCopySplit = splitText('.test-copy', 'chars', 'char')
        void preloaderHeaderSplit
        void testCopySplit

        const preloadingImgInitRotation = [7.5, -2.5, -10, 12.5, -5, 5]
        gsap.set('.preloader-img', {
            rotate: (i) => preloadingImgInitRotation[i]
        })

        const tl = gsap.timeline({ delay: 0.5 })

        tl.to('.preloader-img', {
            scale: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'hop',
            stagger: 0.2
        })

        tl.to(
            '.preloader-header h1 .char',
            {
                y: '0%',
                duration: 1,
                ease: 'hop2',
                stagger: { each: 0.125, from: 'random' }
            },
            "0.35"
        )

        tl.to(
            '.preloader-counter p',
            {
                y: '0%',
                duration: 1,
                ease: 'hop2',
                onStart: () => {
                    const counterEl = document.querySelector('.preloader-counter p')
                    const counter = { value: 0 }

                    gsap.to(counter, {
                        value: 100,
                        duration: 1,
                        delay: 0.5,
                        ease: 'power2.inOut',
                        onUpdate: () => {
                            counterEl!.textContent = String(Math.round(counter.value)).padStart(3, '0')
                        }
                    })
                }
            },
            '<'
        )

        tl.to('.preloader-counter p', {
            y: '-100%',
            duration: 0.75,
            ease: 'hop2'
        }, 3.25)

        tl.to('.preloader-header h1 .char', {
            y: '-100%',
            duration: 0.75,
            ease: 'hop2',
            stagger: { each: 0.125, from: 'random' }
        }, 3.25)

        tl.to('.preloader-images .preloader-img', {
            scale: 0,
            clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
            duration: 1,
            ease: 'hop2',
            stagger: -0.075
        }, 3.5)

        // Preloader slide ke atas (clipPath)
        tl.to('.preloader', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 1,
            ease: 'hop2',
        }, 4.35)

        // Halaman sesungguhnya (.page-content) slide up ke posisinya semula
        tl.fromTo('.page-content',
            { y: '100vh' },
            {
                y: '0%',
                duration: 1,
                ease: 'hop2',
                onStart: () => {
                    // Beri hints render hardware acceleration ke browser
                    gsap.set('.page-content', { willChange: 'transform' })
                },
                onComplete: () => {
                    // Hapus kelas preloader-active agar overflow & scrolling kembali normal
                    document.documentElement.classList.remove('preloader-active');

                    // Clear inline style dari GSAP agar tidak bentrok dengan kalkulasi layout normal
                    gsap.set('.page-content', { clearProps: 'all' });

                    // Refresh ScrollTrigger agar pin & layout trigger dihitung ulang dari posisi normal
                    ScrollTrigger.refresh();
                }
            },
            4.35
        )

    }, [shouldShow])

    if (!shouldShow) return null

    return (
        <div className="preloader bg-neutral-900 fixed top-0 left-0 w-full min-h-svh overflow-hidden z-50">
            <div className="preloader-images absolute top-0 left-0 w-full h-full">
                {imageList.map((item, index) => (
                    <Image src={item} key={index} alt={`Preloader ${index}`} width={250} height={400} className="object-cover preloader-img" />
                ))}
            </div>

            <div className="preloader-header absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="uppercase text-2xl">Loreast</h1>

                <div className="preloader-counter text-lg">
                    <p>000</p>
                </div>
            </div>
        </div>
    )
}

export default Preloader