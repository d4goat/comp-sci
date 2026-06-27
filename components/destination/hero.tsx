import Copy from "../molecul/copy";

const Hero = ({ title }: { title: string }) => (
    <section className="">
        <div className="absolute inset-0 w-full h-full [&_.cld-video-player]:w-full! [&_.cld-video-player]:h-full! [&_video]:w-full! [&_video]:h-full! [&_video]:object-cover!">
            <video src="https://res.cloudinary.com/divkjbs7y/video/upload/v1782464446/bangsring_ftas4h.mp4"
                autoPlay
                muted
                playsInline
                loop
                data-cld-video-player></video>
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 min-h-dvh w-full flex justify-center items-center">
            <Copy>
                <h1 className="font-heading text-6xl md:text-7xl opacity-80 text-background uppercase italic">
                    <div className="bg-black py-3 pl-4 pr-7">{title}</div>
                </h1>
            </Copy>
        </div>
    </section>
)

export { Hero }