"use client";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { listItem } from "@/data";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";

const categories = ["All", "Volcanic", "Forest", "Ocean", "Sunset"];

export default function TripPlanner() {
    const [activeFilter, setActiveFilter] = useState("All");
    const containerRef = useRef(null);

    // Logika Filter
    const filteredWisata =
        activeFilter === "All"
            ? listItem
            : listItem.filter((w) => w.category === activeFilter);

    // Animasi GSAP setiap kali state activeFilter berubah
    useGSAP(() => {
        const cards = gsap.utils.toArray('.wisata-card') as Element[];

        gsap.set(cards, { y: 30, opacity: 0, filter: 'blur(10px)' });

        ScrollTrigger.create({
            trigger: '.cards',
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.55,
                    stagger: 0.15,
                    ease: 'power2.inOut',
                });
            },
        });
    }, { dependencies: [activeFilter], scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-8 bg-white text-gray-800">
            <h2 className="text-3xl font-bold mb-8 text-center">Tentukan Vibes Liburanmu</h2>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        variant={activeFilter === cat ? 'default' : 'outline'}
                        className="rounded-full"
                        size={'xl'}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cards">
                {filteredWisata.map((item, index) => (
                    <div
                        key={`${item.title}-${index}`}
                        className={`${item.background} wisata-card rounded-2xl flex flex-col justify-end`}
                    >
                        <div className="h-64 w-full relative">
                            <Image
                                src={item.thumbnail}
                                alt={item.title}
                                fill
                                className="rounded-t-2xl object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <span className="text-sm font-semibold uppercase opacity-60">{item.category}</span>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}