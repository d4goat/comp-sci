'use client'

// import { useRef, useState, useEffect } from "react"
// import { X, ZoomIn } from "lucide-react"
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
// } from "@/components/ui/carousel"
// import Copy from "../molecul/copy"
// import { gsap } from "@/lib/gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { useGSAP } from "@gsap/react"

// interface GalleryProps {
//     images: string[]
//     title: string
// }

// const Gallery = ({ images, title }: GalleryProps) => {
//     const gridRef = useRef<HTMLDivElement>(null)
//     const [lightboxOpen, setLightboxOpen] = useState(false)
//     const [activeIndex, setActiveIndex] = useState(0)

//     const cloudName = "divkjbs7y"

//     useGSAP(() => {
//         gsap.registerPlugin(ScrollTrigger)

//         const gridItems = gsap.utils.toArray('.grid-item') as Element[]
//         gsap.set(gridItems, { opacity: 0, y: 30, filter: 'blur(8px)' })

//         ScrollTrigger.create({
//             trigger: gridRef.current,
//             start: 'top 85%',
//             once: true,
//             onEnter: () => {
//                 gsap.to(gridItems, {
//                     y: 0,
//                     opacity: 1,
//                     filter: 'blur(0px)',
//                     ease: 'power3.out',
//                     stagger: 0.15,
//                     duration: 0.8
//                 })
//             }
//         })
//     }, { scope: gridRef })

//     // Prevent scrolling when Lightbox is active
//     useEffect(() => {
//         return () => {
//             document.body.style.overflow = "unset"
//         }
//     }, [])

//     const openLightbox = (index: number) => {
//         setActiveIndex(index)
//         setLightboxOpen(true)
//         document.body.style.overflow = "hidden"
//     }

//     const closeLightbox = () => {
//         setLightboxOpen(false)
//         document.body.style.overflow = "unset"
//     }

//     if (!images || images.length === 0) return null

//     return (
//         <section 
//             className="min-h-dvh flex flex-col justify-center py-28 px-6 md:px-20 bg-text text-white overflow-hidden"
//         >
//             <div className="w-full max-w-6xl mx-auto">
//                 <Copy>
//                     <h2 className="text-5xl md:text-6xl font-semibold mb-16 text-center lg:text-left">
//                         Galeri Visual {title}
//                     </h2>
//                 </Copy>
//             </div>

//             <div className="w-full max-w-6xl mx-auto px-4 md:px-12" ref={gridRef}>
//                 {/* Bento Grid Layout */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:h-[550px]">

//                     {/* Image 1 (Large Main card) */}
//                     <div 
//                         onClick={() => openLightbox(0)}
//                         className="grid-item md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl cursor-pointer border border-neutral-800 shadow-xl bg-neutral-900 h-[260px] md:h-full"
//                     >
//                         <img
//                             src={`https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${images[0]}`}
//                             alt={`${title} - Foto 1`}
//                             className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                             loading="lazy"
//                         />
//                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                             <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
//                                 <ZoomIn className="text-white w-6 h-6" />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Image 2 */}
//                     {images[1] && (
//                         <div 
//                             onClick={() => openLightbox(1)}
//                             className="grid-item relative group overflow-hidden rounded-3xl cursor-pointer border border-neutral-800 shadow-xl bg-neutral-900 h-[200px] md:h-full"
//                         >
//                             <img
//                                 src={`https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${images[1]}`}
//                                 alt={`${title} - Foto 2`}
//                                 className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                                 loading="lazy"
//                             />
//                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                                 <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
//                                     <ZoomIn className="text-white w-6 h-6" />
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Image 3 (With conditional overlay if there are more than 3 images) */}
//                     {images[2] && (
//                         <div 
//                             onClick={() => openLightbox(2)}
//                             className="grid-item relative group overflow-hidden rounded-3xl cursor-pointer border border-neutral-800 shadow-xl bg-neutral-900 h-[200px] md:h-full"
//                         >
//                             <img
//                                 src={`https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${images[2]}`}
//                                 alt={`${title} - Foto 3`}
//                                 className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                                 loading="lazy"
//                             />

//                             {images.length > 3 ? (
//                                 <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/75">
//                                     <span className="text-white text-3xl font-bold font-heading">
//                                         +{images.length - 2}
//                                     </span>
//                                     <span className="text-neutral-300 text-xs font-semibold uppercase tracking-wider mt-1">
//                                         Lihat Foto Lainnya
//                                     </span>
//                                 </div>
//                             ) : (
//                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                                     <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
//                                         <ZoomIn className="text-white w-6 h-6" />
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                 </div>
//             </div>

//             {/* Fullscreen Lightbox Modal */}
//             {lightboxOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
//                     {/* Close Button */}
//                     <button 
//                         onClick={closeLightbox}
//                         className="absolute top-6 right-6 z-50 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full transition-colors border border-neutral-800 cursor-pointer"
//                     >
//                         <X className="w-6 h-6" />
//                     </button>

//                     {/* Carousel Inside Lightbox */}
//                     <div className="w-full max-w-5xl px-4 md:px-12 relative flex items-center justify-center">
//                         <Carousel 
//                             opts={{ 
//                                 loop: true,
//                                 startIndex: activeIndex 
//                             }} 
//                             className="w-full"
//                         >
//                             <CarouselContent>
//                                 {images.map((img, index) => (
//                                     <CarouselItem key={index} className="basis-full">
//                                         <div className="relative w-full aspect-video md:aspect-[16/10] lg:aspect-[16/9] flex items-center justify-center overflow-hidden">

//                                             {/* Blurred background backdrop to handle different aspect ratios in fullscreen */}
//                                             <div className="absolute inset-0 select-none pointer-events-none opacity-30 blur-3xl scale-120">
//                                                 <img
//                                                     src={`https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${img}`}
//                                                     alt=""
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             </div>

//                                             {/* Foreground uncropped image */}
//                                             <div className="relative max-w-full max-h-[80vh] flex items-center justify-center z-10">
//                                                 <img
//                                                     src={`https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${img}`}
//                                                     alt={`${title} - Full Foto ${index + 1}`}
//                                                     className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-neutral-900/50 shadow-2xl"
//                                                 />
//                                             </div>

//                                         </div>
//                                     </CarouselItem>
//                                 ))}
//                             </CarouselContent>

//                             <CarouselPrevious className="bg-neutral-900/80 border-neutral-800 hover:bg-neutral-800 hover:text-white text-white absolute left-4 md:-left-12 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer" />
//                             <CarouselNext className="bg-neutral-900/80 border-neutral-800 hover:bg-neutral-800 hover:text-white text-white absolute right-4 md:-right-12 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer" />
//                         </Carousel>
//                     </div>
//                 </div>
//             )}
//         </section>
//     )
// }

// export { Gallery }
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

interface GalleryProps {
    images: string[]
    title: string
}

const GalleryOptionB = ({ images, title }: GalleryProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

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

    return (
        <section
            ref={containerRef}
            className="min-h-dvh flex flex-col justify-center py-28 px-6 md:px-20 text-black overflow-hidden"
        >
            <div className="w-full max-w-6xl mx-auto">
                <Copy>
                    <h2 className="text-5xl md:text-6xl font-semibold mb-16 text-center  max-w-fit px-3 lg:text-left">
                        Galeri Foto {title}
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
                                        alt={`${title} - Foto ${index + 1}`}
                                        className="h-full w-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-sm font-medium tracking-wide uppercase">
                                            {title} — Foto {index + 1}
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
                    Geser (swipe) untuk melihat foto lainnya
                </p>
            </div>
        </section>
    )
}

export { GalleryOptionB as Gallery }