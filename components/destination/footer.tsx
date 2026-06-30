'use client'

import { useFollowPointer } from "@/hooks/useFollowPointer";
import { CursorCircle, CursorLabel } from "../molecul/cursor-label";
import { MagneticButton } from "../molecul/magnetic";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { getNextListItem, getNextListItemByCategory } from "@/data";
import { notFound, useSearchParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Variants } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const scaleUp: Variants = {
    initial: { scale: 0, x: '-50%', y: '-50%' },
    enter: {
        scale: 1,
        x: '-50%',
        y: '-50%',
        transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] as const },
    },
    closed: {
        scale: 0,
        x: '-50%',
        y: '-50%',
        transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] as const },
    },
};


const Footer = ({ id }: { id: number }) => {
    const modal = useRef<HTMLDivElement>(null)
    const cursor = useRef<HTMLDivElement>(null)
    const label = useRef<HTMLDivElement>(null)
    const { handlePointerEnter, handlePointerLeave, moveItems, item: { active } } = useFollowPointer({ cursor, label, modal })

    const search = useSearchParams()
    const category = search.get('category')

    const { item: nextItem, stayInCategory } = category ? getNextListItemByCategory(id, category) : { item: getNextListItem(id), stayInCategory: false }

    const nextHref = `/destination/${nextItem.slug}${category && stayInCategory ? `?category=${category}` : ''
        }`

    if (!nextItem) return notFound();
    return (
        <footer className="border-t border-border pb-8 bg-text">
            <div className="flex justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    onPointerEnter={() => handlePointerEnter(nextItem.id)}
                    onPointerLeave={() => handlePointerLeave(nextItem.id)}
                    onPointerMove={({ clientX, clientY }) => moveItems(clientX, clientY)}
                    href={nextHref}
                    className="group overflow-hidden flex flex-col items-center relative gap-4 text-primary w-full"
                >
                    <span className="next-node text-lg text-neutral-400 group-hover:text-white transition-colors duration-300">
                        Next Destination
                    </span>

                    <h2 className="next-node text-3xl md:text-4xl lg:text-7xl font-semibold text-muted group-hover:text-neutral-500 font-heading transition-all duration-300">
                        {nextItem.title}
                    </h2>

                    {/* Card wrapper — overflow hidden + max-height trick */}
                    <div
                        className="next-node w-3/4 lg:w-1/3 bg-neutral-800 px-7 lg:py-6 absolute top-28 overflow-hidden md:translate-y-15 group-hover:-translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <div className="relative h-42 lg:h-42 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <CldImage
                                src={nextItem.thumbnail}
                                alt={nextItem.title}
                                fill
                                sizes="(max-width: 1024px) 75vw, 33vw"
                                className="object-contain rounded-xl"
                            />
                            {/* <Image src={nextItem.thumbnail} alt={nextItem.title} fill className="object-contain rounded-xl" sizes="(max-width: 1024px) 75vw, 33vw" /> */}
                        </div>
                    </div>
                    <Separator className="mt-36 lg:mt-30 bg-neutral-500!" />
                </Link>
                <CursorCircle ref={cursor} variants={scaleUp} active={active} />
                <CursorLabel ref={label} variants={scaleUp} active={active} >
                    View
                </CursorLabel>
            </div>
            <div className="container mx-auto flex items-end max-w-5xl justify-between">
                <span className="text-muted text-lg">All right reserved &copy; 2026</span>
                <div className="flex flex-col gap-3">
                    <p className="text-neutral-300 uppercase text-xs">Version</p>
                    <p className="text-white">2026 &copy; Edition</p>
                </div>

            </div>
        </footer>
    )
}

export { Footer }