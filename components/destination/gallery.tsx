'use client'

import { useRef } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Copy from "../molecul/copy"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useLocale } from "next-intl"

interface GalleryProps {
    images: string[]
    title: string
}

const GalleryOptionB = ({ images, title }: GalleryProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const locale = useLocale()

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)

        gsap.set(containerRef.current, { opacity: 0, y: 40, filter: 'blur(10px)' })

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(containerRef.current, {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    ease: 'power3.out',
                    duration: 1
                })
            }
        })
    }, { scope: containerRef })

    if (!images || images.length === 0) return null

    const cloudName = "divkjbs7y"

    const headTitle = locale === 'en' ? `Photo Gallery ${title}` : `Galeri Foto ${title}`

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex flex-col justify-center py-28 px-6 md:px-20 text-black overflow-hidden"
        >
            <div className="w-full max-w-6xl mx-auto">
                <Copy>
                    <h2 className="text-5xl md:text-6xl font-semibold mb-16 text-center  max-w-fit px-3 lg:text-left">
                        {headTitle}
                    </h2>
                </Copy>
            </div>

            <div className="w-full max-w-6xl mx-auto px-4 md:px-12 relative">
                <Carousel
                    opts={{
                        loop: true,
                        align: "start"
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-6">
                        {images.map((img, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-6 basis-auto shrink-0 grow-0"
                            >
                                <div className="relative h-[320px] md:h-[480px] w-fit rounded-3xl overflow-hidden bg-neutral-900/60 border border-neutral-800 shadow-2xl group transition-all duration-500 hover:border-neutral-700">
                                    <img
                                        src={`https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${img}`}
                                        alt={`${title} - ${locale === 'en' ? 'Photo' : 'Foto'} ${index + 1}`}
                                        className="h-full w-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-sm font-medium tracking-wide uppercase text-white">
                                            {title} — {locale === 'en' ? 'Photo' : 'Foto'} {index + 1}
                                        </p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="hidden md:block">
                        <CarouselPrevious className="bg-neutral-900/80 border-neutral-800 hover:bg-neutral-800 hover:text-white text-white absolute -left-6 lg:-left-12" />
                        <CarouselNext className="bg-neutral-900/80 border-neutral-800 hover:bg-neutral-800 hover:text-white text-white absolute -right-6 lg:-right-12" />
                    </div>
                </Carousel>

                <p className="text-center text-xs text-neutral-400 mt-6 md:hidden">
                    {locale === 'en' ? 'Swipe to see more photos' : 'Geser (swipe) untuk melihat foto lainnya'}
                </p>
            </div>
        </section>
    )
}

export { GalleryOptionB as Gallery }