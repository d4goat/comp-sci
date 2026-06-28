'use client'

import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { listItem } from "@/data"
import { cn } from "@/lib/utils"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Copy from "../molecul/copy"
import Link from "next/link"

const CardItem = ({ title, desc, image, background }: { title: string, desc: string, image: string, background: string }) => (
    <div className={`relative w-full card`}>
        <a href={`/destination/${encodeURIComponent(title.toLowerCase().replace(' ', '-'))}`}>
            <div className={`relative flex justify-between will-change-transform p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/5 h-full card-inner ${background}`}>
                <div className="flex flex-col gap-4 text-zinc-900">
                    <h1 className="text-5xl font-semibold tracking-tight">{title}</h1>
                    <p className="text-xl font-medium opacity-80 max-w-xl">{desc}</p>
                </div>
                <div className="relative rounded-2xl w-64 h-64 overflow-hidden shadow-md shrink-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </a>
    </div>
)

const ListDestination = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const introRef = useRef<HTMLDivElement>(null)
    const outroRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const cards = gsap.utils.toArray(
            cardsRef.current?.querySelectorAll('.card') || []
        ) as Element[]

        // ScrollTrigger.create({
        //     trigger: introRef.current,
        //     start: 'top 10%',
        //     endTrigger: outroRef.current,
        //     end: 'top center',
        //     pin: introRef.current,
        //     pinSpacing: false,
        // })

        cards.forEach((card, index) => {
            const inner = card.querySelector('.card-inner') as Element
            const child = inner.childNodes as NodeListOf<Element>
            gsap.set(child, { opacity: 0, filter: 'blur(10px)', y: 30 })

            ScrollTrigger.create({
                trigger: card,
                start: 'top 90%',
                once: true,
                onEnter: () => {
                    gsap.to(child, {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 0.75,
                        stagger: 0.15,
                        ease: 'power2.inOut'
                    })
                }
            })

            ScrollTrigger.create({
                trigger: card,
                start: 'top 30%',
                endTrigger: outroRef.current,
                end: 'top 60%',
                pin: true,
                pinSpacing: false,
            })

            const yVal = -(cards.length - 1 - index) * 14

            if (yVal !== 0) {
                gsap.to(inner, {
                    y: `${yVal}vh`,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 35%',
                        endTrigger: outroRef.current,
                        end: 'top 65%',
                        scrub: true,
                    },
                })
            }
        })
    }, { scope: containerRef })

    return (
        <section className="relative px-10 w-full min-h-dvh flex flex-col gap-20 py-24 bg-theme" ref={containerRef}>
            <div className="px-10 intro" ref={introRef}>
                <div className="max-w-fit">
                    <Copy revealerWidth="115%" left="-0.4em">
                        <div className="text-6xl font-semibold px-5 bg-white italic">
                            List Destinasi
                        </div>
                    </Copy>
                </div>
            </div>
            {/* <section className="h-40 intro" ref={introRef} /> */}
            <section className="relative w-full cards space-y-10" ref={cardsRef}>
                {listItem.map((item, index) => (
                    <CardItem title={item.title} background={item.background} desc={item.description} image={item.thumbnail} key={index} />
                ))}
            </section>
            <section className="h-40 outro" ref={outroRef} />
        </section>
    )
}

export { ListDestination }