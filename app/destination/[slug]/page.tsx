import { Explain } from "@/components/destination/explain"
import { Footer } from "@/components/destination/footer"
import { Gallery } from "@/components/destination/gallery"
import { Hero } from "@/components/destination/hero"
import { MapDestination } from "@/components/destination/map"
import { Operational } from "@/components/destination/operational"
import { PageWrapper } from "@/components/page-wrapper"
import { MapMarker } from "@/components/ui/map"
import { getItemByCategory, getItemBySlug, listItem } from "@/data"
import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string, category?: string }> },
): Promise<Metadata> {
    const slug = (await params).slug
    const item = getItemBySlug(slug)
    if (!item) {
        return notFound()
    }
    const tDest = await getTranslations("Destinations")

    return {
        title: `${tDest(`${item.slug}.title`)} | Loreast`,
        description: tDest(`${item.slug}.description`),
    }
}
export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ category?: string }>
}) {
    const { slug } = await params
    const { category } = await searchParams
    const item = getItemBySlug(slug)

    if (!item) {
        return notFound()
    }
    if (category && item.category.toLowerCase() !== category.toLowerCase()) {
        return notFound()
    }
    const tDest = await getTranslations("Destinations")
    const tLabel = await getTranslations("Labels")
    let translatedTips = item.visitTips
    try {
        const rawTips = tDest.raw(`${item.slug}.visitTips`)
        if (Array.isArray(rawTips)) {
            translatedTips = rawTips
        }
    } catch (e) { }
    const translatedHtm = item.htm.map(ticket => {
        const rawLabel = ticket.label.replace(/\s+/g, '');
        const camelLabel = rawLabel.charAt(0).toLowerCase() + rawLabel.slice(1);
        let translatedLabel = ticket.label;
        try {
            translatedLabel = tLabel(camelLabel) || ticket.label;
        } catch (e) { }
        return {
            ...ticket,
            label: translatedLabel
        };
    });
    const translatedItem = {
        ...item,
        title: tDest(`${item.slug}.title`),
        description: tDest(`${item.slug}.description`),
        additionalDesc: tDest(`${item.slug}.additionalDesc`),
        notes: tDest(`${item.slug}.notes`),
        visitTips: translatedTips,
        htm: translatedHtm
    }

    const clasName = translatedItem.background
    return <PageWrapper className={clasName}>
        <Hero title={translatedItem.title} video={translatedItem.video} />
        <Explain description={translatedItem.description} additionalDesc={translatedItem.additionalDesc} notes={translatedItem.notes} />
        <Gallery images={translatedItem.image} title={translatedItem.title} />
        <MapDestination street={translatedItem.street} latitude={translatedItem.longitude} longitude={translatedItem.latitude} title={translatedItem.title} mapUrl={translatedItem.mapsUrl} />
        <Operational destinasi={translatedItem} />
        <Footer id={translatedItem.id} />
    </PageWrapper>
}