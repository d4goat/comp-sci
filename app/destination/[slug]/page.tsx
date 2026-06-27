import { Explain } from "@/components/destination/explain"
import { Hero } from "@/components/destination/hero"
import { MapDestination } from "@/components/destination/map"
import { Operational } from "@/components/destination/operational"
import { PageWrapper } from "@/components/page-wrapper"
import { MapMarker } from "@/components/ui/map"
import { listItem } from "@/data"
import Image from "next/image"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const item = listItem[0]
    return <PageWrapper className="bg-volcanic">
        <Hero title={slug} />
        <Explain title={slug} />
        <MapDestination latitude={item.longitude} longitude={item.latitude} title={item.title} />
        <Operational />
    </PageWrapper>
}