'use client'

import TripPlanner from "@/components/landing-page/trip-planner";
import { Explain } from "@/components/landing-page/explain";
import Hero from "@/components/landing-page/hero";
import { ListDestination } from "@/components/landing-page/list-destination";
import { PageWrapper } from "@/components/page-wrapper";
import { Footer } from "@/components/landing-page/footer";

export default function Page() {
  return (
    <PageWrapper>
      <Hero />
      <Explain />
      <ListDestination />
      <TripPlanner />
      <Footer className="border-t border-border py-14" />
    </PageWrapper>
  )
}
