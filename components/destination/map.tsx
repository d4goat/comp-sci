'use client'
import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";
import Copy from "../molecul/copy";
import {
    Map,
    MapMarker,
    MarkerContent,
    MarkerLabel,
} from "../ui/map";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const MapDestination = ({ latitude, longitude, title, street }: { latitude: number, longitude: number, title: string, street: string }) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const infoRef = useRef<HTMLDivElement>(null)

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${longitude},${latitude}`
    const wazeUrl = `https://waze.com/ul?ll=${longitude},${latitude}&navigate=yes`

    // Format koordinat DMS (Degrees°Minutes'Seconds")
    const formatCoord = (val: number, posLabel: string, negLabel: string) => {
        const abs = Math.abs(val)
        const deg = Math.floor(abs)
        const minFull = (abs - deg) * 60
        const min = Math.floor(minFull)
        const sec = ((minFull - min) * 60).toFixed(1)
        const dir = val >= 0 ? posLabel : negLabel
        return `${deg}°${min}'${sec}" ${dir}`
    }

    useGSAP(() => {
        gsap.set(mapRef.current, { opacity: 0, y: 30, filter: 'blur(10px)' })
        gsap.set(infoRef.current, { opacity: 0, y: 20 })

        ScrollTrigger.create({
            trigger: mapRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(mapRef.current, {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    ease: 'power2.inOut',
                    duration: 0.75
                })
                gsap.to(infoRef.current, {
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    duration: 0.6,
                    delay: 0.35
                })
            }
        })
    }, { scope: mapRef })

    return (
        <section className="min-h-dvh px-4 sm:px-8 md:px-20 py-16 md:py-28 bg-white flex flex-col">
            <Copy>
                <h2 className="text-4xl md:text-6xl font-semibold mb-8 md:mb-16">Lokasi {title}</h2>
            </Copy>

            {/* Map */}
            <div
                data-lenis-prevent
                className="rounded-xl overflow-hidden shadow-lg h-[300px] sm:h-[380px] md:h-[500px] shrink-0"
                ref={mapRef}
            >
                <Map center={[longitude, latitude]} zoom={11} className="rounded-xl overflow-hidden shadow-lg">
                    <MapMarker latitude={latitude} longitude={longitude}>
                        <MarkerContent>
                            <MapPin className='fill-white stroke-black' size={28} />
                            <MarkerLabel position="bottom" className="text-sm md:text-xl text-white">{title}</MarkerLabel>
                        </MarkerContent>
                    </MapMarker>
                </Map>
            </div>

            {/* Info Card */}
            <div
                ref={infoRef}
                className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
            >
                {/* Alamat */}
                <div className="md:col-span-2 bg-neutral-50 border border-neutral-100 rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Alamat</span>
                        <p className="text-sm md:text-base font-medium text-neutral-800 leading-snug">{street}</p>
                    </div>
                </div>

                {/* Koordinat */}
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Compass size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Koordinat</span>
                        <p className="text-xs md:text-sm font-mono text-neutral-700 leading-relaxed">
                            {formatCoord(longitude, 'N', 'S')}
                            <br />
                            {formatCoord(latitude, 'E', 'W')}
                        </p>
                    </div>
                </div>

                {/* Google Maps button */}
                <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-neutral-900 hover:bg-neutral-700 transition-colors duration-300 rounded-xl p-5 flex gap-4 items-center cursor-pointer"
                >
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Navigation size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Buka di</span>
                        <span className="text-sm font-semibold text-white">Google Maps</span>
                    </div>
                    <ExternalLink size={14} className="text-neutral-500 group-hover:text-white transition-colors shrink-0" />
                </a>

                {/* Waze button */}
                <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[#06CCFF]/10 hover:bg-[#06CCFF]/20 border border-[#06CCFF]/30 transition-colors duration-300 rounded-xl p-5 flex gap-4 items-center cursor-pointer"
                >
                    <div className="w-9 h-9 rounded-lg bg-[#06CCFF]/20 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.54 7.27C19.27 3.05 14.96 0 10 0 4.48 0 0 4.03 0 9c0 2.55 1.1 4.85 2.87 6.48C3.5 18.94 7 20.94 10.5 21.93c.5.14 1 .22 1.5.22 1.66 0 3-1.34 3-3 0-.44-.1-.85-.27-1.22C16.95 16.82 21 13.32 21 9c0-.6-.16-1.18-.46-1.73z" fill="#06CCFF" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                        <span className="text-xs uppercase tracking-widest text-[#06CCFF]/70 font-semibold">Buka di</span>
                        <span className="text-sm font-semibold text-[#06CCFF]">Waze</span>
                    </div>
                    <ExternalLink size={14} className="text-[#06CCFF]/40 group-hover:text-[#06CCFF] transition-colors shrink-0" />
                </a>

                {/* Raw coordinate copy-friendly */}
                <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 flex gap-4 items-center">
                    <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Decimal</span>
                        <span className="text-xs font-mono text-neutral-600 select-all">
                            {longitude.toFixed(4)}, {latitude.toFixed(4)}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { MapDestination }