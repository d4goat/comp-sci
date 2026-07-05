'use client'

import { PageWrapper } from "@/components/page-wrapper";
import { MagneticButton } from "@/components/molecul/magnetic";
import { Footer } from "@/components/landing-page/footer";
import Link from "next/link";
import { Metadata } from "next";

function NotFoundComponent() {
    return (
        <div className="relative w-full min-h-dvh overflow-hidden">

            {/* ── Video full-screen background ── */}
            <div className="absolute inset-0 w-full h-full [&_.cld-video-player]:w-full! [&_.cld-video-player]:h-full! [&_video]:w-full! [&_video]:h-full! [&_video]:object-cover!">
                <video src="https://res.cloudinary.com/divkjbs7y/video/upload/v1783092658/lv_0_20260703163521_1_1_1_uaa1hr.mov"
                    autoPlay
                    loop muted playsInline
                    data-cld-video-player
                ></video>
            </div>

            {/* ── Dark overlay ── */}
            <div className="absolute inset-0 bg-black/60" />

            {/* ── Main content ── */}
            <main className="relative z-10 flex flex-col justify-between min-h-dvh px-8 py-6">
                <div className="hidden md:block" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between justify-center md:gap-0 gap-6 flex-1 container mx-auto">
                    <div>
                        <h1 className="text-white leading-none text-5xl md:text-[5rem]">
                            Error 404
                        </h1>
                        <p className="text-white text-5xl md:text-[5rem]">
                            Are ya lost?
                        </p>
                    </div>
                    <Link href={'/'}>
                        <MagneticButton variant="primary" className="text-base p-4 md:p-0 md:w-35 md:h-35">
                            Back To Home
                        </MagneticButton>
                    </Link>
                </div>

                <Footer className="bg-transparent py-6" />
            </main>

        </div>
    );
}

export default function NotFound() {

    return (
        <PageWrapper >
            <NotFoundComponent />
        </PageWrapper>
    )
}