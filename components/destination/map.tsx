'use client'
import { MapPin } from "lucide-react";
import Copy from "../molecul/copy";
import {
    Map,
    MapMarker,
    MarkerContent,
    MarkerLabel,
    MarkerPopup,
} from "../ui/map";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const MapDestination = ({ latitude, longitude, title }: { latitude: number, longitude: number, title: string }) => {
    const mapRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.set(mapRef.current, { opacity: 0, y: 30, filter: 'blur(10px)' })

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
            }
        })
    }, { scope: mapRef })
    return <section className="min-h-dvh px-20 py-28">
        <Copy>
            <h2 className="text-6xl font-semibold mb-16 ">Lokasi {title}</h2>
        </Copy>
        <div data-lenis-prevent className="rounded-xl overflow-hidden shadow-lg h-[250px] md:h-[500px]" ref={mapRef}>
            <Map center={[longitude, latitude]} zoom={11} className="rounded-xl overflow-hidden shadow-lg">
                <MapMarker latitude={latitude} longitude={longitude}>
                    <MarkerContent>
                        <MapPin
                            className='fill-white stroke-black'
                            size={28}
                        />
                        <MarkerLabel position="bottom" className="text-xl text-white">{title}</MarkerLabel>
                    </MarkerContent>

                </MapMarker>
            </Map>
        </div>
    </section>
}

export { MapDestination }