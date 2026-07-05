import { gsap, splitText } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import Copy from "../molecul/copy"
import { Highlight } from "../atom/highlight"


const Hero = () => {
    return (
        <section>
            <div className="absolute inset-0 w-full h-full [&_.cld-video-player]:w-full! [&_.cld-video-player]:h-full! [&_video]:w-full! [&_video]:h-full! [&_video]:object-cover!">
                <video src="https://res.cloudinary.com/divkjbs7y/video/upload/v1783092658/lv_0_20260703163521_1_1_1_uaa1hr.mov"
                    autoPlay
                    loop muted playsInline
                    data-cld-video-player
                ></video>
            </div>
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 min-h-screen w-full flex justify-center items-center px-4">
                <Copy>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-background uppercase font-mona font-bold flex flex-col justify-center items-center italic gap-2">
                        <span className="tracking-wide">journey with</span>
                        <div className="bg-moss font-simple py-2 px-5 sm:py-3 sm:pl-5 sm:pr-8">loreast</div>
                    </h1>
                </Copy>
            </div>
        </section>
    )
}

export default Hero