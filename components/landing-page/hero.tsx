import { gsap, splitText } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import Copy from "../molecul/copy"
import { Highlight } from "../atom/highlight"


const Hero = () => {
    // useGSAP(() => {
    //     const heroTitle = splitText('.hero-title', 'chars', 'char')
    //     const tl = gsap.timeline({ delay: 0.5 })
    //     tl.to('.hero-title .char', {
    //         y: '0%',
    //         duration: 1,
    //         ease: 'hop2',
    //         stagger: { each: 0.125, from: 'random' }
    //     })
    // }, [])
    return (
        <section>
            <div className="absolute inset-0 w-full h-full [&_.cld-video-player]:w-full! [&_.cld-video-player]:h-full! [&_video]:w-full! [&_video]:h-full! [&_video]:object-cover!">
                <video src="https://res.cloudinary.com/divkjbs7y/video/upload/v1775628431/hero_not_found_qgihgo.mp4"
                    autoPlay
                    loop muted playsInline
                    data-cld-video-player
                ></video>
            </div>
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 min-h-dvh w-full flex justify-center items-center px-4">
                <Copy>
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-background uppercase flex flex-col justify-center items-center italic gap-2">
                        <span className="tracking-wide">journey with</span>
                        <div className="bg-black py-2 px-5 sm:py-3 sm:pl-5 sm:pr-8">loreast</div>
                    </h1>
                </Copy>
            </div>
        </section>
    )
}

export default Hero