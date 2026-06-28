import { Explain } from "@/components/destination/explain"
import { Footer } from "@/components/destination/footer"
import { Hero } from "@/components/destination/hero"
import { MapDestination } from "@/components/destination/map"
import { Operational } from "@/components/destination/operational"
import { PageWrapper } from "@/components/page-wrapper"
import { MapMarker } from "@/components/ui/map"
import { getItemBySlug, listItem } from "@/data"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const item = getItemBySlug(slug)
    if (!item) {
        return notFound()
    }
    const clasName = `${item.background}`
    return <PageWrapper className={clasName}>
        <Hero title={item.title} />
        <Explain description={item.description} additionalDesc={item.additionalDesc} notes={item.notes} />
        <MapDestination street={item.street} latitude={item.longitude} longitude={item.latitude} title={item.title} />
        <Operational />
        <Footer id={item.id} />
    </PageWrapper>
}