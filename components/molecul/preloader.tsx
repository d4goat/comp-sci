'use client'

import Image from "next/image"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { CustomEase } from "gsap/all"
import { useGSAP } from "@gsap/react"
import { imageList } from "@/data"
import { useState, useEffect } from "react"

// Module-level flag: bertahan hidup selama browser session (client-side transitions),
// namun langsung ter-reset (kembali false) pada setiap page refresh (full reload).
let preloaderHasShown = false

const Preloader = () => {
    const [shouldShow, setShouldShow] = useState(false)

    useEffect(() => {
        if (!preloaderHasShown) {
            preloaderHasShown = true
            setShouldShow(true)
        }
    }, [])

    useGSAP(() => {
        if (!shouldShow) return

        gsap.registerPlugin(SplitText, CustomEase)
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

        // Hanya animasikan preloader itu sendiri untuk slide up (clip-path)
        tl.to('.preloader', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 1,
            ease: 'hop2',
        }, 4.35)


    }, [shouldShow])

    if (!shouldShow) return null

    return (
        <div className="preloader bg-neutral-900 fixed top-0 left-0 w-full min-h-svh overflow-hidden z-50">
            <div className="preloader-images absolute top-0 left-0 w-full h-full">
                {imageList.map((item, index) => (
                    <Image src={item} key={index} alt={`Preloader ${index}`} width={250} height={400} className="object-cover preloader-img" />
                ))}
            </div>

            <div className="preloader-header text-theme">
                <h1 className="uppercase text-6xl font-semibold absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2">Loreast</h1>

                <div className="absolute top-2/5 left-3/5 -translate-x-1/2 translate-y-1/2 ml-10">
                    <div className="preloader-counter text-lg">
                        <p>000</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preloader