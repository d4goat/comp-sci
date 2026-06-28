'use client'

import Copy from "../molecul/copy"
import { Clock, Ticket, AlertCircle, CheckCircle2, Home } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { Button } from "../ui/button"
import Link from "next/link"

const Operational = () => {
    const cardContainerRef = useRef<HTMLDivElement>(null)
    useGSAP(() => {
        const cards = gsap.utils.toArray('.card') as Element[]
        gsap.set(cards, { opacity: 0, y: 30, filter: 'blur(10px)' })

        ScrollTrigger.create({
            trigger: cardContainerRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                gsap.to(cards, {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    ease: 'power2.inOut',
                    stagger: 0.15,
                    duration: 0.75
                })
            }
        })
    }, [])
    return (
        // Menggunakan bg off-white yang bersih agar card putih lebih menonjol
        <section className="min-h-dvh py-28 px-10 md:px-20 bg-[#F8F9FA] text-gray-800">
            <Copy>
                <h2 className="text-5xl md:text-6xl font-semibold mb-20 text-center lg:text-left">
                    Informasi Operasional
                </h2>
            </Copy>

            {/* Grid Container untuk Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardContainerRef}>

                {/* 1. Jam Operasional Card */}
                <div className="card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    {/* Aksen warna Ocean */}
                    <div className="w-14 h-14 bg-golden rounded-2xl flex items-center justify-center text-[#4A7C82]">
                        <Clock size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-5">Jam Operasional</h3>
                        <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                            <li className="flex justify-between border-b border-gray-50 pb-2">
                                <span>Senin - Jumat</span>
                                <span className="font-semibold text-gray-800">08:00 - 16:00</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-50 pb-2">
                                <span>Sabtu - Minggu</span>
                                <span className="font-semibold text-gray-800">07:00 - 17:00</span>
                            </li>
                            <li className="flex justify-between pt-1">
                                <span>Hari Libur Nasional</span>
                                <span className="font-semibold text-[#4A7C82]">Tetap Buka</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 2. Harga Tiket Card */}
                <div className="card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    {/* Aksen warna Sunset */}
                    <div className="w-14 h-14 bg-golden rounded-2xl flex items-center justify-center text-[#DDA15E]">
                        <Ticket size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-5">Harga Tiket Masuk</h3>
                        <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                            <li className="flex justify-between border-b border-gray-50 pb-2">
                                <span>Wisatawan Domestik</span>
                                <span className="font-semibold text-gray-800">Rp 15.000</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-50 pb-2">
                                <span>Wisatawan Mancanegara</span>
                                <span className="font-semibold text-gray-800">Rp 150.000</span>
                            </li>
                            <li className="flex justify-between pt-1">
                                <span>Parkir Kendaraan</span>
                                <span className="font-semibold text-gray-800">Rp 5.000</span>
                            </li>
                        </ul>
                        <p className="text-xs text-gray-400 mt-5 italic">*Harga tiket dapat berubah sewaktu-waktu sesuai kebijakan pengelola.</p>
                    </div>
                </div>

                {/* 3. Aturan & Ketentuan Card */}
                <div className="card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    {/* Aksen warna Forest */}
                    <div className="w-14 h-14 bg-forest rounded-2xl flex items-center justify-center text-text">
                        <AlertCircle size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-5">Aturan Pengunjung</h3>
                        <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 size={20} className="text-text shrink-0 mt-0.5" />
                                <span>Wajib menjaga kebersihan dan membuang sampah pada tempat yang disediakan.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 size={20} className="text-text shrink-0 mt-0.5" />
                                <span>Dilarang merusak fasilitas, mencoret bebatuan, atau merusak vegetasi alam.</span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <CheckCircle2 size={20} className="text-text shrink-0 mt-0.5" />
                                <span>Patuhi batas aman yang ditentukan oleh penjaga (terutama di area pantai dan kawah).</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="flex justify-center mt-10">
                <Link href={'/'}>
                    <Button size={'2xl'} variant={'outline'} className=""><Home /> Kembali Ke Halaman Utama</Button>
                </Link>
            </div>
        </section>
    )
}

export { Operational }