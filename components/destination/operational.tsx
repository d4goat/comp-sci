'use client'
import Copy from "../molecul/copy"
import { Clock, Ticket, Home, Info } from "lucide-react"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { listItemType } from "@/data"
import { useTranslations } from "next-intl"
const Operational = ({ destinasi }: { destinasi: listItemType }) => {
    const t = useTranslations("Operational")
    const cardContainerRef = useRef<HTMLDivElement>(null)
    // Cek status buka/tutup berdasarkan jam saat ini vs openTime
    const isOpenNow = () => {
        const now = new Date()
        const [openH, openM] = destinasi.openTime.open.split(":").map(Number)
        const [closeH, closeM] = destinasi.openTime.close.split(":").map(Number)
        const nowMinutes = now.getHours() * 60 + now.getMinutes()
        const openMinutes = openH * 60 + openM
        const closeMinutes = closeH * 60 + closeM
        return nowMinutes >= openMinutes && nowMinutes <= closeMinutes
    }
    const buka = isOpenNow()
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
        <section className="min-h-screen py-16 md:py-28 px-4 sm:px-6 md:px-10 lg:px-20 text-gray-800">
            <Copy>
                <h2 className="text-4xl md:text-6xl font-semibold mb-20 text-center lg:text-left">
                    {t("heading")}
                </h2>
            </Copy>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardContainerRef}>
                {/* 1. Jam Operasional Card */}
                <div className="card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-golden rounded-2xl flex items-center justify-center text-[#4A7C82]">
                        <Clock size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-5">{t("card1Title")}</h3>
                        <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                            <li className="flex justify-between border-b border-gray-50 pb-2">
                                <span>{t("card1Field1")}</span>
                                <span className="font-semibold text-gray-800">
                                    {destinasi.openTime.open} - {destinasi.openTime.close} WIB
                                </span>
                            </li>
                            <li className="flex justify-between pt-1">
                                <span>{t("card1Field2")}</span>
                                <span className={`font-semibold ${buka ? "text-green-600" : "text-red-500"}`}>
                                    {buka ? t("card1StatusOpen") : t("card1StatusClosed")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 2. Harga Tiket Card */}
                <div className="card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-golden rounded-2xl flex items-center justify-center text-[#DDA15E]">
                        <Ticket size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-5">{t("card2Title")}</h3>
                        <ul className="space-y-4 text-gray-600 text-sm md:text-base">
                            {destinasi.htm.map((item, i) => (
                                <li
                                    key={i}
                                    className={`flex justify-between ${i !== destinasi.htm.length - 1 ? "border-b border-gray-50 pb-2" : "pt-1"
                                        }`}
                                >
                                    <span>{item.label}</span>
                                    <span className="font-semibold text-gray-800 text-right max-w-[60%]">
                                        {item.price}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-gray-400 mt-5 italic">
                            {t("card2Note")}
                        </p>
                    </div>
                </div>
                <div className="card bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-golden rounded-2xl flex items-center justify-center text-[#DDA15E]">
                        <Info size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-5">{t("card3Title")}</h3>
                        <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                            {destinasi.visitTips.map((item, i) => (
                                <li
                                    key={i}
                                    className={`flex items-start gap-3
                                        }`}
                                >
                                    <span className="w-1 h-1 bg-gray-500 rounded-full mt-3"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Link href={'/'}>
                    <Button size={'2xl'} variant={'outline'}><Home /> {t("backHome")}</Button>
                </Link>
            </div>
        </section>
    )
}
export { Operational }